import React from 'react';
import { useScreenReader } from '../../hooks/useScreenReader';
import { Volume2, Play, Pause, Square, ChevronDown } from 'lucide-react';

const VoiceSelector: React.FC<{
    voices: SpeechSynthesisVoice[];
    selectedVoiceURI: string | null;
    onVoiceChange: (uri: string) => void;
}> = ({ voices, selectedVoiceURI, onVoiceChange }) => {
    if (voices.length === 0) return null;

    return (
        <div className="mt-2 pt-2 border-t border-slate-300 dark:border-slate-600">
            <label htmlFor="voice-select" className="block text-xs font-medium text-slate-500 dark:text-brand-text-muted mb-1">
                Suara
            </label>
            <div className="relative">
                <select
                    id="voice-select"
                    value={selectedVoiceURI || ''}
                    onChange={(e) => onVoiceChange(e.target.value)}
                    className="w-full appearance-none bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white text-sm rounded-md py-1.5 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                >
                    {voices.map((voice) => (
                        <option key={voice.voiceURI} value={voice.voiceURI}>
                            {voice.name} ({voice.lang})
                        </option>
                    ))}
                </select>
                <ChevronDown className="h-4 w-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500" />
            </div>
        </div>
    );
};


const ScreenReaderControl: React.FC = () => {
    const { isSupported, isActive, isPaused, progress, voices, selectedVoiceURI, play, stop, pause, resume, setVoice } = useScreenReader();

    if (!isSupported) {
        return null;
    }
    
    const showProgressBar = progress > 0;
    
    return (
        <>
            <div className="no-print fixed bottom-6 left-6 z-50 flex items-center gap-2">
                <button
                    onClick={isActive ? stop : play}
                    className="bg-brand-cyan text-white p-4 rounded-full shadow-lg hover:bg-cyan-500 transition-transform transform hover:scale-110"
                    aria-label={isActive ? "Hentikan Pembaca Layar" : "Bacakan Halaman"}
                >
                     {isActive ? <Square className="h-8 w-8" /> : <Volume2 className="h-8 w-8" />}
                </button>
                
                {isActive && (
                     <div className="bg-white dark:bg-brand-light-dark p-3 rounded-lg shadow-lg animate-pop-in w-64">
                         <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-800 dark:text-white">Pembaca Layar</span>
                            <button
                                onClick={isPaused ? resume : pause}
                                className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                                aria-label={isPaused ? "Lanjutkan Pembacaan" : "Jeda Pembacaan"}
                            >
                                {isPaused ? <Play className="h-5 w-5 text-slate-800 dark:text-white" /> : <Pause className="h-5 w-5 text-slate-800 dark:text-white" />}
                            </button>
                         </div>
                         <VoiceSelector
                            voices={voices}
                            selectedVoiceURI={selectedVoiceURI}
                            onVoiceChange={setVoice}
                         />
                    </div>
                )}
            </div>
            
            <div
                className={`no-print fixed bottom-0 left-0 w-full h-1.5 bg-slate-200 dark:bg-slate-700 z-50 transition-opacity duration-500 ${showProgressBar ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
                <div
                    className="h-full bg-brand-cyan transition-transform duration-200 ease-linear"
                    style={{ transform: `scaleX(${progress / 100})`, transformOrigin: 'left' }}
                ></div>
            </div>
        </>
    );
};

export default ScreenReaderControl;
