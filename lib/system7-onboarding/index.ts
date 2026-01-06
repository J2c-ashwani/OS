import { Business } from '../../types';

export interface OnboardingData {
    businessHours: string;
    responseSLA: string; // e.g. "2 hours"
    escalationEmail: string;
}

export class OnboardingManager {
    async collectData(businessId: string, data: OnboardingData): Promise<boolean> {
        console.log(`[SYSTEM 7] Collecting onboarding data for ${businessId}:`, data);
        // In reality, save to DB
        return true;
    }

    async getPendingOnboarding(businessId: string): Promise<boolean> {
        // Mock check if business needs onboarding
        return true;
    }
}
