import { navLinks } from "../../constants/navlinks"

export const NavbarMenu = () => {
  return (
    <nav className="flex items-center gap-6 text-sm">
      {navLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className={
            link.active
              ? 'font-semibold text-slate-900'
              : 'text-slate-500 hover:text-slate-900'
          }
        >
          {link.label}
        </a>
      ))}
    </nav>
  )
}
