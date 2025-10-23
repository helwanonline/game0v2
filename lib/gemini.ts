
import { GoogleGenAI } from "@google/genai";

const geminiApiKey = process.env.GEMINI_API_KEY;

let aiInstance: GoogleGenAI | null = null;

if (!geminiApiKey) {
  console.warn("Gemini API Key is not provided. AI features will be disabled. Please set GEMINI_API_KEY environment variable.");
} else {
  aiInstance = new GoogleGenAI({ apiKey: geminiApiKey });
}

export const ai = aiInstance;
