import { Bell, Moon, Settings } from "lucide-react"
import { Brand } from "./brand"
import { IconButton } from "./icon-button"
import { NavbarMenu } from "./navbar-menu"
import { SearchInput } from "./search-input"
import { UserMenu } from "./user-menu"

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-6">
        <Brand />
        <NavbarMenu />
        <div className="ml-auto flex items-center gap-3">
          <SearchInput />
          <IconButton label="Toggle theme">
            <Moon className="h-5 w-5" strokeWidth={1.75} />
          </IconButton>
          <IconButton label="Notifications" hasIndicator>
            <Bell className="h-5 w-5" strokeWidth={1.75} />
          </IconButton>
          <IconButton label="Settings">
            <Settings className="h-5 w-5" strokeWidth={1.75} />
          </IconButton>
          <UserMenu />
        </div>
      </div>
    </header>
  )
}