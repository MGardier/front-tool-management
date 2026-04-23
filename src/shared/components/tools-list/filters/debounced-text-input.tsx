import { useEffect, useRef, useState, type InputHTMLAttributes } from 'react'

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
 *
 * The debounce timer is cancelled whenever `value` changes from the
 * parent, so a parent-driven reset (clear-all, badge removal, URL
 * restore) can never be overwritten by a stale pending emit.
 */
export function DebouncedTextInput({
  value,
  onChange,
  debounceMs = 300,
  ...inputProps
}: DebouncedTextInputProps) {
  const [local, setLocal] = useState(value)

  const onChangeRef = useRef(onChange)
  useEffect(() => {
    onChangeRef.current = onChange
  })

  // Sync from parent (URL restore, clear-all, etc.).
  useEffect(() => {
    setLocal(value)
  }, [value])

  // Emit only when the user has diverged from the parent's value; the
  // cleanup cancels the pending emit as soon as parent and local realign.
  useEffect(() => {
    if (local === value) return
    const timer = setTimeout(() => onChangeRef.current(local), debounceMs)
    return () => clearTimeout(timer)
  }, [local, value, debounceMs])

  return (
    <input
      {...inputProps}
      value={local}
      onChange={(e) => setLocal(e.target.value)}
    />
  )
}
