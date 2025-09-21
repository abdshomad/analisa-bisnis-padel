import { useEffect, useRef } from 'react';
// FIX: Imported 'Stage' type directly from 'types.ts' as it is not exported from 'useAIPlanner.ts'.
import type { Stage } from '../types';

interface PlannerEffectsProps {
    stage: Stage;
    selectedLocation: string;
    locations: string[];
    outlineLength: number;
    // FIX: Corrected the type definitions for `setGenerationProgress` and `setCountdown`
    // to accept both a direct value and an updater function, resolving a TypeScript error.
    setGenerationProgress: (update: number | ((prev: number) => number)) => void;
    setShowCelebration: (show: boolean) => void;
    imagePreviewUrl: string | null;
    detectedCoordinates: { latitude: number; longitude: number } | null;
}

export const usePlannerEffects = ({
    stage,
    selectedLocation,
    locations,
    outlineLength,
    setGenerationProgress,
    setShowCelebration,
    imagePreviewUrl,
    detectedCoordinates,
}: PlannerEffectsProps) => {
    const debouncedCheckRef = useRef<number | null>(null);

    // Effect for "new location" celebration
    useEffect(() => {
        if (debouncedCheckRef.current) clearTimeout(debouncedCheckRef.current);
        if (stage !== 'initial' || !selectedLocation) return;

        debouncedCheckRef.current = window.setTimeout(() => {
            const isNewLocation = !locations.some(loc => loc.toLowerCase() === selectedLocation.trim().toLowerCase()) && selectedLocation.trim() !== '';

            if (!isNewLocation) return;
            
            // If the location change came from image analysis, only celebrate if coordinates were successfully detected.
            // Otherwise, if it was typed manually, celebrate a new location.
            if (imagePreviewUrl) {
                if (detectedCoordinates) {
                    setShowCelebration(true);
                    setTimeout(() => setShowCelebration(false), 4000);
                }
            } else {
                setShowCelebration(true);
                setTimeout(() => setShowCelebration(false), 4000);
            }
        }, 750);
        
        return () => { if (debouncedCheckRef.current) clearTimeout(debouncedCheckRef.current) };
    }, [selectedLocation, locations, stage, setShowCelebration, imagePreviewUrl, detectedCoordinates]);

    // Effect for analysis progress simulation
    useEffect(() => {
        let interval: number;
        if (stage === 'generating_analysis' && outlineLength > 0) {
            setGenerationProgress(0);
            interval = window.setInterval(() => {
                setGenerationProgress(prev => (prev >= outlineLength - 1 ? prev : prev + 1));
            }, 1500);
        }
        return () => clearInterval(interval);
    }, [stage, outlineLength, setGenerationProgress]);
    
};
