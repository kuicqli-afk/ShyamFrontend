// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    host: '0.0.0.0', // <- important, makes it accessible on LAN
    fs: {
      strict: false,
    },
  },
  plugins: [react()],
})