import React from 'react';
import { AlertTriangle, TrendingDown, Network, Check, Lock, Info } from 'lucide-react';

export default function DiagnosticQuadrants() {
    return (
        <div className="grid grid-cols-2 gap-4">
            {/* What is happening */}
            <div className="bg-[#1c2433] border border-[#282e39] rounded-xl p-5 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-primary">
                    <Info size={18} />
                    <h4 className="text-xs font-bold uppercase tracking-tight">What is happening</h4>
                </div>
                <div>
                    <p className="text-white text-lg font-bold">Critical Latency on Pricing</p>
                    <p className="text-gray-400 text-sm leading-relaxed mt-1">Lead requested seasonal discount structure at 14:05. Response has exceeded the 5-minute intent window.</p>
                </div>
            </div>
            {/* Why it matters */}
            <div className="bg-[#1c2433] border border-[#282e39] rounded-xl p-5 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-red-400">
                    <TrendingDown size={18} />
                    <h4 className="text-xs font-bold uppercase tracking-tight">Why it matters</h4>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-white">62%</span>
                    <p className="text-gray-400 text-sm font-medium">Intent Decay Probability</p>
                </div>
                <p className="text-gray-500 text-xs italic">Historical data suggests conversion drops to &lt;10% after 60 mins of silence on pricing inquiries.</p>
            </div>
            {/* Where it breaks */}
            <div className="bg-[#1c2433] border border-[#282e39] rounded-xl p-5 flex flex-col gap-4 col-span-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-yellow-500">
                        <Network size={18} />
                        <h4 className="text-xs font-bold uppercase tracking-tight">Where it breaks</h4>
                    </div>
                    <span className="text-xs text-gray-500 font-mono">Failure at Step 3: Economic Justification</span>
                </div>
                <div className="flex items-center justify-between relative px-2 py-4">
                    <div className="absolute h-0.5 left-0 right-0 bg-[#282e39] top-1/2 -translate-y-1/2"></div>
                    <div className="relative z-10 flex flex-col items-center gap-2">
                        <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white">
                            <Check size={14} />
                        </div>
                        <span className="text-[10px] font-bold text-gray-500">Needs Discovery</span>
                    </div>
                    <div className="relative z-10 flex flex-col items-center gap-2">
                        <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white">
                            <Check size={14} />
                        </div>
                        <span className="text-[10px] font-bold text-gray-500">Solution Demo</span>
                    </div>
                    <div className="relative z-10 flex flex-col items-center gap-2">
                        <div className="size-10 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                            <AlertTriangle size={16} />
                        </div>
                        <span className="text-[10px] font-black text-white">Pricing Inquiry</span>
                    </div>
                    <div className="relative z-10 flex flex-col items-center gap-2 opacity-30">
                        <div className="size-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-400">
                            <Lock size={14} />
                        </div>
                        <span className="text-[10px] font-bold text-gray-500">Closing</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
