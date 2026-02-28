'use client';

import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { CheckCircle, X, AlertTriangle, Info } from 'lucide-react';

interface Toast {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
}

const ToastContext = createContext<{
    toast: (message: string, type?: 'success' | 'error' | 'info') => void;
}>({ toast: () => { } });

export function useToast() {
    return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
        const id = Math.random().toString(36).slice(2);
        setToasts(prev => [...prev, { id, message, type }]);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ toast: addToast }}>
            {children}
            <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
                {toasts.map(t => (
                    <ToastItem key={t.id} toast={t} onDismiss={() => removeToast(t.id)} />
                ))}
            </div>
        </ToastContext.Provider>
    );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
    useEffect(() => {
        const timer = setTimeout(onDismiss, 3000);
        return () => clearTimeout(timer);
    }, [onDismiss]);

    const icon = toast.type === 'success' ? <CheckCircle size={18} /> :
        toast.type === 'error' ? <AlertTriangle size={18} /> :
            <Info size={18} />;

    const colors = toast.type === 'success' ? 'bg-emerald-500 text-white' :
        toast.type === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white';

    return (
        <div className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl ${colors} animate-slide-up min-w-[280px]`}>
            {icon}
            <span className="text-sm font-medium flex-1">{toast.message}</span>
            <button onClick={onDismiss} className="hover:opacity-70 transition-opacity">
                <X size={16} />
            </button>
        </div>
    );
}
