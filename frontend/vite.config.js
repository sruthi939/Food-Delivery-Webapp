import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Force Vite restart for page margins alignment unifications
export default defineConfig({
  plugins: [tailwindcss(), react()],
})
