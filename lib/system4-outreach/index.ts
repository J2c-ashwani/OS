import { Gap, Alert, Business } from '../../types';
import { MOCK_ALERTS } from '../data/store';

export class AlertBuilder {
    createAlert(business: Business, gap: Gap): Alert {
        const timestamp = gap.detectedAt.toLocaleString();

        let content = `
Diagnostic Report for ${business.name}
Timestamp: ${timestamp}

OBSERVATION:
${gap.title}: ${gap.description}

IMPACT:
Operational leakage detected in ${gap.description.includes('Email') ? 'primary communication channel' : 'customer acquisition flow'}.
Industry average response time is < 2 hours.

RECOMMENDATION:
Automated monitoring enabled. Verify process manually or activate continuous protection.
    `.trim();

        const alert: Alert = {
            id: `alert_${Date.now()}`,
            businessId: business.id,
            gapId: gap.id,
            sentAt: new Date(),
            timestamp: new Date(),
            channel: 'EMAIL',
            title: gap.title,
            message: gap.description,
            severity: gap.severity === 'CRITICAL' ? 'CRITICAL' : gap.severity === 'HIGH' ? 'WARNING' : 'INFO',
            content,
            status: 'SENT'
        };

        MOCK_ALERTS.push(alert);
        return alert;
    }
}
