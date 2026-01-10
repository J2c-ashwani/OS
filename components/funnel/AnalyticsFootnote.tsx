import React from 'react';

export default function AnalyticsFootnote() {
    return (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white dark:bg-[#1c1f27] border border-slate-200 dark:border-[#3b4354]">
                <h5 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Revenue Recovery Potential</h5>
                <div className="text-3xl font-black text-green-500">$142,400<span className="text-xs font-medium text-slate-400 ml-2">/ year</span></div>
                <p className="text-xs text-slate-400 mt-2 italic">Calculated based on current leak points and average contract value.</p>
            </div>
            <div className="p-6 rounded-xl bg-white dark:bg-[#1c1f27] border border-slate-200 dark:border-[#3b4354]">
                <h5 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Overall Compliance Score</h5>
                <div className="text-3xl font-black text-amber-500">72%<span className="text-xs font-medium text-slate-400 ml-2">Average</span></div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full mt-3">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                </div>
            </div>
            <div className="p-6 rounded-xl bg-white dark:bg-[#1c1f27] border border-slate-200 dark:border-[#3b4354]">
                <h5 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Top Bottleneck Agent</h5>
                <div className="flex items-center gap-3 mt-1">
                    <div className="size-8 rounded-full bg-slate-700 flex-shrink-0"></div>
                    <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">Sales Agent Sophia</div>
                        <div className="text-xs text-red-400">42% compliance rate</div>
                    </div>
                </div>
                <button className="w-full mt-3 py-1.5 border border-slate-700 rounded text-xs font-bold hover:bg-slate-700 hover:text-white transition-colors text-slate-500 dark:text-slate-400">View Intervention Plan</button>
            </div>
        </div>
    );
}
