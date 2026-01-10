import React from 'react';
import PaywallGuard from '@/components/subscription/PaywallGuard';
import SalesIntelligenceClient from '@/components/intelligence/SalesIntelligenceClient';

export default function SalesIntelligencePage() {
    return (
        <PaywallGuard feature="intelligence">
            <SalesIntelligenceClient />
        </PaywallGuard>
    );
}
