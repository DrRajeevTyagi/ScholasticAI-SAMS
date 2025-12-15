# ScholasticAI - Running & Deployment Instructions

This project has been verified and configured for successful execution. Follow these instructions to run or deploy the application.

## 1. Prerequisites
- **Node.js** (v16 or higher)
- **Git**
- **Google Gemini API Key** (Required for AI features)

## 2. Installation
The project dependencies have been updated to ensure compatibility. Run the following command to install them:

```bash
npm install
```

> **Note:** The `@google/genai` package has been updated to version `^1.33.0` to resolve previous installation errors.

## 3. Running Locally (Development Mode)
To start the development server:

```bash
npm run dev
```
- Open your browser at `http://localhost:5173` (or the port shown in the terminal).
- **Important:** Create a `.env` file in the root directory (copy from `.env.example` if available) and add your API key:
  ```
  VITE_API_KEY=your_gemini_api_key_here
  ```

## 4. Building for Production
To build the project for deployment:

```bash
npm run build
```
This will correct type errors and generate optimized files in the `dist` folder.

## 5. Previewing the Build
To test the production build locally:

```bash
npm run preview
```

## 6. Deployment to GitHub Pages
This project is configured for automated deployment via GitHub Actions.

1. **Push to GitHub:** Ensure your code is pushed to the `main` or `master` branch.
2. **Enable Actions:** Go to your GitHub Repository > **Settings** > **Actions** > **General** and ensure "Read and write permissions" are enabled for workflows.
3. **Configure Pages:** Go to **Settings** > **Pages**.
   - Under **Build and deployment**, select **GitHub Actions** as the source.
   - Or, if using the legacy `deploy` workflow, it will automatically push to a `gh-pages` branch. Ensure Pages is set to serve from that branch.
   - **Recommendation:** The existing `.github/workflows/deploy.yml` is set to deploy automatically. Check the **Actions** tab in GitHub to monitor the deployment status.
4. **Set API Key Secret:**
   - Go to **Settings** > **Secrets and variables** > **Actions**.
   - Create a new repository secret named `VITE_API_KEY` with your Gemini API key. This is required for the build to succeed on GitHub if the API key is used during build time (or for runtime if injected).

## 7. Troubleshooting
- **API Key Errors:** If AI features fail, check the browser console. Ensure your API key is valid and set in `.env` (local) or GitHub Secrets (production).
- **Blank Screen (White Screen):** Check the console for errors. Often due to missing environment variables or base path mismatch in `vite.config.ts`.
