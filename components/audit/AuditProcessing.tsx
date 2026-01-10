'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, CheckCircle2, Lock, Scan, RefreshCw, AlertTriangle, ArrowRight, Activity, Search } from 'lucide-react';

interface AuditProcessingProps {
    websiteUrl: string;
    onComplete?: () => void; // Optional: triggers when visual sequence is done
}

const LOG_MESSAGES = [
    "Initializing deep scan on public URLs...",
    "Checking conversion funnel steps (Step 1-4)...",
    "Found 3 potential friction points in checkout.",
    "Agent #04 analyzing customer support response times...",
    "System awaiting data from API gateway...",
    "Verifying SSL handshake latency...",
    "Scanning for broken visual regression...",
    "Cross-referencing industry benchmarks...",
    "Detecting auto-responder gaps...",
    "Compiling final risk assessment report..."
];

const FINDINGS = [
    {
        id: 1,
        title: "Abandoned Cart Leakage",
        desc: "System detected a 42% drop-off at the shipping selection stage. Potential $2,400/mo revenue loss.",
        type: "High Priority",
        color: "red",
        time: "Just now"
    },
    {
        id: 2,
        title: "Customer Support Lag",
        desc: "Response times on WhatsApp exceed SOP targets by 14 minutes on average during peak hours.",
        type: "Medium Risk",
        color: "yellow",
        time: "2m ago"
    },
    {
        id: 3,
        title: "SEO Metadata Gaps",
        desc: "Missing H1 tags on 12 product pages are hindering organic discovery potential.",
        type: "Optimization",
        color: "blue",
        time: "4m ago"
    }
];

