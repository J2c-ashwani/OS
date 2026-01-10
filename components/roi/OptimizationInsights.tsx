"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Handshake, MessageSquare, TrendingUp, FlaskConical, BrainCircuit, ChevronRight } from 'lucide-react';

export default function OptimizationInsights() {
    return (
        <div className="px-4 pb-10 flex flex-col gap-6">

            {/* Bottom Insight Cards linked to Nodes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="bg-white dark:bg-[#1a202c]/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-emerald-500/10 rounded text-emerald-500">
                            <Handshake size={16} />
                        </div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">Qualification SOP v2.1</h4>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-[#92a4c9] leading-relaxed">AI updated the screening diagnostic to filter for intent-based keywords. Reduced lead waste by 14%.</p>
                    <Link href="/app/monitoring" className="mt-3 text-primary text-xs font-bold hover:underline flex items-center gap-1 transition-all">
                        View Diagnostic <ArrowRight size={14} />
                    </Link>
                </div>

                <div className="bg-white dark:bg-[#1a202c]/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded text-primary">
                            <MessageSquare size={16} />
                        </div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">Conversation Redesign</h4>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-[#92a4c9] leading-relaxed">Auto-agent empathy scoring was enabled. Meeting booking rate increased by 2.4% last week.</p>
                    <Link href="/app/intelligence" className="mt-3 text-primary text-xs font-bold hover:underline flex items-center gap-1 transition-all">
                        View Conversation <ArrowRight size={14} />
                    </Link>
                </div>

                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/20 rounded text-primary">
                            <TrendingUp size={16} />
                        </div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">ROI Spotlight</h4>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-[#92a4c9] leading-relaxed">Fixing the 'Qualification Leak' resulted in $42k reclaimed revenue in the last 30 days.</p>
                    <button className="mt-3 text-primary text-xs font-bold hover:underline flex items-center gap-1 transition-all">
                        Open ROI Deep-dive <ArrowRight size={14} />
                    </button>
                </div>
            </div>

            {/* Bottom Section: Suggestions & Logs */}
            <div className="flex flex-col gap-4">
                <h2 className="text-slate-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pt-5">Recommended Next Steps</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                        onClick={(e) => {
                            const target = e.currentTarget;
                            target.classList.add('opacity-50', 'pointer-events-none');
                            setTimeout(() => {
                                alert('A/B Test Initiated: "Agent Follow-up Cadence"');
                                target.classList.remove('opacity-50', 'pointer-events-none');
                            }, 500);
                        }}
                        className="flex items-center justify-between p-4 bg-white dark:bg-[#1a202c]/40 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-[#1a202c]/60 transition-all cursor-pointer shadow-sm group text-left"
                    >
                        <div className="flex items-center gap-4">
                            <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <FlaskConical size={24} />
                            </div>
                            <div>
                                <p className="text-slate-900 dark:text-white font-bold text-base">A/B Test: Agent Follow-up Cadence</p>
                                <p className="text-slate-500 dark:text-[#92a4c9] text-sm">AI predicts another 4% lift in meeting shows.</p>
                            </div>
                        </div>
                        <ChevronRight className="text-slate-400 group-hover:text-primary transition-colors" />
                    </button>

                    <button
                        onClick={(e) => {
                            const target = e.currentTarget;
                            target.classList.add('opacity-50', 'pointer-events-none');
                            setTimeout(() => {
                                alert('Retargeting Campaign Updated: "Closed Lost"');
                                target.classList.remove('opacity-50', 'pointer-events-none');
                            }, 500);
                        }}
                        className="flex items-center justify-between p-4 bg-white dark:bg-[#1a202c]/40 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-[#1a202c]/60 transition-all cursor-pointer shadow-sm group text-left"
                    >
                        <div className="flex items-center gap-4">
                            <div className="size-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                                <BrainCircuit size={24} />
                            </div>
                            <div>
                                <p className="text-slate-900 dark:text-white font-bold text-base">Update "Closed Lost" Retargeting</p>
                                <p className="text-slate-500 dark:text-[#92a4c9] text-sm">Diagnostic shows 12% of lost deals are recoverable.</p>
                            </div>
                        </div>
                        <ChevronRight className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
                    </button>
                </div>
            </div>
        </div>
    );
}
