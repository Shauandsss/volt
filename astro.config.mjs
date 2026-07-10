import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  // spec v3 §1: no fixed tray/dock peeking at bottom-center of every viewport
  devToolbar: { enabled: false },
  vite: {
    ssr: {
      external: ['pg'],
    },
    server: {
      watch: {
        // .vercel build output contains a self-referencing symlink (_render.func);
        // the dev watcher ELOOPs on it if a build ran before `astro dev`
        ignored: ['**/.vercel/**'],
      },
    },
  },
});
