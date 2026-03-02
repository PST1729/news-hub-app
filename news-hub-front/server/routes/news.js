import express from 'express';

const router = express.Router();
const NEWS_API_BASE = 'https://newsapi.org/v2';

/** Helper: fetch JSON from News API and handle errors */
async function fetchNewsApi(url) {
  const res = await fetch(url);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || res.statusText || 'News API request failed');
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

/**
 * GET /api/news/everything
 */
router.get('/everything', async (req, res) => {
  try {
    const { q, from, to, sortBy = 'popularity', sources, domains, page = 1, pageSize = 20, language } = req.query;
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'News API key not configured' });
    }
    if (!q) {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    const params = new URLSearchParams({
      q,
      sortBy,
      page,
      pageSize,
      apiKey,
    });
    if (from) params.append('from', from);
    if (to) params.append('to', to);
    if (sources) params.append('sources', sources);
    if (domains) params.append('domains', domains);
    if (language) params.append('language', language);

    const data = await fetchNewsApi(`${NEWS_API_BASE}/everything?${params}`);
    res.json(data);
  } catch (err) {
    const status = err.status || 500;
    const message = err.data?.message || err.message;
    res.status(status).json({ error: message });
  }
});

/**
 * GET /api/news/top-headlines
 */
router.get('/top-headlines', async (req, res) => {
  try {
    const { country, category, sources, q, page = 1, pageSize = 20 } = req.query;
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'News API key not configured' });
    }

    const params = new URLSearchParams({ page, pageSize, apiKey });
    if (country) params.append('country', country);
    if (category) params.append('category', category);
    if (sources) params.append('sources', sources);
    if (q) params.append('q', q);

    const data = await fetchNewsApi(`${NEWS_API_BASE}/top-headlines?${params}`);
    res.json(data);
  } catch (err) {
    const status = err.status || 500;
    const message = err.data?.message || err.message;
    res.status(status).json({ error: message });
  }
});

/**
 * GET /api/news/sources
 */
router.get('/sources', async (req, res) => {
  try {
    const { category, language, country } = req.query;
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'News API key not configured' });
    }

    const params = new URLSearchParams({ apiKey });
    if (category) params.append('category', category);
    if (language) params.append('language', language);
    if (country) params.append('country', country);

    const data = await fetchNewsApi(`${NEWS_API_BASE}/sources?${params}`);
    res.json(data);
  } catch (err) {
    const status = err.status || 500;
    const message = err.data?.message || err.message;
    res.status(status).json({ error: message });
  }
});

/**
 * GET /api/news/apple-today
 */
router.get('/apple-today', async (req, res) => {
  try {
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'News API key not configured' });
    }

    const today = new Date().toISOString().split('T')[0];
    const params = new URLSearchParams({
      q: 'Apple',
      from: today,
      to: today,
      sortBy: 'popularity',
      pageSize: 20,
      apiKey,
    });

    const data = await fetchNewsApi(`${NEWS_API_BASE}/everything?${params}`);
    res.json(data);
  } catch (err) {
    const status = err.status || 500;
    const message = err.data?.message || err.message;
    res.status(status).json({ error: message });
  }
});

export default router;
