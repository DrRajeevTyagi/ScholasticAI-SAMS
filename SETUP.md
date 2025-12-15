# 🛠️ Quick Setup Guide - ScholasticAI

Quick start guide for getting ScholasticAI up and running.

---

## ⚡ Quick Start (5 Minutes)

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your API key
# VITE_API_KEY=your_api_key_here
```

**Get API Key:** https://makersuite.google.com/app/apikey

### 3. Run Development Server

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

---

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_KEY=your_google_gemini_api_key_here
```

**Important:** 
- Never commit `.env` to Git (already in `.gitignore`)
- Get your API key from: https://makersuite.google.com/app/apikey

---

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy Options:**

1. **Vercel:** `npm i -g vercel && vercel`
2. **Netlify:** `npm i -g netlify-cli && netlify deploy`
3. **GitHub Pages:** See `.github/workflows/deploy.yml`

---

## 📚 Project Structure

```
SAMS_15Dec25/
├── components/          # React components
├── context/            # React Context (state management)
├── data/               # Static data files
├── services/           # API services (Gemini AI)
├── types.ts           # TypeScript type definitions
├── App.tsx            # Main app component
├── index.html         # HTML entry point
├── vite.config.ts     # Vite configuration
└── package.json       # Dependencies and scripts
```

---

## 🐛 Troubleshooting

### "Connection failed" Error

If you see "Connection failed. If the problem persists, please check your internet connection or VPN":

1. **Check if `.env` file exists** in project root
2. **Verify API key** is set: `VITE_API_KEY=your_key_here`
3. **Restart development server** after creating/updating `.env`
4. **See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** for detailed solutions

### Port Already in Use

```bash
# Kill process on port 5173
npx kill-port 5173

# Or use a different port
npm run dev -- --port 3000
```

### Module Not Found

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build Errors

```bash
# Clear build cache
rm -rf dist .vite
npm run build
```

**For more troubleshooting help:** See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

## 📖 Documentation

- **Full Deployment Guide:** [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Main README:** [README.md](./README.md)
- **Project Analysis:** [faltu documentation/PROJECT_ANALYSIS_REPORT.md](./faltu%20documentation/PROJECT_ANALYSIS_REPORT.md)

---

## ✅ Pre-Deployment Checklist

Before deploying to production:

- [ ] Environment variables configured
- [ ] `npm run build` succeeds without errors
- [ ] `npm run preview` works correctly
- [ ] All routes tested
- [ ] AI features tested (Circular Generator)
- [ ] Mobile responsive design verified
- [ ] No console errors
- [ ] API key is set in hosting platform

---

**Ready to deploy?** Check [DEPLOYMENT.md](./DEPLOYMENT.md) for platform-specific instructions.



