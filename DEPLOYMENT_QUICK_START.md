# Vercel Deployment Quick Start Guide

## 🎯 Problem Summary

Your Vercel deployment was failing because:
1. ❌ Missing `vercel.json` in the `site/` directory
2. ❌ Wrong output directory (looking for `dist` instead of `.vercel/output`)
3. ❌ Root Directory not configured in Vercel dashboard

## ✅ What's Been Fixed

1. ✅ Created `site/vercel.json` with correct configuration
2. ✅ Documented the deployment architecture
3. ✅ Provided clear troubleshooting steps

## 🚀 Quick Deploy Steps

### Step 1: Set Root Directory in Vercel (CRITICAL!)

1. Go to: https://vercel.com/dashboard
2. Select your project
3. Click: **Settings** → **General**
4. Find: **Root Directory**
5. Click: **Edit**
6. Enter: `site`
7. Click: **Save**

### Step 2: Add Environment Variables

**In Vercel Dashboard:**
- Go to **Settings** → **Environment Variables**
- Add these variables:

| Name | Value | Environment |
|------|-------|-------------|
| `RESEND_API_KEY` | Your Resend API key | Production, Preview, Development |
| `TO_EMAIL` | Your email | Production, Preview, Development |

### Step 3: Deploy

**Option A: Automatic (Recommended)**
- Push to your connected branch
- Vercel will auto-deploy

**Option B: Manual**
```bash
cd site
vercel --prod
```

## 📂 Project Structure

```
├── site/                  ← ROOT DIRECTORY for Vercel
│   ├── vercel.json       ← ✅ NOW EXISTS
│   ├── astro.config.mjs
│   ├── package.json
│   └── src/
│       └── pages/
│           ├── api/      ← API endpoints
│           └── *.astro   ← Astro pages
├── apps/web/             ← For GitHub Pages (separate)
└── apps/api/             ← Legacy/Unused
```

## 🔍 What Vercel Detects

**Project Type**: Astro + Serverless  
**Output**: `.vercel/output` (NOT `dist/`)  
**Framework**: Auto-detected from `astro.config.mjs`  
**Root**: `site/` directory

## 🌐 Deployment URLs

After deployment:
- **Site**: `https://your-project.vercel.app/`
- **API Contact**: `https://your-project.vercel.app/api/contact`
- **API Validate**: `https://your-project.vercel.app/api/validate-domain`

## ⚠️ Common Issues

### Issue: "No dist directory found"
**Solution**: This is fixed by setting Root Directory to `site`

### Issue: Build fails
**Solution**: Check that environment variables are set in Vercel

### Issue: API returns 500
**Solution**: Check serverless function logs in Vercel dashboard

## 📚 Full Documentation

See `VERCEL_DEPLOYMENT_ANALYSIS.md` for:
- Complete architecture explanation
- Alternative deployment options
- Detailed troubleshooting
- Environment variable setup

## ✅ Success Checklist

- [ ] Root Directory set to `site` in Vercel
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] API endpoints responding
- [ ] Contact form working

---

**Need Help?** Check `VERCEL_DEPLOYMENT_ANALYSIS.md` for detailed troubleshooting.

