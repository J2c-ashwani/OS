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

// ... existing lead capture action ...

export async function performLiveAuditAction(domain: string) {
    console.log(`[AUDIT] Performing live audit for: ${domain}`);
    try {
        const result = await performSiteAudit(domain);
        return { success: true, data: result };
    } catch (error) {
        console.error('[AUDIT ERROR]', error);
        return { success: false, message: 'Audit failed to run.' };
    }
}

/**
 * PHASE 2 FIX: Email Lead Capture + Dashboard Integration
 * Saves audit lead submissions directly to SQLite database
 */
export async function submitAuditLeadAction(data: { email: string; websiteUrl: string }) {
    console.log(`[LEAD CAPTURE] Processing new audit lead: ${data.email} for ${data.websiteUrl}`);

    try {
        const { createOrUpdateBusinessTarget } = await import('@/lib/services/businessService');
        const business = await createOrUpdateBusinessTarget(data);

        // 2. Clear cache/revalidate
        revalidatePath('/');

        return {
            success: true,
            message: `Report request received! We'll send the full audit to ${data.email} within 24 hours.`
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
