import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function ConversationSnapshot() {
    return (
        <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">Conversation Snapshot</h4>
                <button className="text-[10px] text-primary font-bold flex items-center gap-1 hover:underline">
                    VIEW FULL HISTORY
                    <ExternalLink size={10} />
                </button>
            </div>
            <div className="space-y-4 opacity-70">
                <div className="flex gap-3 max-w-[80%]">
                    <div className="size-8 rounded-full bg-gray-800 flex-shrink-0" ></div>
                    <div className="bg-[#1c2433] p-3 rounded-2xl rounded-tl-none">
                        <p className="text-sm text-gray-300">"The demo was great. I'm checking with my director on the final headcount. What does the pricing look like for 12-15 seats?"</p>
                        <span className="text-[10px] text-gray-600 mt-1 block">Sarah J. • 14:05</span>
                    </div>
                </div>
                <div className="flex flex-col items-center py-2">
                    <div className="h-px w-full bg-red-900/30"></div>
                    <span className="px-2 py-0.5 bg-red-900/20 text-red-400 text-[10px] font-bold uppercase -mt-2">Drop Point Detected</span>
                </div>
                <div className="flex gap-3 justify-center">
                    <p className="text-[10px] text-gray-500 italic">Silence for 14 minutes...</p>
                </div>
            </div>
        </div>
    );
}
