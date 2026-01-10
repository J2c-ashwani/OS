import React from 'react';
import { Lightbulb } from 'lucide-react';

export default function FixRecommendation() {
    return (
        <div className="mt-6 bg-primary/10 border border-primary/30 rounded-xl p-6 flex gap-6 items-start">
            <div className="bg-primary p-3 rounded-lg">
                <Lightbulb className="text-white" size={24} />
            </div>
            <div className="flex-1">
                <h4 className="text-primary font-bold text-lg">AI Recommendation: What to fix first</h4>
                <p className="text-slate-700 dark:text-slate-300 mt-1">
                    Your biggest revenue leak is at <strong className="text-slate-900 dark:text-white">Stage 4: Follow-up</strong>. 55% of qualified leads are lost here because the average response time is 12 hours.
                    Shorten this to <strong className="text-slate-900 dark:text-white">&lt; 4 hours</strong> to recover an estimated <strong className="text-green-500">$24,500/mo</strong> in lost revenue.
                </p>
            </div>
            <button className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg hover:shadow-primary/40 transition-shadow">
                Automate Follow-ups
            </button>
        </div>
    );
}
