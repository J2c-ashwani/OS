import React from 'react';

interface RevenueStatsProps {
    detectedLeaks: number;
    atRiskRevenue: number;
    efficiencyScore: number;
}

export default function RevenueStats({ detectedLeaks, atRiskRevenue, efficiencyScore }: RevenueStatsProps) {
    // Format currency helper
    const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

    // Calculate dynamic percentages/widths based on inputs or hardcoded baselines for visualization
    // In a real app, these would be relative to total revenue or benchmarks.
    const leakWidth = Math.min(100, (detectedLeaks / 20000) * 100);
    const riskWidth = Math.min(100, (atRiskRevenue / 100000) * 100);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[#1a212f] p-6 rounded-xl border border-slate-200 dark:border-[#2d3648] shadow-sm">
                <div className="flex justify-between items-start mb-4">
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Detected Leaks</p>
                    <span className="flex items-center text-xs font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded-full">+12.4%</span>
                </div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{fmt(detectedLeaks)}</p>
                <div className="mt-4 h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500" style={{ width: `${Math.max(10, leakWidth)}%` }}></div>
                </div>
                <p className="mt-2 text-xs text-slate-400 italic">Chiefly from unqualified lead routing</p>
            </div>

            <div className="bg-white dark:bg-[#1a212f] p-6 rounded-xl border border-slate-200 dark:border-[#2d3648] shadow-sm">
                <div className="flex justify-between items-start mb-4">
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">At-Risk Revenue</p>
                    <span className="flex items-center text-xs font-bold text-orange-500 bg-orange-500/10 px-2 py-1 rounded-full">-5.2%</span>
                </div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{fmt(atRiskRevenue)}</p>
                <div className="mt-4 h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500" style={{ width: `${Math.max(10, riskWidth)}%` }}></div>
                </div>
                <p className="mt-2 text-xs text-slate-400 italic">Delayed responses {'>'} 4 hours</p>
            </div>

            <div className="bg-white dark:bg-[#1a212f] p-6 rounded-xl border border-slate-200 dark:border-[#2d3648] shadow-sm">
                <div className="flex justify-between items-start mb-4">
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Efficiency Score</p>
                    <span className="flex items-center text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">+2.1%</span>
                </div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{efficiencyScore}%</p>
                <div className="mt-4 h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: `${efficiencyScore}%` }}></div>
                </div>
                <p className="mt-2 text-xs text-slate-400 italic">System-wide AI adherence</p>
            </div>
        </div>
    );
}
