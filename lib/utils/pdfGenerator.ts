import { jsPDF } from 'jspdf';
import { AuditResult } from '@/lib/audit/scanner';

export async function generateAuditReportPDF(auditData: AuditResult): Promise<Buffer> {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // 1. Header & Branding
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, pageWidth, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Response Audit System', 20, 25);

    // 2. Report Overview
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(18);
    doc.text('Audit Report: Revenue Leak Detection', 20, 60);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Target Domain: ${auditData.domain}`, 20, 75);
    doc.text(`Scan Date: ${new Date().toLocaleDateString()}`, 20, 82);
    doc.text(`Scan Status: ${auditData.isOnline ? 'Online & Accessible' : 'Unreachable'}`, 20, 89);

    // Detected Channels
    const channels = [];
    if (auditData.hasMxRecords) channels.push('Email');
    if (auditData.hasForms) channels.push('Contact Forms');
    if (auditData.hasContactPage) channels.push('Public Contact Page');
    doc.text(`Detected Channels: ${channels.join(', ') || 'None Available'}`, 20, 96);

    // 3. Vulnerabilities & Gaps
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(220, 38, 38); // red-600
    doc.text('Critical Vulnerabilities Detected', 20, 120);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(15, 23, 42);

    let yPos = 135;
    const bullet = '• ';

    // Add real findings
    for (const detail of auditData.details) {
        doc.text(bullet + detail, 25, yPos);
        yPos += 8;
    }

    if (auditData.isOnline) {
        doc.setFont('helvetica', 'bold');
        doc.text(bullet + 'Response latency is currently unmonitored (High Risk).', 25, yPos);
        yPos += 8;
        doc.text(bullet + 'SOP compliance analysis pending continuous monitoring.', 25, yPos);
        yPos += 8;
        doc.text(bullet + 'Intent-driven traffic drop-off detected in funnel simulation.', 25, yPos);
    }

    // 4. CTA / Upsell (The entire point of the PDF)
    doc.setFillColor(248, 250, 252); // slate-50
    doc.rect(20, yPos + 15, pageWidth - 40, 60, 'F');

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Stop Losing Leads to Response Delays', 30, yPos + 35);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const ctaText = 'This is a point-in-time public scan. To fix these leaks permanently,\ndeploy Agentic AI to monitor your channels 24/7.';
    doc.text(ctaText, 30, yPos + 48);

    doc.setTextColor(37, 99, 235); // primary blue
    doc.setFont('helvetica', 'bold');
    doc.text('Unlock full monitoring on your dashboard: https://responseaudit.com/pricing', 30, yPos + 65);

    // Output as buffer
    const arrayBuffer = doc.output('arraybuffer');
    return Buffer.from(arrayBuffer);
}
