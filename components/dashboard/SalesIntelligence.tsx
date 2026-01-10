import React from 'react';

export default function SalesIntelligence() {
    return (
        <div className="bg-white dark:bg-[#1a212f] rounded-xl border border-slate-200 dark:border-[#2d3648] shadow-sm flex flex-col overflow-hidden">
            <div className="p-5 border-b border-slate-200 dark:border-[#2d3648] flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Sales Intelligence</h3>
                <button className="text-primary text-sm font-medium hover:underline">View Analysis</button>
            </div>
            <div className="p-6 space-y-6">
                <div className="flex items-end gap-2 h-40">
                    {/* Mock Chart Bars */}
                    {[40, 60, 45, 80, 55, 30, 25].map((h, i) => (
                        <div
                            key={i}
                            className={`flex-1 transition-colors rounded-t-lg ${i === 3 ? 'bg-primary/40 hover:bg-primary' : 'bg-primary/20 hover:bg-primary'}`}
                            style={{ height: `${h}%` }}
                            title={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                        ></div>
                    ))}
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                        <p className="text-xs text-slate-500 uppercase font-bold">Avg. Response Time</p>
                        <p className="text-xl font-bold text-slate-900 dark:text-white">2.4m <span className="text-xs text-green-500 font-normal">(-85%)</span></p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                        <p className="text-xs text-slate-500 uppercase font-bold">Sentiment Score</p>
                        <p className="text-xl font-bold text-slate-900 dark:text-white">8.8 <span className="text-xs text-primary font-normal">Stable</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
