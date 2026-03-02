import express from 'express';
import { getGeminiModel } from '../config/gemini.js';

const router = express.Router();

/**
 * POST /api/gemini/chat
 * Simple test endpoint to verify Gemini API works
 */
router.post('/chat', async (req, res) => {
  try {
    const model = getGeminiModel();
    const { prompt = 'Say "Hello! Gemini is connected." in one short sentence.' } = req.body;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    res.json({ success: true, reply: text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
