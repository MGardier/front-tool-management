import { useState } from "react"
import { Bell, Moon, Settings } from "lucide-react"
import { Brand } from "./brand"
import { BurgerButton } from "./burger-button"
import { IconButton } from "./icon-button"
import { MobileMenu } from "./mobile-menu"
import { NavbarMenu } from "./navbar-menu"
import { SearchInput } from "./search-input"
import { UserMenu } from "./user-menu"

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-10 w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 lg:gap-8 lg:px-6">
        <BurgerButton open={mobileOpen} onToggle={() => setMobileOpen((prev) => !prev)} />
        <Brand />
        <NavbarMenu />
        <div className="ml-auto flex items-center gap-2 lg:gap-3">
          <SearchInput className="hidden w-64 lg:block" />
          <IconButton label="Toggle theme" className="hidden lg:flex">
            <Moon className="h-5 w-5" strokeWidth={1.75} />
          </IconButton>
          <IconButton label="Notifications" hasIndicator>
            <Bell className="h-5 w-5" strokeWidth={1.75} />
          </IconButton>
          <IconButton label="Settings" className="hidden lg:flex">
            <Settings className="h-5 w-5" strokeWidth={1.75} />
          </IconButton>
          <UserMenu />
        </div>
      </div>
      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </header>
  )
}
