'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ShieldCheck, Lock, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react'

function ResetPasswordForm() {
    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        setIsLoading(true)

        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.message || 'Failed to reset password')
                setIsLoading(false)
                return
            }

            setIsSuccess(true)
        } catch {
            setError('Network error. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    if (!token) {
        return (
            <div className="text-center space-y-4">
                <h1 className="text-2xl font-bold text-white">Invalid Reset Link</h1>
                <p className="text-gray-400 text-sm">
                    This password reset link is missing or invalid. Please request a new one.
                </p>
                <Link
                    href="/forgot-password"
                    className="inline-flex items-center gap-2 text-primary hover:text-blue-400 font-medium text-sm transition-colors"
                >
                    Request New Reset Link
                    <ArrowRight size={16} />
                </Link>
            </div>
        )
    }

    return (
        <>
            {isSuccess ? (
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle size={32} className="text-emerald-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Password Reset!</h1>
                    <p className="text-gray-400 text-sm">
                        Your password has been successfully updated. You can now sign in with your new password.
                    </p>
                    <Link
                        href="/login"
                        className="inline-flex items-center gap-2 bg-primary hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-primary/20"
                    >
                        Sign In
                        <ArrowRight size={18} />
                    </Link>
                </div>
            ) : (
                <>
                    <h1 className="text-2xl font-bold text-white mb-2">Set New Password</h1>
                    <p className="text-gray-400 text-sm mb-6">
                        Enter your new password below. Must be at least 6 characters.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                New Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" size={18} />
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                    className="w-full bg-[#0A0A0A] border border-gray-800 rounded-lg pl-10 py-3 text-white placeholder:text-gray-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                                    style={{ paddingLeft: '2.5rem', color: '#ffffff' }}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" size={18} />
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                    className="w-full bg-[#0A0A0A] border border-gray-800 rounded-lg pl-10 py-3 text-white placeholder:text-gray-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                                    style={{ paddingLeft: '2.5rem', color: '#ffffff' }}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-900/20 border border-red-900/40 rounded-lg p-3 text-sm text-red-300">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
                        >
                            {isLoading ? 'Resetting...' : 'Reset Password'}
                            {!isLoading && <ArrowRight size={18} />}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link
                            href="/login"
                            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors"
                        >
                            <ArrowLeft size={14} />
                            Back to Sign In
                        </Link>
                    </div>
                </>
            )}
        </>
    )
}

export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0B0E13] to-[#0A0A0A] flex items-center justify-center px-6">
            <div className="max-w-md w-full">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-blue-500 transition-colors mb-4">
                        <ShieldCheck size={32} />
                        <span className="text-2xl font-bold">Response Audit</span>
                    </Link>
                </div>

                <div className="bg-[#111]/50 border border-gray-900 rounded-lg p-8 backdrop-blur-sm">
                    <Suspense fallback={
                        <div className="text-center py-8">
                            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                            <p className="text-gray-400 text-sm">Loading...</p>
                        </div>
                    }>
                        <ResetPasswordForm />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}
