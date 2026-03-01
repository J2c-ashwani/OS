import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign In | Response Audit',
    description: 'Sign in to your Response Audit dashboard to monitor customer inquiry response times and recover lost revenue.',
    openGraph: {
        title: 'Sign In | Response Audit',
        description: 'Access your AI-powered response monitoring dashboard.',
    },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return children;
}
