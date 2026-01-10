import React from 'react';
import { Check, ClipboardList, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

export default function SOPComplianceTracker() {
    return (
        <section>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-slate-900 dark:text-white text-2xl font-bold flex items-center gap-2">
                    <ClipboardList className="text-primary" size={28} />
                    SOP Compliance Tracker
                </h2>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500 font-medium">Filter:</span>
                    <select className="bg-white dark:bg-[#1c1f27] border border-slate-200 dark:border-[#3b4354] rounded-lg text-xs font-bold px-3 py-1.5 focus:ring-primary outline-none text-slate-900 dark:text-slate-300">
                        <option>All Departments</option>
                        <option>Sales Team A</option>
                        <option>Support Team</option>
                    </select>
                </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-[#3b4354] bg-white dark:bg-[#1c1f27]">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 dark:bg-[#282e39] border-b border-slate-200 dark:border-[#3b4354]">
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">SOP Rule Description</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Benchmark/Goal</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Actual Performance</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Variance/Gap</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-[#3b4354]">
                        {/* Row 1 */}
                        <tr className="hover:bg-slate-50 dark:hover:bg-[#222731] transition-colors">
                            <td className="px-6 py-4">
                                <div className="font-bold text-slate-900 dark:text-white">Initial Inquiry Response</div>
                                <div className="text-xs text-slate-500 mt-0.5 italic">Must respond to all new leads via email or phone.</div>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">&lt; 15 Minutes</td>
                            <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300 font-medium">12 Minutes</td>
                            <td className="px-6 py-4 text-sm text-green-500 font-bold">-3 Min (Optimal)</td>
                            <td className="px-6 py-4">
                                <span className="bg-green-500/10 text-green-500 text-[10px] font-black px-2 py-1 rounded uppercase">Compliant</span>
                            </td>
                            <td className="px-6 py-4">
                                <button className="text-slate-400 hover:text-white">
                                    <MoreHorizontal size={20} />
                                </button>
                            </td>
                        </tr>
                        {/* Row 2 */}
                        <tr className="hover:bg-slate-50 dark:hover:bg-[#222731] transition-colors border-l-4 border-red-500">
                            <td className="px-6 py-4">
                                <div className="font-bold text-slate-900 dark:text-white">Qualification Follow-up</div>
                                <div className="text-xs text-slate-500 mt-0.5 italic">Second touchpoint after lead qualifying.</div>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">&lt; 4 Hours</td>
                            <td className="px-6 py-4 text-sm text-red-500 font-bold">12.4 Hours</td>
                            <td className="px-6 py-4 text-sm text-red-500 font-bold">+8.4 Hours Gap</td>
                            <td className="px-6 py-4">
                                <span className="bg-red-500/10 text-red-500 text-[10px] font-black px-2 py-1 rounded uppercase">Critical</span>
                            </td>
                            <td className="px-6 py-4">
                                <button className="bg-primary/20 text-primary hover:bg-primary hover:text-white px-3 py-1 rounded text-xs font-bold transition-all">Fix SOP</button>
                            </td>
                        </tr>
                        {/* Row 3 */}
                        <tr className="hover:bg-slate-50 dark:hover:bg-[#222731] transition-colors">
                            <td className="px-6 py-4">
                                <div className="font-bold text-slate-900 dark:text-white">CRM Data Enrichment</div>
                                <div className="text-xs text-slate-500 mt-0.5 italic">Enter lead source and budget before stage 3.</div>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">100% Fields</td>
                            <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300 font-medium">82% Fields</td>
                            <td className="px-6 py-4 text-sm text-amber-500 font-bold">18% Missing</td>
                            <td className="px-6 py-4">
                                <span className="bg-amber-500/10 text-amber-500 text-[10px] font-black px-2 py-1 rounded uppercase">Warning</span>
                            </td>
                            <td className="px-6 py-4">
                                <button className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-600 hover:text-white px-3 py-1 rounded text-xs font-bold transition-all">Audit</button>
                            </td>
                        </tr>
                        {/* Row 4 */}
                        <tr className="hover:bg-slate-50 dark:hover:bg-[#222731] transition-colors border-l-4 border-red-500">
                            <td className="px-6 py-4">
                                <div className="font-bold text-slate-900 dark:text-white">Post-Meeting Summary</div>
                                <div className="text-xs text-slate-500 mt-0.5 italic">AI generated notes sent to client within 1 hour.</div>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300">&lt; 1 Hour</td>
                            <td className="px-6 py-4 text-sm text-red-500 font-bold">4.2 Hours</td>
                            <td className="px-6 py-4 text-sm text-red-500 font-bold">+3.2 Hours Gap</td>
                            <td className="px-6 py-4">
                                <span className="bg-red-500/10 text-red-500 text-[10px] font-black px-2 py-1 rounded uppercase">Critical</span>
                            </td>
                            <td className="px-6 py-4">
                                <button className="bg-primary text-white px-3 py-1 rounded text-xs font-bold shadow-sm hover:shadow-primary/40 transition-all">Automate</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="p-4 bg-slate-50 dark:bg-[#1c1f27] border-t border-slate-200 dark:border-[#3b4354] flex justify-between items-center">
                    <div className="text-xs text-slate-500">Showing 4 of 28 SOP Rules tracked by Agentic AI</div>
                    <div className="flex gap-2">
                        <button className="p-1.5 rounded border border-slate-300 dark:border-slate-600 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <ChevronLeft size={16} />
                        </button>
                        <button className="p-1.5 rounded border border-slate-300 dark:border-slate-600 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
