export const CATEGORIES = [
  "Chandeliers",
  "Pendant Lights",
  "Ceiling Lights",
  "Wall Lights",
  "Table Lamps",
  "Floor Lamps",
  "Desk Lamps",
  "LED Bulbs",
  "Smart Bulbs",
  "Decorative Bulbs",
  "Spotlights",
  "Track Lights",
  "Recessed Lights",
  "Panel Lights",
  "Strip Lights",
  "Night Lights",
  "Outdoor Lights",
  "Garden Lights",
  "Landscape Lights",
  "Pathway Lights",
  "Flood Lights",
  "Street Lights",
  "Smart Lighting",
  "Fans",
  "Ceiling Fans",
  "Exhaust Fans",
  "Decorative Fans",
  "Switches & Sockets",
  "Dimmers",
  "Lighting Accessories",
  "Drivers & Transformers",
  "Emergency Lights",
  "Architectural Lighting",
  "Commercial Lighting",
  "Office Lighting",
  "Hotel Lighting",
  "Restaurant Lighting",
]

export function Categories() {
  return (
    <ul className="flex w-full scrollbar-none items-center gap-8 overflow-x-auto text-xs font-medium text-muted-foreground">
      {CATEGORIES.map((c) => (
        <li key={c} className="shrink-0 cursor-pointer hover:text-orange-500">
          {c}
        </li>
      ))}
    </ul>
  )
}
