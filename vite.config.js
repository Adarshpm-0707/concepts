import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  appType: 'spa',
  server: {
    port: 3000,
    open: true,
    historyApiFallback: true
  },
  preview: {
    port: 3000,
    historyApiFallback: true
  },
  build: {
    // PERF: Split vendor bundles so the browser can cache them independently
    // and only re-download changed chunks on updates.
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':  ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-gsap':   ['gsap'],
          'vendor-lenis':  ['lenis'],
        }
      }
    },
    // PERF: Slightly larger initial chunk is better than too many tiny requests
    chunkSizeWarningLimit: 600,
  }
});
