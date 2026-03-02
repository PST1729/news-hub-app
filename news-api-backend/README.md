# News API Backend

Backend integrating **News API**, **MongoDB**, and **Google Gemini** with Express.

## Setup

1. **Install dependencies**
   ```bash
   cd news-api-backend
   npm install
   ```

2. **Environment variables**  
   The `.env` file is already configured with your keys. For a fresh setup, copy `.env.example` to `.env` and fill in your values.

## Test Connections

Run the connection test script to verify all services:

```bash
npm run test-connections
```

This checks:
- **News API**: `/everything`, `/top-headlines`, `/sources`
- **MongoDB**: Connection to Atlas
- **Gemini**: Basic chat completion

## Start Server

```bash
npm start
# or for auto-reload:
npm run dev
```

Server runs at `http://localhost:3001`.

## API Endpoints

### News API (proxied)

| Endpoint | Description |
|----------|-------------|
| `GET /api/news/everything?q=Apple&from=2026-02-23&to=2026-02-23&sortBy=popularity` | Search articles (e.g. Apple today, sorted by popularity) |
| `GET /api/news/top-headlines?country=us` | Top headlines by country |
| `GET /api/news/top-headlines?sources=bbc-news` | Headlines from specific source |
| `GET /api/news/sources` | List available sources |
| `GET /api/news/apple-today` | Example: Apple articles today, sorted by popularity |

### Gemini

| Endpoint | Description |
|----------|-------------|
| `POST /api/gemini/chat` | Test Gemini (body: `{ "prompt": "Your message" }`) |

### Health

| Endpoint | Description |
|----------|-------------|
| `GET /health` | Server health check |

## Example: Apple Articles Today

```bash
curl "http://localhost:3001/api/news/apple-today"
```

Returns articles mentioning Apple published today, sorted by most popular sources first (e.g. Engadget before smaller blogs).
