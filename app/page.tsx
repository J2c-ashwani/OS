'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Clock, CheckCircle2, AlertTriangle, ArrowRight, Lock, Send, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { submitAuditLeadAction } from './actions';
import PublicNav from '@/components/layout/PublicNav';

// ----------------------------------------------------------------------
// TYPES
// ----------------------------------------------------------------------
type AuditStep = 'LANDING' | 'CHECKING' | 'RESULT_CLEAN' | 'RESULT_ISSUE';

// ----------------------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------------------
export default function PublicAuditPage() {
    const [step, setStep] = useState<AuditStep>('LANDING');
    const [websiteUrl, setWebsiteUrl] = useState('');
    const [progress, setProgress] = useState(0);
    const [email, setEmail] = useState('');
    const [leadSubmitted, setLeadSubmitted] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    // [SIMULATION] Run the check
    useEffect(() => {
        if (step === 'CHECKING') {
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        // [DEMO LOGIC] If length > 10, show issue. Else clean.
                        // In real app, this would come from server state.
                        // For this specific turn check, let's show ISSUE to demonstrate the value.
                        setStep('RESULT_ISSUE');
                        return 100;
                    }
                    return prev + 1.5;
                });
            }, 50); // ~3s
            return () => clearInterval(interval);
        }
    }, [step]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0B0E13] to-[#0A0A0A] text-gray-200">

            <PublicNav />

            <div className="container mx-auto px-6 py-16">

                {/* 1. HERO SECTION */}
                {step === 'LANDING' && (
                    <div className="w-full max-w-2xl text-center space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">

                        <div className="space-y-6">
                            <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight leading-tight">
                                Some customer inquiries may be getting missed.
                            </h1>
                            <p className="text-xl text-gray-500 max-w-lg mx-auto leading-relaxed">
                                We audit public contact channels and detect response gaps with timestamps.
                            </p>
                        </div>

                        {/* 2. PRIMARY ACTION */}
                        <div className="max-w-[560px] mx-auto space-y-5">
                            <div className="flex items-center gap-2 bg-[#1A1A1A] border-2 border-gray-800 rounded-lg px-2 py-2 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                                <input
                                    type="text"
                                    placeholder="example.com"
                                    value={websiteUrl}
                                    onChange={(e) => setWebsiteUrl(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && websiteUrl.length > 3 && setStep('CHECKING')}
                                    style={{ color: '#ffffff' }}
                                    className="flex-1 bg-transparent border-none outline-none pl-4 pr-2 py-2 placeholder-gray-600 text-lg tracking-wide"
                                />
                                <button
                                    onClick={() => { if (websiteUrl.length > 3) setStep('CHECKING'); }}
                                    disabled={websiteUrl.length < 4}
                                    className="bg-white text-black px-6 py-2.5 rounded-md font-bold text-sm hover:bg-gray-200 transition-all disabled:cursor-not-allowed shrink-0"
                                >
                                    Run Audit
                                </button>
                            </div>
                            <p className="text-center text-xs text-gray-600 flex items-center justify-center gap-2">
                                <Lock size={11} className="opacity-60" />
                                <span>Public audit only • No private access</span>
                            </p>
                        </div>

                        {/* HOW IT WORKS SECTION */}
                        <div className="mt-24 pt-16 border-t border-gray-900">
                            <h2 className="text-3xl font-bold text-white text-center mb-12">How It Works</h2>
                            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                                <div className="text-center space-y-4 p-6 rounded-xl bg-[#111]/50 border border-gray-900 hover:border-gray-800 transition-all hover:shadow-lg hover:shadow-emerald-500/5">
                                    <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mx-auto border border-emerald-500/20">
                                        <ShieldCheck size={28} className="text-emerald-500" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white">1. External Scan</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        We check your public contact channels (forms, email, maps) without accessing private systems.
                                    </p>
                                </div>
                                <div className="text-center space-y-4 p-6 rounded-xl bg-[#111]/50 border border-gray-900 hover:border-gray-800 transition-all hover:shadow-lg hover:shadow-emerald-500/5">
                                    <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mx-auto border border-emerald-500/20">
                                        <Clock size={28} className="text-emerald-500" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white">2. Response Test</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        We simulate an inquiry and measure how long it takes for your team to respond.
                                    </p>
                                </div>
                                <div className="text-center space-y-4 p-6 rounded-xl bg-[#111]/50 border border-gray-900 hover:border-gray-800 transition-all hover:shadow-lg hover:shadow-emerald-500/5">
                                    <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center mx-auto border border-emerald-500/20">
                                        <AlertTriangle size={28} className="text-emerald-500" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white">3. Instant Alert</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        If we detect a gap or slow response, you get an immediate alert with evidence.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                )}

                {/* 3. CHECK IN PROGRESS */}
                {
                    step === 'CHECKING' && (
                        <div className="w-full max-w-md bg-[#111] border border-gray-800 rounded-xl p-8 space-y-8 text-center animate-in fade-in duration-500">
                            <div className="flex justify-center">
                                <div className="relative w-12 h-12">
                                    <div className="absolute inset-0 border-2 border-gray-800 rounded-full"></div>
                                    <div className="absolute inset-0 border-2 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-white">Running public response checks...</h3>
                                <div className="space-y-2">
                                    <CheckStep label="Analyzing DNS records" active={progress > 10} done={progress > 30} />
                                    <CheckStep label="Locating contact forms" active={progress > 30} done={progress > 60} />
                                    <CheckStep label="Testing response latency" active={progress > 60} done={progress > 90} />
                                </div>
                            </div>
                        </div>
                    )
                }

                {/* 4. RESULT: ISSUE FOUND */}
                {
                    step === 'RESULT_ISSUE' && (
                        <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-500">

                            <div className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
                                <div className="p-8 border-b border-gray-800 bg-red-500/5">
                                    <div className="flex items-center gap-3 text-red-400 mb-2">
                                        <AlertTriangle size={20} />
                                        <span className="font-mono text-sm uppercase tracking-wider">Detection Event</span>
                                    </div>
                                    <h2 className="text-2xl font-semibold text-white">Response gap detected</h2>
                                </div>

                                <div className="p-8 space-y-8">

                                    {/* Evidence Block */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center py-3 border-b border-gray-900">
                                            <span className="text-gray-500 text-sm">Target Website</span>
                                            <span className="text-white font-mono text-sm">{websiteUrl || 'example.com'}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-gray-900">
                                            <span className="text-gray-500 text-sm">Channels Tested</span>
                                            <span className="text-gray-400 text-sm">Contact Form, Email, Maps</span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-gray-900">
                                            <span className="text-gray-500 text-sm">Scan Completed</span>
                                            <span className="text-white font-mono text-sm">{new Date().toLocaleString()}</span>
                                        </div>
                                    </div>

                                    {/* What Was Found */}
                                    <div className="bg-red-900/10 border border-red-900/30 rounded-lg p-4">
                                        <div className="flex items-start gap-3">
                                            <AlertTriangle size={16} className="text-red-400 mt-0.5 shrink-0" />
                                            <div className="space-y-2 text-sm">
                                                <p className="text-red-200 font-medium">Gap Detected:</p>
                                                <ul className="text-red-300/80 space-y-1 text-xs">
                                                    <li>• Contact form at <span className="font-mono">{websiteUrl}/contact</span> appears functional</li>
                                                    <li>• However, response time monitoring shows delays &gt;4 hours</li>
                                                    <li>• Email auto-responder: Not detected</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-amber-900/20 border border-amber-900/40 p-4 rounded-lg">
                                        <p className="text-sm text-amber-200 leading-relaxed">
                                            <span className="font-semibold">Note:</span> This is a simulated audit result for demonstration purposes. A full audit would test your actual contact form at {websiteUrl}/contact and measure real response times.
                                        </p>
                                    </div>

                                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
                                        <p className="text-sm text-gray-400 leading-relaxed">
                                            <span className="text-gray-300 font-medium">Why response time matters:</span> Studies show that businesses responding within 1 hour are 7x more likely to qualify leads compared to those responding after 24 hours.
                                        </p>
                                    </div>

                                </div>
                            </div>

                            {/* 5. CONTACT / NEXT STEP (MANDATORY) */}
                            <div className="mt-12 text-center space-y-6 max-w-md mx-auto">
                                <h3 className="text-lg font-medium text-white">Get the full report & fix</h3>

                                {!leadSubmitted ? (
                                    <form
                                        className="space-y-3"
                                        onSubmit={async (e) => {
                                            e.preventDefault();
                                            const formData = new FormData(e.currentTarget);
                                            const emailValue = formData.get('email') as string;

                                            const result = await submitAuditLeadAction({
                                                email: emailValue,
                                                websiteUrl
                                            });

                                            if (result.success) {
                                                setLeadSubmitted(true);
                                                setSubmitMessage(result.message);
                                            } else {
                                                setSubmitMessage(result.message);
                                            }
                                        }}
                                    >
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            placeholder="Enter your work email"
                                            className="w-full bg-[#111] border border-gray-800 text-white p-3 rounded focus:border-gray-500 focus:outline-none transition-colors"
                                        />
                                        <button
                                            type="submit"
                                            className="w-full bg-white text-black font-semibold py-3 rounded hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                                        >
                                            Send me the details <ChevronRight size={16} />
                                        </button>
                                        <p className="text-xs text-gray-600">
                                            We'll send a detailed breakdown of the gap and a one-click fix.
                                        </p>
                                    </form>
                                ) : (
                                    <div className="bg-emerald-900/20 border border-emerald-900/40 p-6 rounded-lg">
                                        <div className="flex items-center justify-center gap-2 text-emerald-400 mb-2">
                                            <CheckCircle2 size={20} />
                                            <span className="font-semibold">Request Submitted!</span>
                                        </div>
                                        <p className="text-sm text-emerald-200">
                                            {submitMessage}
                                        </p>
                                    </div>
                                )}
                            </div>

                        </div>
                    )
                }

            </div>

            {/* 6. TRUST & FOOTER */}
            <footer className="border-t border-gray-900 py-12 bg-[#0A0A0A]">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full opacity-50"></div>
                            <span>Response Audit System</span>
                        </div>

                        <div className="flex flex-wrap justify-center gap-6 text-sm">
                            <Link href="/privacy" className="text-gray-500 hover:text-gray-300 transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-gray-500 hover:text-gray-300 transition-colors">
                                Terms of Service
                            </Link>
                            <Link href="/about" className="text-gray-500 hover:text-gray-300 transition-colors">
                                About Us
                            </Link>
                        </div>

                        <div className="text-xs text-gray-600">
                            © 2026 Response Audit Inc.
                        </div>
                    </div>
                </div>
            </footer>

        </div >
    );
}

// ----------------------------------------------------------------------
// SUB COMPONENTS
// ----------------------------------------------------------------------

function CheckStep({ label, active, done }: { label: string, active: boolean, done: boolean }) {
    return (
        <div className={`flex items-center gap-3 text-sm transition-colors duration-300 ${active || done ? 'text-gray-300' : 'text-gray-700'}`}>
            {done ? (
                <CheckCircle2 size={16} className="text-emerald-500" />
            ) : active ? (
                <div className="w-4 h-4 rounded-full border border-gray-600 border-t-white animate-spin"></div>
            ) : (
                <div className="w-4 h-4 rounded-full border border-gray-800"></div>
            )}
            {label}
        </div>
    );
}
