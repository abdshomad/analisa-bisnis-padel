import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this project, we assume the key is set.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

export const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
