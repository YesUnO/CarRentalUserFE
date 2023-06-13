import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import EnvironmentPlugin from 'vite-plugin-environment'
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    basicSsl(),
    EnvironmentPlugin(['API_URL','STRIPE_PRODUCT_ID','GOOGLE_CLIENT_ID']),
  ],
  server: {
    port:5173,
    strictPort:true,
    proxy: {
      "/bff": {
        target: "https://localhost:7125",
        secure: false,
      },
      "/signin-oidc": {
        target: "https://localhost:7125",
        secure: false,
      },
      "/signout-callback-oidc": {
        target: "https://localhost:7125",
        secure: false,
      },
    },
  },
});
