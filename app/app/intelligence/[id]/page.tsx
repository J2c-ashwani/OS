"use client";

import React from 'react';
import TranscriptViewer from '@/components/intelligence/deep-dive/TranscriptViewer';
import DiagnosticAuditPanel from '@/components/intelligence/deep-dive/DiagnosticAuditPanel';
import PaywallGuard from '@/components/subscription/PaywallGuard';
import { Search, Bell } from 'lucide-react';

export default function DeepDivePage({ params }: { params: { id: string } }) {

    // Mock Sidebar Data
    const riskLeads = [
        { id: '1', name: 'Marcus Chen', time: '14m ago', snippet: '"Wait, so does the base plan include the automated billing module or..."', tags: ['Intent Mismatch', 'High Value'] },
        { id: '2', name: 'Sarah Jenkins', time: '2h ago', snippet: '"I\'m looking for a demo for my team of 15 people next Tuesday."', tags: ['Delayed Reply'] },
        { id: '3', name: 'TechFlow Solutions', time: '4h ago', snippet: '"Can you send over the security documentation for the API?"', tags: ['Unanswered'] },
        { id: '4', name: 'Elena Rodriguez', time: 'Yesterday', snippet: '"The integration is throwing a 403 error on my local env."', tags: ['Stalled'] },
    ];

    const currentId = params.id || '1'; // Default or from params

    return (
        <div className="flex h-screen bg-background-light dark:bg-background-dark overflow-hidden">

            {/* Left Sidebar: Failed/At-Risk Conversations */}
            <aside className="w-80 lg:w-96 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-white dark:bg-[#0b0d11]">
                {/* Header Mock */}
                <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-4 py-3 bg-white dark:bg-[#0b0d11] shrink-0 h-[65px]">
                    <div className="flex items-center gap-3">
                        <div className="size-8 bg-primary rounded flex items-center justify-center font-bold text-white shrink-0">
                            AI
                        </div>
                        <h2 className="text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-white truncate">Deep Dive</h2>
                    </div>
                </header>

                <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Critical Focus</h3>
                        <span className="bg-red-500/10 text-red-500 text-xs font-bold px-2 py-1 rounded">12 At-Risk</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold">
                            All Risks
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                            Delayed
                        </button>
                        <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                            Mismatch
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {riskLeads.map((lead) => (
                        <div
                            key={lead.id}
                            className={`p-4 border-b border-slate-200 dark:border-slate-800 cursor-pointer transition-colors
                                ${lead.id === currentId
                                    ? 'bg-primary/5 dark:bg-primary/10 border-l-4 border-l-primary'
                                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 border-l-4 border-l-transparent'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className={`font-semibold text-sm ${lead.id === currentId ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                                    {lead.name}
                                </span>
                                <span className="text-[10px] text-slate-500 font-medium">{lead.time}</span>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1 mb-2 font-medium">{lead.snippet}</p>
                            <div className="flex gap-2 flex-wrap">
                                {lead.tags.map(tag => {
                                    let color = "bg-slate-100 text-slate-500";
                                    if (tag.includes("Mismatch") || tag.includes("Stalled")) color = "bg-red-500/10 text-red-500";
                                    if (tag.includes("High Value")) color = "bg-orange-500/10 text-orange-500";
                                    if (tag.includes("Delayed")) color = "bg-orange-500/10 text-orange-500";

                                    return (
                                        <span key={tag} className={`px-2 py-0.5 rounded ${color} text-[10px] font-bold uppercase tracking-wider`}>
                                            {tag}
                                        </span>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Main Content Area: Transcript + Diagnostic */}
            <PaywallGuard feature="intelligence">
                <main className="flex-1 flex overflow-hidden">
                    <TranscriptViewer />
                    <DiagnosticAuditPanel />
                </main>
            </PaywallGuard>
        </div>
    );
}
