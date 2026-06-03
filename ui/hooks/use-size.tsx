import { useEffect, useState } from "react"

export function useSize({ size }: { size: number }) {
  const [isSize, setIsSize] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${size - 1}px)`)
    const onChange = () => {
      setIsSize(window.innerWidth < size)
    }
    mql.addEventListener("change", onChange)
    setIsSize(window.innerWidth < size)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isSize
}
