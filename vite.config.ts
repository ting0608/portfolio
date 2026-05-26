import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// User site: https://<user>.github.io/  →  VITE_BASE_PATH=/
// Project site: https://<user>.github.io/<repo>/  →  VITE_BASE_PATH=/<repo>/
const base = process.env.VITE_BASE_PATH ?? '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
})
