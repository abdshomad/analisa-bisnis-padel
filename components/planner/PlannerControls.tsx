import React from 'react';
import SearchableDropdown from '../ui/SearchableDropdown';
import { Search, ListChecks, X, Upload, Camera, AlertTriangle } from 'lucide-react';
import type { useAIPlanner } from '../../hooks/useAIPlanner';

type PlannerControlsProps = {
    state: ReturnType<typeof useAIPlanner>['state'];
    actions: ReturnType<typeof useAIPlanner>['actions'];
}

const PlannerControls: React.FC<PlannerControlsProps> = ({ state, actions }) => {
    const { stage, locations, selectedLocation, isLoading, imageAnalysisLoading, imageAnalysisError, imagePreviewUrl, detectedCoordinates } = state;
    const { setSelectedLocation, startOutlineGeneration, analyzeImage, clearImage } = actions;

    const handleImageFileSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            analyzeImage(file);
        }
        event.target.value = '';
    };

    return (
        <div className="w-full max-w-3xl mx-auto bg-white dark:bg-brand-light-dark p-6 rounded-lg mb-8 shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white text-center">Hasilkan Analisis Peluang Bisnis Lokal</h3>
            <div className="space-y-4">
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-slate-500 dark:text-brand-text-muted mb-1">1. Pilih Lokasi Secara Manual</label>
                    <SearchableDropdown
                        options={locations}
                        value={selectedLocation}
                        onChange={setSelectedLocation}
                        disabled={stage !== 'initial' || imageAnalysisLoading || !!imagePreviewUrl}
                        placeholder="Ketik atau pilih lokasi..."
                    />
                </div>

                <div className="flex items-center text-center my-4">
                    <div className="flex-grow border-t border-slate-300 dark:border-slate-600"></div>
                    <span className="flex-shrink mx-4 text-sm font-semibold text-slate-500 dark:text-brand-text-muted">ATAU</span>
                    <div className="flex-grow border-t border-slate-300 dark:border-slate-600"></div>
                </div>
                
                <div>
                    <p className="block text-sm font-medium text-slate-500 dark:text-brand-text-muted mb-1">
                        2. Biarkan AI Mengenali Lokasi Anda
                    </p>
                    
                    {imagePreviewUrl ? (
                         <div className="mt-2">
                            <div className="relative group">
                               <div className={`relative rounded-lg overflow-hidden border-2 ${imageAnalysisLoading ? 'border-brand-cyan animate-pulse' : 'border-slate-400 dark:border-slate-500'}`}>
                                   <img src={imagePreviewUrl} alt="Pratinjau Lokasi" className="w-full h-auto object-cover max-h-64 rounded-md" />
                                   {imageAnalysisLoading && (
                                       <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center scanning-effect">
                                           <p className="text-white font-bold text-lg animate-pulse">Menganalisis gambar...</p>
                                       </div>
                                   )}
                               </div>
                               <button
                                   onClick={clearImage}
                                   disabled={imageAnalysisLoading}
                                   className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1.5 hover:bg-black/75 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                                   aria-label="Hapus gambar"
                               >
                                   <X className="h-5 w-5" />
                               </button>
                           </div>
                           {detectedCoordinates && !imageAnalysisLoading && (
                               <div className="mt-3 text-center bg-brand-cyan/10 p-3 rounded-md">
                                   <p className="text-sm font-semibold text-slate-800 dark:text-white">
                                       Lokasi Terdeteksi: <span className="font-bold text-brand-cyan">{selectedLocation}</span>
                                   </p>
                                   <p className="text-xs text-slate-500 dark:text-brand-text-muted">
                                       ({detectedCoordinates.latitude.toFixed(5)}, {detectedCoordinates.longitude.toFixed(5)})
                                   </p>
                               </div>
                           )}
                            {imageAnalysisError && !imageAnalysisLoading && (
                                <div className="mt-3 text-left bg-red-100 dark:bg-red-900/20 p-3 rounded-md border border-red-300 dark:border-red-700 flex items-start">
                                    <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mr-3 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-semibold text-red-800 dark:text-red-200">
                                            Analisis Gambar Gagal
                                        </p>
                                        <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                                            {imageAnalysisError} Silakan coba unggah foto lain yang lebih jelas.
                                        </p>
                                    </div>
                                </div>
                           )}
                        </div>
                    ) : (
                        <>
                            <input
                                type="file"
                                id="file-upload"
                                accept="image/*"
                                onChange={handleImageFileSelected}
                                className="hidden"
                                disabled={stage !== 'initial'}
                            />
                            <input
                                type="file"
                                id="camera-upload"
                                accept="image/*"
                                capture="environment"
                                onChange={handleImageFileSelected}
                                className="hidden"
                                disabled={stage !== 'initial'}
                            />
                            <div className="flex flex-col sm:flex-row gap-4 mt-2">
                               <label
                                   htmlFor="file-upload"
                                   className={`w-full p-4 rounded-lg border-2 border-dashed flex flex-col items-center justify-center text-center transition duration-300 ${stage !== 'initial' ? 'border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 cursor-not-allowed opacity-60' : 'border-slate-400 dark:border-slate-500 bg-slate-50 dark:bg-slate-700/50 hover:border-brand-cyan hover:bg-brand-cyan/10 dark:hover:bg-brand-cyan/20 cursor-pointer'}`}
                               >
                                   <Upload className="h-8 w-8 text-brand-cyan mb-2" />
                                   <span className="font-bold text-slate-800 dark:text-white">Unggah dari Perangkat</span>
                                   <span className="text-xs text-slate-500 dark:text-brand-text-muted mt-1">Pilih foto dari galeri Anda.</span>
                               </label>
                               <label
                                   htmlFor="camera-upload"
                                   className={`w-full p-4 rounded-lg border-2 border-dashed flex flex-col items-center justify-center text-center transition duration-300 ${stage !== 'initial' ? 'border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800 cursor-not-allowed opacity-60' : 'border-slate-400 dark:border-slate-500 bg-slate-50 dark:bg-slate-700/50 hover:border-brand-cyan hover:bg-brand-cyan/10 dark:hover:bg-brand-cyan/20 cursor-pointer'}`}
                               >
                                   <Camera className="h-8 w-8 text-brand-cyan mb-2" />
                                   <span className="font-bold text-slate-800 dark:text-white">Ambil Foto</span>
                                   <span className="text-xs text-slate-500 dark:text-brand-text-muted mt-1">Gunakan kamera perangkat Anda.</span>
                               </label>
                           </div>
                        </>
                    )}
                </div>


                <div className="flex items-center justify-center p-3 bg-slate-100 dark:bg-brand-dark rounded-md mt-4">
                    <div className="flex items-center">
                        <Search className="h-5 w-5 mr-2 text-brand-cyan" />
                        <span className="text-sm font-medium text-slate-700 dark:text-brand-text-muted">Menggunakan data real-time dari Google Search</span>
                    </div>
                </div>
                {stage === 'initial' && (
                    <button onClick={startOutlineGeneration} disabled={isLoading || !selectedLocation || imageAnalysisLoading} className="w-full bg-brand-cyan hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-md transition duration-300 disabled:bg-slate-500 disabled:cursor-not-allowed flex items-center justify-center">
                        <ListChecks className="mr-2 h-5 w-5" /> Buat Kerangka Analisis
                    </button>
                )}
            </div>
        </div>
    );
};

export default PlannerControls;