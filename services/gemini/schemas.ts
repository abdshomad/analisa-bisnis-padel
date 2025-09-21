import { Type } from "@google/genai";

export const analyzeLocationSchema = {
    type: Type.OBJECT,
    properties: {
        locationName: { type: Type.STRING, description: 'The identified location name, like "Central Park, Jakarta, Provinsi DKI Jakarta"' },
        latitude: { type: Type.NUMBER },
        longitude: { type: Type.NUMBER }
    },
    required: ['locationName', 'latitude', 'longitude']
};


export const outlineSchema = {
    type: Type.OBJECT,
    properties: {
        outline: {
            type: Type.ARRAY,
            items: {
                type: Type.STRING
            }
        }
    }
};

export const insightSchema = {
    type: Type.OBJECT,
    properties: {
        insight: {
            type: Type.STRING,
            description: "A short, sharp, strategic insight about the topic."
        },
        recommendation: {
            type: Type.STRING,
            description: "A practical, actionable recommendation related to the insight."
        }
    },
    required: ['insight', 'recommendation']
};