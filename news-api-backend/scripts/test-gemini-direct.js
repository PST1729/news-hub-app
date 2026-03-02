import 'dotenv/config';
import axios from 'axios';

const key = process.env.GEMINI_API_KEY;
console.log('Testing key:', key?.slice(0, 16) + '...');

const models = ['gemini-2.0-flash', 'gemini-2.0-flash-lite', 'gemini-1.5-flash', 'gemini-1.5-flash-8b'];
const versions = ['v1', 'v1beta'];

for (const version of versions) {
  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/${version}/models/${model}:generateContent?key=${key}`;
      const res = await axios.post(url, {
        contents: [{ parts: [{ text: 'Say: Gemini OK' }] }]
      }, { timeout: 10000 });
      const text = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      console.log(`✓ ${version}/${model}: ${text?.trim()}`);
      process.exit(0);
    } catch (e) {
      const status = e.response?.status;
      const msg = e.response?.data?.error?.message || e.message;
      console.log(`✗ ${version}/${model} [${status}]: ${msg?.substring(0, 100)}`);
    }
  }
}
