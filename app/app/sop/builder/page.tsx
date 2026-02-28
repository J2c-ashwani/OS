"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';
import RuleCard from '@/components/sop/RuleCard';
import { Search, Plus, Save, FileDown, Clock, Forward, Smile, ShieldCheck, ChevronRight } from 'lucide-react';

export default function RuleBuilderPage() {
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
                                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white text-sm font-bold hover:bg-white dark:hover:bg-slate-800 transition-all shadow-sm">
                                    <FileDown size={18} />
                                    Export
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:shadow-lg hover:shadow-primary/20 transition-all">
                                    <Plus size={18} />
                                    Add New Rule
                                </button>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="mt-8 border-b border-slate-200 dark:border-slate-800 flex gap-8">
                            <button className="border-b-[3px] border-primary text-primary pb-3 text-sm font-bold flex items-center gap-2">
                                Active Rules <span className="bg-primary/10 text-primary text-[10px] px-1.5 py-0.5 rounded-full">12</span>
                            </button>
                            <button className="border-b-[3px] border-transparent text-slate-500 dark:text-slate-400 pb-3 text-sm font-bold hover:text-slate-900 dark:hover:text-white transition-colors">
                                Drafts <span className="bg-slate-200 dark:bg-slate-500/20 text-slate-500 text-[10px] px-1.5 py-0.5 rounded-full">3</span>
                            </button>
                            <button className="border-b-[3px] border-transparent text-slate-500 dark:text-slate-400 pb-3 text-sm font-bold hover:text-slate-900 dark:hover:text-white transition-colors">
                                Archived
                            </button>
                        </div>
                    </div>

                    {/* Rule Cards Grid */}
                    <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
                        {/* Active Rule 1 */}
                        <RuleCard
                            title="Initial Response Time"
                            description="Ensures fast engagement with new customer inquiries."
                            icon={<Clock size={24} />}
                            condition={{ label: 'Wait Time', operator: '>', value: '15 mins' }}
                            defaultEnabled={true}
                            severityLevel="High"
                        />

                        {/* Active Rule 2 */}
                        <RuleCard
                            title="Post-Inquiry Follow-up"
                            description="Standardizes the 24h follow-up protocol for leads."
                            icon={<Forward size={24} />}
                            condition={{ label: 'Next Activity', operator: '>', value: '24 hours' }}
                            defaultEnabled={true}
                            severityLevel="Medium"
                        />

                        {/* New Template 1 */}
                        <RuleCard
                            isNew={true}
                            title="Add Customer Satisfaction SOP"
                            description="Detect negative sentiment or specific keywords in real-time interactions."
                            icon={<Smile size={24} />}
                            condition={{ label: '', operator: '', value: '' }}
                            defaultEnabled={false}
                            severityLevel="Low"
                        />

                        {/* New Template 2 */}
                        <RuleCard
                            isNew={true}
                            title="Add Compliance Check"
                            description="Monitor if agents mention mandatory legal disclosures during calls."
                            icon={<ShieldCheck size={24} />}
                            condition={{ label: '', operator: '', value: '' }}
                            defaultEnabled={false}
                            severityLevel="Low"
                        />

                    </div>

                    {/* Floating Save Reminder (Mobile) */}
                    <div className="xl:hidden fixed bottom-6 right-6 z-50">
                        <button className="flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-xl shadow-primary/30 hover:scale-110 transition-transform">
                            <Save size={24} />
                        </button>
                    </div>
                </main>
            </div>
        </DashboardLayout>
    );
}
