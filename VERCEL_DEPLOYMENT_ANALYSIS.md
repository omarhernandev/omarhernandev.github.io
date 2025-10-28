# Vercel Deployment Analysis & Fix

## Executive Summary

Your project is a **HYBRID deployment** combining:
- **Static Astro site** (`apps/web/`) → GitHub Pages
- **Full Astro + API** (`site/`) → Vercel (Serverless)

The errors occur because Vercel is trying to deploy from the wrong directory or with incorrect configuration.

---

## 🔍 Current Project Structure (Simplified)

```
omarhernandez.github.io/
├── apps/
│   ├── web/                    # ❌ NOT for Vercel
│   │   └── astro.config.mjs    # Static output
│   └── api/                    # ❌ Old/Unused
│       └── vercel.json         # Legacy config
└── site/                       # ✅ CORRECT for Vercel
    ├── astro.config.mjs        # Server output
    ├── vercel.json             # ⚠️ MISSING - NOW CREATED
    ├── src/
    │   ├── pages/
    │   │   ├── api/            # API endpoints
    │   │   │   ├── contact.js
    │   │   │   └── validate-domain.js
    │   │   ├── index.astro     # Astro pages
    │   │   ├── contact.astro
    │   │   └── ...
```

---

## 🚨 Issues Identified

### 1. Missing `vercel.json` in `site/` Directory
**Problem**: No `vercel.json` exists in the `/site` directory to guide Vercel's deployment.

**Fix**: Prote with content:
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": ".vercel/output",
  "installCommand": "npm install",
  "framework": "astro"
}
```

### 2. Root Directory Configuration
**Problem**: Vercel needs to know that the **root directory** is `site/`, not the repository root.

**Solution**: In Vercel Dashboard:
- Project Settings → General → Root Directory → Set to: **`site`**

### 3. Astro Server Output vs. Static Dist
**Problem**: Astro with `output: 'server'` creates output in `.vercel/output`, NOT `dist/`.

**Why the error occurs**: Without proper configuration, Vercel looks for `dist/` directory (default static output) but Astro creates `.vercel/output` for serverless deployments.

---

## 📊 Vercel Build Detection

### What Vercel Detects:

**In `site/` directory:**
- ✅ Detects `astro.config.mjs` → Recognizes as **Astro project**
- ✅ Detects `@astrojs/vercel` adapter → Recognizes as **Astro Serverless**
- ✅ Detects API routes in `src/pages/api/` → Recognizes as **Hybrid**
- ✅ Detects `.astro` pages → Recognizes as **SSR/Serverless**

**Build Output:**
- Astro serverless builds to `.vercel/output/` (NOT `dist/`)
- Contains both static pages AND serverless functions

---

## 🛠️ Step-by-Step Fix

### Fix 1: Create `site/vercel.json`

A `vercel.json` file has been created in the `site/` directory with the correct configuration.

### Fix 2: Configure Root Directory in Vercel

**Via Vercel Dashboard:**
1. Go to: https://vercel.com/dashboard
2. Select your project
3. Go to: **Settings** → **General**
4. Scroll to **Root Directory**
5. Click **Edit**
6. Enter: `site`
7. Click **Save**

**Via Vercel CLI:**
```bash
vercel
# When prompted for root directory, specify: site
```

### Fix 3: Verify Build Settings

**In Vercel Dashboard → Settings → General:**

- **Framework Preset**: `Astro`
- **Root Directory**: `site`
- **Build Command**: `npm run build`
- **Output Directory**: `.vercel/output` (will be auto-set by Astro adapter)
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

### Fix 4: Environment Variables

**Required Environment Variables:**

In Vercel Dashboard → Settings → Environment Variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `RESEND_API_KEY` | Your Resend API key | Production, Preview, Development |
| `TO_EMAIL` | Your email address | Production, Preview, Development |

**To add via CLI:**
```bash
cd site
vercel env add RESEND_API_KEY production
vercel env add TO_EMAIL production
```

---

## 🎯 Deployment Architecture

### Option A: Hybrid (Recommended - Current Setup)

```
┌─────────────────────────┐
│   Vercel (site/)        │
│                         │
│   ✅ Full Astro Site    │
│   ✅ API Endpoints      │
│   ✅ Serverless SSR     │
│                         │
│   Endpoints:            │
│   - /                   │
│   - /api/contact        │
│   - /api/validate-domain│
└─────────────────────────┘
```

**Pros:**
- Single deployment
- SSR enabled
- API routes co-located
- Better SEO for dynamic content

**Cons:**
- Slightly more complex
- Requires Vercel adapter

### ---

### Option B: API-Only (Alternative)

If you want API-only deployment:

1. **Move API files** from `site/src/pages/api/` to `site/api/`
2. **Update `site/vercel.json`** to route API requests
3. **Remove Astro pages** or use static output

**Modified structure:**
```
site/
├── api/
│   ├── contact.js
│   └── validate-domain.js
├── vercel.json
└── package.json
```

---

## 📝 Corrected `vercel.json` Configuration

### For Hybrid Deployment (site/vercel.json)

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": ".vercel/output",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "framework": "astro",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

### Alternative: API-Only Configuration

If you want API-only:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/**/*.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/contact",
      "dest": "/api/contact.js"
    },
    {
      "src": "/api/validate-domain",
      "dest": "/api/validate-domain.js"
    }
  ]
}
```

