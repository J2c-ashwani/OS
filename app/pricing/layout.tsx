import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pricing | Response Audit',
    description: 'Simple, transparent pricing for Response Audit. Cancel anytime, no contracts. See how much revenue you can recover with our AI-powered monitoring.',
    openGraph: {
        title: 'Pricing | Response Audit',
        description: 'Simple, transparent pricing for AI-powered response monitoring. Cancel anytime.',
    },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
    return children;
}
