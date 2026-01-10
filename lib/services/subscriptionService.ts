import { MOCK_SUBSCRIPTIONS } from '@/lib/data/store';

export async function getSubscriptionStatus(businessId?: string): Promise<{ isActive: boolean; plan: string }> {
    // For this demo, we'll check against our mock store or default to free
    // Default ID for the demo "logged in" user if none provided
    const targetId = businessId || 'b1';

    const subscription = MOCK_SUBSCRIPTIONS.find(s => s.businessId === targetId && s.status === 'ACTIVE');

    if (subscription) {
        return { isActive: true, plan: subscription.plan };
    }

    return { isActive: false, plan: 'FREE' };
}
