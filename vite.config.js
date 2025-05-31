import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
   build: {
    outDir: 'build', // Ensures build outputs to /dist
  },
  base: '/',
  server: {
    historyApiFallback: true,
    host: '0.0.0.0', 
    allowedHosts: [
      'ec2-100-25-213-177.compute-1.amazonaws.com',
      'localhost'  // Keep localhost for local development
    ],// Allow connections from any network interface
    port: 80
  },
  
})
