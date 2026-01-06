"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { MOCK_BUSINESSES, MOCK_DIAGNOSTICS, MOCK_GAPS, MOCK_SUBSCRIPTIONS } from '@/lib/data/store';
import { Activity, Search, ShieldCheck, AlertTriangle, Zap, MessageSquare, BarChart3, FileWarning } from 'lucide-react';
import { runDiagnosticsAction, activateSubscriptionAction, handleReplyAction, generateAnalyticsReportAction, generateLossEstimateAction } from '../../actions';

export default function Home() {
  const [stats, setStats] = useState({
    activeTargets: MOCK_BUSINESSES.length,
    diagnosticsRun: MOCK_DIAGNOSTICS.length,
    gapsIdentified: MOCK_GAPS.length,
    outreachSent: 0
  });

  // Group logs by businessId for easy access
  const diagnosticLogs = MOCK_DIAGNOSTICS.reduce((acc, log) => {
    if (!acc[log.businessId]) acc[log.businessId] = [];
    acc[log.businessId].push(log);
    return acc;
  }, {} as Record<string, typeof MOCK_DIAGNOSTICS>);

  const [isRunning, setIsRunning] = React.useState(false);

  async function handleRun() {
    setIsRunning(true);
    await runDiagnosticsAction();
    // Local state update mostly handled by revalidatePath for data, but we can animate
    setIsRunning(false);
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white">Dashboard</h2>
            <p className="text-slate-400">System Overview & Activity Feed</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md border border-slate-700 transition-all">
              <Search size={16} />
              Scan New Target
            </button>
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-md font-medium shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              {isRunning ? <Zap size={16} className="animate-spin" /> : <Zap size={16} />}
              {isRunning ? 'Running Diagnostics...' : 'Run Auto-Diagnostics'}
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Active Targets"
            value={MOCK_BUSINESSES.length}
            icon={<Search className="text-blue-400" />}
          />
          <StatCard
            label="Diagnostics Run"
            value={MOCK_DIAGNOSTICS.length}
            icon={<Activity className="text-purple-400" />}
          />
          <StatCard
            label="Gaps Identified"
            value={MOCK_GAPS.length}
            icon={<AlertTriangle className="text-amber-400" />}
          />
          <StatCard
            label="Revenue Secured"
            value={`$${MOCK_SUBSCRIPTIONS.length * 99}.00`}
            icon={<ShieldCheck className="text-emerald-400" />}
          />
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="col-span-2 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Live System Log</h3>
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {MOCK_DIAGNOSTICS.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 border-2 border-dashed border-slate-800 rounded-lg">
                    <Activity className="mx-auto mb-2 opacity-50" size={32} />
                    <p>System is idle. Waiting for diagnostic tasks...</p>
                  </div>
                ) : (
                  MOCK_DIAGNOSTICS.slice().reverse().map(log => {
                    const gap = MOCK_GAPS.find(g => g.diagnosticLogId === log.id);
                    const biz = MOCK_BUSINESSES.find(b => b.id === log.businessId);
                    return (
                      <div key={log.id} className="border-l-2 border-slate-700 pl-4 py-1">
                        <div className="flex justify-between">
                          <span className="text-xs text-slate-500">{log.timestampSent.toLocaleTimeString()}</span>
                          <span className={`text-xs font-bold ${log.result === 'SUCCESS' ? 'text-emerald-400' : 'text-red-400'}`}>
                            {log.result}
                          </span>
                        </div>
                        <p className="text-slate-300 text-sm mt-1">
                          {log.channel} Probe for {biz?.name}: <span className="text-slate-400">{log.evidence}</span>
                        </p>
                        {gap && (
                          <div className="mt-2 bg-red-500/10 border border-red-500/20 p-2 rounded text-xs text-red-300 flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <AlertTriangle size={12} />
                              GAP DETECTED: {gap.title}
                            </div>
                            {/* System 11: Impact Analysis */}
                            <div className="mt-2 text-right">
                              <form action={async () => {
                                const res = await generateLossEstimateAction(gap.businessId, gap.id);
                                if (res.success && res.estimate) {
                                  alert(`IMPACT ANALYSIS:\n\nEst. Monthly Loss: $${res.estimate.minMonthlyLoss} - $${res.estimate.maxMonthlyLoss}\n\nConfidence: ${res.estimate.confidence}\n\nAssumptions:\n- ${res.estimate.assumptions.join('\n- ')}\n\n${res.estimate.disclaimer}`);
                                } else {
                                  alert("Could not estimate loss for this gap type (low confidence).");
                                }
                              }}>
                                <button type="submit" className="text-[10px] uppercase tracking-wider text-slate-500 hover:text-slate-300 transition-colors border-b border-transparent hover:border-slate-300">
                                  Analyze Impact
                                </button>
                              </form>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="col-span-1 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Target Health</h3>
              <div className="space-y-3">
                {MOCK_BUSINESSES.map(biz => {
                  const activeGap = MOCK_GAPS.find(g => g.businessId === biz.id);
                  // [GOVERNANCE] Calculate Confidence (Mock logic, should match server)
                  let confidenceScore = 0.5;
                  if (activeGap?.type === 'BROKEN_FORM') confidenceScore = 0.95;
                  else if (activeGap?.type === 'SLOW_RESPONSE') confidenceScore = 0.9;
                  else if (activeGap?.type === 'MISSED_FOLLOWUP') confidenceScore = 0.85;
                  else if (activeGap) confidenceScore = 0.6;

                  // [GOVERNANCE] RULE: Silence is Default. Hide if no gap OR low confidence (<0.6)
                  // However, for the demo "Scan New Target" we want to show the card initially, 
                  // but maybe hide the *details* until diagnostics run. 
                  // Let's hide the specific 'Live System Log' details if empty.
                  const bizLogs = diagnosticLogs[biz.id] || [];
                  const showDetails = bizLogs.length > 0;

                  return (
                    <div key={biz.id} className="p-3 bg-slate-950 rounded border border-slate-800/50">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="text-sm font-medium text-slate-200">{biz.name}</div>
                          <div className="text-xs text-slate-500">{biz.primaryChannel}</div>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${biz.status === 'CUSTOMER' ? 'bg-emerald-500' :
                          activeGap ? 'bg-amber-500' : 'bg-slate-700'
                          }`}></div>
                      </div>

                      {/* Status Label */}
                      <div className="text-xs text-slate-400 capitalize">
                        {biz.status === 'CUSTOMER' ? 'Start: ' + new Date().toLocaleDateString() :
                          activeGap ? 'Gap Detected' : 'Monitoring'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div >
      </div >
    </DashboardLayout >
  );
}

function StatCard({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-5 rounded-lg">
      <div className="flex justify-between items-start mb-2">
        <span className="text-slate-400 text-sm font-medium">{label}</span>
        {icon}
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
    </div>
  );
}
