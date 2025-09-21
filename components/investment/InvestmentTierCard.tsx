import React from 'react';
// FIX: Changed import path for InvestmentTier type from data file to the central types.ts file.
import type { InvestmentTier } from '../../types';
import { getIcon, DetailRow, SubtotalRow, TotalRow } from './InvestmentComponents';

export const InvestmentTierCard: React.FC<{ tier: InvestmentTier }> = ({ tier }) => (
    <div className="bg-white dark:bg-brand-light-dark border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm w-full flex flex-col">
        <div className="p-6 text-center">
            <h3 className="text-2xl font-bold text-brand-cyan">{tier.name}</h3>
            <p className="text-slate-500 dark:text-brand-text-muted mt-1 text-sm">{tier.description}</p>
        </div>

        <div className="p-6 pt-0 space-y-6 flex-grow flex flex-col">
            <div className="flex-grow">
                <h4 className="font-bold text-center text-slate-700 dark:text-slate-300 mb-4">{tier.capex.title}</h4>
                <ul className="px-4">
                    {tier.capex.items.map(item => {
                        if (item.isTotal) return <TotalRow key={item.label} item={item} className="bg-slate-200 dark:bg-brand-dark text-slate-800 dark:text-brand-cyan" />;
                        if (item.isSubtotal) return <SubtotalRow key={item.label} item={item} />;
                        if (item.icon) {
                            return (
                                <li key={item.label} className="flex items-center justify-between py-2 -mx-4 px-4 rounded-lg bg-slate-100 dark:bg-brand-dark/50 text-sm">
                                    <div className="flex items-center">
                                        {getIcon(item.icon, "bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300")}
                                        <span className="font-semibold text-slate-700 dark:text-slate-200">{item.label}</span>
                                    </div>
                                    <span className="font-semibold text-slate-800 dark:text-white">{item.value}</span>
                                </li>
                            );
                        }
                        return <DetailRow key={item.label} item={item} />;
                    })}
                </ul>
            </div>
            
            <div className="flex-grow">
                <h4 className="font-bold text-center text-slate-700 dark:text-slate-300 mb-4">{tier.opex.title}</h4>
                <ul className="px-4">
                    {tier.opex.items.map(item => {
                        if (item.isTotal) return <TotalRow key={item.label} item={item} className="bg-blue-100 dark:bg-sky-900/50 text-blue-800 dark:text-sky-300" />;
                        return <DetailRow key={item.label} item={item}>{item.icon && getIcon(item.icon, "bg-blue-100 dark:bg-sky-900/50 text-blue-600 dark:text-sky-400")}</DetailRow>;
                    })}
                </ul>
            </div>
            
            <div className="border-t border-dashed border-slate-300 dark:border-slate-600 my-4"></div>

            <div className="bg-green-50 dark:bg-teal-900/20 p-4 rounded-lg flex-grow">
                <h4 className="font-bold text-center text-slate-700 dark:text-slate-300 mb-4">{tier.roi.title}</h4>
                <div className="text-sm text-slate-600 dark:text-brand-text-muted mb-4">
                    <p className="font-semibold mb-2">Asumsi Utama:</p>
                    <ul className="space-y-2">{tier.roi.assumptions.map(item => <DetailRow key={item.label} item={item}>{item.icon && getIcon(item.icon, "bg-green-100 dark:bg-teal-900/40 text-green-600 dark:text-teal-400")}</DetailRow>)}</ul>
                </div>
                <ul className="space-y-2">{tier.roi.projections.map(item => <DetailRow key={item.label} item={item}>{item.icon && getIcon(item.icon, "bg-green-100 dark:bg-teal-900/40 text-green-600 dark:text-teal-400")}</DetailRow>)}</ul>
            </div>

            {tier.packages && (
                <div className="flex-grow">
                    <div className="border-t border-dashed border-slate-300 dark:border-slate-600 mb-4"></div>
                    <div className="px-4">
                        <h4 className="font-bold text-center text-slate-700 dark:text-slate-300 mb-4">Contoh Harga & Paket Sewa</h4>
                        <ul className="space-y-3">
                            {tier.packages.map((pkg) => (
                                <li key={pkg.name} className="bg-slate-100 dark:bg-brand-dark/50 p-3 rounded-lg text-sm">
                                    <div className="flex justify-between items-center font-semibold">
                                        <span className="text-slate-800 dark:text-white">{pkg.name}</span>
                                        <span className="text-brand-cyan">{pkg.price}</span>
                                    </div>
                                    <p className="text-slate-500 dark:text-brand-text-muted mt-1 text-xs">{pkg.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    </div>
);