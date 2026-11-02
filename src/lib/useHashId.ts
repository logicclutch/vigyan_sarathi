import { useLocation } from 'react-router'

/** The current URL hash without '#', or '' */
export function useHashId(): string {
  const { hash } = useLocation()
  return hash.startsWith('#') ? decodeURIComponent(hash.slice(1)) : ''
}
