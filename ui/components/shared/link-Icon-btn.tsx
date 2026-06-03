import { LucideIcon } from "lucide-react"
import Link from "next/link"
import { LinkIconBtnType } from "./types"

export function LinkIconBtn({
  href,
  icon: Icon,
  iconSize,
  label,
}: LinkIconBtnType) {
  return (
    <Link
      key={label}
      href={href}
      className="group flex cursor-pointer flex-col items-center p-1 text-xs font-medium"
    >
      <Icon
        size={iconSize}
        strokeWidth={1.3}
        className="group-hover:text-orange-500"
      />
      {label}
    </Link>
  )
}
