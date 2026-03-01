"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function UpgradeButton() {
    return (
        <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all transform hover:scale-105"
        >
            <Sparkles size={16} className="text-yellow-300" />
            <span>View Plans & Subscribe</span>
            <ArrowRight size={18} />
        </Link>
    );
}
