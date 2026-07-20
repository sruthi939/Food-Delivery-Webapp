import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Force Vite restart for manual scroll restoration
export default defineConfig({
  plugins: [tailwindcss(), react()],
})
