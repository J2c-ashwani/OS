/**
 * Sentry Error Monitoring — Instrumentation File
 * 
 * This file is the entry point for Sentry error monitoring integration.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Install Sentry SDK: npm install @sentry/nextjs
 * 2. Set SENTRY_DSN in your .env file (get it from sentry.io after creating a project)
 * 3. Uncomment the initialization code below
 * 
 * For now, this file provides a lightweight error logging fallback
 * that captures errors to console with structured formatting.
 * When you're ready for production, just install @sentry/nextjs and uncomment.
 */

// -------------------------------------------------------------------
// UNCOMMENT BELOW WHEN @sentry/nextjs IS INSTALLED:
// -------------------------------------------------------------------
// import * as Sentry from '@sentry/nextjs';
//
// Sentry.init({
//     dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN,
//     tracesSampleRate: 0.1,        // 10% of transactions for performance monitoring
//     replaysSessionSampleRate: 0,   // Don't record session replays in production
//     replaysOnErrorSampleRate: 1.0, // Record 100% of sessions with errors
//     environment: process.env.NODE_ENV || 'development',
//     enabled: process.env.NODE_ENV === 'production',
// });

// -------------------------------------------------------------------
// LIGHTWEIGHT FALLBACK: Structured console error logging
// This works immediately without any packages installed.
// -------------------------------------------------------------------

interface ErrorReport {
    timestamp: string;
    level: 'error' | 'warning' | 'info';
    message: string;
    context?: Record<string, unknown>;
    stack?: string;
}

const errorLog: ErrorReport[] = [];
const MAX_LOG_SIZE = 500;

export function captureError(error: Error | string, context?: Record<string, unknown>) {
    const report: ErrorReport = {
        timestamp: new Date().toISOString(),
        level: 'error',
        message: typeof error === 'string' ? error : error.message,
        context,
        stack: typeof error === 'string' ? undefined : error.stack,
    };

    errorLog.push(report);
    if (errorLog.length > MAX_LOG_SIZE) errorLog.shift();

    console.error(`[ERROR MONITOR] ${report.timestamp} | ${report.message}`, context || '');

    // UNCOMMENT WHEN SENTRY IS INSTALLED:
    // Sentry.captureException(typeof error === 'string' ? new Error(error) : error, { extra: context });
}

export function captureMessage(message: string, level: 'warning' | 'info' = 'info', context?: Record<string, unknown>) {
    const report: ErrorReport = {
        timestamp: new Date().toISOString(),
        level,
        message,
        context,
    };

    errorLog.push(report);
    if (errorLog.length > MAX_LOG_SIZE) errorLog.shift();

    if (level === 'warning') {
        console.warn(`[WARN MONITOR] ${report.timestamp} | ${message}`, context || '');
    } else {
        console.info(`[INFO MONITOR] ${report.timestamp} | ${message}`, context || '');
    }

    // UNCOMMENT WHEN SENTRY IS INSTALLED:
    // Sentry.captureMessage(message, { level, extra: context });
}

export function getRecentErrors(count = 20): ErrorReport[] {
    return errorLog.slice(-count);
}
