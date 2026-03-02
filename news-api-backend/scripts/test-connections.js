/**
 * Test script to verify News API, MongoDB, and Gemini connections
 * Run: npm run test-connections
 */
import 'dotenv/config';
import axios from 'axios';
import { MongoClient } from 'mongodb';
import { GoogleGenerativeAI } from '@google/generative-ai';

const NEWS_API_BASE = 'https://newsapi.org/v2';

async function testNewsAPI() {
  console.log('\n--- Testing News API ---');
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    console.error('✗ NEWS_API_KEY not found in .env');
    return false;
  }

  try {
    // Test /everything - Apple articles (last 7 days)
    // Note: sortBy:'popularity' requires a paid plan; using 'publishedAt' for free tier
    const from = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const everythingRes = await axios.get(`${NEWS_API_BASE}/everything`, {
      params: { q: 'Apple', from, sortBy: 'publishedAt', pageSize: 5, apiKey },
    });
    if (everythingRes.data.status !== 'ok') {
      throw new Error(everythingRes.data.message || 'Unknown error');
    }
    const articles = everythingRes.data.articles || [];
    console.log(`✓ /everything: ${everythingRes.data.totalResults} Apple articles (last 7 days, showing ${articles.length})`);
    if (articles.length > 0) {
      console.log(`   Top result: "${articles[0].title}" — ${articles[0].source?.name}`);
    }

    // Test /top-headlines - US headlines
    const headlinesRes = await axios.get(`${NEWS_API_BASE}/top-headlines`, {
      params: { country: 'us', pageSize: 3, apiKey },
    });
    if (headlinesRes.data.status !== 'ok') {
      throw new Error(headlinesRes.data.message || 'Unknown error');
    }
    const headlines = headlinesRes.data.articles || [];
    console.log(`✓ /top-headlines: Got ${headlines.length} US headlines`);
    if (headlines.length > 0) {
      console.log(`   Top headline: "${headlines[0].title}"`);
    }

    // Test /sources - BBC News
    const sourcesRes = await axios.get(`${NEWS_API_BASE}/sources`, {
      params: { apiKey },
    });
    if (sourcesRes.data.status !== 'ok') {
      throw new Error(sourcesRes.data.message || 'Unknown error');
    }
    const bbc = sourcesRes.data.sources?.find((s) => s.id === 'bbc-news');
    console.log(`✓ /sources: Found ${sourcesRes.data.sources?.length} sources — bbc-news: "${bbc?.name || 'N/A'}"`);

    return true;
  } catch (err) {
    const msg = err.response?.data?.message || err.message;
    console.error('✗ News API failed:', msg);
    return false;
  }
}

async function testMongoDB() {
  console.log('\n--- Testing MongoDB ---');
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('✗ MONGODB_URI not found in .env');
    return false;
  }

  let client;
  try {
    client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });
    await client.connect();
    const db = client.db('news_hub');
    const collections = await db.listCollections().toArray();
    console.log(`✓ MongoDB connected to database "news_hub" (${collections.length} collections)`);
    return true;
  } catch (err) {
    console.error('✗ MongoDB failed:', err.message);
    if (err.message.includes('querySrv') || err.message.includes('ECONNREFUSED')) {
      console.error('  → Your network blocks DNS SRV queries. Use a direct connection string in .env');
      console.error('    Or add your IP to Atlas → Security → Network Access → Add IP Address');
    }
    return false;
  } finally {
    if (client) await client.close();
  }
}

async function testGemini() {
  console.log('\n--- Testing Gemini API ---');
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('✗ GEMINI_API_KEY not found in .env');
    return false;
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await model.generateContent('Reply with exactly: "Gemini is working!"');
    const text = result.response.text();
    console.log(`✓ Gemini: ${text.trim()}`);
    return true;
  } catch (err) {
    const msg = err.message || String(err);
    if (msg.includes('API_KEY_INVALID') || msg.includes('key expired') || msg.includes('400')) {
      console.error('✗ Gemini failed: API key is expired or invalid');
      console.error('  → Generate a new key at https://aistudio.google.com/app/apikey');
    } else if (msg.includes('429') || msg.includes('quota')) {
      console.error('✗ Gemini failed: API quota exhausted (free tier daily limit reached)');
      console.error('  → Wait until quota resets, or enable billing at https://aistudio.google.com');
    } else {
      console.error('✗ Gemini failed:', msg);
    }
    return false;
  }
}

async function main() {
  console.log('=== Connection Test ===');
  const [newsOk, mongoOk, geminiOk] = await Promise.all([testNewsAPI(), testMongoDB(), testGemini()]);
  console.log('\n=== Summary ===');
  console.log(`News API:  ${newsOk  ? '✓ OK' : '✗ FAILED'}`);
  console.log(`MongoDB:   ${mongoOk ? '✓ OK' : '✗ FAILED'}`);
  console.log(`Gemini:    ${geminiOk ? '✓ OK' : '✗ FAILED'}`);
  const allOk = newsOk && mongoOk && geminiOk;
  console.log('\n' + (allOk ? '✓ All connections verified!' : '✗ Some connections failed — see details above.'));
  process.exit(allOk ? 0 : 1);
}

main();
