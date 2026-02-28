import { SiteHeader } from '@/components/marketing/SiteHeader';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import Link from 'next/link';

export const metadata = {
    title: 'Terms of Service | Response Audit System',
    description: 'Terms of Service for Response Audit System - usage agreement and service terms.',
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] text-[#0f172a] dark:text-slate-200 flex flex-col">
            <SiteHeader />

            <main className="container mx-auto max-w-4xl px-6 py-16 flex-1">
                {/* Header */}
                <div className="mb-12 mt-12">
                    <h1 className="text-4xl font-black text-[#0f172a] dark:text-white mb-4 tracking-tight">Terms of Service</h1>
                    <p className="text-slate-500 font-medium">Last updated: January 2026</p>
                </div>

                {/* Content */}
                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <div className="space-y-8 text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800">
                            <h2 className="text-2xl font-black text-[#0f172a] dark:text-white mb-4">1. Service Description</h2>
                            <p>
                                Response Audit System provides automated monitoring of public-facing customer inquiry channels.
                                Our service operates in passive mode, testing publicly available contact methods without accessing
                                private systems or internal communications.
                            </p>
                        </section>

                        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800">
                            <h2 className="text-2xl font-black text-[#0f172a] dark:text-white mb-4">2. Acceptable Use</h2>
                            <p className="mb-4">By using our service, you agree to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Provide accurate business information and contact details</li>
                                <li>Use the service for legitimate business monitoring purposes</li>
                                <li>Not attempt to reverse-engineer or abuse our diagnostic systems</li>
                                <li>Comply with all applicable laws and regulations</li>
                            </ul>
                        </section>

                        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800">
                            <h2 className="text-2xl font-black text-[#0f172a] dark:text-white mb-4">3. Service Limitations</h2>
                            <p className="mb-4">Please note that:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Our tests simulate customer inquiries and may trigger actual responses</li>
                                <li>Diagnostic results are provided as-is without guarantee of accuracy</li>
                                <li>We cannot monitor private channels or internal communications</li>
                                <li>Service availability is subject to our uptime SLA (99.5% monthly uptime)</li>
                            </ul>
                        </section>

                        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800">
                            <h2 className="text-2xl font-black text-[#0f172a] dark:text-white mb-4">4. Payment Terms</h2>
                            <p>
                                Subscription fees are billed monthly via PayPal. You may cancel your subscription at any time,
                                with access continuing through the end of the current billing period. Refunds are not provided
                                for partial months.
                            </p>
                        </section>

                        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800">
                            <h2 className="text-2xl font-black text-[#0f172a] dark:text-white mb-4">5. Data Ownership</h2>
                            <p>
                                You retain ownership of all business data and diagnostic results. We retain the right to use
                                aggregated, anonymized data for service improvement and research purposes.
                            </p>
                        </section>

                        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800">
                            <h2 className="text-2xl font-black text-[#0f172a] dark:text-white mb-4">6. Termination</h2>
                            <p>
                                We reserve the right to suspend or terminate accounts that violate these terms, engage in abusive
                                behavior, or fail to pay subscription fees. You may terminate your account at any time from the
                                dashboard settings.
                            </p>
                        </section>

                        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800">
                            <h2 className="text-2xl font-black text-[#0f172a] dark:text-white mb-4">7. Disclaimer</h2>
                            <p>
                                Response Audit System is provided "as-is" without warranties of any kind. We are not liable for
                                missed inquiries, business losses, or damages resulting from service use or outages.
                            </p>
                        </section>

                        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800">
                            <h2 className="text-2xl font-black text-[#0f172a] dark:text-white mb-4">8. Contact</h2>
                            <p>
                                For questions about these terms, contact us at:{' '}
                                <a href="mailto:legal@responseaudit.com" className="text-primary hover:text-blue-700 font-bold">
                                    legal@responseaudit.com
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
