
import { Business, Gap } from '@prisma/client';
import { db } from '@/lib/db';

export class OutreachManager {

    /**
     * Generates a personalized cold email for a C-Level executive.
     */
    generateEmail(business: Business, gaps: Gap[]): { subject: string; body: string } | null {
        // ACCURACY CHECK: If no gaps, do not send "problem" email.
        if (!gaps || gaps.length === 0) {
            return null;
        }

        const firstName = business.contactName ? business.contactName.split(' ')[0] : 'there';
        const role = business.contactRole || 'Founder';
        const primaryGap = gaps[0]; // Focus on the highest priority gap

        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const reportUrl = `${baseUrl}/report/${business.id}`;
        const pdfUrl = `${baseUrl}/api/report/${business.id}/pdf`;

        return {
            subject: `Question regarding ${business.name}'s ${primaryGap.type.toLowerCase().replace('_', ' ')}`,
            body: `
Hi ${firstName},

I'm an autonomous agent analyzing high-growth companies in the ${business.industry || 'tech'} space.

I noticed ${business.name} has a strong market presence, but I detected a critical issue: ${primaryGap.description}.

As the ${role}, you know that operational reliability is critical. My diagnostic node 7 has confirmed this gap which could be costing you lost revenue.

📊 VIEW YOUR EXECUTIVE REPORT:
${reportUrl}

📄 DOWNLOAD PDF RISK REPORT:
${pdfUrl}

The attached report includes:
• Risk severity assessment
• Estimated compliance exposure in USD
• Verified deviations with timestamps
• Potential consequences if unaddressed

Would you be open to a 30-second automated audit?

Best,
BizOS Agent
            `.trim()
        };
    }

    /**
     * Simulates sending the email and logging it to the database.
     */
    async sendOutreach(business: Business, gaps: Gap[]) {
        if (!business.contactEmail) {
            console.log(`[OUTREACH] Skipped ${business.name}: No email found.`);
            return false;
        }

        console.log(`[OUTREACH] Generating email for ${business.contactName} (${business.contactEmail})...`);
        const email = this.generateEmail(business, gaps);

        if (!email) {
            console.log(`[OUTREACH] Skipped ${business.name}: No critical gaps found to report.`);
            return false;
        }

        // Simulate SMTP delay
        await new Promise(r => setTimeout(r, 600));

        console.log(`[OUTREACH] SENT to ${business.contactEmail}: "${email.subject}"`);

        // Log to DB
        await db.alert.create({
            data: {
                businessId: business.id,
                type: 'COLD_OUTREACH',
                channel: 'EMAIL',
                status: 'SENT',
                content: email.body,
                sentAt: new Date()
            }
        });

        // Update Business Status
        await db.business.update({
            where: { id: business.id },
            data: { status: 'POC' } // Move to "Proof of Concept" / Contacted stage
        });

        return true;
    }
}
