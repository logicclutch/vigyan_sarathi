/** Day-of-year computed once per page load; used to rotate "today's" items deterministically. */
const now = new Date()
const start = new Date(now.getFullYear(), 0, 0)
export const DAY_OF_YEAR = Math.floor((now.getTime() - start.getTime()) / 86_400_000)

export function dailyIndex(length: number, offset = 0): number {
  if (length <= 0) return 0
  return (DAY_OF_YEAR + offset) % length
}
