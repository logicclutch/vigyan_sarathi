import type { ReactNode } from 'react'
import { useLocation } from 'react-router'

/** Re-mounts on navigation so the CSS enter animation plays once per page. */
export function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  return (
    <div key={pathname} className="motion-safe:animate-page-in">
      {children}
    </div>
  )
}
