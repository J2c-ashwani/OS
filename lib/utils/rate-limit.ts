import { headers } from 'next/headers';

type RateLimit = {
    count: number;
    resetAt: number;
};

// Simple in-memory rate store. For a multi-instance production environment,
// this should be replaced with Redis.
const rateStore = new Map<string, RateLimit>();

export async function checkRateLimit(
    identifier: string,
    limit: number,
    windowMs: number
): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
    const now = Date.now();
    const record = rateStore.get(identifier);

    if (!record || record.resetAt < now) {
        // First request or window expired
        rateStore.set(identifier, {
            count: 1,
            resetAt: now + windowMs
        });
        return { success: true, limit, remaining: limit - 1, reset: now + windowMs };
    }

    if (record.count >= limit) {
        // Rate limit exceeded
        return { success: false, limit, remaining: 0, reset: record.resetAt };
    }

    // Increment count
    record.count++;
    return { success: true, limit, remaining: limit - record.count, reset: record.resetAt };
}

// Global Daily Limit for AI operations
// E.g. limit to 500 scans across ALL users per day to protect budget
export async function checkGlobalDailyLimit(
    globalKey: string,
    dailyLimit: number
): Promise<{ success: boolean; limit: number; current: number }> {
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    const record = rateStore.get(globalKey);

    if (!record || record.resetAt < now) {
        rateStore.set(globalKey, {
            count: 1,
            resetAt: now + oneDay
        });
        return { success: true, limit: dailyLimit, current: 1 };
    }

    if (record.count >= dailyLimit) {
        return { success: false, limit: dailyLimit, current: record.count };
    }

    record.count++;
    return { success: true, limit: dailyLimit, current: record.count };
}

export async function getClientIp() {
    const headersList = await headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    if (forwardedFor) {
        return forwardedFor.split(',')[0].trim();
    }
    return headersList.get('x-real-ip') || 'unknown-ip';
}
