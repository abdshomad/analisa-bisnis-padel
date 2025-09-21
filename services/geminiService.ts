import { ai } from './gemini/client';
import { analyzeLocationSchema, outlineSchema, insightSchema } from './gemini/schemas';
import { 
    getLocationAnalysisPrompt, 
    getReverseGeocodePrompt,
    getBusinessOutlinePrompt, 
    getFullAnalysisPrompt, 
    getBusinessPlanPrompt,
    getInsightPrompt
} from './gemini/prompts';
import type { SearchSource } from '../types';

export interface LocationCoordinates {
    locationName: string;
    latitude: number;
    longitude: number;
}

export interface InsightWithRecommendation {
    insight: string;
    recommendation: string;
}

export const analyzeLocationImage = async (base64Image: string, mimeType: string): Promise<LocationCoordinates | null> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [{ inlineData: { data: base64Image, mimeType } }, { text: getLocationAnalysisPrompt() }] },
            config: { responseMimeType: "application/json", responseSchema: analyzeLocationSchema }
        });
        const parsed = JSON.parse(response.text.trim());

        // We MUST have coordinates.
        if (typeof parsed.latitude !== 'number' || typeof parsed.longitude !== 'number') {
            return null; // No coordinates, can't proceed.
        }

        // If we also got a name, great! Return immediately.
        if (parsed.locationName) {
            return {
                locationName: parsed.locationName,
                latitude: parsed.latitude,
                longitude: parsed.longitude,
            };
        }

        // If we have coordinates but NO name, try to get the name from coordinates using another AI call.
        console.log(`Coordinates found (${parsed.latitude}, ${parsed.longitude}), but no location name. Performing reverse geocode...`);
        const reverseGeocodePrompt = getReverseGeocodePrompt(parsed.latitude, parsed.longitude);
        const nameResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: reverseGeocodePrompt,
            config: { temperature: 0.1 } // Low temp for factual response
        });

        const locationName = nameResponse.text.trim();
        if (locationName) {
            return {
                locationName: locationName,
                latitude: parsed.latitude,
                longitude: parsed.longitude
            };
        }
        
        // If reverse geocoding also fails, we can't provide a location.
        return null;
    } catch (error) {
        console.error("Error analyzing location image:", error);
        return null;
    }
};

export const generateBusinessOutline = async (province: string, courtCount: number, city?: string, cityCourtCount?: number, coordinates?: { latitude: number; longitude: number }): Promise<string[]> => {
    try {
        const prompt = getBusinessOutlinePrompt(province, courtCount, city, cityCourtCount, coordinates);
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: { temperature: 0.3, responseMimeType: "application/json", responseSchema: outlineSchema }
        });
        return JSON.parse(response.text.trim()).outline || [];
    } catch (error) {
        console.error("Error generating business outline:", error);
        return ["Error: Tidak dapat membuat kerangka analisis."];
    }
};

export const generateFullAnalysis = async (province: string, outline: string[], useRealtimeSearch: boolean, city?: string): Promise<{ analysis: string; sources: SearchSource[] }> => {
    try {
        const prompt = getFullAnalysisPrompt(province, outline, city);
        const config: any = { temperature: 0.5 };
        if (useRealtimeSearch) {
            config.tools = [{ googleSearch: {} }];
        }
        const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt, config });
        const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.filter(chunk => chunk.web) || [];
        return { analysis: response.text, sources: sources as SearchSource[] };
    } catch (error) {
        console.error("Error generating full analysis:", error);
        return { analysis: "Error: Tidak dapat membuat analisis.", sources: [] };
    }
};

export const generateBusinessPlan = async (analysis: string, templateType: 'narrative' | 'formal', location: string): Promise<string> => {
    try {
        const prompt = getBusinessPlanPrompt(analysis, templateType, location);
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: { temperature: 0.6 }
        });
        return response.text;
    } catch (error) {
        console.error("Error generating business plan:", error);
        return "Error: Tidak dapat membuat rencana bisnis.";
    }
};

export const generateInsight = async (topic: string, existingInsights: string[]): Promise<InsightWithRecommendation | { error: string }> => {
    try {
        const prompt = getInsightPrompt(topic, existingInsights);
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                temperature: 0.7,
                responseMimeType: "application/json",
                responseSchema: insightSchema
            }
        });
        const parsed = JSON.parse(response.text.trim());
        if (parsed.insight && parsed.recommendation) {
            return parsed;
        }
        return { error: "Error: Gagal mem-parsing respons dari AI." };
    } catch (error) {
        console.error("Error generating insight:", error);
        return { error: "Error: Gagal menghasilkan wawasan baru. Coba lagi nanti." };
    }
};