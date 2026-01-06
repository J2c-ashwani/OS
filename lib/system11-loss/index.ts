import { Gap } from '../../types';

export interface LossEstimate {
    minMonthlyLoss: number;
    maxMonthlyLoss: number;
    confidence: 'LOW' | 'MEDIUM' | 'HIGH';
    assumptions: string[];
    disclaimer: string;
}

export class LossEstimator {
    estimate(gap: Gap): LossEstimate | null {
        console.log(`[SYSTEM 11] Estimating loss for gap: ${gap.type}`);

        // STRICT ACTIVATION RULE: Only estimate for specific verifiable gaps
        if (!['SLOW_RESPONSE', 'BROKEN_FORM', 'MISSED_FOLLOWUP'].includes(gap.type)) {
            return null;
        }

        // BASELINE BENCHMARKS (Conservative)
        // Avg inquiry value: $100 - $300 (e.g. service calls, bookings)
        // Avg conversion rate: 10% - 20%
        // Missed opportunities per month: derived from gap severity

        let opportunityCountMin = 0;
        let opportunityCountMax = 0;
        let avgValueMin = 100;
        let avgValueMax = 300;
        const assumptions = [];

        if (gap.type === 'SLOW_RESPONSE') {
            // Assumption: 1-3 inquiries per week are lost due to slow response
            opportunityCountMin = 4; // 1 per week
            opportunityCountMax = 12; // 3 per week
            assumptions.push("Assumes 1-3 weekly inquiries abandon due to delay.");
            assumptions.push("Based on industry standard 10-20% conversion rate.");
        } else if (gap.type === 'BROKEN_FORM') {
            // Assumption: Higher loss, as 100% of form attempts fail
            opportunityCountMin = 10;
            opportunityCountMax = 30;
            assumptions.push("Assumes critical blocking of all form submissions.");
        }

        // Calculate Ranges
        const minLoss = opportunityCountMin * avgValueMin;
        const maxLoss = opportunityCountMax * avgValueMax;

        return {
            minMonthlyLoss: minLoss,
            maxMonthlyLoss: maxLoss,
            confidence: 'MEDIUM', // Default to medium as we lack specific biz data
            assumptions: assumptions,
            disclaimer: "This is an approximation based on public benchmarks and observed behavior, not a guarantee or exact financial figure."
        };
    }
}
