'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { SiteHeader } from '@/components/marketing/SiteHeader';
import { SiteFooter } from '@/components/marketing/SiteFooter';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Unhandled Application Error:', error);
    }, [error]);

    return (
        <html lang="en">
            <body>
                <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] text-[#0f172a] dark:text-slate-200 flex flex-col font-sans antialiased">
                    <SiteHeader />

                    <main className="flex-1 flex items-center justify-center p-6">
                        <div className="max-w-md w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-3xl flex items-center justify-center mx-auto shadow-xl shadow-red-500/10 rotate-12">
                                <AlertTriangle size={48} />
                            </div>

                            <div className="space-y-3">
                                <h1 className="text-4xl font-black text-[#0f172a] dark:text-white tracking-tight">System Error</h1>
                                <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
                                    We encountered an unexpected issue while processing your request. Our engineering team has been notified.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                                <button
                                    onClick={() => reset()}
                                    className="w-full sm:w-auto bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                                >
                                    <RefreshCw size={18} />
                                    Try Again
                                </button>
                                <Link
                                    href="/"
                                    className="w-full sm:w-auto bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 font-bold px-8 py-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                                >
                                    <Home size={18} />
                                    Return Home
                                </Link>
                            </div>
                        </div>
                    </main>

                    <SiteFooter />
                </div>
            </body>
        </html>
    );
}
