import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { checkRateLimit, getRateLimitHeaders } from '@/lib/rate-limit';
import { sanitizeEmail, sanitizeUserName, validatePassword } from '@/lib/sanitize';

export async function POST(req: Request) {
    try {
        // Rate limiting
        const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
        const { allowed, retryAfterMs } = checkRateLimit(ip, 'register');
        if (!allowed) {
            return NextResponse.json(
                { message: 'Too many signup attempts. Please try again later.' },
                { status: 429, headers: { 'Retry-After': String(Math.ceil(retryAfterMs / 1000)) } }
            );
        }

        const { name, email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Sanitize & validate inputs
        const cleanEmail = sanitizeEmail(email);
        if (!cleanEmail) {
            return NextResponse.json(
                { message: 'Please enter a valid email address' },
                { status: 400 }
            );
        }

        const passwordCheck = validatePassword(password);
        if (!passwordCheck.valid) {
            return NextResponse.json(
                { message: passwordCheck.message },
                { status: 400 }
            );
        }

        const cleanName = name ? sanitizeUserName(name) : null;

        // Check if user already exists
        const existingUser = await db.user.findUnique({
            where: { email: cleanEmail },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: 'An account with this email already exists' },
                { status: 409 }
            );
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = await db.user.create({
            data: {
                email: cleanEmail,
                password: hashedPassword,
                name: cleanName || cleanEmail.split('@')[0],
            },
        });

        const headers = getRateLimitHeaders(ip, 'register');
        return NextResponse.json(
            { message: 'Account created successfully', userId: newUser.id },
            { status: 201, headers }
        );
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
