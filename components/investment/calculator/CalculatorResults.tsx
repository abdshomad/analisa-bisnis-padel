import React from 'react';
import { Banknote, TrendingUp, Target, CalendarCheck } from 'lucide-react';
import type { useROICalculator } from '../../../hooks/useROICalculator';
import { RevenueProjectionChart } from './RevenueProjectionChart';

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
};

const ResultCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <div className="bg-slate-100 dark:bg-brand-dark/50 p-4 rounded-lg">
        <div className="flex items-center mb-1">{icon}<h5 className="ml-2 text-sm text-slate-500 dark:text-brand-text-muted">{label}</h5></div>
        <p className="text-xl font-bold text-slate-800 dark:text-white">{value}</p>
    </div>
);

type CalculatorResultsProps = {
    calculations: ReturnType<typeof useROICalculator>['calculations'];
};

export const CalculatorResults: React.FC<CalculatorResultsProps> = ({ calculations }) => (
    <div className="bg-green-50 dark:bg-teal-900/20 p-6 rounded-lg">
        <h4 className="font-bold text-lg mb-4 text-slate-800 dark:text-white">Proyeksi Hasil</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ResultCard icon={<Banknote className="h-6 w-6 text-green-600 dark:text-green-400"/>} label="Pendapatan / Bulan" value={formatCurrency(calculations.monthlyRevenue)} />
            <ResultCard icon={<TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400"/>} label="Profit / Bulan" value={formatCurrency(calculations.monthlyProfit)} />
            <ResultCard icon={<Banknote className="h-6 w-6 text-green-600 dark:text-green-400"/>} label="Pendapatan / Tahun" value={formatCurrency(calculations.annualRevenue)} />
            <ResultCard icon={<Target className="h-6 w-6 text-green-600 dark:text-green-400"/>} label="Profit / Tahun" value={formatCurrency(calculations.annualProfit)} />
            <div className="sm:col-span-2">
                <ResultCard icon={<CalendarCheck className="h-6 w-6 text-green-600 dark:text-green-400"/>} label="Perkiraan Waktu Balik Modal" value={calculations.paybackPeriod} />
            </div>
            {calculations.projectionData && <RevenueProjectionChart data={calculations.projectionData} />}
        </div>
    </div>
);