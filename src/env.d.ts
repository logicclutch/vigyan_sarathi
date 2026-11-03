/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_CONTACT_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'virtual:content-overrides' {
  const overrides: Record<string, unknown>
  export default overrides
}
