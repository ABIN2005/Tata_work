import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  // Use /DAMSBF/ base path for GitHub Pages, empty for local development
  base: process.env.NODE_ENV === 'production' ? '/DAMSBF/' : '/',
  server: {
    port: 5173,
    open: true, // Automatically open browser
  },
})
