
'use client';

import React from 'react';
import { Business, Gap } from '@prisma/client';
import { AlertTriangle, CheckCircle, ArrowRight, ShieldAlert, DollarSign, Lock, Download } from 'lucide-react';

interface PublicReportProps {
    business: Business & { gaps: Gap[] };
}

export default function PublicReport({ business }: PublicReportProps) {
    // Calculate "Risk Score" based on gaps
    const riskScore = Math.max(0, 100 - (business.gaps.length * 15));
    const revenueRisk = business.gaps.length * 4500; // Fake "Estimated Loss"

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans">
            {/* Header */}
            <header className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 py-6 px-6 lg:px-20 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                            <ShieldAlert size={18} />
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white text-lg">AuditOS Confidential</span>
                    </div>
                    <button className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors">
                        <Download size={16} /> Download PDF
                    </button>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 lg:px-20 py-12">

                {/* Hero Risk Assessment */}
                <section className="bg-white dark:bg-slate-950 rounded-[2rem] p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-xl mb-12">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-1 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-black uppercase tracking-wider">
                                <AlertTriangle size={12} /> Action Required
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
                                {business.name} is losing an estimated <span className="text-red-500">${revenueRisk.toLocaleString()}/mo</span>
                            </h1>
                            <p className="text-lg text-slate-500 leading-relaxed font-medium">
                                Our autonomous agents detected {business.gaps.length} critical operational gaps in your digital infrastructure. These inefficiencies are causing qualified leads to churn before they reach your sales team.
                            </p>
                        </div>

                        {/* Score Circle */}
                        <div className="relative size-48 md:size-64 flex-shrink-0">
                            <svg className="size-full -rotate-90" viewBox="0 0 100 100">
                                <circle className="text-slate-100 dark:text-slate-800 stroke-current" strokeWidth="10" cx="50" cy="50" r="40" fill="transparent"></circle>
                                <circle
                                    className={`${riskScore > 80 ? 'text-emerald-500' : riskScore > 50 ? 'text-yellow-500' : 'text-red-500'} stroke-current transition-all duration-1000 ease-out`}
                                    strokeWidth="10"
                                    strokeLinecap="round"
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="transparent"
                                    strokeDasharray="251.2"
                                    strokeDashoffset={251.2 - (251.2 * riskScore) / 100}
                                ></circle>
                            </svg>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                                <span className={`text-5xl font-black ${riskScore > 80 ? 'text-emerald-500' : riskScore > 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                                    {riskScore}
                                </span>
                                <span className="block text-xs font-bold text-slate-400 uppercase mt-1">Health Score</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Evidence Grid */}
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8 px-2">Critical Findings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    {business.gaps.map((gap) => (
                        <div key={gap.id} className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-red-100 dark:border-red-900/30 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <AlertTriangle size={80} className="text-red-500" />
                            </div>
                            <div className="size-12 rounded-2xl bg-red-50 dark:bg-red-900/20 text-red-500 flex items-center justify-center mb-6">
                                <AlertTriangle size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{gap.type.replace('_', ' ')}</h3>
                            <p className="text-slate-500 leading-relaxed font-medium mb-6">
                                {gap.description}
                            </p>
                            <div className="flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-wider">
                                <div className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"></div>
                                {gap.severity} Priority
                            </div>
                        </div>
                    ))}

                    {/* Placeholder if no gaps (or few) */}
                    {business.gaps.length === 0 && (
                        <div className="col-span-2 bg-emerald-50 dark:bg-emerald-900/10 p-8 rounded-3xl border border-emerald-100 dark:border-emerald-900/30 flex items-center gap-6">
                            <div className="size-16 rounded-full bg-emerald-100 dark:bg-emerald-800 text-emerald-600 dark:text-emerald-300 flex items-center justify-center shrink-0">
                                <CheckCircle size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-100">System Healthy</h3>
                                <p className="text-emerald-700 dark:text-emerald-300">No critical infrastructure gaps detected in this scan.</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Upsell / CTA */}
                <section className="bg-[#0f172a] rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"></div>
                    <div className="relative z-10 space-y-8 max-w-2xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                            Fix these gaps instantly with <span className="text-primary">AutoFix™</span>
                        </h2>
                        <p className="text-slate-400 text-lg">
                            Our agents can deploy a patch to your sales flow in 60 seconds. Secure your revenue pipeline today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => alert("Stripe Integration Pending (Phase 8). This will launch the $499 Checkout Session.")}
                                className="bg-primary text-white hover:bg-blue-600 h-16 px-10 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 w-full sm:w-auto"
                            >
                                <Lock size={20} /> Deploy Fix ($499)
                            </button>
                            <button className="bg-white/10 text-white hover:bg-white/20 h-16 px-10 rounded-2xl font-bold text-lg transition-all border border-white/10 w-full sm:w-auto">
                                Talk to Expert
                            </button>
                        </div>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">
                            100% Money Back Guarantee • SOC2 Compliant
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}
