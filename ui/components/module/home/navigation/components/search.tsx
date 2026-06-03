import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Search as S } from "lucide-react"

export function Search() {
  return (
    <InputGroup className="size-9.5 flex-1 rounded border-2">
      <InputGroupAddon>
        <S />
      </InputGroupAddon>
      <InputGroupInput
        className="placeholder:text-muted-foreground/80"
        placeholder="Search light palace . . . ."
      />
    </InputGroup>
  )
}
