"use client"

import { Categories } from "./components/categories"
import { InfoBar } from "./components/info-bar"
import { MenuBar } from "./components/menu-bar"

export function HomeTopBar() {
  return (
    <div className="flex w-full flex-col gap-2">
      <InfoBar />
      <MenuBar />
      <Categories />
    </div>
  )
}
