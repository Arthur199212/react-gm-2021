import { RefObject, useEffect } from 'react'

export const useScrollLock = (
  elRef: RefObject<HTMLElement> | null,
  open: boolean,
  scrollable = false
) => {
  useEffect(() => {
    if (scrollable) return

    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible'
    }
  }, [elRef, open, scrollable])
}
