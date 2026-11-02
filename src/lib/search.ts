/** Case/diacritic-insensitive substring match across several haystacks; every query word must match. */
export function normalize(value: string): string {
  return value.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').trim()
}

export function matches(query: string, haystacks: string[]): boolean {
  const q = normalize(query)
  if (!q) return true
  const terms = q.split(/\s+/).filter(Boolean)
  const hay = haystacks.map(normalize).join(' \n ')
  return terms.every((term) => hay.includes(term))
}
