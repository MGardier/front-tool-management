import clsx from "clsx"
import { Search } from "lucide-react"

type SearchInputProps = {
  className?: string
}

export const SearchInput = ({ className }: SearchInputProps) => {
  return (
    <div className={clsx("relative", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        placeholder="Search tools..."
        className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:outline-none"
      />
    </div>
  )
}
