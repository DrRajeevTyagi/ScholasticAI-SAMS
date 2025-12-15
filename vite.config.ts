import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/SAMS-15Dec25/', // Change to '/your-repo-name/' for GitHub Pages if needed
  build: {
    outDir: 'dist',
    sourcemap: true,
    // Optimize for production
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'chart-vendor': ['recharts'],
          'ai-vendor': ['@google/genai']
        }
      }
    }
  },
  define: {
    // Safety shim for GenAI SDK if it relies on process.env in some contexts
    'process.env': {}
  },
  // Preview server configuration
  preview: {
    port: 4173,
    host: true
  },
  // Development server configuration
  server: {
    port: 5173,
    host: true,
    open: true
  }
})