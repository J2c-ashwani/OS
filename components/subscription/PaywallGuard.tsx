'use client';

import React, { useState, useEffect } from 'react';
import { checkSubscriptionStatusAction } from '@/app/actions';
import UpgradeButton from './UpgradeButton';
import { Lock, CheckCircle, Loader2 } from 'lucide-react';

interface PaywallGuardProps {
    children: React.ReactNode;
    feature: 'intelligence' | 'funnel' | 'monitoring' | 'report';
}

export default function PaywallGuard({ children, feature }: PaywallGuardProps) {
    const [isActive, setIsActive] = useState<boolean | null>(null);

    useEffect(() => {
        checkSubscriptionStatusAction()
            .then(({ isActive }) => setIsActive(isActive))
            .catch(() => setIsActive(false));
    }, []);

    // Loading state
    if (isActive === null) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="animate-spin text-blue-500" size={32} />
            </div>
        );
    }

    // Subscribed — show content
    if (isActive) {
        return <>{children}</>;
    }

    // Not subscribed — show paywall
    const featureDetails = {
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
        }
    };

    const details = featureDetails[feature] || featureDetails.intelligence;

    return (
        <div className="relative w-full h-full min-h-[80vh] overflow-hidden">
            {/* Blurred Content Background */}
            <div className="absolute inset-0 filter blur-xl opacity-40 pointer-events-none select-none overflow-hidden" aria-hidden="true">
                {children}
            </div>

            {/* Paywall Overlay */}
            <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-[#0b0d11]/90 backdrop-blur-md border border-[#1e293b] rounded-2xl p-8 shadow-2xl text-center relative overflow-hidden">
                    {/* Decorative Gradient */}
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
                            <span>Unlimited Diagnostic Runs</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                            <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                            <span>AI-Powered Recovery Scripts</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                            <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                            <span>Priority Email Alerts</span>
                        </div>
                    </div>

                    <UpgradeButton />

                    <p className="mt-6 text-xs text-gray-500">
                        14-day money-back guarantee • Cancel anytime
                    </p>
                </div>
            </div>
        </div>
    );
}
