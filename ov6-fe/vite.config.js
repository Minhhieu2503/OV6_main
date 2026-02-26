import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'OV6 Trading - Forex Education & Signals',
        short_name: 'OV6 Trading',
        description: 'Professional Forex Trading Education with discipline, risk management, and psychology.',
        theme_color: '#050B14',
        background_color: '#050B14',
        display: 'standalone',
        scope: '/OV6/',
        start_url: '/OV6/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  base: '/OV6/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

