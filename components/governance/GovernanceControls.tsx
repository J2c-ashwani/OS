'use client';

import React from 'react';
import { PauseCircle, Ban, VolumeX } from 'lucide-react';

interface GovernanceControlsProps {
    businessId: string;
}

export function GovernanceControls({ businessId }: GovernanceControlsProps) {
    return (
        <div className="flex gap-2 mt-4 pt-4 border-t border-slate-800/50">
            <button
                onClick={() => alert(`[GOVERNANCE] Monitoring PAUSED for ${businessId}. No new diagnostics will run.`)}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs rounded transition-colors border border-slate-700"
            >
                <PauseCircle size={12} />
                Pause Monitoring
            </button>

            <button
                onClick={() => alert(`[GOVERNANCE] Alert Category MUTED for ${businessId}.`)}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs rounded transition-colors border border-slate-700"
            >
                <VolumeX size={12} />
                Mute Category
            </button>

            <button
                onClick={() => alert(`[GOVERNANCE] STOP Request received for ${businessId}. All data will be purged.`)}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-red-900/20 hover:bg-red-900/30 text-red-400 text-xs rounded transition-colors border border-red-900/30"
            >
                <Ban size={12} />
                Stop System
            </button>
        </div>
    );
}
