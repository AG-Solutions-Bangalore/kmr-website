import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { queryClient } from './lib/query-client'
import { injectOrganizationSchema } from './seo/seo'

// Restore SSG query cache so the client starts with prerendered data.
function rehydrateSsgState(): void {
  try {
    const el = document.getElementById('kmr-query-state');
    const raw = el?.textContent;
    if (!raw) return;
    const state = JSON.parse(raw) as {
      queries?: Array<{ queryKey: readonly unknown[]; state?: { data?: unknown } }>;
    };
    for (const q of state.queries ?? []) {
      if (q?.queryKey && q?.state && 'data' in q.state) {
        queryClient.setQueryData(q.queryKey, q.state.data);
      }
    }
  } catch {
    // Corrupt cache is non-fatal — the app refetches live data.
  }
}

rehydrateSsgState();
injectOrganizationSchema();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
