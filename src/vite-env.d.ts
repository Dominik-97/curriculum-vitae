/// <reference types="vite/client" />

// Injected at build time by Vite (see vite.config.ts `define`).
declare const __BUILD_DATE__: string

interface ImportMetaEnv {
  /** Full URL to the Umami tracker script, e.g. https://umami.example.com/script.js */
  readonly VITE_UMAMI_SRC?: string
  /** Website ID from the Umami dashboard. */
  readonly VITE_UMAMI_WEBSITE_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// View Transitions API (not yet in the default TS DOM lib).
interface ViewTransition {
  readonly ready: Promise<void>
  readonly finished: Promise<void>
  readonly updateCallbackDone: Promise<void>
  skipTransition(): void
}

interface Document {
  startViewTransition?: (callback: () => void | Promise<void>) => ViewTransition
}
