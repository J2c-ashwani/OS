"use client";

import React from 'react';

export default function RevenueChart() {
    return (
        <div className="h-64 w-full relative">
            {/* Chart Simulation */}
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 200">
                <defs>
                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.2"></stop>
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0"></stop>
                    </linearGradient>
                </defs>
                <path d="M0,180 Q100,160 200,140 T400,110 T600,60 T800,40 T1000,20 L1000,200 L0,200 Z" fill="url(#chartGradient)"></path>
                <path d="M0,180 Q100,160 200,140 T400,110 T600,60 T800,40 T1000,20" fill="none" stroke="#10b981" strokeWidth="3"></path>
            </svg>
            {/* Chart Labels */}
            <div className="flex justify-between mt-4 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
            </div>
        </div>
    );
}
