import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    build: {
      lib: {
        entry: 'src/components.ts',
        formats: [ 'es' ]
      },
      emptyOutDir: false
    },
  };
});
