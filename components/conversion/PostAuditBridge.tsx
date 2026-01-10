'use client'

import { Mail, Shield, Bell, BarChart3, ArrowRight, X } from 'lucide-react'
import Link from 'next/link'

interface PostAuditBridgeProps {
    email: string
    businessUrl: string
    onClose: () => void
}

export default function PostAuditBridge({ email, businessUrl, onClose }: PostAuditBridgeProps) {
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-in fade-in duration-300">
            <div className="bg-gradient-to-b from-[#0B0E13] to-[#0A0A0A] border border-gray-800 rounded-lg max-w-2xl w-full p-8 relative animate-in slide-in-from-bottom-4 duration-500">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 transition-colors"
                    aria-label="Close"
                >
                    <X size={24} />
                </button>

                {/* Success Message */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/10 rounded-full mb-4">
                        <Mail size={32} className="text-emerald-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">
                        Report Sent! Check Your Inbox
                    </h2>
                    <p className="text-gray-400">
                        We've sent the audit report for{' '}
                        <span className="text-white font-medium">{businessUrl}</span> to{' '}
                        <span className="text-emerald-500">{email}</span>
                    </p>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 my-8"></div>

                {/* Value Proposition */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-4 text-center">
                        Want 24/7 Monitoring Instead of One-Time Audits?
                    </h3>

                    <div className="space-y-4 mb-6">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center shrink-0">
                                <Shield className="text-emerald-500" size={20} />
                            </div>
                            <div>
                                <div className="text-white font-medium">Continuous Monitoring</div>
                                <div className="text-sm text-gray-400">
                                    We check your response channels every hour, 24/7
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center shrink-0">
                                <Bell className="text-emerald-500" size={20} />
                            </div>
                            <div>
                                <div className="text-white font-medium">Instant Alerts</div>
                                <div className="text-sm text-gray-400">
                                    Get notified within minutes when response gaps are detected
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center shrink-0">
                                <BarChart3 className="text-emerald-500" size={20} />
                            </div>
                            <div>
                                <div className="text-white font-medium">Response Analytics</div>
                                <div className="text-sm text-gray-400">
                                    Track response times and identify patterns over time
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pricing */}
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-6 mb-6 text-center">
                    <div className="text-4xl font-bold text-white mb-1">
                        $99<span className="text-lg text-gray-400">/month</span>
                    </div>
                    <div className="text-sm text-gray-400">Cancel anytime • No long-term contracts</div>
                </div>

                {/* CTAs */}
                <div className="space-y-3">
                    <Link
                        href="/login?callbackUrl=/app/settings"
                        className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold py-3 rounded-lg transition-colors"
                    >
                        Start Monitoring This Business
                        <ArrowRight size={18} />
                    </Link>

                    <button
                        onClick={onClose}
                        className="w-full text-gray-400 hover:text-gray-300 text-sm transition-colors py-2"
                    >
                        Maybe Later — Just Send Me the Report
                    </button>
                </div>
            </div>
        </div>
    )
}
