import path from 'path';
import http from 'node:http';
import https from 'node:https';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import { defineConfig, type Plugin } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import compression from 'vite-plugin-compression';
import { vitePrerenderPlugin } from 'vite-prerender-plugin';

/**
 * Ensures `vite build` exits cleanly after SSG.
 * - Destroys idle HTTP(S) keep-alive sockets left open by live API calls during prerender.
 * - Closes/unrefs active MessagePort handles instantiated by React 19's server scheduler
 *   when `vite-prerender-plugin` dynamically imports the compiled prerender script into Node/Bun.
 */
function ssgExitCleanup(): Plugin {
  return {
    name: 'ssg-exit-cleanup',
    apply: 'build',
    closeBundle() {
      http.globalAgent.destroy();
      https.globalAgent.destroy();

      const handles =
        (process as unknown as { _getActiveHandles?: () => unknown[] })
          ._getActiveHandles?.() ?? [];
      for (const handle of handles) {
        if (
          (handle as { constructor?: { name?: string } })?.constructor?.name ===
          'MessagePort'
        ) {
          (handle as { unref?: () => void; close?: () => void }).unref?.();
          (handle as { unref?: () => void; close?: () => void }).close?.();
        }
      }

      setTimeout(() => {
        process.exit(0);
      }, 50).unref?.();
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] }),
    // SSG: prerenders every route (incl. live /blog/:slug) with
    // per-route head + JSON-LD. See src/prerender.tsx.
    vitePrerenderPlugin({
      prerenderScript: path.resolve(import.meta.dirname, 'src/prerender.tsx'),
      renderTarget: '#root',
    }),
    // Gzip pre-compression for hosts that serve .gz directly.
    // @ts-expect-error vite-plugin-compression ships CJS-style types; default import is callable at runtime
    compression({ algorithm: 'gzip', threshold: 1024 }),
    ssgExitCleanup(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 500,
    reportCompressedSize: false,
  },
});
