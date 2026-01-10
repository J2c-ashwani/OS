"use client";

import React from 'react';

export default function DiagnosticSummaryTable() {
    return (
        <div className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Monthly Diagnostic Summary</h3>
                <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded font-bold text-slate-500">5-Step Analysis Complete</span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 font-bold uppercase text-[10px] tracking-widest">
                        <tr>
                            <th className="px-6 py-3">Diagnostic Category</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Resolution Method</th>
                            <th className="px-6 py-3 text-right">Value Impact</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-200">Payment Link Recovery</td>
                            <td className="px-6 py-4 text-emerald-500 font-bold">Optimized</td>
                            <td className="px-6 py-4 text-slate-500">Automated Webhook</td>
                            <td className="px-6 py-4 text-right font-bold text-slate-900 dark:text-white">$4,200</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-200">Inbound Lead Triage</td>
                            <td className="px-6 py-4 text-emerald-500 font-bold">Stable</td>
                            <td className="px-6 py-4 text-slate-500">Natural Language Understanding</td>
                            <td className="px-6 py-4 text-right font-bold text-slate-900 dark:text-white">$3,150</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-200">Abandoned Cart Concierge</td>
                            <td className="px-6 py-4 text-primary font-bold">Active</td>
                            <td className="px-6 py-4 text-slate-500">Outbound AI Voice/SMS</td>
                            <td className="px-6 py-4 text-right font-bold text-slate-900 dark:text-white">$5,100</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
