'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ShieldCheck, Mail, Lock, ArrowRight, User } from 'lucide-react'

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        if (!isLogin) {
            // Validate name for signup
            if (!name.trim()) {
                setError('Full name is required')
                setIsLoading(false)
                return
            }

            // Registration mode
            try {
                const res = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: name.trim(), email, password }),
                });

                if (!res.ok) {
                    const data = await res.json();
                    setError(data.message || 'Registration failed');
                    setIsLoading(false);
                    return;
                }
            } catch (err) {
                setError('An error occurred during registration');
                setIsLoading(false);
                return;
            }
        }

        // Login (or auto-login after successful registration)
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false
        })

        setIsLoading(false)

        if (result?.error) {
            setError(isLogin ? 'Invalid email or password' : 'Login failed after registration')
        } else {
            // Check onboarding status to decide where to redirect
            try {
                const res = await fetch('/api/auth/onboarding-status')
                const data = await res.json()
                if (data.onboardingComplete) {
                    router.push('/app/dashboard')
                } else {
                    router.push('/app/onboarding/setup')
                }
            } catch {
                // Default to onboarding for new users, dashboard for login
                router.push(isLogin ? '/app/dashboard' : '/app/onboarding/setup')
            }
            router.refresh()
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0B0E13] to-[#0A0A0A] flex items-center justify-center px-6">
            <div className="max-w-md w-full">
                {/* Logo/Branding */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-blue-500 transition-colors mb-4">
                        <ShieldCheck size={32} />
                        <span className="text-2xl font-bold">Response Audit</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-white mt-6 mb-2">
                        {isLogin ? 'Welcome Back' : 'Create Your Account'}
                    </h1>
                    <p className="text-gray-400">
                        {isLogin ? 'Sign in to access your dashboard' : 'Start monitoring your business in minutes'}
                    </p>
                </div>

                {/* Login Form */}
                <div className="bg-[#111]/50 border border-gray-900 rounded-lg p-8 backdrop-blur-sm">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Full Name Field (Signup Only) */}
                        {!isLogin && (
                            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" size={18} />
                                    <input
                                        id="name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="John Smith"
                                        required={!isLogin}
                                        className="w-full bg-[#0A0A0A] border border-gray-800 rounded-lg pl-10 py-3 text-white placeholder:text-gray-600 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                                        style={{ paddingLeft: '2.5rem', color: '#ffffff' }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Email Field */}
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

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                Password
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
                            {!isLogin && (
                                <p className="text-gray-600 text-xs mt-1">Minimum 6 characters</p>
                            )}
                            {isLogin && (
                                <div className="mt-2 text-right">
                                    <Link
                                        href="/forgot-password"
                                        className="text-xs text-gray-500 hover:text-primary transition-colors"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                            )}
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
                            className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
                        >
                            {isLoading ? (isLogin ? 'Signing in...' : 'Creating account...') : (isLogin ? 'Sign In' : 'Create Account & Set Up Business')}
                            {!isLoading && <ArrowRight size={18} />}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-400">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => { setIsLogin(!isLogin); setError(''); }}
                            className="text-primary hover:text-blue-400 font-bold transition-colors"
                        >
                            {isLogin ? 'Sign Up' : 'Sign In'}
                        </button>
                    </div>
                </div>

                {/* Back to Homepage */}
                <div className="mt-8 text-center">
                    <Link href="/" className="text-sm font-medium text-gray-500 hover:text-primary transition-colors">
                        ← Back to Homepage
                    </Link>
                </div>
            </div>
        </div>
    )
}
