
import { Business, Gap } from '@prisma/client';
import { db } from '@/lib/db';

export class OutreachManager {

    /**
     * Generates a personalized cold email for a C-Level executive.
     */
    generateEmail(business: Business & { emailCount: number }, gaps: Gap[]): { subject: string; body: string } | null {
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

        // Geo-Pricing & Scarcity Logic
        const { getPricingByDomain, getScarcityMessage } = require('@/lib/services/geoPricing');
        const pricing = getPricingByDomain(business.websiteUrl);
        const scarcityMsg = getScarcityMessage(pricing);

        // SEQUENCE LOGIC
        const step = business.emailCount || 0;

        // EMAIL 1: INITIAL OUTREACH (Day 0)
        if (step === 0) {
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

${scarcityMsg}

Would you be open to a 30-second automated audit?

Best,
BizOS Agent
                `.trim()
            };
        }

        // EMAIL 2: BUMP / VALUE AD (Day 2)
        if (step === 1) {
            return {
                subject: `[Response Audit] Customer Inquiry Analysis for ${business.name}`,
                body: `
Hi ${firstName},

I wanted to make sure you saw the autonomous risk report I generated for ${business.name} earlier this week.

The diagnostic system flagged a ${primaryGap.severity.toLowerCase()} severity deviation that is likely affecting your conversion rates.

You can still access the secure report here:
${reportUrl}

If you're unsure why this matters: Our data suggests companies with unmonitored response channels lose ~15% of inbound leads.

${scarcityMsg}

Best,
BizOS Agent
                `.trim()
            };
        }

        // EMAIL 3: FINAL / BREAKUP (Day 5)
        if (step === 2) {
            return {
                subject: `Closing ${business.name}'s audit file`,
                body: `
Hi ${firstName},

I haven't heard back, so I'm assuming fixing the detected response gaps at ${business.name} isn't a priority right now.

I'll be archiving your audit file in 24 hours.

If you decide later that you want to automate your reliability monitoring, you can always reactivate your status here:
${reportUrl}

Note: The "Founding Client" locked pricing offer expires when I close this file.

Best,
BizOS Agent
                `.trim()
            };
        }

        return null; // Sequence complete
    }

    /**
     * Simulates sending the email and logging it to the database.
     */
    async sendOutreach(business: Business & { emailCount: number }, gaps: Gap[]) {
        if (!business.contactEmail) {
            console.log(`[OUTREACH] Skipped ${business.name}: No email found.`);
            return false;
        }

        console.log(`[OUTREACH] Generating email for ${business.contactName} (${business.contactEmail})...`);
        const email = this.generateEmail(business, gaps);

        if (!email) {
            console.log(`[OUTREACH] Skipped ${business.name}: No critical gaps found or sequence complete.`);
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

        // Update Business Status & Stats
        await db.business.update({
            where: { id: business.id },
            data: {
                status: 'POC',
                lastEmailedAt: new Date(),
                emailCount: { increment: 1 }
            }
        });

        return true;
    }
}
