import { db } from '../db';
import { EmailProbe, FormProbe, MapsProbe } from '../system1-diagnostics';
import { GapAnalyzer } from '../system2-gaps';
import { AlertBuilder } from '../system4-outreach';
import { ContactFinder } from '../system3-contacts';
import { TransparencyLogger, SafeguardEngine, ConsentManager, CostController, DisclaimerEngine, IdentityManager } from '../system12-governance';
import { DiagnosticLog } from '@prisma/client';
import { SYSTEM_MODE } from '../data/store';

export async function runDiagnosticsEngine() {
    console.log('Running diagnostics via Service (REAL MODE)...');

    const emailProbe = new EmailProbe();
    const formProbe = new FormProbe();
    const mapsProbe = new MapsProbe();

    const gapAnalyzer = new GapAnalyzer();
    const alertBuilder = new AlertBuilder();

    // 1. Fetch Real "TARGET" or "MONITORED" businesses
    const targets = await db.business.findMany({
        where: {
            status: {
                in: ['TARGET', 'MONITORED']
            }
        }
    });

    if (targets.length === 0) {
        return { success: true, message: 'No targets to scan.', diagnosticsCount: 0 };
    }

    const startCountLogs = await db.diagnosticLog.count();
    const startCountGaps = await db.gap.count();

    await Promise.all(targets.map(async (biz: any) => {
        // [SYSTEM 3] Find Decision Maker
        const contactFinder = new ContactFinder();
        const decisionMaker = await contactFinder.findDecisionMaker(biz);
        console.log(`[SYSTEM 3] Identified DM for ${biz.name}: ${decisionMaker.name} (${decisionMaker.role})`);

        // Run probes
        const logs: any[] = [];
        if (biz.primaryChannel === 'EMAIL') {
            logs.push(await emailProbe.run(biz));
        } else if (biz.primaryChannel === 'FORM') {
            logs.push(await formProbe.run(biz));
        }

        // [SYSTEM 12] Governance
        const transparencyLogger = new TransparencyLogger();
        const safeguardEngine = new SafeguardEngine();
        const consentManager = new ConsentManager();
        const costController = new CostController();

        if (!consentManager.canMonitor(biz.id)) return;
        if (!costController.checkResourceLimits('DIAGNOSTIC')) return;

        // Persist Logs & Analyze
        for (const log of logs) {
            // [DB] Save Log
            const savedLog = await db.diagnosticLog.create({
                data: {
                    businessId: biz.id,
                    channel: log.channel,
                    // status: 'COMPLETED', // Removed (Schema doesn't have it)
                    result: log.result,
                    evidence: log.evidence,
                    timestampSent: log.timestampSent
                }
            });

            // Analyze
            const gap = gapAnalyzer.analyze(log);

            // [SYSTEM 12] Confidence
            let confidenceScore = 0.5;
            if (gap?.type === 'BROKEN_FORM') confidenceScore = 0.95;
            else if (gap?.type === 'SLOW_RESPONSE') confidenceScore = 0.9;
            else if (gap?.type === 'MISSED_FOLLOWUP') confidenceScore = 0.85;
            else if (gap) confidenceScore = 0.6;

            // [DB] Save Gap if found
            if (gap) {
                const savedGap = await db.gap.create({
                    data: {
                        businessId: biz.id,
                        // diagnosticLogId: savedLog.id, // Removed (Schema doesn't have it)
                        type: gap.type,
                        severity: gap.severity,
                        status: 'OPEN',
                        description: gap.description || '',
                        detectedAt: new Date()
                    }
                });

                // Check Safeguards
                const safeToAlert = safeguardEngine.shouldAlert(gap, confidenceScore);

                if (SYSTEM_MODE === 'LIVE' && confidenceScore < 0.8) {
                    console.log(`[LIVE MODE] BLOCKED Low Confidence Alert for ${biz.id}`);
                    continue;
                }

                if (safeToAlert) {
                    alertBuilder.createAlert(biz, gap);

                    // [DB] Save Alert
                    await db.alert.create({
                        data: {
                            businessId: biz.id,
                            // gapId: savedGap.id, // Removed (Schema doesn't have it? Wait, let's check view_file 1560)
                            // view_file 1560 says Alert has 'content', 'type', 'channel', 'status', 'sentAt', 'businessId'. NO gapId.
                            type: 'GAP_FOUND',
                            channel: 'EMAIL',
                            status: 'DRAFT',
                            content: `Gap Detected: ${gap.type}`,
                            sentAt: new Date()
                        }
                    });
                }
            }
        }
    }));

    const endCountLogs = await db.diagnosticLog.count();
    const endCountGaps = await db.gap.count();

    return {
        success: true,
        diagnosticsCount: endCountLogs - startCountLogs,
        gapsCount: endCountGaps - startCountGaps,
        alertsCount: 0,
        subscriptionsCount: 0
    };
}
