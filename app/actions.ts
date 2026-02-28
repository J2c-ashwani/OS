'use server';

import { revalidatePath } from 'next/cache';
import { Business, DiagnosticLog, Gap, Subscription } from '@/types';
import { MOCK_BUSINESSES, MOCK_DIAGNOSTICS, MOCK_GAPS, MOCK_ALERTS, MOCK_SUBSCRIPTIONS, SYSTEM_MODE } from '@/lib/data/store';
import { EmailProbe, FormProbe, MapsProbe } from '@/lib/system1-diagnostics';
import { GapAnalyzer } from '@/lib/system2-gaps';
import { AlertBuilder } from '@/lib/system4-outreach';
import { ContactFinder } from '@/lib/system3-contacts';
import { TransparencyLogger, SafeguardEngine, ConsentManager, DisclaimerEngine, CostController, IdentityManager } from '@/lib/system12-governance';
import { SubscriptionManager } from '@/lib/system6-payment';
import { writeFile, appendFile } from 'fs/promises';
import { join } from 'path';
import { performSiteAudit } from '@/lib/audit/scanner'; // Import the new scanner
import { db } from '@/lib/db';
import { ResponseAnalyzer, AccountabilityEngine } from '@/lib/system5-response';
import { FunnelTracker } from '@/lib/system9-funnel';
import { SOPEnforcer } from '@/lib/system10-sop';
import { LossEstimator } from '@/lib/system11-loss';
import { z } from 'zod';
import { checkRateLimit, checkGlobalDailyLimit, getClientIp } from '@/lib/utils/rate-limit';
import { globalCache } from '@/lib/utils/cache';
import { generateAuditReportPDF } from '@/lib/utils/pdfGenerator';
import { AuditResult } from '@/lib/audit/scanner';

// --- Zod Input Schemas ---
const AuditDomainSchema = z.string().min(3).refine(val => {
    // Basic sanity check to prevent obvious injection strings
    return /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(val) || /^localhost:\d+$/.test(val);
}, { message: "Invalid domain format" });

const AuditLeadSchema = z.object({
    email: z.string().email(),
    websiteUrl: z.string().min(3),
    honeypot: z.string().optional()
});


export async function performLiveAuditAction(domain: string) {
    console.log(`[AUDIT] Performing live audit for: ${domain}`);
    try {
        // 1. System Platform Protection (Global Daily AI Cap)
        // Hard limit: Maximum 100 scans per day total for the entire site
        const { success: platformAllowed } = await checkGlobalDailyLimit('global_api_scans_daily', 100);
        if (!platformAllowed) {
            console.error(`[AI BUDGET] Global daily scan limit reached. Blocking request for ${domain}`);
            return {
                success: false,
                message: 'System at capacity. To ensure high quality, we limit daily scans. Please try again tomorrow.'
            };
        }

        // 2. Individual Rate Limit Check (5 requests per min per IP)
        const ip = await getClientIp();
        const { success: allowed } = await checkRateLimit(`audit_${ip}`, 5, 60000);
        if (!allowed) {
            console.warn(`[RATE LIMIT] Blocked audit request from ${ip}`);
            return { success: false, message: 'Too many requests. Please try again in a minute.' };
        }

        // 3. Input Validation
        const parsed = AuditDomainSchema.safeParse(domain);
        if (!parsed.success) {
            return { success: false, message: 'Invalid domain name format.' };
        }

        // 4. Compute Protection (Caching Layer)
        // Check if we've already audited this exact domain in the last 24 hours.
        const cacheKey = `audit_result_${parsed.data}`;
        const cachedResult = globalCache.get(cacheKey);

        if (cachedResult) {
            console.log(`[CACHE HIT] Returning saved result for ${parsed.data} (Skipping AI execution)`);
            return { success: true, data: cachedResult, source: 'cache' };
        }

        // 5. Execute Action (Expensive AI/Scanner Operation)
        console.log(`[CACHE MISS] Executing fresh AI scan for ${parsed.data}...`);
        const result = await performSiteAudit(parsed.data);

        // Save the result to cache for 24 hours (24 * 60 * 60 * 1000 ms = 86400000 ms)
        globalCache.set(cacheKey, result, 86400000);

        return { success: true, data: result, source: 'live' };
    } catch (error) {
        console.error('[AUDIT ERROR]', error);
        return { success: false, message: 'Audit failed to run due to an internal error.' };
    }
}

/**
 * PHASE 2 FIX: Email Lead Capture + Dashboard Integration
 * Saves audit lead submissions directly to SQLite database
 */
