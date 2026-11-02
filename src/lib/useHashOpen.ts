import { useState } from 'react'
import { useHashId } from './useHashId'

/**
 * Open-item state for deep-linkable dialogs/sets: `#id` in the URL opens the item,
 * including on same-document hash navigation, and the user can still close it.
 */
export function useHashOpen(isValid: (id: string) => boolean): [string | null, (id: string | null) => void] {
  const hashId = useHashId()
  const [manual, setManual] = useState<{ id: string | null; forHash: string } | null>(null)
  const fromHash = hashId && isValid(hashId) ? hashId : null
  const openId = manual && manual.forHash === hashId ? manual.id : fromHash
  const setOpenId = (id: string | null) => setManual({ id, forHash: hashId })
  return [openId, setOpenId]
}
