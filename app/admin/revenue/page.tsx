"use client";

import React, { useState } from 'react';
import { Download, Plus, TrendingUp, TrendingDown, MoreVertical } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function RevenueForecastPage() {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState<'30' | '60' | '90'>('30');

    const handleExportReport = () => {
        const csv = 'Client,Renewal Date,Contract Value,Tier,Status\n' +
            'Acme Corp,Oct 24 2023,$45000,Enterprise,Stable\n' +
            'Global Logistics,Oct 28 2023,$12200,Pro,At Risk\n' +
            'Sky Ventures,Nov 02 2023,$8500,SMB Basic,Likely\n';
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `revenue-forecast-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        toast('Revenue report exported as CSV');
    };

    return (
        <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950">
            <div className="px-8 py-8 flex flex-col gap-8 pb-20">
                {/* Page Heading */}
                <div className="flex flex-wrap justify-between items-end gap-3">
                    <div className="flex min-w-72 flex-col gap-2">
                        <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight">Renewal & Revenue Forecast</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-base font-normal">Manage upcoming subscriptions and mitigate churn risks.</p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={handleExportReport} className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-bold border border-slate-200 dark:border-transparent hover:bg-slate-200 dark:hover:bg-slate-800 transition-all">
                            <Download size={16} className="mr-2" />
                            <span>Export Report</span>
                        </button>
                        <button onClick={() => toast('Forecast engine coming soon', 'info')} className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-emerald-600 text-white text-sm font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-700 transition-all">
                            <Plus size={16} className="mr-2" />
                            <span>Create Forecast</span>
                        </button>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatCard label="Total Projected (90d)" value="$428,500" trend="+12.5% vs prev." trendUp trendColor="text-emerald-500" />
                    <StatCard label="Renewal Health" value="84%" trend="+2.1% improvement" trendUp trendColor="text-emerald-500" />
                    <StatCard label="Churn Risk Revenue" value="-$12,400" trend="-5.4% high risk" trendUp={false} trendColor="text-rose-500" />
                </div>

                {/* Main Section */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Side */}
                    <div className="flex-[2] flex flex-col gap-4">
                        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                            <div className="px-4 border-b border-slate-200 dark:border-slate-800 flex gap-8">
                                <Tab label="Next 30 Days" active={activeTab === '30'} onClick={() => setActiveTab('30')} />
                                <Tab label="Next 60 Days" active={activeTab === '60'} onClick={() => setActiveTab('60')} />
                                <Tab label="Next 90 Days" active={activeTab === '90'} onClick={() => setActiveTab('90')} />
                            </div>
                            <div>
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-medium">
                                            <th className="px-6 py-3">Client Account</th>
                                            <th className="px-6 py-3">Renewal Date</th>
                                            <th className="px-6 py-3">Contract Value</th>
                                            <th className="px-6 py-3">Tier</th>
                                            <th className="px-6 py-3">Status</th>
                                            <th className="px-6 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        <TableRow initials="AC" name="Acme Corp" date="Oct 24, 2023" value="$45,000" tier="Enterprise" tierColor="indigo" status="Stable" statusColor="green" onAction={() => toast('Client details view coming soon', 'info')} />
                                        <TableRow initials="GL" name="Global Logistics" date="Oct 28, 2023" value="$12,200" tier="Pro" tierColor="purple" status="At Risk" statusColor="orange" pulse onAction={() => toast('Client details view coming soon', 'info')} />
                                        <TableRow initials="SV" name="Sky Ventures" date="Nov 02, 2023" value="$8,500" tier="SMB Basic" tierColor="slate" status="Likely" statusColor="green" onAction={() => toast('Client details view coming soon', 'info')} />
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex-1 flex flex-col gap-6">
                        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
                            <h3 className="text-slate-900 dark:text-white font-bold mb-4">Revenue by Tier</h3>
                            <div className="flex flex-col gap-4">
                                <ProBar label="Enterprise" value="$285,000" percent="66%" color="bg-emerald-600" />
                                <ProBar label="Pro" value="$115,000" percent="27%" color="bg-indigo-500" />
                                <ProBar label="SMB Basic" value="$28,500" percent="7%" color="bg-slate-400" />
                            </div>
                        </div>

                        <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-slate-900 dark:text-white font-bold">Churn Priority</h3>
                                <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-600 text-[10px] font-black uppercase tracking-tighter">High Alert</span>
                            </div>
                            <div className="flex flex-col gap-4">
                                <RiskCard name="Nova Soft" score="24" desc="Engagement dropped 65% in last 14 days." onSendNote={() => toast('Note sent to account manager')} onCallRep={() => toast('Call scheduled with sales rep')} />
                                <RiskCard name="TechFlow" score="48" desc="Primary admin inactive for 3 weeks." isSecondary />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="bg-slate-900 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-transparent pointer-events-none"></div>
                    <div className="flex flex-col gap-2 z-10 text-center md:text-left">
                        <h4 className="text-white text-xl font-bold">Ready to finalize the Q4 revenue report?</h4>
                        <p className="text-slate-400 text-sm">Automated projections are ready based on current renewal likelihood scores.</p>
                    </div>
                    <div className="flex gap-4 z-10">
                        <button onClick={() => toast('Projection review coming soon', 'info')} className="px-6 py-3 rounded-xl bg-white text-slate-900 font-bold text-sm hover:bg-slate-100 transition-colors">Review Projections</button>
                        <button onClick={() => toast('Q4 audit finalized successfully')} className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-xl shadow-emerald-500/30 hover:bg-emerald-700 transition-all">Finalize Audit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, trend, trendUp, trendColor }: any) {
    return (
        <div className="flex flex-col gap-2 rounded-xl p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">{label}</p>
            <p className="text-slate-900 dark:text-white tracking-light text-3xl font-bold leading-tight">{value}</p>
            <div className="flex items-center gap-1">
                {trendUp ? <TrendingUp size={16} className={trendColor} /> : <TrendingDown size={16} className={trendColor} />}
                <p className={`${trendColor} text-sm font-semibold`}>{trend}</p>
            </div>
        </div>
    );
}

function Tab({ label, active, onClick }: { label: string; active?: boolean; onClick: () => void }) {
    return (
        <button onClick={onClick} className={`flex flex-col items-center justify-center border-b-2 pb-3 pt-4 px-2 cursor-pointer transition-colors ${active ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500 hover:text-emerald-600'}`}>
            <p className="text-sm font-bold leading-normal tracking-[0.015em]">{label}</p>
        </button>
    );
}

function TableRow({ initials, name, date, value, tier, tierColor, status, statusColor, pulse, onAction }: any) {
    let tierBg = 'bg-slate-200 dark:bg-slate-800 text-slate-700';
    if (tierColor === 'indigo') tierBg = 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300';
    if (tierColor === 'purple') tierBg = 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300';

    let statusClass = 'text-green-500';
    if (statusColor === 'orange') statusClass = 'text-orange-500';

    return (
        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="size-8 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 flex items-center justify-center font-bold text-xs">{initials}</div>
                    <span className="font-semibold text-slate-900 dark:text-white">{name}</span>
                </div>
            </td>
            <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{date}</td>
            <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{value}</td>
            <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-xs font-bold ${tierBg}`}>{tier}</span></td>
            <td className="px-6 py-4">
                <div className={`flex items-center gap-2 ${statusClass}`}>
                    <div className={`size-2 rounded-full bg-current ${pulse ? 'animate-pulse' : ''}`}></div>
                    <span className="text-xs font-medium">{status}</span>
                </div>
            </td>
            <td className="px-6 py-4 text-right">
                <button onClick={onAction} className="text-slate-400 hover:text-emerald-600"><MoreVertical size={18} /></button>
            </td>
        </tr>
    );
}

function ProBar({ label, value, percent, color }: any) {
    return (
        <div className="flex flex-col gap-1">
            <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-500">{label}</span>
                <span className="text-slate-900 dark:text-white">{value} ({percent})</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className={`${color} h-full`} style={{ width: percent }}></div>
            </div>
        </div>
    );
}

function RiskCard({ name, score, desc, isSecondary, onSendNote, onCallRep }: any) {
    return (
        <div className={`p-3 rounded-lg border flex flex-col gap-2 ${isSecondary ? 'bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800' : 'bg-orange-50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-900/20'}`}>
            <div className="flex justify-between items-start">
                <span className="text-sm font-bold text-slate-900 dark:text-white">{name}</span>
                <span className="text-[10px] font-bold text-slate-600 bg-slate-200 dark:bg-slate-700 px-1.5 rounded uppercase">Score: {score}/100</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 italic">{desc}</p>
            {!isSecondary && (
                <div className="flex gap-2 mt-1">
                    <button onClick={onSendNote} className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-1.5 rounded text-[10px] font-bold text-emerald-600 shadow-sm hover:bg-emerald-600 hover:text-white transition-all">Send Note</button>
                    <button onClick={onCallRep} className="flex-1 bg-emerald-600 text-white py-1.5 rounded text-[10px] font-bold shadow-sm hover:bg-emerald-700 transition-all">Call Rep</button>
                </div>
            )}
        </div>
    );
}
