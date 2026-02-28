import PublicNav from '@/components/layout/PublicNav';
import Link from 'next/link';
import { ShieldCheck, Check, Zap, Globe, ArrowRight } from 'lucide-react';

export const metadata = {
    title: 'Pricing | Response Audit System',
    description: 'Simple, transparent pricing for continuous response monitoring. Plans starting at $99/mo.',
};

const tiers = [
    {
        name: 'Growth',
        region: 'India & Emerging Markets',
        price: '$99',
        period: '/mo',
        description: 'Essential response monitoring for growing businesses in emerging markets.',
        cta: 'Start Monitoring',
        highlighted: false,
        features: [
            'Automated response gap detection',
            'Up to 5 monitored channels',
            'Weekly diagnostic reports',
            'Email alerts on critical gaps',
            'Basic SOP compliance tracking',
            'Standard support',
        ],
    },
    {
        name: 'Enterprise',
        region: 'USA, UK, EU & Canada',
        price: '$499',
        period: '/mo',
        description: 'Full-spectrum audit and monitoring for established businesses in Tier 1 markets.',
        cta: 'Deploy Full Audit',
        highlighted: true,
        features: [
            'Everything in Growth, plus:',
            'Unlimited monitored channels',
            'Real-time continuous monitoring',
            'AI-powered conversation intelligence',
            'Funnel leak analysis & ROI tracking',
            'Advanced SOP enforcement & builder',
            'Revenue loss estimation per gap',
            'Custom escalation workflows',
            'Priority support & onboarding',
        ],
    },
];

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0B0E13] to-[#0A0A0A] text-gray-200">
            <PublicNav />

            <main className="container mx-auto max-w-5xl px-6 py-16">
                {/* Header */}
                <div className="mb-16 text-center">
                    <h1 className="text-5xl font-bold text-white mb-6">Simple, Transparent Pricing</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        No hidden fees. No long-term contracts. Deploy intelligent monitoring and only pay for what your market needs.
                    </p>
                </div>

                {/* Pricing Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {tiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`rounded-2xl p-8 flex flex-col ${tier.highlighted
                                    ? 'bg-gradient-to-b from-emerald-500/10 to-[#111]/50 border-2 border-emerald-500/30 relative'
                                    : 'bg-[#111]/50 border border-gray-900'
                                }`}
                        >
                            {tier.highlighted && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                                    Most Popular
                                </div>
                            )}

                            {/* Tier Header */}
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-3">
                                    {tier.highlighted ? (
                                        <Zap size={20} className="text-emerald-500" />
                                    ) : (
                                        <Globe size={20} className="text-emerald-500" />
                                    )}
                                    <span className="text-sm font-semibold text-emerald-500 uppercase tracking-wider">
                                        {tier.region}
                                    </span>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">{tier.name}</h2>
                                <p className="text-gray-400 text-sm">{tier.description}</p>
                            </div>

                            {/* Price */}
                            <div className="mb-8">
                                <span className="text-5xl font-bold text-white">{tier.price}</span>
                                <span className="text-gray-500 text-lg">{tier.period}</span>
                            </div>

                            {/* CTA */}
                            <Link
                                href="/login"
                                className={`w-full flex items-center justify-center gap-2 rounded-lg py-3 text-base font-semibold transition-colors mb-8 ${tier.highlighted
                                        ? 'bg-emerald-500 text-black hover:bg-emerald-600'
                                        : 'bg-white/10 text-white hover:bg-white/20 border border-gray-800'
                                    }`}
                            >
                                {tier.cta} <ArrowRight size={18} />
                            </Link>

                            {/* Features */}
                            <ul className="space-y-3 flex-1">
                                {tier.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-sm">
                                        <Check size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                                        <span className="text-gray-300">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Trust Section */}
                <div className="text-center p-8 rounded-xl bg-[#111]/50 border border-gray-900 mb-16">
                    <h3 className="text-xl font-bold text-white mb-4">Enterprise-Grade Security</h3>
                    <p className="text-gray-400 mb-6 max-w-lg mx-auto">
                        We only audit public-facing channels. No access to your internal systems, CRM, or private communications. Your data stays yours.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                        <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-500" /> Non-Invasive Audits</span>
                        <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-500" /> SOC2 Compliant</span>
                        <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-500" /> Cancel Anytime</span>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center p-8 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
                    <h3 className="text-2xl font-bold text-white mb-4">Not sure which plan fits?</h3>
                    <p className="text-gray-300 mb-6">
                        Run a free audit first — no signup required. See the gaps we detect before committing.
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
