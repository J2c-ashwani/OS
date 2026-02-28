import React from 'react';
import PaywallGuard from '@/components/subscription/PaywallGuard';
import SalesIntelligenceClient from '@/components/intelligence/SalesIntelligenceClient';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function SalesIntelligencePage() {
    return (
        <DashboardLayout>
            <PaywallGuard feature="intelligence">
                <SalesIntelligenceClient />
            </PaywallGuard>
        </DashboardLayout>
    );
}
