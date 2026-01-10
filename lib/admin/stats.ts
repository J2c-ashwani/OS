import { MOCK_BUSINESSES, MOCK_DIAGNOSTICS, MOCK_GAPS, MOCK_ALERTS, MOCK_SUBSCRIPTIONS, SYSTEM_MODE } from '../data/store';

export interface SystemStats {
    totalUsers: number;
    activeSubscriptions: number;
    totalBusinesses: number;
    scansToday: number;
}

export interface ActivityEvent {
    id: string;
    type: 'DIAGNOSTIC' | 'GAP' | 'ALERT' | 'SUBSCRIPTION';
    timestamp: Date;
    description: string;
}

export interface SystemHealth {
    mode: 'MOCK' | 'LIVE';
    businessesCount: number;
    diagnosticsCount: number;
    gapsCount: number;
    alertsCount: number;
}

export class AdminStatsService {
    /**
     * Get overall system statistics
     */
    static getSystemStats(): SystemStats {
        // Count unique users from audit leads (this is mock data for now)
        // In production, this would query a users table or audit_leads table
        const totalUsers = 0; // No user tracking yet in this demo

        // Active subscriptions
        const activeSubscriptions = MOCK_SUBSCRIPTIONS.filter(
            (sub: any) => sub.status === 'ACTIVE'
        ).length;

        // Total businesses
        const totalBusinesses = MOCK_BUSINESSES.length;

        // Scans today (diagnostics run today)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const scansToday = MOCK_DIAGNOSTICS.filter(log => {
            const logDate = new Date(log.timestampSent);
            logDate.setHours(0, 0, 0, 0);
            return logDate.getTime() === today.getTime();
        }).length;

        return {
            totalUsers,
            activeSubscriptions,
            totalBusinesses,
            scansToday,
        };
    }

    /**
     * Get recent system activity (last 10 events)
     */
    static getRecentActivity(): ActivityEvent[] {
        const events: ActivityEvent[] = [];

        // Add diagnostic logs
        MOCK_DIAGNOSTICS.forEach(log => {
            events.push({
                id: log.id,
                type: 'DIAGNOSTIC',
                timestamp: new Date(log.timestampSent),
                description: `Scan completed for ${log.businessId} - Channel: ${log.channel}`,
            });
        });

        // Add gap detections
        MOCK_GAPS.forEach(gap => {
            events.push({
                id: gap.id,
                type: 'GAP',
                timestamp: new Date(gap.detectedAt),
                description: `Gap detected for ${gap.businessId} - Severity: ${gap.severity}`,
            });
        });

        // Add alerts
        MOCK_ALERTS.forEach(alert => {
            events.push({
                id: alert.id,
                type: 'ALERT',
                timestamp: new Date(alert.timestamp),
                description: `Alert sent: ${alert.title}`,
            });
        });

        // Sort by timestamp (newest first) and take last 10
        return events
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
            .slice(0, 10);
    }

    /**
     * Get system health metrics
     */
    static getSystemHealth(): SystemHealth {
        return {
            mode: SYSTEM_MODE,
            businessesCount: MOCK_BUSINESSES.length,
            diagnosticsCount: MOCK_DIAGNOSTICS.length,
            gapsCount: MOCK_GAPS.length,
            alertsCount: MOCK_ALERTS.length,
        };
    }
}
