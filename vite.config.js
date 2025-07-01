import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@component": path.resolve(__dirname, "src/component"),
      "@styles": path.resolve(__dirname, "src/assets/styles"),
      "@icon": path.resolve(__dirname, "src/assets/icon"),
    },
  },
});
