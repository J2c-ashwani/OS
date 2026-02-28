"use client";

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, Bell, HelpCircle } from 'lucide-react';

export default function OnboardingHeader() {
    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-10 py-3 sticky top-0 z-50">
            <div className="flex items-center gap-4 text-emerald-500">
                <div className="size-6">
                    <ShieldAlert size={24} />
                </div>
                <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Response Audit</h2>
            </div>
            <div className="flex flex-1 justify-end gap-8">
                <div className="hidden md:flex items-center gap-9">
                    <Link href="/app/dashboard" className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-normal hover:text-primary transition-colors">
                        Dashboard
                    </Link>
                    <Link href="/app/onboarding/connect" className="text-primary text-sm font-semibold leading-normal underline decoration-2 underline-offset-8">
                        Onboarding
                    </Link>
                    <Link href="/app/settings" className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-normal hover:text-primary transition-colors">
                        Settings
                    </Link>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        <Bell size={20} />
                    </button>
                    <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        <HelpCircle size={20} />
                    </button>
                </div>
                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-slate-200 dark:border-slate-700 bg-slate-200">
                    {/* Placeholder for user avatar */}
                </div>
            </div>
        </header>
    );
}
