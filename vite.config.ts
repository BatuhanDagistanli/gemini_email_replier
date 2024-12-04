import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [crx({ manifest })],
  build: {
    rollupOptions: {
      input: {
        popup: 'index.html',
        background: 'src/background.ts',
        content: 'src/content.ts'
      }
    }
  },
  define: {
    'process.env': process.env
  }
});