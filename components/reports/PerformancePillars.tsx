"use client";

import React from 'react';

import { BarChart3, Clock, Smile, Zap, Filter, CheckCircle2, AlertCircle, Sparkles, ClipboardCheck } from 'lucide-react';

export default function PerformancePillars() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Pillar 1: Sales Performance */}
            <div className="flex flex-col gap-4">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex-1 flex flex-col shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <BarChart3 className="text-primary" size={24} />
                            1. Sales Performance
                        </h3>
                        <span className="text-xs font-bold text-slate-500">OCT 23</span>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mb-8">
                        <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                            <div className="size-12 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-primary shadow-sm border border-slate-100 dark:border-slate-700">
                                <Clock size={24} />
                            </div>
                            <div>
                                <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">2.4 min</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase mt-1">Avg Response Speed</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
                            <div className="size-12 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-emerald-500 shadow-sm border border-slate-100 dark:border-slate-700">
                                <Smile size={24} />
                            </div>
                            <div>
                                <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">88%</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase mt-1">Health Score</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-800">
                        <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-4 border border-primary/20">
                            <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2 flex items-center gap-1">
                                <Zap size={14} />
                                Next Month Priority
                            </p>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Optimize Weekend Automation</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Reduce Sunday latency spike from 4.1m to sub-3m.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pillar 2: Funnel Efficiency */}
            <div className="flex flex-col gap-4">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex-1 flex flex-col shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <Filter className="text-primary" size={24} />
                            2. Funnel Efficiency
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5 mb-8">
                        <div>
                            <div className="flex justify-between text-xs font-bold mb-2">
                                <span className="text-slate-500 uppercase">Lead-to-Call Drop-off</span>
                                <span className="text-emerald-500">-15% improvement</span>
                            </div>
                            <div className="space-y-2">
                                <div className="relative h-6 w-full bg-slate-100 dark:bg-slate-800 rounded overflow-hidden">
                                    <div className="absolute inset-y-0 left-0 bg-slate-300 dark:bg-slate-600 w-[45%]"></div>
                                    <span className="absolute inset-0 flex items-center px-2 text-[10px] font-bold text-slate-500 dark:text-slate-300">LAST MONTH: 45%</span>
                                </div>
                                <div className="relative h-6 w-full bg-slate-100 dark:bg-slate-800 rounded overflow-hidden">
                                    <div className="absolute inset-y-0 left-0 bg-primary w-[30%]"></div>
                                    <span className="absolute inset-0 flex items-center px-2 text-[10px] font-bold text-white">THIS MONTH: 30%</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3 flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-500 uppercase">Conversion Lift</span>
                            <span className="text-lg font-black text-primary">+4.2%</span>
                        </div>
                    </div>
                    <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-800">
                        <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-4 border border-primary/20">
                            <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2 flex items-center gap-1">
                                <Sparkles size={14} />
                                Diagnostic Insight
                            </p>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Nurture Sequence A/B Test</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Agent to use "Value-First" SOP for 48h follow-ups.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pillar 3: SOP Compliance */}
            <div className="flex flex-col gap-4">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex-1 flex flex-col shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <ClipboardCheck className="text-primary" size={24} />
                            3. SOP Compliance
                        </h3>
                    </div>
                    <div className="flex items-center gap-6 mb-8">
                        <div className="size-24 rounded-full border-8 border-primary border-t-transparent flex items-center justify-center relative">
                            <span className="text-4xl font-black text-primary">A</span>
                            <span className="absolute -top-1 -right-1 text-xl font-bold text-primary">-</span>
                        </div>
                        <div className="flex-1 space-y-3">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={18} className="text-emerald-500" />
                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">98% SOP Adherence</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 size={18} className="text-emerald-500" />
                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">0% Script Deviations</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <AlertCircle size={18} className="text-orange-400" />
                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">2 Policy Edge-Cases</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-800">
                        <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-4 border border-primary/20">
                            <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2 flex items-center gap-1">
                                <FactCheck className="w-3.5 h-3.5" /> {/* Fallback icon or custom SVG if needed, usinglucide equivalent would be better but keeping simple */}
                                Operational Discipline
                            </p>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Refine Refund Policy SOP</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Update diagnostic flow for subscription cancellation requests.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FactCheck({ className }: { className?: string }) {
    return (
        <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
            <path d="M10 9H8" />
        </svg>
    )
}
