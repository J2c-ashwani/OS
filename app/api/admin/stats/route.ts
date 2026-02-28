import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    try {
        const [totalBusinesses, totalAlerts, totalDiagnostics, totalGaps] = await Promise.all([
            db.business.count(),
            db.alert.count(),
            db.diagnosticLog.count(),
            db.gap.count(),
        ]);

        return NextResponse.json({
            totalBusinesses,
            totalSubscriptions: totalAlerts,
            totalDiagnostics,
            totalGaps,
        });
    } catch (error) {
        console.error('[API] Failed to fetch admin stats:', error);
        return NextResponse.json({ totalBusinesses: 0, totalSubscriptions: 0, totalDiagnostics: 0, totalGaps: 0 }, { status: 500 });
    }
}
