import { SiteHeader } from '@/components/marketing/SiteHeader';
import { SiteFooter } from '@/components/marketing/SiteFooter';
import Link from 'next/link';
import { ShieldCheck, Mail } from 'lucide-react';

export const metadata = {
    title: 'Contact Us | Response Audit System',
    description: 'Get in touch with the Response Audit System team.',
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] text-[#0f172a] dark:text-slate-200 flex flex-col">
            <SiteHeader />

            <main className="container mx-auto max-w-2xl px-6 py-16 flex-1">
                <div className="mb-12 text-center mt-12">
                    <h1 className="text-4xl font-black text-[#0f172a] dark:text-white mb-4 tracking-tight">Contact Us</h1>
                    <p className="text-xl text-slate-500 dark:text-slate-400 font-medium">Have questions? We're here to help.</p>
                </div>

                <div className="space-y-6">
                    <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center shrink-0">
                                <Mail size={24} className="text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-[#0f172a] dark:text-white mb-2">Email Support</h3>
                                <p className="text-slate-500 dark:text-slate-400 mb-4 font-medium">For inquiries or support:</p>
                                <a href="mailto:support@responseaudit.com" className="text-primary hover:text-blue-700 font-bold text-lg">
                                    support@responseaudit.com
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 rounded-3xl bg-primary text-white shadow-xl text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none"></div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black mb-4">Not a customer yet?</h3>
                            <Link href="/#audit" className="inline-flex items-center justify-center rounded-xl bg-white text-primary px-8 py-4 text-lg font-black hover:bg-slate-50 transition-colors shadow-lg">
                                Run Free Audit →
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <SiteFooter />
        </div>
    );
}
