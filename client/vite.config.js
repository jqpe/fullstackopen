import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [react()],
  define: {
    'process.env.PORT': parseInt(process.env.PORT) ?? 3001
  }
})
