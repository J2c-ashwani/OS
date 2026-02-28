import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    try {
        const alerts = await db.alert.findMany({
            orderBy: { sentAt: 'desc' },
            take: 50,
        });

        return NextResponse.json({ success: true, alerts });
    } catch (error) {
        console.error('[API] Failed to fetch alerts:', error);
        return NextResponse.json({ success: false, alerts: [] }, { status: 500 });
    }
}
