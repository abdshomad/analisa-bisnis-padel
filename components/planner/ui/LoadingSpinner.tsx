import React from 'react';
import { X } from 'lucide-react';

export const LoadingSpinner: React.FC<{ text: string; onCancel?: () => void, countdown?: number | null }> = ({ text, onCancel, countdown }) => (
    <div className="flex flex-col justify-center items-center py-10">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand-cyan"></div>
        <p className="mt-4 text-slate-500 dark:text-brand-text-muted">
             {countdown ? `Menghubungi AI dalam ${countdown} detik...` : text}
        </p>
        {onCancel && (
            <button
                onClick={onCancel}
                className="mt-6 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-semibold py-2 px-4 rounded-md transition duration-300 flex items-center"
                aria-label="Batalkan proses"
            >
                <X className="mr-2 h-4 w-4" /> Batalkan
            </button>
        )}
    </div>
);