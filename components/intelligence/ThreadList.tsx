import React from 'react';

export default function ThreadList() {
    return (
        <section className="w-80 border-r border-[#282e39] flex flex-col bg-[#101622]">
            <div className="p-4 border-b border-[#282e39]">
                <div className="flex bg-[#1c2433] p-1 rounded-lg">
                    <button className="flex-1 py-1.5 text-xs font-bold rounded bg-primary text-white">At-Risk (12)</button>
                    <button className="flex-1 py-1.5 text-xs font-bold rounded text-gray-500 hover:text-gray-300">Dropped (8)</button>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                <style>
                    {`
                    .sidebar-active {
                        background-color: #282e39;
                        border-left: 4px solid #135bec;
                    }
                    `}
                </style>
                {/* List Item 1 */}
                <div className="p-4 border-b border-[#282e39] sidebar-active cursor-pointer">
                    <div className="flex justify-between items-start mb-1">
                        <p className="text-white text-sm font-semibold">Sarah Jenkins</p>
                        <span className="text-[10px] text-red-400 font-bold uppercase">High Risk</span>
                    </div>
                    <p className="text-gray-400 text-xs mb-2">Pricing inquiry - No reply</p>
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] text-gray-600 font-mono">14m ago</span>
                        <div className="flex -space-x-1">
                            <div className="size-4 rounded-full border border-[#101622] bg-blue-500 flex items-center justify-center text-[8px] text-white font-bold">AI</div>
                        </div>
                    </div>
                </div>
                {/* List Item 2 */}
                <div className="p-4 border-b border-[#282e39] hover:bg-[#1c2433]/30 cursor-pointer transition-colors">
                    <div className="flex justify-between items-start mb-1">
                        <p className="text-white text-sm font-semibold">David Miller</p>
                        <span className="text-[10px] text-yellow-500 font-bold uppercase">Delayed</span>
                    </div>
                    <p className="text-gray-400 text-xs mb-2">Competitor comparison request</p>
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] text-gray-600 font-mono">2h ago</span>
                        <div className="size-4 rounded-full border border-[#101622] bg-gray-600"></div>
                    </div>
                </div>
                {/* List Item 3 */}
                <div className="p-4 border-b border-[#282e39] hover:bg-[#1c2433]/30 cursor-pointer transition-colors">
                    <div className="flex justify-between items-start mb-1">
                        <p className="text-white text-sm font-semibold">Elena Rodriguez</p>
                        <span className="text-[10px] text-red-400 font-bold uppercase">Ghosted</span>
                    </div>
                    <p className="text-gray-400 text-xs mb-2">Demo link sent - No open</p>
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] text-gray-600 font-mono">1d ago</span>
                        <div className="size-4 rounded-full border border-[#101622] bg-gray-600"></div>
                    </div>
                </div>
                {/* List Item 4 */}
                <div className="p-4 border-b border-[#282e39] hover:bg-[#1c2433]/30 cursor-pointer transition-colors">
                    <div className="flex justify-between items-start mb-1">
                        <p className="text-white text-sm font-semibold">TechFlow Solutions</p>
                        <span className="text-[10px] text-primary font-bold uppercase">Actionable</span>
                    </div>
                    <p className="text-gray-400 text-xs mb-2">Security compliance docs</p>
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] text-gray-600 font-mono">5m ago</span>
                        <div className="size-4 rounded-full border border-[#101622] bg-blue-500 flex items-center justify-center text-[8px] text-white font-bold">AI</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
