import { db } from '../db';

export async function createOrUpdateBusinessTarget(data: { email: string; websiteUrl: string }) {
    const domain = data.websiteUrl.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
    const normalizedUrl = data.websiteUrl.includes('://') ? data.websiteUrl : `https://${data.websiteUrl}`;

    // 1. Create or Update Business "Target"
    const existing = await db.business.findFirst({ where: { websiteUrl: normalizedUrl } });

    let business;
    if (existing) {
        business = await db.business.update({
            where: { id: existing.id },
            data: { contactEmail: data.email }
        });
    } else {
        business = await db.business.create({
            data: {
                name: domain,
                websiteUrl: normalizedUrl,
                contactEmail: data.email,
                status: 'TARGET',
                primaryChannel: 'EMAIL'
            }
        });
    }

    console.log(`[DB] Saved target business: ${business.id}`);
    return business;
}

export async function createBusiness(data: any) {
    console.log(`[DB] Creating new business: ${data.name}`);
    const normalizedUrl = data.websiteUrl.includes('://') ? data.websiteUrl : `https://${data.websiteUrl}`;

    // Create new business with provided details
    const business = await db.business.create({
        data: {
            name: data.name,
            websiteUrl: normalizedUrl,
            industry: data.industry,
            primaryChannel: data.channel,
            contactEmail: data.channel === 'EMAIL' ? data.channelDetails : undefined,
            contactPhone: data.channel === 'PHONE' ? data.channelDetails : undefined,
            status: 'MONITORED', // Default for added businesses
            address: data.channel === 'MAPS' ? data.channelDetails : undefined,
        }
    });

    // Also trigger an initial diagnostic scan immediately (async)
    // In a real event-driven architecture, this would be an event.
    // For now, we'll just log it.
    console.log(`[EVENT] Business created. Triggering initial scan for ${business.id}`);

    return business;
}

export async function getDashboardStats() {
    const businesses = await db.business.findMany();
    const logs = await db.diagnosticLog.findMany();
    const gaps = await db.gap.findMany();

    return {
        activeTargets: businesses.length,
        diagnosticsRun: logs.length,
        gapsIdentified: gaps.length,
        outreachSent: 0,
        businesses: businesses,
        logs: logs
    };
}
