import { jsPDF } from 'jspdf';
import { Business, Gap } from '@prisma/client';

// Risk severity calculation based on gaps
function calculateRiskSeverity(gaps: Gap[]): 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' {
    if (gaps.length === 0) return 'LOW';

    const hasHighSeverity = gaps.some(g => g.severity === 'HIGH');
    const hasCriticalType = gaps.some(g =>
        g.type === 'BROKEN_INFRASTRUCTURE' || g.type === 'BROKEN_FORM'
    );

    if (hasCriticalType || gaps.length >= 3) return 'CRITICAL';
    if (hasHighSeverity || gaps.length >= 2) return 'HIGH';
    if (gaps.length === 1) return 'MEDIUM';
    return 'LOW';
}

// Estimate compliance exposure in USD
function estimateComplianceExposure(gaps: Gap[]): number {
    let exposure = 0;
    for (const gap of gaps) {
        switch (gap.severity) {
            case 'HIGH':
                exposure += 15000;
                break;
            case 'MEDIUM':
                exposure += 5000;
                break;
            default:
                exposure += 1000;
        }
    }
    // Add multiplier for broken infrastructure
    const hasBrokenInfra = gaps.some(g => g.type === 'BROKEN_INFRASTRUCTURE');
    if (hasBrokenInfra) exposure *= 2;

    return exposure;
}

// Generate unique report ID
function generateReportId(businessId: string): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `AOS-${timestamp}-${random}`;
}

// Format date for filename
function formatDateForFilename(date: Date): string {
    return date.toISOString().split('T')[0].replace(/-/g, '');
}

// Sanitize business name for filename
function sanitizeForFilename(name: string): string {
    return name.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30);
}

export interface PDFReportResult {
    buffer: Buffer;
    filename: string;
    reportId: string;
}

