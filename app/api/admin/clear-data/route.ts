import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function DELETE() {
    try {
        // Delete in order to respect foreign key constraints
        await db.alert.deleteMany();
        await db.gap.deleteMany();
        await db.diagnosticLog.deleteMany();

        return NextResponse.json({ success: true, message: 'All diagnostic data cleared' });
    } catch (error) {
        console.error('[API] Failed to clear data:', error);
        return NextResponse.json({ success: false, message: 'Failed to clear data' }, { status: 500 });
    }
}
