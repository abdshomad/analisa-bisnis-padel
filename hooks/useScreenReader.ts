import { useState, useEffect, useRef, useCallback } from 'react';

export const useScreenReader = () => {
    const [isSupported, setIsSupported] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [progress, setProgress] = useState(0);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoiceURI, setSelectedVoiceURI] = useState<string | null>(() => {
        if (typeof window !== 'undefined') {
            return window.localStorage.getItem('selectedVoiceURI');
        }
        return null;
    });

    const elementsRef = useRef<HTMLElement[]>([]);
    const currentIndexRef = useRef(0);
    const lastSpokenElementRef = useRef<HTMLElement | null>(null);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const keepAliveIntervalRef = useRef<number | null>(null);
    const wasActiveRef = useRef(false);

    useEffect(() => {
        setIsSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);
    }, []);

    useEffect(() => {
        if (!isSupported) return;

        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            if (availableVoices.length === 0) return;

            const indonesianVoices = availableVoices.filter(v => v.lang.startsWith('id'));
            const otherVoices = availableVoices.filter(v => !v.lang.startsWith('id'));
            const sortedVoices = [...indonesianVoices, ...otherVoices];
            setVoices(sortedVoices);

            const currentSelectedVoice = sortedVoices.find(v => v.voiceURI === selectedVoiceURI);
            if (!currentSelectedVoice) {
                const defaultVoice = indonesianVoices[0] || sortedVoices.find(v => v.default) || sortedVoices[0];
                if (defaultVoice) {
                    setSelectedVoiceURI(defaultVoice.voiceURI);
                }
            }
        };

        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();

        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, [isSupported, selectedVoiceURI]);

    useEffect(() => {
        if (selectedVoiceURI) {
            window.localStorage.setItem('selectedVoiceURI', selectedVoiceURI);
        }
    }, [selectedVoiceURI]);


    useEffect(() => {
        if (wasActiveRef.current && !isActive && progress === 100) {
            const timer = setTimeout(() => {
                setProgress(0);
            }, 1000);
            return () => clearTimeout(timer);
        }
        wasActiveRef.current = isActive;
    }, [isActive, progress]);

    const startKeepAlive = useCallback(() => {
        if (keepAliveIntervalRef.current) {
            clearInterval(keepAliveIntervalRef.current);
        }
        keepAliveIntervalRef.current = window.setInterval(() => {
            if (window.speechSynthesis.speaking && !isPaused) {
                window.speechSynthesis.pause();
                window.speechSynthesis.resume();
            }
        }, 10000);
    }, [isPaused]);

    const stopKeepAlive = () => {
        if (keepAliveIntervalRef.current) {
            clearInterval(keepAliveIntervalRef.current);
            keepAliveIntervalRef.current = null;
        }
    };

    const cleanupHighlight = useCallback(() => {
        if (lastSpokenElementRef.current) {
            lastSpokenElementRef.current.classList.remove('reading-highlight');
            lastSpokenElementRef.current = null;
        }
    }, []);

    const speakNext = useCallback(() => {
        if (isPaused || !isActive) {
            if (!isActive) cleanupHighlight();
            return;
        }

        if (currentIndexRef.current >= elementsRef.current.length) {
            setIsActive(false);
            setProgress(100);
            cleanupHighlight();
            return;
        }

        const element = elementsRef.current[currentIndexRef.current];
        const isVisible = !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);
        const textToSpeak = element.innerText.trim();
        
        const currentProgress = (currentIndexRef.current / elementsRef.current.length) * 100;
        setProgress(currentProgress);

        if (textToSpeak && isVisible) {
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            utterance.lang = 'id-ID';
            
            const selectedVoice = voices.find(v => v.voiceURI === selectedVoiceURI);
            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }

            utteranceRef.current = utterance;
            
            utterance.onstart = () => {
                cleanupHighlight();
                element.classList.add('reading-highlight');
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                lastSpokenElementRef.current = element;
            };

            utterance.onend = () => {
                utteranceRef.current = null;
                currentIndexRef.current += 1;
                setTimeout(speakNext, 50);
            };
            
            utterance.onerror = (event) => {
                console.error('SpeechSynthesis Error:', event.error);
                utteranceRef.current = null;
                currentIndexRef.current += 1;
                setTimeout(speakNext, 100);
            };

            window.speechSynthesis.speak(utterance);
        } else {
            currentIndexRef.current += 1;
            speakNext();
        }
    }, [isPaused, isActive, cleanupHighlight, voices, selectedVoiceURI]);

    const play = useCallback(() => {
        if (isActive) return;

        const content = document.querySelector('main');
        if (!content) return;

        window.speechSynthesis.cancel();
        
        elementsRef.current = Array.from(content.querySelectorAll('h1, h2, h3, h4, p, li, th, td'));
        currentIndexRef.current = 0;
        setProgress(0.1);
        
        setIsActive(true);
        setIsPaused(false);
        setTimeout(speakNext, 100);
    }, [isActive, speakNext]);
    
    const stop = useCallback(() => {
        window.speechSynthesis.cancel();
        cleanupHighlight();
        setIsActive(false);
        setIsPaused(false);
        setProgress(0);
        utteranceRef.current = null;
        currentIndexRef.current = 0;
    }, [cleanupHighlight]);

    const pause = useCallback(() => {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.pause();
            setIsPaused(true);
        }
    }, []);

    const resume = useCallback(() => {
        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
            setIsPaused(false);
        }
    }, []);
    
    const setVoice = useCallback((voiceURI: string) => {
        const wasSpeaking = isActive && !isPaused;
        const lastIndex = currentIndexRef.current;

        window.speechSynthesis.cancel();
        cleanupHighlight();
        setIsActive(false);
        
        setSelectedVoiceURI(voiceURI);

        if (wasSpeaking) {
            setTimeout(() => {
                const content = document.querySelector('main');
                if (!content) return;
                elementsRef.current = Array.from(content.querySelectorAll('h1, h2, h3, h4, p, li, th, td'));
                
                currentIndexRef.current = Math.min(lastIndex, elementsRef.current.length - 1);
                
                setIsActive(true);
                setIsPaused(false);
                speakNext();
            }, 200);
        }
    }, [isActive, isPaused, speakNext, cleanupHighlight]);

    useEffect(() => {
        if (isActive && !isPaused) {
            startKeepAlive();
        } else {
            stopKeepAlive();
        }
        return stopKeepAlive;
    }, [isActive, isPaused, startKeepAlive]);

    useEffect(() => {
        return () => {
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
            cleanupHighlight();
        }
    }, [cleanupHighlight]);

    return { isSupported, isActive, isPaused, progress, voices, selectedVoiceURI, play, stop, pause, resume, setVoice };
};
