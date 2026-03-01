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
                            <h2 className="text-2xl font-black text-[#0f172a] dark:text-white mb-4">4. Subscription & Payment Terms</h2>
                            <ul className="list-disc pl-6 space-y-3">
                                <li>All subscriptions are billed on a <strong>monthly recurring basis</strong> through PayPal.</li>
                                <li>Your billing cycle begins on the date of your first successful payment and renews automatically every 30 days.</li>
                                <li>You will receive an email confirmation from PayPal for each payment processed.</li>
                                <li>Pricing is as listed on our <a href="/pricing" className="text-primary hover:text-blue-700 font-bold">Pricing page</a> at the time of subscription. We will notify you at least 15 days in advance of any pricing changes.</li>
                                <li>All payments are processed securely via PayPal. Response Audit does not store your payment card details.</li>
                            </ul>
                        </section>

                        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-md border border-blue-200 dark:border-blue-800/50">
                            <h2 className="text-2xl font-black text-[#0f172a] dark:text-white mb-4">5. Cancellation & Refund Policy</h2>
                            <p className="mb-4">
                                We believe in earning your business every month. Our cancellation policy is designed to be straightforward and fair:
                            </p>
                            <div className="space-y-4 mb-6">
                                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                                    <h3 className="font-bold text-[#0f172a] dark:text-white mb-2">📋 Cancel Anytime</h3>
                                    <p>You may cancel your subscription at any time directly from your dashboard settings or by contacting our support team. No questions asked, no cancellation fees, and no lengthy processes.</p>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                                    <h3 className="font-bold text-[#0f172a] dark:text-white mb-2">✅ Service Until End of Billing Cycle</h3>
                                    <p>Upon cancellation, your subscription remains active and you continue to have full access to all features until the end of your current billing period. We do not cut off access early.</p>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                                    <h3 className="font-bold text-[#0f172a] dark:text-white mb-2">🚫 No Charges After Cancellation</h3>
                                    <p>Once cancelled, <strong>no further payments will be deducted</strong> from your account. Your recurring billing is terminated immediately upon cancellation request, and you will not be charged for any subsequent billing cycles.</p>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                                    <h3 className="font-bold text-[#0f172a] dark:text-white mb-2">💰 Refund Policy</h3>
                                    <p>Due to the nature of our digital diagnostic services and the costs associated with third-party payment processing, <strong>we do not offer refunds</strong> for any completed billing period, whether partial or full. This policy ensures we can continue to deliver high-quality service at a fair price to all customers.</p>
                                </div>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                                We encourage all prospective subscribers to review our service features and take advantage of the free audit tool before subscribing to ensure Response Audit is the right fit for your business.
                            </p>
                        </section>

                        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800">
                            <h2 className="text-2xl font-black text-[#0f172a] dark:text-white mb-4">6. Data Ownership</h2>
                            <p>
                                You retain ownership of all business data and diagnostic results. We retain the right to use
                                aggregated, anonymized data for service improvement and research purposes.
                            </p>
                        </section>

                        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800">
                            <h2 className="text-2xl font-black text-[#0f172a] dark:text-white mb-4">7. Account Termination</h2>
                            <p className="mb-3">
                                We reserve the right to suspend or terminate accounts that violate these terms, engage in abusive
                                behavior, or fail to pay subscription fees. You may terminate your account at any time from the
                                dashboard settings.
                            </p>
                            <p>
                                Upon account termination, your diagnostic data will be retained for 30 days in case you wish to reactivate. After 30 days, all data associated with your account will be permanently deleted.
                            </p>
                        </section>

                        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800">
                            <h2 className="text-2xl font-black text-[#0f172a] dark:text-white mb-4">8. Disclaimer</h2>
                            <p>
                                Response Audit System is provided &quot;as-is&quot; without warranties of any kind. We are not liable for
                                missed inquiries, business losses, or damages resulting from service use or outages.
                            </p>
                        </section>

                        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800">
                            <h2 className="text-2xl font-black text-[#0f172a] dark:text-white mb-4">9. Contact</h2>
                            <p>
                                For questions about these terms, cancellation, or billing, contact us at:{' '}
                                <a href="mailto:support@responseaudit.com" className="text-primary hover:text-blue-700 font-bold">
                                    support@responseaudit.com
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
