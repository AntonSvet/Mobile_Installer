 import { defineConfig } from "vite";
 
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',   
      babel: {
        plugins: ['@emotion/babel-plugin']
      }
    }),
    VitePWA({
       workbox: {
    globPatterns: ["**/*.{js,css,html,ico,png,svg,json}"], 
  },
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "Mobile-Installer",
        short_name: "Installer",
        description: "My Progressive Web App",
        theme_color: "#ffffff",
        icons: [
          {
            src: "512x512.png",
            sizes: "192x192",
            type: "image/png",
          },
          
        ],
      },
    }),
  ],  
});