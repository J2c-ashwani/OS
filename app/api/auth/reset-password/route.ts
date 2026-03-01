import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const { token, password } = await req.json();

        if (!token || !password) {
            return NextResponse.json(
                { message: 'Token and new password are required' },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { message: 'Password must be at least 6 characters' },
                { status: 400 }
            );
        }

        // Find user with the matching token that hasn't expired
        const user = await db.user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpiry: {
                    gt: new Date(), // Token must not be expired
                },
            },
        });

        if (!user) {
            return NextResponse.json(
                { message: 'Invalid or expired reset link. Please request a new one.' },
                { status: 400 }
            );
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the password and clear the reset token
        await db.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null,
            },
        });

        console.log(`[PASSWORD RESET] Password successfully reset for ${user.email}`);

        return NextResponse.json({
            message: 'Password has been reset successfully. You can now sign in.',
        });
    } catch (error) {
        console.error('Reset password error:', error);
        return NextResponse.json(
            { message: 'An error occurred. Please try again.' },
            { status: 500 }
        );
    }
}
