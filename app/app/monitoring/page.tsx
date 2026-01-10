import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PaywallGuard from '@/components/subscription/PaywallGuard';
import MonitoringDashboardClient from '@/components/monitoring/MonitoringDashboardClient';

export default function MonitoringPage() {
    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto p-8">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Health Checks</h2>
                    <p className="text-gray-500">Real-time status of all monitored businesses</p>
                </div>

                <PaywallGuard feature="monitoring">
                    <MonitoringDashboardClient />
                </PaywallGuard>
            </div>
        </DashboardLayout>
    );
}
