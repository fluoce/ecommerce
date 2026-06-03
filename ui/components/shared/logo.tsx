import { cn } from "@/lib/utils"
import { ComponentProps } from "react"

export function Logo(props: ComponentProps<"h1">) {
  return (
    <h1 className={cn("", props.className)} {...props}>
      Light Palace
    </h1>
  )
}
