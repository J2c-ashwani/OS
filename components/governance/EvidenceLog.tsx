import React from 'react';
import { DiagnosticLog } from '@/types';

interface EvidenceLogProps {
    logs: DiagnosticLog[];
}

export function EvidenceLog({ logs }: EvidenceLogProps) {
    if (logs.length === 0) return null;

    return (
        <div className="mt-4 border border-slate-800 rounded-md overflow-hidden">
            <div className="bg-slate-900/50 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Immutable Evidence Log</h3>
                <span className="text-[10px] text-slate-600">READ-ONLY AUDIT TRAIL</span>
            </div>
            <div className="divide-y divide-slate-800/50 max-h-40 overflow-y-auto">
                {logs.map((log) => (
                    <div key={log.id} className="px-4 py-2 text-xs grid grid-cols-12 gap-2 hover:bg-slate-900/30 transition-colors">
                        <div className="col-span-3 text-slate-500 font-mono">
                            {new Date(log.timestampSent).toLocaleString()}
                        </div>
                        <div className="col-span-2 text-blue-400 font-medium">
                            {log.channel}
                        </div>
                        <div className="col-span-5 text-slate-300">
                            {log.evidence}
                        </div>
                        <div className="col-span-2 text-right">
                            {/* Logic to determine label based on evidence or result - simplified for now */}
                            <span className={`px-1.5 py-0.5 rounded ${log.result === 'FAILURE' ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'
                                }`}>
                                {log.result}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
