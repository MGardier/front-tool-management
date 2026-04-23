import { Search, X } from 'lucide-react'
import { DebouncedTextInput } from '@/shared/components/tools-list/filters/debounced-text-input'

type ToolsSearchInputProps = {
  value: string
  onChange: (next: string) => void
  placeholder?: string
  debounceMs?: number
  'aria-label'?: string
}

/**
 * Search input with internal debouncing + a clear button.
 * The debounce pattern lives in `DebouncedTextInput`; here we just decorate
 * it with a search icon and an explicit clear control (the clear fires
 * immediately — a deliberate user action shouldn't feel laggy).
 */
export function ToolsSearchInput({
  value,
  onChange,
  placeholder = 'Search tools…',
  debounceMs = 300,
  'aria-label': ariaLabel = 'Search tools',
}: ToolsSearchInputProps) {
  return (
    <div className="relative">
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        strokeWidth={2}
      />
      <DebouncedTextInput
        type="search"
        aria-label={ariaLabel}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        debounceMs={debounceMs}
        className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-9 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-400 focus:outline-none"
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => onChange('')}
          className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="h-3.5 w-3.5" strokeWidth={2} />
        </button>
      )}
    </div>
  )
}
