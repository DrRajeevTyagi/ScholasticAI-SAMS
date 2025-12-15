# ScholasticAI - School Management System

A modern, AI-powered School Management System designed for CBSE Senior Secondary schools.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.2-purple.svg)](https://vitejs.dev/)

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Google Gemini API Key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

```bash
# Clone the repository
git clone https://github.com/DrRajeevTyagi/SAMS-15Dec25.git
cd SAMS_15Dec25

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your VITE_API_KEY

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📚 Documentation

- **[Quick Setup Guide](./SETUP.md)** - Get started in 5 minutes
- **[Verified Run Instructions](./RUN_INSTRUCTIONS.md)** - Detailed steps for local execution and deployment (Updated)
- **[Deployment Guide](./DEPLOYMENT.md)** - Deploy to GitHub Pages, Vercel, Netlify
- **[Developer Protocol](./DEVELOPER_PROTOCOL.md)** - Development guidelines

---

## 🌐 Deployment

This app can be deployed to any static hosting platform:

### Quick Deploy

**Vercel:**
```bash
npm i -g vercel
vercel
```

**Netlify:**
```bash
npm i -g netlify-cli
netlify deploy --prod
```

**GitHub Pages:**
- Push to `main` branch (GitHub Actions will auto-deploy)
- Or see [DEPLOYMENT.md](./DEPLOYMENT.md) for manual setup

### Environment Variables

For deployment, set `VITE_API_KEY` in your hosting platform:
- **Vercel:** Project Settings > Environment Variables
- **Netlify:** Site Settings > Environment Variables  
- **GitHub Pages:** Repository Settings > Secrets > Actions

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

---

## 🛠 Features

*   **Administration:** Dashboard, Class Structure, Curriculum Manager
*   **Academics:** Daily Class Logs, Date Sheet Generator (Exam Scheduler)
*   **People:** Student Directory (360° Profiles), Staff Workload Management
*   **AI Integration:**
    *   **Circular Generator:** Drafts professional notices
    *   **Factor Analysis:** Correlates student attendance and activities with exam grades

---

## 📊 Data Architecture

This application uses a **Client-Side Database** strategy perfect for demonstrations:

*   **Deterministic Generation:** On first load, generates a "Factory Default" school with ~700 students using a fixed seed (`12345`). Every new user sees the same demo data.
*   **Local Persistence:** User changes saved to browser's IndexedDB. Each user's data is isolated.
*   **Factory Reset:** Available in Settings to restore original demo data.

---

## 🏗️ Build

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 🔧 Tech Stack

- **React 18.2** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Google Gemini AI** - AI features
- **IndexedDB** - Client-side storage
- **Recharts** - Data visualization

---

## 📄 License

MIT License - see LICENSE file for details

---

## 🤝 Contributing

Contributions are welcome! Please read the [Developer Protocol](./DEVELOPER_PROTOCOL.md) before contributing.

---

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
- Check [SETUP.md](./SETUP.md) for setup help
