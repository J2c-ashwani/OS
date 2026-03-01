import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                { onboardingComplete: false },
                { status: 401 }
            );
        }

        const user = await db.user.findUnique({
            where: { id: session.user.id },
            select: { onboardingComplete: true },
        });

        return NextResponse.json({
            onboardingComplete: user?.onboardingComplete ?? false,
        });
    } catch (error) {
        console.error('Onboarding status error:', error);
        return NextResponse.json(
            { onboardingComplete: false },
            { status: 500 }
        );
    }
}
