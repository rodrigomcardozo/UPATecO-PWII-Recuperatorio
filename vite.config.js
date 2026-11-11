import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Actions define GITHUB_REPOSITORY como "usuario/nombre-del-repositorio".
// Así la web se publica bien incluso si el repositorio cambia de nombre.
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1]

export default defineConfig({
  plugins: [react()],
  base: repo ? `/${repo}/` : '/',
})
