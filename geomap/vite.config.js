import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copy } from 'vite-plugin-copy';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [
    react(),
    copy({
      targets: [
        {
          src: '_redirects',
          dest: ''
        }
      ]
    })
  ],
  
  server: {
    host: '0.0.0.0',
    port: 10000,
    proxy: {
      '/api': {
        target: process.env.NODE_ENV === 'production' ? 'https://map-backend-scmu.onrender.com' : 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
  },
  define: {
    'process.env.REACT_APP_OPENWEATHER_API_KEY': JSON.stringify(process.env.REACT_APP_OPENWEATHER_API_KEY),
    'process.env.REACT_APP_API_URL': JSON.stringify(process.env.REACT_APP_API_URL),
  },
});
