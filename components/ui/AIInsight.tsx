import React from 'react';
import { Lightbulb, RefreshCw, ChevronLeft, ChevronRight, AlertTriangle, Target } from 'lucide-react';
import { useAIInsight } from '../../hooks/useAIInsight';

interface AIInsightProps {
  initialInsight: string;
  initialRecommendation: string;
  topic: string;
}

const AIInsight: React.FC<AIInsightProps> = ({ initialInsight, initialRecommendation, topic }) => {
    const { currentInsight, currentIndex, totalInsights, isLoading, error, countdown, actions } = useAIInsight(initialInsight, initialRecommendation, topic);

    return (
        <div className="no-print bg-brand-cyan/10 dark:bg-brand-cyan/20 border-l-4 border-brand-cyan p-4 rounded-r-lg mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex-grow">
                    <div className="flex items-start mb-3">
                         <Lightbulb className="h-6 w-6 text-brand-cyan mr-3 flex-shrink-0" />
                         <div>
                            <h4 className="font-bold text-slate-800 dark:text-white">AI Insight</h4>
                            <p className="text-slate-700 dark:text-brand-text text-sm italic">
                                "{currentInsight.insight}"
                            </p>
                         </div>
                    </div>
                     <div className="flex items-start">
                        <Target className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                         <div>
                            <h4 className="font-bold text-slate-800 dark:text-white">Rekomendasi Strategis</h4>
                            <p className="text-slate-700 dark:text-brand-text text-sm">
                                {currentInsight.recommendation}
                            </p>
                         </div>
                    </div>
                    {error && (
                        <div className="mt-2 flex items-center text-sm text-red-600 dark:text-red-400">
                            <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col items-end gap-2 self-start mt-2 sm:mt-0">
                     <button
                        onClick={actions.generateNewInsight}
                        disabled={isLoading}
                        className="flex items-center justify-center text-xs bg-white dark:bg-brand-light-dark/50 hover:bg-slate-50 dark:hover:bg-brand-light-dark text-slate-700 dark:text-brand-text-muted font-semibold py-2 px-3 rounded-md transition shadow-sm disabled:opacity-50 disabled:cursor-wait min-w-[120px]"
                        aria-label="Hasilkan wawasan baru"
                    >
                        {isLoading ? (
                            <>
                                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                <span className="font-mono">{countdown}</span>
                            </>
                        ) : (
                            <>
                                <RefreshCw className="h-4 w-4 mr-2" />
                                <span>Perbarui</span>
                            </>
                        )}
                    </button>
                    {totalInsights > 1 && (
                        <div className="flex items-center gap-2 bg-white dark:bg-brand-light-dark/50 px-2 py-1 rounded-md shadow-sm">
                             <button onClick={actions.goToPrevious} aria-label="Wawasan sebelumnya" className="text-slate-500 hover:text-brand-cyan transition">
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <span className="text-xs font-mono text-slate-600 dark:text-brand-text-muted select-none">
                                {currentIndex + 1}/{totalInsights}
                            </span>
                             <button onClick={actions.goToNext} aria-label="Wawasan berikutnya" className="text-slate-500 hover:text-brand-cyan transition">
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AIInsight;