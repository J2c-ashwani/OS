import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Reset Password | Response Audit',
    description: 'Create a new password for your Response Audit account.',
};

export default function ResetPasswordLayout({ children }: { children: React.ReactNode }) {
    return children;
}
