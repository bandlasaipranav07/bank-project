
import { GoogleGenAI } from "@google/genai";

// Defensive check for environment variables in browser environments
const getApiKey = () => {
  try {
    return process?.env?.API_KEY || '';
  } catch {
    return '';
  }
};

const ai = new GoogleGenAI({ apiKey: getApiKey() });

export const getBankingSupportResponse = async (query: string, userRole: string) => {
  const apiKey = getApiKey();
  if (!apiKey) {
    return "The AI assistant is currently in offline mode. Please contact our support line for assistance.";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: {
        systemInstruction: `You are an AI support assistant for Tirumala Bank, an Indian bank. 
        Your tone should be professional, respectful (using Indian cultural cues where appropriate like "Namaste"), and helpful.
        The current user's role is ${userRole}.
        Keep answers concise. If they ask about loans, mention the Bright Future Education Loan initiative.
        If they ask about security, mention our Blockchain-backed verification for transactions.`,
      },
    });
    return response.text || "I'm sorry, I couldn't process that request right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am having trouble connecting to my knowledge base. Please try again later or visit our nearest branch.";
  }
};
