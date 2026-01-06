import { DiagnosticLog, Gap, GapSeverity, GapType } from '../../types';
import { MOCK_GAPS } from '../data/store';

export class GapAnalyzer {
    analyze(log: DiagnosticLog): Gap | null {
        let gap: Gap | null = null;

        if (log.channel === 'EMAIL') {
            if (log.result === 'FAILURE') {
                gap = this.createGap(log, 'MISSED_FOLLOWUP', 'Unresponsive Email Channel', 'No response received to inquiry after 48h', 'CRITICAL');
            } else if (log.responseDurationMs && log.responseDurationMs > 24 * 60 * 60 * 1000) {
                gap = this.createGap(log, 'SLOW_RESPONSE', 'Slow Response Time', `Response took ${Math.floor(log.responseDurationMs / (1000 * 60 * 60))} hours`, 'HIGH');
            }
        } else if (log.channel === 'CONTACT_FORM') {
            if (log.result === 'FAILURE') {
                gap = this.createGap(log, 'BROKEN_FORM', 'Broken Contact Form', 'No auto-confirmation or acknowledgement received', 'HIGH');
            }
        } else if (log.channel === 'MAPS_MESSAGE') {
            if (log.result === 'FAILURE') {
                gap = this.createGap(log, 'MISSED_FOLLOWUP', 'Ignored Google Maps Messages', 'Customer inquiries on Maps are going unanswered', 'MEDIUM');
            }
        }

        if (gap) {
            MOCK_GAPS.push(gap);
        }
        return gap;
    }

    private createGap(log: DiagnosticLog, type: GapType, title: string, description: string, severity: GapSeverity): Gap {
        return {
            id: `gap_${Date.now()}`,
            businessId: log.businessId,
            diagnosticLogId: log.id,
            type,
            title,
            description,
            severity,
            detectedAt: new Date(),
            status: 'OPEN'
        };
    }
}
