import PublicNav from '@/components/layout/PublicNav';
import Link from 'next/link';
import { ShieldCheck, Mail } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0B0E13] to-[#0A0A0A] text-gray-200">
            <PublicNav />

            <main className="container mx-auto max-w-2xl px-6 py-16">
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
                    <p className="text-xl text-gray-400">Have questions? We're here to help.</p>
                </div>

                <div className="space-y-6">
                    <div className="p-8 rounded-xl bg-[#111]/50 border border-gray-900">
                        <div className="flex items-start gap-4">
                            <Mail size={24} className="text-emerald-500 mt-1" />
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">Email Support</h3>
                                <p className="text-gray-400 mb-4">For inquiries or support:</p>
                                <a href="mailto:support@responseaudit.com" className="text-emerald-500 hover:text-emerald-400 font-medium">
                                    support@responseaudit.com
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 text-center">
                        <h3 className="text-xl font-semibold text-white mb-3">Not a customer yet?</h3>
                        <Link href="/#audit" className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-black hover:bg-emerald-600 transition-colors">
                            Run Free Audit →
                        </Link>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-900">
                    <Link href="/" className="inline-flex items-center text-emerald-500 hover:text-emerald-400 transition-colors">
                        ← Back to Home
                    </Link>
                </div>
            </main>
        </div>
    );
}
