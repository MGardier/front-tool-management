import { ChevronDown } from "lucide-react"

export const UserMenu = () => {
  return (
    <button type="button" className="flex items-center gap-1 pl-1">
      <span className="h-8 w-8 rounded-full bg-slate-200" />
      <ChevronDown className="h-4 w-4 text-slate-400" strokeWidth={2} />
    </button>
  )
}
