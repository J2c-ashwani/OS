'use client';

import '../../globals.css';
import { useState } from 'react';
import { Save, RefreshCw, User, Users, CreditCard, Activity, Bell } from 'lucide-react';
import { SYSTEM_MODE } from '@/lib/data/store';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useToast } from '@/components/ui/Toast';

export default function SettingsPage() {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState('profile');

    const [systemMode, setSystemMode] = useState(SYSTEM_MODE);
    const [monitoringInterval, setMonitoringInterval] = useState(60);
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
            <div className="max-w-5xl mx-auto p-4 md:p-8">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Account Settings</h2>
                    <p className="text-gray-500">Manage your profile, team members, billing, and monitoring preferences</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Tabs */}
                    <div className="w-full md:w-64 space-y-1 shrink-0">
                        <TabButton
                            active={activeTab === 'profile'}
                            onClick={() => setActiveTab('profile')}
                            icon={<User size={18} />}
                            label="Profile"
                        />
                        <TabButton
                            active={activeTab === 'team'}
                            onClick={() => setActiveTab('team')}
                            icon={<Users size={18} />}
                            label="Team Members"
                        />
                        <TabButton
                            active={activeTab === 'billing'}
                            onClick={() => setActiveTab('billing')}
                            icon={<CreditCard size={18} />}
                            label="Billing & Plans"
                        />
                        <TabButton
                            active={activeTab === 'monitoring'}
                            onClick={() => setActiveTab('monitoring')}
                            icon={<Activity size={18} />}
                            label="Monitoring config"
                        />
                        <TabButton
                            active={activeTab === 'alerts'}
                            onClick={() => setActiveTab('alerts')}
                            icon={<Bell size={18} />}
                            label="Alerts"
                        />
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 space-y-6">
                        {activeTab === 'profile' && (
                            <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-white mb-6">Profile Settings</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                                        <input type="text" defaultValue="QA Tester" className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                                        <input type="email" defaultValue="testqa@example.com" disabled className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-gray-500 cursor-not-allowed" />
                                        <p className="text-xs text-gray-500 mt-1">Email address cannot be changed here. Contact support.</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Role</label>
                                        <input type="text" defaultValue="Administrator" disabled className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-gray-500 cursor-not-allowed" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'team' && (
                            <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-white mb-6">Team Members</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg border border-gray-800">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold">QT</div>
                                            <div>
                                                <p className="font-semibold text-white">QA Tester</p>
                                                <p className="text-sm text-gray-500">testqa@example.com</p>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-semibold">Owner</span>
                                    </div>
                                    <button className="w-full py-3 border border-dashed border-gray-700 text-gray-400 rounded-lg hover:text-white hover:border-gray-500 transition-colors">
                                        + Invite Team Member
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'billing' && (
                            <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-white mb-6">Billing & Plans</h3>
                                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg mb-6 flex justify-between items-center">
                                    <div>
                                        <h4 className="font-bold text-emerald-400 mb-1">Current Plan: Enterprise</h4>
                                        <p className="text-sm text-gray-400">Unlimited audits and monitoring.</p>
                                    </div>
                                    <span className="text-2xl font-black text-white">$499<span className="text-sm font-normal text-gray-500">/mo</span></span>
                                </div>

                                <h4 className="font-semibold text-white mb-4 mt-8">Payment Integration</h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">PayPal Client ID</label>
                                        <input type="text" placeholder="Enter PayPal Client ID" className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'monitoring' && (
                            <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-white mb-6">Monitoring Configuration</h3>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-1">Monitoring Interval (minutes)</label>
                                        <input type="number" min="15" max="1440" value={monitoringInterval} onChange={(e) => setMonitoringInterval(parseInt(e.target.value))} className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none" />
                                        <p className="text-xs text-gray-500 mt-2">How often to check each monitored business (15-1440 minutes)</p>
                                    </div>

                                    <div className="flex items-center justify-between py-4 border-t border-gray-800">
                                        <div>
                                            <div className="font-medium text-white">Auto-Retry Failed Checks</div>
                                            <div className="text-sm text-gray-500">Automatically retry failed diagnostic checks</div>
                                        </div>
                                        <button onClick={() => setAutoRetry(!autoRetry)} className={`relative w-12 h-6 rounded-full transition-colors ${autoRetry ? 'bg-emerald-500' : 'bg-gray-700'}`}>
                                            <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${autoRetry ? 'translate-x-6' : ''}`} />
                                        </button>
                                    </div>

                                    {autoRetry && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400 mb-1">Max Retries</label>
                                            <input type="number" min="1" max="5" value={maxRetries} onChange={(e) => setMaxRetries(parseInt(e.target.value))} className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:outline-none" />
                                            <p className="text-xs text-gray-500 mt-2">Number of retry attempts before marking as failed (1-5)</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'alerts' && (
                            <div className="bg-[#111] border border-gray-800 rounded-xl p-6">
                                <h3 className="text-xl font-bold text-white mb-6">Alert Configuration</h3>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                                        <div>
                                            <div className="font-medium text-white">Enable Automatic Alerts</div>
                                            <div className="text-sm text-gray-500">Send alerts when gaps are detected</div>
                                        </div>
                                        <button onClick={() => setAlertsEnabled(!alertsEnabled)} className={`relative w-12 h-6 rounded-full transition-colors ${alertsEnabled ? 'bg-emerald-500' : 'bg-gray-700'}`}>
                                            <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${alertsEnabled ? 'translate-x-6' : ''}`} />
                                        </button>
                                    </div>

                                    {alertsEnabled && (
                                        <div className="bg-blue-900/20 border border-blue-900/50 rounded-lg p-5">
                                            <p className="text-sm text-blue-200">
                                                Alerts will be sent via email to business owners when response gaps are detected.
                                            </p>
                                        </div>
                                    )}

                                    <h4 className="font-semibold text-white mb-4 mt-6">Notification Channels</h4>

                                    <div className="space-y-4 mt-2">
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-gray-900" />
                                            <div>
                                                <p className="text-sm font-medium text-white">Email Address</p>
                                                <p className="text-xs text-gray-500">testqa@example.com</p>
                                            </div>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input type="checkbox" className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-gray-900" />
                                            <div>
                                                <p className="text-sm font-medium text-white">Slack / Discord Webhook</p>
                                                <p className="text-xs text-gray-500">Send alerts to a specified channel</p>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Save Button explicitly positioned at the bottom of whichever form is active */}
                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={handleSave}
                                className={`px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg ${saved
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                    : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/20 hover:scale-105'
                                    }`}
                            >
                                {saved ? (
                                    <>
                                        <RefreshCw size={20} className="animate-spin" />
                                        Saved!
                                    </>
                                ) : (
                                    <>
                                        <Save size={20} />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all text-left
                ${active
                    ? 'bg-[#111] text-emerald-400 border border-gray-800 shadow-sm'
                    : 'text-gray-400 hover:bg-[#111]/50 hover:text-gray-200 border border-transparent'
                }`}
        >
            {icon}
            {label}
        </button>
    );
}
