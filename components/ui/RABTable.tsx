import React from 'react';
import { ExternalLink } from 'lucide-react';
import { rabData } from '../../data/rabData';

const RABTable: React.FC = () => {
    return (
        <div className="mt-12 bg-white dark:bg-brand-light-dark p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-center mb-2 text-slate-900 dark:text-white">
                Perbandingan Rincian Anggaran Biaya (RAB) antar Kontraktor
            </h3>
            <p className="text-center text-slate-500 dark:text-brand-text-muted mb-6 max-w-4xl mx-auto">
                Bandingkan estimasi biaya dari berbagai kontraktor di Indonesia. Gunakan ini sebagai referensi, karena harga dapat bervariasi berdasarkan lokasi, material, dan cakupan proyek. Harga umumnya tidak termasuk sewa/pembelian lahan.
            </p>

            {/* Source Descriptions */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
                {rabData.sources.map(source => (
                    <div key={source.name} className="bg-slate-50 dark:bg-brand-dark p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                        <h4 className="font-bold text-slate-800 dark:text-white">{source.name}</h4>
                        <p className="text-xs text-slate-600 dark:text-brand-text-muted mt-1 mb-2">{source.description}</p>
                        <a 
                            href={source.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center text-xs font-semibold text-brand-cyan hover:underline">
                            Lihat Sumber <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                    </div>
                ))}
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-sm text-left text-slate-500 dark:text-slate-400">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-100 dark:bg-brand-dark dark:text-brand-text-muted">
                        <tr>
                            <th scope="col" className="px-6 py-3 w-1/3">Komponen Biaya</th>
                            {rabData.sources.map(source => (
                                <th key={source.name} scope="col" className="px-6 py-3 text-right">{source.name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rabData.structure.map((row, index) => {
                            if (row.type === 'group') {
                                return (
                                    <tr key={index} className="bg-slate-50 dark:bg-brand-dark/50">
                                        <td colSpan={4} className="px-6 py-3 font-bold text-slate-700 dark:text-brand-text-muted">
                                            {row.name}
                                        </td>
                                    </tr>
                                );
                            }
                            return (
                                <tr key={index} className="bg-white dark:bg-brand-light-dark border-b dark:border-slate-700">
                                    <td className="pl-12 pr-6 py-4 font-medium text-slate-900 dark:text-white">{row.name}</td>
                                    {rabData.sources.map(source => (
                                        <td key={source.name} className="px-6 py-4 text-right font-mono">
                                            {(row as any).costs[source.name] || '-'}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                    <tfoot>
                        <tr className="font-bold text-base bg-brand-cyan/10 text-slate-900 dark:text-white">
                            <td className="px-6 py-4 text-brand-cyan">{rabData.footer.label}</td>
                            {rabData.sources.map(source => (
                                <td key={source.name} className="px-6 py-4 text-right font-mono text-brand-cyan">
                                    {rabData.footer.costs[source.name as keyof typeof rabData.footer.costs]}
                                </td>
                            ))}
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default RABTable;
