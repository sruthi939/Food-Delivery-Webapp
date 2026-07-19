import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Force Vite restart to clear HMR/bundle cache after syntax fix
export default defineConfig({
  plugins: [tailwindcss(), react()],
})
