'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Activity, Settings, Bell, ShieldAlert, LogOut, LineChart, Filter, FileText, Menu, X } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();

    return (
        <div className="flex h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-hidden">
            {/* Mobile Header */}
            <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 border-b border-slate-800 z-40 flex items-center justify-between px-4">
                <div className="flex items-center gap-2 font-bold text-emerald-400">
                    <ShieldAlert className="w-6 h-6" />
                    <span>Response Audit</span>
                </div>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </header>

            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out
                    md:relative md:translate-x-0
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                <div className="p-6 border-b border-slate-800 hidden md:block">
                    <h1 className="text-xl font-bold tracking-tight text-emerald-400 flex items-center gap-2">
                        <ShieldAlert className="w-6 h-6" />
                        <span className="truncate">
                            Response Audit Agent
                        </span>
                    </h1>
                    <p className="text-xs text-slate-500 mt-1">Autonomous Auditor v0.1</p>
                </div>

                <div className="p-4 md:hidden border-b border-slate-800 flex items-center justify-between">
                    <span className="font-bold text-emerald-400">Navigation</span>
                    <button onClick={() => setIsSidebarOpen(false)} className="text-slate-400"><X size={20} /></button>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <NavItem href="/app/dashboard" icon={<LayoutDashboard />} label="Dashboard" active={pathname === '/app/dashboard'} onClick={() => setIsSidebarOpen(false)} />
                    <NavItem href="/app/funnel" icon={<Filter />} label="Funnel Tracker" active={pathname.startsWith('/app/funnel')} onClick={() => setIsSidebarOpen(false)} />
                    <NavItem href="/app/roi" icon={<LineChart />} label="ROI Tracker" active={pathname.startsWith('/app/roi')} onClick={() => setIsSidebarOpen(false)} />
                    <NavItem href="/app/sop" icon={<ShieldAlert />} label="SOP Enforcement" active={pathname.startsWith('/app/sop')} onClick={() => setIsSidebarOpen(false)} />
                    <NavItem href="/app/reports" icon={<FileText />} label="Reports" active={pathname.startsWith('/app/reports')} onClick={() => setIsSidebarOpen(false)} />
                    <NavItem href="/app/intelligence" icon={<LineChart />} label="Intelligence" active={pathname.startsWith('/app/intelligence')} onClick={() => setIsSidebarOpen(false)} />
                    <NavItem href="/app/businesses" icon={<Users />} label="Businesses" active={pathname.startsWith('/app/businesses')} onClick={() => setIsSidebarOpen(false)} />
                    <NavItem href="/app/monitoring" icon={<Activity />} label="Health Checks" active={pathname.startsWith('/app/monitoring')} onClick={() => setIsSidebarOpen(false)} />
                    <NavItem href="/app/alerts" icon={<Bell />} label="Alerts" active={pathname.startsWith('/app/alerts')} onClick={() => setIsSidebarOpen(false)} />
                    <NavItem href="/app/settings" icon={<Settings />} label="Settings" active={pathname.startsWith('/app/settings')} onClick={() => setIsSidebarOpen(false)} />
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <div className="bg-slate-800/50 rounded p-3 text-xs text-slate-400 mb-3">
                        <p className="font-semibold text-slate-300">System Status</p>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            Running (Daemon)
                        </div>
                        <div className="mt-2">
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                                Response Audit
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={() => signOut({ callbackUrl: window.location.origin })}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-red-400 hover:bg-red-500/10 hover:text-red-300"
                    >
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-slate-950 w-full">
                <div className="md:hidden h-16" /> {/* Spacer for header */}
                <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}

function NavItem({ href, icon, label, active = false, onClick }: { href: string; icon: React.ReactNode; label: string; active?: boolean, onClick?: () => void }) {
    return (
        <Link
            href={href}
            onClick={onClick}
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
