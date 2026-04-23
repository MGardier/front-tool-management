import { useEffect, useState } from 'react'

/**
 * Returns a value that updates only after `delay` ms of stability.
 * Useful for search inputs that shouldn't fire a request on every keystroke.
 */
export function useDebouncedValue<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
