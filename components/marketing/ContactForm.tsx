'use client';

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        // Simulate an API call
        setTimeout(() => {
            setStatus('success');
            // Reset after 3 seconds
            setTimeout(() => setStatus('idle'), 3000);
        }, 1000);
    };

    if (status === 'success') {
        return (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-[#0f172a] dark:text-white mb-2">Message Sent!</h3>
                <p className="text-slate-500 dark:text-slate-400">
                    We've received your inquiry and will get back to you shortly.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-8">
            <h3 className="text-2xl font-black text-[#0f172a] dark:text-white mb-6">Send us a message</h3>

            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-bold text-[#0f172a] dark:text-white mb-1.5">First Name</label>
                        <input required type="text" id="firstName" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-[#0f172a] dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" placeholder="John" />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-bold text-[#0f172a] dark:text-white mb-1.5">Last Name</label>
                        <input required type="text" id="lastName" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-[#0f172a] dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" placeholder="Doe" />
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-bold text-[#0f172a] dark:text-white mb-1.5">Work Email</label>
                    <input required type="email" id="email" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-[#0f172a] dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" placeholder="john@company.com" />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-bold text-[#0f172a] dark:text-white mb-1.5">How can we help?</label>
                    <textarea required id="message" rows={4} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-[#0f172a] dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none" placeholder="Tell us about your needs..."></textarea>
                </div>

                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
                >
                    {status === 'submitting' ? (
                        <>Sending...</>
                    ) : (
                        <>
                            <Send size={18} />
                            Send Message
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
