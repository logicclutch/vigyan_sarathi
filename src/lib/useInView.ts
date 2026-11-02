import { useEffect, useRef, useState, type RefObject } from 'react'

interface Options {
  once?: boolean
  amount?: number
  rootMargin?: string
}

/** Tiny IntersectionObserver hook used by the reveal primitives. */
export function useInView<T extends Element>({ once = true, amount = 0.2, rootMargin = '0px 0px -8% 0px' }: Options = {}): [
  RefObject<T | null>,
  boolean,
] {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (entry.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold: amount, rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [once, amount, rootMargin])

  return [ref, inView]
}
