"use client";

import React from 'react';
import { Bot, Edit2, Trash2, Clock, Send } from 'lucide-react';
import Link from 'next/link';

interface MissedLeadCardProps {
    id: string;
    name: string;
    avatarUrl?: string; // Optional, can use placeholder
    status: 'High Intent' | 'At Risk' | 'Med Intent' | 'Critical' | 'Follow Up';
    inactiveTime: string;
    missQuery: string;
    aiResponse: string;
}

export default function MissedLeadCard({
    id,
    name,
    avatarUrl,
    status,
    inactiveTime,
    missQuery,
    aiResponse
}: MissedLeadCardProps) {

    const statusColors = {
        'High Intent': 'text-red-500 bg-red-500/10',
        'Critical': 'text-red-500 bg-red-500/10',
        'At Risk': 'text-orange-500 bg-orange-500/10',
        'Med Intent': 'text-blue-500 bg-blue-500/10',
        'Follow Up': 'text-slate-500 bg-slate-500/10',
    };

    const colorClass = statusColors[status] || 'text-slate-500 bg-slate-500/10';

    return (
        <Link href={`/app/intelligence/${id}`} className="block h-full">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:border-blue-600 dark:hover:border-blue-500 transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-md flex flex-col h-full group cursor-pointer">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between">
                    <div className="flex gap-3">
                        <div
                            className="size-10 rounded-lg bg-cover bg-center bg-slate-200"
                            style={{ backgroundImage: avatarUrl ? `url(${avatarUrl})` : undefined }}
                        >
                            {!avatarUrl && <div className="size-full flex items-center justify-center font-bold text-slate-400">{name.charAt(0)}</div>}
                        </div>
                        <div>
                            <h3 className="font-bold text-sm leading-tight text-slate-900 dark:text-white">{name}</h3>
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${colorClass}`}>
                                {status}
                            </span>
                        </div>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">{inactiveTime} Inactive</span>
                </div>

                <div className="p-4 flex-1">
                    <div className="mb-4">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter mb-1">The Miss</p>
                        <p className="text-sm italic text-slate-600 dark:text-slate-300 line-clamp-2">"{missQuery}"</p>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg p-3 relative">
                        <div className="flex items-center gap-2 mb-2">
                            <Bot size={14} className="text-blue-600 dark:text-blue-400" />
                            <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-tighter">AI Optimized Response</span>
                        </div>
                        <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-200">
                            {aiResponse}
                        </p>
                    </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 flex items-center gap-2 border-t border-slate-100 dark:border-slate-800">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                        Send Now
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors">
                        <Edit2 size={16} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors">
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
        </Link>
    );
}
