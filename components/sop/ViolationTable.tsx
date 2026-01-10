"use client";

import React, { useState } from 'react';
import { AlertTriangle, ChevronDown } from 'lucide-react';
import DiagnosticOverlay from './DiagnosticOverlay';

export default function ViolationTable() {
    const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);

    return (
        <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-xl font-bold">Recent Violations</h3>
                <div className="flex gap-2">
                    <button className="bg-primary/20 text-primary border border-primary/30 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors hover:bg-primary/30">
                        All Violations <ChevronDown size={14} />
                    </button>
                    <button className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-700 transition-colors">Process Overload</button>
                    <button className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-700 transition-colors">Latency Issues</button>
                </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/20">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-800/40 text-slate-400 text-[10px] uppercase tracking-wider font-bold">
                            <th className="px-6 py-4">Rule Name</th>
                            <th className="px-6 py-4">Detected Behavior</th>
                            <th className="px-6 py-4">Timestamp</th>
                            <th className="px-6 py-4">Root Cause</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {/* Row 1: High Priority - Triggers Modal */}
                        <tr className="hover:bg-slate-800/30 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <span className="size-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
                                    <span className="text-white font-medium">Follow-up within 4h</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 font-mono text-sm text-red-300 bg-red-500/5 rounded">9h delay detected</td>
                            <td className="px-6 py-4 text-slate-400 text-sm font-mono">2023-11-24 14:32:01</td>
                            <td className="px-6 py-4">
                                <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-xs font-medium border border-slate-700">Process Overload</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button
                                    className="bg-primary hover:bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-all shadow-lg shadow-blue-900/10"
                                    onClick={() => setIsDiagnosticOpen(true)}
                                >
                                    Diagnostic
                                </button>
                            </td>
                        </tr>

                        {/* Row 2: Medium Priority */}
                        <tr className="hover:bg-slate-800/30 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <span className="size-2 rounded-full bg-amber-500"></span>
                                    <span className="text-white font-medium">Data Anonymization</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 font-mono text-sm text-slate-300 bg-slate-400/5 rounded">Cleartext PII in logs</td>
                            <td className="px-6 py-4 text-slate-400 text-sm font-mono">2023-11-24 14:28:45</td>
                            <td className="px-6 py-4">
                                <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-xs font-medium border border-slate-700">Logic Error</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-4 py-1.5 rounded-lg transition-all">
                                    Diagnostic
                                </button>
                            </td>
                        </tr>

                        {/* Row 3: High Priority */}
                        <tr className="hover:bg-slate-800/30 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <span className="size-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
                                    <span className="text-white font-medium">API Token Lifecycle</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 font-mono text-sm text-red-300 bg-red-500/5 rounded">Token reuse &gt; 24h</td>
                            <td className="px-6 py-4 text-slate-400 text-sm font-mono">2023-11-24 14:15:12</td>
                            <td className="px-6 py-4">
                                <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-xs font-medium border border-slate-700">Security Policy Violation</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-4 py-1.5 rounded-lg transition-all">
                                    Diagnostic
                                </button>
                            </td>
                        </tr>

                        {/* Row 4: High Priority */}
                        <tr className="hover:bg-slate-800/30 transition-colors group">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <span className="size-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
                                    <span className="text-white font-medium">Resource Ceiling</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 font-mono text-sm text-red-300 bg-red-500/5 rounded">Mem usage &gt; 92%</td>
                            <td className="px-6 py-4 text-slate-400 text-sm font-mono">2023-11-24 14:02:11</td>
                            <td className="px-6 py-4">
                                <span className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-xs font-medium border border-slate-700">Process Overload</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-4 py-1.5 rounded-lg transition-all">
                                    Diagnostic
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <DiagnosticOverlay
                isOpen={isDiagnosticOpen}
                onClose={() => setIsDiagnosticOpen(false)}
            />
        </div>
    );
}
