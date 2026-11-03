import overrides from 'virtual:content-overrides'

/**
 * Content saved in the admin panel is written as JSON (one file per module key) and injected at build
 * time through the `virtual:content-overrides` module. A saved document replaces the compiled default
 * entirely; anything malformed falls back to the default so the site always renders.
 */
export function withOverride<T>(key: string, defaults: T): T {
  const value = (overrides as Record<string, unknown>)[key]
  if (value === undefined || value === null) return defaults
  if (Array.isArray(defaults) !== Array.isArray(value)) return defaults
  if (typeof defaults !== typeof value) return defaults
  return value as T
}

/** Keys that currently have an admin override baked into this build. */
export const OVERRIDDEN_KEYS: string[] = Object.keys(overrides as Record<string, unknown>)
