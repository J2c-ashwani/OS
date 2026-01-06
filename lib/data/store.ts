import { Business, DiagnosticLog, Gap, Alert } from '../../types';

// In-memory mock store
// [LIVE MODE TRANSITION]
export const SYSTEM_MODE: 'MOCK' | 'LIVE' = 'LIVE';

export const MOCK_BUSINESSES: Business[] = [
    {
        id: 'b1',
        name: 'Acme HVAC Services',
        websiteUrl: 'https://example-acme-hvac.com',
        primaryChannel: 'EMAIL',
        contactEmail: 'info@example-acme-hvac.com',
        status: 'TARGET',
    },
    {
        id: 'b2',
        name: 'Downtown Bistro',
        websiteUrl: 'https://example-downtown-bistro.com',
        primaryChannel: 'FORM',
        status: 'TARGET',
    },
];

export const MOCK_DIAGNOSTICS: DiagnosticLog[] = [];
export const MOCK_GAPS: Gap[] = [];
export const MOCK_ALERTS: Alert[] = [];
export const MOCK_SUBSCRIPTIONS: any[] = []; // Typed as any[] to avoid circular dependency issues locally if types aren't fully propagated yet, but really uses Subscription type
