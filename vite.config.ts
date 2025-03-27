import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // Bu yo‘nalishlarni to‘g‘ri boshqaradi
  build: {
    outDir: 'dist',
  },
})
