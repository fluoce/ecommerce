import { HomeTopBar } from "@/components/module/home/navigation/home-top-bar"
import { ReactNode } from "react"

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full max-w-360 flex-col gap-6">
        <nav className="sticky top-0 z-20 w-full border-b bg-background pb-2">
          <HomeTopBar />
        </nav>
        {children}
      </div>
    </div>
  )
}
