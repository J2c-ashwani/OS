import { Business, Alert } from '../../types';

export type ResponseIntent = 'INTERESTED' | 'SKEPTICAL' | 'ANGRY' | 'NOT_INTERESTED';

export class ResponseAnalyzer {
    analyzeReply(replyContent: string): ResponseIntent {
        const lower = replyContent.toLowerCase();
        if (lower.includes('stop') || lower.includes('unsubscribe')) return 'NOT_INTERESTED';
        if (lower.includes('how') || lower.includes('price') || lower.includes('cost')) return 'INTERESTED';
        if (lower.includes('who are you') || lower.includes('why')) return 'SKEPTICAL';
        return 'INTERESTED'; // Default to interested for opportunities
    }
}

export class AccountabilityEngine {
    generateComplianceLog(business: Business, intent: ResponseIntent): string {
        const timestamp = new Date().toISOString();
        if (intent === 'INTERESTED') {
            return `
[COMPLIANCE LOG] ${timestamp}
STATUS: GAP CONFIRMED
DETAILS: Target responded to verification signal.
ACTION: Latency event recorded. Verification ID #8821 closed.
RECOMMENDATION: Activation of continuous monitoring advised.
      `.trim();
        } else if (intent === 'SKEPTICAL') {
            return `
[COMPLIANCE LOG] ${timestamp}
STATUS: MANUAL REVIEW REQUIRED
DETAILS: Target flagged verification signal as suspicious.
ACTION: Verification signal paused.
NOTE: This is a system audit, not a sales outreach.
      `.trim();
        }
        return `[LOG] ${timestamp} Interaction recorded.`;
    }
}
