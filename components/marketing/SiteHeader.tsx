'use client';

import Link from 'next/link';
import { Bot, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function SiteHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md px-6 md:px-20 py-4 sticky top-0 z-50">
                <Link href="/" className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105">
                    <div className="size-9 flex items-center justify-center bg-primary rounded-xl text-white shadow-lg shadow-primary/20">
                        <Bot size={22} />
                    </div>
                    <h2 className="text-[#0f172a] dark:text-white text-xl font-extrabold tracking-tight">Response Audit</h2>
                </Link>
                <div className="flex flex-1 justify-end gap-10 items-center">
                    <nav className="hidden md:flex items-center gap-8">
                        <Link className="text-slate-600 dark:text-slate-400 text-sm font-semibold hover:text-primary transition-colors" href="/#how-it-works">Features</Link>
                        <Link className="text-slate-600 dark:text-slate-400 text-sm font-semibold hover:text-primary transition-colors" href="/pricing">Pricing</Link>
                        <Link className="text-slate-600 dark:text-slate-400 text-sm font-semibold hover:text-primary transition-colors" href="/about">About</Link>
                        <Link className="text-slate-600 dark:text-slate-400 text-sm font-semibold hover:text-primary transition-colors" href="/#security">Security</Link>
                        <Link className="text-slate-600 dark:text-slate-400 text-sm font-semibold hover:text-primary transition-colors" href="/#solutions">Solutions</Link>
                    </nav>
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/login" className="text-slate-900 dark:text-white text-sm font-bold hover:text-primary transition-colors">Login</Link>
                        <Link href="/pricing" className="bg-primary text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-md">Start Monitoring</Link>
                    </div>
                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden text-slate-900 dark:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </header>

            {mobileMenuOpen && (
                <div className="md:hidden bg-white dark:bg-[#0f172a] border-b border-slate-200 dark:border-slate-800 p-4 space-y-4 shadow-xl absolute w-full z-40">
                    <Link className="block text-slate-600 dark:text-slate-400 font-semibold" href="/#how-it-works" onClick={() => setMobileMenuOpen(false)}>Features</Link>
                    <Link className="block text-slate-600 dark:text-slate-400 font-semibold" href="/pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
                    <Link className="block text-slate-600 dark:text-slate-400 font-semibold" href="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
                    <Link className="block text-slate-600 dark:text-slate-400 font-semibold" href="/#security" onClick={() => setMobileMenuOpen(false)}>Security</Link>
                    <Link className="block text-slate-600 dark:text-slate-400 font-semibold" href="/#solutions" onClick={() => setMobileMenuOpen(false)}>Solutions</Link>
                    <div className="border-t border-slate-200 dark:border-slate-800 my-2 pt-2"></div>
                    <Link href="/login" className="block text-slate-900 dark:text-white font-bold" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                    <Link href="/pricing" className="block text-primary font-bold" onClick={() => setMobileMenuOpen(false)}>Start Monitoring</Link>
                </div>
            )}
        </>
    );
}
