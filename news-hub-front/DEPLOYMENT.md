# Netlify Deployment

This app runs both the frontend and API as Netlify Functions. No separate backend hosting needed.

## Setup

1. **Connect your repo** to Netlify (drag & drop or Git integration).

2. **Base directory** (if using a monorepo): Set to `news-hub-front` in Netlify site settings.

3. **Environment variables** — In Netlify: Site settings → Environment variables, add:

   | Variable | Description |
   |----------|-------------|
   | `NEWS_API_KEY` | [News API](https://newsapi.org) key |
   | `GEMINI_API_KEY` | [Google AI](https://aistudio.google.com/apikey) key |
   | `ALLOWED_ORIGINS` | Optional. Comma-separated origins, e.g. `https://yoursite.netlify.app` |

4. **Build settings** (default from `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`

## Local development

- **Frontend**: `npm run dev` (Vite proxy forwards `/api` to `localhost:3001`)
- **Backend**: Run the original `news-api-backend` with `npm run dev` for full Express server, **or** use Netlify CLI to run functions locally:

  ```bash
  npx netlify dev
  ```

  This serves both the app and the API function locally.
