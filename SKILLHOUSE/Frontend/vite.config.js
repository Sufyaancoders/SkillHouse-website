// import { defineConfig } from 'vite'
// import tailwindcss from '@tailwindcss/vite'
// // import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   // plugins: [react()],
//   tailwindcss(),
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  build: {
    target: 'es2015',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor libraries
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-redux': ['@reduxjs/toolkit', 'react-redux', 'redux'],
          'vendor-ui': [
            'react-icons', 
            'framer-motion', 
            'react-hot-toast',
            'lucide-react',
            'react-type-animation'
          ],
          'vendor-forms': [
            'react-hook-form',
            'react-dropzone'
          ],
          'vendor-charts': [
            'chart.js',
            'react-chartjs-2'
          ],
          'vendor-media': [
            'react-player',
            'swiper'
          ],
          'vendor-utils': [
            'axios',
            'crypto-browserify'
          ]
        }
      }
    },
    // Generate source maps for better debugging in production
    sourcemap: false,
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})