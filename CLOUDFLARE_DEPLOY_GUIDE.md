# Deploy Barka to Cloudflare Pages - New Dashboard (2024+)

You saw "Create application" at:
`https://dash.cloudflare.com/5266754ea428a5f48cc4296cbaee7bde/workers-and-pages/create`

That's the **new Cloudflare UI** - Workers and Pages are now merged. Here's how to deploy:

## Method 1: Via Dashboard (Recommended)

### Step 1: Go to Workers & Pages
- Direct link: **https://dash.cloudflare.com/?to=/:account/workers-and-pages**
- Or: Cloudflare Dashboard → Left sidebar → **Workers & Pages**

### Step 2: Create Application
- Click **"Create application"** (the button you found)
- You'll see 2 tabs: **"Workers"** and **"Pages"**
- Click **"Pages"** tab
- Click **"Connect to Git"**

### Step 3: Connect GitHub
- If not connected, click **"Connect GitHub"** and authorize Cloudflare
- Select your GitHub account: `datacomputerscience`
- Select repository: `barka`
- Click **"Begin setup"**

### Step 4: Configure Build
- **Project name**: `barka` (or `barka-ecommerce`)
- **Production branch**: `main`
- **Framework preset**: Select **Vite** (or None)
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: Leave empty (or `/`)

### Step 5: Environment Variables
Click **"Add variable"** and add:

```
VITE_SUPABASE_URL = https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY = your-anon-key
VITE_APP_URL = https://barka.pages.dev (or your custom domain)
VITE_APP_NAME = Barka
```

> Get Supabase values from: https://supabase.com → Your Project → Settings → API

### Step 6: Deploy
- Click **"Save and Deploy"**
- Wait 2-3 minutes for build
- You'll get URL like: `https://barka-xxx.pages.dev`

### Step 7: Custom Domain (Optional)
- After deploy → **Custom domains** tab
- Click **"Set up a custom domain"**
- Enter: `barka.tn` or `*.barka.tn` for multi-tenant
- Follow DNS instructions (Cloudflare will auto-configure if domain is on Cloudflare)

---

## Method 2: Direct Upload (No Git, Fastest)

If Git connect doesn't work:

1. **Build locally:**
```bash
cd /home/user/barka
npm run build
# Creates dist/ folder
```

2. **In Cloudflare Dashboard:**
- Workers & Pages → **Create application** → **Pages** tab → **"Upload assets"** (or "Direct Upload")
- **Project name**: `barka`
- Drag & drop your `dist` folder
- Click Deploy

You'll get instant URL!

---

## Method 3: Wrangler CLI (For Developers)

```bash
# Install Wrangler
npm install -g wrangler

# Login
wrangler login

# Build
cd /home/user/barka
npm run build

# Deploy to Pages
wrangler pages deploy dist --project-name=barka

# Or deploy as Worker with static assets
wrangler pages publish dist --project-name=barka
```

---

## Troubleshooting Your "Create application" Page

### What you see:
The new Cloudflare UI merged Workers and Pages into one "Create application" flow.

**You are in the right place!**

1. Click **"Create application"**
2. Then choose:
   - **Workers** = For API/backend (like Edge Functions)
   - **Pages** = For frontend (React/Vite - **choose this for Barka**)

For Barka, you want **Pages** → **Connect to Git**

### If you don't see "Connect to Git":
- You might be in Workers tab - switch to **Pages** tab at top
- Or click **"Create a new Pages project"**

### Alternative direct link:
Try: **https://dash.cloudflare.com/?to=/:account/pages/new**

Or old Pages dashboard:
**https://dash.cloudflare.com/?to=/:account/pages**

---

## After Deploy - Supabase Setup (Required)

Barka needs Supabase for DB/Auth:

1. **Create Supabase project**: https://supabase.com → New Project
2. **Run schema**: SQL Editor → Paste `supabase-schema.sql` → Run
3. **Storage**: Create buckets:
   - `product-images` (Public)
   - `store-assets` (Public)
4. **Auth**: Enable Email provider
5. **Get API keys**: Settings → API → Copy URL + anon key
6. **Add to Cloudflare**: Pages → Your project → Settings → Environment Variables → Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` → Redeploy

---

## Multi-Tenant Domain Setup (Advanced)

For `store-slug.barka.tn`:

1. **In Cloudflare**: Your domain `barka.tn` must be on Cloudflare
2. **Pages**: Custom domains → Add `*.barka.tn` wildcard
3. **Code**: Already handles `/s/:slug` routing - for true wildcard, add middleware:
   - Create `functions/_middleware.ts` in Pages project
   - Resolve tenant from `request.headers.get('host')` → extract slug → set `store_id`

For now, `/s/:slug` works without custom domain: `https://your-pages-url.pages.dev/s/demo`

---

## Current Build Info

- **Framework**: Vite + React + TypeScript
- **Build command**: `npm run build`
- **Output**: `dist`
- **Size**: 1.09 MB (300kb gzipped)
- **Node version**: 18+ (set in Cloudflare if needed)

---

## Need Help?

If you still stuck at "Create application":

1. Screenshot what you see after clicking "Create application"
2. Tell me if you see tabs "Workers" and "Pages"
3. Or try direct upload method - fastest!

Barka is ready to deploy - just needs 2 minutes in new Cloudflare UI.
