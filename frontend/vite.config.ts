import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import MillionLint from "@million/lint"

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      react(),
      MillionLint.vite(),
    ],
  }
})
