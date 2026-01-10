import { Business } from '../../types';

export interface DecisionMaker {
    name: string;
    email: string;
    role: 'OWNER' | 'CEO' | 'MANAGER' | 'GENERIC' | 'Managing Director' | 'VP of Operations' | 'Founder';
    confidence: number;
}

export class ContactFinder {
    // SIMULATION: In reality, this would scrape 'About' pages, LinkedIn, or use Clearbit/Apollo APIs
    async findDecisionMaker(business: Business): Promise<DecisionMaker> {
        console.log(`[SYSTEM 3] Scouring web for decision maker at ${business.name}...`);

        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Mock logic: generate a "founder" email based on domain
        const domain = business.websiteUrl.replace('https://', '').replace('/', '');

        // 80% chance to find a specific person
        if (Math.random() > 0.2) {
            return {
                name: 'John Doe',
                email: `john.doe@${domain}`,
                role: 'OWNER',
                confidence: 0.95
            };
        } else {
            return {
                name: 'Office Manager',
                email: `info@${domain}`, // Fallback
                role: 'GENERIC',
                confidence: 0.3
            };
        }
    }
}
