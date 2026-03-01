'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { AdminStatsService, SystemStats, ActivityEvent, SystemHealth } from '@/lib/admin/stats';

/**
 * Get system statistics (admin only)
 */
export async function getAdminStatsAction(): Promise<{ success: boolean; data?: SystemStats; error?: string }> {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user || session.user.role !== 'ADMIN') {
            return { success: false, error: 'Unauthorized: Admin access required' };
        }

        const stats = AdminStatsService.getSystemStats();
        return { success: true, data: stats };
    } catch (error) {
        console.error('Error fetching admin stats:', error);
        return { success: false, error: 'Failed to fetch system stats' };
    }
}

/**
 * Get recent system activity (admin only)
 */
export async function getRecentActivityAction(): Promise<{ success: boolean; data?: ActivityEvent[]; error?: string }> {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user || session.user.role !== 'ADMIN') {
            return { success: false, error: 'Unauthorized: Admin access required' };
        }

        const activity = AdminStatsService.getRecentActivity();
        return { success: true, data: activity };
    } catch (error) {
        console.error('Error fetching recent activity:', error);
        return { success: false, error: 'Failed to fetch recent activity' };
    }
}

/**
 * Get system health metrics (admin only)
 */
export async function getSystemHealthAction(): Promise<{ success: boolean; data?: SystemHealth; error?: string }> {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user || session.user.role !== 'ADMIN') {
            return { success: false, error: 'Unauthorized: Admin access required' };
        }

        const health = AdminStatsService.getSystemHealth();
        return { success: true, data: health };
    } catch (error) {
        console.error('Error fetching system health:', error);
        return { success: false, error: 'Failed to fetch system health' };
    }
}
