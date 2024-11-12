import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false
      },
      '/quotes-api': {
        target: 'https://zenquotes.io',
        changeOrigin: true,
        reWrite: (path) => path.replace(/^\/quotes-api/, '')
      }
    }
  }
})
