import { Business, DiagnosticLog, ChannelType, DiagnosticResult } from '../../types';
import { MOCK_DIAGNOSTICS } from '../data/store';

export interface DiagnosticRunner {
    run(business: Business): Promise<DiagnosticLog>;
}

// SIMULATOR: Email Probe
export class EmailProbe implements DiagnosticRunner {
    async run(business: Business): Promise<DiagnosticLog> {
        console.log(`[SIMULATION] Sending email inquiry to ${business.contactEmail || business.name}...`);

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Randomize outcome for demo purposes
        const rand = Math.random();
        let result: DiagnosticResult = 'SUCCESS';
        let duration = 120 * 60 * 1000; // 2 hours default
        let evidence = 'Replied in 2 hours';

        if (rand > 0.7) {
            result = 'FAILURE';
            duration = 0;
            evidence = 'No response after 48 hours';
        } else if (rand > 0.4) {
            result = 'SUCCESS';
            duration = 26 * 60 * 60 * 1000; // 26 hours
            evidence = 'Replied in 26 hours (High Latency)';
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
        console.log(`[SIMULATION] Submitting contact form on ${business.websiteUrl}...`);
        await new Promise(resolve => setTimeout(resolve, 800));

        const rand = Math.random();
        const isSuccess = rand > 0.5;

        const log: DiagnosticLog = {
            id: `log_${Date.now()}_form`,
            businessId: business.id,
            channel: 'CONTACT_FORM',
            timestampSent: new Date(),
            result: isSuccess ? 'SUCCESS' : 'FAILURE',
            evidence: isSuccess ? 'Auto-confirmation received instantly' : 'No confirmation email received'
        };

        MOCK_DIAGNOSTICS.push(log);
        return log;
    }
}

// SIMULATOR: Maps Message Probe
export class MapsProbe implements DiagnosticRunner {
    async run(business: Business): Promise<DiagnosticLog> {
        console.log(`[SIMULATION] Sending Google Maps message to ${business.name}...`);
        await new Promise(resolve => setTimeout(resolve, 600));

        const log: DiagnosticLog = {
            id: `log_${Date.now()}_maps`,
            businessId: business.id,
            channel: 'MAPS_MESSAGE',
            timestampSent: new Date(),
            result: 'FAILURE', // Maps often ignored
            evidence: 'Message read but not replied to for 24h'
        };

        MOCK_DIAGNOSTICS.push(log);
        return log;
    }
}
