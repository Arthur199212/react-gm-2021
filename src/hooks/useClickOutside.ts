import { useEffect, RefObject } from 'react'

/**
 * Fires callback if a click occurs outside a reference html element
 */
export const useClickOutside = (
  elRef: RefObject<HTMLElement> | null,
  callback: Function,
  isActive: boolean = true
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (!elRef?.current?.contains(event.target as HTMLElement) && callback) {
        callback(event)
      }
    }

    if (isActive) {
      window.addEventListener('click', handleClickOutside)
    }

    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [callback, elRef, isActive])
}
