'use client';

import '../../globals.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, Target, Activity, Bell, Settings, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { MOCK_BUSINESSES, MOCK_DIAGNOSTICS, MOCK_GAPS } from '@/lib/data/store';

export default function MonitoringPage() {
    const [activeScans, setActiveScans] = useState<any[]>([]);

    // Simulate active monitoring
    useEffect(() => {
        const scans = MOCK_BUSINESSES.filter(b => b.status === 'MONITORED').map(biz => {
            const recentDiagnostics = MOCK_DIAGNOSTICS.filter(d => d.businessId === biz.id);
            const relatedGaps = MOCK_GAPS.filter(g => g.businessId === biz.id && g.status === 'OPEN');

            return {
                business: biz,
                lastCheck: recentDiagnostics.length > 0 ? recentDiagnostics[recentDiagnostics.length - 1].timestampSent : null,
                gapsFound: relatedGaps.length,
                status: relatedGaps.length > 0 ? 'ISSUES' : recentDiagnostics.length > 0 ? 'HEALTHY' : 'PENDING'
            };
        });
        setActiveScans(scans);
    }, []);

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-gray-200">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-screen w-64 bg-[#111] border-r border-gray-900 p-6">
                <h1 className="text-xl font-bold text-white mb-8">Response Audit</h1>
                <nav className="space-y-2">
                    <Link href="/app/dashboard" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-800 transition-colors text-gray-400">
                        <Home size={18} />
                        <span>Dashboard</span>
                    </Link>
                    <Link href="/app/businesses" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-800 transition-colors text-gray-400">
                        <Target size={18} />
                        <span>Businesses</span>
                    </Link>
                    <Link href="/app/monitoring" className="flex items-center gap-3 px-4 py-2 rounded bg-emerald-500/10 text-emerald-500">
                        <Activity size={18} />
                        <span>Health Checks</span>
                    </Link>
                    <Link href="/app/alerts" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-800 transition-colors text-gray-400">
                        <Bell size={18} />
                        <span>Alerts</span>
                    </Link>
                    <Link href="/app/settings" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-800 transition-colors text-gray-400">
                        <Settings size={18} />
                        <span>Settings</span>
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="ml-64 p-8" style={{ marginLeft: '16rem', padding: '2rem' }}>
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">Health Checks</h2>
                        <p className="text-gray-500">Real-time status of all monitored businesses</p>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-4 gap-4 mb-8">
                        <div className="bg-[#111] border border-gray-800 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-500 text-sm">Active Monitors</span>
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
                                {activeScans.filter(s => s.status === 'HEALTHY').length}
                            </div>
                        </div>
                        <div className="bg-[#111] border border-gray-800 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-500 text-sm">Issues Found</span>
                                <AlertTriangle size={16} className="text-red-500" />
                            </div>
                            <div className="text-3xl font-bold text-red-500">
                                {activeScans.filter(s => s.status === 'ISSUES').length}
                            </div>
                        </div>
                        <div className="bg-[#111] border border-gray-800 rounded-lg p-6">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-500 text-sm">Pending</span>
                                <Clock size={16} className="text-yellow-500" />
                            </div>
                            <div className="text-3xl font-bold text-yellow-500">
                                {activeScans.filter(s => s.status === 'PENDING').length}
                            </div>
                        </div>
                    </div>

                    {/* Monitoring List */}
                    {activeScans.length === 0 ? (
                        <div className="bg-[#111] border border-gray-800 rounded-lg p-12 text-center">
                            <Activity size={48} className="mx-auto mb-4 text-gray-700" />
                            <h3 className="text-xl font-semibold text-white mb-2">No active monitors</h3>
                            <p className="text-gray-500 mb-6">
                                Start monitoring businesses from the Target Discovery page
                            </p>
                            <Link href="/targets" className="inline-block bg-emerald-500 hover:bg-emerald-600 text-black px-6 py-3 rounded-lg font-semibold">
                                View Targets
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {activeScans.map((scan, idx) => (
                                <div key={idx} className="bg-[#111] border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            {/* Status Indicator */}
                                            <div className={`w-3 h-3 rounded-full ${scan.status === 'HEALTHY' ? 'bg-emerald-500 animate-pulse' :
                                                scan.status === 'ISSUES' ? 'bg-red-500 animate-pulse' :
                                                    'bg-yellow-500'
                                                }`} />

                                            {/* Business Info */}
                                            <div>
                                                <h3 className="text-lg font-semibold text-white mb-1">{scan.business.name}</h3>
                                                <p className="text-sm text-gray-500">{scan.business.websiteUrl}</p>
                                            </div>
                                        </div>

                                        {/* Status Details */}
                                        <div className="flex items-center gap-6">
                                            <div className="text-right">
                                                <div className="text-sm text-gray-500 mb-1">Last Check</div>
                                                <div className="text-white font-mono text-sm">
                                                    {scan.lastCheck ? new Date(scan.lastCheck).toLocaleString() : 'Pending...'}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm text-gray-500 mb-1">Gaps Found</div>
                                                <div className={`text-2xl font-bold ${scan.gapsFound > 0 ? 'text-red-500' : 'text-emerald-500'}`}>
                                                    {scan.gapsFound}
                                                </div>
                                            </div>
                                            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors">
                                                View Details
                                            </button>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mt-4 bg-gray-900 h-2 rounded-full overflow-hidden">
                                        <div className={`h-full ${scan.status === 'HEALTHY' ? 'bg-emerald-500' :
                                            scan.status === 'ISSUES' ? 'bg-red-500' :
                                                'bg-yellow-500 animate-pulse'
                                            }`} style={{ width: scan.status === 'PENDING' ? '30%' : '100%' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Recent Activity Log */}
                    <div className="mt-8 bg-[#111] border border-gray-800 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                        <div className="space-y-3">
                            {MOCK_DIAGNOSTICS.slice(-5).reverse().map((log, idx) => {
                                const business = MOCK_BUSINESSES.find(b => b.id === log.businessId);
                                return (
                                    <div key={idx} className="flex items-center gap-4 text-sm">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                        <div className="flex-1">
                                            <span className="text-white">{business?.name || 'Unknown'}</span>
                                            <span className="text-gray-500 mx-2">•</span>
                                            <span className="text-gray-500">{log.channel} check</span>
                                        </div>
                                        <div className="text-gray-600 font-mono text-xs">
                                            {new Date(log.timestampSent).toLocaleTimeString()}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
