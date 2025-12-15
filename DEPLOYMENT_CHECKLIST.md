# ✅ Deployment Checklist

Use this checklist before deploying ScholasticAI to production.

---

## 📋 Pre-Deployment Checklist

### Environment Setup

- [ ] Node.js 16+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] `.env.example` file exists
- [ ] `.env` file created locally (not committed)
- [ ] `VITE_API_KEY` set in `.env` file
- [ ] API key obtained from https://makersuite.google.com/app/apikey

### Code Quality

- [ ] No linter errors (`npm run lint`)
- [ ] No TypeScript errors
- [ ] Build succeeds (`npm run build`)
- [ ] Preview works (`npm run preview`)
- [ ] All routes tested
- [ ] No console errors
- [ ] Mobile responsive tested

### Git Repository

- [ ] `.gitignore` includes `.env` and `.env.local`
- [ ] `.env` file NOT committed to Git
- [ ] `.env.example` committed (template only)
- [ ] All sensitive data removed
- [ ] README.md updated
- [ ] Documentation files present

### Configuration Files

- [ ] `vite.config.ts` configured correctly
- [ ] `package.json` scripts verified
- [ ] `.github/workflows/deploy.yml` exists (for GitHub Pages)
- [ ] `.github/workflows/ci.yml` exists (for CI)
- [ ] `netlify.toml` exists (for Netlify)
- [ ] `vercel.json` exists (for Vercel)

---

## 🌐 Platform-Specific Checklist

### GitHub Pages

- [ ] Repository created on GitHub
- [ ] `VITE_API_KEY` secret added in GitHub Settings
- [ ] GitHub Pages enabled (Settings > Pages)
- [ ] Source set to "GitHub Actions"
- [ ] `base` path in `vite.config.ts` matches repo name (if needed)
- [ ] Workflow file (`.github/workflows/deploy.yml`) exists
- [ ] Pushed to `main` branch
- [ ] Actions workflow completed successfully
- [ ] Site accessible at `https://username.github.io/repo-name/`

### Vercel

- [ ] Vercel account created
- [ ] Repository connected to Vercel
- [ ] `VITE_API_KEY` environment variable set in Vercel dashboard
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Framework preset: Vite
- [ ] Deployed successfully
- [ ] Site accessible at `https://project-name.vercel.app`

### Netlify

- [ ] Netlify account created
- [ ] Repository connected to Netlify
- [ ] `VITE_API_KEY` environment variable set in Netlify dashboard
- [ ] Build command: `npm run build`
- [ ] Publish directory: `dist`
- [ ] `netlify.toml` file present
- [ ] Deployed successfully
- [ ] Site accessible at `https://project-name.netlify.app`

---

## 🧪 Testing Checklist

### Functionality

- [ ] Login works
- [ ] Dashboard loads correctly
- [ ] All navigation links work
- [ ] Student profiles accessible
- [ ] Class management works
- [ ] Exam scheduler works
- [ ] Events management works
- [ ] AI Circular Generator works (requires API key)
- [ ] AI Factor Analysis works (requires API key)
- [ ] Data persists (IndexedDB)
- [ ] Settings page accessible
- [ ] Factory reset works

### Performance

- [ ] Page load time < 3 seconds
- [ ] No memory leaks
- [ ] Smooth navigation
- [ ] Images/assets load correctly
- [ ] No console warnings

### Responsive Design

- [ ] Mobile view tested (< 768px)
- [ ] Tablet view tested (768px - 1024px)
- [ ] Desktop view tested (> 1024px)
- [ ] Touch interactions work
- [ ] Sidebar collapses on mobile
- [ ] Forms usable on mobile

### Browser Compatibility

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🔒 Security Checklist

- [ ] No API keys in code
- [ ] No API keys in commits
- [ ] `.env` in `.gitignore`
- [ ] Environment variables set in hosting platform
- [ ] HTTPS enabled (automatic on most platforms)
- [ ] No sensitive data in client-side code
- [ ] CORS configured correctly (if needed)

---

## 📝 Documentation Checklist

- [ ] README.md complete and accurate
- [ ] SETUP.md exists and clear
- [ ] DEPLOYMENT.md exists and detailed
- [ ] GITHUB_SETUP.md exists (if using GitHub)
- [ ] CONTRIBUTING.md exists (if open source)
- [ ] Code comments added where needed
- [ ] API documentation (if applicable)

---

## 🚀 Post-Deployment Checklist

### Verification

- [ ] Site is accessible
- [ ] All pages load correctly
- [ ] No 404 errors
- [ ] No console errors
- [ ] Environment variables working
- [ ] AI features functional
- [ ] Performance acceptable

### Monitoring

- [ ] Analytics set up (if needed)
- [ ] Error tracking configured (if needed)
- [ ] Uptime monitoring (if needed)
- [ ] Performance monitoring (if needed)

### Communication

- [ ] Deployment announcement (if needed)
- [ ] Documentation updated with live URL
- [ ] Team notified (if applicable)
- [ ] Users notified (if applicable)

---

## 🐛 Troubleshooting Reference

### Common Issues

**Build fails:**
- Check Node.js version
- Verify all dependencies installed
- Check for TypeScript errors
- Review build logs

**Environment variables not working:**
- Verify variable name (`VITE_API_KEY`)
- Check hosting platform settings
- Ensure variable is set before build
- Check for typos

**404 errors:**
- Check `base` path in `vite.config.ts`
- Verify routing configuration
- Check hosting platform redirect rules

**AI features not working:**
- Verify API key is correct
- Check API key is set in environment
- Review browser console for errors
- Test API key validity

---

## ✅ Final Sign-Off

- [ ] All checkboxes completed
- [ ] All tests passed
- [ ] Documentation complete
- [ ] Ready for production

**Deployment Date:** _______________

**Deployed By:** _______________

**Deployment URL:** _______________

---

**Status:** ☐ Ready for Deployment | ☐ Needs Review | ☐ Blocked



