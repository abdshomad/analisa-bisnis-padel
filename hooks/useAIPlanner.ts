import { useState, useRef, useMemo, useCallback } from 'react';
import { generateBusinessOutline, generateFullAnalysis, generateBusinessPlan, analyzeLocationImage } from '../services/geminiService';
import { IndonesianProvinces } from '../types';
import type { SearchSource, Stage } from '../types';
import { PROVINCES } from '../constants';
import { courtData } from '../data/courtData';
import { usePlannerEffects } from './usePlannerEffects';

export const useAIPlanner = () => {
    const [stage, setStage] = useState<Stage>('initial');
    const [selectedLocation, setSelectedLocation] = useState<string>(IndonesianProvinces.JAKARTA);
    const [outline, setOutline] = useState<string[]>([]);
    const [editableOutline, setEditableOutline] = useState<string[]>([]);
    const [analysis, setAnalysis] = useState<string>('');
    const [businessPlan, setBusinessPlan] = useState<string>('');
    const [sources, setSources] = useState<SearchSource[]>([]);
    const [generationProgress, setGenerationProgress] = useState<number>(-1);
    const [showCelebration, setShowCelebration] = useState<boolean>(false);
    const [imageAnalysisLoading, setImageAnalysisLoading] = useState<boolean>(false);
    const [imageAnalysisError, setImageAnalysisError] = useState<string | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
    const [detectedCoordinates, setDetectedCoordinates] = useState<{ latitude: number, longitude: number } | null>(null);
    const [countdown, setCountdown] = useState<number | null>(null);
    const isGenerationCancelled = useRef<boolean>(false);

    const { province, city } = useMemo(() => {
        const parts = selectedLocation.split(', ');
        return {
            city: parts.length === 2 ? parts[0] : '',
            province: parts.length === 2 ? parts[1] : selectedLocation
        };
    }, [selectedLocation]);
    
    const locations = useMemo(() => {
        const cityLocations = new Set(courtData.map(c => `${c.city}, ${c.province}`));
        return Array.from(new Set([...PROVINCES, ...cityLocations])).sort();
    }, []);

    const handleCancelGeneration = useCallback(() => {
        isGenerationCancelled.current = true;
        setCountdown(null);
        if (stage === 'generating_outline') setStage('initial');
        else if (stage === 'generating_analysis') setStage('outline_ready');
        else if (stage === 'generating_business_plan') setStage('analysis_ready');
    }, [stage]);

    const executeWithJitter = async (task: () => Promise<void>) => {
        const delay = Math.floor(Math.random() * 2) + 2; // 2-3 seconds
        setCountdown(delay);

        await new Promise(resolve => {
            let remaining = delay;
            const intervalId = setInterval(() => {
                if (isGenerationCancelled.current) {
                    clearInterval(intervalId);
                    resolve(true);
                    return;
                }
                remaining--;
                setCountdown(remaining > 0 ? remaining : 0);
                if (remaining <= 0) {
                    clearInterval(intervalId);
                    resolve(true);
                }
            }, 1000);
        });

        setCountdown(null);

        if (isGenerationCancelled.current) return;
        await task();
    };


    const startOutlineGeneration = useCallback(async () => {
        if (!province) return;
        isGenerationCancelled.current = false;
        setStage('generating_outline');
        setAnalysis(''); setOutline([]); setSources([]); setEditableOutline([]);

        await executeWithJitter(async () => {
             if (isGenerationCancelled.current) return;
            const courtsInProvince = courtData.filter(c => c.province === province).length;
            const courtsInCity = city ? courtData.filter(c => c.province === province && c.city === city).length : undefined;
            const result = await generateBusinessOutline(province, courtsInProvince, city || undefined, courtsInCity, detectedCoordinates || undefined);
            if (!isGenerationCancelled.current) {
                setOutline(result);
                setEditableOutline(result);
                setStage('outline_ready');
            }
        });
    }, [province, city, detectedCoordinates]);
    
    const startFullAnalysis = useCallback(async () => {
        if (stage !== 'outline_ready' || !province) return;
        isGenerationCancelled.current = false;
        setStage('generating_analysis');

        await executeWithJitter(async () => {
            if (isGenerationCancelled.current) return;
            const { analysis: result, sources: resultSources } = await generateFullAnalysis(province, editableOutline, true, city || undefined);
            if (!isGenerationCancelled.current) {
                setAnalysis(result); setSources(resultSources); setStage('analysis_ready'); setGenerationProgress(-1);
            }
        });
    }, [stage, province, editableOutline, city]);

    const startBusinessPlanGeneration = useCallback(async (templateType: 'narrative' | 'formal') => {
        if (!templateType || !analysis) return;
        isGenerationCancelled.current = false;
        setStage('generating_business_plan');
        
        await executeWithJitter(async () => {
            if (isGenerationCancelled.current) return;
            const result = await generateBusinessPlan(analysis, templateType, selectedLocation);
            if (!isGenerationCancelled.current) {
                setBusinessPlan(result); setStage('business_plan_ready');
            }
        });
    }, [analysis, selectedLocation]);

    const analyzeImage = useCallback(async (file: File) => {
        setImageAnalysisError(null);
        setDetectedCoordinates(null);
        setImagePreviewUrl(null);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const previewUrl = reader.result as string;
            setImagePreviewUrl(previewUrl);
            setImageAnalysisLoading(true);

            try {
                const base64String = previewUrl.split(',')[1];
                const result = await analyzeLocationImage(base64String, file.type);
                if (result?.locationName) {
                    setSelectedLocation(result.locationName);
                    setDetectedCoordinates({ latitude: result.latitude, longitude: result.longitude });
                } else {
                    setImageAnalysisError("Tidak dapat mengidentifikasi lokasi dari gambar.");
                }
            } catch (error) {
                setImageAnalysisError("Terjadi kesalahan saat menganalisis gambar.");
            } finally {
                setImageAnalysisLoading(false);
            }
        };
        reader.onerror = () => { 
            setImageAnalysisError("Gagal membaca file gambar.");
            setImageAnalysisLoading(false);
        };
    }, []);
    
    const clearImage = useCallback(() => {
        setImagePreviewUrl(null);
        setImageAnalysisError(null);
        setDetectedCoordinates(null);
        setSelectedLocation(IndonesianProvinces.JAKARTA);
    }, []);

    const handleReset = useCallback(() => {
        isGenerationCancelled.current = true;
        setStage('initial'); setSelectedLocation(IndonesianProvinces.JAKARTA);
        setAnalysis(''); setOutline([]); setSources([]); setBusinessPlan(''); setEditableOutline([]);
        setGenerationProgress(-1); setShowCelebration(false);
        setImageAnalysisLoading(false); setImageAnalysisError(null); setDetectedCoordinates(null);
        setCountdown(null);
        setImagePreviewUrl(null);
    }, []);

    const updateOutlineItem = useCallback((index: number, value: string) => {
        setEditableOutline(prev => prev.map((item, i) => (i === index ? value : item)));
    }, []);
    const addOutlineItem = useCallback((index: number) => {
        setEditableOutline(prev => [...prev.slice(0, index + 1), 'Poin kerangka baru...', ...prev.slice(index + 1)]);
    }, []);
    const removeOutlineItem = useCallback((index: number) => {
        setEditableOutline(prev => prev.filter((_, i) => i !== index));
    }, []);
    const resetOutline = useCallback(() => {
        setEditableOutline(outline);
    }, [outline]);

    usePlannerEffects({
        stage, selectedLocation, locations, outlineLength: editableOutline.length,
        setGenerationProgress, setShowCelebration,
    });

    return {
        state: {
            stage, selectedLocation, outline, analysis, businessPlan, sources,
            generationProgress, showCelebration, imageAnalysisLoading, imageAnalysisError,
            isLoading: stage.startsWith('generating'), locations, editableOutline, countdown,
            imagePreviewUrl, detectedCoordinates,
        },
        actions: {
            setSelectedLocation, startOutlineGeneration,
            startFullAnalysis, startBusinessPlanGeneration, handleReset, handleCancelGeneration, analyzeImage,
            updateOutlineItem, addOutlineItem, removeOutlineItem, resetOutline,
            clearImage,
        }
    };
};