/**
 * Simple in-memory rate limiter for API routes.
 * In production, replace with Redis-backed solution for multi-instance deployments.
 */

interface RateLimitEntry {
    count: number;
    resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes
setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
        if (now > entry.resetTime) {
            rateLimitStore.delete(key);
        }
    }
}, 5 * 60 * 1000);

interface RateLimitConfig {
    windowMs: number;   // Time window in milliseconds
    maxRequests: number; // Max requests per window
}

const RATE_LIMITS: Record<string, RateLimitConfig> = {
    login: { windowMs: 15 * 60 * 1000, maxRequests: 10 },  // 10 attempts per 15 min
    register: { windowMs: 60 * 60 * 1000, maxRequests: 5 },   // 5 signups per hour
    'forgot-password': { windowMs: 15 * 60 * 1000, maxRequests: 3 }, // 3 resets per 15 min
    'reset-password': { windowMs: 15 * 60 * 1000, maxRequests: 5 }, // 5 attempts per 15 min
    default: { windowMs: 60 * 1000, maxRequests: 30 },  // 30 requests per minute
};

export function checkRateLimit(
    identifier: string,
    action: string
): { allowed: boolean; retryAfterMs: number } {
    const config = RATE_LIMITS[action] || RATE_LIMITS.default;
    const key = `${action}:${identifier}`;
    const now = Date.now();

    const entry = rateLimitStore.get(key);

    if (!entry || now > entry.resetTime) {
        // New window
        rateLimitStore.set(key, {
            count: 1,
            resetTime: now + config.windowMs,
        });
        return { allowed: true, retryAfterMs: 0 };
    }

    if (entry.count >= config.maxRequests) {
        return {
            allowed: false,
            retryAfterMs: entry.resetTime - now,
        };
    }

    entry.count++;
    return { allowed: true, retryAfterMs: 0 };
}

export function getRateLimitHeaders(identifier: string, action: string) {
    const config = RATE_LIMITS[action] || RATE_LIMITS.default;
    const key = `${action}:${identifier}`;
    const entry = rateLimitStore.get(key);

    return {
        'X-RateLimit-Limit': String(config.maxRequests),
        'X-RateLimit-Remaining': String(
            entry ? Math.max(0, config.maxRequests - entry.count) : config.maxRequests
        ),
        'X-RateLimit-Reset': String(
            entry ? Math.ceil(entry.resetTime / 1000) : Math.ceil((Date.now() + config.windowMs) / 1000)
        ),
    };
}
