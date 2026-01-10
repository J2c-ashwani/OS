"use client";

import React from 'react';
import { TrendingUp, CheckCircle2, Zap, DollarSign, ArrowUp } from 'lucide-react';

export default function ROIScoreboard() {
    return (
        <div className="flex flex-wrap gap-4 p-4">
            {/* Metric 1: Leakage Reduction */}
            <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a202c]/50 relative overflow-hidden shadow-sm">
                <div className="absolute top-4 right-4 p-1">
                    <CheckCircle2 size={20} className="text-emerald-500 opacity-80" />
                </div>
                <p className="text-slate-500 dark:text-[#92a4c9] text-sm font-medium leading-normal">Leakage Reduction</p>
                <p className="text-slate-900 dark:text-white tracking-light text-3xl font-black leading-tight">24.5%</p>
                <p className="text-emerald-500 text-sm font-bold leading-normal flex items-center gap-1">
                    <TrendingUp size={16} /> +5.2% vs last month
                </p>
            </div>

            {/* Metric 2: Conversion Lift */}
            <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a202c]/50 shadow-sm">
                <p className="text-slate-500 dark:text-[#92a4c9] text-sm font-medium leading-normal">Conversion Lift</p>
                <p className="text-slate-900 dark:text-white tracking-light text-3xl font-black leading-tight">+12.8%</p>
                <p className="text-emerald-500 text-sm font-bold leading-normal flex items-center gap-1">
                    <ArrowUp size={16} /> +1.4% improvement
                </p>
            </div>

            {/* Metric 3: Estimated ROI (Highlight) */}
            <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-primary/30 bg-primary/5 shadow-inner">
                <p className="text-primary text-sm font-bold leading-normal">Estimated ROI</p>
                <p className="text-slate-900 dark:text-white tracking-light text-3xl font-black leading-tight">$142,500</p>
                <p className="text-emerald-500 text-sm font-bold leading-normal flex items-center gap-1">
                    <DollarSign size={16} /> +$12k revenue saved
                </p>
            </div>

            {/* Metric 4: Bottlenecks Fixed */}
            <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a202c]/50 shadow-sm">
                <p className="text-slate-500 dark:text-[#92a4c9] text-sm font-medium leading-normal">Bottlenecks Fixed</p>
                <p className="text-slate-900 dark:text-white tracking-light text-3xl font-black leading-tight">18</p>
                <p className="text-emerald-500 text-sm font-bold leading-normal flex items-center gap-1">
                    <Zap size={16} /> +3 AI Interventions
                </p>
            </div>
        </div>
    );
}
