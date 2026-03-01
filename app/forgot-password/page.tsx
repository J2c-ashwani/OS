'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShieldCheck, Mail, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email.trim() }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.message || 'Something went wrong')
                setIsLoading(false)
                return
            }

            setIsSubmitted(true)
        } catch {
            setError('Network error. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

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
                    {isSubmitted ? (
                        /* Success State */
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle size={32} className="text-emerald-400" />
                            </div>
                            <h1 className="text-2xl font-bold text-white">Check Your Email</h1>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                If an account exists for <span className="text-white font-medium">{email}</span>, we&apos;ve sent a password reset link. The link expires in 1 hour.
                            </p>
                            <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-3 text-sm text-blue-300">
                                💡 <strong>Dev Mode:</strong> Check the server console for the reset link.
                            </div>
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-2 text-primary hover:text-blue-400 font-medium text-sm transition-colors mt-4"
                            >
                                <ArrowLeft size={16} />
                                Back to Sign In
                            </Link>
                        </div>
                    ) : (
                        /* Form State */
                        <>
                            <h1 className="text-2xl font-bold text-white mb-2">Forgot Password?</h1>
                            <p className="text-gray-400 text-sm mb-6">
                                Enter your email and we&apos;ll send you a link to reset your password.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" size={18} />
                                        <input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@example.com"
                                            required
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
                                    {isLoading ? 'Sending...' : 'Send Reset Link'}
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
                </div>
            </div>
        </div>
    )
}
