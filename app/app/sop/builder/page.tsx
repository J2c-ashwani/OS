"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';
import RuleCard from '@/components/sop/RuleCard';
import { Search, Plus, Save, FileDown, Clock, Forward, Smile, ShieldCheck, ChevronRight } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function RuleBuilderPage() {
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState<'active' | 'drafts' | 'archived'>('active');

    const handleExport = () => {
        const rules = [
            { title: 'Initial Response Time', condition: 'Wait Time > 15 mins', severity: 'High', enabled: true },
            { title: 'Post-Inquiry Follow-up', condition: 'Next Activity > 24 hours', severity: 'Medium', enabled: true },
        ];
        const blob = new Blob([JSON.stringify(rules, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sop-rules-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        toast('Rules exported as JSON');
    };

    const handleAddRule = () => {
        toast('Rule builder coming in next update', 'info');
    };

    const handleSave = () => {
        toast('All rules saved successfully');
    };

    return (
        <DashboardLayout>
            <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 overflow-y-auto">
                <main className="flex-1 flex flex-col min-w-0">

                    {/* Header */}
                    <div className="p-6 md:p-10 pb-0">
                        <nav className="flex items-center gap-2 mb-4">
                            <Link href="/app/settings" className="text-slate-500 dark:text-slate-400 text-xs font-medium hover:text-primary">Settings</Link>
                            <ChevronRight size={12} className="text-slate-400" />
                            <span className="text-slate-900 dark:text-white text-xs font-semibold">SOP Rule Builder</span>
                        </nav>
                        <div className="flex flex-wrap justify-between items-end gap-4">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight">SOP Rule Builder</h1>
                                <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl">Define and manage business standards for AI monitoring. Rules allow the Agentic AI to automatically flag deviations in real-time.</p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleExport}
                                    className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white text-sm font-bold hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm"
                                >
                                    <FileDown size={18} />
                                    Export
                                </button>
                                <button
                                    onClick={handleAddRule}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:shadow-lg hover:shadow-primary/20 transition-all"
                                >
                                    <Plus size={18} />
                                    Add New Rule
                                </button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="mt-8 border-b border-slate-200 dark:border-slate-800 flex gap-8">
                            <button
                                onClick={() => setActiveTab('active')}
                                className={`border-b-[3px] pb-3 text-sm font-bold flex items-center gap-2 ${activeTab === 'active' ? 'border-primary text-primary' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'} transition-colors`}
                            >
                                Active Rules <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === 'active' ? 'bg-primary/10 text-primary' : 'bg-slate-200 dark:bg-slate-500/20 text-slate-500'}`}>12</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('drafts')}
                                className={`border-b-[3px] pb-3 text-sm font-bold ${activeTab === 'drafts' ? 'border-primary text-primary' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'} transition-colors`}
                            >
                                Drafts <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === 'drafts' ? 'bg-primary/10 text-primary' : 'bg-slate-200 dark:bg-slate-500/20 text-slate-500'}`}>3</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('archived')}
                                className={`border-b-[3px] pb-3 text-sm font-bold ${activeTab === 'archived' ? 'border-primary text-primary' : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'} transition-colors`}
                            >
                                Archived
                            </button>
                        </div>
                    </div>

                    {/* Rule Cards Grid */}
                    {activeTab === 'active' && (
                        <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
                            <RuleCard title="Initial Response Time" description="Ensures fast engagement with new customer inquiries." icon={<Clock size={24} />} condition={{ label: 'Wait Time', operator: '>', value: '15 mins' }} defaultEnabled={true} severityLevel="High" />
                            <RuleCard title="Post-Inquiry Follow-up" description="Standardizes the 24h follow-up protocol for leads." icon={<Forward size={24} />} condition={{ label: 'Next Activity', operator: '>', value: '24 hours' }} defaultEnabled={true} severityLevel="Medium" />
                            <RuleCard isNew={true} title="Add Customer Satisfaction SOP" description="Detect negative sentiment or specific keywords in real-time interactions." icon={<Smile size={24} />} condition={{ label: '', operator: '', value: '' }} defaultEnabled={false} severityLevel="Low" />
                            <RuleCard isNew={true} title="Add Compliance Check" description="Monitor if agents mention mandatory legal disclosures during calls." icon={<ShieldCheck size={24} />} condition={{ label: '', operator: '', value: '' }} defaultEnabled={false} severityLevel="Low" />
                        </div>
                    )}
                    {activeTab === 'drafts' && (
                        <div className="p-6 md:p-10 flex items-center justify-center min-h-[200px]">
                            <p className="text-slate-500 text-sm">No draft rules yet. Click "Add New Rule" to create one.</p>
                        </div>
                    )}
                    {activeTab === 'archived' && (
                        <div className="p-6 md:p-10 flex items-center justify-center min-h-[200px]">
                            <p className="text-slate-500 text-sm">No archived rules.</p>
                        </div>
                    )}

                    {/* Floating Save (Mobile) */}
                    <div className="xl:hidden fixed bottom-6 right-6 z-50">
                        <button
                            onClick={handleSave}
                            className="flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-xl shadow-primary/30 hover:scale-110 transition-transform"
                        >
                            <Save size={24} />
                        </button>
                    </div>
                </main>
            </div>
        </DashboardLayout>
    );
}
