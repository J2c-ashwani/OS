"use client";

import React from 'react';
import { Verified } from 'lucide-react';

export default function ConfidenceTable() {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-slate-900 dark:text-white text-xl font-bold">Confidence Mapping Analysis</h3>
                <p className="text-slate-500 text-sm">Review how the AI evaluated your data streams before finalization.</p>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50">
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Source</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Detected Channel</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Suggested Mapping</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Confidence</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {/* Table Row 1 */}
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="px-6 py-4">
                                <div className="size-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">#</div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="text-slate-900 dark:text-white font-medium text-sm">#sales-leads</span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                    Inquiry
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-24 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700 h-1.5">
                                        <div className="h-full bg-primary" style={{ width: '98%' }}></div>
                                    </div>
                                    <p className="text-slate-900 dark:text-white text-xs font-bold">98%</p>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <span className="text-green-600 font-bold text-xs flex items-center justify-end gap-1">
                                    <Verified size={14} /> Verified
                                </span>
                            </td>
                        </tr>
                        {/* Table Row 2 */}
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="px-6 py-4">
                                <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">@</div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="text-slate-900 dark:text-white font-medium text-sm">support@company.com</span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300">
                                    Follow-up
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-24 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700 h-1.5">
                                        <div className="h-full bg-primary" style={{ width: '85%' }}></div>
                                    </div>
                                    <p className="text-slate-900 dark:text-white text-xs font-bold">85%</p>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-primary font-bold text-xs hover:underline uppercase tracking-wider">Assign</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
