'use client'

import Link from 'next/link';
import { LayoutDashboard, Users, Activity, Settings, Bell, ShieldAlert, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-800 bg-slate-900 flex flex-col">
                <div className="p-6 border-b border-slate-800">
                    <h1 className="text-xl font-bold tracking-tight text-emerald-400 flex items-center gap-2">
                        <ShieldAlert className="w-6 h-6" />
                        BizOS Agent
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">Autonomous Auditor v0.1</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <NavItem href="/app/dashboard" icon={<LayoutDashboard />} label="Dashboard" active />
                    <NavItem href="/app/businesses" icon={<Users />} label="Businesses" />
                    <NavItem href="/app/monitoring" icon={<Activity />} label="Health Checks" />
                    <NavItem href="/app/alerts" icon={<Bell />} label="Alerts" />
                    <NavItem href="/app/settings" icon={<Settings />} label="Settings" />
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <div className="bg-slate-800/50 rounded p-3 text-xs text-slate-400 mb-3">
                        <p className="font-semibold text-slate-300">System Status</p>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            Running (Daemon)
                        </div>
                    </div>
                    <button
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-red-400 hover:bg-red-500/10 hover:text-red-300"
                    >
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-slate-950">
                {children}
            </main>
        </div>
    );
}

function NavItem({ href, icon, label, active = false }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
        ${active
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
        >
            {React.cloneElement(icon as React.ReactElement, { size: 18 } as any)}
            {label}
        </Link>
    );
}

import React from 'react';
