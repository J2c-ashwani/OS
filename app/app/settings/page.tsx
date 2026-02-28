'use client';

import '../../globals.css';
import { useState } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import { SYSTEM_MODE } from '@/lib/data/store';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useToast } from '@/components/ui/Toast';

export default function SettingsPage() {
    const { toast } = useToast();
    const [systemMode, setSystemMode] = useState(SYSTEM_MODE);
    const [monitoringInterval, setMonitoringInterval] = useState(60); // minutes
    const [alertsEnabled, setAlertsEnabled] = useState(true);
    const [autoRetry, setAutoRetry] = useState(true);
    const [maxRetries, setMaxRetries] = useState(3);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        toast('Settings saved successfully');
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <DashboardLayout>
            <div className="max-w-4xl mx-auto p-8">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Account Settings</h2>
                    <p className="text-gray-500">Configure your monitoring preferences and payment details</p>
                </div>

                {/* Save Button */}
                <div className="mb-6 flex justify-end">
                    <button
                        onClick={handleSave}
                        className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all ${saved
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-emerald-500 hover:bg-emerald-600 text-black'
                            }`}
                    >
                        {saved ? (
                            <>
                                <RefreshCw size={18} className="animate-spin" />
                                Saved!
                            </>
                        ) : (
                            <>
                                <Save size={18} />
                                Save Changes
                            </>
                        )}
                    </button>
                </div>

                {/* Settings Sections */}
                <div className="space-y-6">

                    {/* Monitoring Configuration */}
                    <div className="bg-[#111] border border-gray-800 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Monitoring Configuration</h3>
                        <div className="space-y-6">
                            <div>
                                <label className="block font-medium text-white mb-2">
                                    Monitoring Interval (minutes)
                                </label>
                                <input
                                    type="number"
                                    min="15"
                                    max="1440"
                                    value={monitoringInterval}
                                    onChange={(e) => setMonitoringInterval(parseInt(e.target.value))}
                                    className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-emerald-500 focus:outline-none"
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    How often to check each monitored business (15-1440 minutes)
                                </p>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-white">Auto-Retry Failed Checks</div>
                                    <div className="text-sm text-gray-500">Automatically retry failed diagnostic checks</div>
                                </div>
                                <button
                                    onClick={() => setAutoRetry(!autoRetry)}
                                    className={`relative w-12 h-6 rounded-full transition-colors ${autoRetry ? 'bg-emerald-500' : 'bg-gray-700'
                                        }`}
                                >
                                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${autoRetry ? 'translate-x-6' : ''
                                        }`} />
                                </button>
                            </div>

                            {autoRetry && (
                                <div>
                                    <label className="block font-medium text-white mb-2">
                                        Max Retries
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="5"
                                        value={maxRetries}
                                        onChange={(e) => setMaxRetries(parseInt(e.target.value))}
                                        className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-emerald-500 focus:outline-none"
                                    />
                                    <p className="text-sm text-gray-500 mt-1">
                                        Number of retry attempts before marking as failed (1-5)
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Alert Configuration */}
                    <div className="bg-[#111] border border-gray-800 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Alert Configuration</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-medium text-white">Enable Automatic Alerts</div>
                                    <div className="text-sm text-gray-500">Send alerts when gaps are detected</div>
                                </div>
                                <button
                                    onClick={() => setAlertsEnabled(!alertsEnabled)}
                                    className={`relative w-12 h-6 rounded-full transition-colors ${alertsEnabled ? 'bg-emerald-500' : 'bg-gray-700'
                                        }`}
                                >
                                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${alertsEnabled ? 'translate-x-6' : ''
                                        }`} />
                                </button>
                            </div>

                            {alertsEnabled && (
                                <div className="bg-blue-900/20 border border-blue-900/40 rounded p-4">
                                    <p className="text-sm text-blue-200">
                                        Alerts will be sent via email to business owners when response gaps are detected
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* PayPal Integration */}
                    <div className="bg-[#111] border border-gray-800 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Payment Integration</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block font-medium text-white mb-2">
                                    PayPal Client ID
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter PayPal Client ID"
                                    className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white placeholder-gray-600 focus:border-emerald-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-white mb-2">
                                    Subscription Price (USD)
                                </label>
                                <input
                                    type="number"
                                    defaultValue="99"
                                    className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white focus:border-emerald-500 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    );
}
