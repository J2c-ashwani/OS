"use client";

import React from 'react';
import { Send, PlusCircle, User, Bot, AlertTriangle, Play, HelpCircle, Clock } from 'lucide-react';

export default function TranscriptViewer() {
    return (
        <section className="flex-1 flex flex-col bg-slate-50 dark:bg-[#0d121c]">
            {/* Transcript Header */}
            <div className="p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-primary">MC</div>
                    <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">Marcus Chen</h4>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                            <span className="size-2 rounded-full bg-green-500"></span> WhatsApp Business · Active Sales Lead
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300">View Profile</button>
                    <button className="px-3 py-1.5 text-xs font-bold rounded-lg bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors">Take Over Chat</button>
                </div>
            </div>

            {/* Transcript Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Customer Message */}
                <div className="flex flex-col items-start max-w-[80%]">
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl rounded-tl-none shadow-sm text-sm leading-relaxed text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700">
                        Hi, I was looking at your Agentic OS for my agency. Does the "Scale" plan include the custom LLM fine-tuning for our specific niche?
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 ml-1">11:02 AM</span>
                </div>

                {/* AI Agent Message */}
                <div className="flex flex-col items-end max-w-[80%] ml-auto">
                    <div className="bg-primary text-white p-4 rounded-xl rounded-tr-none shadow-sm text-sm leading-relaxed">
                        Hello Marcus! Yes, the Scale plan includes our core AI features. It's designed for teams looking to grow their efficiency with automated workflows.
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 mr-1">11:02 AM · Agentic AI</span>
                </div>

                {/* Customer Message (The Mismatch) */}
                <div className="flex flex-col items-start max-w-[80%] relative group">
                    {/* AI Annotation Overlay - Positioned absolutely relative to message */}
                    <div className="absolute -right-[270px] top-0 w-64 p-3 bg-red-500/10 border border-red-500/20 rounded-lg backdrop-blur-sm z-10">
                        <div className="flex items-center gap-2 text-red-500 mb-1">
                            <AlertTriangle size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-tight">AI Friction Point</span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight italic">
                            Agent provided a generic response and missed the specific technical query about LLM fine-tuning.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl rounded-tl-none shadow-sm text-sm border-2 border-transparent group-hover:border-red-500/30 transition-all text-slate-700 dark:text-slate-200 ring-2 ring-red-500/20">
                        Wait, so does the base plan include the automated billing module or the LLM fine-tuning? You didn't really answer the second part.
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 ml-1">11:05 AM</span>
                </div>

                {/* Visual Gap / Stalled State */}
                <div className="flex justify-center py-4">
                    <div className="flex items-center gap-4 text-slate-500">
                        <div className="h-px w-24 bg-slate-200 dark:bg-slate-800"></div>
                        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                            <Clock size={12} />
                            14 Minutes Since Last Message
                        </div>
                        <div className="h-px w-24 bg-slate-200 dark:bg-slate-800"></div>
                    </div>
                </div>
            </div>

            {/* Chat Input Area (Read Only) */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3 bg-slate-50 dark:bg-black rounded-xl p-2 border border-slate-200 dark:border-slate-800 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                    <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                        <PlusCircle size={20} />
                    </button>
                    <input
                        className="flex-1 bg-transparent border-none text-sm text-slate-600 dark:text-slate-300 italic focus:ring-0 placeholder:text-slate-400"
                        disabled
                        placeholder="AI is currently paused. Use sidebar to intervene..."
                    />
                    <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                        Send <Send size={14} />
                    </button>
                </div>
            </div>
        </section>
    );
}