---

## ✅ Deployment Checklist

### Pre-Deployment
- [x] `vercel.json` created in `site/` directory
- [ ] Root Directory set to `site` in Vercel dashboard
- [ ] Environment variables added to Vercel:
  - [ ] `RESEND_API_KEY`
  - [ ] `TO_EMAIL`
- [ ] Build command verified: `npm run build`
- [ ] Output directory: `.vercel/output` (auto-handled by Astro)

### Post-Deployment
- [ ] Visit deployed URL
- [ ] Test API endpoint: `https://your-project.vercel.app/api/contact`
- [ ] Test contact form submission
- [ ] Check serverless function logs in Vercel dashboard
- [ ] Verify CORS headers are working

---

## 🔧 Troubleshooting

### Error: "No Output Directory named 'dist' found"

**Cause**: Vercel is looking for `dist/` but Astro serverless outputs to `.vercel/output/`

**Solution**:
1. Add `vercel.json` with `"outputDirectory": ".vercel/output"`
2. OR set Root Directory to `site`
3. OR remove custom output directory setting

### Error: "Astro build auto-detection"

**Cause**: Vercel detects `astro.config.mjs` and tries to auto-configure

**Solution**: Either:
- **Accept auto-detection**: Let Vercel handle Astro configuration (recommended)
- **Disable auto-detection**: Add `"ignoreCommand": true` to `vercel.json` and manually configure

### API Routes Not Working

**Cause**: API routes need to be in `src/pages/api/` for Astro

**Check**:
```bash
ls site/src/pages/api/
# Should show: contact.js, validate-domain.js
```

**Verify export format**:
```javascript
// ✅ Correct for Astro
export async function POST({ request }) {
  // ...
}

// ❌ Wrong for Astro (Next.js format)
export default async function handler(req, res) {
  // ...
}
```

### Build Fails with Missing Dependencies

**Cause**: `node_modules` not installed or missing dependencies

**Solution**:
```bash
cd site
npm install
vercel --prod
```

---

## 🌐 Expected URLs After Deployment

Once deployed to Vercel, your endpoints will be available at:

- **Homepage**: `https://your-project.vercel.app/`
- **Contact Form**: `https://your-project.vercel.app/contact`
- **API Contact**: `https://your-project.vercel.app/api/contact`
- **API Validate**: `https://your-project.vercel.app/api/validate-domain`

---

## 📊 Build Output Structure

### What Astro Creates in `.vercel/output/`:

```
.vercel/output/
├── static/              # Static assets
│   ├── _astro/
│   ├── images/
│   └── js/
├── functions/           # Serverless functions
│   ├── index.func/
│   ├── api/contact.func/
│   └── api/validate-domain.func/
└── config.json          # Vercel routing config
```

This is **correct** for Astro serverless. Don't modify!

---

## 🎓 Key Takeaways

1. **Root Directory**: MUST be set to `site` in Vercel dashboard
2. **Output Directory**: Astro serverless uses `.vercel/output` (NOT `dist`)
3. **Framework**: Astro with Vercel adapter is properly configured
4. **API Routes**: In `src/pages/api/` (Astro convention)
5. **Environment Variables**: Must be set in Vercel dashboard

---

## 🚀 Quick Deploy Command

Once configured, deploy with:

```bash
cd site
vercel --prod
```

Or let Vercel auto-deploy on git push (if connected to GitHub).

---

## 📚 Additional Resources

- [Astro + Vercel Documentation](https://docs.astro.build/en/guides/deploy/vercel/)
- [Vercel Configuration Reference](https://vercel.com/docs/projects/project-configuration)
- [Astro SSR Guide](https://docs.astro.build/en/guides/server-side-rendering/)

---

## ✨ Summary

**Your project is a HYBRID deployment with:**
- ✅ Full Astro site with SSR
- ✅ API endpoints co-located
- ✅ Proper Vercel adapter configuration

**The fix is simple:**
1. ✅ Add `vercel.json` to `site/` (DONE)
2. Set Root Directory to `site` in Vercel
3. Add environment variables
4. Deploy!

The `vercel.json` file has been created. You just need to configure the Root Directory in Vercel dashboard.

