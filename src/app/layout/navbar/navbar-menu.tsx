import clsx from 'clsx'
import { NavLink } from 'react-router'
import { NAV_LINKS } from '../../constants/navlinks'

const isRoutable = (href: string): boolean => href.startsWith('/')

export const NavbarMenu = () => {
  return (
    <nav className="hidden items-center gap-6 text-sm lg:flex">
      {NAV_LINKS.map((link) =>
        isRoutable(link.href) ? (
          <NavLink
            key={link.label}
            to={link.href}
            end={link.href === '/'}
            className={({ isActive }) =>
              clsx(
                isActive
                  ? 'font-semibold text-slate-900'
                  : 'text-slate-500 hover:text-slate-900'
              )
            }
          >
            {link.label}
          </NavLink>
        ) : (
          <a
            key={link.label}
            href={link.href}
            className="text-slate-500 hover:text-slate-900"
          >
            {link.label}
          </a>
        )
      )}
    </nav>
  )
}
