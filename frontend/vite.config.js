import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ['offline.html'], // Asegúrate de que offline.html esté en la caché
        runtimeCaching: [
          {
            urlPattern: /^\/offline\.html$/, // Solo para offline.html
            handler: "NetworkFirst", // Cambié a "NetworkFirst" como requiere Workbox
            options: {
              cacheName: "offline-cache",
              networkTimeoutSeconds: 5, // Tiempo de espera si la red no responde
            },
          },
        ],
      },
      manifest: {
        id: "/",
        name: "Backtracking",
        short_name: "BacktrackingPWA",
        description: "Mi aplicación como Progressive Web App",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "/icons/icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "/icons/icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "/icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "/icons/icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "/icons/icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
          },
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      inject: {
        sw: '/custom-sw.js', // Apunta a tu archivo `custom-sw.js` personalizado
      },
    }),
  ],
});
