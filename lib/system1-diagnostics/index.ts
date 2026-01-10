import { Business, DiagnosticLog, ChannelType, DiagnosticResult } from '../../types';
import { MOCK_DIAGNOSTICS } from '../data/store';

export interface DiagnosticRunner {
    run(business: Business): Promise<DiagnosticLog>;
}

// SIMULATOR: Email Probe
export class EmailProbe implements DiagnosticRunner {
    async run(business: Business): Promise<DiagnosticLog> {
        console.log(`[VERIFICATION] Sending standardized audit signal to ${business.contactEmail || business.name}...`);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Randomize outcome for demo purposes
        const rand = Math.random();
        let result: DiagnosticResult = 'SUCCESS';
        let duration = 120 * 60 * 1000; // 2 hours default
        let evidence = 'Verified: Reply received to Signal #8821';

        if (rand > 0.7) {
            result = 'FAILURE';
            duration = 0;
            evidence = 'Timeout: No packet returned after 48h';
        } else if (rand > 0.4) {
            result = 'SUCCESS';
            duration = 26 * 60 * 60 * 1000; // 26 hours
            evidence = 'Verified: Reply received (High Latency 26h)';
        }

        const log: DiagnosticLog = {
            id: `log_${Date.now()}_email`,
            businessId: business.id,
            channel: 'EMAIL',
            timestampSent: new Date(),
            timestampReplied: result === 'SUCCESS' ? new Date(Date.now() + duration) : undefined,
            responseDurationMs: result === 'SUCCESS' ? duration : undefined,
            result,
            evidence
        };

        MOCK_DIAGNOSTICS.push(log);
        return log;
    }
}

// SIMULATOR: Contact Form Probe
export class FormProbe implements DiagnosticRunner {
    async run(business: Business): Promise<DiagnosticLog> {
        console.log(`[VERIFICATION] Submitting audit payload on ${business.websiteUrl}...`);
        await new Promise(resolve => setTimeout(resolve, 800));

        const rand = Math.random();
        const isSuccess = rand > 0.5;

        const log: DiagnosticLog = {
            id: `log_${Date.now()}_form`,
            businessId: business.id,
            channel: 'CONTACT_FORM',
            timestampSent: new Date(),
            result: isSuccess ? 'SUCCESS' : 'FAILURE',
            evidence: isSuccess ? 'Verified: Auto-responder ACK received' : 'Timeout: No ACK received'
        };

        MOCK_DIAGNOSTICS.push(log);
        return log;
    }
}

// SIMULATOR: Maps Message Probe
export class MapsProbe implements DiagnosticRunner {
    async run(business: Business): Promise<DiagnosticLog> {
        console.log(`[VERIFICATION] Pinging Google Maps Business Profile for ${business.name}...`);
        await new Promise(resolve => setTimeout(resolve, 600));

        const log: DiagnosticLog = {
            id: `log_${Date.now()}_maps`,
            businessId: business.id,
            channel: 'MAPS_MESSAGE',
            timestampSent: new Date(),
            result: 'FAILURE', // Maps often ignored
            evidence: 'Timeout: Read receipt active, no reply'
        };

        MOCK_DIAGNOSTICS.push(log);
        return log;
    }
}
