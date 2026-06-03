import { ReactElement, ReactNode } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ALargeSmall } from "lucide-react"

const LANGUAGES: { lable: string; value: string; icon?: ReactElement }[] = [
  {
    lable: "English",
    value: "en",
  },
  {
    lable: "Hindi",
    value: "hi",
  },
  {
    lable: "Gujarati",
    value: "gu",
  },
]

export function LanguageSupport({ children }: { children: ReactNode }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {LANGUAGES.map((l) => (
            <DropdownMenuItem className="p-2 px-4" key={l.value}>
              {l?.icon}
              {l.lable}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
