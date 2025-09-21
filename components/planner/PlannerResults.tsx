import React from 'react';
import type { useAIPlanner } from '../../hooks/useAIPlanner';
import MarkdownRenderer from '../ui/MarkdownRenderer';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { AnalysisProgress } from './ui/AnalysisProgress';
import { BusinessPlanGenerator } from './ui/BusinessPlanGenerator';
import { ResultsHeader, SourcesDisplay } from './ui/ResultsDisplay';
import { EditableOutline } from './ui/EditableOutline';

type PlannerResultsProps = {
    state: ReturnType<typeof useAIPlanner>['state'];
    actions: ReturnType<typeof useAIPlanner>['actions'];
}

const PlannerResults: React.FC<PlannerResultsProps> = ({ state, actions }) => {
    const {
        stage,
        outline,
        analysis,
        sources,
        businessPlan,
        generationProgress,
        editableOutline,
        countdown,
    } = state;

    const {
        startFullAnalysis,
        startBusinessPlanGeneration,
        handleReset,
        handleCancelGeneration,
        updateOutlineItem,
        addOutlineItem,
        removeOutlineItem,
        resetOutline,
    } = actions;

    const renderContent = () => {
        if (stage.startsWith('generating') && countdown !== null && countdown > 0) {
            const textMap: { [key: string]: string } = {
                generating_outline: 'Mempersiapkan untuk membuat kerangka...',
                generating_analysis: 'Mempersiapkan untuk membuat analisis...',
                generating_business_plan: 'Mempersiapkan untuk membuat rencana bisnis...',
            };
            return <LoadingSpinner text={textMap[stage] || 'Mempersiapkan...'} onCancel={handleCancelGeneration} countdown={countdown} />;
        }

        switch (stage) {
            case 'generating_outline':
                return <LoadingSpinner text="Membuat kerangka analisis..." onCancel={handleCancelGeneration} />;
            case 'generating_analysis':
                return <AnalysisProgress outline={editableOutline} progress={generationProgress} onCancel={handleCancelGeneration} />;
            case 'generating_business_plan':
                return <LoadingSpinner text="Menyusun rencana bisnis..." onCancel={handleCancelGeneration} />;
            
            case 'initial':
                 return (
                    <div className="text-center pt-10">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Selamat Datang di Perencana Bisnis AI</h3>
                        <p className="text-slate-500 dark:text-brand-text-muted">Pilih lokasi Anda di atas untuk memulai analisis pasar yang komprehensif.</p>
                    </div>
                );

            case 'outline_ready':
                return (
                    <EditableOutline 
                        outline={editableOutline}
                        onUpdate={updateOutlineItem}
                        onAdd={addOutlineItem}
                        onRemove={removeOutlineItem}
                        onReset={resetOutline}
                        onGenerateAnalysis={startFullAnalysis}
                    />
                );

            case 'analysis_ready':
                return (
                    <>
                        <ResultsHeader stage={stage} content={analysis} onReset={handleReset} />
                        <MarkdownRenderer content={analysis} />
                        {sources.length > 0 && <SourcesDisplay sources={sources} />}
                        <BusinessPlanGenerator onGenerate={startBusinessPlanGeneration} />
                    </>
                );

            case 'business_plan_ready':
                return (
                    <>
                        <ResultsHeader stage={stage} content={businessPlan} onReset={handleReset} />
                        <MarkdownRenderer content={businessPlan} />
                    </>
                );

            default:
                return null;
        }
    };
    
    return (
        <div className="w-full bg-white dark:bg-brand-light-dark p-6 rounded-lg min-h-[300px] shadow-lg">
            {renderContent()}
        </div>
    );
};

export default PlannerResults;