import express from 'express';

const router = express.Router();

/* ── helpers ─────────────────────────────────────────────────── */

async function fetchHeadlines() {
  const key = process.env.NEWS_API_KEY;
  if (!key) return [];
  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=6&apiKey=${key}`
    );
    const data = await res.json();
    return (data.articles || []).filter(
      (a) => a.title && a.title !== '[Removed]'
    );
  } catch {
    return [];
  }
}

async function sendEmail({ to, subject, html }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is not configured');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      from: 'NewsHub <onboarding@resend.dev>',
      to: [to],
      subject,
      html,
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || `Resend error (${res.status})`);
  return data;
}

function buildEmail(email, articles) {
  const rows = articles
    .slice(0, 6)
    .map(
      (a) => `
      <tr>
        <td style="padding:18px 0;border-bottom:1px solid #f0f0f0;">
          <a href="${a.url}"
             style="font-size:15px;font-weight:700;color:#111;text-decoration:none;line-height:1.45;">
            ${a.title}
          </a>
          ${
            a.description
              ? `<p style="margin:6px 0 0;font-size:13px;color:#555;line-height:1.55;">${a.description}</p>`
              : ''
          }
          <p style="margin:6px 0 0;font-size:12px;color:#aaa;font-weight:600;text-transform:uppercase;letter-spacing:.5px;">
            ${a.source?.name || ''}
          </p>
        </td>
      </tr>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<div style="max-width:600px;margin:40px auto;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08);">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#f97316 0%,#ea580c 100%);padding:36px 40px;text-align:center;">
    <h1 style="margin:0;color:#fff;font-size:30px;font-weight:900;letter-spacing:-1px;">📰 NewsHub</h1>
    <p style="margin:8px 0 0;color:rgba(255,255,255,.8);font-size:14px;">Your Curated News Digest</p>
  </div>

  <!-- Confirmation banner -->
  <div style="padding:28px 40px 0;">
    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:14px;padding:22px;text-align:center;">
      <div style="font-size:28px;margin-bottom:8px;">✅</div>
      <h2 style="margin:0 0 6px;font-size:19px;color:#166534;font-weight:800;">You're in!</h2>
      <p style="margin:0;font-size:14px;color:#15803d;line-height:1.5;">
        Weekly digests will land in <strong>${email}</strong>.<br>
        No spam — unsubscribe anytime.
      </p>
    </div>
  </div>

  <!-- Headlines -->
  <div style="padding:28px 40px;">
    <h2 style="margin:0 0 4px;font-size:18px;font-weight:800;color:#111;">
      Today's Top Stories
    </h2>
    <p style="margin:0 0 20px;font-size:13px;color:#888;">
      Hand-picked headlines to kick off your subscription
    </p>
    ${
      rows
        ? `<table style="width:100%;border-collapse:collapse;">${rows}</table>`
        : '<p style="color:#999;font-size:14px;">Check back soon for the latest stories.</p>'
    }
  </div>

  <!-- Footer -->
  <div style="padding:22px 40px;background:#fafafa;border-top:1px solid #f0f0f0;text-align:center;">
    <p style="margin:0;font-size:12px;color:#bbb;line-height:1.7;">
      You subscribed at <strong>NewsHub</strong>. To stop receiving emails,
      reply with "unsubscribe".
    </p>
  </div>

</div>
</body>
</html>`;
}

/* ── route ───────────────────────────────────────────────────── */

/** POST /api/newsletter/subscribe  —  body: { email } */
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'A valid email address is required.' });
    }

    const articles = await fetchHeadlines();
    const html = buildEmail(email, articles);

    await sendEmail({
      to: email,
      subject: "✅ You're subscribed to NewsHub — Here are today's top stories",
      html,
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Newsletter error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
