import clsx from "clsx"
import { NavLink } from "react-router"
import { NAV_LINKS } from "../../constants/navlinks"
import { SearchInput } from "./search-input"

type MobileMenuProps = {
  onClose: () => void
}

const isRoutable = (href: string): boolean => href.startsWith('/')

const linkClasses = (isActive: boolean) =>
  clsx(
    'rounded-lg px-3 py-2 text-sm',
    isActive
      ? 'bg-slate-100 font-semibold text-slate-900'
      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
  )

export const MobileMenu = ({ onClose }: MobileMenuProps) => {
  return (
    <div className="border-t border-slate-200 bg-white lg:hidden">
      <nav className="flex flex-col gap-1 p-4">
        {NAV_LINKS.map((link) =>
          isRoutable(link.href) ? (
            <NavLink
              key={link.label}
              to={link.href}
              end={link.href === '/'}
              onClick={onClose}
              className={({ isActive }) => linkClasses(isActive)}
            >
              {link.label}
            </NavLink>
          ) : (
            <a
              key={link.label}
              href={link.href}
              onClick={onClose}
              className={linkClasses(false)}
            >
              {link.label}
            </a>
          )
        )}
        <div className="mt-3 border-t border-slate-200 pt-3">
          <SearchInput className="w-full" />
        </div>
      </nav>
    </div>
  )
}
