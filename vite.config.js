import { defineConfig } from 'vite';
import fs from 'fs-extra';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/scripts/main.js',
      fileName: 'wng-pl',
      formats: ['es']
    },
    emptyOutDir: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      }
    }
  },
  // Custom plugin to copy module.json
  plugins: [
    {
      name: 'copy-module-json',
      closeBundle: async () => {
        await fs.copy('src/module.json', 'dist/module.json');
      }
    }
  ]
});
