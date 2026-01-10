/**
 * Onboarding State Management
 * 
 * Tracks user progress through the onboarding flow using localStorage.
 * No backend changes required - all state persisted client-side.
 */

export interface OnboardingState {
    welcomed: boolean;           // Welcome modal shown
    tourCompleted: boolean;       // Product tour finished
    firstBusinessAdded: boolean;  // At least 1 business added
    firstCheckRun: boolean;       // At least 1 health check run
    alertsConfigured: boolean;    // Visited alerts settings
    dismissed: boolean;           // User dismissed progress tracker
}

const STORAGE_KEY = 'responseaudit_onboarding';

const DEFAULT_STATE: OnboardingState = {
    welcomed: false,
    tourCompleted: false,
    firstBusinessAdded: false,
    firstCheckRun: false,
    alertsConfigured: false,
    dismissed: false,
};

/**
 * Get current onboarding state from localStorage
 */
export function getOnboardingState(): OnboardingState {
    if (typeof window === 'undefined') return DEFAULT_STATE;

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return DEFAULT_STATE;

        return { ...DEFAULT_STATE, ...JSON.parse(stored) };
    } catch (error) {
        console.error('Failed to read onboarding state:', error);
        return DEFAULT_STATE;
    }
}

/**
 * Update onboarding state (merges with existing)
 */
export function updateOnboardingState(updates: Partial<OnboardingState>): void {
    if (typeof window === 'undefined') return;

    try {
        const current = getOnboardingState();
        const newState = { ...current, ...updates };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch (error) {
        console.error('Failed to update onboarding state:', error);
    }
}

/**
 * Check if all onboarding actions are complete
 */
export function isOnboardingComplete(): boolean {
    const state = getOnboardingState();
    return (
        state.firstBusinessAdded &&
        state.firstCheckRun &&
        state.alertsConfigured
    );
}

/**
 * Get progress percentage (0-100)
 */
export function getOnboardingProgress(): number {
    const state = getOnboardingState();
    let completed = 0;

    if (state.firstBusinessAdded) completed++;
    if (state.firstCheckRun) completed++;
    if (state.alertsConfigured) completed++;

    return Math.round((completed / 3) * 100);
}

/**
 * Get next recommended action
 */
export function getNextAction(): string | null {
    const state = getOnboardingState();

    if (!state.firstBusinessAdded) {
        return 'Add your first business';
    }
    if (!state.firstCheckRun) {
        return 'Run your first health check';
    }
    if (!state.alertsConfigured) {
        return 'Configure alert preferences';
    }

    return null;
}

/**
 * Reset onboarding state (for testing)
 */
export function resetOnboarding(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
}

/**
 * Check if user should see welcome modal
 */
export function shouldShowWelcome(): boolean {
    const state = getOnboardingState();
    return !state.welcomed;
}

/**
 * Check if progress tracker should be visible
 */
export function shouldShowProgressTracker(): boolean {
    const state = getOnboardingState();
    return !state.dismissed && !isOnboardingComplete();
}
