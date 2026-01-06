import PublicNav from '@/components/layout/PublicNav';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export const metadata = {
    title: 'Privacy Policy | Response Audit System',
    description: 'Privacy policy for Response Audit System - how we collect, use, and protect your data.',
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0B0E13] to-[#0A0A0A] text-gray-200">
            <PublicNav />

            <main className="container mx-auto max-w-4xl px-6 py-16">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
                    <p className="text-gray-400">Last updated: January 2026</p>
                </div>

                {/* Content */}
                <div className="prose prose-invert max-w-none">
                    <div className="space-y-8 text-gray-300 leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
                            <p className="mb-4">
                                Response Audit System collects minimal information necessary to provide our monitoring services:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Business Information:</strong> Company name, website URL, primary contact email</li>
                                <li><strong>Diagnostic Data:</strong> Public-facing channel test results (response times, form functionality)</li>
                                <li><strong>Usage Data:</strong> Service usage patterns, dashboard interactions</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
                            <p className="mb-4">We use collected information to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Provide automated response monitoring services</li>
                                <li>Send alerts about detected response gaps</li>
                                <li>Improve our diagnostic algorithms</li>
                                <li>Communicate service updates and recommendations</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">3. Data Security</h2>
                            <p>
                                We implement industry-standard security measures to protect your data. All data transmission uses encryption,
                                and access to diagnostic results is restricted to authorized personnel only.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">4. Data Sharing</h2>
                            <p>
                                We do not sell, trade, or rent your personal information to third parties. Diagnostic data may be shared
                                only with your explicit consent or as required by law.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">5. Your Rights</h2>
                            <p className="mb-4">You have the right to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Access your stored data</li>
                                <li>Request data correction or deletion</li>
                                <li>Opt-out of automated monitoring at any time</li>
                                <li>Export your diagnostic history</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">6. Contact Us</h2>
                            <p>
                                For privacy-related questions or to exercise your data rights, contact us at:{' '}
                                <a href="mailto:privacy@responseaudit.com" className="text-emerald-500 hover:text-emerald-400">
                                    privacy@responseaudit.com
                                </a>
                            </p>
                        </section>
                    </div>
                </div>

                {/* Back Link */}
                <div className="mt-12 pt-8 border-t border-gray-900">
                    <Link href="/" className="inline-flex items-center text-emerald-500 hover:text-emerald-400 transition-colors">
                        ← Back to Home
                    </Link>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-900 py-12 mt-16">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={16} className="text-emerald-500" />
                            <span className="font-semibold">Response Audit System</span>
                        </div>
                        <div className="flex gap-6">
                            <Link href="/privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-gray-400 transition-colors">Terms of Service</Link>
                            <Link href="/about" className="hover:text-gray-400 transition-colors">About Us</Link>
                        </div>
                        <div>© 2026 Response Audit Inc.</div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
