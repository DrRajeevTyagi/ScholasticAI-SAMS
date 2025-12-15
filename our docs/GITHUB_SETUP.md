# GitHub Setup & Deployment Guide

Follow these steps to push your project to GitHub and host it live on the internet.

## Phase 1: Create a Repository on GitHub
1. Go to [github.com/new](https://github.com/new) (Log in if needed).
2. **Repository Name:** Enter a name (e.g., `scholastic-ai-manager`).
3. **Visibility:** Choose **Public** (easiest for hosting) or **Private**.
4. **Initialize:** Do **NOT** check "Add a README", ".gitignore", or "License". Keep it empty.
5. Click **Create repository**.
6. Copy the URL provided (e.g., `https://github.com/YOUR_USERNAME/scholastic-ai-manager.git`).

## Phase 2: Connect Local Project to GitHub
Open your terminal in the project folder and run these commands one by one:

```bash
# 1. Initialize Git (if not already done)
git init

# 2. Add all files to staging
git add .

# 3. Commit the files
git commit -m "Initial commit of ScholasticAI"

# 4. Link to your new GitHub repository
git remote add origin https://github.com/DrRajeevTyagi/SAMS-15Dec25.git

# 5. Rename branch to main
git branch -M main

# 6. Push your code
git push -u origin main
```

## Phase 3: Configure Deployment
Your project is already configured with a **GitHub Actions workflow** (`.github/workflows/deploy.yml`) that will automatically build and deploy your app when you push to `main`.

### 1. Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click **Settings** > **Pages** (sidebar).
3. Under **Build and deployment > Source**, select **GitHub Actions**.
   > **Note:** If you don't see "GitHub Actions", select "Deploy from a branch" and choose `gh-pages` branch (if available after the first action run). But "GitHub Actions" is preferred for this project.

### 2. Set API Key Secret (Critical for AI)
1. Go to **Settings** > **Secrets and variables** > **Actions**.
2. Click **New repository secret**.
3. **Name:** `VITE_API_KEY`
4. **Secret:** Paste your Google Gemini API Key.
5. Click **Add secret**.

### 3. Update Base Path (Important!)
For the site to load assets correctly on GitHub Pages, update `vite.config.ts`:

1. Open `vite.config.ts`.
2. Find `base: '/',` (approx line 7).
3. Change it to your repository name:
   ```typescript
   base: '/your-repo-name/', 
   ```
   *(Example: If your repo is `scholastic-ai`, set it to `/scholastic-ai/`)*.
4. Push this change:
   ```bash
   git add vite.config.ts
   git commit -m "Update base path for deployment"
   git push
   ```

## Phase 4: Verify
1. Go to the **Actions** tab in your repository.
2. You should see a workflow running (e.g., "Deploy to GitHub Pages").
3. Once green (Success), go back to **Settings > Pages**.
4. You will see your live URL (e.g., `https://username.github.io/repo-name/`).

---
**Run into issues?** Check the "Actions" tab logs to see why a build might have failed.

