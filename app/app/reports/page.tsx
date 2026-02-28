'use client';

import React from 'react';
import Link from 'next/link';
import { Share, FileText, Bell } from 'lucide-react';
import RevenueRecoveryHero from '@/components/reports/RevenueRecoveryHero';
import PerformancePillars from '@/components/reports/PerformancePillars';
import DiagnosticSummaryTable from '@/components/reports/DiagnosticSummaryTable';
import PaywallGuard from '@/components/subscription/PaywallGuard';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useToast } from '@/components/ui/Toast';

export default function ReportsPage() {
    const { toast } = useToast();

    const handleExportPDF = () => {
        window.print();
    };

    const handleShareReport = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast('Report link copied to clipboard!');
        } catch {
            toast('Failed to copy link', 'error');
        }
    };

    return (
        <DashboardLayout>
            <PaywallGuard feature="funnel">
                <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-950 overflow-y-auto">
                    {/* Top Navigation Bar */}
                    <div className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 lg:px-20 py-3 print:hidden">
                        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
                            <div className="flex items-center gap-4 text-slate-900 dark:text-white">
                                <h2 className="text-lg font-bold leading-tight tracking-tight">Response Audit</h2>
                            </div>
                            <div className="flex flex-1 justify-end gap-6 items-center">
                                <nav className="hidden md:flex items-center gap-8">
                                    <Link href="/app/dashboard" className="text-sm font-medium hover:text-primary transition-colors text-slate-500">Dashboard</Link>
                                    <span className="text-sm font-bold text-primary border-b-2 border-primary py-1 cursor-pointer">Reports</span>
                                    <Link href="/app/settings" className="text-sm font-medium hover:text-primary transition-colors text-slate-500">Settings</Link>
                                </nav>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleExportPDF}
                                        className="flex min-w-[100px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold shadow-sm hover:bg-primary/90 transition-all"
                                    >
                                        <FileText size={18} className="mr-2" />
                                        <span>Export PDF</span>
                                    </button>
                                    <Link href="/app/alerts" className="flex items-center justify-center rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                                        <Bell size={18} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <main className="max-w-[1200px] mx-auto px-6 lg:px-20 py-10 w-full">
                        {/* Page Heading */}
                        <div className="flex flex-wrap justify-between items-end gap-6 mb-10">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-slate-900 dark:text-white text-4xl lg:text-5xl font-black tracking-tight leading-tight">Monthly Executive Summary</h1>
                                <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">Performance Period: {new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })} | Client: SMB Core Distribution</p>
                            </div>
                            <button
                                onClick={handleShareReport}
                                className="flex items-center gap-2 px-6 py-2.5 rounded-lg border-2 border-slate-300 dark:border-slate-700 font-bold text-sm hover:bg-white dark:hover:bg-slate-800 transition-all text-slate-700 dark:text-slate-200"
                            >
                                <Share size={18} />
                                Share Report
                            </button>
                        </div>

                        <RevenueRecoveryHero />
                        <PerformancePillars />
                        <DiagnosticSummaryTable />

                        {/* Footer */}
                        <footer className="mt-12 py-10 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-3">
                                <p className="text-xs text-slate-500 font-medium">© 2026 Agentic AI Operating System. Confidential Executive Property.</p>
                            </div>
                            <div className="flex gap-4">
                                <Link href="/contact" className="text-xs font-bold text-slate-500 hover:text-primary transition-colors">Support</Link>
                                <Link href="/about" className="text-xs font-bold text-slate-500 hover:text-primary transition-colors">Methodology</Link>
                                <Link href="/privacy" className="text-xs font-bold text-slate-500 hover:text-primary transition-colors">Privacy</Link>
                            </div>
                        </footer>
                    </main>
                </div>
            </PaywallGuard>
        </DashboardLayout>
    );
}
