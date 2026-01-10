"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ComplianceSparkline from '@/components/sop/ComplianceSparkline';
import ViolationTable from '@/components/sop/ViolationTable';
import { Download, TrendingDown } from 'lucide-react';
import PaywallGuard from '@/components/subscription/PaywallGuard';

export default function SOPEnforcementPage() {
    return (
        <DashboardLayout>
            <PaywallGuard feature="funnel"> {/* Reusing funnel tier for these advanced features */}
                <div className="flex-1 flex flex-col h-full bg-slate-950">
                    {/* Header */}
                    <header className="p-8 pb-4">
                        <div className="flex flex-wrap justify-between items-start gap-4">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-white text-4xl font-black tracking-tight">SOP Enforcement & Audit</h2>
                                <p className="text-slate-400 text-base max-w-2xl">Real-time monitoring and automated compliance logging for Agentic AI standard operating procedures.</p>
                            </div>
                            <div className="flex gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold rounded-lg transition-colors">
                                    <Download size={16} />
                                    Export Audit Log
                                </button>
                            </div>
                        </div>
                    </header>

                    {/* Compliance Score Section */}
                    <section className="px-8 py-4">
                        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-6 flex flex-wrap lg:flex-nowrap gap-8 items-center">
                            <div className="flex flex-col gap-2 min-w-[200px]">
                                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Compliance Score</p>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-white text-5xl font-black">78%</span>
                                    <div className="flex items-center text-red-400 text-sm font-bold gap-1">
                                        <TrendingDown size={16} />
                                        2.4%
                                    </div>
                                </div>
                                <p className="text-slate-500 text-xs">Based on last 1,240 automated cycles</p>
                            </div>
                            <ComplianceSparkline />
                        </div>
                    </section>

                    {/* Violations Filter & Table */}
                    <section className="px-8 py-4 flex-1 flex flex-col pb-8">
                        <ViolationTable />
                    </section>
                </div>
            </PaywallGuard>
        </DashboardLayout>
    );
}
