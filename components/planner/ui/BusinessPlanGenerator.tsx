import React from 'react';
import { FileText, Award, Play } from 'lucide-react';

interface BusinessPlanGeneratorProps {
    onGenerate: (template: 'narrative' | 'formal') => void;
}

export const BusinessPlanGenerator: React.FC<BusinessPlanGeneratorProps> = ({ onGenerate }) => (
    <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
        <h3 className="text-xl font-bold text-center mb-4 text-slate-900 dark:text-white">Langkah Terakhir: Buat Rencana Bisnis</h3>
        <p className="text-center text-slate-500 dark:text-brand-text-muted mb-6">Ubah analisis Anda menjadi rencana bisnis yang dapat ditindaklanjuti dengan memilih salah satu templat berikut.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <div className="flex-1 p-4 border-2 border-slate-300 dark:border-slate-600 rounded-lg text-left flex flex-col justify-between">
                <div>
                    <div className="flex items-center mb-1">
                        <FileText className="h-5 w-5 mr-2 text-brand-cyan" />
                        <span className="font-bold text-slate-800 dark:text-white">Berikutnya: Naratif Sederhana</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-brand-text-muted mb-4">Cepat dan langsung, ideal untuk presentasi internal atau ringkasan awal.</p>
                </div>
                <button
                    onClick={() => onGenerate('narrative')}
                    className="w-full mt-2 flex items-center justify-center bg-brand-cyan/10 hover:bg-brand-cyan/20 text-brand-cyan font-bold py-2 px-4 rounded-md transition duration-300"
                >
                    <Play className="h-4 w-4 mr-2" /> Hasilkan Rencana Naratif
                </button>
            </div>
            <div className="flex-1 p-4 border-2 border-slate-300 dark:border-slate-600 rounded-lg text-left flex flex-col justify-between">
                <div>
                    <div className="flex items-center mb-1">
                        <Award className="h-5 w-5 mr-2 text-brand-cyan" />
                        <span className="font-bold text-slate-800 dark:text-white">Berikutnya: Formal Rinci</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-brand-text-muted mb-4">Struktur komprehensif, cocok untuk proposal investor atau perbankan.</p>
                </div>
                 <button
                    onClick={() => onGenerate('formal')}
                    className="w-full mt-2 flex items-center justify-center bg-brand-cyan/10 hover:bg-brand-cyan/20 text-brand-cyan font-bold py-2 px-4 rounded-md transition duration-300"
                >
                    <Play className="h-4 w-4 mr-2" /> Hasilkan Rencana Formal
                </button>
            </div>
        </div>
    </div>
);