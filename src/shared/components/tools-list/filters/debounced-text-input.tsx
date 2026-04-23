import { useEffect, useRef, useState, type InputHTMLAttributes } from 'react'
import { useDebouncedValue } from '@/shared/hooks/use-debounced-value'

type DebouncedTextInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'defaultValue'
> & {
  value: string
  onChange: (next: string) => void
  debounceMs?: number
}

/**
 * Controlled text input with internal debouncing. Emits `onChange` only
 * with stable values — the consumer never sees per-keystroke updates.
 * The latest `onChange` is captured via a ref so callers can pass an
 * inline handler without worrying about referential stability.
 */
export function DebouncedTextInput({
  value,
  onChange,
  debounceMs = 300,
  ...inputProps
}: DebouncedTextInputProps) {
  const [local, setLocal] = useState(value)
  const debounced = useDebouncedValue(local, debounceMs)

  const onChangeRef = useRef(onChange)
  useEffect(() => {
    onChangeRef.current = onChange
  })

  // Sync from parent (URL restore, clear-all, etc.).
  useEffect(() => {
    setLocal(value)
  }, [value])

  // Emit only when the debounced value diverges from what the parent holds.
  useEffect(() => {
    if (debounced !== value) onChangeRef.current(debounced)
  }, [debounced, value])

  return (
    <input
      {...inputProps}
      value={local}
      onChange={(e) => setLocal(e.target.value)}
    />
  )
}
