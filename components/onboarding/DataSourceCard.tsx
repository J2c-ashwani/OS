"use client";

import React from 'react';
import { CheckCircle2, AlertCircle, Plus } from 'lucide-react';

interface DataSourceCardProps {
    name: string;
    type: string;
    icon: React.ReactNode;
    status: 'connected' | 'disconnected' | 'error';
    lastSynced?: string;
    onConnect?: () => void;
}

export default function DataSourceCard({ name, type, icon, status, lastSynced, onConnect }: DataSourceCardProps) {
    const isConnected = status === 'connected';

    return (
        <div className={`
            bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm 
            flex flex-col gap-4 relative group transition-all
            ${!isConnected ? 'hover:border-primary border-dashed' : 'border-solid'}
        `}>
            {isConnected && (
                <div className="absolute top-4 right-4 text-emerald-500">
                    <CheckCircle2 size={18} />
                </div>
            )}

            <div className="flex items-center gap-4">
                <div className={`size-12 rounded-lg flex items-center justify-center text-xl shadow-sm ${isConnected ? 'bg-slate-100 dark:bg-slate-800' : 'bg-slate-50 dark:bg-slate-800/50 grayscale opacity-80'}`}>
                    {icon}
                </div>
                <div>
                    <h3 className="text-slate-900 dark:text-white font-bold text-base">{name}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs">{type}</p>
                </div>
            </div>

            <div className="mt-2 flex items-center justify-between">
                {isConnected ? (
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Active Sync</span>
                        </div>
                        <span className="text-[10px] text-slate-400">Last synced {lastSynced}</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-slate-400 text-xs">
                        <span className="size-2 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                        Not Connected
                    </div>
                )}

                {!isConnected && (
                    <button
                        onClick={onConnect}
                        className="bg-slate-900 hover:bg-primary dark:bg-white dark:text-slate-900 dark:hover:bg-primary dark:hover:text-white text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Plus size={14} /> Connect
                    </button>
                )}

                {isConnected && (
                    <button className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                        Configure
                    </button>
                )}
            </div>
        </div>
    );
}
