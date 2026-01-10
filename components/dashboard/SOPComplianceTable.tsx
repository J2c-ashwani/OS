import React from 'react';
import { ShieldCheck, Files, Mail, User, AlertCircle, MoreVertical } from 'lucide-react';

export default function SOPComplianceTable() {
    return (
        <div className="bg-white dark:bg-[#1a212f] rounded-xl border border-slate-200 dark:border-[#2d3648] shadow-sm flex flex-col overflow-hidden">
            <div className="p-5 border-b border-slate-200 dark:border-[#2d3648] flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Real-time SOP Compliance</h3>
                    <p className="text-xs text-slate-500">Monitoring AI Agent adherence to company playbooks</p>
                </div>
                <button className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-700 dark:text-slate-300">
                    Audit All
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800/50">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Agent Identity</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Active Playbook</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Adherence</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-[#2d3648]">
                        <tr>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <User className="text-primary" size={20} />
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">InboundSDR-01</p>
                                        <p className="text-xs text-slate-500">Lead Qualification</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">B2B Core Script v4.2</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-24 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500" style={{ width: '98%' }}></div>
                                    </div>
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">98%</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-wider">Optimal</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-slate-400 hover:text-primary transition-colors">
                                    <MoreVertical size={16} />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <Files className="text-orange-500" size={20} />
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">SupportSync-AI</p>
                                        <p className="text-xs text-slate-500">Ticketing & Routing</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">SLA Escalation Protocol</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-24 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-orange-500" style={{ width: '76%' }}></div>
                                    </div>
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">76%</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-500 text-[10px] font-bold uppercase tracking-wider">Deviation</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-slate-400 hover:text-primary transition-colors">
                                    <MoreVertical size={16} />
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <Mail className="text-slate-400" size={20} />
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">OutreachBot-03</p>
                                        <p className="text-xs text-slate-500">Cold Prospecting</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">Compliance Policy v1.1</td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-24 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500" style={{ width: '100%' }}></div>
                                    </div>
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">100%</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-wider">Optimal</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-slate-400 hover:text-primary transition-colors">
                                    <MoreVertical size={16} />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