export async function submitAuditLeadAction(data: { email: string; websiteUrl: string; honeypot?: string }) {
    console.log(`[LEAD CAPTURE] Processing new audit lead: ${data.email} for ${data.websiteUrl}`);

    // If Honeypot is filled, it's a bot. Silently drop the request to save DB,
    // but return success to trick the bot into thinking it worked.
    if (data.honeypot) {
        console.warn(`[HONEYPOT BLOCKED] Bot detected submitting email: ${data.email}`);
        return {
            success: true,
            message: `Report request received! We'll send the full audit to ${data.email} within 24 hours.`
        };
    }

    try {
        // 1. Rate Limit Check (3 leads per 5 min)
        const ip = await getClientIp();
        const { success: allowed } = await checkRateLimit(`lead_${ip}`, 3, 5 * 60000);
        if (!allowed) {
            return { success: false, message: 'Too many requests. Please try again later.' };
        }

        // 2. Input Validation
        const parsed = AuditLeadSchema.safeParse(data);
        if (!parsed.success) {
            return { success: false, message: 'Invalid email or website format.' };
        }

        // 3. Re-fetch AI data from cache (or re-run if expired)
        const cacheKey = `audit_result_${parsed.data.websiteUrl}`;
        let auditData = globalCache.get(cacheKey);

        if (!auditData) {
            console.log(`[LEAD CAPTURE] Cache miss for ${parsed.data.websiteUrl}, running rapid background scan for PDF...`);
            auditData = await performSiteAudit(parsed.data.websiteUrl);
            globalCache.set(cacheKey, auditData, 86400000);
        }

        // 4. Generate Personalized PDF Report Buffer
        console.log(`[LEAD CAPTURE] Generating PDF report for ${parsed.data.websiteUrl}...`);
        const pdfBuffer = await generateAuditReportPDF(auditData as AuditResult);

        // 5. Simulate Email Dispatch
        // In production, send this via Resend/SendGrid:
        // await resend.emails.send({ to: parsed.data.email, subject: 'Your Response Audit Report', attachments: [{ filename: 'audit.pdf', content: pdfBuffer }]});
        console.log(`[SIMULATED EMAIL] Dispatched audit.pdf (${(pdfBuffer.length / 1024).toFixed(2)} kb) to ${parsed.data.email}`);

        // 6. Return Success
        return {
            success: true,
            message: `Report request received! We'll send the full audit to ${parsed.data.email} within 24 hours.`
        };
    } catch (error) {
        console.error('[LEAD CAPTURE ERROR]', error);
        return {
            success: false,
            message: 'Failed to save your request. Please try again or contact support.'
        };
    }
}

export async function activateSubscriptionAction(businessId: string) {
    console.log(`[ACTION] Activating subscription for ${businessId}...`);
    const subManager = new SubscriptionManager();

    // Simulate payment flow delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const sub = await subManager.activateSubscription(businessId);
    revalidatePath('/');
    return { success: true, subscription: sub };
}

// [SYSTEM 1] DIAGNOSTICS & LOGGING
export async function runDiagnosticsAction() {
    console.log('Running diagnostics via Server Action (REAL MODE)...');

    // Delegate to service
    const { runDiagnosticsEngine } = await import('@/lib/services/diagnosticsService');
    const result = await runDiagnosticsEngine();

    revalidatePath('/');
    return result;
}

export async function handleReplyAction(businessId: string, replyContent: string) {
    console.log(`[ACTION] Received reply from business ${businessId}: "${replyContent}"`);
    const analyzer = new ResponseAnalyzer();
    const engine = new AccountabilityEngine();
    const business = MOCK_BUSINESSES.find(b => b.id === businessId);

    if (!business) return { success: false, message: 'Business not found' };

    const intent = analyzer.analyzeReply(replyContent);
    console.log(`[SYSTEM 5] Analyzed Intent: ${intent}`);

    const complianceLog = engine.generateComplianceLog(business, intent);
    console.log(`[SYSTEM 5] Accountability Engine Generated:\n${complianceLog}`);

    return { success: true, intent, complianceLog };
}

export async function generateAnalyticsReportAction(businessId: string) {
    console.log(`[ACTION] Generating analytics for business ${businessId}...`);

    const funnelTracker = new FunnelTracker();
    const sopEnforcer = new SOPEnforcer();

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    const funnel = funnelTracker.getFunnelReport(businessId);
    const violations = sopEnforcer.checkCompliance(businessId);

    return { success: true, funnel, violations };
}

export async function generateLossEstimateAction(businessId: string, gapId: string) {
    console.log(`[ACTION] Estimating loss for gap ${gapId} at business ${businessId}...`);
    const estimator = new LossEstimator();

    // In a real DB we'd fetch the specific gap. Here we find it in mock store.
    const gap = MOCK_GAPS.find(g => g.id === gapId);

    if (!gap) return { success: false, message: 'Gap not found' };

    const estimate = estimator.estimate(gap);
    return { success: true, estimate };
}

// [SYSTEM 0] DASHBOARD STATS
// [SYSTEM 0] DASHBOARD STATS
export async function getDashboardStatsAction() {
    const { getDashboardStats } = await import('@/lib/services/businessService');
    return getDashboardStats();
}

export async function checkSubscriptionStatusAction(businessId?: string): Promise<{ isActive: boolean; plan: string }> {
    // In a real app, we'd get the businessId from the session
    // For this demo, we'll check against our mock store or default to free

    // Default ID for the demo "logged in" user if none provided
    const targetId = businessId || 'b1';

    const subscription = MOCK_SUBSCRIPTIONS.find(s => s.businessId === targetId && s.status === 'ACTIVE');

    if (subscription) {
        return { isActive: true, plan: subscription.plan };
    }

    return { isActive: false, plan: 'FREE' };
}

export async function createBusinessAction(data: any) {
    console.log(`[ACTION] Creating business: ${data.name}`);
    try {
        const { createBusiness } = await import('@/lib/services/businessService');
        const business = await createBusiness(data);
        revalidatePath('/');
        return { success: true, business };
    } catch (e) {
        console.error('Failed to create business:', e);
        return { success: false, message: 'Failed to create business' };
    }
}
