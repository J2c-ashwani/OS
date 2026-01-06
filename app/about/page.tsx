import PublicNav from '@/components/layout/PublicNav';
import Link from 'next/link';
import { ShieldCheck, Users, Target, Zap } from 'lucide-react';

export const metadata = {
    title: 'About Us | Response Audit System',
    description: 'Learn about Response Audit System and our mission to help businesses never miss another customer inquiry.',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0B0E13] to-[#0A0A0A] text-gray-200">
            <PublicNav />

            <main className="container mx-auto max-w-4xl px-6 py-16">
                {/* Header */}
                <div className="mb-16 text-center">
                    <h1 className="text-5xl font-bold text-white mb-6">About Response Audit System</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        We help businesses ensure that no customer inquiry goes unanswered.
                    </p>
                </div>

                {/* Mission */}
                <div className="mb-16 p-8 rounded-xl bg-[#111]/50 border border-gray-900">
                    <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
                    <p className="text-gray-300 leading-relaxed">
                        Every day, businesses lose potential customers because of slow response times or missed inquiries.
                        Whether it's a broken contact form, an unmonitored email inbox, or a Google Maps message that never
                        gets a reply—these gaps directly impact revenue and customer trust.
                    </p>
                    <p className="text-gray-300 leading-relaxed mt-4">
                        Response Audit System solves this by continuously monitoring your public-facing customer channels and
                        immediately alerting you when we detect response gaps. Think of us as your 24/7 watchdog for customer inquiries.
                    </p>
                </div>

                {/* How We're Different */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Why We're Different</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-xl bg-[#111]/50 border border-gray-900">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4 border border-emerald-500/20">
                                <ShieldCheck size={24} className="text-emerald-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">Non-Invasive</h3>
                            <p className="text-gray-400 text-sm">
                                We only test public channels—no access to your internal systems, CRM, or private communications.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl bg-[#111]/50 border border-gray-900">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4 border border-emerald-500/20">
                                <Zap size={24} className="text-emerald-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">Instant Alerts</h3>
                            <p className="text-gray-400 text-sm">
                                When we detect a problem, you know immediately—not days or weeks later.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl bg-[#111]/50 border border-gray-900">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4 border border-emerald-500/20">
                                <Target size={24} className="text-emerald-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">Actionable Evidence</h3>
                            <p className="text-gray-400 text-sm">
                                Every alert includes specific details and timestamps, so you know exactly what to fix.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Who We Serve */}
                <div className="mb-16">
                    <h2 className="text-2xl font-semibold text-white mb-6">Who We Serve</h2>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        Response Audit System is built for small to medium-sized businesses that rely on customer inquiries
                        for growth but don't have dedicated teams to monitor every channel 24/7.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                        Our clients include service businesses, B2B companies, local retailers, and professional services firms—anyone
                        where missing an inquiry means missing revenue.
                    </p>
                </div>

                {/* CTA */}
                <div className="text-center p-8 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
                    <h3 className="text-2xl font-bold text-white mb-4">Ready to stop missing inquiries?</h3>
                    <p className="text-gray-300 mb-6">
                        Run a free audit of your business and see if we detect any response gaps.
                    </p>
                    <Link
                        href="/#audit"
                        className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-8 py-3 text-base font-semibold text-black hover:bg-emerald-600 transition-colors"
                    >
                        Run a Free Audit →
                    </Link>
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
