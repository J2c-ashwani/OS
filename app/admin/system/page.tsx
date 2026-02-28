'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Settings, Database, RefreshCw, Trash2, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { SYSTEM_MODE } from '@/lib/data/store';

export default function AdminSystemPage() {
    const { toast } = useToast();
    const [mode, setMode] = useState<string>(SYSTEM_MODE);
    const [clearing, setClearing] = useState(false);

    const handleModeChange = (newMode: string) => {
        setMode(newMode);
        toast(`System mode changed to ${newMode}`);
    };

    const handleClearData = async () => {
        if (!confirm('Are you sure you want to clear all diagnostic data? This action cannot be undone.')) return;
        setClearing(true);
        try {
            const res = await fetch('/api/admin/clear-data', { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                toast('All diagnostic data cleared');
            } else {
                toast('Failed to clear data', 'error');
            }
        } catch {
            toast('Failed to clear data', 'error');
        } finally {
            setClearing(false);
        }
    };

    const handleResetSettings = () => {
        if (!confirm('Reset all configuration to factory defaults?')) return;
        setMode('MOCK');
        toast('Settings reset to defaults');
    };

    const handleResetMockData = () => {
        toast('Mock data reloaded');
    };

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
                    {/* System Mode */}
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
                                    value={mode}
                                    onChange={(e) => handleModeChange(e.target.value)}
                                >
                                    <option value="MOCK">Mock Mode</option>
                                    <option value="LIVE">Live Mode</option>
                                </select>
                            </div>
                            <div className={`${mode === 'LIVE' ? 'bg-emerald-900/20 border-emerald-900/40' : 'bg-yellow-900/20 border-yellow-900/40'} border rounded p-4`}>
                                <div className="flex items-center gap-2">
                                    {mode === 'LIVE' ? (
                                        <CheckCircle2 size={16} className="text-emerald-500" />
                                    ) : (
                                        <XCircle size={16} className="text-yellow-500" />
                                    )}
                                    <p className={`text-sm ${mode === 'LIVE' ? 'text-emerald-200' : 'text-yellow-200'}`}>
                                        <strong>Current:</strong> {mode} - {mode === 'LIVE' ? 'Using live data sources' : 'Using simulated data'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Danger Zone */}
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
                                <button
                                    onClick={handleClearData}
                                    disabled={clearing}
                                    className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
                                >
                                    {clearing && <Loader2 size={14} className="animate-spin" />}
                                    Clear Data
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-white">Reset to Default Settings</div>
                                    <div className="text-sm text-gray-500">Restore all configuration to factory defaults</div>
                                </div>
                                <button
                                    onClick={handleResetSettings}
                                    className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Reset Settings
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-white">Reset Mock Data</div>
                                    <div className="text-sm text-gray-500">Reload default mock businesses and diagnostics</div>
                                </div>
                                <button
                                    onClick={handleResetMockData}
                                    className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 rounded-lg text-sm font-medium transition-colors"
                                >
                                    <RefreshCw size={16} className="inline mr-2" />
                                    Reset Mock Data
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Environment Info */}
                    <div className="bg-[#111]/50 border border-gray-900 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Settings size={20} className="text-purple-500" />
                            <h3 className="text-lg font-semibold text-white">Environment</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <div className="text-gray-500">Mode</div>
                                <div className="font-mono text-white">{mode}</div>
                            </div>
                            <div>
                                <div className="text-gray-500">Environment</div>
                                <div className="font-mono text-white">development</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
