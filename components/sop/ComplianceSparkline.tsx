"use client";

import React from 'react';

export default function ComplianceSparkline() {
    return (
        <div className="flex-1 h-32 relative w-full">
            {/* Sparkline SVG */}
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 100">
                <defs>
                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#135bec" stopOpacity="0.3"></stop>
                        <stop offset="100%" stopColor="#135bec" stopOpacity="0"></stop>
                    </linearGradient>
                </defs>
                <path d="M0,80 Q50,40 100,60 T200,30 T300,50 T400,20 T500,45 T600,10 T700,55 T800,25 T900,40 T1000,35 L1000,100 L0,100 Z" fill="url(#chartGradient)"></path>
                <path d="M0,80 Q50,40 100,60 T200,30 T300,50 T400,20 T500,45 T600,10 T700,55 T800,25 T900,40 T1000,35" fill="none" stroke="#135bec" strokeLinecap="round" strokeWidth="2.5"></path>
            </svg>

            {/* Time labels */}
            <div className="flex justify-between mt-2 text-[10px] text-slate-600 dark:text-slate-400 font-bold tracking-widest uppercase">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00</span>
                <span>18:00</span>
                <span>Current</span>
            </div>
        </div>
    );
}
