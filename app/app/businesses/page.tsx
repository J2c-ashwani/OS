'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Target, Plus, Search, Loader2 } from 'lucide-react';
import { getDashboardStatsAction } from '../../actions';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { EmptyBusinesses } from '@/components/ui/EmptyState';
import AddBusinessWizard from '@/components/onboarding/AddBusinessWizard';

export default function BusinessesPage() {
    const [showWizard, setShowWizard] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'ALL' | 'TARGET' | 'MONITORED' | 'POC' | 'CUSTOMER'>('ALL');

    // Real Data State
    const [businesses, setBusinesses] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const data = await getDashboardStatsAction();
            setBusinesses(data.businesses);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredBusinesses = businesses.filter(biz => {
        const matchesSearch = biz.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            biz.websiteUrl.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'ALL' || biz.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    // Show empty state if no businesses exist at all
    const hasNoBusinesses = businesses.length === 0 && !isLoading;

    return (
        <DashboardLayout>
            <div className="max-w-6xl mx-auto">
                {/* Add Business Wizard Modal */}
                {showWizard && (
                    <AddBusinessWizard
                        onClose={() => setShowWizard(false)}
                        onComplete={() => {
                            setShowWizard(false);
                            fetchData(); // Refresh list
                        }}
                    />
                )}

                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Monitored Businesses</h2>
                    <p className="text-gray-500">Manage businesses you're monitoring for response gaps</p>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="animate-spin text-emerald-500" size={32} />
                    </div>
                ) : hasNoBusinesses ? (
                    <EmptyBusinesses />
                ) : (
                    <>
                        {/* Actions Bar */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="flex-1 relative w-full">
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
                                className="w-full sm:w-auto bg-[#111] border border-gray-800 rounded-lg px-4 py-2.5 text-white focus:border-emerald-500 focus:outline-none"
                            >
                                <option value="ALL">All Status</option>
                                <option value="TARGET">Watching</option>
                                <option value="MONITORED">Active</option>
                                <option value="POC">Trial</option>
                                <option value="CUSTOMER">Subscribed</option>
                            </select>
                            <button
                                onClick={async () => {
                                    const btn = document.getElementById('auto-source-btn');
                                    if (btn) btn.innerText = 'Sourcing...';

                                    try {
                                        const res = await fetch('/api/cron/source-leads');
                                        const data = await res.json();
                                        alert(data.message);
                                        fetchData(); // Refresh list
                                    } catch (e) {
                                        alert('Failed to run autonomous sourcing');
                                    }

                                    if (btn) btn.innerText = 'Auto-Source Leads';
                                }}
                                id="auto-source-btn"
                                className="w-full sm:w-auto bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/50 px-4 py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
                            >
                                <Target size={18} />
                                Auto-Source Leads
                            </button>
                            <button
                                onClick={() => setShowWizard(true)}
                                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-black px-4 py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
                            >
                                <Plus size={18} />
                                Add Business
                            </button>
                        </div>

                        {/* Businesses Grid */}
                        {filteredBusinesses.length === 0 ? (
                            <div className="bg-[#111] border border-gray-800 rounded-lg p-12 text-center">
                                <Target size={48} className="mx-auto mb-4 text-gray-700" />
                                <h3 className="text-xl font-semibold text-white mb-2">No businesses found</h3>
                                <p className="text-gray-500">
                                    {searchTerm ? 'Try adjusting your search or filter' : 'No businesses match the selected filter'}
                                </p>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {filteredBusinesses.map((biz) => (
                                    <div key={biz.id} className="bg-[#111] border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
                                        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                                            <div className="flex-1 min-w-0 w-full">
                                                <div className="flex items-center gap-3 mb-2 flex-wrap">
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
                                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm">
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
                                            <div className="flex gap-2 w-full sm:w-auto">
                                                <Link href={`/app/businesses/${biz.id}`} className="flex-1 sm:flex-initial px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors text-center">
                                                    View Details
                                                </Link>
                                                <button
                                                    onClick={async () => {
                                                        // Simple optimistic feedback
                                                        const btn = document.getElementById(`audit-btn-${biz.id}`);
                                                        if (btn) btn.innerText = 'Running...';

                                                        const { runDiagnosticsAction } = await import('@/app/actions');
                                                        await runDiagnosticsAction();

                                                        if (btn) btn.innerText = 'Run Audit';
                                                        fetchData(); // Refresh to show new logs
                                                    }}
                                                    id={`audit-btn-${biz.id}`}
                                                    className="flex-1 sm:flex-initial px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 rounded-lg text-sm font-medium transition-colors"
                                                >
                                                    Run Audit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Stats Summary - Mobile Responsive Grid */}
                        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-[#111] border border-gray-800 rounded-lg p-4">
                                <div className="text-2xl font-bold text-white">{businesses.length}</div>
                                <div className="text-sm text-gray-500">Total</div>
                            </div>
                            <div className="bg-[#111] border border-gray-800 rounded-lg p-4">
                                <div className="text-2xl font-bold text-emerald-500">
                                    {businesses.filter(b => b.status === 'MONITORED').length}
                                </div>
                                <div className="text-sm text-gray-500">Active</div>
                            </div>
                            <div className="bg-[#111] border border-gray-800 rounded-lg p-4">
                                <div className="text-2xl font-bold text-blue-500">
                                    {businesses.filter(b => b.status === 'TARGET').length}
                                </div>
                                <div className="text-sm text-gray-500">Watching</div>
                            </div>
                            <div className="bg-[#111] border border-gray-800 rounded-lg p-4">
                                <div className="text-2xl font-bold text-purple-500">
                                    {businesses.filter(b => b.status === 'CUSTOMER').length}
                                </div>
                                <div className="text-sm text-gray-500">Customers</div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </DashboardLayout>
    );
}
