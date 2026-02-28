import { SiteHeader } from '@/components/marketing/SiteHeader';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export const metadata = {
    title: 'Privacy Policy | Response Audit System',
    description: 'Privacy policy for Response Audit System - how we collect, use, and protect your data.',
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] text-[#0f172a] dark:text-slate-200 flex flex-col">
            <SiteHeader />

            <main className="container mx-auto max-w-4xl px-6 py-16 flex-1">
                {/* Header */}
                <div className="mb-12 mt-12">
                    <h1 className="text-4xl font-black text-[#0f172a] dark:text-white mb-4 tracking-tight">Privacy Policy</h1>
                    <p className="text-slate-500 font-medium">Last updated: January 2026</p>
                </div>

                {/* Content */}
                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <div className="space-y-8 text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800">
                            <h2 className="text-2xl font-black text-[#0f172a] dark:text-white mb-4">1. Information We Collect</h2>
                            <p className="mb-4">
                                Response Audit System collects minimal information necessary to provide our monitoring services:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Business Information:</strong> Company name, website URL, primary contact email</li>
                                <li><strong>Diagnostic Data:</strong> Public-facing channel test results (response times, form functionality)</li>
                                <li><strong>Usage Data:</strong> Service usage patterns, dashboard interactions</li>
                            </ul>
                        </section>

                        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800">
                            <h2 className="text-2xl font-black text-[#0f172a] dark:text-white mb-4">2. How We Use Your Information</h2>
                            <p className="mb-4">We use collected information to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Provide automated response monitoring services</li>
                                <li>Send alerts about detected response gaps</li>
                                <li>Improve our diagnostic algorithms</li>
                                <li>Communicate service updates and recommendations</li>
                            </ul>
                        </section>

                        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800">
                            <h2 className="text-2xl font-black text-[#0f172a] dark:text-white mb-4">3. Data Security</h2>
                            <p>
                                We implement industry-standard security measures to protect your data. All data transmission uses encryption,
                                and access to diagnostic results is restricted to authorized personnel only.
                            </p>
                        </section>

                        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800">
                            <h2 className="text-2xl font-black text-[#0f172a] dark:text-white mb-4">4. Data Sharing</h2>
                            <p>
                                We do not sell, trade, or rent your personal information to third parties. Diagnostic data may be shared
                                only with your explicit consent or as required by law.
                            </p>
                        </section>

                        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800">
                            <h2 className="text-2xl font-black text-[#0f172a] dark:text-white mb-4">5. Your Rights</h2>
                            <p className="mb-4">You have the right to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Access your stored data</li>
                                <li>Request data correction or deletion</li>
                                <li>Opt-out of automated monitoring at any time</li>
                                <li>Export your diagnostic history</li>
                            </ul>
                        </section>

                        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800">
                            <h2 className="text-2xl font-black text-[#0f172a] dark:text-white mb-4">6. Contact Us</h2>
                            <p>
                                For privacy-related questions or to exercise your data rights, contact us at:{' '}
                                <a href="mailto:privacy@responseaudit.com" className="text-primary hover:text-blue-700 font-bold">
                                    privacy@responseaudit.com
                                </a>
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <SiteFooter />
        </div>
    );
}
