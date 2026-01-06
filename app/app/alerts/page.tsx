'use client';

import '../../globals.css';
import { useState } from 'react';
import Link from 'next/link';
import { Home, Target, Activity, Bell, Settings, Send, ExternalLink, Mail } from 'lucide-react';
import { MOCK_ALERTS, MOCK_GAPS, MOCK_BUSINESSES } from '@/lib/data/store';

export default function AlertsPage() {
    const [filter, setFilter] = useState<'ALL' | 'SENT' | 'OPENED' | 'CLICKED' | 'REPLIED'>('ALL');

    const filteredAlerts = MOCK_ALERTS.filter(alert => filter === 'ALL' || alert.status === filter);

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
                    <Link href="/app/monitoring" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-800 transition-colors text-gray-400">
                        <Activity size={18} />
                        <span>Health Checks</span>
                    </Link>
                    <Link href="/app/alerts" className="flex items-center gap-3 px-4 py-2 rounded bg-emerald-500/10 text-emerald-500">
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
                        <h2 className="text-3xl font-bold text-white mb-2">Alerts</h2>
                        <p className="text-gray-500">Track automated alerts sent to businesses about detected gaps</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-5 gap-4 mb-8">
                        <div className="bg-[#111] border border-gray-800 rounded-lg p-4">
                            <div className="text-2xl font-bold text-white">{MOCK_ALERTS.length}</div>
                            <div className="text-sm text-gray-500">Total Sent</div>
                        </div>
                        <div className="bg-[#111] border border-gray-800 rounded-lg p-4">
                            <div className="text-2xl font-bold text-blue-500">
                                {MOCK_ALERTS.filter(a => a.status === 'SENT').length}
                            </div>
                            <div className="text-sm text-gray-500">Sent</div>
                        </div>
                        <div className="bg-[#111] border border-gray-800 rounded-lg p-4">
                            <div className="text-2xl font-bold text-emerald-500">
                                {MOCK_ALERTS.filter(a => a.status === 'OPENED').length}
                            </div>
                            <div className="text-sm text-gray-500">Opened</div>
                        </div>
                        <div className="bg-[#111] border border-gray-800 rounded-lg p-4">
                            <div className="text-2xl font-bold text-purple-500">
                                {MOCK_ALERTS.filter(a => a.status === 'CLICKED').length}
                            </div>
                            <div className="text-sm text-gray-500">Clicked</div>
                        </div>
                        <div className="bg-[#111] border border-gray-800 rounded-lg p-4">
                            <div className="text-2xl font-bold text-yellow-500">
                                {MOCK_ALERTS.filter(a => a.status === 'REPLIED').length}
                            </div>
                            <div className="text-sm text-gray-500">Replied</div>
                        </div>
                    </div>

                    {/* Filter */}
                    <div className="mb-6 flex gap-2">
                        {['ALL', 'SENT', 'OPENED', 'CLICKED', 'REPLIED'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilter(status as any)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === status
                                    ? 'bg-emerald-500 text-black'
                                    : 'bg-[#111] border border-gray-800 text-gray-400 hover:border-gray-700'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>

                    {/* Alerts List */}
                    {filteredAlerts.length === 0 ? (
                        <div className="bg-[#111] border border-gray-800 rounded-lg p-12 text-center">
                            <Bell size={48} className="mx-auto mb-4 text-gray-700" />
                            <h3 className="text-xl font-semibold text-white mb-2">No alerts yet</h3>
                            <p className="text-gray-500 mb-6">
                                Alerts are automatically sent when response gaps are detected
                            </p>
                            <Link href="/monitoring" className="inline-block bg-emerald-500 hover:bg-emerald-600 text-black px-6 py-3 rounded-lg font-semibold">
                                View Monitoring
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredAlerts.map((alert) => {
                                const business = MOCK_BUSINESSES.find(b => b.id === alert.businessId);
                                const gap = MOCK_GAPS.find(g => g.id === alert.gapId);

                                return (
                                    <div key={alert.id} className="bg-[#111] border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <Mail size={18} className="text-emerald-500" />
                                                    <h3 className="text-lg font-semibold text-white">{business?.name || 'Unknown Business'}</h3>
                                                    <span className={`px-2 py-1 rounded text-xs font-medium ${alert.status === 'SENT' ? 'bg-blue-500/10 text-blue-400' :
                                                        alert.status === 'OPENED' ? 'bg-emerald-500/10 text-emerald-400' :
                                                            alert.status === 'CLICKED' ? 'bg-purple-500/10 text-purple-400' :
                                                                'bg-yellow-500/10 text-yellow-400'
                                                        }`}>
                                                        {alert.status}
                                                    </span>
                                                </div>
                                                <div className="text-sm text-gray-500 mb-3">
                                                    Gap: <span className="text-gray-400">{gap?.title || 'Unknown Gap'}</span>
                                                </div>
                                            </div>
                                            <div className="text-right text-sm">
                                                <div className="text-gray-500">Sent</div>
                                                <div className="text-white font-mono">{new Date(alert.sentAt).toLocaleDateString()}</div>
                                            </div>
                                        </div>

                                        {/* Alert Message Preview */}
                                        <div className="bg-gray-900/50 border border-gray-800 rounded p-4 mb-4">
                                            <div className="text-sm text-gray-400 leading-relaxed">
                                                {alert.content.substring(0, 200)}
                                                {alert.content.length > 200 && '...'}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-3">
                                            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                                                <ExternalLink size={14} />
                                                View Full Message
                                            </button>
                                            <button className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                                                <Send size={14} />
                                                Resend Alert
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Gaps Awaiting Alerts */}
                    <div className="mt-8 bg-[#111] border border-gray-800 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Gaps Awaiting Outreach</h3>
                        <div className="space-y-3">
                            {MOCK_GAPS.filter(g => g.status === 'OPEN' && !MOCK_ALERTS.some(a => a.gapId === g.id)).map((gap) => {
                                const business = MOCK_BUSINESSES.find(b => b.id === gap.businessId);
                                return (
                                    <div key={gap.id} className="flex items-center justify-between py-3 border-b border-gray-900 last:border-0">
                                        <div>
                                            <div className="text-white font-medium">{business?.name}</div>
                                            <div className="text-sm text-gray-500">{gap.title}</div>
                                        </div>
                                        <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-black rounded-lg text-sm font-semibold transition-colors">
                                            Send Alert
                                        </button>
                                    </div>
                                );
                            })}
                            {MOCK_GAPS.filter(g => g.status === 'OPEN' && !MOCK_ALERTS.some(a => a.gapId === g.id)).length === 0 && (
                                <p className="text-gray-500 text-center py-4">No pending gaps</p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
