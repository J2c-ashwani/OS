import React from 'react';
import { Inbox, MessageSquare, ShieldCheck, FileEdit, Handshake } from 'lucide-react';

export default function VisualFunnel() {
    return (
        <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-slate-900 dark:text-white text-2xl font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">filter_alt</span>
                    Visual Revenue Funnel
                </h2>
                <div className="flex gap-4 items-center text-xs uppercase tracking-widest font-bold text-slate-500">
                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary"></span> Ideal Path</div>
                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Critical Leak</div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 relative">
                {/* Connectors (Conceptual Background) */}
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-800 -z-10 transform -translate-y-1/2 hidden lg:block"></div>

                {/* Stage 1 */}
                <div className="flex flex-col gap-3 rounded-xl border border-slate-200 dark:border-[#3b4354] bg-white dark:bg-[#1c1f27] p-5 shadow-sm">
                    <div className="flex justify-between items-start">
                        <Inbox className="text-primary" size={24} />
                        <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500 uppercase">Stage 1</span>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-slate-900 dark:text-white text-lg font-bold">Inquiry</h3>
                        <p className="text-slate-500 dark:text-[#9da6b9] text-xs font-medium">1,240 Total Leads</p>
                    </div>
                    <div className="mt-2 text-primary text-xl font-black">98% <span className="text-xs font-medium text-slate-400">capture</span></div>
                </div>

                {/* Stage 2 */}
                <div className="flex flex-col gap-3 rounded-xl border-2 border-red-500/50 bg-white dark:bg-[#1c1f27] p-5 shadow-[0_0_15px_rgba(239,68,68,0.15)] relative">
                    <div className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full uppercase shadow-lg">Leak Point</div>
                    <div className="flex justify-between items-start">
                        <MessageSquare className="text-red-500" size={24} />
                        <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500 uppercase">Stage 2</span>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-slate-900 dark:text-white text-lg font-bold">First Response</h3>
                        <p className="text-slate-500 dark:text-[#9da6b9] text-xs font-medium">850 Responded</p>
                    </div>
                    <div className="mt-2 text-red-500 text-xl font-black">68% <span className="text-xs font-medium text-slate-400">conversion</span></div>
                </div>

                {/* Stage 3 */}
                <div className="flex flex-col gap-3 rounded-xl border border-slate-200 dark:border-[#3b4354] bg-white dark:bg-[#1c1f27] p-5 shadow-sm">
                    <div className="flex justify-between items-start">
                        <ShieldCheck className="text-primary" size={24} />
                        <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500 uppercase">Stage 3</span>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-slate-900 dark:text-white text-lg font-bold">Qualified</h3>
                        <p className="text-slate-500 dark:text-[#9da6b9] text-xs font-medium">720 Qualified</p>
                    </div>
                    <div className="mt-2 text-primary text-xl font-black">84% <span className="text-xs font-medium text-slate-400">rate</span></div>
                </div>

                {/* Stage 4 */}
                <div className="flex flex-col gap-3 rounded-xl border-2 border-red-500/50 bg-white dark:bg-[#1c1f27] p-5 shadow-[0_0_15px_rgba(239,68,68,0.15)] relative">
                    <div className="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full uppercase shadow-lg">Critical Leak</div>
                    <div className="flex justify-between items-start">
                        <FileEdit className="text-red-500" size={24} />
                        <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500 uppercase">Stage 4</span>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-slate-900 dark:text-white text-lg font-bold">Follow-up</h3>
                        <p className="text-slate-500 dark:text-[#9da6b9] text-xs font-medium">324 Engaged</p>
                    </div>
                    <div className="mt-2 text-red-500 text-xl font-black">45% <span className="text-xs font-medium text-slate-400">leak point</span></div>
                </div>

                {/* Stage 5 */}
                <div className="flex flex-col gap-3 rounded-xl border border-slate-200 dark:border-[#3b4354] bg-white dark:bg-[#1c1f27] p-5 shadow-sm">
                    <div className="flex justify-between items-start">
                        <Handshake className="text-primary" size={24} />
                        <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500 uppercase">Stage 5</span>
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-slate-900 dark:text-white text-lg font-bold">Closure</h3>
                        <p className="text-slate-500 dark:text-[#9da6b9] text-xs font-medium">290 Closed</p>
                    </div>
                    <div className="mt-2 text-primary text-xl font-black">89% <span className="text-xs font-medium text-slate-400">efficiency</span></div>
                </div>
            </div>
        </section>
    );
}
