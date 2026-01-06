import { Business } from '../../types';

export interface FunnelStage {
    name: 'INQUIRY' | 'RESPONSE' | 'FOLLOW_UP' | 'CLOSURE';
    count: number;
    dropOffRate: number;
}

export class FunnelTracker {
    getFunnelReport(businessId: string): FunnelStage[] {
        console.log(`[SYSTEM 9] Generating funnel report for ${businessId}`);

        // Mock Data
        return [
            { name: 'INQUIRY', count: 100, dropOffRate: 0 },
            { name: 'RESPONSE', count: 80, dropOffRate: 0.20 },
            { name: 'FOLLOW_UP', count: 40, dropOffRate: 0.50 }, // Big leak here
            { name: 'CLOSURE', count: 10, dropOffRate: 0.75 }
        ];
    }
}
