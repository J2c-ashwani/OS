import Link from 'next/link';
import { Settings, Database, RefreshCw, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import { getSystemHealthAction } from '@/app/actions/admin';

export default async function AdminSystemPage() {
    // Fetch real system health data
    const healthResult = await getSystemHealthAction();
    const health = healthResult.success ? healthResult.data : null;

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0B0E13] to-[#0A0A0A] text-gray-200">
            <div className="container mx-auto px-6 py-16 max-w-4xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">System Configuration</h1>
                    <p className="text-gray-400">Developer and operator-only settings</p>
                    <Link href="/admin/console" className="text-sm text-emerald-500 hover:text-emerald-400 mt-2 inline-block">
                        ← Back to Console
                    </Link>
                </div>

                <div className="space-y-6">
                    {/* System Mode - OPERATOR ONLY */}
                    <div className="bg-[#111]/50 border border-gray-900 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Settings size={20} className="text-emerald-500" />
                            <h3 className="text-lg font-semibold text-white">System Mode</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-white">Operating Mode</div>
                                    <div className="text-sm text-gray-500">Switch between mock data and live operations</div>
                                </div>
                                <select
                                    className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-emerald-500 focus:outline-none"
                                    defaultValue={health?.mode || 'MOCK'}
                                >
                                    <option value="MOCK">Mock Mode</option>
                                    <option value="LIVE">Live Mode</option>
                                </select>
                            </div>
                            <div className={`${health?.mode === 'LIVE' ? 'bg-emerald-900/20 border-emerald-900/40' : 'bg-yellow-900/20 border-yellow-900/40'} border rounded p-4`}>
                                <div className="flex items-center gap-2">
                                    {health?.mode === 'LIVE' ? (
                                        <CheckCircle2 size={16} className="text-emerald-500" />
                                    ) : (
                                        <XCircle size={16} className="text-yellow-500" />
                                    )}
                                    <p className={`text-sm ${health?.mode === 'LIVE' ? 'text-emerald-200' : 'text-yellow-200'}`}>
                                        <strong>Current:</strong> {health?.mode || 'UNKNOWN'} - {health?.mode === 'LIVE' ? 'Using live data sources' : 'Using simulated data'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Danger Zone - OPERATOR ONLY */}
                    <div className="bg-red-900/10 border border-red-900/40 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Trash2 size={20} className="text-red-400" />
                            <h3 className="text-lg font-semibold text-red-400">Danger Zone</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-white">Clear All Diagnostic Data</div>
                                    <div className="text-sm text-gray-500">Remove all stored diagnostic logs and gaps</div>
                                </div>
                                <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 rounded-lg text-sm font-medium transition-colors">
                                    Clear Data
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-white">Reset to Default Settings</div>
                                    <div className="text-sm text-gray-500">Restore all configuration to factory defaults</div>
                                </div>
                                <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 rounded-lg text-sm font-medium transition-colors">
                                    Reset Settings
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-white">Reset Mock Data</div>
                                    <div className="text-sm text-gray-500">Reload default mock businesses and diagnostics</div>
                                </div>
                                <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 rounded-lg text-sm font-medium transition-colors">
                                    <RefreshCw size={16} className="inline mr-2" />
                                    Reset Mock Data
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Database Info */}
                    {health && (
                        <div className="bg-[#111]/50 border border-gray-900 rounded-lg p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Database size={20} className="text-blue-500" />
                                <h3 className="text-lg font-semibold text-white">Database Status</h3>
                            </div>
                            <div className="grid grid-cols-4 gap-4 text-sm">
                                <div>
                                    <div className="text-gray-500">Businesses</div>
                                    <div className="text-2xl font-bold text-white">{health.businessesCount}</div>
                                </div>
                                <div>
                                    <div className="text-gray-500">Diagnostics</div>
                                    <div className="text-2xl font-bold text-white">{health.diagnosticsCount}</div>
                                </div>
                                <div>
                                    <div className="text-gray-500">Gaps</div>
                                    <div className="text-2xl font-bold text-white">{health.gapsCount}</div>
                                </div>
                                <div>
                                    <div className="text-gray-500">Alerts</div>
                                    <div className="text-2xl font-bold text-white">{health.alertsCount}</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Environment Info */}
                    <div className="bg-[#111]/50 border border-gray-900 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Settings size={20} className="text-purple-500" />
                            <h3 className="text-lg font-semibold text-white">Environment</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <div className="text-gray-500">Node.js Version</div>
                                <div className="font-mono text-white">{process.version}</div>
                            </div>
                            <div>
                                <div className="text-gray-500">Environment</div>
                                <div className="font-mono text-white">{process.env.NODE_ENV || 'development'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
