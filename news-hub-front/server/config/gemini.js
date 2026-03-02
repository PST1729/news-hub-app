import { GoogleGenerativeAI } from '@google/generative-ai';

let genAI = null;
let cachedApiKey = null;

export function getGeminiModel() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not defined in environment');
  }
  // Re-initialise if the key changed (e.g. env var hot-reload)
  if (!genAI || cachedApiKey !== apiKey) {
    genAI = new GoogleGenerativeAI(apiKey);
    cachedApiKey = apiKey;
  }
  // gemini-1.5-flash lives on the stable v1 endpoint, not v1beta
  return genAI.getGenerativeModel(
    { model: 'gemini-1.5-flash' },
    { apiVersion: 'v1' }
  );
}
