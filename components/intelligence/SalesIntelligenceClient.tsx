"use client";

import React from 'react';
import MissedLeadCard from '@/components/intelligence/hub/MissedLeadCard';
import { Search, Bell, Filter, LayoutGrid, List, CheckCheck, Clock, DollarSign, Calendar } from 'lucide-react';

export default function SalesIntelligenceClient() {
    // Mock Data for the Hub
    const missedLeads = [
        {
            id: '1',
            name: 'John Smith',
            avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7BX-F9093TqY0r3qv9df1K1m5TuVyjMifzMqBSdq3eWZ_DVrIom-HTQzAuA-i5sG5h6aojFbthl00_psLWByVBAoaYmSOzE5vRXUjjXXQDTw_2wNghsbv4t75QBOJTeNxVPu3msK7TXVOmNYllMXo-ICv9BGc7gQNry6gvf7EjOX3AfuhY99CVyk6dtsUxAu_I2m0URG_uUseQ2QF0zKWQt7cYCnDDozp9e_Xfx36D-cEdaPpz5SiEjJRHyj1WpVH3zAF6IvoT_Y',
            status: 'High Intent',
            inactiveTime: '4h',
            missQuery: "Wait, how much is the deposit? I need to know before booking.",
            aiResponse: "The deposit is $500, fully refundable up to 48h before. Would you like the secure link to lock in your date?"
        },
        {
            id: '2',
            name: 'Sarah Jenkins',
            avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCG3RiVhcco2u-KOZla6IaJrPx0B3QDZJ2QwCQtylDz_It7zOZ6NNoqDKk3q6LbIlvr7gaxuWCeWjjqDGHO8GGmckC1_0d8UbKaVinA0NQg9N0GA-QtVYDrDUBMn5OhV_VxgPqzYXF7aPwNbYhVQ50khPKi0gOzCbx4Hv9563a-YUQWSoq4-QVlKuYVlD-U6sL9KHpHpDqspl1O8R_CjGR5GMyCYqL7PJamUTZmsl8vEc51qe9rvjua4qWozwWg-q4ToWpx-Q_MmAs',
            status: 'At Risk',
            inactiveTime: '2h',
            missQuery: "Do you have availability on Friday? My manager needs an answer.",
            aiResponse: "Hi Sarah! Yes, we have two slots open Friday morning. Should I pencil you in for 10 AM?"
        },
        {
            id: '3',
            name: 'Mike Ross',
            avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5DvHc5mzVRvi5CK0tc_jveMFX6eIQKv3A1dPqLS0Cdbw6VefUNUf_hL72DV_qOS5Z39zZYxUxEhlI9BK7U9qWxpFCxmZWVFNlQnAdfNn1WW17EGpBvJGbEHrDFNsfdnQxEeeMxv-Xd5vPpds9k1LEw7FcWUOpBB5qN9BWj3eTeXEtewM_VFR-sZwDBwdc4g8tHP9VOZp9Wwi7o9tjWqQF3keGjDktgJ73TUxgrzhPBdY9zWI5S96_bLhBc45_iILok_3jdJPm110',
            status: 'Med Intent',
            inactiveTime: '6h',
            missQuery: "Is the warranty included in the base price?",
            aiResponse: "Great question, Mike. The 2-year warranty is fully included at no extra cost. Would you like to see the coverage details?"
        },
        {
            id: '4',
            name: 'Elena Gilbert',
            avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAltSpUZmlZFRISL6MsMUXrWK_bS_ocOi42HaxAXAgSqJixHIPH7cme4rnB_31TD-SbTBG9lcHa-qKztwYoQl5Sx2BIQbQwy7iOXGGX8vKi3OGVyGGI3wxbt_cuectPMV-bZBFXD1BXA9Uk7UO93jTbVr424rD2XKuowV9C21szB6NjgqCKYlv-yf89rM0Tko8H1ft26XsG4haOs0SO4cFFBjsE_-wgOXt3zNNbtvc4HTQtX-k-7UFhvdqX-ofEvv5BjZyVEqd5Ic',
            status: 'Critical',
            inactiveTime: '1h',
            missQuery: "I need to speak with my manager first. Can you send a PDF summary?",
            aiResponse: "I've just attached the PDF summary here. I can also jump on a 5-min call with your manager if that helps. Any specific questions?"
        },
        {
            id: '5',
            name: 'Marcus Lee',
            avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDC2jwMD85j79-VcAUpJjjTzMC1iosqzR5cEGlikNDbWdhHEUWwXQHZIyQFrowr0aZRw66DtqHm39e6ySnBuTYV_s5Bn7Vo01e86uiPiBHV1xZ2CzP9QSg5J2j4pfbxDJp9X7vxUQ1MQ7OsrqD1WogxcJJRVso_uYp79JOuSHLCmeJ1fw7DAsAFpkycmRBgDM5VTSazpFaalVweEFmHZnZt4sNDwpjEBTDUoOWl3UbTIR8UtZHFD7a8M8reoYbDZu2YNdA3BEhg8n0',
            status: 'Follow Up',
            inactiveTime: '12h',
            missQuery: "Thanks, I'll let you know.",
            aiResponse: "Understood! Before you go, would it be helpful if I sent over our case studies for similar projects?"
        },
        {
            id: '6',
            name: 'Alice Wong',
            avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDx_RgTWN1GI9jtRZBXIsMUzNHfu2Pxmt1GiW2oytCLrt_4hlF4DF149IhRaO8gi6QVluDP25z9j6c_eQIbBgoz8EINrvDYORZaAMqXc-tUfkWnzM8vioDKkFFqiyNGJz19LFlfgztH9NGz_mGZS3_OX17yzq8kkHQWzT8688xznFgUiXndpnWrdy-YzkVl0lGAoQIOxHWKaGt6JL92IeJ1GzwyD6VZggWtYfpU_NEYPhAEQmBRwCB-ATfSmhfV9lWdZewbbC5swMc',
            status: 'High Intent',
            inactiveTime: '3h',
            missQuery: "Can I pay with AMEX?",
            aiResponse: "Yes, we accept all major credit cards including AMEX. Here's the payment portal link to complete your checkout."
        }
    ] as const;

    return (
        <div className="flex h-screen bg-white dark:bg-[#0b0d11]">
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Navbar */}
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-[#1e293b] bg-white dark:bg-[#0b0d11] px-8 py-3 sticky top-0 z-20">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-4 text-primary">
                            <div className="size-6">
                                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd"></path>
                                </svg>
                            </div>
                            <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Response Audit</h2>
                        </div>
                        <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white pl-8 border-l border-slate-200 dark:border-slate-800">
                            Daily Lead Recovery Hub
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <label className="flex flex-col min-w-40 !h-10 max-w-64">
                            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                                <div className="text-slate-400 dark:text-[#9da6b9] flex border-none bg-slate-100 dark:bg-[#1c1f27] items-center justify-center pl-4 rounded-l-lg">
                                    <Search size={20} />
                                </div>
                                <input
                                    className="form-input flex w-full min-w-0 flex-1 border-none bg-slate-100 dark:bg-[#1c1f27] text-slate-900 dark:text-white focus:ring-0 h-full placeholder:text-slate-400 dark:placeholder:text-[#9da6b9] px-4 rounded-r-lg text-sm font-normal outline-none"
                                    placeholder="Search leads..."
                                    type="text"
                                />
                            </div>
                        </label>
                        <button className="p-2 rounded-lg bg-slate-100 dark:bg-[#1c1f27] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#0b0d11]"></span>
                        </button>
                        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-slate-200 dark:border-slate-800" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBWuAnI1i8RYMs_lQLYdAaE7_BCgnSNia5_dWPxTwU2zEe1FNqzggFFPthsKYuZ-MZpb6D694oXKw9VyPpXvIPt_K_oewPsT8B6Nkfn2nq6ixnHgU2OFZlzUg7mtBeJ_JmKLrGbAAs8xGmPDa8WIW3Yb3CEqhdybYBDeJ4pHjtCGZM98jCkZG9SoMgygEa8j13WCyHKe5hBJtLgJzbf1I2zmxvRbMRh-hTAwAh3RvYxeTSJdNReWRhCkg84t7fNagdcXvmLcjsVwFU")' }}></div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-8 relative">
                    <div className="max-w-[1400px] mx-auto">
                        {/* Hero Section */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">12 Dropped Conversations detected today</h2>
                                <div className="flex items-center gap-3">
                                    <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-1 font-medium">
                                        <Calendar size={14} />
                                        Scan Complete: Today, 10:30 AM
                                    </p>
                                    <span className="size-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                                    <p className="text-emerald-500 text-sm font-bold flex items-center gap-1">
                                        <DollarSign size={14} />
                                        $4,200 Est. Recoverable Revenue
                                    </p>
                                </div>
                            </div>

                            {/* Global Actions Toolbar */}
                            <div className="flex items-center gap-3">
                                <div className="flex bg-slate-100 dark:bg-[#1c1f27] p-1 rounded-lg border border-slate-200 dark:border-slate-800">
                                    <button className="p-2 text-slate-400 hover:text-primary transition-colors"><Filter size={18} /></button>
                                    <button className="p-2 text-slate-400 hover:text-primary transition-colors"><List size={18} /></button>
                                    <button className="p-2 text-primary bg-white dark:bg-slate-800 rounded shadow-sm transition-colors"><LayoutGrid size={18} /></button>
                                </div>
                                <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-lg hover:shadow-primary/25 active:scale-95">
                                    <CheckCheck size={16} />
                                    Approve All Suggestions
                                </button>
                            </div>
                        </div>

                        {/* Critical Miss Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {missedLeads.map((lead) => (
                                <MissedLeadCard
                                    key={lead.id}
                                    id={lead.id}
                                    name={lead.name}
                                    avatarUrl={lead.avatarUrl}
                                    status={lead.status}
                                    inactiveTime={lead.inactiveTime}
                                    missQuery={lead.missQuery}
                                    aiResponse={lead.aiResponse}
                                />
                            ))}
                        </div>

                        {/* Footer Stats */}
                        <div className="mt-12 p-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap justify-center gap-16 text-center">
                            <div>
                                <p className="text-3xl font-black text-slate-900 dark:text-white">84%</p>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Recovery Rate</p>
                            </div>
                            <div className="hidden md:block w-px h-12 bg-slate-200 dark:bg-slate-800"></div>
                            <div>
                                <p className="text-3xl font-black text-slate-900 dark:text-white">14m</p>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Avg. Recovery Time</p>
                            </div>
                            <div className="hidden md:block w-px h-12 bg-slate-200 dark:bg-slate-800"></div>
                            <div>
                                <p className="text-3xl font-black text-emerald-500">$12.5k</p>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Revenue Saved (MTD)</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
