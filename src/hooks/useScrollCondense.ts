import { useEffect, useRef, useState, type RefObject } from 'react'

export function useScrollCondense<T extends HTMLElement>(threshold = 12): {
  ref: RefObject<T | null>
  condensed: boolean
} {
  const ref = useRef<T>(null)
  const [condensed, setCondensed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setCondensed(el.scrollTop > threshold))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('scroll', onScroll)
    }
  }, [threshold])

  return { ref, condensed }
}
