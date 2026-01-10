"use client";

import React from 'react';
import ConfidenceTable from '@/components/onboarding/ConfidenceTable';
import { RefreshCw, BrainCircuit, Check, PlusCircle, Database, Mail, MessageCircle, GripVertical, Info, Shield } from 'lucide-react';

export default function MappingPage() {
    return (
        <div className="flex flex-col h-full">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex flex-col gap-3">
                    <div className="flex gap-6 justify-between items-end">
                        <div>
                            <span className="text-primary text-xs font-bold uppercase tracking-wider">Setup Phase</span>
                            <p className="text-slate-900 dark:text-white text-xl font-bold leading-normal">Data Discovery & Channel Mapping</p>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">Step 2 of 3</p>
                    </div>
                    <div className="rounded-full bg-slate-200 dark:bg-slate-800 h-2.5 w-full overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: '66%' }}></div>
                    </div>
                    <div className="flex items-center gap-2 text-primary">
                        <BrainCircuit size={14} className="animate-pulse" />
                        <p className="text-sm font-medium leading-normal">AI is learning your business structure from 12 active streams...</p>
                    </div>
                </div>
            </div>

            {/* Page Heading */}
            <div className="mb-10">
                <div className="flex flex-wrap justify-between gap-6">
                    <div className="flex min-w-72 flex-col gap-2 max-w-2xl">
                        <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight">Define Your Funnel</h1>
                        <p className="text-slate-600 dark:text-slate-400 text-lg font-normal leading-relaxed">
                            We've detected active channels across your connected apps. Map these data streams to your business stages to train the <strong>Agentic AI Diagnostic Framework</strong>.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2 hover:bg-slate-50 transition-colors">
                            <RefreshCw size={18} /> Scan Again
                        </button>
                        <button className="bg-primary text-white px-6 py-2 rounded-lg font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                            Confirm Mapping
                        </button>
                    </div>
                </div>
            </div>

            {/* Interactive Canvas Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Sources Column */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-widest px-2">Detected Streams</h3>
                    <div className="flex flex-col gap-3">
                        {/* Source Card 1 */}
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between group hover:border-primary transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                                    <MessageCircle size={20} />
                                </div>
                                <div>
                                    <p className="text-slate-900 dark:text-white font-bold text-sm">#sales-leads</p>
                                    <p className="text-slate-500 text-xs">Slack Channel</p>
                                </div>
                            </div>
                            <GripVertical size={18} className="text-primary opacity-0 group-hover:opacity-100" />
                        </div>
                        {/* Source Card 2 */}
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between group hover:border-primary transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-slate-900 dark:text-white font-bold text-sm">support@company.com</p>
                                    <p className="text-slate-500 text-xs">GSuite Inbox</p>
                                </div>
                            </div>
                            <GripVertical size={18} className="text-primary opacity-0 group-hover:opacity-100" />
                        </div>
                        {/* Source Card 3 */}
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between group hover:border-primary transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                                    <Database size={20} />
                                </div>
                                <div>
                                    <p className="text-slate-900 dark:text-white font-bold text-sm">Direct Deals</p>
                                    <p className="text-slate-500 text-xs">HubSpot CRM</p>
                                </div>
                            </div>
                            <GripVertical size={18} className="text-primary opacity-0 group-hover:opacity-100" />
                        </div>
                        {/* Source Card 4 */}
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between group hover:border-primary transition-colors cursor-pointer border-dashed">
                            <div className="flex items-center gap-3 text-slate-400">
                                <div className="size-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                                    <PlusCircle size={20} />
                                </div>
                                <p className="font-medium text-sm">Add manual source...</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visualization / Connections */}
                <div className="hidden lg:flex flex-col justify-center items-center relative py-12">
                    <div className="absolute inset-0 flex flex-col justify-around py-16 pointer-events-none">
                        {/* Connection Lines simulation */}
                        <div className="h-px w-full bg-slate-200 dark:bg-slate-800 relative">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(19,91,236,0.6)]"></div>
                        </div>
                        <div className="h-px w-full bg-slate-200 dark:bg-slate-800 relative opacity-40">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-300"></div>
                        </div>
                        <div className="h-px w-full bg-slate-200 dark:bg-slate-800 relative">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(19,91,236,0.6)]"></div>
                        </div>
                    </div>
                    <div className="z-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-4 rounded-full shadow-xl">
                        <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
                            <BrainCircuit size={32} className="text-primary" />
                        </div>
                    </div>
                    <p className="mt-4 text-xs font-bold text-primary uppercase tracking-tighter">AI Processing Layer</p>
                </div>

                {/* Funnel Stages Column */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-slate-900 dark:text-white text-sm font-bold uppercase tracking-widest px-2 text-right">Target Stages</h3>
                    <div className="flex flex-col gap-6">
                        {/* Stage 1 */}
                        <div className="bg-primary/5 dark:bg-primary/10 border-2 border-primary p-5 rounded-2xl relative">
                            <div className="absolute -left-3 top-1/2 -translate-y-1/2 size-6 rounded-full bg-primary text-white flex items-center justify-center">
                                <Check size={12} />
                            </div>
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-slate-900 dark:text-white font-black text-lg">Inquiry</h4>
                                <span className="text-primary text-[10px] font-bold bg-white dark:bg-slate-800 px-2 py-0.5 rounded-full border border-primary/30 uppercase">Mapped</span>
                            </div>
                            <p className="text-slate-500 text-xs mb-3 italic">"Where do new leads first appear?"</p>
                            <div className="bg-white dark:bg-slate-800 px-3 py-2 rounded-lg border border-primary/20 flex items-center gap-2">
                                <MessageCircle size={14} className="text-orange-600" />
                                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">#sales-leads</span>
                            </div>
                        </div>
                        {/* Stage 2 */}
                        <div className="bg-white dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 p-5 rounded-2xl hover:border-primary transition-colors group">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-slate-900 dark:text-white font-black text-lg">Follow-up</h4>
                                <span className="text-slate-400 text-[10px] font-bold uppercase">Pending</span>
                            </div>
                            <p className="text-slate-500 text-xs mb-4">"Where does nurturing happen?"</p>
                            <button className="w-full py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold flex items-center justify-center gap-1 group-hover:bg-primary group-hover:text-white transition-all">
                                <PlusCircle size={14} /> Assign Stream
                            </button>
                        </div>
                        {/* Stage 3 */}
                        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-2xl">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-slate-900 dark:text-white font-black text-lg">Sales</h4>
                                <span className="text-slate-400 text-[10px] font-bold uppercase">Auto-Suggested</span>
                            </div>
                            <p className="text-slate-500 text-xs mb-3">"Where are the conversions?"</p>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="bg-slate-100 dark:bg-slate-700 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600 flex items-center gap-2 opacity-60">
                                    <Database size={14} className="text-green-600" />
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Direct Deals</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="flex-1 py-1.5 rounded-md bg-primary text-white text-[10px] font-bold uppercase">Confirm</button>
                                <button className="flex-1 py-1.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold uppercase">Reject</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* HeadlineText and Table */}
            <ConfidenceTable />

            {/* Diagnostic Framework Tooltip Section */}
            <div className="mt-8 bg-primary/10 border border-primary/20 p-6 rounded-2xl flex items-start gap-4">
                <div className="bg-primary text-white p-2 rounded-lg">
                    <Info size={24} />
                </div>
                <div>
                    <h4 className="text-primary font-bold text-lg">Why does mapping matter?</h4>
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed max-w-3xl">
                        Mapping a channel like Slack to "Inquiry" allows the Agentic AI to prioritize real-time analysis on new inbound traffic.
                        It trains the <strong>"What is happening"</strong> diagnostic engine to identify lead quality signals before they even reach your CRM.
                    </p>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-auto bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 p-6 -mx-6 mb-[-32px] pt-4"> {/* Adjust margin to align with container padding */}
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <Shield size={16} />
                        Data mapping is processed locally via secure agent protocols
                    </div>
                    <div className="flex gap-4">
                        <button className="px-6 py-2 rounded-lg text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Skip for now</button>
                        <button className="px-8 py-2 rounded-lg bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:scale-[1.02] transition-transform">Save & Continue</button>
                    </div>
                </div>
            </footer>
        </div>
    );
}
