import React, { useState, useEffect } from 'react';
import { Trash2, PlusCircle, RotateCcw, Play, Edit, Save, X } from 'lucide-react';

interface EditableOutlineProps {
    outline: string[];
    onUpdate: (index: number, value: string) => void;
    onAdd: (index: number) => void;
    onRemove: (index: number) => void;
    onReset: () => void;
    onGenerateAnalysis: () => void;
}

export const EditableOutline: React.FC<EditableOutlineProps> = ({
    outline, onUpdate, onAdd, onRemove, onReset, onGenerateAnalysis
}) => {
    const [isEditing, setIsEditing] = useState(false);

    // When the outline prop changes (e.g., new one generated), exit edit mode.
    useEffect(() => {
        setIsEditing(false);
    }, [outline]);
    
    const handleCancel = () => {
        onReset(); // Revert changes in parent state
        setIsEditing(false);
    };

    return (
        <div>
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Kerangka Analisis Siap</h3>
                <p className="text-slate-500 dark:text-brand-text-muted mt-2">
                    {isEditing
                        ? "Sesuaikan kerangka di bawah ini, lalu simpan perubahan Anda."
                        : "Tinjau kerangka di bawah ini, atau langsung lanjutkan untuk membuat analisis lengkap."
                    }
                </p>
            </div>

            <div className="space-y-3 mb-6">
                {outline.map((item, index) => (
                    <div key={index} className="flex items-center group gap-2">
                        <span className="text-brand-cyan font-semibold mt-2 self-start">{index + 1}.</span>
                        {isEditing ? (
                             <textarea
                                value={item}
                                onChange={(e) => onUpdate(index, e.target.value)}
                                rows={1}
                                className="flex-grow w-full bg-slate-50 dark:bg-brand-dark/50 p-2 rounded-md border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-brand-cyan focus:border-brand-cyan resize-none transition"
                                aria-label={`Outline item ${index + 1}`}
                            />
                        ) : (
                            <p className="flex-grow p-2 text-slate-700 dark:text-brand-text-muted">{item}</p>
                        )}
                       
                        {isEditing && (
                            <>
                                <button onClick={() => onAdd(index)} className="p-2 text-slate-400 hover:text-green-500 transition-colors" aria-label="Add item below">
                                    <PlusCircle className="h-5 w-5" />
                                </button>
                                <button onClick={() => onRemove(index)} className="p-2 text-slate-400 hover:text-red-500 transition-colors" aria-label="Remove item">
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
            
             <div className="flex flex-col sm:flex-row justify-center items-center gap-4 border-t border-slate-200 dark:border-slate-700 pt-6">
                {isEditing ? (
                    <>
                        <button onClick={() => setIsEditing(false)} className="w-full sm:w-auto flex items-center justify-center bg-brand-cyan hover:bg-cyan-500 text-white font-bold py-3 px-6 rounded-md transition duration-300">
                            <Save className="mr-2 h-5 w-5" /> Simpan Perubahan
                        </button>
                        <button onClick={handleCancel} className="w-full sm:w-auto flex items-center justify-center bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-semibold py-2 px-4 rounded-md transition duration-300">
                            <X className="mr-2 h-4 w-4" /> Batalkan
                        </button>
                        <button onClick={onReset} className="w-full sm:w-auto flex items-center justify-center bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-semibold py-2 px-4 rounded-md transition duration-300">
                            <RotateCcw className="mr-2 h-4 w-4" /> Reset ke Asli
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={onGenerateAnalysis} className="w-full sm:w-auto flex items-center justify-center bg-brand-cyan hover:bg-cyan-500 text-white font-bold py-3 px-6 rounded-md transition duration-300">
                            <Play className="mr-2 h-5 w-5" /> Buat Analisis Lengkap
                        </button>
                        <button onClick={() => setIsEditing(true)} className="w-full sm:w-auto flex items-center justify-center bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-semibold py-2 px-4 rounded-md transition duration-300">
                            <Edit className="mr-2 h-4 w-4" /> Ubah Kerangka
                        </button>
                    </>
                )}
            </div>

        </div>
    );
};