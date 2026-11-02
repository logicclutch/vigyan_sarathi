import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

/** Scroll to top (or to a hash target) on navigation and move focus to the main landmark. */
export function ScrollManager() {
  const { pathname, hash } = useLocation()
  const firstRender = useRef(true)

  useEffect(() => {
    const isFirst = firstRender.current
    firstRender.current = false
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.scrollIntoView({ block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    if (!isFirst) document.getElementById('main')?.focus({ preventScroll: true })
  }, [pathname, hash])

  return null
}
