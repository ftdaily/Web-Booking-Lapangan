import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    //host: '127.0.0.1', // Use IPv4 localhost instead of IPv6
    //port: 3000, // Use port 3000 instead of default 5173

    host: "0.0.0.0",
    port: 3000,

    strictPort: true, // Exit if port is already in use
  },
});
