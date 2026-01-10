import { Inbox, UserPlus, Bell, Activity, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface EmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    description: string;
    action?: {
        label: string;
        href?: string;
        onClick?: () => void;
    };
}

/**
 * Generic empty state component with optional CTA
 */
export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-6 py-12">
            <div className="mb-4 text-gray-600">
                {icon || <Inbox size={48} />}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-gray-400 text-sm max-w-md mb-6">{description}</p>

            {action && (
                action.href ? (
                    <Link
                        href={action.href}
                        className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        {action.label}
                        <ArrowRight size={16} />
                    </Link>
                ) : (
                    <button
                        onClick={action.onClick}
                        className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        {action.label}
                        <ArrowRight size={16} />
                    </button>
                )
            )}
        </div>
    );
}

/**
 * Preset: No businesses added yet
 */
export function EmptyBusinesses() {
    return (
        <EmptyState
            icon={<UserPlus size={48} />}
            title="No businesses added yet"
            description="Start monitoring your first business to track response times and detect gaps in customer communications."
            action={{
                label: "Add Your First Business",
                href: "/app/businesses" // Or trigger modal
            }}
        />
    );
}

/**
 * Preset: No health checks run
 */
export function EmptyHealthChecks() {
    return (
        <EmptyState
            icon={<Activity size={48} />}
            title="No health checks yet"
            description="Health checks will appear here after running your first diagnostic scan. We'll monitor your contact channels and response times."
        />
    );
}

/**
 * Preset: No alerts triggered
 */
export function EmptyAlerts() {
    return (
        <EmptyState
            icon={<Bell size={48} />}
            title="All clear!"
            description="No alerts have been triggered. We'll notify you immediately if we detect any response gaps or issues with your contact channels."
        />
    );
}
