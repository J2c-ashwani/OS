"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    CreditCard,
    BarChart3,
    Users,
    Terminal,
    Settings,
    Search,
    Bell
} from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 font-sans antialiased text-slate-900 dark:text-slate-100">
            {/* Sidebar Navigation */}
            <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col shrink-0">
                <div className="p-6 flex items-center gap-3">
                    <div className="size-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                        <Terminal className="text-white" size={20} />
                    </div>
                    <h1 className="font-bold text-lg tracking-tight">Response Audit</h1>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-1">
                    <NavItem href="/admin/dashboard" icon={<LayoutDashboard />} label="Overview" />
                    <NavItem href="/admin/revenue" icon={<BarChart3 />} label="Revenue" />
                    <NavItem href="/admin/console" icon={<Terminal />} label="System Console" />
                </nav>

                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <NavItem href="/admin/system" icon={<Settings />} label="System Settings" />

                    <div className="mt-4 flex items-center gap-3 px-3 py-2">
                        <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-800"></div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-medium truncate">Platform Admin</p>
                            <p className="text-xs text-slate-500 truncate">Owner Access</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`
                flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors
                ${isActive
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                }
            `}
        >
            {React.cloneElement(icon as any, { size: 18 })}
            <span>{label}</span>
        </Link>
    );
}
