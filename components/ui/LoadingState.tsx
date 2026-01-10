import { Loader2 } from 'lucide-react';

/**
 * Card skeleton loader with shimmer effect
 */
export function CardSkeleton() {
    return (
        <div className="bg-[#111]/50 border border-gray-900 rounded-lg p-6 animate-pulse">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-5 h-5 bg-gray-800 rounded"></div>
                <div className="h-4 bg-gray-800 rounded w-24"></div>
            </div>
            <div className="h-8 bg-gray-800 rounded w-16 mb-2"></div>
            <div className="h-3 bg-gray-800 rounded w-32"></div>
        </div>
    );
}

/**
 * Table/List skeleton loader
 */
export function TableSkeleton({ rows = 3 }: { rows?: number }) {
    return (
        <div className="space-y-3">
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="bg-[#111]/50 border border-gray-900 rounded-lg p-4 animate-pulse">
                    <div className="flex items-center justify-between">
                        <div className="space-y-2 flex-1">
                            <div className="h-4 bg-gray-800 rounded w-48"></div>
                            <div className="h-3 bg-gray-800 rounded w-32"></div>
                        </div>
                        <div className="h-6 bg-gray-800 rounded w-20"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}

/**
 * Full page loader with spinner
 */
export function PageLoader({ message = "Loading..." }: { message?: string }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
            <Loader2 size={40} className="text-emerald-500 animate-spin" />
            <p className="text-gray-400 text-sm">{message}</p>
        </div>
    );
}

/**
 * Inline spinner for buttons or small areas
 */
export function Spinner({ size = 16, className = "" }: { size?: number; className?: string }) {
    return <Loader2 size={size} className={`animate-spin ${className}`} />;
}
