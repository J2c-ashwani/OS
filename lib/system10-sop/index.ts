import { Business } from '../../types';

export interface SOPViolation {
    ruleId: string;
    description: string;
    detectedAt: Date;
}

export class SOPEnforcer {
    checkCompliance(businessId: string): SOPViolation[] {
        console.log(`[SYSTEM 10] Running SOP compliance check for ${businessId}`);

        // Mock Logic: Check if they responded within SLA
        // Returns dummy violations for demo
        if (Math.random() > 0.5) {
            return [{
                ruleId: 'SOP-001',
                description: 'Response time exceeded 2 hour SLA',
                detectedAt: new Date()
            }];
        }
        return [];
    }
}
