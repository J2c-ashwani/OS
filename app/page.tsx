'use client';

import { performLiveAuditAction, submitAuditLeadAction } from './actions';
import { AuditResult } from '@/lib/audit/scanner';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    ArrowRight,
    Bot,
    ShieldCheck,
    Link as LinkIcon,
    Shield,
    ScanLine,
    Brain,
    Workflow,
    Lock,
    Zap,
    Layers,
    Droplet,
    MessageSquare,
    FileCode,
    AtSign,
    Share2,
    Globe,
    BadgeCheck,
    CheckCircle2,
    AlertTriangle,
    Clock,
    ChevronRight,
    Menu,
    X,
    Radar,
    Search
} from 'lucide-react';
import PostAuditBridge from '@/components/conversion/PostAuditBridge';
import AuditProcessing from '@/components/audit/AuditProcessing';
import PublicNav from '@/components/layout/PublicNav'; // Re-using if needed, but styling might be different

type AuditStep = 'LANDING' | 'CHECKING' | 'RESULT_ISSUE' | 'REPORT_SENT';

export default function PublicAuditPage() {
    const [step, setStep] = useState<AuditStep>('LANDING');
    const [websiteUrl, setWebsiteUrl] = useState('');
    const [progress, setProgress] = useState(0);
    const [auditData, setAuditData] = useState<AuditResult | null>(null);

    const [leadSubmitted, setLeadSubmitted] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [capturedEmail, setCapturedEmail] = useState('');
    const [capturedUrl, setCapturedUrl] = useState('');

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // [REAL FUNCTIONALITY] Run the real check
    useEffect(() => {
        if (step === 'CHECKING') {
            const interval = setInterval(() => {
                setProgress((prev) => (prev < 90 ? prev + 1.5 : prev));
            }, 50);

            const domainToScan = websiteUrl.replace(/^https?:\/\//, '');

            const executeAudit = async () => {
                try {
                    const res = await performLiveAuditAction(domainToScan);
                    clearInterval(interval);
                    setProgress(100);

                    if (res?.success && res?.data) {
                        setAuditData(res.data);
                        setTimeout(() => {
                            setStep('RESULT_ISSUE');
                        }, 500);
                    } else {
                        throw new Error(res?.message || 'Audit failed');
                    }
                } catch (err) {
                    clearInterval(interval);
                    console.error("Audit Error:", err);
                    alert('Could not reach website. Please check the URL.');
                    setStep('LANDING');
                    setProgress(0);
                }
            };

            executeAudit();
            return () => clearInterval(interval);
        }
    }, [step, websiteUrl]);

    // Determine content based on step
    const showLanding = step === 'LANDING';
    const showChecking = step === 'CHECKING';
    const showResult = step === 'RESULT_ISSUE';
    // REPORT_SENT is handled by the modal component

    return (
        <div className="font-sans antialiased bg-[#f8fafc] dark:bg-[#0f172a] text-[#0f172a] dark:text-slate-200 transition-colors duration-200 min-h-screen flex flex-col">

            {/* HEADER */}
            <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md px-6 md:px-20 py-4 sticky top-0 z-50">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setStep('LANDING'); setWebsiteUrl(''); }}>
                    <div className="size-9 flex items-center justify-center bg-primary rounded-xl text-white shadow-lg shadow-primary/20">
                        <Bot size={22} />
                    </div>
                    <h2 className="text-[#0f172a] dark:text-white text-xl font-extrabold tracking-tight">Response Audit</h2>
                </div>
                <div className="flex flex-1 justify-end gap-10 items-center">
                    <nav className="hidden md:flex items-center gap-8">
                        <a className="text-slate-600 dark:text-slate-400 text-sm font-semibold hover:text-primary transition-colors" href="#how-it-works">How it Works</a>
                        <a className="text-slate-600 dark:text-slate-400 text-sm font-semibold hover:text-primary transition-colors" href="#security">Security</a>
                        <a className="text-slate-600 dark:text-slate-400 text-sm font-semibold hover:text-primary transition-colors" href="#solutions">Solutions</a>
                    </nav>
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/login" className="text-slate-900 dark:text-white text-sm font-bold hover:text-primary transition-colors">Login</Link>
                        <Link href="/login" className="bg-primary text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-md">Get Started</Link>
                    </div>
                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden text-slate-900 dark:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </header>

            {mobileMenuOpen && (
                <div className="md:hidden bg-white dark:bg-[#0f172a] border-b border-slate-200 dark:border-slate-800 p-4 space-y-4">
                    <a className="block text-slate-600 dark:text-slate-400 font-semibold" href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How it Works</a>
                    <Link href="/login" className="block text-slate-900 dark:text-white font-bold">Login</Link>
                    <Link href="/login" className="block text-primary font-bold">Get Started</Link>
                </div>
            )}

            <main className="flex-1 flex flex-col">
                {/* 1. HERO SECTION (Input) */}
                {showLanding && (
                    <section className="relative w-full overflow-hidden hero-gradient flex-1 flex flex-col justify-center">
                        <div className="max-w-[1280px] mx-auto px-6 py-20 md:py-32 w-full">
                            <div className="flex flex-col lg:flex-row gap-16 items-center">
                                {/* Left Content */}
                                <div className="flex flex-col gap-8 flex-1 max-w-[640px]">
                                    <div className="flex flex-col gap-6">
                                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 w-fit">
                                            <ShieldCheck size={16} />
                                            <span className="text-[11px] font-black uppercase tracking-[0.1em]">Public-Data Secure Audit</span>
                                        </div>
                                        <h1 className="text-[#0f172a] dark:text-white text-5xl md:text-7xl font-black leading-[1.05] tracking-tight">
                                            Recover Lost Revenue with <span className="text-primary">Agentic AI</span>
                                        </h1>
                                        <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-[580px]">
                                            Deploy intelligent agents to scan your operations. Identify leaks, analyze conversations, and audit SOPs in under 60 seconds.
                                        </p>
                                    </div>
                                    <div className="w-full flex flex-col gap-4">
                                        <div className="flex flex-col md:flex-row w-full items-stretch gap-3">
                                            <div className="flex-1 flex items-center rounded-2xl h-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none focus-within:ring-2 focus-within:ring-primary/50 transition-all px-5">
                                                <LinkIcon className="text-slate-400 mr-3" size={20} />
                                                <input
                                                    className="flex-1 border-none bg-transparent focus:ring-0 text-slate-900 dark:text-white text-base placeholder:text-slate-400 font-medium outline-none"
                                                    placeholder="yourcompany.com"
                                                    value={websiteUrl}
                                                    onChange={(e) => setWebsiteUrl(e.target.value)}
                                                    onKeyDown={(e) => e.key === 'Enter' && websiteUrl.length > 3 && setStep('CHECKING')}
                                                />
                                            </div>
                                            <button
                                                onClick={() => { if (websiteUrl.length > 3) setStep('CHECKING'); }}
                                                disabled={websiteUrl.length < 4}
                                                className="flex items-center justify-center rounded-2xl bg-primary text-white text-base font-extrabold px-8 h-16 hover:bg-blue-700 hover:-translate-y-0.5 transition-all shadow-lg shadow-primary/25 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed">
                                                Run Audit
                                                <ArrowRight className="ml-2" size={20} />
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-2.5 px-2">
                                            <Shield className="text-green-500 fill-current" size={18} />
                                            <p className="text-slate-500 dark:text-slate-400 text-[13px] font-medium">
                                                No login required. We only analyze public endpoints to protect internal privacy.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Visualization */}
                                <div className="flex-1 w-full max-w-[560px] hidden lg:block">
                                    <div className="relative rounded-3xl bg-slate-100/50 dark:bg-slate-800/30 p-4 border border-slate-200 dark:border-slate-800 shadow-inner">
                                        <div className="relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden aspect-[4/3] flex flex-col">
                                            {/* Browser Bar */}
                                            <div className="h-10 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-1.5">
                                                <div className="size-2.5 rounded-full bg-red-400/30"></div>
                                                <div className="size-2.5 rounded-full bg-yellow-400/30"></div>
                                                <div className="size-2.5 rounded-full bg-green-400/30"></div>
                                                <div className="mx-auto bg-white dark:bg-slate-700 h-5 w-48 rounded-md border border-slate-200 dark:border-slate-600 flex items-center px-2">
                                                    <div className="h-1 w-24 bg-slate-200 dark:bg-slate-500 rounded-full"></div>
                                                </div>
                                            </div>
                                            {/* Visualization Content */}
                                            <div className="flex-1 p-8 flex flex-col gap-6 relative">
                                                <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                                                    <div className="scan-line top-[30%] opacity-40"></div>
                                                    <div className="absolute inset-0 bg-primary/5 opacity-0 hover:opacity-100 transition-opacity"></div>
                                                </div>
                                                <div className="flex justify-between items-start">
                                                    <div className="space-y-3">
                                                        <div className="h-3 w-32 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                                                        <div className="h-6 w-48 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                                                    </div>
                                                    <div className="size-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                                                        <ScanLine className="text-primary" size={24} />
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                                                        <div className="h-2 w-12 bg-slate-200 dark:bg-slate-600 rounded-full mb-2"></div>
                                                        <div className="h-4 w-20 bg-red-100 dark:bg-red-900/30 rounded-md"></div>
                                                    </div>
                                                    <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                                                        <div className="h-2 w-12 bg-slate-200 dark:bg-slate-600 rounded-full mb-2"></div>
                                                        <div className="h-4 w-20 bg-green-100 dark:bg-green-900/30 rounded-md"></div>
                                                    </div>
                                                </div>
                                                <div className="flex-1 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center gap-3 p-6 bg-slate-50/30">
                                                    <div className="flex items-center gap-2">
                                                        <div className="size-2 rounded-full bg-primary animate-ping"></div>
                                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Scanning Infrastructure</span>
                                                    </div>
                                                    <div className="w-full max-w-[200px] h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                                        <div className="h-full bg-primary w-[65%] rounded-full"></div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                                                    <div className="h-2 w-2/3 bg-slate-100 dark:bg-slate-800 rounded-full"></div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Floating Badge */}
                                        <div className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-3 rounded-2xl shadow-xl flex items-center gap-3">
                                            <div className="size-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                                <Brain size={20} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">AI AGENT ACTIVE</p>
                                                <p className="text-sm font-bold">Heuristic Engine v4.0</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* 2. CHECKING IN PROGRESS */}
                {showChecking && (
                    <AuditProcessing
                        websiteUrl={websiteUrl}
                        onComplete={() => {
                            // Only transition if we have data (or if it failed, handled by error block)
                            // The real audit runs in background. 
                            // If real audit finishes FAST, we wait for this visual to cleanup.
                            // If real audit is SLOW, we might sit at 100% here until data arrives.
                            if (auditData) {
                                setStep('RESULT_ISSUE');
                            }
                        }}
                    />
                )}

                {/* 3. RESULTS */}
                {showResult && (
                    <section className="relative w-full overflow-hidden hero-gradient flex-1 flex flex-col items-center justify-center py-20">
                        <div className="w-full max-w-2xl px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-2xl overflow-hidden">
                                <div className="p-8 border-b border-slate-200 dark:border-slate-800 bg-red-50 dark:bg-red-500/10">
                                    <div className="flex items-center gap-3 text-red-500 mb-2">
                                        <AlertTriangle size={20} />
                                        <span className="font-mono text-sm uppercase tracking-wider font-bold">Critical Event</span>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-black text-[#0f172a] dark:text-white">Response gap detected</h2>
                                </div>

                                <div className="p-8 md:p-10 space-y-8">
                                    {/* Evidence Table */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800">
                                            <span className="text-slate-500 font-medium">Target Website</span>
                                            <span className="font-mono font-bold">{auditData?.domain || websiteUrl}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800">
                                            <span className="text-slate-500 font-medium">Channels Detected</span>
                                            <span className="text-slate-700 dark:text-slate-300">
                                                {[
                                                    auditData?.hasMxRecords ? 'Email' : '',
                                                    auditData?.hasForms ? 'Contact Form' : '',
                                                    auditData?.hasContactPage ? 'Contact Page' : ''
                                                ].filter(Boolean).join(', ') || 'None Detected'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-800">
                                            <span className="text-slate-500 font-medium">Scan Status</span>
                                            <span className={`font-mono font-bold ${auditData?.isOnline ? 'text-emerald-500' : 'text-red-500'}`}>
                                                {auditData?.isOnline ? 'ONLINE' : 'UNREACHABLE'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Findings */}
                                    <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl p-6">
                                        <div className="flex items-start gap-4">
                                            <AlertTriangle size={20} className="text-red-500 mt-1 shrink-0" />
                                            <div className="space-y-2">
                                                <p className="text-red-800 dark:text-red-200 font-bold">Risk Assessment Findings:</p>
                                                <ul className="text-red-700 dark:text-red-300 space-y-1 text-sm list-disc pl-4">
                                                    {auditData?.details.map((detail, idx) => (
                                                        <li key={idx}>{detail}</li>
                                                    ))}
                                                    {auditData?.isOnline && (
                                                        <li>Response latency is currently unmonitored.</li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Capture Form */}
                                    <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-center space-y-6 max-w-md mx-auto">
                                        <h3 className="text-lg font-bold text-[#0f172a] dark:text-white">Get the full report & fix</h3>

                                        {!leadSubmitted ? (
                                            <form
                                                className="space-y-4"
                                                onSubmit={async (e) => {
                                                    e.preventDefault();
                                                    const formData = new FormData(e.currentTarget);
                                                    const emailValue = formData.get('email') as string;
                                                    setCapturedEmail(emailValue);
                                                    setCapturedUrl(websiteUrl);

                                                    const result = await submitAuditLeadAction({
                                                        email: emailValue,
                                                        websiteUrl
                                                    });

                                                    if (result.success) {
                                                        setLeadSubmitted(true);
                                                        setSubmitMessage(result.message);
                                                        setStep('REPORT_SENT');
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
                                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all dark:text-white"
                                                />
                                                <button
                                                    type="submit"
                                                    className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                                                >
                                                    Send me the details <ChevronRight size={18} />
                                                </button>
                                                <p className="text-xs text-slate-500">
                                                    We'll send a detailed breakdown of the gap and a one-click fix.
                                                </p>
                                            </form>
                                        ) : (
                                            <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 p-6 rounded-xl">
                                                <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-400 mb-2">
                                                    <CheckCircle2 size={20} />
                                                    <span className="font-bold">Request Submitted!</span>
                                                </div>
                                                <p className="text-sm text-emerald-700 dark:text-emerald-300">
                                                    {submitMessage}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Social Proof Strip - Always show except when step is Checking */}
                {!showChecking && (
                    <section className="w-full bg-white dark:bg-slate-900/50 border-y border-slate-100 dark:border-slate-800 py-10">
                        <div className="max-w-[1280px] mx-auto px-6">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                                <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Powering Smarter SMBs</p>
                                <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500 text-slate-900 dark:text-white">
                                    <div className="flex items-center gap-2 font-bold text-xl"><Workflow size={24} /> ConnectX</div>
                                    <div className="flex items-center gap-2 font-bold text-xl"><Lock size={24} /> Fortify</div>
                                    <div className="flex items-center gap-2 font-bold text-xl"><Zap size={24} /> RapidFlow</div>
                                    <div className="flex items-center gap-2 font-bold text-xl"><Layers size={24} /> Stacked</div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* How It Works - Only show on Landing */}
                {showLanding && (
                    <section className="w-full py-24 md:py-32" id="how-it-works">
                        <div className="max-w-[1280px] mx-auto px-6">
                            <div className="text-center mb-20 space-y-4">
                                <h2 className="text-[#0f172a] dark:text-white text-3xl md:text-5xl font-black tracking-tight">How the Audit Works</h2>
                                <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-medium max-w-[700px] mx-auto leading-relaxed">
                                    Our Agentic AI OS autonomously navigates your public-facing touchpoints to simulate customer journeys and detect inefficiencies.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="group flex flex-col p-10 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5">
                                    <div className="size-16 rounded-2xl bg-red-50 dark:bg-red-900/10 text-red-500 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                        <Droplet size={36} className="font-light" />
                                    </div>
                                    <h3 className="text-[#0f172a] dark:text-white text-2xl font-extrabold mb-4">Detecting Leaks</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                        Our agents identify breakage points in your funnel where qualified prospects are dropping off. We pinpoint exact UI/UX friction causing revenue loss.
                                    </p>
                                    <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center text-primary font-bold text-sm">
                                        View leak report samples <ArrowRight className="ml-1" size={16} />
                                    </div>
                                </div>
                                <div className="group flex flex-col p-10 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5">
                                    <div className="size-16 rounded-2xl bg-blue-50 dark:bg-blue-900/10 text-primary flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                        <MessageSquare size={36} className="font-light" />
                                    </div>
                                    <h3 className="text-[#0f172a] dark:text-white text-2xl font-extrabold mb-4">Analyzing Conversations</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                        We test your front-line response speed and quality. Our AI audits lead management patterns against industry benchmarks to eliminate ghosting.
                                    </p>
                                    <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center text-primary font-bold text-sm">
                                        Communication benchmarks <ArrowRight className="ml-1" size={16} />
                                    </div>
                                </div>
                                <div className="group flex flex-col p-10 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5">
                                    <div className="size-16 rounded-2xl bg-green-50 dark:bg-green-900/10 text-green-500 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                        <FileCode size={36} className="font-light" />
                                    </div>
                                    <h3 className="text-[#0f172a] dark:text-white text-2xl font-extrabold mb-4">Auditing SOPs</h3>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                        Reverse-engineer your visible operational workflows. We compare your public processes against AI-optimized Standard Operating Procedures.
                                    </p>
                                    <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center text-primary font-bold text-sm">
                                        Standardization guide <ArrowRight className="ml-1" size={16} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Footer CTA - Show on Landing */}
                {showLanding && (
                    <section className="w-full px-6 py-12 mb-20">
                        <div className="max-w-[1280px] mx-auto bg-[#0f172a] rounded-[2.5rem] p-12 md:p-24 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/20 to-transparent pointer-events-none"></div>
                            <div className="absolute -bottom-24 -left-24 size-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
                            <div className="relative z-10 flex flex-col items-center text-center gap-8">
                                <h2 className="text-white text-4xl md:text-6xl font-black leading-tight max-w-[800px]">
                                    Stop guessing. Start <span className="text-primary">Optimizing</span>.
                                </h2>
                                <p className="text-slate-400 text-lg md:text-xl max-w-[600px]">
                                    Join thousands of SMBs using Response Audit to transform their operations into a high-performance engine.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center">
                                    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="bg-primary text-white hover:bg-blue-700 h-16 px-10 rounded-2xl font-black text-lg transition-all shadow-xl shadow-primary/20 flex items-center justify-center">
                                        Start Your Free Audit
                                    </button>
                                    <button className="bg-slate-800 text-white hover:bg-slate-700 h-16 px-10 rounded-2xl font-bold text-lg border border-slate-700 transition-all flex items-center justify-center">
                                        Book Strategy Call
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-16 px-6">
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
                                <a className="size-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-primary transition-colors" href="#">
                                    <AtSign size={20} />
                                </a>
                                <a className="size-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-primary transition-colors" href="#">
                                    <Share2 size={20} />
                                </a>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:col-span-3 gap-8">
                            <div className="space-y-6">
                                <h4 className="font-black text-xs uppercase tracking-widest text-slate-900 dark:text-white">Platform</h4>
                                <ul className="space-y-4">
                                    <li><a className="text-sm text-slate-500 hover:text-primary transition-colors font-medium" href="#">Core Engine</a></li>
                                    <li><a className="text-sm text-slate-500 hover:text-primary transition-colors font-medium" href="#">Audit Marketplace</a></li>
                                    <li><a className="text-sm text-slate-500 hover:text-primary transition-colors font-medium" href="#">Agent Integrations</a></li>
                                    <li><a className="text-sm text-slate-500 hover:text-primary transition-colors font-medium" href="#">Security Stack</a></li>
                                </ul>
                            </div>
                            <div className="space-y-6">
                                <h4 className="font-black text-xs uppercase tracking-widest text-slate-900 dark:text-white">Resources</h4>
                                <ul className="space-y-4">
                                    <li><a className="text-sm text-slate-500 hover:text-primary transition-colors font-medium" href="#">Audit Framework</a></li>
                                    <li><a className="text-sm text-slate-500 hover:text-primary transition-colors font-medium" href="#">Success Stories</a></li>
                                    <li><a className="text-sm text-slate-500 hover:text-primary transition-colors font-medium" href="#">API Docs</a></li>
                                    <li><a className="text-sm text-slate-500 hover:text-primary transition-colors font-medium" href="#">Agentic Blog</a></li>
                                </ul>
                            </div>
                            <div className="space-y-6">
                                <h4 className="font-black text-xs uppercase tracking-widest text-slate-900 dark:text-white">Company</h4>
                                <ul className="space-y-4">
                                    <li><a className="text-sm text-slate-500 hover:text-primary transition-colors font-medium" href="#">About Us</a></li>
                                    <li><a className="text-sm text-slate-500 hover:text-primary transition-colors font-medium" href="#">Privacy Policy</a></li>
                                    <li><a className="text-sm text-slate-500 hover:text-primary transition-colors font-medium" href="#">Terms of Service</a></li>
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

            {/* Post-Audit Bridge Modal */}
            {step === 'REPORT_SENT' && (
                <PostAuditBridge
                    email={capturedEmail}
                    businessUrl={capturedUrl}
                    onClose={() => {
                        setStep('LANDING');
                        setWebsiteUrl('');
                        setLeadSubmitted(false);
                        setProgress(0);
                    }}
                />
            )}
        </div>
    );
}


