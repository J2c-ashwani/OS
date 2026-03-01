/**
 * Input sanitization utilities for server-side validation.
 */

/** Strip HTML tags and dangerous characters */
export function sanitizeString(input: string): string {
    return input
        .replace(/<[^>]*>/g, '')          // Strip HTML tags
        .replace(/[<>'"`;(){}]/g, '')     // Remove dangerous characters
        .trim();
}

/** Validate and sanitize email */
export function sanitizeEmail(email: string): string | null {
    const cleaned = email.toLowerCase().trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(cleaned)) return null;
    if (cleaned.length > 254) return null;
    return cleaned;
}

/** Validate and sanitize URL */
export function sanitizeUrl(url: string): string | null {
    let cleaned = url.trim();
    // Add protocol if missing
    if (!cleaned.startsWith('http://') && !cleaned.startsWith('https://')) {
        cleaned = 'https://' + cleaned;
    }
    try {
        const parsed = new URL(cleaned);
        // Only allow http/https protocols
        if (!['http:', 'https:'].includes(parsed.protocol)) return null;
        // Must have a valid domain with at least one dot
        if (!parsed.hostname.includes('.')) return null;
        if (parsed.hostname.length > 253) return null;
        return cleaned;
    } catch {
        return null;
    }
}

/** Validate business name */
export function sanitizeBusinessName(name: string): string | null {
    const cleaned = sanitizeString(name);
    if (cleaned.length < 2 || cleaned.length > 100) return null;
    return cleaned;
}

/** Validate user name */
export function sanitizeUserName(name: string): string | null {
    const cleaned = sanitizeString(name);
    if (cleaned.length < 1 || cleaned.length > 100) return null;
    return cleaned;
}

/** Validate password strength */
export function validatePassword(password: string): { valid: boolean; message: string } {
    if (password.length < 6) {
        return { valid: false, message: 'Password must be at least 6 characters' };
    }
    if (password.length > 128) {
        return { valid: false, message: 'Password must not exceed 128 characters' };
    }
    return { valid: true, message: '' };
}
