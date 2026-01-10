"use client";

import React from 'react';
import { Lock, ShieldCheck, Mail, Database, MessageSquare, Terminal } from 'lucide-react'; // Using standard lucide icons for simplicity
import DataSourceCard from '@/components/onboarding/DataSourceCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ConnectivityPage() {
    return (
        <div className="flex flex-col h-full">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex flex-col gap-3">
                    <div className="flex gap-6 justify-between items-end">
                        <div>
                            <span className="text-primary text-xs font-bold uppercase tracking-wider">Setup Phase</span>
                            <p className="text-slate-900 dark:text-white text-xl font-bold leading-normal">Data Source Connectivity Center</p>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">Step 1 of 3</p>
                    </div>
                    <div className="rounded-full bg-slate-200 dark:bg-slate-800 h-2.5 w-full overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: '33%' }}></div>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <Lock size={14} className="text-emerald-500" />
                        <p className="text-sm font-medium leading-normal">End-to-End Encrypted Data Vault Active</p>
                    </div>
                </div>
            </div>

            {/* Page Heading */}
            <div className="mb-10 max-w-3xl">
                <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-tight mb-4">Securely Link Your Business Data</h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg font-normal leading-relaxed">
                    Connect your communication channels and CRM to enable the Agentic AI to detect leaks and optimize performance. We operate with strict read-only permissions for diagnostics.
                </p>
            </div>

            {/* Integration Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <DataSourceCard
                    name="WhatsApp Business"
                    type="Messaging Platform"
                    icon={<MessageSquare className="text-green-500" />}
                    status="connected"
                    lastSynced="Just now"
                />
                <DataSourceCard
                    name="HubSpot CRM"
                    type="Customer Database"
                    icon={<Database className="text-orange-500" />}
                    status="connected"
                    lastSynced="2 mins ago"
                />
                <DataSourceCard
                    name="Google Workspace"
                    type="Email & Calendar"
                    icon={<Mail className="text-blue-500" />}
                    status="connected"
                    lastSynced="5 mins ago"
                />
                <DataSourceCard
                    name="Slack"
                    type="Internal Comms"
                    icon={<Terminal className="text-purple-500" />}
                    status="disconnected"
                />
                <DataSourceCard
                    name="Stripe"
                    type="Payments"
                    icon={<span className="font-bold text-indigo-600">S</span>}
                    status="disconnected"
                />
                <DataSourceCard
                    name="Shopify"
                    type="E-commerce"
                    icon={<span className="font-bold text-green-600">sho</span>}
                    status="disconnected"
                />
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-white/90 dark:bg-slate-950/90 backdrop-blur border-t border-slate-200 dark:border-slate-800 p-6 -mx-6 mt-auto flex justify-between items-center rounded-b-xl">
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <ShieldCheck size={16} className="text-emerald-500" />
                    Secure connection established via OAuth 2.0
                </div>
                <Link
                    href="/app/onboarding/mapping"
                    className="flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:scale-[1.02] transition-transform"
                >
                    Continue to Mapping <ArrowRight size={18} />
                </Link>
            </div>
        </div>
    );
}
