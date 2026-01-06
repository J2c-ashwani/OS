import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function PublicNav() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-900 bg-[#0A0A0A]/80 backdrop-blur supports-[backdrop-filter]:bg-[#0A0A0A]/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <ShieldCheck size={24} className="text-emerald-500" />
                    <span className="text-lg font-bold text-white">Response Audit</span>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                        Home
                    </Link>
                    <Link href="/about" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                        About
                    </Link>
                    <Link href="/pricing" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                        Pricing
                    </Link>
                    <Link href="/contact" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                        Contact
                    </Link>
                </nav>

                {/* CTA */}
                <div className="hidden md:block">
                    <Link
                        href="/#audit"
                        className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-600 transition-colors"
                    >
                        Run Free Audit
                    </Link>
                </div>

                {/* Mobile Menu - Simplified */}
                <div className="md:hidden">
                    <Link
                        href="/#audit"
                        className="text-sm font-semibold text-emerald-500 hover:text-emerald-400"
                    >
                        Run Audit
                    </Link>
                </div>
            </div>
        </header>
    );
}
