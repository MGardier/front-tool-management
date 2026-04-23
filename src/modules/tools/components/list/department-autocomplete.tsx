import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronDown, X } from 'lucide-react'
import clsx from 'clsx'
import { useDepartmentsSearch } from '@/shared/hooks/use-departments-search'
import { useDebouncedValue } from '@/shared/hooks/use-debounced-value'

type DepartmentAutocompleteProps = {
  value?: string
  onChange: (next: string | undefined) => void
  placeholder?: string
}

const AUTOCOMPLETE_DEBOUNCE_MS = 250
const MODULE = 'tools-list-filters'

export function DepartmentAutocomplete({
  value,
  onChange,
  placeholder = 'Any department',
}: DepartmentAutocompleteProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState(value ?? '')
  const debouncedQuery = useDebouncedValue(query, AUTOCOMPLETE_DEBOUNCE_MS)
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Sync external value changes (URL restore, clear-all).
  useEffect(() => {
    setQuery(value ?? '')
  }, [value])

  /**
   * Close the dropdown without committing the unsaved text — keeps the input
   * truthful: what the user sees in the field matches the active filter.
   */
  const closeAndSync = useCallback(() => {
    setQuery(value ?? '')
    setOpen(false)
  }, [value])

  // Close on outside click (reverts any typed-but-unselected text).
  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        closeAndSync()
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open, closeAndSync])

  const { data, isFetching } = useDepartmentsSearch({
    module: MODULE,
    query: debouncedQuery,
    enabled: open,
  })

  const results = data?.data ?? []

  const select = (name: string) => {
    onChange(name)
    setQuery(name)
    setOpen(false)
  }

  const clear = () => {
    onChange(undefined)
    setQuery('')
  }

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-16 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-400 focus:outline-none"
        />
        <div className="absolute right-1 top-1/2 flex -translate-y-1/2 items-center gap-0.5">
          {value && (
            <button
              type="button"
              aria-label="Clear department"
              onClick={clear}
              className="flex h-6 w-6 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          )}
          <button
            type="button"
            aria-label={open ? 'Close department list' : 'Open department list'}
            onClick={() => (open ? closeAndSync() : setOpen(true))}
            className="flex h-6 w-6 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <ChevronDown
              className={clsx('h-3.5 w-3.5 transition-transform', open && 'rotate-180')}
              strokeWidth={2}
            />
          </button>
        </div>
      </div>

      {open && (
        <div className="absolute left-0 right-0 top-full z-10 mt-1 max-h-60 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg">
          {isFetching && results.length === 0 ? (
            <div className="px-3 py-2 text-sm text-slate-500">Loading…</div>
          ) : results.length === 0 ? (
            <div className="px-3 py-2 text-sm text-slate-500">No department found</div>
          ) : (
            <ul role="listbox">
              {results.map((dept) => (
                <li key={dept.id}>
                  <button
                    type="button"
                    onClick={() => select(dept.name)}
                    className={clsx(
                      'block w-full px-3 py-2 text-left text-sm hover:bg-slate-50',
                      value === dept.name && 'bg-slate-50 font-medium text-slate-900'
                    )}
                  >
                    {dept.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