export default function AuditProcessing({ websiteUrl, onComplete }: AuditProcessingProps) {
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);
    const [visibleFindings, setVisibleFindings] = useState<number[]>([]);

    useEffect(() => {
        // 1. PROGRESS BAR ANIMATION (Runs for ~10 seconds to 100%)
        const duration = 10000;
        const intervalTime = 100;
        const steps = duration / intervalTime;
        let currentStep = 0;

        const progressInterval = setInterval(() => {
            currentStep++;
            const newProgress = Math.min((currentStep / steps) * 100, 100);
            setProgress(newProgress);

            if (currentStep >= steps) {
                clearInterval(progressInterval);
                if (onComplete) onComplete();
            }
        }, intervalTime);

        // 2. LOGS SIMULATION
        let logIndex = 0;
        const logInterval = setInterval(() => {
            if (logIndex < LOG_MESSAGES.length) {
                setLogs(prev => [...prev, LOG_MESSAGES[logIndex]].slice(-5)); // Keep last 5
                logIndex++;
            } else {
                clearInterval(logInterval);
            }
        }, 1200);

        // 3. FINDINGS DISCOVERY
        const findingsTimers = [2500, 5500, 8500]; // Appear at 2.5s, 5.5s, 8.5s
        findingsTimers.forEach((time, index) => {
            setTimeout(() => {
                setVisibleFindings(prev => [...prev, index]);
            }, time);
        });

        return () => {
            clearInterval(progressInterval);
            clearInterval(logInterval);
        };
    }, [onComplete]);

    return (
        <div className="w-full max-w-[1440px] mx-auto px-6 py-8 animate-in fade-in duration-700">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 mb-6 text-sm">
                <span className="text-slate-500">Audits</span>
                <span className="text-slate-400">/</span>
                <span className="font-medium text-slate-900 dark:text-white">Processing Audit</span>
            </div>

            {/* Page Heading */}
            <div className="mb-10 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2 text-slate-900 dark:text-white">Analyzing Your Business Ecosystem</h2>
                <p className="text-slate-500 dark:text-slate-400 text-lg">The Agentic AI is identifying revenue leaks and operational gaps in real-time.</p>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-12 gap-8">

                {/* Left Side: Progress & Preview */}
                <div className="col-span-12 lg:col-span-7 space-y-6">

                    {/* Progress Card */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold uppercase tracking-wider text-primary">Current Phase</span>
                                <span className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">Mapping Funnel & SOP Compliance</span>
                            </div>
                            <div className="text-right">
                                <span className="text-3xl font-black text-primary">{Math.round(progress)}%</span>
                            </div>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden mb-3">
                            <div
                                className="bg-primary h-full rounded-full transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <div className="flex items-center justify-between text-sm text-slate-500">
                            <div className="flex items-center gap-2">
                                <RefreshCw className="animate-spin" size={14} />
                                <span>Analyzing 1,240 data points...</span>
                            </div>
                            <span>Est. time remaining: {Math.max(0, 10 - Math.floor(progress / 10))}s</span>
                        </div>
                    </div>

                    {/* Website Preview Container */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-lg relative group">
                        {/* Browser Toolbar */}
                        <div className="h-10 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center px-4 gap-2">
                            <div className="flex gap-1.5">
                                <div className="size-3 rounded-full bg-red-400/80"></div>
                                <div className="size-3 rounded-full bg-yellow-400/80"></div>
                                <div className="size-3 rounded-full bg-green-400/80"></div>
                            </div>
                            <div className="flex-1 max-w-md mx-auto h-6 bg-slate-200 dark:bg-slate-800 rounded flex items-center px-3 text-[10px] text-slate-500 italic truncate">
                                {websiteUrl || 'https://your-business.com'}
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="relative aspect-video bg-slate-100 dark:bg-slate-950 overflow-hidden">
                            {/* Mock UI */}
                            <div className="p-8 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
                                <div className="w-full h-12 bg-slate-300 dark:bg-slate-800 rounded-lg mb-8"></div>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <div className="w-full h-32 bg-slate-300 dark:bg-slate-800 rounded-xl"></div>
                                        <div className="w-2/3 h-4 bg-slate-300 dark:bg-slate-800 rounded"></div>
                                        <div className="w-full h-4 bg-slate-300 dark:bg-slate-800 rounded"></div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="w-full h-48 bg-slate-300 dark:bg-slate-800 rounded-xl"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Scanning Effect */}
                            <div className="absolute inset-0 z-10 pointer-events-none">
                                <div className="w-full h-0.5 bg-primary/80 shadow-[0_0_15px_rgba(19,91,236,0.5)] absolute top-0 animate-[scan_3s_linear_infinite]"></div>
                            </div>
                            <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>

                            {/* Floating HUD Markers */}
                            <div className="absolute top-1/4 left-1/3 px-2 py-1 bg-red-500 text-white text-[10px] font-bold rounded shadow-xl animate-pulse">
                                REVENUE LEAK DETECTED
                            </div>
                            <div className="absolute bottom-1/3 right-1/4 px-2 py-1 bg-green-500 text-white text-[10px] font-bold rounded shadow-xl">
                                SOP COMPLIANT
                            </div>
                        </div>
                    </div>

                    {/* Live Logs Console */}
                    <div className="bg-[#0f172a] text-green-400 font-mono text-xs p-4 rounded-lg h-36 overflow-hidden border border-slate-800 shadow-inner flex flex-col justify-end">
                        <div className="space-y-1">
                            {logs.map((log, idx) => (
                                <p key={idx} className={`truncate ${idx === logs.length - 1 ? 'animate-pulse font-bold text-green-300' : 'opacity-60'}`}>
                                    <span className="text-slate-500 mr-2">[{new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                                    {log}
                                </p>
                            ))}
                            <p className="text-white mt-2 animate-pulse">&gt; _</p>
                        </div>
                    </div>

                </div>

                {/* Right Side: Finding Feed */}
                <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Live Preliminary Findings</h3>
                        <span className="text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded border border-primary/20">
                            {visibleFindings.length} Found
                        </span>
                    </div>

                    <div className="space-y-4 h-[600px] overflow-hidden relative">
                        {visibleFindings.map((idx) => {
                            const finding = FINDINGS[idx];
                            return (
                                <div key={finding.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm border-l-4 animate-in slide-in-from-right-4 duration-500" style={{ borderLeftColor: finding.color === 'red' ? '#ef4444' : finding.color === 'yellow' ? '#eab308' : '#3b82f6' }}>
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${finding.color === 'red' ? 'bg-red-100 text-red-600' : finding.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'}`}>
                                            {finding.type}
                                        </span>
                                        <span className="text-slate-400 text-[10px]">{finding.time}</span>
                                    </div>
                                    <h4 className="font-bold text-base mb-1 text-slate-900 dark:text-white">{finding.title}</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{finding.desc}</p>
                                </div>
                            );
                        })}

                        {/* Scanner "Searching" Placeholder */}
                        <div className="bg-slate-50 dark:bg-slate-950 border border-dashed border-slate-300 dark:border-slate-800 p-8 rounded-xl flex flex-col items-center justify-center text-center opacity-60">
                            <Search className="text-primary mb-2 animate-pulse" size={24} />
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Seeking more insights...</p>
                            <p className="text-[10px] text-slate-500">Scanning public reviews & testimonials</p>
                        </div>
                    </div>

                    <div className="mt-auto">
                        <button disabled className="w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 font-bold rounded-xl flex items-center justify-center gap-2 cursor-not-allowed">
                            <span>View Detailed Report</span>
                            <Lock size={16} />
                        </button>
                        <p className="text-center text-[11px] text-slate-500 mt-3">Full report available once processing hits 100%.</p>
                    </div>

                </div>

            </div>

            {/* Bottom Checklist */}
            <section className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                    <CheckCircle2 className={`text-emerald-500 ${progress > 20 ? 'opacity-100' : 'opacity-40'}`} size={20} />
                    <span className="text-sm font-medium text-slate-900 dark:text-white">Website Scan</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                    <CheckCircle2 className={`text-emerald-500 ${progress > 50 ? 'opacity-100' : 'opacity-40'}`} size={20} />
                    <span className="text-sm font-medium text-slate-900 dark:text-white">Funnel Audit</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                    <RefreshCw className="text-primary animate-spin" size={20} />
                    <span className="text-sm font-medium text-primary">SOP Compliance</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-100 dark:bg-slate-950 opacity-40 rounded-lg border border-slate-200 dark:border-slate-800">
                    <Activity size={20} />
                    <span className="text-sm font-medium">Market Benchmarking</span>
                </div>
            </section>
        </div>
    );
}
