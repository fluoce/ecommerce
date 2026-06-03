import { Logo } from "@/components/shared/logo"
import { Search } from "./search"
import { UserActionMenu } from "./user-action-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function MenuBar() {
  return (
    <div className="flex w-full items-center justify-between gap-8 py-2">
      <div className="cinzel flex shrink-0 flex-col -space-y-1">
        <Logo className="text-2xl font-black text-neutral-700 md:text-3xl" />
        <p className="hidden text-xs font-medium text-muted-foreground sm:flex">
          Premium Lighting for Your Space
        </p>
      </div>
      <div className="flex items-center text-muted-foreground">
        <Button variant="ghostTwo">
          Residential <ChevronDown />
        </Button>
        <Button variant="ghostTwo">
          Hotels & Restaurants <ChevronDown />
        </Button>
        <Button variant="ghostTwo">
          For Offices <ChevronDown />
        </Button>
      </div>
      <Search />
      <UserActionMenu />
    </div>
  )
}
