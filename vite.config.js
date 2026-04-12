import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// KoRT Sovereign OS: Stable Production Architecture
// Version: 1.0.45 - Vite 6 Rollup Engine
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173
  },
  build: {
    // Utilize stable Rollup chunking for production
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom', '@supabase/supabase-js'],
          'icons': ['lucide-react']
        }
      }
    },
    sourcemap: true,
    minify: 'esbuild' // Using stable esbuild minifier
  }
})
