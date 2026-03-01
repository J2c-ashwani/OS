import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

// GET all users (admin only)
export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const currentUser = await db.user.findUnique({ where: { id: session.user.id } });
        if (!currentUser || currentUser.role !== 'ADMIN') {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }

        const users = await db.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                onboardingComplete: true,
                createdAt: true,
            },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({ users });
    } catch (error) {
        console.error('Admin users error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

// PATCH — update a user's role (admin only)
export async function PATCH(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const currentUser = await db.user.findUnique({ where: { id: session.user.id } });
        if (!currentUser || currentUser.role !== 'ADMIN') {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }

        const { userId, role } = await req.json();

        if (!userId || !role || !['CUSTOMER', 'ADMIN'].includes(role)) {
            return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
        }

        // Prevent self-demotion
        if (userId === session.user.id && role !== 'ADMIN') {
            return NextResponse.json({ message: 'You cannot remove your own admin role' }, { status: 400 });
        }

        const updated = await db.user.update({
            where: { id: userId },
            data: { role },
            select: { id: true, name: true, email: true, role: true },
        });

        return NextResponse.json({ user: updated });
    } catch (error) {
        console.error('Admin role update error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
