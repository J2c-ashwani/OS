import Link from 'next/link';

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0B0E13] to-[#0A0A0A] text-gray-200 flex items-center justify-center px-6">
            <div className="max-w-md text-center space-y-6">
                <h1 className="text-3xl font-bold text-white">Pricing</h1>
                <p className="text-gray-400">Pricing details coming soon.</p>
                <Link href="/" className="inline-flex items-center text-emerald-500 hover:text-emerald-400 transition-colors">
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
}
