import { SiteHeader } from '@/components/marketing/SiteHeader';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import Link from 'next/link';

export const metadata = {
    title: 'Privacy Policy | Response Audit',
    description: 'Privacy Policy for Response Audit — how we collect, use, protect, and manage your data.',
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] text-[#0f172a] dark:text-slate-200 flex flex-col">
            <SiteHeader />

            <main className="container mx-auto max-w-4xl px-6 py-16 flex-1">
                {/* Header */}
                <div className="mb-12 mt-12">
                    <h1 className="text-4xl font-black text-[#0f172a] dark:text-white mb-4 tracking-tight">Privacy Policy</h1>
                    <p className="text-slate-500 font-medium">Last updated: March 1, 2026</p>
                    <p className="text-slate-500 text-sm mt-2">
                        This Privacy Policy describes how Response Audit (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;) collects, uses, stores, and protects your personal information when you use the Response Audit platform (&quot;Service&quot;). By using the Service, you consent to the practices described in this policy.
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <div className="space-y-8 text-slate-600 dark:text-slate-300 leading-relaxed font-medium">

                        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800">
                            <h2 className="text-2xl font-black text-[#0f172a] dark:text-white mb-4">1. Information We Collect</h2>
                            <p className="mb-4">We collect only the information necessary to provide and improve the Service:</p>

                            <h3 className="font-bold text-[#0f172a] dark:text-white mb-2 mt-4">1.1 Information You Provide</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Account Information:</strong> Full name, email address, password (stored in encrypted/hashed form)</li>
                                <li><strong>Business Information:</strong> Company name, website URL, industry category, primary contact channel</li>
                                <li><strong>Payment Information:</strong> Processed and stored exclusively by PayPal. We do not collect, access, or store your credit card numbers, bank account details, or PayPal login credentials.</li>
                                <li><strong>Communications:</strong> Support emails, feedback, or inquiries you send to us</li>
                            </ul>

                            <h3 className="font-bold text-[#0f172a] dark:text-white mb-2 mt-6">1.2 Information Collected Automatically</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Diagnostic Data:</strong> Results from public-facing channel tests (response times, form functionality, availability status)</li>
                                <li><strong>Usage Data:</strong> Dashboard interactions, features used, session duration, pages visited</li>
                                <li><strong>Device & Technical Data:</strong> Browser type, operating system, IP address, device identifiers, referring URLs</li>
                                <li><strong>Cookies & Similar Technologies:</strong> Session cookies for authentication, analytics cookies for service improvement (see Section 6)</li>
                            </ul>

                            <h3 className="font-bold text-[#0f172a] dark:text-white mb-2 mt-6">1.3 Information We Do NOT Collect</h3>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>We do not access, intercept, or monitor your private emails, internal chats, or employee communications</li>
                                <li>We do not scrape or store customer personal data from the businesses we audit</li>
                                <li>We do not collect sensitive personal data such as race, ethnicity, political opinions, religious beliefs, health data, or biometric data</li>
                            </ul>
                        </section>

                        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800">
                            <h2 className="text-2xl font-black text-[#0f172a] dark:text-white mb-4">2. How We Use Your Information</h2>
                            <p className="mb-4">We use the collected information for the following purposes:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Service Delivery:</strong> To provide automated response monitoring, generate diagnostic reports, and deliver alerts</li>
                                <li><strong>Account Management:</strong> To create and manage your account, process authentication, and maintain security</li>
                                <li><strong>Payment Processing:</strong> To manage subscriptions and billing through PayPal</li>
                                <li><strong>Communication:</strong> To send service notifications, security alerts, billing confirmations, and important updates</li>
                                <li><strong>Service Improvement:</strong> To analyze usage patterns, improve diagnostic algorithms, and enhance user experience</li>
                                <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, legal processes, or governmental requests</li>
                                <li><strong>Fraud Prevention:</strong> To detect and prevent fraudulent, abusive, or unauthorized account activity</li>
                            </ul>
                            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                                We will never use your data for purposes not described in this policy without your explicit consent.
                            </p>
                        </section>

                        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800">
                            <h2 className="text-2xl font-black text-[#0f172a] dark:text-white mb-4">3. Data Sharing & Third Parties</h2>
                            <p className="mb-4">
                                <strong>We do not sell, trade, rent, or commercially share your personal information with any third party.</strong>
                            </p>
                            <p className="mb-4">We may share limited information only in these circumstances:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Payment Processing:</strong> Subscription data is shared with PayPal solely for the purpose of processing payments. PayPal&apos;s use of your data is governed by their own privacy policy.</li>
                                <li><strong>Legal Requirements:</strong> If required by law, court order, subpoena, or government regulation</li>
                                <li><strong>Protection of Rights:</strong> To protect the safety, rights, or property of the Company, our users, or the public</li>
                                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, user data may be transferred to the acquiring entity. You will be notified in advance.</li>
                                <li><strong>Aggregated Data:</strong> We may share anonymized, aggregated statistical data that cannot identify any individual user, for research or marketing purposes</li>
                            </ul>
                        </section>

                        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800">
                            <h2 className="text-2xl font-black text-[#0f172a] dark:text-white mb-4">4. Data Security</h2>
                            <p className="mb-4">
                                We implement industry-standard security measures to protect your data:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Encryption:</strong> All data transmission uses TLS/SSL encryption. Passwords are stored using bcrypt one-way hashing.</li>
                                <li><strong>Access Control:</strong> Access to user data is restricted to authorized personnel on a need-to-know basis</li>
                                <li><strong>Secure Sessions:</strong> JWT-based authentication tokens with automatic expiration</li>
                                <li><strong>No Card Storage:</strong> We never store credit card or banking information on our servers</li>
                                <li><strong>Regular Monitoring:</strong> We monitor our systems for security vulnerabilities and unauthorized access</li>
                            </ul>
                            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                                While we strive to protect your data, no method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security. You are responsible for maintaining the confidentiality of your account credentials.
                            </p>
                        </section>

                        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800">
                            <h2 className="text-2xl font-black text-[#0f172a] dark:text-white mb-4">5. Data Retention</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Active Accounts:</strong> We retain your data for as long as your account is active and as needed to provide services.</li>
                                <li><strong>After Cancellation:</strong> Diagnostic data is retained for 30 days after account cancellation to allow for reactivation.</li>
                                <li><strong>Permanent Deletion:</strong> After the 30-day retention period, all personal data and diagnostic reports are permanently and irreversibly deleted from our systems.</li>
                                <li><strong>Legal Obligations:</strong> We may retain certain information for longer periods as required by law (e.g., financial records for tax/accounting compliance).</li>
                                <li><strong>Anonymized Data:</strong> Aggregated, anonymized data that cannot identify you may be retained indefinitely for analytical and research purposes.</li>
                            </ul>
                        </section>

                        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800">
                            <h2 className="text-2xl font-black text-[#0f172a] dark:text-white mb-4">6. Cookies & Tracking Technologies</h2>
                            <p className="mb-4">We use the following types of cookies:</p>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-slate-200 dark:border-slate-700">
                                            <th className="text-left py-2 pr-4 font-bold text-[#0f172a] dark:text-white">Type</th>
                                            <th className="text-left py-2 pr-4 font-bold text-[#0f172a] dark:text-white">Purpose</th>
                                            <th className="text-left py-2 font-bold text-[#0f172a] dark:text-white">Required</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-slate-100 dark:border-slate-800">
                                            <td className="py-2 pr-4">Authentication</td>
                                            <td className="py-2 pr-4">Keep you logged in, manage your session</td>
                                            <td className="py-2">Essential</td>
                                        </tr>
                                        <tr className="border-b border-slate-100 dark:border-slate-800">
                                            <td className="py-2 pr-4">Security</td>
                                            <td className="py-2 pr-4">Protect against CSRF attacks, detect abuse</td>
                                            <td className="py-2">Essential</td>
                                        </tr>
                                        <tr className="border-b border-slate-100 dark:border-slate-800">
                                            <td className="py-2 pr-4">Preferences</td>
                                            <td className="py-2 pr-4">Remember your dashboard settings and theme</td>
                                            <td className="py-2">Functional</td>
                                        </tr>
                                        <tr>
                                            <td className="py-2 pr-4">Analytics</td>
                                            <td className="py-2 pr-4">Understand how users interact with the Service</td>
                                            <td className="py-2">Optional</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                                You can manage cookie preferences through your browser settings. Disabling essential cookies may prevent you from using the Service.
                            </p>
                        </section>

                        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800">
                            <h2 className="text-2xl font-black text-[#0f172a] dark:text-white mb-4">7. Your Rights</h2>
                            <p className="mb-4">Depending on your location, you may have the following rights regarding your personal data:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Right to Access:</strong> Request a copy of the personal data we hold about you</li>
                                <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data</li>
                                <li><strong>Right to Deletion:</strong> Request deletion of your personal data (subject to legal retention requirements)</li>
                                <li><strong>Right to Data Portability:</strong> Request your data in a structured, machine-readable format</li>
                                <li><strong>Right to Object:</strong> Object to processing of your data for certain purposes</li>
                                <li><strong>Right to Restrict Processing:</strong> Request restriction of how we process your data</li>
                                <li><strong>Right to Withdraw Consent:</strong> Withdraw previously given consent at any time</li>
                                <li><strong>Right to Opt-Out:</strong> Opt out of marketing communications and automated monitoring at any time</li>
                            </ul>
                            <p className="mt-4">
                                To exercise any of these rights, contact us at <a href="mailto:privacy@responseaudit.com" className="text-primary hover:text-blue-700 font-bold">privacy@responseaudit.com</a>. We will respond within 30 days.
                            </p>
                        </section>

                        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800">
                            <h2 className="text-2xl font-black text-[#0f172a] dark:text-white mb-4">8. International Data Transfers</h2>
                            <p>
                                Your data may be processed and stored in servers located outside your country of residence. By using the Service, you consent to the transfer of your information to countries that may have different data protection laws than your country. We take appropriate safeguards to ensure your data is treated securely and in accordance with this Privacy Policy regardless of where it is processed.
                            </p>
                        </section>

                        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800">
                            <h2 className="text-2xl font-black text-[#0f172a] dark:text-white mb-4">9. Children&apos;s Privacy</h2>
                            <p>
                                The Service is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected data from a child under 18, we will take steps to delete such information promptly. If you believe we have inadvertently collected data from a minor, please contact us immediately.
                            </p>
                        </section>

                        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800">
                            <h2 className="text-2xl font-black text-[#0f172a] dark:text-white mb-4">10. Third-Party Links & Services</h2>
                            <p>
                                The Service may contain links to third-party websites or services (including PayPal). We are not responsible for the privacy practices, content, or security of any third-party sites. We encourage you to read the privacy policies of any third-party services you interact with. This Privacy Policy applies solely to information collected through our Service.
                            </p>
                        </section>

                        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800">
                            <h2 className="text-2xl font-black text-[#0f172a] dark:text-white mb-4">11. Changes to This Policy</h2>
                            <p>
                                We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or the Service. If we make material changes, we will notify you by email or by posting a prominent notice on the Service at least 15 days before the changes take effect. Your continued use of the Service after changes become effective constitutes acceptance of the revised policy.
                            </p>
                        </section>

                        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-md border border-slate-200 dark:border-slate-800">
                            <h2 className="text-2xl font-black text-[#0f172a] dark:text-white mb-4">12. Contact Us</h2>
                            <p className="mb-4">
                                For privacy-related questions, data requests, or to exercise your data rights, contact us at:
                            </p>
                            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                                <p><strong>Response Audit — Privacy Team</strong></p>
                                <p>Privacy Inquiries: <a href="mailto:privacy@responseaudit.com" className="text-primary hover:text-blue-700 font-bold">privacy@responseaudit.com</a></p>
                                <p>General Support: <a href="mailto:support@responseaudit.com" className="text-primary hover:text-blue-700 font-bold">support@responseaudit.com</a></p>
                            </div>
                            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                                By using Response Audit, you agree to this Privacy Policy and our <Link href="/terms" className="text-primary hover:text-blue-700 font-bold">Terms of Service</Link>.
                            </p>
                        </section>

                    </div>
                </div>
            </main>

            <SiteFooter />
        </div>
    );
}
