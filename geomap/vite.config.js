import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config({ path: './.env' }) 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
    },
  },
  define: {
    'process.env.REACT_APP_OPENWEATHER_API_KEY': JSON.stringify(process.env.REACT_APP_OPENWEATHER_API_KEY),
  },
})
