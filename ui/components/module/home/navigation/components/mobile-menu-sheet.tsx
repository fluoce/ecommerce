import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/animate-ui/components/radix/sheet"
import { ReactNode } from "react"

export function MobileMenuSheet({ children }: { children: ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent showCloseButton={false}>
        <SheetHeader>
          <SheetTitle />
          <SheetDescription />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
