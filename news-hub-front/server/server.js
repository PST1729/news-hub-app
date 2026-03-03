import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import newsRoutesModule from './routes/news.js';
import geminiRoutesModule from './routes/gemini.js';

const newsRoutes = newsRoutesModule?.default ?? newsRoutesModule;
const geminiRoutes = geminiRoutesModule?.default ?? geminiRoutesModule;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 10000;
const distPath = path.join(__dirname, '..', 'dist');

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// ── API routes (must come before static/SPA) ──────────────────────────────
app.use('/api/news', newsRoutes);
app.use('/api/gemini', geminiRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── Static files (built React app) ───────────────────────────────────────
app.use(express.static(distPath));

// ── SPA fallback (all other routes → index.html) ─────────────────────────
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`NewsHub running on port ${PORT}`);
});
