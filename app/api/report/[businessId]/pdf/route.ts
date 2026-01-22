import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateRiskReport } from '@/lib/services/pdfReportGenerator';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ businessId: string }> }
) {
    try {
        const { businessId } = await params;

        // Fetch business with gaps
        const business = await db.business.findUnique({
            where: { id: businessId },
            include: { gaps: true }
        });

        if (!business) {
            return NextResponse.json(
                { error: 'Business not found' },
                { status: 404 }
            );
        }

        // Generate PDF
        const { buffer, filename, reportId } = await generateRiskReport(business);

        // Log the PDF generation
        console.log(`[PDF] Generated report ${reportId} for ${business.name}`);

        // Convert Buffer to Uint8Array for NextResponse compatibility
        const uint8Array = new Uint8Array(buffer);

        // Return PDF response
        return new NextResponse(uint8Array, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${filename}"`,
                'X-Report-ID': reportId
            }
        });

    } catch (error) {
        console.error('[PDF ERROR]', error);
        return NextResponse.json(
            { error: 'Failed to generate PDF report' },
            { status: 500 }
        );
    }
}
