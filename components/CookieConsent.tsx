'use client';

import { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

export default function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Show after a short delay for better UX
            const timer = setTimeout(() => setVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const accept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setVisible(false);
    };

    const decline = () => {
        localStorage.setItem('cookie-consent', 'essential-only');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-6 duration-500">
            <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex items-start gap-3 flex-1">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Cookie size={20} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                            We use essential cookies to keep you logged in and optional analytics cookies to improve our service.
                            Read our{' '}
                            <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline font-bold">
                                Privacy Policy
                            </a>{' '}
                            for details.
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 w-full md:w-auto">
                    <button
                        onClick={decline}
                        className="flex-1 md:flex-none px-5 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
                    >
                        Essential Only
                    </button>
                    <button
                        onClick={accept}
                        className="flex-1 md:flex-none px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-md"
                    >
                        Accept All
                    </button>
                    <button
                        onClick={decline}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                        aria-label="Close"
                    >
                        <X size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
