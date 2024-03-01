import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Minesweeper",
        short_name: "Minesweeper",
        display: "fullscreen",
        description: "Based on the classic game",
        background_color: "#c6c6c6",
        icons: [
          {
            src: "/flag.svg",
            sizes: "192x192",
            type: "image/svg",
          },
        ],
        theme_color: "#c6c6c6",
      },
    }),
  ],
  base: "/minesweeper/",
});
