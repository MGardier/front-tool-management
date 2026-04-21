import { Zap } from "lucide-react"

export const Brand = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 to-indigo-600">
        <Zap className="h-5 w-5 text-white" fill="white" strokeWidth={2} />
      </div>
      <span className="text-lg font-bold text-slate-900">TechCorp</span>
    </div>
  )
}
