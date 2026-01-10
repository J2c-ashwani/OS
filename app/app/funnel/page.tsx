import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PaywallGuard from '@/components/subscription/PaywallGuard';
import FunnelTrackerClient from '@/components/funnel/FunnelTrackerClient';

export default function FunnelTrackerPage() {
    return (
        <DashboardLayout>
            <PaywallGuard feature="funnel">
                <FunnelTrackerClient />
            </PaywallGuard>
        </DashboardLayout>
    );
}
