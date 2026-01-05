
import { GoogleGenAI } from "@google/genai";

// Standardizing Gemini API calls following the world-class senior engineer guidelines.
// Always use the recommended model for text tasks: gemini-3-flash-preview.
// Initializing GoogleGenAI with process.env.API_KEY directly.

export const askAiTutor = async (question: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: {
        systemInstruction: "You are NOVA AI, a smart tutor for a Learning Management System. Help students with academic questions, provide study tips, and keep explanations concise and encouraging.",
      }
    });
    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("AI Tutor Error:", error);
    return "Error connecting to AI helper. Please try again later.";
  }
};

export const moderateContent = async (text: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Moderation check for: "${text}"`,
      config: {
        systemInstruction: "You are a content moderator for an educational group chat. Determine if the text is 'CLEAN' or 'ABUSIVE' or 'OFF-TOPIC'. Reply ONLY with one of those three words.",
        responseMimeType: "text/plain",
      }
    });
    return (response.text || "CLEAN").trim();
  } catch (error) {
    return "CLEAN";
  }
};
