import Link from 'next/link';
import { ShieldCheck, Users, Activity, Database, Settings as SettingsIcon } from 'lucide-react';

export default function AdminConsolePage() {
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
                <div className="grid grid-cols-4 gap-6 mb-8">
                    <div className="bg-[#111]/50 border border-gray-900 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <Users size={20} className="text-emerald-500" />
                            <span className="text-sm text-gray-500">Total Users</span>
                        </div>
                        <div className="text-3xl font-bold text-white">0</div>
                    </div>

                    <div className="bg-[#111]/50 border border-gray-900 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <Activity size={20} className="text-blue-500" />
                            <span className="text-sm text-gray-500">Active Subscriptions</span>
                        </div>
                        <div className="text-3xl font-bold text-white">0</div>
                    </div>

                    <div className="bg-[#111]/50 border border-gray-900 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <Database size={20} className="text-yellow-500" />
                            <span className="text gray-500">Total Businesses</span>
                        </div>
                        <div className="text-3xl font-bold text-white">12</div>
                    </div>

                    <div className="bg-[#111]/50 border border-gray-900 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-2">
                            <ShieldCheck size={20} className="text-purple-500" />
                            <span className="text-sm text-gray-500">Scans Today</span>
                        </div>
                        <div className="text-3xl font-bold text-white">24</div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-6">
                    <Link
                        href="/admin/system"
                        className="bg-[#111]/50 border border-gray-900 rounded-lg p-8 hover:border-emerald-500/50 transition-colors"
                    >
                        <SettingsIcon size={24} className="text-emerald-500 mb-3" />
                        <h3 className="text-xl font-semibold text-white mb-2">System Configuration</h3>
                        <p className="text-sm text-gray-400">Manage system mode, data, and debug tools</p>
                    </Link>

                    <div className="bg-[#111]/50 border border-gray-900 rounded-lg p-8">
                        <Database size={24} className="text-blue-500 mb-3" />
                        <h3 className="text-xl font-semibold text-white mb-2">Database Status</h3>
                        <p className="text-sm text-gray-400">Mock mode active • 12 businesses • 24 diagnostics</p>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="mt-8 bg-[#111]/50 border border-gray-900 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Recent System Activity</h3>
                    <div className="space-y-3 text-sm text-gray-400">
                        <div>No recent activity</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