export async function generateRiskReport(
    business: Business & { gaps: Gap[] }
): Promise<PDFReportResult> {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    const gaps = business.gaps;
    const riskSeverity = calculateRiskSeverity(gaps);
    const complianceExposure = estimateComplianceExposure(gaps);
    const reportId = generateReportId(business.id);
    const reportDate = new Date();

    // Colors
    const colors = {
        primary: '#10B981',      // Emerald
        danger: '#EF4444',       // Red
        warning: '#F59E0B',      // Amber
        dark: '#0A0A0A',
        text: '#1F2937',
        lightText: '#6B7280',
        border: '#E5E7EB'
    };

    const severityColors: Record<string, string> = {
        LOW: '#10B981',
        MEDIUM: '#F59E0B',
        HIGH: '#EF4444',
        CRITICAL: '#7C3AED'
    };

    // Page dimensions
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    let y = margin;

    // ========== HEADER ==========
    doc.setFillColor(10, 10, 10);
    doc.rect(0, 0, pageWidth, 45, 'F');

    // Logo placeholder
    doc.setFillColor(16, 185, 129);
    doc.roundedRect(margin, 12, 10, 10, 2, 2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Response Audit', margin + 14, 20);

    // Report title
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(156, 163, 175);
    doc.text('Response Reliability Risk Report', margin + 14, 27);

    // Report ID (right aligned)
    doc.setFontSize(8);
    doc.setTextColor(107, 114, 128);
    doc.text(`Report ID: ${reportId}`, pageWidth - margin, 17, { align: 'right' });
    doc.text(`Generated: ${reportDate.toISOString()}`, pageWidth - margin, 23, { align: 'right' });

    y = 55;

    // ========== BUSINESS INFO ==========
    doc.setTextColor(31, 41, 55);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Subject Business', margin, y);
    y += 8;

    doc.setFontSize(18);
    doc.text(business.name, margin, y);
    y += 7;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(107, 114, 128);
    doc.text(business.websiteUrl, margin, y);
    y += 15;

    // ========== RISK SEVERITY BOX ==========
    const severityColor = severityColors[riskSeverity];

    doc.setFillColor(parseInt(severityColor.slice(1, 3), 16),
        parseInt(severityColor.slice(3, 5), 16),
        parseInt(severityColor.slice(5, 7), 16));
    doc.roundedRect(margin, y, contentWidth, 35, 3, 3, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('OVERALL RISK ASSESSMENT', margin + 10, y + 10);

    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text(riskSeverity, margin + 10, y + 25);

    // Exposure on right side
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('ESTIMATED COMPLIANCE EXPOSURE', pageWidth - margin - 10, y + 10, { align: 'right' });
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(`$${complianceExposure.toLocaleString()}`, pageWidth - margin - 10, y + 25, { align: 'right' });

    y += 45;

    // ========== GAPS TABLE ==========
    doc.setTextColor(31, 41, 55);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Verified Deviations', margin, y);
    y += 8;

    if (gaps.length === 0) {
        doc.setFillColor(236, 253, 245);
        doc.roundedRect(margin, y, contentWidth, 20, 2, 2, 'F');
        doc.setTextColor(16, 185, 129);
        doc.setFontSize(10);
        doc.text('✓ No significant deviations detected in this audit cycle.', margin + 10, y + 12);
        y += 30;
    } else {
        // Table header
        doc.setFillColor(249, 250, 251);
        doc.rect(margin, y, contentWidth, 10, 'F');
        doc.setTextColor(107, 114, 128);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.text('TYPE', margin + 5, y + 7);
        doc.text('SEVERITY', margin + 60, y + 7);
        doc.text('DESCRIPTION', margin + 90, y + 7);
        y += 10;

        // Table rows
        for (const gap of gaps) {
            const rowHeight = 15;

            // Alternating row background
            if (gaps.indexOf(gap) % 2 === 1) {
                doc.setFillColor(249, 250, 251);
                doc.rect(margin, y, contentWidth, rowHeight, 'F');
            }

            doc.setTextColor(31, 41, 55);
            doc.setFontSize(9);
            doc.setFont('helvetica', 'normal');
            doc.text(gap.type.replace(/_/g, ' '), margin + 5, y + 9);

            // Severity badge
            const gapSeverityColor = gap.severity === 'HIGH' ? '#EF4444' :
                gap.severity === 'MEDIUM' ? '#F59E0B' : '#10B981';
            doc.setFillColor(parseInt(gapSeverityColor.slice(1, 3), 16),
                parseInt(gapSeverityColor.slice(3, 5), 16),
                parseInt(gapSeverityColor.slice(5, 7), 16));
            doc.roundedRect(margin + 58, y + 3, 25, 8, 1, 1, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(7);
            doc.text(gap.severity, margin + 62, y + 8.5);

            // Description (truncated)
            doc.setTextColor(107, 114, 128);
            doc.setFontSize(8);
            const desc = gap.description.length > 50 ? gap.description.substring(0, 47) + '...' : gap.description;
            doc.text(desc, margin + 90, y + 9);

            y += rowHeight;
        }
        y += 10;
    }

    // ========== CONSEQUENCES SECTION ==========
    doc.setTextColor(31, 41, 55);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Potential Consequences if Unaddressed', margin, y);
    y += 8;

    doc.setFillColor(254, 243, 199);
    doc.roundedRect(margin, y, contentWidth, 25, 2, 2, 'F');
    doc.setTextColor(146, 64, 14);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    const consequences = [
        '• Lost inquiries due to unmonitored response channels',
        '• Decreased customer trust and satisfaction scores',
        '• Competitive disadvantage from slower response times'
    ];
    let consY = y + 7;
    for (const line of consequences) {
        doc.text(line, margin + 5, consY);
        consY += 6;
    }
    y += 35;

    // ========== CTA SECTION ==========
    doc.setFillColor(236, 253, 245);
    doc.roundedRect(margin, y, contentWidth, 30, 3, 3, 'F');
    doc.setDrawColor(16, 185, 129);
    doc.setLineWidth(0.5);
    doc.roundedRect(margin, y, contentWidth, 30, 3, 3, 'S');

    // Geo-Pricing Logic for PDF
    // Note: In production this would come from business data, simulating here
    // We can infer region from website TLD if available, or default
    const { getPricingByDomain, getScarcityBadge } = require('./geoPricing');
    const pricing = getPricingByDomain(business.websiteUrl);
    const scarcityBadge = getScarcityBadge();

    doc.setTextColor(16, 185, 129);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Enable Continuous Monitoring', margin + 10, y + 10);

    doc.setTextColor(107, 114, 128);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Receive real-time alerts. Starting at $${pricing.currentPrice}/month.`, margin + 10, y + 17);

    // Scarcity Badge in PDF
    doc.setFillColor(239, 68, 68); // Red background
    doc.roundedRect(margin + 10, y + 21, 60, 5, 1, 1, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.text(scarcityBadge, margin + 12, y + 24.5);

    y += 40;

    // ========== FOOTER ==========
    const footerY = doc.internal.pageSize.getHeight() - 20;
    doc.setDrawColor(229, 231, 235);
    doc.setLineWidth(0.3);
    doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);

    doc.setTextColor(156, 163, 175);
    doc.setFontSize(7);
    doc.text(`This report was generated autonomously by the Response Audit System.`, margin, footerY);
    doc.text(`Report ID: ${reportId} | Timestamp: ${reportDate.toISOString()}`, margin, footerY + 5);
    doc.text('© 2026 Response Audit System. All rights reserved.', pageWidth - margin, footerY + 5, { align: 'right' });

    // Digital signature placeholder
    doc.setFontSize(6);
    doc.text(`Digital Signature: SHA256:${Buffer.from(reportId + business.id).toString('base64').substring(0, 32)}...`, margin, footerY + 10);

    // Generate buffer
    const pdfOutput = doc.output('arraybuffer');
    const buffer = Buffer.from(pdfOutput);

    // Generate filename
    const filename = `ResponseAudit_RiskReport_${sanitizeForFilename(business.name)}_${formatDateForFilename(reportDate)}.pdf`;

    return {
        buffer,
        filename,
        reportId
    };
}
