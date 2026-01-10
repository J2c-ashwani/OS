"use client";

import React from 'react';
import { Bot, LineChart, TrendingUp, Copy } from 'lucide-react';

export default function DiagnosticAuditPanel() {
    return (
        <aside className="w-80 lg:w-96 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col overflow-y-auto h-full">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-lg mb-1 flex items-center gap-2 text-slate-900 dark:text-white">
                    <LineChart size={20} className="text-primary" />
                    Diagnostic Audit
                </h3>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Analysis by Conversation Intelligence</p>
            </div>

            <div className="p-6 space-y-8 flex-1">
                {/* 1. What is happening */}
                <section>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-primary px-1.5 py-0.5 rounded bg-primary/10">01</span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">What is happening</h4>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        The AI Agent ignored a multi-part question, focusing only on pricing and failing to address the <span className="text-primary font-medium">LLM fine-tuning</span> technical requirement.
                    </p>
                </section>

                {/* 2. Why it matters */}
                <section>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-primary px-1.5 py-0.5 rounded bg-primary/10">02</span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Why it matters</h4>
                    </div>
                    <div className="bg-orange-500/10 border-l-2 border-orange-500 p-3 rounded-r-lg">
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            Marcus is a high-intent technical lead. A generic answer at this stage signals a "salesy" bot and reduces trust by <span className="font-bold text-slate-900 dark:text-white">40%</span>.
                        </p>
                    </div>
                </section>

                {/* 3. Where it breaks */}
                <section>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-primary px-1.5 py-0.5 rounded bg-primary/10">03</span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Where it breaks</h4>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        Turn #4. The agent's knowledge base retrieval for "custom niche training" returned a null value, defaulting to a generic "Scale Plan" summary.
                    </p>
                </section>

                {/* 4. What to fix first (Optimized Reply) */}
                <section>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-primary px-1.5 py-0.5 rounded bg-primary/10">04</span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">What to fix first</h4>
                    </div>
                    <div className="bg-slate-50 dark:bg-black border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3 shadow-inner">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold uppercase text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">Optimized Reply</span>
                            <span className="text-[10px] text-emerald-500 font-bold uppercase flex items-center gap-1">
                                <Bot size={12} /> Non-Salesy
                            </span>
                        </div>
                        <p className="text-sm font-medium leading-relaxed italic text-slate-800 dark:text-slate-200">
                            "Sorry for the oversight, Marcus. Yes, the Scale plan includes dedicated LLM fine-tuning on your own dataset. We usually handle that via a secure AWS instance. Would you like a technical overview of that process?"
                        </p>
                        <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary hover:bg-primary/90 text-white text-xs font-bold rounded-lg transition-all shadow-sm hover:shadow">
                            <Copy size={14} />
                            Copy to Clipboard
                        </button>
                    </div>
                </section>

                {/* 5. What will improve */}
                <section>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-primary px-1.5 py-0.5 rounded bg-primary/10">05</span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">What will improve</h4>
                    </div>
                    <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <TrendingUp size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                            <span>Immediate trust restoration with technical lead.</span>
                        </li>
                        <li className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <TrendingUp size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                            <span>High probability (82%) of booking a demo call.</span>
                        </li>
                    </ul>
                </section>
            </div>

            <div className="mt-auto p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
                <button className="w-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 py-2.5 rounded-lg text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    Archive Conversation
                </button>
            </div>
        </aside>
    );
}
