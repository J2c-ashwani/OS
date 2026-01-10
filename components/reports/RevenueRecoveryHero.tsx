"use client";

import React from 'react';
import { TrendingUp, Shield } from 'lucide-react';

export default function RevenueRecoveryHero() {
    return (
        <div className="mb-12">
            <div className="bg-primary rounded-xl p-8 lg:p-12 text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
                {/* Abstract background pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <path d="M0 100 C 20 0 50 0 100 100" fill="none" stroke="white" strokeWidth="0.5"></path>
                        <path d="M0 80 C 30 20 60 20 100 80" fill="none" stroke="white" strokeWidth="0.5"></path>
                    </svg>
                </div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest">Core Value Metric</span>
                        </div>
                        <h2 className="text-white/80 text-xl font-medium mb-1">Total Revenue Recovery</h2>
                        <div className="flex items-baseline gap-4">
                            <span className="text-6xl font-black tracking-tighter">$12,450.00</span>
                            <span className="flex items-center text-green-300 font-bold bg-green-500/20 px-2 py-0.5 rounded text-sm gap-1">
                                <TrendingUp size={18} /> 12.4%
                            </span>
                        </div>
                        <p className="mt-4 text-white/70 max-w-md leading-relaxed">
                            The Agentic AI OS successfully identified and neutralized payment failures and abandoned checkout leaks this month.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/10 min-w-[240px]">
                            <p className="text-white/60 text-sm font-semibold uppercase tracking-wider mb-2">Leaks Patched</p>
                            <div className="flex items-center justify-between">
                                <span className="text-4xl font-black">42</span>
                                <Shield size={36} className="text-white/30" />
                            </div>
                            <div className="mt-3 w-full bg-white/10 rounded-full h-1.5">
                                <div className="bg-white h-1.5 rounded-full" style={{ width: '84%' }}></div>
                            </div>
                            <p className="mt-2 text-xs text-white/50">84% of identified leaks resolved autonomously</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
