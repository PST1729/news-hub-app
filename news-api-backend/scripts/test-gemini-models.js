import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

const models = ['gemini-pro', 'gemini-1.0-pro', 'gemini-2.0-flash', 'gemini-2.0-flash-exp', 'gemini-1.5-pro', 'gemini-2.0-flash-lite'];

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

for (const modelName of models) {
  try {
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent('Say exactly: Gemini OK');
    console.log(modelName, 'WORKS:', result.response.text().trim());
    break;
  } catch (e) {
    // Print full error
    console.log(modelName, 'FAIL:', e.message);
  }
}
