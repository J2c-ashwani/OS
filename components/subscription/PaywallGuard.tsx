'use client';

import React, { useState, useEffect } from 'react';
import { checkSubscriptionStatusAction } from '@/app/actions';
import UpgradeButton from './UpgradeButton';
import { Lock, CheckCircle, Loader2, ArrowUp } from 'lucide-react';
import Link from 'next/link';

interface PaywallGuardProps {
    children: React.ReactNode;
    feature: 'intelligence' | 'funnel' | 'monitoring' | 'report' | 'sop';
}

/**
 * Feature-to-plan access map.
 * GROWTH = $99/mo plan, ENTERPRISE = $499/mo plan.
 * Features listed under a plan are accessible to that plan AND all higher plans.
 */
const PLAN_ACCESS: Record<string, string[]> = {
    GROWTH: ['monitoring', 'report'],
    STARTER: ['monitoring', 'report'],     // alias
    ENTERPRISE: ['monitoring', 'report', 'intelligence', 'funnel', 'sop'],
    PRO: ['monitoring', 'report', 'intelligence', 'funnel', 'sop'], // alias
};

function hasAccess(plan: string, feature: string): boolean {
    const upperPlan = plan.toUpperCase();
    const allowedFeatures = PLAN_ACCESS[upperPlan] || [];
    return allowedFeatures.includes(feature);
}

export default function PaywallGuard({ children, feature }: PaywallGuardProps) {
    const [status, setStatus] = useState<{ isActive: boolean; plan: string } | null>(null);

    useEffect(() => {
        checkSubscriptionStatusAction()
            .then((result) => setStatus(result))
            .catch(() => setStatus({ isActive: false, plan: 'FREE' }));
    }, []);

    // Loading state
    if (status === null) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="animate-spin text-blue-500" size={32} />
            </div>
        );
    }

    // Not subscribed at all — show full paywall
    if (!status.isActive) {
        return <FullPaywall feature={feature}>{children}</FullPaywall>;
    }

    // Subscribed — check if their plan includes this feature
    if (hasAccess(status.plan, feature)) {
        return <>{children}</>;
    }

    // Has a subscription but not for this feature — show upgrade prompt
    return <UpgradePaywall feature={feature} currentPlan={status.plan}>{children}</UpgradePaywall>;
}

/** Full paywall for users with no subscription */
function FullPaywall({ children, feature }: { children: React.ReactNode; feature: string }) {
    const featureDetails: Record<string, { title: string; description: string }> = {
        intelligence: {
            title: "Advanced Sales Intelligence",
            description: "Unlock real-time diagnostic grids, intent analysis, and automated response optimization."
        },
        funnel: {
            title: "Revenue Funnel Tracker",
            description: "Visualize leak points, track SOP compliance, and identify revenue recovery opportunities."
        },
        monitoring: {
            title: "Continuous Health Monitoring",
            description: "Get 24/7 surveillance of your sales channels with instant alerts for dropped leads."
        },
        report: {
            title: "Detailed Audit Reports",
            description: "Access deep-dive PDF reports with evidence logs and strategic recommendations."
        },
        sop: {
            title: "SOP Enforcement & Builder",
            description: "Build, enforce, and track standard operating procedures across your sales team."
        }
    };

    const details = featureDetails[feature] || featureDetails.intelligence;

    return (
        <div className="relative w-full h-full min-h-[80vh] overflow-hidden">
            <div className="absolute inset-0 filter blur-xl opacity-40 pointer-events-none select-none overflow-hidden" aria-hidden="true">
                {children}
            </div>

            <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-[#0b0d11]/90 backdrop-blur-md border border-[#1e293b] rounded-2xl p-8 shadow-2xl text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

                    <div className="mx-auto size-16 bg-[#1e293b] rounded-full flex items-center justify-center mb-6 border border-[#282e39]">
                        <Lock className="text-blue-500" size={32} />
                    </div>

                    <h2 className="text-2xl font-black text-white mb-2">{details.title}</h2>
                    <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                        {details.description}
                    </p>

                    <div className="space-y-3 mb-8 text-left max-w-xs mx-auto">
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                            <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                            <span>Automated Response Monitoring</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                            <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                            <span>Diagnostic Reports & Alerts</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                            <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                            <span>Plans starting at $99/mo</span>
                        </div>
                    </div>

                    <UpgradeButton />

                    <p className="mt-6 text-xs text-gray-500">
                        Cancel anytime • No charges after cancellation
                    </p>
                </div>
            </div>
        </div>
    );
}

/** Upgrade prompt for Growth users trying to access Enterprise features */
function UpgradePaywall({ children, feature, currentPlan }: { children: React.ReactNode; feature: string; currentPlan: string }) {
    const enterpriseFeatures: Record<string, { title: string; description: string }> = {
        intelligence: {
            title: "AI-Powered Sales Intelligence",
            description: "Real-time diagnostic grids, conversation intent analysis, and automated response optimization."
        },
        funnel: {
            title: "Funnel Leak Analysis & ROI Tracking",
            description: "Visualize your entire revenue funnel, identify leak points, and track recovery ROI."
        },
        sop: {
            title: "Advanced SOP Enforcement",
            description: "Build custom SOPs, enforce compliance automatically, and track team performance."
        }
    };

    const details = enterpriseFeatures[feature] || enterpriseFeatures.intelligence;

    return (
        <div className="relative w-full h-full min-h-[80vh] overflow-hidden">
            <div className="absolute inset-0 filter blur-xl opacity-40 pointer-events-none select-none overflow-hidden" aria-hidden="true">
                {children}
            </div>

            <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-[#0b0d11]/90 backdrop-blur-md border border-[#1e293b] rounded-2xl p-8 shadow-2xl text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500"></div>

                    <div className="mx-auto size-16 bg-amber-500/10 rounded-full flex items-center justify-center mb-6 border border-amber-500/20">
                        <ArrowUp className="text-amber-400" size={32} />
                    </div>

                    <div className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-full mb-4 border border-blue-500/20">
                        You&apos;re on the {currentPlan} plan
                    </div>

                    <h2 className="text-2xl font-black text-white mb-2">{details.title}</h2>
                    <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                        This feature is available on the <strong className="text-amber-400">Enterprise plan ($499/mo)</strong>. Upgrade to unlock the full power of Response Audit.
                    </p>

                    <div className="space-y-3 mb-8 text-left max-w-xs mx-auto">
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                            <CheckCircle size={16} className="text-amber-400 flex-shrink-0" />
                            <span>Unlimited monitored channels</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                            <CheckCircle size={16} className="text-amber-400 flex-shrink-0" />
                            <span>AI conversation intelligence</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                            <CheckCircle size={16} className="text-amber-400 flex-shrink-0" />
                            <span>Revenue loss estimation per gap</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                            <CheckCircle size={16} className="text-amber-400 flex-shrink-0" />
                            <span>Custom escalation workflows</span>
                        </div>
                    </div>

                    <Link
                        href="/pricing"
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg shadow-amber-500/20 block"
                    >
                        Upgrade to Enterprise
                    </Link>

                    <p className="mt-6 text-xs text-gray-500">
                        Your Growth features remain fully active
                    </p>
                </div>
            </div>
        </div>
    );
}
