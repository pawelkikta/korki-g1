import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// Ścieżka bazowa: workflow GitHub Pages ustawia BASE_PATH=/<nazwa-repo>/, lokalnie '/'.
const base = process.env.BASE_PATH || '/'

export default defineConfig({
  base,
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      // nowa wersja ładuje się sama przy kolejnym otwarciu; postęp nauki (localStorage) zostaje
      registerType: 'autoUpdate',
      // ikony i favicon trafiają do cache przez globPatterns niżej
      includeManifestIcons: false,
      manifest: {
        name: 'Korki G1',
        short_name: 'Korki G1',
        description: 'Interaktywny trener do egzaminu kwalifikacyjnego SEP G1: fiszki, test, egzamin próbny i symulacje pomiarów.',
        lang: 'pl',
        display: 'standalone',
        background_color: '#0d1210',
        theme_color: '#0d1210',
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        // podzbiory fontów z cyrylicą i wietnamskim są zbędne (grecki zostaje: Ω, Δ, η w treści)
        globIgnores: ['**/*-cyrillic-*', '**/*-vietnamese-*'],
      },
    }),
  ],
})
