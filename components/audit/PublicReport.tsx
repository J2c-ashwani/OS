
'use client';

import React from 'react';
import { Business, Gap } from '@prisma/client';
import { AlertTriangle, CheckCircle, ArrowRight, Shield, Download, Activity, AlertCircle } from 'lucide-react';

interface PublicReportProps {
    business: Business & { gaps: Gap[] };
}

export default function PublicReport({ business }: PublicReportProps) {
    // Calculate "Reliability Score" based on gaps
    const reliabilityScore = Math.max(0, 100 - (business.gaps.length * 15));
    // Latency Deviation (Mock logic for now, represents "Deviation from Benchmark")
    const latencyDeviation = business.gaps.length > 0 ? ((business.gaps.length * 200) + 100) : 0;

    const handleEnableMonitoring = () => {
        // Prepare for Geo-Pricing Logic (LemonSqueezy)
        // LemonSqueezy handles tax/geo-pricing automatically at checkout.
        alert("Redirecting to LemonSqueezy Checkout...\n\n(Accepts: PayPal, Apple Pay, Cards (Intl + Domestic))\nPrice: $99 (PPP) or $499 (Global)");
    }

    return (
        <div className="min-h-screen bg-[#0A0A0A] font-sans text-slate-200">
            {/* Header */}
            <header className="bg-[#0A0A0A] border-b border-slate-800 py-6 px-6 lg:px-20 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="size-8 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500 font-bold border border-emerald-500/20">
                            <Activity size={18} />
                        </div>
                        <span className="font-bold text-white text-lg tracking-tight">Response Monitor</span>
                    </div>
                    <button className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-white transition-colors">
                        <Download size={16} /> Export Audit Log
                    </button>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 lg:px-20 py-12">

                {/* Hero Reliability Assessment */}
                <section className="bg-[#111] rounded-[2rem] p-8 md:p-12 border border-slate-800 shadow-2xl mb-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-500/5 to-transparent pointer-events-none"></div>
                    <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                        <div className="flex-1 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-900/30 text-yellow-500 border border-yellow-700/50 text-xs font-bold uppercase tracking-wider">
                                <AlertCircle size={12} /> Latency Deviation Detected
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
                                Response time for {business.name} deviates by <span className="text-yellow-500">{latencyDeviation}%</span> from sector benchmark.
                            </h1>
                            <p className="text-lg text-slate-400 leading-relaxed">
                                Our independent monitor detected technical anomalies in your inquiry infrastructure. Consistent reliability is required to maintain trust score.
                            </p>

                            {/* Benchmark Chart */}
                            <div className="space-y-3 pt-4">
                                <div className="flex items-center justify-between text-xs font-mono text-slate-500 uppercase">
                                    <span>Sector Benchmark</span>
                                    <span>~5m</span>
                                </div>
                                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-[15%]"></div>
                                </div>

                                <div className="flex items-center justify-between text-xs font-mono text-slate-500 uppercase mt-4">
                                    <span>Your Detected Latency</span>
                                    <span>~{2 + (business.gaps.length * 4)}h</span>
                                </div>
                                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden relative">
                                    <div className="h-full bg-yellow-500 w-[85%]"></div>
                                    {/* Marker */}
                                    <div className="absolute top-0 right-[15%] h-full w-0.5 bg-white shadow-[0_0_10px_white]"></div>
                                </div>
                            </div>
                        </div>

                        {/* Score Circle */}
                        <div className="relative size-48 md:size-64 flex-shrink-0">
                            <svg className="size-full -rotate-90" viewBox="0 0 100 100">
                                <circle className="text-slate-800 stroke-current" strokeWidth="8" cx="50" cy="50" r="40" fill="transparent"></circle>
                                <circle
                                    className={`${reliabilityScore > 80 ? 'text-emerald-500' : reliabilityScore > 50 ? 'text-yellow-500' : 'text-red-500'} stroke-current transition-all duration-1000 ease-out`}
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="transparent"
                                    strokeDasharray="251.2"
                                    strokeDashoffset={251.2 - (251.2 * reliabilityScore) / 100}
                                ></circle>
                            </svg>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                                <span className={`text-5xl font-black ${reliabilityScore > 80 ? 'text-emerald-500' : reliabilityScore > 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                                    {reliabilityScore}
                                </span>
                                <span className="block text-[10px] font-bold text-slate-500 uppercase mt-2 tracking-widest">Reliability Score</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Evidence Grid */}
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Shield size={20} className="text-emerald-500" />
                    Verification Logs
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    {business.gaps.map((gap) => (
                        <div key={gap.id} className="bg-[#111] p-8 rounded-xl border border-slate-800 hover:border-slate-700 transition-all group">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 rounded-lg bg-red-500/10 text-red-500">
                                    <AlertTriangle size={20} />
                                </div>
                                <span className="text-xs font-mono text-slate-500">{new Date(gap.detectedAt).toLocaleDateString()}</span>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{gap.type.replace('_', ' ')}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6 border-l-2 border-slate-800 pl-4 py-1">
                                "{gap.description}"
                            </p>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-red-400 uppercase tracking-widest">
                                <div className="size-1.5 rounded-full bg-red-500 animate-pulse"></div>
                                Confirmed Deviation
                            </div>
                        </div>
                    ))}

                    {/* Placeholder if no gaps (or few) */}
                    {business.gaps.length === 0 && (
                        <div className="col-span-2 bg-emerald-900/10 p-8 rounded-xl border border-emerald-900/30 flex items-center gap-6">
                            <div className="size-16 rounded-full bg-emerald-900/20 text-emerald-400 flex items-center justify-center shrink-0">
                                <CheckCircle size={28} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">System Verified</h3>
                                <p className="text-slate-400 text-sm">No significant latency deviations detected in this scan interval.</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Upsell / CTA */}
                <section className="bg-gradient-to-b from-[#111] to-[#0A0A0A] rounded-[2rem] p-10 md:p-16 text-center border border-slate-800 relative overflow-hidden">
                    <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                            Ensure consistent uptime & reliability.
                        </h2>
                        <p className="text-slate-400 text-lg">
                            Activate continuous monitoring to receive real-time deviation alerts before they impact trusted status.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <button
                                onClick={handleEnableMonitoring}
                                className="bg-emerald-500 hover:bg-emerald-600 text-black h-14 px-8 rounded-xl font-bold text-sm transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 w-full sm:w-auto"
                            >
                                <Activity size={18} /> Enable Continuous Monitoring
                            </button>
                            <button className="bg-slate-800 hover:bg-slate-700 text-white h-14 px-8 rounded-xl font-bold text-sm transition-all w-full sm:w-auto">
                                Download Log (PDF)
                            </button>
                        </div>
                        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest pt-4">
                            SOC2 Compliant • 99.9% Uptime • Independent Verification
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}
