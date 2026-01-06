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

/**
 * PHASE 2 FIX: Email Lead Capture + Dashboard Integration
 * Saves audit lead submissions AND creates a target business in dashboard
 */
export async function submitAuditLeadAction(data: { email: string; websiteUrl: string }) {
    console.log(`[LEAD CAPTURE] New audit lead: ${data.email} for ${data.websiteUrl}`);

    const timestamp = new Date().toISOString();
    const leadEntry = `${timestamp},${data.email},${data.websiteUrl}\n`;

    try {
        // Save to leads.csv in project root
        const leadsPath = join(process.cwd(), 'audit_leads.csv');
        await appendFile(leadsPath, leadEntry, 'utf-8');

        console.log(`[LEAD CAPTURE] Saved to ${leadsPath}`);

        // PHASE 2: Create business target in dashboard
        const newBusiness: Business = {
            id: `biz_${Date.now()}`,
            name: data.websiteUrl.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0],
            websiteUrl: data.websiteUrl.includes('://') ? data.websiteUrl : `https://${data.websiteUrl}`,
            contactEmail: data.email,
            status: 'TARGET',
            primaryChannel: 'EMAIL'
        };

        // Add to mock businesses if not already present
        const exists = MOCK_BUSINESSES.find(b => b.websiteUrl === newBusiness.websiteUrl);
        if (!exists) {
            MOCK_BUSINESSES.push(newBusiness);
            console.log(`[DASHBOARD INTEGRATION] Created target: ${newBusiness.name}`);
            revalidatePath('/'); // Revalidate to show new business on dashboard
        }

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

export async function runDiagnosticsAction() {
    console.log('Running diagnostics via Server Action...');

    const emailProbe = new EmailProbe();
    const formProbe = new FormProbe();
    const mapsProbe = new MapsProbe();

    const gapAnalyzer = new GapAnalyzer();
    const alertBuilder = new AlertBuilder();

    // Run efficiently in parallel for all TARGET businesses
    const results = await Promise.all(MOCK_BUSINESSES.map(async (biz) => {
        if (biz.status !== 'TARGET') return;

        // [SYSTEM 3] Find Decision Maker
        const contactFinder = new ContactFinder();
        const decisionMaker = await contactFinder.findDecisionMaker(biz);
        console.log(`[SYSTEM 3] Identified DM for ${biz.name}: ${decisionMaker.name} (${decisionMaker.role})`);

        // Run probes based on channel (simplified logic: run all relevant)
        const logs = [];
        if (biz.primaryChannel === 'EMAIL') {
            logs.push(await emailProbe.run(biz));
        } else if (biz.primaryChannel === 'FORM') {
            logs.push(await formProbe.run(biz));
        }
        // Always check Maps if they have an address (mock check)
        if (biz.id === 'b1') { // forcing one to have maps check
            logs.push(await mapsProbe.run(biz));
        }

        // [SYSTEM 12] Governance: Audit & Safeguard
        const transparencyLogger = new TransparencyLogger();
        const safeguardEngine = new SafeguardEngine();
        const consentManager = new ConsentManager();
        const costController = new CostController();

        // 1. Consent Check
        if (!consentManager.canMonitor(biz.id)) return;

        // 2. Cost Control Check
        if (!costController.checkResourceLimits('DIAGNOSTIC')) return;

        // Analyze Logs
        for (const log of logs) {
            const gap = gapAnalyzer.analyze(log);

            // [SYSTEM 12] Log Confidence
            // In LIVE mode, we are conservative.
            let confidenceScore = 0.5; // Default low

            // Logic to determine confidence...
            if (gap?.type === 'BROKEN_FORM') confidenceScore = 0.95;
            else if (gap?.type === 'SLOW_RESPONSE') confidenceScore = 0.9;
            else if (gap?.type === 'MISSED_FOLLOWUP') confidenceScore = 0.85;
            else confidenceScore = 0.6; // Generic/Weak

            transparencyLogger.logObservation(log, confidenceScore >= 0.8 ? 'HIGH' : 'MEDIUM');

            if (gap) {
                // [SYSTEM 12] Check Safeguards
                // HARDENED: Requires >= 0.8
                const safeToAlert = safeguardEngine.shouldAlert(gap, confidenceScore);

                // [LIVE MODE] EXTRA SAFETY CHECK
                // If LIVE, we absolutely CANNOT alert if confidence < 0.8
                if (SYSTEM_MODE === 'LIVE' && confidenceScore < 0.8) {
                    console.log(`[LIVE MODE] BLOCKED Low Confidence Alert for ${biz.id}`);
                    continue;
                }

                if (safeToAlert) {
                    // Create Alert
                    // [SYSTEM 4] Now personalized with DM name
                    // [SYSTEM 12] Append Disclaimer & Sign Identity
                    const disclaimerEngine = new DisclaimerEngine();
                    const identityManager = new IdentityManager();

                    console.log(`[SYSTEM 12] Signing & Disclaimerizing Alert for ${biz.id}`);
                    // Simulate append

                    alertBuilder.createAlert(biz, gap);
                }
            }
        }
    }));

    revalidatePath('/');
    return {
        success: true,
        diagnosticsCount: MOCK_DIAGNOSTICS.length,
        gapsCount: MOCK_GAPS.length,
        alertsCount: MOCK_ALERTS.length,
        subscriptionsCount: MOCK_SUBSCRIPTIONS.length
    };
}

import { ResponseAnalyzer, AutoResponder } from '@/lib/system5-response';

export async function handleReplyAction(businessId: string, replyContent: string) {
    console.log(`[ACTION] Received reply from business ${businessId}: "${replyContent}"`);
    const analyzer = new ResponseAnalyzer();
    const responder = new AutoResponder();
    const business = MOCK_BUSINESSES.find(b => b.id === businessId);

    if (!business) return { success: false, message: 'Business not found' };

    const intent = analyzer.analyzeReply(replyContent);
    console.log(`[SYSTEM 5] Analyzed Intent: ${intent}`);

    const autoReply = responder.generateReply(business, intent);
    console.log(`[SYSTEM 5] Auto-Responder Generated:\n${autoReply}`);

    return { success: true, intent, autoReply };
}

import { FunnelTracker } from '@/lib/system9-funnel';
import { SOPEnforcer } from '@/lib/system10-sop';

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

import { LossEstimator } from '@/lib/system11-loss';

export async function generateLossEstimateAction(businessId: string, gapId: string) {
    console.log(`[ACTION] Estimating loss for gap ${gapId} at business ${businessId}...`);
    const estimator = new LossEstimator();

    // In a real DB we'd fetch the specific gap. Here we find it in mock store.
    const gap = MOCK_GAPS.find(g => g.id === gapId);

    if (!gap) return { success: false, message: 'Gap not found' };

    const estimate = estimator.estimate(gap);
    return { success: true, estimate };
}
