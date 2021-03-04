import { useEffect, useRef } from 'react'

export const useTimeout = (callback: Function, delay: number = 0, condition: boolean = true) => {
  const callbackRef = useRef(callback)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    if (condition) {
      timeout = setTimeout(() => callbackRef.current(), delay)
    }

    return () => clearTimeout(timeout)
  }, [callbackRef, condition, delay])
}
