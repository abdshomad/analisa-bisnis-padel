import React from 'react';
import { DollarSign, Sliders, CircleDollarSign, Clock, CalendarDays } from 'lucide-react';
import type { useROICalculator } from '../../../hooks/useROICalculator';

const InputRow = ({ icon, label, children }: { icon: React.ReactNode, label: string, children: React.ReactNode }) => (
    <div className="mb-4">
        <label className="flex items-center text-sm font-medium text-slate-600 dark:text-brand-text-muted mb-2">
            {icon}
            <span className="ml-2">{label}</span>
        </label>
        {children}
    </div>
);

type CalculatorFormProps = {
    state: ReturnType<typeof useROICalculator>['state'];
    actions: ReturnType<typeof useROICalculator>['actions'];
};

export const CalculatorForm: React.FC<CalculatorFormProps> = ({ state, actions }) => (
    <div>
        <h4 className="font-bold text-lg mb-4 text-slate-800 dark:text-white">Asumsi Investasi & Operasional</h4>
        <InputRow icon={<DollarSign className="h-5 w-5 text-slate-500"/>} label="Total Investasi (CAPEX)">
            <input type="number" step="1000000" value={state.capex} onChange={e => actions.setCapex(Number(e.target.value))} className="w-full bg-slate-100 dark:bg-slate-700 rounded-md p-2 text-slate-900 dark:text-white"/>
        </InputRow>
        <InputRow icon={<Sliders className="h-5 w-5 text-slate-500"/>} label="Biaya Operasional / Bulan (OPEX)">
            <input type="number" step="100000" value={state.monthlyOpex} onChange={e => actions.setMonthlyOpex(Number(e.target.value))} className="w-full bg-slate-100 dark:bg-slate-700 rounded-md p-2 text-slate-900 dark:text-white"/>
        </InputRow>
        <InputRow icon={<CircleDollarSign className="h-5 w-5 text-slate-500"/>} label="Harga Sewa Rata-rata / Jam">
            <input type="number" step="10000" value={state.hourlyRate} onChange={e => actions.setHourlyRate(Number(e.target.value))} className="w-full bg-slate-100 dark:bg-slate-700 rounded-md p-2 text-slate-900 dark:text-white"/>
        </InputRow>
        <InputRow icon={<Clock className="h-5 w-5 text-slate-500"/>} label={`Jam Operasi Rata-rata / Hari: ${state.dailyHours} jam`}>
            <input type="range" min="1" max="16" value={state.dailyHours} onChange={e => actions.setDailyHours(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700" />
        </InputRow>
        <InputRow icon={<CalendarDays className="h-5 w-5 text-slate-500"/>} label={`Hari Operasi / Bulan: ${state.operatingDays} hari`}>
            <input type="range" min="1" max="31" value={state.operatingDays} onChange={e => actions.setOperatingDays(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700" />
        </InputRow>
    </div>
);