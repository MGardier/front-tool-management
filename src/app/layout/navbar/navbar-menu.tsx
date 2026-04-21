import clsx from "clsx"
import { navLinks } from "../../constants/navlinks"

export const NavbarMenu = () => {
  return (
    <nav className="hidden items-center gap-6 text-sm lg:flex">
      {navLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className={clsx(
            link.active ? "font-semibold text-slate-900" : "text-slate-500 hover:text-slate-900",
          )}
        >
          {link.label}
        </a>
      ))}
    </nav>
  )
}
