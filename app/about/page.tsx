import { SiteHeader } from '@/components/marketing/SiteHeader';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import Link from 'next/link';
import { ShieldCheck, Users, Target, Zap } from 'lucide-react';

export const metadata = {
    title: 'About Us | Response Audit System',
    description: 'Learn about Response Audit System and our mission to help businesses never miss another customer inquiry.',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] text-[#0f172a] dark:text-slate-200 flex flex-col">
            <SiteHeader />

            <main className="container mx-auto max-w-4xl px-6 py-16 flex-1">
                {/* Header */}
                <div className="mb-16 text-center mt-12">
                    <h1 className="text-5xl font-black text-[#0f172a] dark:text-white mb-6 tracking-tight">About Response Audit System</h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
                        We help businesses ensure that no customer inquiry goes unanswered.
                    </p>
                </div>

                {/* Mission */}
                <div className="mb-16 p-8 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800">
                    <h2 className="text-2xl font-black text-[#0f172a] dark:text-white mb-4">Our Mission</h2>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                        Every day, businesses lose potential customers because of slow response times or missed inquiries.
                        Whether it's a broken contact form, an unmonitored email inbox, or a Google Maps message that never
                        gets a reply—these gaps directly impact revenue and customer trust.
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-4 font-medium">
                        Response Audit System solves this by continuously monitoring your public-facing customer channels and
                        immediately alerting you when we detect response gaps. Think of us as your 24/7 watchdog for customer inquiries.
                    </p>
                </div>

                {/* How We're Different */}
                <div className="mb-16">
                    <h2 className="text-3xl font-black text-[#0f172a] dark:text-white mb-8 text-center">Why We're Different</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 text-center flex flex-col items-center">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6">
                                <ShieldCheck size={32} className="text-primary" />
                            </div>
                            <h3 className="text-xl font-black text-[#0f172a] dark:text-white mb-3">Non-Invasive</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                                We only test public channels—no access to your internal systems, CRM, or private communications.
                            </p>
                        </div>
                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 text-center flex flex-col items-center">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6">
                                <Zap size={32} className="text-primary" />
                            </div>
                            <h3 className="text-xl font-black text-[#0f172a] dark:text-white mb-3">Instant Alerts</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                                When we detect a problem, you know immediately—not days or weeks later.
                            </p>
                        </div>
                        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 text-center flex flex-col items-center">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6">
                                <Target size={32} className="text-primary" />
                            </div>
                            <h3 className="text-xl font-black text-[#0f172a] dark:text-white mb-3">Actionable Evidence</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                                Every alert includes specific details and timestamps, so you know exactly what to fix.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Who We Serve */}
                <div className="mb-16 p-8 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800">
                    <h2 className="text-2xl font-black text-[#0f172a] dark:text-white mb-6">Who We Serve</h2>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4 font-medium">
                        Response Audit System is built for small to medium-sized businesses that rely on customer inquiries
                        for growth but don't have dedicated teams to monitor every channel 24/7.
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                        Our clients include service businesses, B2B companies, local retailers, and professional services firms—anyone
                        where missing an inquiry means missing revenue.
                    </p>
                </div>

                {/* CTA */}
                <div className="text-center p-12 rounded-3xl bg-primary text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none"></div>
                    <div className="relative z-10">
                        <h3 className="text-3xl font-black mb-4">Ready to stop missing inquiries?</h3>
                        <p className="text-primary-foreground/80 mb-8 text-lg font-medium max-w-lg mx-auto">
                            Run a free audit of your business and see if we detect any response gaps.
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
