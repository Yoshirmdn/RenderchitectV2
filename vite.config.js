import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 800,
    rolldownOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/three') || id.includes('@react-three')) return 'vendor-three';
          if (id.includes('node_modules/framer-motion')) return 'vendor-motion';
          if (id.includes('node_modules/gsap')) return 'vendor-gsap';
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) return 'vendor-react';
          if (id.includes('node_modules/zustand') || id.includes('node_modules/react-icons')) return 'vendor-misc';
        },
      },
    },
  },
})
