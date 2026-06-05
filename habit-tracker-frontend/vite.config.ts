import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // silenciar advertencias de deprecación relacionadas con las importaciones en SCSS
  css: { preprocessorOptions:
     { scss: { 
      silenceDeprecations: ['import'],
      quietDeps: true,
     } } },
})
