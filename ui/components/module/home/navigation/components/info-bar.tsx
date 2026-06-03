import { LanguageSupport } from "@/components/shared/language-support"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Building2,
  ChevronDown,
  Languages,
  Layers,
  Phone,
  Store,
} from "lucide-react"

export function InfoBar() {
  return (
    <div className="hidden w-full items-center justify-between gap-4 bg-muted p-1.5 text-muted-foreground md:flex">
      <div className="flex items-center gap-2">
        <Button variant="ghostTwo" size="sm">
          <Store /> Our stores
        </Button>
        <Separator orientation="vertical" />
        <Button variant="ghostTwo" size="sm">
          <Layers /> Bulk Order
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghostTwo" size="sm" className="font-[Inter] text-xs">
          <Phone /> +91 93021 93021
        </Button>
        <Separator orientation="vertical" />
        <Button variant="ghostTwo" size="sm">
          <Building2 />
          Become a Franchise
        </Button>
        <Separator orientation="vertical" />
        <LanguageSupport>
          <Button variant="ghostTwo" size="sm">
            <Languages /> English <ChevronDown />
          </Button>
        </LanguageSupport>
      </div>
    </div>
  )
}
