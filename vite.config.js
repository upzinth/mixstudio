import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: '192.168.2.21',
        port: 5173,
        strictPort: true,
        allowedHosts: ['mix.upz.in.th'],
        hmr: {
            port: 5173,
        },
    },
})
