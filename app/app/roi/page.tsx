"use client";

import React from 'react';
import ROIScoreboard from '@/components/roi/ROIScoreboard';
import FunnelComparison from '@/components/roi/FunnelComparison';
import OptimizationInsights from '@/components/roi/OptimizationInsights';
import { Calendar, Download, Network, Rows, Activity } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function ROITrackerPage() {
    return (
        <DashboardLayout>
            <div className="max-w-[1400px] mx-auto p-8 flex flex-col gap-6">

                {/* Page Heading */}
                <div className="flex flex-wrap justify-between items-end gap-3 px-4">
                    <div className="flex min-w-72 flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">Analysis Active</span>
                        </div>
                        <p className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Funnel Trend Analysis</p>
                        <p className="text-slate-500 dark:text-[#92a4c9] text-base font-normal leading-normal">Comparing current efficiency against baseline performance (Started Oct 2023).</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => alert("Date range selection is locked to 'Q4 2024' for this demo environment.")}
                            className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-white dark:bg-[#1a202c] text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-slate-50 dark:hover:bg-[#1a202c]/80 transition-all shadow-sm"
                        >
                            <Calendar size={18} className="mr-2" />
                            <span className="truncate">Select Range</span>
                        </button>
                        <button
                            onClick={async () => {
                                const btn = document.getElementById('export-btn');
                                if (btn) btn.innerText = 'Exporting...';

                                await new Promise(r => setTimeout(r, 800)); // Simulate generation

                                const csvContent = "data:text/csv;charset=utf-8,"
                                    + "Metric,Value,Gap\n"
                                    + "Response Time,45min,-15min\n"
                                    + "Conversion Rate,12%,+2%\n"
                                    + "Leads Processed,145,+15\n";

                                const encodedUri = encodeURI(csvContent);
                                const link = document.createElement("a");
                                link.setAttribute("href", encodedUri);
                                link.setAttribute("download", "roi_report_q1.csv");
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);

                                if (btn) btn.innerText = 'Export Report';
                            }}
                            id="export-btn"
                            className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all"
                        >
                            <Download size={18} className="mr-2" />
                            <span className="truncate">Export Report</span>
                        </button>
                    </div>
                </div>

                {/* Scoreboard */}
                <ROIScoreboard />

                {/* Visualization Tabs Mock */}
                <div className="px-4 overflow-x-auto pb-2 -mx-4 md:mx-0">
                    <div className="flex border-b border-slate-200 dark:border-slate-800 gap-8 min-w-max px-4 md:px-0">
                        <button className="flex items-center gap-2 border-b-[3px] border-b-primary text-primary pb-3 pt-4 cursor-default">
                            <Network size={18} />
                            <p className="text-sm font-bold leading-normal tracking-[0.015em]">Sankey Flow View</p>
                        </button>
                        <button className="flex items-center gap-2 border-b-[3px] border-b-transparent text-slate-500 dark:text-[#92a4c9] hover:text-slate-900 dark:hover:text-white pb-3 pt-4 transition-colors">
                            <Rows size={18} />
                            <p className="text-sm font-bold leading-normal tracking-[0.015em]">Drop-off Table</p>
                        </button>
                        <button className="flex items-center gap-2 border-b-[3px] border-b-transparent text-slate-500 dark:text-[#92a4c9] hover:text-slate-900 dark:hover:text-white pb-3 pt-4 transition-colors">
                            <Activity size={18} />
                            <p className="text-sm font-bold leading-normal tracking-[0.015em]">Diagnostic Logs</p>
                        </button>
                    </div>
                </div>

                {/* Main Visualizer */}
                <FunnelComparison />

                {/* Insights and Next Steps */}
                <OptimizationInsights />

            </div>
        </DashboardLayout>
    );
}
