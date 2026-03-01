'use client'

import { Mail, Shield, Bell, BarChart3, ArrowRight, X, Lock, CheckCircle2, AlertTriangle, Clock, Bot } from 'lucide-react'
import Link from 'next/link'

interface PostAuditBridgeProps {
    email: string
    businessUrl: string
    onClose: () => void
}

export default function PostAuditBridge({ email, businessUrl, onClose }: PostAuditBridgeProps) {
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 md:p-6 animate-in fade-in duration-300 overflow-y-auto">
            <div className="bg-white dark:bg-[#0B0E13] border border-slate-200 dark:border-gray-800 rounded-2xl max-w-4xl w-full relative animate-in slide-in-from-bottom-4 duration-500 shadow-2xl flex flex-col md:flex-row overflow-hidden my-auto">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors z-10"
                    aria-label="Close"
                >
                    <X size={24} />
                </button>

                {/* Left Column: The Teaser & Blur */}
                <div className="flex-1 p-8 md:p-10 border-b md:border-b-0 md:border-r border-slate-200 dark:border-gray-800 relative bg-slate-50 dark:bg-[#0A0A0A]">
                    <div className="mb-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-500 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-200 dark:border-emerald-500/20">
                            <CheckCircle2 size={14} /> Report Dispatched to {email}
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                            Initial Scan Results
                        </h2>
                        <p className="text-slate-500 dark:text-gray-400 font-medium">
                            Target: <span className="text-slate-700 dark:text-white font-bold">{businessUrl}</span>
                        </p>
                    </div>

                    <div className="space-y-4 relative">
                        {/* Finding 1: Revealed */}
                        <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 p-5 rounded-xl shadow-sm">
                            <div className="flex items-start gap-3">
                                <div className="mt-1 text-red-500 bg-red-50 dark:bg-red-500/10 p-2 rounded-lg">
                                    <Clock size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">Response Latency Unmonitored</h4>
                                    <p className="text-sm text-slate-500 dark:text-gray-400">
                                        Your primary contact channels have no SLA tracking attached. Leads that aren't answered within 5 minutes drop in conversion probability by 80%.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Finding 2: Blurred */}
                        <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 p-5 rounded-xl shadow-sm select-none filter blur-[4px] opacity-70">
                            <div className="flex items-start gap-3">
                                <div className="mt-1 text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10 p-2 rounded-lg">
                                    <AlertTriangle size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">Hidden Revenue Leak Detected</h4>
                                    <p className="text-sm text-slate-500 dark:text-gray-400">
                                        We simulated a customer journey and found a critical drop-off point where intent-driven traffic is bouncing before capturing data.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Finding 3: Blurred */}
                        <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 p-5 rounded-xl shadow-sm select-none filter blur-[6px] opacity-50">
                            <div className="flex items-start gap-3">
                                <div className="mt-1 text-blue-500 bg-blue-50 dark:bg-blue-500/10 p-2 rounded-lg">
                                    <Shield size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">SOP Compliance Failure</h4>
                                    <p className="text-sm text-slate-500 dark:text-gray-400">
                                        Your auto-responders do not meet the minimum engagement criteria established by top-performing competitors in your specific industry.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Overlay Paywall */}
                        <div className="absolute inset-0 top-[40%] bg-gradient-to-t from-slate-50 dark:from-[#0A0A0A] via-slate-50/90 dark:via-[#0A0A0A]/90 to-transparent flex flex-col items-center justify-end pb-8">
                            <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 shadow-xl rounded-2xl p-6 text-center max-w-[90%] transform translate-y-4">
                                <div className="mx-auto w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                                    <Lock size={24} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Unlock Full Audit Results</h3>
                                <p className="text-sm text-slate-500 dark:text-gray-400 mb-6">
                                    There are 3 more critical vulnerabilities detected on your site. Start your trial to see exactly how to fix them and stop losing leads.
                                </p>
                                <Link
                                    href="/pricing"
                                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-primary/20"
                                >
                                    Start Monitoring Now
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Value Props */}
                <div className="flex-1 p-8 md:p-10 flex flex-col justify-center bg-white dark:bg-[#0B0E13]">
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">
                        What happens when you activate Response Audit?
                    </h3>

                    <div className="space-y-8 mb-8">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center shrink-0">
                                <Shield className="dark:text-emerald-500" size={24} />
                            </div>
                            <div>
                                <div className="text-slate-900 dark:text-white font-bold text-lg mb-1">Continuous Monitoring</div>
                                <div className="text-slate-500 dark:text-gray-400 font-medium leading-relaxed mt-1">
                                    We stop doing one-off checks and start pinging your channels 24/7. If a form breaks, you'll know instantly.
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 dark:bg-blue-500/10 rounded-xl flex items-center justify-center shrink-0">
                                <Bot className="dark:text-blue-500" size={24} />
                            </div>
                            <div>
                                <div className="text-slate-900 dark:text-white font-bold text-lg mb-1">AI Mystery Shopper</div>
                                <div className="text-slate-500 dark:text-gray-400 font-medium leading-relaxed mt-1">
                                    Our agents submit test leads and grade your sales team's response time against industry benchmarks.
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 dark:bg-purple-500/10 rounded-xl flex items-center justify-center shrink-0">
                                <BarChart3 className="dark:text-purple-500" size={24} />
                            </div>
                            <div>
                                <div className="text-slate-900 dark:text-white font-bold text-lg mb-1">Revenue Recovery</div>
                                <div className="text-slate-500 dark:text-gray-400 font-medium leading-relaxed mt-1">
                                    Stop losing money to bad operations. We quantify exactly how much revenue you're saving every month.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto">
                        <button
                            onClick={onClose}
                            className="w-full text-slate-500 hover:text-slate-700 dark:text-gray-500 dark:hover:text-gray-300 font-bold text-sm transition-colors py-3 underline underline-offset-4"
                        >
                            No thanks, I'll just wait for the PDF report.
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}
