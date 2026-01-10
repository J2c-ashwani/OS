import React from 'react';
import { Send, Wand2, Edit3 } from 'lucide-react';

export default function OptimizedReply() {
    return (
        <div className="bg-primary/5 border border-primary/30 rounded-xl overflow-hidden mt-8">
            <div className="bg-primary/10 px-5 py-3 border-b border-primary/20 flex justify-between items-center">
                <div className="flex items-center gap-2 text-primary">
                    <Wand2 size={18} />
                    <h4 className="text-xs font-bold uppercase tracking-widest">Optimized Reply Suggestion</h4>
                </div>
                <span className="text-[10px] font-bold text-primary/70">GEN-4 RECOVERY MODEL</span>
            </div>
            <div className="p-5">
                <div className="bg-[#101622]/80 rounded-lg p-4 font-mono text-sm text-gray-300 leading-relaxed border border-[#282e39] mb-4">
                    "Hi Sarah, I wanted to jump back in immediately on that pricing question. For your team size of 15, the Enterprise-Lite tier usually works best. I've secured a 15% 'Early Adopter' credit if we can finalize details by Friday. Does that align with your budget for Q3?"
                </div>
                <div className="flex justify-end gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-400 hover:text-white transition-colors">
                        <Edit3 size={14} />
                        Edit Manually
                    </button>
                    <button className="flex items-center gap-2 px-6 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:shadow-[0_0_20px_rgba(19,91,236,0.3)] transition-all">
                        Apply & Send Now
                        <Send size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
}
