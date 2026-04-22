import clsx from "clsx"
import { NAV_LINKS } from "../../constants/navlinks"
import { SearchInput } from "./search-input"

type MobileMenuProps = {
  onClose: () => void
}

export const MobileMenu = ({ onClose }: MobileMenuProps) => {
  return (
    <div className="border-t border-slate-200 bg-white lg:hidden">
      <nav className="flex flex-col gap-1 p-4">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={onClose}
            className={clsx(
              "rounded-lg px-3 py-2 text-sm",
              link.active
                ? "bg-slate-100 font-semibold text-slate-900"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
            )}
          >
            {link.label}
          </a>
        ))}
        <div className="mt-3 border-t border-slate-200 pt-3">
          <SearchInput className="w-full" />
        </div>
      </nav>
    </div>
  )
}
