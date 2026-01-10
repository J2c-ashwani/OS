"use client";

import React, { useState } from 'react';
import { PlayCircle, Clock, Send, PlusCircle, ShieldAlert } from 'lucide-react';

interface RuleCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    condition: { label: string; operator: string; value: string };
    defaultEnabled: boolean;
    severityLevel: 'High' | 'Medium' | 'Low';
    isNew?: boolean;
}

export default function RuleCard({ title, description, icon, condition, defaultEnabled, severityLevel, isNew }: RuleCardProps) {
    const [enabled, setEnabled] = useState(defaultEnabled);
    const [severity, setSeverity] = useState(
        severityLevel === 'High' ? 3 : severityLevel === 'Medium' ? 2 : 1
    );

    if (isNew) {
        return (
            <div className="bg-white/50 dark:bg-slate-900/50 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center text-center gap-4 group cursor-pointer hover:border-primary/50 hover:bg-white dark:hover:bg-slate-900 transition-all min-h-[320px]">
                <div className="size-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                    {icon}
                </div>
                <div className="flex flex-col gap-1">
                    <h3 className="text-slate-900 dark:text-white font-bold text-base tracking-tight">{title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs px-4">{description}</p>
                </div>
                <button className="text-xs font-bold text-primary px-4 py-1.5 rounded-lg border border-primary/20 hover:bg-primary/5">Browse Template</button>
            </div>
        );
    }

    const severityColor = severity === 3 ? 'text-primary bg-primary/10' : severity === 2 ? 'text-yellow-600 bg-yellow-100 dark:text-yellow-500 dark:bg-yellow-900/30' : 'text-slate-500 bg-slate-100 dark:bg-slate-800';
    const severityLabel = severity === 3 ? 'High' : severity === 2 ? 'Medium' : 'Low';

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm flex flex-col gap-6 relative group min-h-[320px]">
            {/* Status Indieator */}
            {enabled && (
                <div className="absolute top-4 right-4 flex gap-2">
                    <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <div className="text-primary">{icon}</div>
                    <h3 className="text-slate-900 dark:text-white font-bold text-lg">{title}</h3>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-xs">{description}</p>
            </div>

            {/* Configuration */}
            <div className="space-y-4">
                <div className="flex flex-col gap-2">
                    <label className="text-slate-900 dark:text-white text-xs font-bold">Standard Definition</label>
                    <div className="flex items-center gap-2 text-sm bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                        <span className="text-slate-500">IF</span>
                        <span className="font-bold text-slate-700 dark:text-slate-200">{condition.label}</span>
                        <span className="text-slate-500">{condition.operator}</span>
                        <span className="font-bold text-primary">{condition.value}</span>
                    </div>
                </div>

                {/* AI Toggle */}
                <div className={`flex items-center justify-between p-3 border rounded-lg transition-colors ${enabled ? 'border-primary/20 bg-primary/5' : 'border-slate-200 dark:border-slate-800'}`}>
                    <div className="flex flex-col">
                        <span className="text-slate-900 dark:text-white text-xs font-bold">Enable AI Monitoring</span>
                        <span className="text-slate-500 text-[10px]">AI analyzes context for valid delays</span>
                    </div>
                    <button
                        onClick={() => setEnabled(!enabled)}
                        className={`w-11 h-6 rounded-full relative transition-colors ${enabled ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`}
                    >
                        <div className={`absolute top-[2px] left-[2px] bg-white rounded-full h-5 w-5 transition-transform shadow-sm ${enabled ? 'translate-x-[20px]' : ''}`}></div>
                    </button>
                </div>

                {/* Severity Slider */}
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                        <label className="text-slate-900 dark:text-white text-xs font-bold">Severity Alert Level</label>
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${severityColor}`}>{severityLabel}</span>
                    </div>
                    <input
                        className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                        type="range"
                        min="1"
                        max="3"
                        step="1"
                        value={severity}
                        onChange={(e) => setSeverity(parseInt(e.target.value))}
                    />
                    <div className="flex justify-between px-1">
                        <span className="text-[10px] text-slate-400">Low</span>
                        <span className="text-[10px] text-slate-400">Urgent</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="pt-4 mt-auto border-t border-dashed border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <button className="text-xs font-bold text-slate-500 hover:text-primary flex items-center gap-1 transition-colors">
                    <PlayCircle size={16} /> Test Rule
                </button>
                <button className="text-xs font-bold text-primary hover:underline">Edit Configuration</button>
            </div>
        </div>
    );
}
