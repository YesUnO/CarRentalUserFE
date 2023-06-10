import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import EnvironmentPlugin from 'vite-plugin-environment'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    EnvironmentPlugin(['API_URL','STRIPE_PRODUCT_ID','GOOGLE_CLIENT_ID']),
  ],
  server: {
    proxy: {
      "/bff": {
        target: "https://localhost:7025",
        secure: false,
      },
      "/signin-oidc": {
        target: "https://localhost:7025",
        secure: false,
      },
      "/signout-callback-oidc": {
        target: "https://localhost:7025",
        secure: false,
      },
    },
  },
});
