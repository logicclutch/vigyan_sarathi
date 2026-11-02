export type ClassValue = string | number | false | null | undefined

/** Minimal class-name joiner (no dependency needed). */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ')
}
