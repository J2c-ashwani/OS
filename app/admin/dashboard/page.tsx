"use client";

import React, { useEffect, useState } from 'react';
import { Search, Bell, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import RevenueChart from '@/components/admin/RevenueChart';
import UserTable from '@/components/admin/UserTable';
import { useToast } from '@/components/ui/Toast';

interface DashboardStats {
    totalBusinesses: number;
    totalSubscriptions: number;
    totalDiagnostics: number;
    totalGaps: number;
}

export default function AdminDashboardPage() {
    const { toast } = useToast();
    const [stats, setStats] = useState<DashboardStats | null>(null);

    useEffect(() => {
        fetch('/api/admin/stats')
            .then(r => r.json())
            .then(data => setStats(data))
            .catch(() => setStats(null));
    }, []);

    const handleExportCSV = () => {
        const csv = 'Metric,Value\n' +
            `Active Subscribers,${stats?.totalSubscriptions || 0}\n` +
            `Total Businesses,${stats?.totalBusinesses || 0}\n` +
            `Diagnostics Run,${stats?.totalDiagnostics || 0}\n` +
            `Gaps Detected,${stats?.totalGaps || 0}\n`;
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `admin-metrics-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
        toast('Metrics exported as CSV');
    };

    return (
        <div className="flex flex-col h-full">
            <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur flex items-center justify-between px-8 sticky top-0 z-10">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Platform Admin Control Center</h2>
                <div className="flex items-center gap-4">
                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input className="w-full pl-10 pr-4 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-sm focus:ring-emerald-500 focus:border-emerald-500" placeholder="Global search..." type="text" />
                    </div>
                    <button className="size-10 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors relative">
                        <Bell className="text-slate-600 dark:text-slate-400" size={20} />
                        <span className="absolute top-2.5 right-2.5 size-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-950"></span>
                    </button>
                </div>
            </header>

            <div className="p-8 space-y-8 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <MetricCard label="Total Businesses" value={stats ? stats.totalBusinesses.toLocaleString() : '—'} trend="Live" isPositive />
                    <MetricCard label="Active Subscriptions" value={stats ? stats.totalSubscriptions.toLocaleString() : '—'} trend="Live" isPositive />
                    <MetricCard label="Diagnostics Run" value={stats ? stats.totalDiagnostics.toLocaleString() : '—'} trend="Live" isPositive />
                    <MetricCard label="Gaps Detected" value={stats ? stats.totalGaps.toLocaleString() : '—'} trend={stats?.totalGaps ? `${stats.totalGaps} active` : '—'} trendColor="amber" icon={<AlertCircle size={14} />} />
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Revenue Trends</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Platform earnings over the last 12 months</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => toast('Time range filter coming soon', 'info')} className="px-3 py-1 text-xs font-medium border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400">Last 12M</button>
                            <button onClick={handleExportCSV} className="px-3 py-1 text-xs font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">Export CSV</button>
                        </div>
                    </div>
                    <RevenueChart />
                </div>

                <UserTable />
            </div>
        </div>
    );
}

function MetricCard({ label, value, trend, isPositive, trendColor, icon }: any) {
    let colorClass = 'text-slate-500';
    if (trendColor === 'rose') colorClass = 'text-rose-500';
    else if (trendColor === 'amber') colorClass = 'text-amber-500';
    else if (isPositive) colorClass = 'text-emerald-500';

    return (
        <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
            <div className="mt-2 flex items-baseline justify-between">
                <p className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{value}</p>
                <p className={`text-xs font-semibold flex items-center gap-1 ${colorClass}`}>
                    {trend}
                    {icon ? icon : (isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />)}
                </p>
            </div>
        </div>
    );
}
