import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { OutreachManager } from '@/lib/system4-outreach/manager';

export async function GET() {
    try {
        console.log('[CRON] Starting follow-up email job...');

        // 1. Find leads needing Email 2 (Day 2)
        // logic: emailed > 48h ago, count = 1, status = POC
        const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);

        const leadsForDay2 = await db.business.findMany({
            where: {
                status: 'POC',
                emailCount: 1,
                lastEmailedAt: {
                    lt: twoDaysAgo
                }
            },
            include: { gaps: true },
            take: 10 // Process in batches
        });

        // 2. Find leads needing Email 3 (Day 5)
        // logic: emailed > 3 days after Email 2 (Total 5 days), count = 2, status = POC
        const threeDaysAgo = new Date(Date.now() - 72 * 60 * 60 * 1000);

        const leadsForDay5 = await db.business.findMany({
            where: {
                status: 'POC',
                emailCount: 2,
                lastEmailedAt: {
                    lt: threeDaysAgo
                }
            },
            include: { gaps: true },
            take: 10
        });

        const outreach = new OutreachManager();
        let processed = 0;

        // Process Day 2 Steps
        for (const business of leadsForDay2) {
            console.log(`[FOLLOW-UP] Sending Email 2 to ${business.name}...`);
            await outreach.sendOutreach(business, business.gaps);
            processed++;
        }

        // Process Day 5 Steps
        for (const business of leadsForDay5) {
            console.log(`[FOLLOW-UP] Sending Email 3 to ${business.name}...`);
            await outreach.sendOutreach(business, business.gaps);
            processed++;
        }

        return NextResponse.json({
            success: true,
            message: `Follow-up job complete. Sent ${processed} emails.`,
            stats: {
                day2: leadsForDay2.length,
                day5: leadsForDay5.length
            }
        });

    } catch (error) {
        console.error('[CRON] Follow-up job failed:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
