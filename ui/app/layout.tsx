import { Raleway, Inter } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"

const raleway = Raleway({ variable: "--font-sans" })
const inter = Inter({ variable: "--font-inter" })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        "font-sans",
        raleway.variable,
        inter.variable
      )}
    >
      <body suppressHydrationWarning className="px-4">
        {children}
      </body>
    </html>
  )
}
