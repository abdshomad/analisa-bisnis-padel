import React from 'react';
// FIX: Changed import path for types from data file to the central types.ts file.
import type { InvestmentDetail, ROIProjectionItem } from '../../types';
import { Home, Users, Zap, Wrench, Info, Banknote, BarChart3, Clock } from 'lucide-react';

export const iconMap: { [key: string]: React.ReactNode } = {
    home: <Home className="h-5 w-5" />,
    users: <Users className="h-5 w-5" />,
    bolt: <Zap className="h-5 w-5" />,
    wrench: <Wrench className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
    cash: <Banknote className="h-5 w-5" />,
    chart: <BarChart3 className="h-5 w-5" />,
    clock: <Clock className="h-5 w-5" />,
};

export const getIcon = (name: string, classes: string) => (
    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${classes}`}>
        {iconMap[name]}
    </div>
);

export const DetailRow: React.FC<{ item: InvestmentDetail | ROIProjectionItem; children?: React.ReactNode }> = ({ item, children }) => (
    <li className="flex items-center justify-between py-2 border-b border-slate-200 dark:border-slate-700/60 text-sm">
        <div className="flex items-center">
            {children}
            <span className="text-slate-600 dark:text-brand-text-muted">{item.label}</span>
        </div>
        {item.value && <span className="font-semibold text-slate-800 dark:text-white">{item.value}</span>}
    </li>
);

export const SubtotalRow: React.FC<{ item: InvestmentDetail }> = ({ item }) => (
    <li className="flex items-center justify-between py-2 border-t border-slate-200 dark:border-slate-700/60 mt-2 text-sm">
        <span className="font-semibold text-slate-600 dark:text-brand-text-muted">{item.label}</span>
        <span className="font-semibold text-slate-800 dark:text-white">{item.value}</span>
    </li>
);

export const TotalRow: React.FC<{ item: InvestmentDetail, className?: string }> = ({ item, className = '' }) => (
    <li className={`flex items-center justify-between p-3 -mx-4 -mb-2 mt-2 rounded-b-lg font-bold text-base ${className}`}>
        <span>{item.label}</span>
        <span>{item.value}</span>
    </li>
);