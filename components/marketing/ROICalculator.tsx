'use client'

import { useState } from 'react'
import { Calculator, ArrowRight, TrendingUp } from 'lucide-react'

export default function ROICalculator() {
    const [monthlyLeads, setMonthlyLeads] = useState<number>(250)
    const [dealSize, setDealSize] = useState<number>(1500)

    // Industry average response leak rate is ~15%
    const leakRate = 0.15
    const lostLeads = Math.round(monthlyLeads * leakRate)
    const lostRevenue = lostLeads * dealSize

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        }).format(amount)
    }

    return (
        <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">

                {/* Left Side: Sliders */}
                <div className="flex-1 w-full space-y-8">
                    <div className="flex items-center gap-3 text-primary mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Calculator size={24} />
                        </div>
                        <h3 className="text-2xl font-black text-white">ROI Calculator</h3>
                    </div>
                    <p className="text-slate-400 font-medium">
                        See exactly how much revenue you're losing to response delays and broken forms every month.
                    </p>

                    <div className="space-y-8 pt-4">
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <label className="text-slate-300 font-bold block">Monthly Inbound Leads</label>
                                <span className="text-2xl font-black text-white">{monthlyLeads}</span>
                            </div>
                            <input
                                type="range"
                                min="10"
                                max="2000"
                                step="10"
                                value={monthlyLeads}
                                onChange={(e) => setMonthlyLeads(parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <label className="text-slate-300 font-bold block">Average Deal Size</label>
                                <span className="text-2xl font-black text-white">{formatCurrency(dealSize)}</span>
                            </div>
                            <input
                                type="range"
                                min="100"
                                max="10000"
                                step="100"
                                value={dealSize}
                                onChange={(e) => setDealSize(parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Side: Results */}
                <div className="flex-1 w-full flex flex-col items-center justify-center p-8 bg-slate-950/50 border border-slate-800 rounded-2xl relative">
                    <div className="text-center space-y-2 mb-8">
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Estimated Monthly Leak</p>
                        <h4 className="text-4xl md:text-5xl font-black text-red-500 tracking-tight">
                            {formatCurrency(lostRevenue)}
                        </h4>
                        <p className="text-slate-500 font-medium text-sm">
                            Based on {lostLeads} leads lost to delays (15% industry avg).
                        </p>
                    </div>

                    <div className="absolute left-[50%] -translate-x-[50%] -translate-y-4 top-[50%]">
                        <div className="bg-slate-800 p-2 rounded-full border-4 border-slate-900">
                            <ArrowRight className="text-slate-400 rotate-90 lg:rotate-0" size={24} />
                        </div>
                    </div>

                    <div className="w-full bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 mt-4">
                        <div className="flex items-start gap-4">
                            <div className="bg-emerald-500/20 text-emerald-500 p-2 rounded-lg mt-1">
                                <TrendingUp size={24} />
                            </div>
                            <div>
                                <h5 className="text-white font-bold text-lg mb-1">Response Audit Impact</h5>
                                <p className="text-emerald-400/80 text-sm font-medium">
                                    A $499 subscription could recover <span className="text-emerald-400 font-bold">{formatCurrency(lostRevenue)}</span> per month by eliminating these leaks. That's a <span className="text-emerald-400 font-bold">{Math.round((lostRevenue / 499) * 100)}%</span> ROI.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
