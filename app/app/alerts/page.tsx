'use client';

import { useState, useEffect } from 'react';
import { Bell, AlertTriangle, CheckCircle, Clock, X } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { EmptyAlerts } from '@/components/ui/EmptyState';

interface AlertData {
    id: string;
    type: string;
    channel: string;
    content: string;
    status: string;
    sentAt: string;
    businessId: string;
    severity?: string;
    title?: string;
    message?: string;
    timestamp?: string;
}

export default function AlertsPage() {
    const [filter, setFilter] = useState<'ALL' | 'CRITICAL' | 'WARNING' | 'INFO'>('ALL');
    const [alerts, setAlerts] = useState<AlertData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAlerts() {
            try {
                const res = await fetch('/api/alerts');
                if (res.ok) {
                    const data = await res.json();
                    setAlerts(data.alerts || []);
                }
            } catch (err) {
                console.error('Failed to fetch alerts:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchAlerts();
    }, []);

    // Map DB alert types to severity for display
    const enrichedAlerts = alerts.map(a => ({
        ...a,
        severity: a.type === 'GAP_FOUND' ? 'CRITICAL' : a.type === 'ALERT' ? 'WARNING' : 'INFO',
        title: a.content || 'System Alert',
        message: `Channel: ${a.channel} | Status: ${a.status}`,
        timestamp: a.sentAt,
    }));

    const filteredAlerts = enrichedAlerts.filter(alert =>
        filter === 'ALL' || alert.severity === filter
    );

    const criticalCount = enrichedAlerts.filter(a => a.severity === 'CRITICAL').length;
    const warningCount = enrichedAlerts.filter(a => a.severity === 'WARNING').length;

    if (loading) {
        return (
            <DashboardLayout>
                <div className="max-w-6xl mx-auto p-8">
                    <div className="animate-pulse space-y-4">
                        <div className="h-8 bg-gray-800 rounded w-32"></div>
                        <div className="h-4 bg-gray-800 rounded w-64"></div>
                        <div className="grid grid-cols-3 gap-4 mt-8">
                            <div className="h-24 bg-gray-800 rounded"></div>
                            <div className="h-24 bg-gray-800 rounded"></div>
                            <div className="h-24 bg-gray-800 rounded"></div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto p-8">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Alerts</h2>
                    <p className="text-gray-500">Real-time notifications for response gaps and issues</p>
                </div>

                {enrichedAlerts.length === 0 ? (
                    <EmptyAlerts />
                ) : (
                    <>
                        {/* Stats Overview */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                            <div className="bg-[#111] border border-gray-800 rounded-lg p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-gray-500 text-sm">Total</span>
                                    <Bell size={16} className="text-gray-500" />
                                </div>
                                <div className="text-3xl font-bold text-white">{enrichedAlerts.length}</div>
                            </div>
                            <div className="bg-[#111] border border-gray-800 rounded-lg p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-gray-500 text-sm">Critical</span>
                                    <AlertTriangle size={16} className="text-red-500" />
                                </div>
                                <div className="text-3xl font-bold text-red-500">{criticalCount}</div>
                            </div>
                            <div className="bg-[#111] border border-gray-800 rounded-lg p-6 col-span-2 md:col-span-1">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-gray-500 text-sm">Warnings</span>
                                    <Clock size={16} className="text-yellow-500" />
                                </div>
                                <div className="text-3xl font-bold text-yellow-500">{warningCount}</div>
                            </div>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            <button
                                onClick={() => setFilter('ALL')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'ALL'
                                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                    }`}
                            >
                                All ({enrichedAlerts.length})
                            </button>
                            <button
                                onClick={() => setFilter('CRITICAL')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'CRITICAL'
                                    ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                    }`}
                            >
                                Critical ({criticalCount})
                            </button>
                            <button
                                onClick={() => setFilter('WARNING')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'WARNING'
                                    ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                    }`}
                            >
                                Warnings ({warningCount})
                            </button>
                            <button
                                onClick={() => setFilter('INFO')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'INFO'
                                    ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                    }`}
                            >
                                Info ({enrichedAlerts.filter(a => a.severity === 'INFO').length})
                            </button>
                        </div>

                        {/* Alerts List */}
                        {filteredAlerts.length === 0 ? (
                            <div className="bg-[#111] border border-gray-800 rounded-lg p-12 text-center">
                                <CheckCircle size={48} className="mx-auto mb-4 text-emerald-500" />
                                <h3 className="text-xl font-semibold text-white mb-2">No {filter.toLowerCase()} alerts</h3>
                                <p className="text-gray-500">All clear for this severity level!</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {filteredAlerts.map((alert) => (
                                    <div
                                        key={alert.id}
                                        className={`bg-[#111] border rounded-lg p-6 hover:border-gray-700 transition-colors ${alert.severity === 'CRITICAL' ? 'border-red-900/40' :
                                            alert.severity === 'WARNING' ? 'border-yellow-900/40' :
                                                'border-gray-800'
                                            }`}
                                    >
                                        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                                            <div className="flex items-start gap-4 w-full sm:w-auto">
                                                {/* Severity Icon */}
                                                <div className={`p-2 rounded-lg shrink-0 ${alert.severity === 'CRITICAL' ? 'bg-red-500/10' :
                                                    alert.severity === 'WARNING' ? 'bg-yellow-500/10' :
                                                        'bg-blue-500/10'
                                                    }`}>
                                                    {alert.severity === 'CRITICAL' ? (
                                                        <AlertTriangle size={20} className="text-red-500" />
                                                    ) : alert.severity === 'WARNING' ? (
                                                        <Clock size={20} className="text-yellow-500" />
                                                    ) : (
                                                        <Bell size={20} className="text-blue-500" />
                                                    )}
                                                </div>

                                                {/* Alert Details */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                        <h3 className="text-lg font-semibold text-white">{alert.title}</h3>
                                                        <span className={`px-2 py-1 rounded text-xs font-medium ${alert.severity === 'CRITICAL' ? 'bg-red-500/10 text-red-400' :
                                                            alert.severity === 'WARNING' ? 'bg-yellow-500/10 text-yellow-400' :
                                                                'bg-blue-500/10 text-blue-400'
                                                            }`}>
                                                            {alert.severity}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-400 text-sm mb-3">{alert.message}</p>
                                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs text-gray-500">
                                                        <span>Business: <span className="text-gray-400">{alert.businessId}</span></span>
                                                        <span className="hidden sm:inline">•</span>
                                                        <span className="font-mono">{new Date(alert.timestamp!).toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </DashboardLayout>
    );
}
