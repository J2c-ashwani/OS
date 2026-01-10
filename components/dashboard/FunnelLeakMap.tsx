import React from 'react';

export default function FunnelLeakMap() {
    return (
        <div className="bg-white dark:bg-[#1a212f] rounded-xl border border-slate-200 dark:border-[#2d3648] shadow-sm flex flex-col overflow-hidden">
            <div className="p-5 border-b border-slate-200 dark:border-[#2d3648] flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Funnel Leak Map</h3>
                <span className="px-2 py-1 rounded bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-widest">3 Alerts</span>
            </div>
            <div className="p-6 relative flex items-center justify-between gap-2 overflow-hidden h-full min-h-[250px]">
                {/* LEAD Node */}
                <div className="z-10 flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-2 border-primary group-hover:scale-110 transition-transform">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">LEAD</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-600 dark:text-slate-400">1,200</p>
                </div>

                {/* Connector 1 (Lead -> Qual) with Leak */}
                <div className="flex-1 h-1 bg-slate-200 dark:bg-[#2d3648] relative">
                    <div className="absolute inset-0 bg-primary" style={{ width: '60%' }}></div>
                    <div className="absolute -top-1 right-1/4 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                </div>

                {/* QUAL Node */}
                <div className="z-10 flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-2 border-primary group-hover:scale-110 transition-transform">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">QUAL</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-600 dark:text-slate-400">720</p>
                </div>

                {/* Connector 2 (Qual -> Deal) */}
                <div className="flex-1 h-1 bg-slate-200 dark:bg-[#2d3648] relative">
                    <div className="absolute inset-0 bg-primary" style={{ width: '40%' }}></div>
                </div>

                {/* DEAL Node */}
                <div className="z-10 flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-2 border-slate-400 group-hover:scale-110 transition-transform">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">DEAL</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-600 dark:text-slate-400">144</p>
                </div>

                {/* Diagnostic Label */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-red-500 text-white px-3 py-1 rounded text-[10px] font-bold shadow-lg whitespace-nowrap">
                    LEAK DETECTED: BOT DISCONNECT (22%)
                </div>
            </div>
        </div>
    );
}
