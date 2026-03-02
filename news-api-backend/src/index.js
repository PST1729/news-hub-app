import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectMongoDB } from './config/db.js';
import newsRoutes from './routes/news.js';
import geminiRoutes from './routes/gemini.js';

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:8080", "http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: origin ${origin} not allowed`));
      }
    },
  })
);
app.use(express.json());

app.use('/api/news', newsRoutes);
app.use('/api/gemini', geminiRoutes);

app.get('/', (req, res) => {
  res.json({
    name: 'NewsHub API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /health',
      topHeadlines: 'GET /api/news/top-headlines',
      everything: 'GET /api/news/everything',
      sources: 'GET /api/news/sources',
      chat: 'POST /api/gemini/chat',
    },
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

async function start() {
  app.listen(PORT, () => {
    console.log(`✓ Server running at http://localhost:${PORT}`);
    console.log(`  - News API: /api/news/everything, /api/news/top-headlines, /api/news/sources`);
    console.log(`  - Example:  /api/news/apple-today (Apple articles today, sorted by popularity)`);
    console.log(`  - Gemini:   /api/gemini/chat`);
  });

  connectMongoDB()
    .then(() => console.log('✓ MongoDB connected'))
    .catch((err) => console.error('✗ MongoDB connection failed:', err.message));
}

start();
