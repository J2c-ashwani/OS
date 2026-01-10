'use client';

import { useState } from 'react';
import { CheckCircle, Circle, X, ArrowRight } from 'lucide-react';
import {
    getOnboardingState,
    getOnboardingProgress,
    getNextAction,
    updateOnboardingState
} from '@/lib/onboarding/state';

interface ProgressTrackerProps {
    onContinue?: () => void;
}

export default function ProgressTracker({ onContinue }: ProgressTrackerProps) {
    const [isMinimized, setIsMinimized] = useState(false);
    const state = getOnboardingState();
    const progress = getOnboardingProgress();
    const nextAction = getNextAction();

    const handleDismiss = () => {
        updateOnboardingState({ dismissed: true });
    };

    const completedCount = [
        state.firstBusinessAdded,
        state.firstCheckRun,
        state.alertsConfigured,
    ].filter(Boolean).length;

    if (isMinimized) {
        return (
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 cursor-pointer hover:border-slate-700 transition-colors"
                onClick={() => setIsMinimized(false)}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="text-emerald-500 font-semibold">{completedCount}/3</div>
                        <span className="text-gray-400 text-sm">Setup progress</span>
                    </div>
                    <ArrowRight size={16} className="text-gray-600" />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-lg p-6 shadow-lg">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="text-2xl">🎯</div>
                    <div>
                        <h3 className="text-lg font-semibold text-white">
                            Setup Progress: {completedCount}/3 Complete
                        </h3>
                        <p className="text-sm text-gray-400">Get the most out of Response Audit</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsMinimized(true)}
                    className="text-gray-500 hover:text-white transition-colors"
                    aria-label="Minimize"
                >
                    <X size={18} />
                </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-5">
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Checklist */}
            <div className="space-y-3 mb-5">
                <div className="flex items-center gap-3">
                    {state.firstBusinessAdded ? (
                        <CheckCircle size={20} className="text-emerald-500 shrink-0" />
                    ) : (
                        <Circle size={20} className="text-gray-600 shrink-0" />
                    )}
                    <span className={`text-sm ${state.firstBusinessAdded ? 'text-gray-400 line-through' : 'text-white'}`}>
                        Add your first business
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    {state.firstCheckRun ? (
                        <CheckCircle size={20} className="text-emerald-500 shrink-0" />
                    ) : (
                        <Circle size={20} className="text-gray-600 shrink-0" />
                    )}
                    <span className={`text-sm ${state.firstCheckRun ? 'text-gray-400 line-through' : 'text-white'}`}>
                        Run initial health check
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    {state.alertsConfigured ? (
                        <CheckCircle size={20} className="text-emerald-500 shrink-0" />
                    ) : (
                        <Circle size={20} className="text-gray-600 shrink-0" />
                    )}
                    <span className={`text-sm ${state.alertsConfigured ? 'text-gray-400 line-through' : 'text-white'}`}>
                        Configure alert preferences
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
                {nextAction && onContinue && (
                    <button
                        onClick={onContinue}
                        className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold py-2 px-4 rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
                    >
                        {nextAction}
                        <ArrowRight size={16} />
                    </button>
                )}
                <button
                    onClick={handleDismiss}
                    className="px-4 py-2 text-gray-400 hover:text-white text-sm transition-colors"
                >
                    Dismiss
                </button>
            </div>
        </div>
    );
}
