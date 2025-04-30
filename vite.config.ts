import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    cors: {
      origin: ["http://localhost:5173", "https://courtroom.onrender.com"],
      credentials: true,
      methods: ["*"], // Allow all methods
      allowedHeaders: ["*"],
      exposedHeaders: ["*"],
    },
  },
});
