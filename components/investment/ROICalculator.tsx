import React from 'react';
import { investmentData } from '../../data/investmentData';
import { Calculator } from 'lucide-react';
import { useROICalculator } from '../../hooks/useROICalculator';
import { CalculatorForm } from './calculator/CalculatorForm';
import { CalculatorResults } from './calculator/CalculatorResults';

export const ROICalculator: React.FC = () => {
    const { state, calculations, actions } = useROICalculator();

    return (
        <div className="mt-12 bg-white dark:bg-brand-light-dark p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-center mb-6 text-slate-900 dark:text-white flex items-center justify-center">
                <Calculator className="h-7 w-7 mr-3 text-brand-cyan" /> Kalkulator ROI Interaktif
            </h3>
            <div className="flex justify-center gap-2 mb-8 flex-wrap">
                <p className="text-sm font-semibold self-center mr-2">Muat Preset:</p>
                {investmentData.map(tier => <button key={tier.id} onClick={() => actions.handlePresetClick(tier.id)} className="px-4 py-1.5 text-sm font-medium bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-md transition-colors">{tier.name}</button>)}
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
                <CalculatorForm state={state} actions={actions} />
                <CalculatorResults calculations={calculations} />
            </div>
        </div>
    );
};