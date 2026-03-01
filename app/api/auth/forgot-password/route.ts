import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/lib/db';
import { checkRateLimit } from '@/lib/rate-limit';
import { sanitizeEmail } from '@/lib/sanitize';

export async function POST(req: Request) {
    try {
        // Rate limiting
        const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
        const { allowed } = checkRateLimit(ip, 'forgot-password');
        if (!allowed) {
            return NextResponse.json(
                { message: 'Too many reset attempts. Please try again later.' },
                { status: 429 }
            );
        }

        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { message: 'Email is required' },
                { status: 400 }
            );
        }

        const cleanEmail = sanitizeEmail(email);
        if (!cleanEmail) {
            return NextResponse.json(
                { message: 'Please enter a valid email address' },
                { status: 400 }
            );
        }

        // Always return success to prevent email enumeration attacks
        const successResponse = NextResponse.json({
            message: 'If an account with that email exists, we have sent a password reset link.',
        });

        const user = await db.user.findUnique({
            where: { email: email.toLowerCase().trim() },
        });

        if (!user) {
            // Don't reveal whether the email exists
            return successResponse;
        }

        // Generate a secure random token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

        // Store the token in the database
        await db.user.update({
            where: { id: user.id },
            data: {
                resetToken,
                resetTokenExpiry,
            },
        });

        // In production, send an email with the reset link:
        // const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;
        // await sendEmail({ to: email, subject: 'Reset Your Password', html: `<a href="${resetUrl}">Reset Password</a>` });

        // For development, log the token to the console
        console.log(`\n🔑 [PASSWORD RESET] Token for ${email}: ${resetToken}`);
        console.log(`   Reset link: http://localhost:3000/reset-password?token=${resetToken}\n`);

        return successResponse;
    } catch (error) {
        console.error('Forgot password error:', error);
        return NextResponse.json(
            { message: 'An error occurred. Please try again.' },
            { status: 500 }
        );
    }
}
