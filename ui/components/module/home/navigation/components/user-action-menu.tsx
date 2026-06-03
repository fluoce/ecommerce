import { LinkIconBtn } from "@/components/shared/link-Icon-btn"
import { LinkIconBtnType } from "@/components/shared/types"
import { Heart, LucideIcon, ShoppingBag, Store, UserRound } from "lucide-react"

const USER_MENU: LinkIconBtnType[] = [
  {
    label: "Store",
    icon: Store,
    iconSize: 20,
    href: "#",
  },
  {
    label: "Wishlist",
    icon: Heart,
    iconSize: 21,
    href: "#",
  },
  {
    label: "Cart",
    icon: ShoppingBag,
    iconSize: 20,
    href: "#",
  },
  {
    label: "Profile",
    icon: UserRound,
    iconSize: 20,
    href: "#",
  },
]

export function UserActionMenu() {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      {USER_MENU.map(({ label, icon, iconSize, href }) => (
        <LinkIconBtn
          key={label}
          label={label}
          icon={icon}
          iconSize={iconSize}
          href={href}
        />
      ))}
    </div>
  )
}
