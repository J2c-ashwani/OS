/**
 * Geo-Based Pricing & Scarcity Configuration
 * 
 * Determines pricing tiers based on geographic region.
 * Used for outreach emails, PDF reports, and checkout flows.
 */

export type PricingTier = 'EMERGING' | 'INTERNATIONAL';

export interface PricingInfo {
    tier: PricingTier;
    currentPrice: number;
    futurePrice: number;
    currency: string;
    savingsPerYear: number;
    region: string;
}

// Countries in emerging markets (lower pricing)
const EMERGING_MARKETS = [
    'IN', // India
    'PK', // Pakistan
    'BD', // Bangladesh
    'LK', // Sri Lanka
    'NP', // Nepal
    'PH', // Philippines
    'ID', // Indonesia
    'VN', // Vietnam
    'TH', // Thailand
    'MY', // Malaysia
    'BR', // Brazil
    'MX', // Mexico
    'AR', // Argentina
    'CO', // Colombia
    'PE', // Peru
    'CL', // Chile
    'ZA', // South Africa
    'NG', // Nigeria
    'KE', // Kenya
    'EG', // Egypt
];

// International markets (premium pricing)
const INTERNATIONAL_MARKETS = [
    'US', // United States
    'CA', // Canada
    'GB', // United Kingdom
    'AU', // Australia
    'NZ', // New Zealand
    'DE', // Germany
    'FR', // France
    'NL', // Netherlands
    'BE', // Belgium
    'CH', // Switzerland
    'AT', // Austria
    'IE', // Ireland
    'SE', // Sweden
    'NO', // Norway
    'DK', // Denmark
    'FI', // Finland
    'IT', // Italy
    'ES', // Spain
    'PT', // Portugal
    'SG', // Singapore
    'JP', // Japan
    'KR', // South Korea
    'AE', // UAE
    'IL', // Israel
];

/**
 * Get pricing info based on country code
 */
export function getPricingByCountry(countryCode: string): PricingInfo {
    const code = countryCode.toUpperCase();

    if (EMERGING_MARKETS.includes(code)) {
        return {
            tier: 'EMERGING',
            currentPrice: 99,
            futurePrice: 199,
            currency: 'USD',
            savingsPerYear: 1200,
            region: 'Emerging Markets'
        };
    }

    // Default to international pricing
    return {
        tier: 'INTERNATIONAL',
        currentPrice: 499,
        futurePrice: 799,
        currency: 'USD',
        savingsPerYear: 3600,
        region: 'International'
    };
}

/**
 * Get pricing info based on email domain TLD or business website
 * Fallback method when country code is not available
 */
export function getPricingByDomain(domain: string): PricingInfo {
    const tld = domain.split('.').pop()?.toLowerCase() || '';

    // Map TLDs to country codes
    const tldToCountry: Record<string, string> = {
        'in': 'IN',
        'co.in': 'IN',
        'pk': 'PK',
        'bd': 'BD',
        'ph': 'PH',
        'id': 'ID',
        'br': 'BR',
        'mx': 'MX',
        'ar': 'AR',
        'za': 'ZA',
        'uk': 'GB',
        'co.uk': 'GB',
        'ca': 'CA',
        'au': 'AU',
        'de': 'DE',
        'fr': 'FR',
        'nl': 'NL',
        'sg': 'SG',
        'jp': 'JP',
    };

    const countryCode = tldToCountry[tld] || 'US'; // Default to US (international pricing)
    return getPricingByCountry(countryCode);
}

/**
 * Founding Client Configuration
 */
export const FOUNDING_CLIENT_CONFIG = {
    totalSpots: 25,
    // In production, this would be fetched from database
    // For now, we'll use a static number that decreases perceived availability
    spotsRemaining: 23,
    offerName: 'Founding Client',
    benefits: [
        'Locked pricing forever',
        'Priority support',
        'Early access to new features',
        'Direct founder access'
    ]
};

/**
 * Generate scarcity message for emails
 */
export function getScarcityMessage(pricing: PricingInfo): string {
    const { currentPrice, futurePrice, savingsPerYear } = pricing;
    const { spotsRemaining, totalSpots } = FOUNDING_CLIENT_CONFIG;

    return `
⚠️ FOUNDING CLIENT OFFER (${spotsRemaining} of ${totalSpots} spots remaining)

Lock in $${currentPrice}/mo pricing FOREVER. First ${totalSpots} clients only.
After that, price increases to $${futurePrice}/mo.

→ You save $${savingsPerYear}/year by joining now.
    `.trim();
}

/**
 * Get short scarcity badge for PDFs
 */
export function getScarcityBadge(): string {
    const { spotsRemaining, totalSpots } = FOUNDING_CLIENT_CONFIG;
    return `FOUNDING CLIENT OFFER • ${spotsRemaining}/${totalSpots} spots left`;
}
