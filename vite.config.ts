import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Relative assets work on both GitHub project pages and 3d.ajaynxt.com.
  base: "./",
  plugins: [react()],
  build: {
    target: "es2020",
    sourcemap: false,
  },
});
