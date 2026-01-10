import { AlertTriangle, XCircle, RefreshCw, Mail } from 'lucide-react';

interface ErrorStateProps {
    title?: string;
    message: string;
    onRetry?: () => void;
    showSupport?: boolean;
}

/**
 * Generic error state component with retry option
 */
export function ErrorState({
    title = "Something went wrong",
    message,
    onRetry,
    showSupport = false
}: ErrorStateProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-6 py-12">
            <div className="mb-4">
                <XCircle size={48} className="text-red-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-gray-400 text-sm max-w-md mb-6">{message}</p>

            <div className="flex gap-3">
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        <RefreshCw size={16} />
                        Try Again
                    </button>
                )}

                {showSupport && (
                    <a
                        href="mailto:support@responseaudit.com"
                        className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        <Mail size={16} />
                        Contact Support
                    </a>
                )}
            </div>
        </div>
    );
}

/**
 * Inline error alert (for forms, sections)
 */
export function ErrorAlert({ message, onDismiss }: { message: string; onDismiss?: () => void }) {
    return (
        <div className="bg-red-900/20 border border-red-900/40 rounded-lg p-4">
            <div className="flex items-start gap-3">
                <AlertTriangle size={20} className="text-red-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                    <p className="text-sm text-red-200">{message}</p>
                </div>
                {onDismiss && (
                    <button
                        onClick={onDismiss}
                        className="text-red-400 hover:text-red-300 transition-colors"
                    >
                        <XCircle size={18} />
                    </button>
                )}
            </div>
        </div>
    );
}

/**
 * Network error preset
 */
export function NetworkError({ onRetry }: { onRetry?: () => void }) {
    return (
        <ErrorState
            title="Connection issue"
            message="Unable to connect to the server. Please check your internet connection and try again."
            onRetry={onRetry}
        />
    );
}

/**
 * Server error preset
 */
export function ServerError({ onRetry }: { onRetry?: () => void }) {
    return (
        <ErrorState
            title="Server error"
            message="We're experiencing technical difficulties. Our team has been notified. Please try again in a few moments."
            onRetry={onRetry}
            showSupport={true}
        />
    );
}
