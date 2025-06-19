import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['framer-motion'], // Helps Vite resolve it correctly
  },
  build: {
    rollupOptions: {
      external: ['framer-motion'], // Prevent Rollup from mis-handling this import
    },
  },
});
