'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Target, Activity, Bell, X } from 'lucide-react';
import { updateOnboardingState } from '@/lib/onboarding/state';

interface WelcomeModalProps {
    onClose: () => void;
    onStartTour: () => void;
}

export default function WelcomeModal({ onClose, onStartTour }: WelcomeModalProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Fade in animation
        setTimeout(() => setIsVisible(true), 50);
    }, []);

    const handleGetStarted = () => {
        updateOnboardingState({ welcomed: true });
        onStartTour();
        handleClose();
    };

    const handleSkip = () => {
        updateOnboardingState({ welcomed: true });
        handleClose();
    };

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for fade out
    };

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
                }`}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
                onClick={handleSkip}
            />

            {/* Modal */}
            <div
                className={`relative bg-slate-900 border border-slate-800 rounded-lg max-w-md w-full p-8 shadow-2xl transition-all duration-300 ${isVisible ? 'scale-100' : 'scale-95'
                    }`}
            >
                {/* Close button */}
                <button
                    onClick={handleSkip}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                    aria-label="Close"
                >
                    <X size={20} />
                </button>

                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-emerald-500/10 rounded-lg">
                        <Sparkles size={28} className="text-emerald-500" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Welcome to Response Audit!</h2>
                        <p className="text-sm text-gray-400 mt-1">Let's get you set up in under 2 minutes</p>
                    </div>
                </div>

                {/* Benefits */}
                <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-500/10 rounded shrink-0">
                            <Target size={18} className="text-blue-500" />
                        </div>
                        <div>
                            <h3 className="text-white font-medium">Monitor 24/7</h3>
                            <p className="text-sm text-gray-400">Track customer response times around the clock</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-yellow-500/10 rounded shrink-0">
                            <Activity size={18} className="text-yellow-500" />
                        </div>
                        <div>
                            <h3 className="text-white font-medium">Instant Alerts</h3>
                            <p className="text-sm text-gray-400">Get notified immediately when response gaps are detected</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-purple-500/10 rounded shrink-0">
                            <Bell size={18} className="text-purple-500" />
                        </div>
                        <div>
                            <h3 className="text-white font-medium">Performance Analytics</h3>
                            <p className="text-sm text-gray-400">Track trends and measure response quality over time</p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={handleGetStarted}
                        className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                        Let's Get Started
                    </button>
                    <button
                        onClick={handleSkip}
                        className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                    >
                        Skip Tour
                    </button>
                </div>
            </div>
        </div>
    );
}
