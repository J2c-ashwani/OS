'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ShieldCheck, Mail, Lock, ArrowRight } from 'lucide-react'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        const result = await signIn('credentials', {
            email,
            password,
            redirect: false
        })

        setIsLoading(false)

        if (result?.error) {
            setError('Invalid email or password')
        } else {
            router.push('/app/dashboard')
            router.refresh()
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0B0E13] to-[#0A0A0A] flex items-center justify-center px-6">
            <div className="max-w-md w-full">
                {/* Logo/Branding */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-emerald-500 hover:text-emerald-400 transition-colors mb-4">
                        <ShieldCheck size={32} />
                        <span className="text-2xl font-bold">Response Audit</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-white mt-6 mb-2">Welcome Back</h1>
                    <p className="text-gray-400">Sign in to access your dashboard</p>
                </div>

                {/* Login Form */}
                <div className="bg-[#111]/50 border border-gray-900 rounded-lg p-8 backdrop-blur-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full bg-[#0A0A0A] border border-gray-800 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:border-emerald-500 focus:outline-none transition-colors"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-[#0A0A0A] border border-gray-800 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:border-emerald-500 focus:outline-none transition-colors"
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-900/20 border border-red-900/40 rounded-lg p-3 text-sm text-red-300">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                            {!isLoading && <ArrowRight size={18} />}
                        </button>
                    </form>

                    {/* Demo Credentials */}
                    <div className="mt-6 pt-6 border-t border-gray-900">
                        <p className="text-xs text-gray-500 mb-3">Demo Credentials:</p>
                        <div className="space-y-2 text-xs">
                            <div className="bg-[#0A0A0A] rounded p-2 border border-gray-900">
                                <div className="text-gray-400">Customer: <span className="text-gray-300">customer@example.com</span></div>
                                <div className="text-gray-400">Password: <span className="text-gray-300">demo</span></div>
                            </div>
                            <div className="bg-[#0A0A0A] rounded p-2 border border-gray-900">
                                <div className="text-gray-400">Admin: <span className="text-gray-300">admin@responseaudit.com</span></div>
                                <div className="text-gray-400">Password: <span className="text-gray-300">admin</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back to Homepage */}
                <div className="mt-6 text-center">
                    <Link href="/" className="text-sm text-gray-500 hover:text-gray-400 transition-colors">
                        ← Back to Homepage
                    </Link>
                </div>
            </div>
        </div>
    )
}
