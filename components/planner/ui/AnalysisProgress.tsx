import React from 'react';
import { CheckCircle, Loader, X } from 'lucide-react';

export const AnalysisProgress: React.FC<{ outline: string[]; progress: number; onCancel?: () => void }> = ({ outline, progress, onCancel }) => (
    <div>
        <h4 className="font-semibold text-brand-cyan mb-2">AI sedang menyusun analisis...</h4>
        <p className="text-sm text-slate-500 dark:text-brand-text-muted mb-4">Harap tunggu sementara AI mengembangkan setiap bagian dari kerangka.</p>
        <ul className="space-y-3">
            {outline.map((item, index) => (
                <li key={index} className={`flex items-center p-3 rounded-md transition-all duration-300 ${index === progress ? 'bg-brand-cyan/10 scale-105' : 'bg-slate-50 dark:bg-brand-dark/50'}`}>
                    {index < progress && <CheckCircle className="h-5 w-5 mr-3 text-green-500 flex-shrink-0" />}
                    {index === progress && <Loader className="h-5 w-5 mr-3 text-brand-cyan animate-spin flex-shrink-0" />}
                    {index > progress && <div className="h-5 w-5 mr-3 flex-shrink-0 border-2 border-slate-300 dark:border-slate-600 rounded-full" />}
                    <span className={`transition-colors ${index < progress ? 'text-green-600 dark:text-green-400' : index === progress ? 'font-semibold text-brand-cyan' : 'text-slate-400 dark:text-slate-500'}`}>{item}</span>
                    {index === progress && <span className="ml-auto text-xs font-semibold text-brand-cyan animate-pulse">AI sedang berpikir...</span>}
                </li>
            ))}
        </ul>
        {onCancel && (
            <div className="mt-6 text-center">
                <button onClick={onCancel} className="bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-semibold py-2 px-4 rounded-md transition duration-300 flex items-center mx-auto" aria-label="Batalkan proses">
                    <X className="mr-2 h-4 w-4" /> Batalkan
                </button>
            </div>
        )}
    </div>
);