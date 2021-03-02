import { useEffect, RefObject, useRef } from 'react'

/**
 * Fires callback if a click occurs outside a reference html element
 */
export const useClickOutside = (
  elRef: RefObject<HTMLElement> | null,
  callback: Function,
  isActive: boolean = true
) => {
  // no need to remember about passing callback with useCallback wrapper
  const callbackRef = useRef(callback)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (!elRef?.current?.contains(event.target as HTMLElement) && callbackRef.current) {
        callbackRef.current(event)
      }
    }

    if (isActive) {
      window.addEventListener('click', handleClickOutside)
    }

    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [callbackRef, elRef, isActive])
}
