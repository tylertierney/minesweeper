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
            src: "/minesweeper/flag.svg",
            sizes:
              "48x48 72x72 96x96 120x120 128x128 144x144 180x180 256x256 512x512",
            type: "image/svg+xml",
            purpose: "any",
          },
          {
            src: "/minesweeper/flag.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
        theme_color: "#c6c6c6",
      },
    }),
  ],
  base: "/minesweeper/",
});
