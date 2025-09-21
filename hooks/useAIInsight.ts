import { useState, useCallback, useRef } from 'react';
import { generateInsight } from '../services/geminiService';
import type { InsightWithRecommendation } from '../services/geminiService';

export const useAIInsight = (initialInsight: string, initialRecommendation: string, topic: string) => {
    const [insights, setInsights] = useState<InsightWithRecommendation[]>([{ insight: initialInsight, recommendation: initialRecommendation }]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [countdown, setCountdown] = useState<string | null>(null);
    const animationFrameId = useRef<number | null>(null);

    const handleGenerateNewInsight = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        setCountdown('0.000s');

        const startTime = Date.now();

        const updateCountdown = () => {
            const elapsedTime = (Date.now() - startTime) / 1000;
            setCountdown(`${elapsedTime.toFixed(3)}s`);
            animationFrameId.current = requestAnimationFrame(updateCountdown);
        };

        animationFrameId.current = requestAnimationFrame(updateCountdown);

        const existingInsightTexts = insights.map(i => i.insight);
        const result = await generateInsight(topic, existingInsightTexts);
        
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = null;
        }
        setCountdown(null);

        if ('error' in result) {
            setError(result.error);
        } else {
            setInsights(prev => [...prev, result]);
            setCurrentIndex(insights.length);
        }
        
        setIsLoading(false);
    }, [topic, insights]);

    const goToNext = () => {
        setCurrentIndex(prev => (prev + 1) % insights.length);
    };

    const goToPrevious = () => {
        setCurrentIndex(prev => (prev - 1 + insights.length) % insights.length);
    };

    return {
        currentInsight: insights[currentIndex],
        currentIndex,
        totalInsights: insights.length,
        isLoading,
        error,
        countdown,
        actions: {
            generateNewInsight: handleGenerateNewInsight,
            goToNext,
            goToPrevious,
        },
    };
};