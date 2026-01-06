import { Business, Subscription } from '../../types';
import { MOCK_SUBSCRIPTIONS, MOCK_BUSINESSES } from '../data/store';

export class SubscriptionManager {

    async createPaymentLink(businessId: string): Promise<string> {
        // In a real system, this would call Stripe API
        console.log(`[SYSTEM 6] Generating payment link for business ${businessId}...`);
        return `https://www.paypal.com/checkoutnow?token=mock_token_${businessId}&amount=99.00`;
    }

    async activateSubscription(businessId: string): Promise<Subscription> {
        console.log(`[SYSTEM 6] Payment successful. Activating subscription for ${businessId}...`);

        const business = MOCK_BUSINESSES.find(b => b.id === businessId);
        if (!business) throw new Error('Business not found');

        // Update Business Status
        business.status = 'CUSTOMER';

        // Create Subscription Record
        const sub: Subscription = {
            id: `sub_${Date.now()}`,
            businessId,
            status: 'ACTIVE',
            plan: 'CONTINUOUS_MONITORING',
            amount: 99.00,
            currency: 'USD',
            startedAt: new Date(),
            nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 days
            paymentMethod: 'PAYPAL'
        };

        MOCK_SUBSCRIPTIONS.push(sub);
        return sub;
    }

    // [HARDENED] Payment Discipline Logic
    checkPaymentStatus(sub: Subscription): 'OK' | 'PAUSE' | 'STOP' {
        if (sub.status === 'ACTIVE') return 'OK';

        // Mock failure checks
        const daysOverdue = (Date.now() - sub.nextBillingDate.getTime()) / (1000 * 3600 * 24);

        if (daysOverdue > 14) {
            console.log(`[SYSTEM 6] Subscription ${sub.id} is >14 days overdue. STOP DIAGNOSTICS.`);
            return 'STOP';
        }
        if (daysOverdue > 7) {
            console.log(`[SYSTEM 6] Subscription ${sub.id} is >7 days overdue. PAUSE MONITORING.`);
            return 'PAUSE';
        }

        return 'OK';
    }
}
