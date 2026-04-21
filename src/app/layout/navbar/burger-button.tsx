import { Menu, X } from "lucide-react"

type BurgerButtonProps = {
  open: boolean
  onToggle: () => void
}

export const BurgerButton = ({ open, onToggle }: BurgerButtonProps) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle navigation menu"
      aria-expanded={open}
      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden"
    >
      {open ? <X className="h-5 w-5" strokeWidth={2} /> : <Menu className="h-5 w-5" strokeWidth={2} />}
    </button>
  )
}
