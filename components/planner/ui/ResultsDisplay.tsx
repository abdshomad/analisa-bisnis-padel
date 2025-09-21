import React from 'react';
import type { SearchSource, Stage } from '../../../types';
import { RefreshCw, Download, Globe } from 'lucide-react';

export const ResultsHeader: React.FC<{ stage: Stage, content: string, onReset: () => void }> = ({ stage, content, onReset }) => {
    const titleMap = {
        analysis_ready: 'Analisis Peluang Dihasilkan',
        business_plan_ready: 'Rencana Bisnis Dihasilkan'
    };
    const title = titleMap[stage as keyof typeof titleMap] || 'Hasil';

    const handleDownload = () => {
        const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${title.replace(/\s/g, '_')}.md`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-0">{title}</h3>
            <div className="flex items-center gap-2">
                <button onClick={handleDownload} className="flex items-center bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-semibold py-2 px-3 rounded-md transition text-sm">
                    <Download className="h-4 w-4 mr-2" /> Unduh
                </button>
                <button onClick={onReset} className="flex items-center bg-brand-cyan hover:bg-cyan-500 text-white font-semibold py-2 px-3 rounded-md transition text-sm">
                    <RefreshCw className="h-4 w-4 mr-2" /> Mulai Lagi
                </button>
            </div>
        </div>
    );
};

export const SourcesDisplay: React.FC<{ sources: SearchSource[] }> = ({ sources }) => (
    <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
        <h4 className="flex items-center text-lg font-semibold text-brand-cyan mb-3">
            <Globe className="h-5 w-5 mr-2" /> Sumber Real-time dari Google Search
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sources.map((source, index) => (
                <a key={index} href={source.web.uri} target="_blank" rel="noopener noreferrer" className="block p-3 bg-slate-100 dark:bg-brand-dark/50 rounded-md hover:bg-slate-200 dark:hover:bg-brand-dark transition-colors">
                    <p className="text-sm font-semibold truncate text-slate-800 dark:text-white">{source.web.title}</p>
                    <p className="text-xs text-brand-cyan truncate">{source.web.uri}</p>
                </a>
            ))}
        </div>
    </div>
);