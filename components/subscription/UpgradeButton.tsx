"use client";

import React, { useState } from 'react';
import { activateSubscriptionAction } from '@/app/actions';
import { Loader2, Lock, Sparkles } from 'lucide-react';

export default function UpgradeButton() {
    const [loading, setLoading] = useState(false);

    const handleUpgrade = async () => {
        setLoading(true);
        try {
            // Mock business ID for now
            const result = await activateSubscriptionAction('b1');
            if (result.success) {
                // Refresh window to simulate full redirect/reload behavior
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleUpgrade}
            disabled={loading}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        >
            {loading ? (
                <>
                    <Loader2 className="animate-spin" size={20} />
                    Processing...
                </>
            ) : (
                <>
                    <Lock size={18} />
                    <span>Unlock For $499/mo</span>
                    <Sparkles size={16} className="text-yellow-300" />
                </>
            )}
        </button>
    );
}
