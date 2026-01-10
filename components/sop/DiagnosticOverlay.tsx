"use client";

import React from 'react';
import { BarChart3, X, Check } from 'lucide-react';

interface DiagnosticOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function DiagnosticOverlay({ isOpen, onClose }: DiagnosticOverlayProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
                {/* Modal Header */}
                <div className="px-6 py-5 border-b border-slate-800 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/20 p-2 rounded-lg">
                            <BarChart3 className="text-primary" size={20} />
                        </div>
                        <h4 className="text-white text-xl font-bold">5-Step Violation Diagnostic</h4>
                    </div>
                    <button
                        className="text-slate-500 hover:text-white transition-colors"
                        onClick={onClose}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-8">
                    <div className="relative flex flex-col gap-10">
                        {/* Vertical Line */}
                        <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-slate-800"></div>

                        {/* Step 1 */}
                        <div className="relative flex gap-6">
                            <div className="z-10 bg-primary size-10 rounded-full flex items-center justify-center border-4 border-slate-900 shadow-[0_0_15px_rgba(19,91,236,0.3)] shrink-0">
                                <span className="text-white text-sm font-bold">1</span>
                            </div>
                            <div>
                                <h5 className="text-slate-300 text-xs font-bold uppercase tracking-widest mb-1">What is happening</h5>
                                <p className="text-white text-base leading-relaxed">Agent 'Alpha-9' failed to respond to 'High Priority' customer ticket within the 4h window. Real-time delay measured at 9 hours and 12 minutes.</p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative flex gap-6">
                            <div className="z-10 bg-primary size-10 rounded-full flex items-center justify-center border-4 border-slate-900 shadow-[0_0_15px_rgba(19,91,236,0.3)] shrink-0">
                                <span className="text-white text-sm font-bold">2</span>
                            </div>
                            <div>
                                <h5 className="text-slate-300 text-xs font-bold uppercase tracking-widest mb-1">Why it matters</h5>
                                <p className="text-white text-base leading-relaxed">Violates SLA Tier 1. Prolonged response times in this category historically lead to a 15% drop in CSAT and potential churn for enterprise accounts.</p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative flex gap-6">
                            <div className="z-10 bg-primary size-10 rounded-full flex items-center justify-center border-4 border-slate-900 shadow-[0_0_15px_rgba(19,91,236,0.3)] shrink-0">
                                <span className="text-white text-sm font-bold">3</span>
                            </div>
                            <div>
                                <h5 className="text-slate-300 text-xs font-bold uppercase tracking-widest mb-1">Where it breaks</h5>
                                <p className="text-white text-base leading-relaxed">The <code className="bg-slate-800 px-1.5 rounded text-sm text-primary">Task-Orchestrator</code> queue became saturated with low-priority background jobs, starving the High-Priority thread of execution cycles.</p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="relative flex gap-6">
                            <div className="z-10 bg-primary size-10 rounded-full flex items-center justify-center border-4 border-slate-900 shadow-[0_0_15px_rgba(19,91,236,0.3)] shrink-0">
                                <span className="text-white text-sm font-bold">4</span>
                            </div>
                            <div>
                                <h5 className="text-slate-300 text-xs font-bold uppercase tracking-widest mb-1">What to fix first</h5>
                                <p className="text-white text-base leading-relaxed">Enable strict priority-preemption in the agent configuration. Re-route background indexing tasks to off-peak shards.</p>
                            </div>
                        </div>

                        {/* Step 5 */}
                        <div className="relative flex gap-6">
                            <div className="z-10 bg-emerald-500 size-10 rounded-full flex items-center justify-center border-4 border-slate-900 shadow-[0_0_15px_rgba(16,185,129,0.3)] shrink-0">
                                <Check size={20} className="text-white" />
                            </div>
                            <div>
                                <h5 className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">What will improve</h5>
                                <p className="text-white text-base leading-relaxed">Ensures 100% compliance for Tier 1 tasks regardless of volume. Compliance score is projected to return to &gt;95% within 2 hours of deployment.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-5 bg-slate-800/50 flex justify-end gap-3 border-t border-slate-800">
                    <button
                        className="px-6 py-2 text-slate-400 hover:text-white font-bold text-sm transition-colors"
                        onClick={onClose}
                    >
                        Dismiss
                    </button>
                    <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-blue-600 transition-all shadow-lg shadow-blue-900/20">
                        Apply Fix Now
                    </button>
                </div>
            </div>
        </div>
    );
}
