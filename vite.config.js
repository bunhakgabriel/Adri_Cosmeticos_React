import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/AdriCosmeticosApi': {
        target: 'https://d8dc-52-167-235-148.ngrok-free.app',  // URL do seu backend
        changeOrigin: true,               // Faz a troca de origem para evitar problemas com CORS
        secure: false, 
      },
    },
  },
});
