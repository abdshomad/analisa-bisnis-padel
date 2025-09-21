import { Type } from "@google/genai";

export const analyzeLocationSchema = {
    type: Type.OBJECT,
    properties: {
        locationName: { type: Type.STRING, description: 'The identified location name, like "Central Park, Jakarta, Provinsi DKI Jakarta". Can be null if not identifiable from the image.' },
        latitude: { type: Type.NUMBER, description: 'The latitude of the location. Can be null.' },
        longitude: { type: Type.NUMBER, description: 'The longitude of the location. Can be null.' }
    }
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