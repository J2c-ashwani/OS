"use client";

import React from 'react';
import OnboardingHeader from '@/components/onboarding/OnboardingHeader';

export default function OnboardingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 font-sans antialiased">
            <OnboardingHeader />
            <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
                {children}
            </main>
        </div>
    );
}
