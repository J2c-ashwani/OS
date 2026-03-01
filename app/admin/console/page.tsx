import Link from 'next/link';
import { ShieldCheck, Users, Activity, Database, Settings as SettingsIcon, AlertCircle, UserCog } from 'lucide-react';
import { getAdminStatsAction, getRecentActivityAction } from '@/app/actions/admin';

export const dynamic = 'force-dynamic';

export default async function AdminConsolePage() {
    // Fetch real data
    const statsResult = await getAdminStatsAction();
    const activityResult = await getRecentActivityAction();

    const stats = statsResult.success ? statsResult.data : null;
    const activity = activityResult.success ? activityResult.data : [];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0B0E13] to-[#0A0A0A] text-gray-200">
            <div className="container mx-auto px-6 py-16">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Console</h1>
                    <p className="text-gray-400">System overview and operator tools</p>
                    <Link href="/app/dashboard" className="text-sm text-emerald-500 hover:text-emerald-400 mt-2 inline-block">
                        ← Back to Customer Dashboard
                    </Link>
                </div>

                {/* System Stats */}
                {stats ? (
                    <div className="grid grid-cols-4 gap-6 mb-8">
                        <div className="bg-[#111]/50 border border-gray-900 rounded-lg p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <Users size={20} className="text-emerald-500" />
                                <span className="text-sm text-gray-500">Total Users</span>
                            </div>
                            <div className="text-3xl font-bold text-white">{stats.totalUsers}</div>
                        </div>

                        <div className="bg-[#111]/50 border border-gray-900 rounded-lg p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <Activity size={20} className="text-blue-500" />
                                <span className="text-sm text-gray-500">Active Subscriptions</span>
                            </div>
                            <div className="text-3xl font-bold text-white">{stats.activeSubscriptions}</div>
                        </div>

                        <div className="bg-[#111]/50 border border-gray-900 rounded-lg p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <Database size={20} className="text-yellow-500" />
                                <span className="text-sm text-gray-500">Total Businesses</span>
                            </div>
                            <div className="text-3xl font-bold text-white">{stats.totalBusinesses}</div>
                        </div>

                        <div className="bg-[#111]/50 border border-gray-900 rounded-lg p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <ShieldCheck size={20} className="text-purple-500" />
                                <span className="text-sm text-gray-500">Scans Today</span>
                            </div>
                            <div className="text-3xl font-bold text-white">{stats.scansToday}</div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-red-900/20 border border-red-900/40 rounded-lg p-6 mb-8">
                        <div className="flex items-center gap-3 text-red-400">
                            <AlertCircle size={20} />
                            <span>Failed to load system stats</span>
                        </div>
                    </div>
                )}

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link
                        href="/admin/system"
                        className="bg-[#111]/50 border border-gray-900 rounded-lg p-8 hover:border-emerald-500/50 transition-colors"
                    >
                        <SettingsIcon size={24} className="text-emerald-500 mb-3" />
                        <h3 className="text-xl font-semibold text-white mb-2">System Configuration</h3>
                        <p className="text-sm text-gray-400">Manage system mode, data, and debug tools</p>
                    </Link>

                    <Link
                        href="/admin/users"
                        className="bg-[#111]/50 border border-gray-900 rounded-lg p-8 hover:border-blue-500/50 transition-colors"
                    >
                        <UserCog size={24} className="text-blue-500 mb-3" />
                        <h3 className="text-xl font-semibold text-white mb-2">User Management</h3>
                        <p className="text-sm text-gray-400">Manage users, assign admin roles, view accounts</p>
                    </Link>

                    <div className="bg-[#111]/50 border border-gray-900 rounded-lg p-8">
                        <Database size={24} className="text-yellow-500 mb-3" />
                        <h3 className="text-xl font-semibold text-white mb-2">Database Status</h3>
                        <p className="text-sm text-gray-400">
                            {stats ? `${stats.totalBusinesses} businesses • ${stats.scansToday} scans today` : 'Loading...'}
                        </p>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="mt-8 bg-[#111]/50 border border-gray-900 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Recent System Activity</h3>
                    <div className="space-y-3">
                        {activity && activity.length > 0 ? (
                            activity.map((event) => (
                                <div key={event.id} className="flex items-start gap-3 text-sm border-b border-gray-900 pb-3 last:border-0">
                                    <div className="mt-0.5">
                                        {event.type === 'DIAGNOSTIC' && <ShieldCheck size={16} className="text-emerald-500" />}
                                        {event.type === 'GAP' && <AlertCircle size={16} className="text-red-500" />}
                                        {event.type === 'ALERT' && <Activity size={16} className="text-yellow-500" />}
                                        {event.type === 'SUBSCRIPTION' && <Users size={16} className="text-blue-500" />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-gray-300">{event.description}</div>
                                        <div className="text-xs text-gray-600 mt-1">
                                            {new Date(event.timestamp).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-400 text-sm">No recent activity</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
