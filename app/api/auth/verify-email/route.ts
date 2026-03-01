import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const token = searchParams.get('token');

        if (!token) {
            return NextResponse.json({ message: 'Verification token is required' }, { status: 400 });
        }

        const user = await db.user.findFirst({
            where: {
                verifyToken: token,
                verifyTokenExpiry: { gt: new Date() },
            },
        });

        if (!user) {
            return NextResponse.json({ message: 'Invalid or expired verification link' }, { status: 400 });
        }

        await db.user.update({
            where: { id: user.id },
            data: {
                emailVerified: true,
                verifyToken: null,
                verifyTokenExpiry: null,
            },
        });

        // Redirect to login with success message
        return NextResponse.redirect(new URL('/login?verified=true', req.url));
    } catch (error) {
        console.error('Email verification error:', error);
        return NextResponse.json({ message: 'Verification failed' }, { status: 500 });
    }
}
