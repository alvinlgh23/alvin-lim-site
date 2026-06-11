# Alvin Lim Site - V1 Launch Guide

## Launch Objective

Can a stranger visit `alvin-lim.com` and quickly understand:

- who Alvin is
- why the projects exist
- what Chainstox Lab does
- which demos are experimental research interfaces

## Current Launch Scope

- Personal landing page
- Chainstox Lab project index
- Project detail pages
- Market Intelligence Console demo
- Project metadata, status labels, GitHub links, and demo links

No new projects or demos should be added before V1.

## Important Deployment Note

Cloudflare Pages is a good target for the frontend, but the current live Market Intelligence demo route uses Node `child_process` to run Python:

```text
/api/demos/market-intelligence
python3 model.py ...
```

Cloudflare Pages Functions do not support running arbitrary local Python scripts with `child_process`. Before production launch, choose one:

1. Deploy the frontend to Cloudflare Pages and point the Market Intelligence API to a separate Node/Python backend.
2. Keep the production demo in fallback/report-format mode only.
3. Host the full app on a Node-capable platform instead of Cloudflare Pages.

Do not assume the current Python runner will work directly on Cloudflare Pages.

## Step 1: Connect GitHub Repository

1. Push the current repository to GitHub.
2. Confirm the repository contains:
   - `app/`
   - `components/`
   - `content/project-inventory.json`
   - `Valuation-model/`
   - `package.json`
   - `LAUNCH_GUIDE.md`
3. Confirm no secrets, API keys, local tokens, or private files are committed.

## Step 2: Create Cloudflare Pages Project

1. Open Cloudflare Dashboard.
2. Go to Workers & Pages.
3. Create a new Pages project.
4. Connect the GitHub repository.
5. Use:

```text
Framework preset: Next.js
Build command: npm run build
Output directory: .next
```

If using `@cloudflare/next-on-pages`, follow the adapter instructions before deployment.

## Step 3: Deploy Build

Before deploying, run locally:

```bash
npm install
npm run build
```

Verify:

- build passes
- no missing route errors
- no deployment-blocking warnings
- no accidental localhost-only user flow

## Step 4: Connect `alvin-lim.com`

1. In Cloudflare Pages, open the project.
2. Go to Custom domains.
3. Add:

```text
alvin-lim.com
www.alvin-lim.com
```

4. Set DNS records as Cloudflare recommends.
5. Redirect `www` to apex or apex to `www`, but keep one canonical domain.

## Step 5: Enable SSL

1. Use Cloudflare SSL/TLS mode: Full.
2. Confirm HTTPS works for:
   - `https://alvin-lim.com`
   - `https://www.alvin-lim.com`
3. Confirm no mixed-content warnings.

## Step 6: Enable Analytics

### Cloudflare Web Analytics

1. Open Cloudflare Dashboard.
2. Go to Analytics & Logs.
3. Enable Web Analytics.
4. Add the Cloudflare script only after final approval.
5. Verify page views for:
   - `/`
   - `/lab`
   - `/lab/projects/market-valuation-engine`

### Google Analytics

1. Create a GA4 property.
2. Create a Web data stream for `alvin-lim.com`.
3. Store the Measurement ID.
4. Add the GA script only after final approval.
5. Verify events in Realtime.

Analytics are prepared but not activated in V1 code yet.

## Step 7: Verify Production

Check these routes:

```text
/
/lab
/lab/projects/on-chain-market-intelligence
/lab/projects/market-valuation-engine
/lab/projects/sgd-neer-shadow-model
/lab/projects/kospi-signal-monitor
```

Responsive checks:

- Desktop: 1440px wide
- Tablet: 768px wide
- Mobile: 390px wide

Acceptance criteria:

- no horizontal overflow
- homepage story is understandable without explanation
- Chainstox Lab reads as market/research work, not personal finance
- every lab project has a status label
- every lab project has a demo path
- GitHub buttons appear when a GitHub URL exists
- Market Intelligence Console either returns live output or a project-format fallback

## Launch Checklist

- [ ] `npm run build` passes
- [ ] `/` loads
- [ ] `/lab` loads
- [ ] all project pages load
- [ ] mobile layout checked
- [ ] tablet layout checked
- [ ] desktop layout checked
- [ ] no secrets committed
- [ ] no broken GitHub links
- [ ] no placeholder copy that feels accidental
- [ ] analytics decision made
- [ ] production demo backend decision made
- [ ] domain connected
- [ ] SSL enabled
- [ ] final smoke test complete

## Known V1 Risk

The only major launch blocker is the live Python demo backend on Cloudflare Pages. The frontend is Pages-friendly, but the live demo runner needs either a separate backend or a production fallback decision.
