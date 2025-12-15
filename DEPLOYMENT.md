# 🚀 Deployment Guide - ScholasticAI

Complete guide for deploying ScholasticAI to various hosting platforms.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [GitHub Pages Deployment](#github-pages-deployment)
4. [Vercel Deployment](#vercel-deployment)
5. [Netlify Deployment](#netlify-deployment)
6. [Environment Variables](#environment-variables)
7. [Build & Test](#build--test)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** or **pnpm**
- **Git** (for version control)
- **Google Gemini API Key** (for AI features)

---

## Local Development Setup

### Step 1: Clone the Repository

```bash
git clone <your-repo-url>
cd SAMS_15Dec25
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Step 3: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Google Gemini API Key:
   ```
   VITE_API_KEY=your_actual_api_key_here
   ```

3. Get your API key from: https://makersuite.google.com/app/apikey

### Step 4: Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port shown in terminal).

### Step 5: Build for Production

```bash
npm run build
```

This creates a `dist/` folder with production-ready files.

### Step 6: Preview Production Build

```bash
npm run preview
```

---

## GitHub Pages Deployment

### Option 1: Manual Deployment

1. **Update `vite.config.ts`** (already configured):
   ```typescript
   base: '/your-repo-name/' // Update this to your repository name
   ```

2. **Build the project**:
   ```bash
   npm run build
   ```

3. **Deploy to GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to **Settings** > **Pages**
   - Under **Source**, select **GitHub Actions** (recommended) or **Deploy from a branch**
   - If using branch: Select `gh-pages` branch and `/root` folder
   - Save changes

4. **Set Environment Variables**:
   - Go to **Settings** > **Secrets and variables** > **Actions**
   - Add a new secret: `VITE_API_KEY` with your API key value

### Option 2: GitHub Actions (Automated)

A workflow file (`.github/workflows/deploy.yml`) is included for automatic deployment.

**How it works:**
- Pushes to `main` branch trigger automatic build and deployment
- Builds the project
- Deploys to GitHub Pages
- Uses secrets for environment variables

**Setup:**
1. Ensure `.github/workflows/deploy.yml` exists (created below)
2. Add `VITE_API_KEY` secret in repository settings
3. Push to `main` branch - deployment happens automatically

---

## Vercel Deployment

### Method 1: Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Set Environment Variables**:
   - Go to your project dashboard on Vercel
   - Navigate to **Settings** > **Environment Variables**
   - Add `VITE_API_KEY` with your API key value
   - Redeploy if needed

### Method 2: Vercel Dashboard

1. **Connect Repository**:
   - Go to [vercel.com](https://vercel.com)
   - Click **New Project**
   - Import your GitHub repository

2. **Configure Project**:
   - **Framework Preset:** Vite
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

3. **Add Environment Variables**:
   - In project settings, add:
     - `VITE_API_KEY` = your API key

4. **Deploy**:
   - Click **Deploy**
   - Vercel will automatically deploy on every push to main branch

---

## Netlify Deployment

### Method 1: Netlify CLI

1. **Install Netlify CLI**:
   ```bash
   npm i -g netlify-cli
   ```

2. **Login to Netlify**:
   ```bash
   netlify login
   ```

3. **Initialize Site**:
   ```bash
   netlify init
   ```

4. **Set Environment Variables**:
   ```bash
   netlify env:set VITE_API_KEY your_api_key_here
   ```

5. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

### Method 2: Netlify Dashboard

1. **Connect Repository**:
   - Go to [netlify.com](https://netlify.com)
   - Click **Add new site** > **Import an existing project**
   - Connect your GitHub repository

2. **Configure Build Settings**:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Base directory:** `./` (leave empty)

3. **Add Environment Variables**:
   - Go to **Site settings** > **Environment variables**
   - Add `VITE_API_KEY` with your API key value

4. **Deploy**:
   - Click **Deploy site**
   - Netlify will automatically deploy on every push to main branch

---

## Environment Variables

### Required Variables

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `VITE_API_KEY` | Google Gemini API Key | https://makersuite.google.com/app/apikey |

### Platform-Specific Notes

- **Vite/Vercel/Netlify:** Use `VITE_API_KEY`
- **GitHub Pages:** Use GitHub Secrets (Actions) or build-time injection
- **Other platforms:** May require `API_KEY` instead of `VITE_API_KEY`

The app automatically checks multiple environment variable names for compatibility.

---

## Build & Test

### Build Commands

```bash
# Development build (with source maps)
npm run build

# Production build (optimized)
npm run build -- --mode production

# Preview production build locally
npm run preview
```

### Testing Checklist

Before deploying, verify:

- [ ] App builds without errors (`npm run build`)
- [ ] Environment variables are set correctly
- [ ] AI features work (test Circular Generator)
- [ ] Data persistence works (IndexedDB)
- [ ] All routes work correctly
- [ ] Responsive design works on mobile
- [ ] No console errors

---

## Troubleshooting

### Build Errors

**Error: Cannot find module**
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Error: Environment variable not found**
- Ensure `.env` file exists locally
- For deployment, check environment variables in hosting platform settings
- Variable name must be `VITE_API_KEY` (for Vite)

### Runtime Errors

**AI features not working**
- Check API key is set correctly
- Verify API key is valid at https://makersuite.google.com/app/apikey
- Check browser console for API errors

**Data not persisting**
- Check browser IndexedDB support
- Clear browser cache and try again
- Check browser console for IndexedDB errors

### Deployment Issues

**GitHub Pages: 404 errors**
- Check `base` path in `vite.config.ts` matches repository name
- Ensure `dist` folder is deployed, not root folder
- Check GitHub Pages settings

**Vercel/Netlify: Build fails**
- Check build logs in dashboard
- Verify `package.json` scripts are correct
- Ensure Node.js version is compatible (v16+)

---

## 📝 Additional Notes

### Data Architecture

- **Demo Mode:** App generates deterministic demo data on first load
- **Local Storage:** User changes saved to browser IndexedDB
- **No Backend:** Fully client-side application
- **Factory Reset:** Available in Settings for restoring demo data

### Security

- **Never commit `.env` file** (already in `.gitignore`)
- **Never commit API keys** to repository
- Use environment variables for all sensitive data
- API keys are client-side (acceptable for demo/public apps)

### Performance

- **Build size:** ~500KB-1MB (gzipped)
- **Initial load:** < 2 seconds on good connection
- **Lazy loading:** Components loaded on demand
- **Optimized:** Production build is minified and optimized

---

## 🎉 Success!

Once deployed, your app will be available at:
- **GitHub Pages:** `https://yourusername.github.io/repo-name/`
- **Vercel:** `https://your-project.vercel.app`
- **Netlify:** `https://your-project.netlify.app`

---

**Need Help?** Check the main [README.md](./README.md) or open an issue on GitHub.



