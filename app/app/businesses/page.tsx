'use client';

import '../../globals.css';
import { useState } from 'react';
import Link from 'next/link';
import { Home, Target, Activity, Bell, Settings, Plus, Search, Filter } from 'lucide-react';
import { MOCK_BUSINESSES } from '@/lib/data/store';

export default function TargetsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'ALL' | 'TARGET' | 'MONITORED' | 'POC' | 'CUSTOMER'>('ALL');

    const filteredBusinesses = MOCK_BUSINESSES.filter(biz => {
        const matchesSearch = biz.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            biz.websiteUrl.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'ALL' || biz.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-gray-200">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-screen w-64 bg-[#111] border-r border-gray-900 p-6">
                <h1 className="text-xl font-bold text-white mb-8">Response Audit</h1>
                <nav className="space-y-2">
                    <Link href="/app/dashboard" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-800 transition-colors text-gray-400">
                        <Home size={18} />
                        <span>Dashboard</span>
                    </Link>
                    <Link href="/app/businesses" className="flex items-center gap-3 px-4 py-2 rounded bg-emerald-500/10 text-emerald-500">
                        <Target size={18} />
                        <span>Businesses</span>
                    </Link>
                    <Link href="/app/monitoring" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-800 transition-colors text-gray-400">
                        <Activity size={18} />
                        <span>Health Checks</span>
                    </Link>
                    <Link href="/app/alerts" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-800 transition-colors text-gray-400">
                        <Bell size={18} />
                        <span>Alerts</span>
                    </Link>
                    <Link href="/app/settings" className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-800 transition-colors text-gray-400">
                        <Settings size={18} />
                        <span>Settings</span>
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="ml-64 p-8" style={{ marginLeft: '16rem', padding: '2rem' }}>
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">Monitored Businesses</h2>
                        <p className="text-gray-500">Manage businesses you're monitoring for response gaps</p>
                    </div>

                    {/* Actions Bar */}
                    <div className="flex gap-4 mb-6">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                            <input
                                type="text"
                                placeholder="Search by name or website..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-[#111] border border-gray-800 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-600 focus:border-emerald-500 focus:outline-none"
                            />
                        </div>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value as any)}
                            className="bg-[#111] border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:border-emerald-500 focus:outline-none"
                        >
                            <option value="ALL">All Status</option>
                            <option value="TARGET">Target</option>
                            <option value="MONITORED">Monitored</option>
                            <option value="POC">POC</option>
                            <option value="CUSTOMER">Customer</option>
                        </select>
                        <button className="bg-emerald-500 hover:bg-emerald-600 text-black px-4 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors">
                            <Plus size={18} />
                            Add Target
                        </button>
                    </div>

                    {/* Targets Grid */}
                    {filteredBusinesses.length === 0 ? (
                        <div className="bg-[#111] border border-gray-800 rounded-lg p-12 text-center">
                            <Target size={48} className="mx-auto mb-4 text-gray-700" />
                            <h3 className="text-xl font-semibold text-white mb-2">No targets found</h3>
                            <p className="text-gray-500 mb-6">
                                {searchTerm ? 'Try adjusting your search' : 'Start by adding your first business target'}
                            </p>
                            <button className="bg-emerald-500 hover:bg-emerald-600 text-black px-6 py-3 rounded-lg font-semibold">
                                Add Your First Target
                            </button>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {filteredBusinesses.map((biz) => (
                                <div key={biz.id} className="bg-[#111] border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 mb-2 flex-wrap" style={{ gap: '0.75rem' }}>
                                                <h3 className="text-lg font-semibold text-white break-words">{biz.name}</h3>
                                                <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${biz.status === 'TARGET' ? 'bg-blue-500/10 text-blue-400' :
                                                    biz.status === 'MONITORED' ? 'bg-emerald-500/10 text-emerald-400' :
                                                        biz.status === 'POC' ? 'bg-yellow-500/10 text-yellow-400' :
                                                            'bg-purple-500/10 text-purple-400'
                                                    }`}>
                                                    {biz.status === 'TARGET' ? 'Watching' :
                                                        biz.status === 'MONITORED' ? 'Active' :
                                                            biz.status === 'POC' ? 'Trial' :
                                                                'Subscribed'}
                                                </span>
                                            </div>
                                            <p className="text-gray-500 text-sm mb-3 break-all">
                                                <a href={biz.websiteUrl} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition-colors">
                                                    {biz.websiteUrl}
                                                </a>
                                            </p>
                                            <div className="flex gap-6 text-sm flex-wrap" style={{ gap: '1.5rem' }}>
                                                {biz.contactEmail && (
                                                    <span className="text-gray-600">
                                                        Email: <span className="text-gray-400 break-words">{biz.contactEmail}</span>
                                                    </span>
                                                )}
                                                <span className="text-gray-600">
                                                    Channel: <span className="text-gray-400">{biz.primaryChannel}</span>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 shrink-0">
                                            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors">
                                                View Details
                                            </button>
                                            <button className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 rounded-lg text-sm font-medium transition-colors">
                                                Run Audit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Stats Summary */}
                    <div className="mt-8 grid grid-cols-4 gap-4">
                        <div className="bg-[#111] border border-gray-800 rounded-lg p-4">
                            <div className="text-2xl font-bold text-white">{MOCK_BUSINESSES.length}</div>
                            <div className="text-sm text-gray-500">Total Targets</div>
                        </div>
                        <div className="bg-[#111] border border-gray-800 rounded-lg p-4">
                            <div className="text-2xl font-bold text-emerald-500">
                                {MOCK_BUSINESSES.filter(b => b.status === 'MONITORED').length}
                            </div>
                            <div className="text-sm text-gray-500">Actively Monitored</div>
                        </div>
                        <div className="bg-[#111] border border-gray-800 rounded-lg p-4">
                            <div className="text-2xl font-bold text-blue-500">
                                {MOCK_BUSINESSES.filter(b => b.status === 'TARGET').length}
                            </div>
                            <div className="text-sm text-gray-500">Prospects</div>
                        </div>
                        <div className="bg-[#111] border border-gray-800 rounded-lg p-4">
                            <div className="text-2xl font-bold text-purple-500">
                                {MOCK_BUSINESSES.filter(b => b.status === 'CUSTOMER').length}
                            </div>
                            <div className="text-sm text-gray-500">Customers</div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
