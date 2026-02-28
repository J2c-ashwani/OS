import { SiteHeader } from '@/components/marketing/SiteHeader';
import { SiteFooter } from '@/components/marketing/SiteFooter';
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
        <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] text-[#0f172a] dark:text-slate-200 flex flex-col">
            <SiteHeader />

            <main className="container mx-auto max-w-5xl px-6 py-16 flex-1">
                {/* Header */}
                <div className="mb-16 text-center mt-12">
                    <h1 className="text-5xl font-black text-[#0f172a] dark:text-white mb-6 tracking-tight">Simple, Transparent Pricing</h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                        No hidden fees. No long-term contracts. Deploy intelligent monitoring and only pay for what your market needs.
                    </p>
                </div>

                {/* Pricing Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {tiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`rounded-3xl p-8 flex flex-col shadow-xl transition-all ${tier.highlighted
                                ? 'bg-white dark:bg-slate-900 border-2 border-primary relative transform hover:-translate-y-2'
                                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800'
                                }`}
                        >
                            {tier.highlighted && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                                    Most Popular
                                </div>
                            )}

                            {/* Tier Header */}
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-3">
                                    {tier.highlighted ? (
                                        <Zap size={20} className="text-primary" />
                                    ) : (
                                        <Globe size={20} className="text-slate-500" />
                                    )}
                                    <span className="text-sm font-bold text-primary uppercase tracking-wider">
                                        {tier.region}
                                    </span>
                                </div>
                                <h2 className="text-3xl font-black text-[#0f172a] dark:text-white mb-2">{tier.name}</h2>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{tier.description}</p>
                            </div>

                            {/* Price */}
                            <div className="mb-8">
                                <span className="text-6xl font-black text-[#0f172a] dark:text-white tracking-tighter">{tier.price}</span>
                                <span className="text-slate-500 font-medium text-lg ml-1">{tier.period}</span>
                            </div>

                            {/* CTA */}
                            <Link
                                href="/login"
                                className={`w-full flex items-center justify-center gap-2 rounded-xl py-4 text-base font-bold transition-all mb-8 shadow-md ${tier.highlighted
                                    ? 'bg-primary text-white hover:bg-blue-700 hover:shadow-lg'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
                                    }`}
                            >
                                {tier.cta} <ArrowRight size={18} />
                            </Link>

                            {/* Features */}
                            <ul className="space-y-4 flex-1 mt-4">
                                {tier.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 dark:bg-green-900/40 p-1 rounded-full shrink-0">
                                            <Check size={14} className="text-green-600 dark:text-green-500 font-bold" />
                                        </div>
                                        <span className="text-slate-600 dark:text-slate-300 font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Trust Section */}
                <div className="text-center p-12 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 mb-16">
                    <h3 className="text-2xl font-black text-[#0f172a] dark:text-white mb-4">Enterprise-Grade Security</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto font-medium leading-relaxed">
                        We only audit public-facing channels. No access to your internal systems, CRM, or private communications. Your data stays yours.
                    </p>
                    <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-600 dark:text-slate-400 font-bold">
                        <span className="flex items-center gap-2"><ShieldCheck size={18} className="text-primary" /> Non-Invasive Audits</span>
                        <span className="flex items-center gap-2"><ShieldCheck size={18} className="text-primary" /> SOC2 Compliant</span>
                        <span className="flex items-center gap-2"><ShieldCheck size={18} className="text-primary" /> Cancel Anytime</span>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center p-12 rounded-3xl bg-primary text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none"></div>
                    <div className="relative z-10">
                        <h3 className="text-3xl font-black mb-4">Not sure which plan fits?</h3>
                        <p className="text-primary-foreground/80 mb-8 text-lg font-medium max-w-lg mx-auto">
                            Run a free audit first — no signup required. See the gaps we detect before committing.
                        </p>
                        <Link
                            href="/#audit"
                            className="inline-flex items-center justify-center rounded-xl bg-white text-primary px-8 py-4 text-lg font-black hover:bg-slate-50 transition-colors shadow-lg"
                        >
                            Run a Free Audit →
                        </Link>
                    </div>
                </div>
            </main>

            <SiteFooter />
        </div>
    );
}
