"use client";

import React from 'react';
import VisualFunnel from '@/components/funnel/VisualFunnel';
import SOPComplianceTracker from '@/components/funnel/SOPComplianceTracker';
import FixRecommendation from '@/components/funnel/FixRecommendation';
import AnalyticsFootnote from '@/components/funnel/AnalyticsFootnote';
import { Search, Download, Calendar } from 'lucide-react';

export default function FunnelTrackerClient() {
    return (
        <div className="flex flex-col min-h-full bg-[#f6f6f8] dark:bg-[#0b0d11] text-slate-900 dark:text-white font-sans">
            {/* Top Navbar */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-[#1e293b] bg-white dark:bg-[#0b0d11] px-10 py-3 sticky top-0 z-50">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-4 text-primary">
                        <div className="size-6">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
                            </svg>
                        </div>
                        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Response Audit</h2>
                    </div>
                    <label className="flex flex-col min-w-40 !h-10 max-w-64">
                        <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                            <div className="text-slate-400 dark:text-[#9da6b9] flex border-none bg-slate-100 dark:bg-[#1c1f27] items-center justify-center pl-4 rounded-l-lg">
                                <Search size={20} />
                            </div>
                            <input
                                className="form-input flex w-full min-w-0 flex-1 border-none bg-slate-100 dark:bg-[#1c1f27] text-slate-900 dark:text-white focus:ring-0 h-full placeholder:text-slate-400 dark:placeholder:text-[#9da6b9] px-4 rounded-r-lg text-sm font-normal outline-none"
                                placeholder="Search funnels or agents..."
                                type="text"
                            />
                        </div>
                    </label>
                </div>
            </header>

            <main className="max-w-[1280px] mx-auto px-6 py-8 w-full">
                {/* Page Heading */}
                <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Funnel Leaks & SOP Compliance</h1>
                        <p className="text-slate-500 dark:text-[#9da6b9] text-base font-normal">Real-time identification of revenue loss and operational bottlenecks.</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-[#1c1f27] rounded-lg border border-slate-200 dark:border-[#3b4354]">
                            <Calendar className="text-slate-500 dark:text-slate-400" size={14} />
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Last 30 Days</span>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded-lg text-sm font-bold hover:bg-primary/10 transition-colors">
                            <Download size={14} />
                            Export Report
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-slate-200 dark:border-[#3b4354] mb-8">
                    <div className="flex gap-8">
                        <button className="border-b-[3px] border-primary text-primary pb-3 font-bold text-sm tracking-wide">Visual Funnel</button>
                        <button className="border-b-[3px] border-transparent text-slate-500 dark:text-[#9da6b9] pb-3 font-bold text-sm tracking-wide hover:text-slate-200">SOP Gap Analysis</button>
                        <button className="border-b-[3px] border-transparent text-slate-500 dark:text-[#9da6b9] pb-3 font-bold text-sm tracking-wide hover:text-slate-200">High-Priority Leaks</button>
                        <button className="border-b-[3px] border-transparent text-slate-500 dark:text-[#9da6b9] pb-3 font-bold text-sm tracking-wide hover:text-slate-200">Agent Leaderboard</button>
                    </div>
                </div>

                {/* Section 1: Visual Funnel Map */}
                <VisualFunnel />

                {/* Fix Recommendation Box */}
                <FixRecommendation />

                {/* Section 2: SOP Rules vs. Performance */}
                <div className="mt-12">
                    <SOPComplianceTracker />
                </div>

                {/* Analytics Footnote */}
                <AnalyticsFootnote />
            </main>

            {/* Global Footer */}
            <footer className="mt-20 border-t border-slate-200 dark:border-[#1e293b] py-8 text-center bg-white dark:bg-[#0b0d11]">
                <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Response Audit • Enterprise v2.4.0 • Built for SMB Scalability</p>
            </footer>
        </div>
    );
}
