# Export Barka to GitHub - Complete Guide

Your GitHub profile: https://github.com/datacomputerscience

## Option 1: Create New Repo (Recommended - 2 minutes)

### Step 1: Create repo on GitHub
1. Go to: https://github.com/new
2. **Repository name**: `barka` (or `barka-ecommerce-saas`)
3. **Description**: `Barka - Tunisian Multi-Tenant E-Commerce SaaS Platform - React + Supabase + Cloudflare Pages`
4. **Visibility**: Public (or Private)
5. **IMPORTANT**: Uncheck "Add a README file", "Add .gitignore", "Choose a license" - we already have them
6. Click **Create repository**

### Step 2: Get your repo URL
After creation, GitHub will show:
```
https://github.com/datacomputerscience/barka.git
```
Copy that HTTPS URL.

### Step 3: Push from this workspace

In this workspace terminal, run:

```bash
cd /home/user/barka

# Add your new repo as remote (replace with your actual URL)
git remote add origin https://github.com/datacomputerscience/barka.git

# Push
git push -u origin main
```

If it asks for credentials:
- Username: `datacomputerscience`
- Password: Use **Personal Access Token** (not your GitHub password)
  - Create token at: https://github.com/settings/tokens/new
  - Select `repo` scope
  - Generate and copy token
  - Use token as password

### Step 4: Verify
Go to https://github.com/datacomputerscience/barka - you should see all files!

---

## Option 2: Use Export Script

We created `export-to-github.sh` for you:

```bash
cd /home/user/barka
./export-to-github.sh https://github.com/datacomputerscience/barka.git
```

---

## Option 3: Manual Upload (If git push fails)

1. Download `barka.tar.gz` from workspace (/home/user/barka.tar.gz)
2. Extract locally
3. Or download `barka.bundle` and import:

```bash
# Locally on your machine
git clone barka.bundle barka
cd barka
git remote add origin https://github.com/datacomputerscience/barka.git
git push -u origin main
```

---

## What's Included in Export

70 files, 10k+ lines:

- `src/` - Complete React app (15 dashboard pages, storefront, auth, onboarding, landing)
- `supabase-schema.sql` - 25+ tables with RLS
- `supabase/functions/` - 4 Edge Functions (create-order, meta-capi, delivery-proxy, product-feed)
- `README.md`, `FEATURES.md`, `PROJECT_OVERVIEW.md`
- `package.json`, `vite.config.ts`, `tsconfig.json`
- `.env.example`, `.gitignore`
- `export-to-github.sh`

---

## After GitHub Export

### Deploy to Cloudflare Pages
1. Go to https://dash.cloudflare.com → Pages → Create project → Connect to Git
2. Select `datacomputerscience/barka`
3. Build settings:
   - Framework: Vite
   - Build command: `npm run build`
   - Output: `dist`
4. Env vars:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy!

### Deploy Supabase
1. Create project at https://supabase.com
2. SQL Editor → Run `supabase-schema.sql`
3. Storage → Create buckets: `product-images` (public), `store-assets` (public)
4. Edge Functions → Deploy 4 functions from `supabase/functions/`

---

## Current Git Status

Branch: `main`
Commit: `4af505f feat: Barka v1.0 - Tunisian multi-tenant e-commerce SaaS`
Files: 70 committed, ready to push

To check:
```bash
cd /home/user/barka
git log --oneline
git status
```

---

## Need Help?

If push fails with authentication error:

**Create Personal Access Token:**
1. https://github.com/settings/tokens/new
2. Note: "Barka deploy"
3. Expiration: 30 days
4. Select scopes: `repo` (full control)
5. Generate token, copy it
6. Use token as password when pushing

**Or use GitHub CLI:**
```bash
gh auth login
gh repo create datacomputerscience/barka --public --source=. --remote=origin --push
```

---

Built with ❤️ for Tunisian commerce - Barka (بركة)
