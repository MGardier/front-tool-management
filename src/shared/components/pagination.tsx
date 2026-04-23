import clsx from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type PaginationProps = {
  page: number
  limit: number
  total: number
  onPageChange: (page: number) => void
  /** Omit to hide the page size selector (when limit is fixed by the consumer). */
  onLimitChange?: (limit: number) => void
  pageSizeOptions?: number[]
}

const DEFAULT_PAGE_SIZES = [10, 20, 50, 100]

/**
 * Picks up to 5 page numbers to show, ellipsing gaps.
 * Example (page 4, total 10): [1, ..., 3, 4, 5, ..., 10]
 */
const buildPageList = (current: number, totalPages: number): (number | 'gap')[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }
  const pages: (number | 'gap')[] = [1]
  const start = Math.max(2, current - 1)
  const end = Math.min(totalPages - 1, current + 1)
  if (start > 2) pages.push('gap')
  for (let p = start; p <= end; p++) pages.push(p)
  if (end < totalPages - 1) pages.push('gap')
  pages.push(totalPages)
  return pages
}

export function Pagination({
  page,
  limit,
  total,
  onPageChange,
  onLimitChange,
  pageSizeOptions = DEFAULT_PAGE_SIZES,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / limit))
  const rangeStart = total === 0 ? 0 : (page - 1) * limit + 1
  const rangeEnd = Math.min(page * limit, total)
  const isFirst = page <= 1
  const isLast = page >= totalPages

  return (
    <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <p className="text-sm text-slate-500">
        {total === 0
          ? 'No results'
          : `Showing ${rangeStart}–${rangeEnd} of ${total}`}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        {/* Numbered pages: desktop only (≥ md) */}
        <div className="hidden items-center gap-1 md:flex">
          <PagerButton
            ariaLabel="Previous page"
            disabled={isFirst}
            onClick={() => onPageChange(page - 1)}
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2} />
          </PagerButton>
          {buildPageList(page, totalPages).map((p, i) =>
            p === 'gap' ? (
              <span key={`gap-${i}`} className="px-1 text-slate-400">
                …
              </span>
            ) : (
              <PagerButton
                key={p}
                active={p === page}
                onClick={() => onPageChange(p)}
                ariaLabel={`Go to page ${p}`}
              >
                {p}
              </PagerButton>
            )
          )}
          <PagerButton
            ariaLabel="Next page"
            disabled={isLast}
            onClick={() => onPageChange(page + 1)}
          >
            <ChevronRight className="h-4 w-4" strokeWidth={2} />
          </PagerButton>
        </div>

        {/* Compact pager: mobile only (< md) */}
        <div className="flex items-center gap-2 md:hidden">
          <PagerButton
            ariaLabel="Previous page"
            disabled={isFirst}
            onClick={() => onPageChange(page - 1)}
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2} />
          </PagerButton>
          <span className="text-sm text-slate-700">
            Page <span className="font-medium">{page}</span> of {totalPages}
          </span>
          <PagerButton
            ariaLabel="Next page"
            disabled={isLast}
            onClick={() => onPageChange(page + 1)}
          >
            <ChevronRight className="h-4 w-4" strokeWidth={2} />
          </PagerButton>
        </div>

        {onLimitChange && (
          <label className="ml-2 flex items-center gap-2 text-sm text-slate-600">
            <select
              value={limit}
              onChange={(e) => onLimitChange(Number(e.target.value))}
              className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm"
              aria-label="Rows per page"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size} / page
                </option>
              ))}
            </select>
          </label>
        )}
      </div>
    </div>
  )
}

type PagerButtonProps = {
  onClick: () => void
  disabled?: boolean
  active?: boolean
  ariaLabel?: string
  children: React.ReactNode
}

function PagerButton({
  onClick,
  disabled,
  active,
  ariaLabel,
  children,
}: PagerButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-current={active ? 'page' : undefined}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'inline-flex h-9 min-w-9 items-center justify-center rounded-lg border text-sm transition-colors',
        active
          ? 'border-slate-900 bg-slate-900 text-white'
          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50',
        'disabled:cursor-not-allowed disabled:opacity-40'
      )}
    >
      {children}
    </button>
  )
}
