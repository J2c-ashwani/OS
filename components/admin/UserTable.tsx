"use client";

import React from 'react';
import { Edit, Receipt, MoreVertical } from 'lucide-react';

export default function UserTable() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Subscription Lifecycle</h3>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-sm hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors text-slate-600 dark:text-slate-400">
                        Filter
                    </button>
                    <button className="bg-emerald-600 text-white flex items-center gap-2 px-4 py-2 rounded-lg text-sm hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/20 font-bold">
                        Add New User
                    </button>
                </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40">
                <table className="w-full text-left border-collapse text-sm">
                    <thead className="bg-slate-50 dark:bg-slate-800/50">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">User</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Plan Type</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Start Date</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Renewal</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {/* Row 1 */}
                        <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Sarah Jenkins</p>
                                        <p className="text-xs text-slate-500">sarah.j@enterprise.com</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">Enterprise</span>
                            </td>
                            <td className="px-6 py-4 text-slate-500">Oct 12, 2023</td>
                            <td className="px-6 py-4">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">18 days left</p>
                                    <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500" style={{ width: '70%' }}></div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                                    <span className="size-1.5 rounded-full bg-emerald-500"></span> Active
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex gap-2 text-slate-400">
                                    <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                        <Edit size={16} />
                                    </button>
                                    <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                        <Receipt size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        {/* Row 2 */}
                        <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-orange-100 dark:bg-orange-900/20"></div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">David Chen</p>
                                        <p className="text-xs text-slate-500">d.chen@startup.io</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">Pro Plan</span>
                            </td>
                            <td className="px-6 py-4 text-slate-500">Jan 05, 2024</td>
                            <td className="px-6 py-4">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-amber-500">2 days left</p>
                                    <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div className="h-full bg-amber-500" style={{ width: '15%' }}></div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                                    <span className="size-1.5 rounded-full bg-amber-500"></span> Expiring
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex gap-2 text-slate-400">
                                    <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                        <Edit size={16} />
                                    </button>
                                    <button className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                        <Receipt size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {/* Table Pagination/Footer */}
                <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <p className="text-sm text-slate-500">Showing 1 to 10 of 158 results</p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 text-slate-600 dark:text-slate-400" disabled>Previous</button>
                        <button className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
