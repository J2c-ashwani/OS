'use client';

import Link from 'next/link';
import { ShieldAlert, ArrowLeft, Terminal } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6 font-sans">
            <div className="max-w-md w-full text-center space-y-8">

                {/* glitched icon container */}
                <div className="relative inline-flex items-center justify-center">
                    <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full animate-pulse"></div>
                    <div className="relative bg-[#111] p-6 rounded-2xl border border-red-900/30">
                        <ShieldAlert size={64} className="text-red-500" />
                    </div>
                    {/* glitched decorative element */}
                    <div className="absolute -top-2 -right-2 bg-red-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full font-mono">
                        ERR_404
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                        Signal Lost
                    </h1>
                    <div className="bg-[#111] border border-gray-800 rounded-lg p-4 font-mono text-xs text-left text-gray-400 overflow-x-auto">
                        <p><span className="text-emerald-500">$</span> initiating_recovery_protocol...</p>
                        <p><span className="text-emerald-500">$</span> scan_target: <span className="text-red-400">unknown_node</span></p>
                        <p><span className="text-emerald-500">$</span> error: neural_link_severed</p>
                        <p className="animate-pulse">_</p>
                    </div>
                    <p className="text-gray-500 text-lg">
                        The requested page could not be located in our diagnostic lattice. It may have been archived or deleted.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/app/dashboard"
                        className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-3 px-8 rounded-lg flex items-center justify-center gap-2 transition-all hover:scale-105"
                    >
                        <Terminal size={18} />
                        Return to Console
                    </Link>
                    <Link
                        href="/"
                        className="bg-[#111] hover:bg-[#222] border border-gray-800 text-white font-medium py-3 px-8 rounded-lg flex items-center justify-center gap-2 transition-all"
                    >
                        <ArrowLeft size={18} />
                        Back to Home
                    </Link>
                </div>

                <div className="text-xs text-gray-700 font-mono pt-8">
                    SYSTEM_ID: BIZ_OS_V1.0 // STATUS: OPERATIONAL
                </div>

            </div>
        </div>
    );
}
