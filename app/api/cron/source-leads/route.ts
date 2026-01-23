
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { scraperService } from '@/lib/services/scraperService';

export async function GET() {
    try {
        console.log('[CRON] Starting autonomous lead sourcing job...');

        // 1. Source new leads
        const leads = await scraperService.findLeads(5); // Find 5 new leads

        if (leads.length === 0) {
            return NextResponse.json({ success: true, message: 'No new leads found', added: 0 });
        }

        // 2. Add to Database (Deduping based on website)
        let addedCount = 0;
        const results = [];

        for (const lead of leads) {
            // Check if exists
            const existing = await db.business.findFirst({
                where: { websiteUrl: lead.websiteUrl }
            });

            if (!existing) {
                // 3. ENRICHMENT STEP: Find Decision Maker
                const { ContactFinder } = await import('@/lib/system3-contacts');
                const headhunter = new ContactFinder();

                // Temp object to pass to headhunter
                const tempBiz = { name: lead.name, websiteUrl: lead.websiteUrl } as any;
                const dm = await headhunter.findDecisionMaker(tempBiz);

                // 4. VERIFICATION STEP (NEW): Run Real Audit
                const { performSiteAudit } = await import('@/lib/audit/scanner');
                console.log(`[CRON] Auditing ${lead.websiteUrl}...`);
                const auditResult = await performSiteAudit(lead.websiteUrl);

                // Create Business first
                const newBiz = await db.business.create({
                    data: {
                        name: lead.name,
                        websiteUrl: lead.websiteUrl,
                        industry: lead.industry,
                        address: lead.address,
                        contactPhone: lead.phone,
                        contactName: dm.name,
                        contactEmail: dm.email,
                        contactRole: dm.role,
                        status: 'TARGET',
                        primaryChannel: 'EMAIL',
                        subscription: 'NONE'
                    }
                });

                console.log(`[CRON] Added lead ${newBiz.name} (Score: ${lead.score}/100)`);

                const createdGaps = [];

                // Create Logic from Audit Result
                if (auditResult.responseResult !== 'CLEAN') {
                    // Create a Gap Record
                    const gap = await db.gap.create({
                        data: {
                            businessId: newBiz.id,
                            type: auditResult.responseResult === 'ISSUE' ? 'BROKEN_INFRASTRUCTURE' : 'UNMONITORED_CHANNEL',
                            severity: auditResult.responseResult === 'ISSUE' ? 'HIGH' : 'MEDIUM',
                            description: auditResult.details[0] || 'Technical efficiency gap detected',
                            status: 'OPEN'
                        }
                    });
                    createdGaps.push(gap);
                }

                // 5. ACTION STEP: Autonomous Outreach
                // Only sends if gaps exist
                const { OutreachManager } = await import('@/lib/system4-outreach/manager');
                const outreach = new OutreachManager();
                // Explicitly satisfy the type requirement
                const businessWithStats = { ...newBiz, emailCount: 0 };
                const sent = await outreach.sendOutreach(businessWithStats, createdGaps);

                addedCount++;
                const statusStr = sent ? 'EMAILED' : 'SKIPPED (CLEAN)';
                results.push(`${newBiz.name} (Result: ${auditResult.responseResult} -> ${statusStr})`);
                console.log(`[CRON] Processed ${newBiz.name}: ${statusStr}`);
            }
        }

        return NextResponse.json({
            success: true,
            message: `Autonomous job complete. Added ${addedCount} new businesses.`,
            leads: results
        });

    } catch (error) {
        console.error('[CRON] Sourcing job failed:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
