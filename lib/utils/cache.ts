type CacheEntry<T> = {
    data: T;
    expiresAt: number;
};

// In-memory caching logic for highly requested public AI API data
// Protects compute budget if a single domain is pinged repeatedly.
export class APICache {
    private store = new Map<string, CacheEntry<any>>();

    get<T>(key: string): T | null {
        const entry = this.store.get(key);
        if (!entry) return null;

        if (Date.now() > entry.expiresAt) {
            this.store.delete(key);
            return null;
        }

        return entry.data as T;
    }

    set<T>(key: string, data: T, ttlMs: number): void {
        this.store.set(key, {
            data,
            expiresAt: Date.now() + ttlMs
        });
    }

    delete(key: string): void {
        this.store.delete(key);
    }

    clear(): void {
        this.store.clear();
    }
}

// Global cache singleton instance
export const globalCache = new APICache();
