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

export class AutoResponder {
    generateReply(business: Business, intent: ResponseIntent): string {
        if (intent === 'INTERESTED') {
            return `
Hello,

Confirmed the gap in your ${business.primaryChannel} channel. 
We detected it continuously repeats without monitoring.

We can activate the automated guardrails for your domain.
This runs 24/7 to prevent future leakage.

Shall I turn it on?
      `.trim();
        } else if (intent === 'SKEPTICAL') {
            return `
This is an automated operational audit.
We verified the gap with timestamped evidence attached below.
No human services are being sold. This is purely system monitoring.
      `.trim();
        }
        return '';
    }
}
