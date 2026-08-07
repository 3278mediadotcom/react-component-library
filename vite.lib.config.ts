import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  copyPublicDir: false,
  publicDir: false,

  plugins: [
    react(),
    tailwindcss(),

    dts({
      entryRoot: 'src',
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.lib.json',
    }),
  ],

  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/lib.ts', import.meta.url)),
      name: 'ReactComponentLibrary',
      formats: ['es'],
      fileName: 'index',
      cssFileName: 'styles',
    },

    rollupOptions: {
      external: ['react', 'react-dom'],

      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.names?.[0] === 'style.css') {
            return 'styles.css';
          }

          return assetInfo.names?.[0] ?? 'asset';
        },
      },
    },

    cssCodeSplit: false,

    outDir: 'dist',

    emptyOutDir: true,
  },
});