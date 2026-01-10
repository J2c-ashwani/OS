
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import PublicReport from '@/components/audit/PublicReport';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ReportPage({ params }: PageProps) {
    // Await params as required in Next.js 15+
    const resolvedParams = await params;

    const business = await db.business.findUnique({
        where: { id: resolvedParams.id },
        include: { gaps: true }
    });

    if (!business) {
        return notFound();
    }

    return <PublicReport business={business} />;
}
