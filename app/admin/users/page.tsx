'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, Shield, ShieldCheck, Loader2, UserCog, ArrowLeft } from 'lucide-react';

interface User {
    id: string;
    name: string | null;
    email: string;
    role: string;
    onboardingComplete: boolean;
    createdAt: string;
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState<string | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/admin/users');
            if (res.status === 403 || res.status === 401) {
                setError('Access denied. Admin privileges required.');
                setLoading(false);
                return;
            }
            const data = await res.json();
            setUsers(data.users || []);
        } catch {
            setError('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const toggleRole = async (userId: string, currentRole: string) => {
        const newRole = currentRole === 'ADMIN' ? 'CUSTOMER' : 'ADMIN';
        if (newRole === 'ADMIN' && !confirm(`Are you sure you want to grant ADMIN privileges to this user?`)) return;

        setUpdating(userId);
        try {
            const res = await fetch('/api/admin/users', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, role: newRole }),
            });
            const data = await res.json();
            if (res.ok) {
                setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
            } else {
                alert(data.message || 'Failed to update role');
            }
        } catch {
            alert('Failed to update role');
        } finally {
            setUpdating(null);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0B0E13] to-[#0A0A0A] text-gray-200">
            <div className="container mx-auto px-6 py-16 max-w-5xl">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <UserCog size={28} className="text-blue-500" />
                        <h1 className="text-3xl font-bold text-white">User Management</h1>
                    </div>
                    <p className="text-gray-400">Manage user accounts and assign admin roles</p>
                    <Link href="/admin/console" className="text-sm text-emerald-500 hover:text-emerald-400 mt-2 inline-block">
                        <ArrowLeft size={14} className="inline mr-1" />
                        Back to Console
                    </Link>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-4 mb-6">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="animate-spin text-blue-500" size={32} />
                    </div>
                ) : (
                    <div className="bg-[#111]/50 border border-gray-900 rounded-xl overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Users size={18} className="text-gray-400" />
                                <span className="text-sm text-gray-400 font-medium">{users.length} registered users</span>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-left text-gray-500 border-b border-gray-800/50">
                                        <th className="px-6 py-3 font-medium">User</th>
                                        <th className="px-6 py-3 font-medium">Email</th>
                                        <th className="px-6 py-3 font-medium">Role</th>
                                        <th className="px-6 py-3 font-medium">Onboarded</th>
                                        <th className="px-6 py-3 font-medium">Joined</th>
                                        <th className="px-6 py-3 font-medium text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id} className="border-b border-gray-800/30 hover:bg-gray-900/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <span className="text-white font-medium">{user.name || '—'}</span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-400 font-mono text-xs">{user.email}</td>
                                            <td className="px-6 py-4">
                                                {user.role === 'ADMIN' ? (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
                                                        <ShieldCheck size={12} />
                                                        ADMIN
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20">
                                                        <Shield size={12} />
                                                        CUSTOMER
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`text-xs font-bold ${user.onboardingComplete ? 'text-emerald-400' : 'text-gray-600'}`}>
                                                    {user.onboardingComplete ? 'Yes' : 'No'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500 text-xs">
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => toggleRole(user.id, user.role)}
                                                    disabled={updating === user.id}
                                                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors disabled:opacity-50 ${user.role === 'ADMIN'
                                                            ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20'
                                                            : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20'
                                                        }`}
                                                >
                                                    {updating === user.id ? (
                                                        <Loader2 size={12} className="animate-spin inline" />
                                                    ) : user.role === 'ADMIN' ? (
                                                        'Remove Admin'
                                                    ) : (
                                                        'Make Admin'
                                                    )}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
