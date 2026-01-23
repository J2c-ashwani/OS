
import { Business } from '@prisma/client';

export interface ScrapedLead {
    name: string;
    websiteUrl: string;
    address: string;
    phone: string;
    industry: string;
    source: string;
    country: string;
    score: number;
}

/**
 * Service to find new business leads automatically.
 * In a production environment, this would connect to Google Places API, Yelp, or a dataset provider.
 */
export class LeadScraper {

    // Expanded Location Database with Region Metadata
    private locations = [
        // HIGH VALUE (Tier 1: $499/mo)
        { city: 'San Francisco', country: 'US', tier: 'TIER_1' },
        { city: 'New York', country: 'US', tier: 'TIER_1' },
        { city: 'London', country: 'GB', tier: 'TIER_1' },
        { city: 'Toronto', country: 'CA', tier: 'TIER_1' },
        { city: 'Sydney', country: 'AU', tier: 'TIER_1' },
        { city: 'Austin', country: 'US', tier: 'TIER_1' },
        // EMERGING (Tier 2: $99/mo)
        { city: 'Bangalore', country: 'IN', tier: 'TIER_2' },
        { city: 'Mumbai', country: 'IN', tier: 'TIER_2' },
        { city: 'Sao Paulo', country: 'BR', tier: 'TIER_2' },
        { city: 'Manila', country: 'PH', tier: 'TIER_2' }
    ];

    private niches = ['Dentist', 'Plumber', 'HVAC', 'Lawyer', 'Real Estate Agent', 'Chiropractor', 'SaaS', 'Marketing Agency'];

    /**
     * Calculates a Lead Score (0-100) to prioritize outreach.
     */
    private calculateScore(lead: Omit<ScrapedLead, 'score'>): number {
        let score = 50; // Base score

        // 1. GEO SCORING (Max +30)
        // US/CA/UK/AU -> Higher probability of $499 conversion
        if (['US', 'CA', 'GB', 'AU'].includes(lead.country)) {
            score += 30;
        } else if (['IN', 'BR'].includes(lead.country)) {
            score += 10;
        }

        // 2. INDUSTRY SCORING (Max +20)
        // High ticket / Urgent service industries preferred
        const highValueNiches = ['Lawyer', 'Dentist', 'SaaS', 'Real Estate Agent'];
        if (highValueNiches.includes(lead.industry)) {
            score += 20;
        }

        return Math.min(score, 100);
    }

    // Simulate finding leads from a "Search Engine"
    async findLeads(count: number = 5): Promise<ScrapedLead[]> {
        console.log(`[SCRAPER] Starting autonomous search for ${count} new leads...`);

        const leads: ScrapedLead[] = [];

        for (let i = 0; i < count; i++) {
            // Weighted random to prefer Tier 1 locations (70% chance)
            const preferTier1 = Math.random() > 0.3;
            const validLocations = this.locations.filter(l => preferTier1 ? l.tier === 'TIER_1' : l.tier === 'TIER_2');
            const location = validLocations[Math.floor(Math.random() * validLocations.length)];

            const niche = this.niches[Math.floor(Math.random() * this.niches.length)];
            const businessName = `${location.city} ${niche} Specialists ${Math.floor(Math.random() * 1000)}`;

            // Domain generation based on country
            let tld = 'com';
            if (location.country === 'GB') tld = 'co.uk';
            if (location.country === 'AU') tld = 'com.au';
            if (location.country === 'IN') tld = 'in';
            if (location.country === 'CA') tld = 'ca';

            const domain = businessName.toLowerCase().replace(/ /g, '') + '.' + tld;

            const leadProp: Omit<ScrapedLead, 'score'> = {
                name: businessName,
                websiteUrl: `https://www.${domain}`,
                address: `${Math.floor(Math.random() * 9000) + 100} Main St, ${location.city}, ${location.country}`,
                phone: `(555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
                industry: niche,
                country: location.country,
                source: 'Autonomous-Scraper-v2'
            };

            const score = this.calculateScore(leadProp);
            leads.push({ ...leadProp, score });

            // Simulate network latency
            await new Promise(r => setTimeout(r, 200));
        }

        // Sort by Score (High to Low)
        leads.sort((a, b) => b.score - a.score);

        console.log(`[SCRAPER] Found ${leads.length} leads. Top Score: ${leads[0]?.score}`);
        return leads;
    }
}

export const scraperService = new LeadScraper();
