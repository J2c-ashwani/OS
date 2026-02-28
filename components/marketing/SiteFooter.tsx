import Link from 'next/link';
import { Bot, AtSign, Share2, Globe, BadgeCheck } from 'lucide-react';

export function SiteFooter() {
    return (
        <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-16 px-6 relative z-10">
            <div className="max-w-[1280px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 lg:col-span-1 space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="size-8 flex items-center justify-center bg-primary rounded-lg text-white">
                                <Bot size={18} />
                            </div>
                            <h2 className="text-[#0f172a] dark:text-white text-xl font-extrabold tracking-tight">Response Audit</h2>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            The world's first Agentic AI Operating System designed specifically for the operational needs of modern SMBs.
                        </p>
                        <div className="flex gap-4">
                            <Link className="size-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-primary transition-colors" href="/contact">
                                <AtSign size={20} />
                            </Link>
                            <Link className="size-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-primary transition-colors" href="/contact">
                                <Share2 size={20} />
                            </Link>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:col-span-3 gap-8">
                        <div className="space-y-6">
                            <h4 className="font-black text-xs uppercase tracking-widest text-slate-900 dark:text-white">Platform</h4>
                            <ul className="space-y-4">
                                <li><Link className="text-sm text-slate-500 hover:text-primary transition-colors font-medium" href="/#how-it-works">How it Works</Link></li>
                                <li><Link className="text-sm text-slate-500 hover:text-primary transition-colors font-medium" href="/#security">Security Stack</Link></li>
                                <li><Link className="text-sm text-slate-500 hover:text-primary transition-colors font-medium" href="/pricing">Pricing</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h4 className="font-black text-xs uppercase tracking-widest text-slate-900 dark:text-white">Resources</h4>
                            <ul className="space-y-4">
                                <li><Link className="text-sm text-slate-500 hover:text-primary transition-colors font-medium" href="/#how-it-works">Audit Framework</Link></li>
                                <li><Link className="text-sm text-slate-500 hover:text-primary transition-colors font-medium" href="/about">About Us</Link></li>
                                <li><Link className="text-sm text-slate-500 hover:text-primary transition-colors font-medium" href="/contact">Contact</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h4 className="font-black text-xs uppercase tracking-widest text-slate-900 dark:text-white">Legal</h4>
                            <ul className="space-y-4">
                                <li><Link className="text-sm text-slate-500 hover:text-primary transition-colors font-medium" href="/privacy">Privacy Policy</Link></li>
                                <li><Link className="text-sm text-slate-500 hover:text-primary transition-colors font-medium" href="/terms">Terms of Service</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-slate-400 font-medium">© 2026 Response Audit Inc. All rights reserved.</p>
                    <div className="flex items-center gap-6 text-slate-400">
                        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter"><Globe size={14} /> Global Hub</span>
                        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-tighter"><BadgeCheck size={14} /> SOC2 Certified</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
