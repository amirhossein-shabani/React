import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  define: {
    "import.meta.env.VITE_REACT_ROUTER_V7_START_TRANSITION": true,
    "import.meta.env.VITE_REACT_ROUTER_V7_RELATIVE_SPLAT_PATH": true,
  },
});
