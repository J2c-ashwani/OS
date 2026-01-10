"use client";

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import RevenueStats from '@/components/dashboard/RevenueStats';
import SalesIntelligence from '@/components/dashboard/SalesIntelligence';
import FunnelLeakMap from '@/components/dashboard/FunnelLeakMap';
import SOPComplianceTable from '@/components/dashboard/SOPComplianceTable';
import { Search, Bell, MessageSquare, Download, Zap } from 'lucide-react';
import { getDashboardStatsAction, runDiagnosticsAction } from '../../actions';
import { shouldShowWelcome, shouldShowProgressTracker } from '@/lib/onboarding/state';
import WelcomeModal from '@/components/onboarding/WelcomeModal';
import ProgressTracker from '@/components/onboarding/ProgressTracker';
import AddBusinessWizard from '@/components/onboarding/AddBusinessWizard';

export default function Dashboard() {
  const [stats, setStats] = useState({
    activeTargets: 0,
    diagnosticsRun: 0,
    gapsIdentified: 0,
    outreachSent: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showWizard, setShowWizard] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // Check onboarding
    setShowWelcomeModal(shouldShowWelcome());
    setShowProgress(shouldShowProgressTracker());

    // Fetch Real Data
    getDashboardStatsAction().then(data => {
      setStats({
        activeTargets: data.activeTargets,
        diagnosticsRun: data.diagnosticsRun,
        gapsIdentified: data.gapsIdentified,
        outreachSent: data.outreachSent
      });
      setIsLoading(false);
    });
  }, []);

  async function handleRun() {
    setIsRunning(true);
    await runDiagnosticsAction();
    // Refresh stats
    const data = await getDashboardStatsAction();
    setStats({
      activeTargets: data.activeTargets,
      diagnosticsRun: data.diagnosticsRun,
      gapsIdentified: data.gapsIdentified,
      outreachSent: data.outreachSent
    });
    setIsRunning(false);
  }

  // Handlers
  const handleStartTour = () => setShowWizard(true);
  const handleContinueSetup = () => setShowWizard(true);

  // Derived Metrics for Visuals
  const detectedLeaksValue = stats.gapsIdentified * 1250; // $1,250 per gap avg
  const atRiskRevenueValue = stats.activeTargets * 5000; // $5k opportunity cost per target
  const efficiencyScore = stats.diagnosticsRun > 0
    ? Math.round(((stats.diagnosticsRun - stats.gapsIdentified) / stats.diagnosticsRun) * 100)
    : 100;

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full bg-background-light dark:bg-[#101622] text-slate-900 dark:text-slate-100 font-sans">
        {/* Top Navbar */}
        <header className="sticky top-0 z-10 flex items-center justify-between px-4 md:px-8 py-4 bg-white/80 dark:bg-[#101622]/80 backdrop-blur-md border-b border-slate-200 dark:border-[#2d3648]">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none text-slate-900 dark:text-white placeholder:text-slate-500"
                placeholder="Search diagnostics..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3 ml-2">
            <button className="hidden md:block p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
              <Bell size={20} />
            </button>
            <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
              <MessageSquare size={20} />
            </button>
            <div className="h-6 w-[1px] bg-slate-200 dark:bg-[#2d3648] mx-2"></div>
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center gap-2 px-3 md:px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isRunning ? <Zap size={16} className="animate-spin" /> : <Download size={16} />}
              <span className="hidden md:inline">{isRunning ? 'Running Scan...' : 'Run Diagnostics'}</span>
              <span className="md:hidden">{isRunning ? 'Scanning' : 'Scan'}</span>
            </button>
          </div>
        </header>

        <div className="p-8 space-y-8 flex-1 overflow-y-auto">
          {/* Onboarding Modals */}
          {showWelcomeModal && (
            <WelcomeModal
              onClose={() => setShowWelcomeModal(false)}
              onStartTour={handleStartTour}
            />
          )}
          {showWizard && (
            <AddBusinessWizard
              onClose={() => setShowWizard(false)}
              onComplete={() => {
                setShowProgress(true);
              }}
            />
          )}
          {showProgress && (
            <div className="mb-6">
              <ProgressTracker onContinue={handleContinueSetup} />
            </div>
          )}

          {/* Page Heading */}
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Revenue Health Overview</h2>
            <p className="text-slate-500 dark:text-slate-400">Real-time diagnostic of SMB operational efficiency and leak detection.</p>
          </div>

          {/* Stats Grid */}
          <RevenueStats
            detectedLeaks={detectedLeaksValue}
            atRiskRevenue={atRiskRevenueValue}
            efficiencyScore={efficiencyScore}
          />

          {/* Middle Content: Sales Intelligence & Funnel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sales Intelligence Module */}
            <SalesIntelligence />
            {/* Funnel Leak Map */}
            <FunnelLeakMap />
          </div>

          {/* Bottom Section: SOP Compliance */}
          <SOPComplianceTable />

          {/* Footer */}
          <footer className="pt-8 mt-auto border-t border-slate-200 dark:border-[#2d3648] flex justify-between items-center text-slate-500 text-xs text-center md:text-left">
            <p>© 2026 Agentic AI Operating System. Diagnostic Node: US-EAST-01</p>
            <div className="flex gap-6 justify-center md:justify-end">
              <a className="hover:text-primary transition-colors" href="#">Documentation</a>
              <a className="hover:text-primary transition-colors" href="#">API Status</a>
              <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
            </div>
          </footer>
        </div>
      </div>
    </DashboardLayout>
  );
}
