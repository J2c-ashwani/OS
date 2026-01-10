"use client";

import React from 'react';

export default function FunnelComparison() {
    return (
        <div className="mx-4 p-8 rounded-xl bg-white dark:bg-[#151b28] border border-slate-200 dark:border-slate-800 flex flex-col gap-8 min-h-[500px] shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Optimization Flow: Baseline vs. Current</h3>
                <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded bg-slate-400/20 border border-slate-400/30"></span>
                        <span className="text-slate-500 dark:text-[#92a4c9]">Baseline (Initial AI State)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded bg-primary/40 border border-primary/60"></span>
                        <span className="text-slate-900 dark:text-white font-medium">Current (Post AI Optimization)</span>
                    </div>
                </div>
            </div>

            {/* Simulated Sankey Visualization */}
            <div className="relative w-full h-80 flex items-center">

                {/* Stage 1: Lead Gen */}
                <div className="flex flex-col items-center gap-4 z-10 w-1/5">
                    <div className="w-32 h-20 rounded-lg bg-white dark:bg-[#1a202c] border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center p-2 group hover:border-primary transition-all cursor-pointer shadow-sm">
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Inbound</p>
                        <p className="text-xl font-black text-slate-900 dark:text-white">10,240</p>
                        <span className="text-[10px] text-emerald-500">+12% vs Baseline</span>
                    </div>
                    <p className="text-xs font-bold text-slate-400">LEAD CAPTURE</p>
                </div>

                {/* Stage 2: Qualification */}
                <div className="flex flex-col items-center gap-4 z-10 w-1/5 ml-auto">
                    <div className="w-32 h-20 rounded-lg bg-white dark:bg-[#1a202c] border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center p-2 relative group hover:border-primary transition-all cursor-pointer shadow-sm">
                        <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                            FIXED
                        </div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Qualified</p>
                        <p className="text-xl font-black text-slate-900 dark:text-white">7,450</p>
                        <span className="text-[10px] text-emerald-500">+34% Growth</span>
                    </div>
                    <p className="text-xs font-bold text-slate-400">AI SCREENING</p>
                </div>

                {/* Stage 3: Agent Action */}
                <div className="flex flex-col items-center gap-4 z-10 w-1/5 ml-auto">
                    <div className="w-32 h-20 rounded-lg bg-white dark:bg-[#1a202c] border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center p-2 group hover:border-primary transition-all cursor-pointer shadow-sm">
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Meeting Set</p>
                        <p className="text-xl font-black text-slate-900 dark:text-white">2,120</p>
                        <span className="text-[10px] text-emerald-500">+18% vs Baseline</span>
                    </div>
                    <p className="text-xs font-bold text-slate-400">AGENT BOOKING</p>
                </div>

                {/* Stage 4: Conversion */}
                <div className="flex flex-col items-center gap-4 z-10 w-1/5 ml-auto">
                    <div className="w-32 h-24 rounded-lg bg-primary/10 border-2 border-primary flex flex-col items-center justify-center p-2 shadow-[0_0_20px_rgba(19,91,236,0.15)] group hover:scale-105 transition-all cursor-pointer">
                        <p className="text-[10px] text-primary uppercase font-bold tracking-widest">Closed Won</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white">842</p>
                        <span className="text-[10px] text-emerald-500 font-black">+$1.2M LTV</span>
                    </div>
                    <p className="text-xs font-bold text-slate-400">CONVERSION</p>
                </div>

                {/* SVG Overlays for paths */}
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                    <defs>
                        <linearGradient id="baselineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(148, 163, 184, 0.1)" />
                            <stop offset="100%" stopColor="rgba(148, 163, 184, 0.05)" />
                        </linearGradient>
                        <linearGradient id="currentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(19, 91, 236, 0.4)" />
                            <stop offset="100%" stopColor="rgba(19, 91, 236, 0.1)" />
                        </linearGradient>
                    </defs>

                    {/* Baseline Faded Paths */}
                    <path d="M120,160 C200,160 250,180 340,180" fill="none" stroke="url(#baselineGradient)" strokeWidth="40" strokeLinecap="round"></path>
                    <path d="M430,180 C500,180 550,170 650,170" fill="none" stroke="url(#baselineGradient)" strokeWidth="25" strokeLinecap="round"></path>
                    <path d="M740,170 C800,170 850,160 920,160" fill="none" stroke="url(#baselineGradient)" strokeWidth="15" strokeLinecap="round"></path>

                    {/* Current Vibrant Paths with Pulse Animation Effect */}
                    <path d="M120,160 C200,160 250,160 340,160" fill="none" stroke="rgba(19, 91, 236, 0.3)" strokeWidth="50" strokeLinecap="round" className="animate-pulse"></path>
                    <path d="M430,160 C500,160 550,160 650,160" fill="none" stroke="rgba(19, 91, 236, 0.3)" strokeWidth="40" strokeLinecap="round" className="animate-pulse"></path>
                    <path d="M740,160 C800,160 850,160 920,160" fill="none" stroke="rgba(19, 91, 236, 0.3)" strokeWidth="30" strokeLinecap="round" className="animate-pulse"></path>
                </svg>
            </div>
        </div>
    );
}
