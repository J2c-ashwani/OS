"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Activity, CheckCircle2, Clock, AlertTriangle, Loader2 } from 'lucide-react';
import { getDashboardStatsAction } from '@/app/actions';
import { EmptyHealthChecks } from '@/components/ui/EmptyState';

export default function MonitoringDashboardClient() {
    const [activeScans, setActiveScans] = useState<any[]>([]);
    const [recentLogs, setRecentLogs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await getDashboardStatsAction();

                // Process Businesses -> Scans
                // We need to map the flat list of logs to the businesses to determine health status.
                const scans = data.businesses.filter((b: any) => ['MONITORED', 'TARGET'].includes(b.status)).map((biz: any) => {
                    const bizLogs = data.logs.filter((l: any) => l.businessId === biz.id);
                    // Sort by time descending
                    bizLogs.sort((a: any, b: any) => new Date(b.timestampSent).getTime() - new Date(a.timestampSent).getTime());
                    const lastLog = bizLogs[0];

                    // Rudimentary status check: if any recent log failed, show issues
                    const hasIssues = bizLogs.some((l: any) => l.result === 'FAILURE');

                    return {
                        business: biz,
                        lastCheck: lastLog ? lastLog.timestampSent : null,
                        gapsFound: hasIssues ? 1 : 0, // Placeholder count
                        status: hasIssues ? 'ISSUES' : lastLog ? 'HEALTHY' : 'PENDING'
                    };
                });

                setActiveScans(scans);
                setRecentLogs(data.logs);
            } catch (e) {
                console.error('Failed to load monitoring data:', e);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-emerald-500" size={32} />
            </div>
        );
    }

    if (activeScans.length === 0) {
        return <EmptyHealthChecks />;
    }

    return (
        <>
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-[#111] border border-gray-800 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-500 text-sm">Active</span>
                        <Activity size={16} className="text-emerald-500" />
                    </div>
                    <div className="text-3xl font-bold text-white">{activeScans.length}</div>
                </div>
                <div className="bg-[#111] border border-gray-800 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-500 text-sm">Healthy</span>
                        <CheckCircle2 size={16} className="text-emerald-500" />
                    </div>
                    <div className="text-3xl font-bold text-emerald-500">
                        {activeScans.filter((s: any) => s.status === 'HEALTHY').length}
                    </div>
                </div>
                <div className="bg-[#111] border border-gray-800 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-500 text-sm">Issues</span>
                        <AlertTriangle size={16} className="text-red-500" />
                    </div>
                    <div className="text-3xl font-bold text-red-500">
                        {activeScans.filter((s: any) => s.status === 'ISSUES').length}
                    </div>
                </div>
                <div className="bg-[#111] border border-gray-800 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-500 text-sm">Pending</span>
                        <Clock size={16} className="text-yellow-500" />
                    </div>
                    <div className="text-3xl font-bold text-yellow-500">
                        {activeScans.filter((s: any) => s.status === 'PENDING').length}
                    </div>
                </div>
            </div>

            {/* Monitoring List */}
            <div className="space-y-4">
                {activeScans.map((scan, idx) => (
                    <div key={idx} className="bg-[#111] border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                {/* Status Indicator */}
                                <div className={`w-3 h-3 rounded-full shrink-0 ${scan.status === 'HEALTHY' ? 'bg-emerald-500 animate-pulse' :
                                    scan.status === 'ISSUES' ? 'bg-red-500 animate-pulse' :
                                        'bg-yellow-500'
                                    }`} />

                                {/* Business Info */}
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-lg font-semibold text-white mb-1 truncate">{scan.business.name}</h3>
                                    <p className="text-sm text-gray-500 truncate">{scan.business.websiteUrl}</p>
                                </div>
                            </div>

                            {/* Status Details */}
                            <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
                                <div className="text-left sm:text-right flex-1 sm:flex-initial">
                                    <div className="text-sm text-gray-500 mb-1">Last Check</div>
                                    <div className="text-white font-mono text-xs sm:text-sm">
                                        {scan.lastCheck ? new Date(scan.lastCheck).toLocaleString() : 'Pending...'}
                                    </div>
                                </div>
                                <div className="text-left sm:text-right">
                                    <div className="text-sm text-gray-500 mb-1">Gaps</div>
                                    <div className={`text-2xl font-bold ${scan.gapsFound > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                                        {scan.gapsFound}
                                    </div>
                                </div>
                                <Link href={`/app/businesses/${scan.business.id}`} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap block text-center">
                                    Details
                                </Link>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-4 bg-gray-900 h-2 rounded-full overflow-hidden">
                            <div className={`h-full transition-all ${scan.status === 'HEALTHY' ? 'bg-emerald-500' :
                                scan.status === 'ISSUES' ? 'bg-red-500' :
                                    'bg-yellow-500 animate-pulse'
                                }`} style={{ width: scan.status === 'PENDING' ? '30%' : '100%' }} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity Log */}
            {recentLogs.length > 0 && (
                <div className="mt-8 bg-[#111] border border-gray-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                        {recentLogs.slice().reverse().slice(0, 5).map((log: any, idx: number) => {
                            const business = activeScans.find(s => s.business.id === log.businessId)?.business;
                            return (
                                <div key={idx} className="flex items-center gap-4 text-sm">
                                    <div className={`w-2 h-2 rounded-full shrink-0 ${log.result === 'SUCCESS' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                    <div className="flex-1 min-w-0">
                                        <span className="text-white truncate">{business?.name || 'Unknown Target'}</span>
                                        <span className="text-gray-500 mx-2">•</span>
                                        <span className="text-gray-500">{log.channel} check</span>
                                    </div>
                                    <div className="text-gray-600 font-mono text-xs shrink-0">
                                        {new Date(log.timestampSent).toLocaleTimeString()}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
}
