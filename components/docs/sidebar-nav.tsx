"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { title: "Introduction", href: "/docs" },
  { title: "Authentication", href: "/docs/authentication" },
  { title: "Quick Start", href: "/docs/quick-start" },
  {
    title: "Core Resources",
    isLabel: true,
  },
  { title: "Developers", href: "/docs/developers" },
  { title: "Players", href: "/docs/players" },
  { title: "Events", href: "/docs/events" },
  {
    title: "Features",
    isLabel: true,
  },
  { title: "AI Agents", href: "/docs/ai-agents" },
  { title: "Survey System", href: "/docs/surveys" },
  { title: "Analytics", href: "/docs/analytics" },
  { title: "Error Codes", href: "/docs/errors" },
]

export function DocsSidebarNav() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col space-y-1 font-sans">
      {navItems.map((item) =>
        item.isLabel ? (
          <h4
            key={item.title}
            className="font-heading uppercase text-muted-foreground text-sm tracking-wider pt-4 pb-1 px-3"
          >
            {item.title}
          </h4>
        ) : (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "px-3 py-2 rounded-md text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
            )}
          >
            {item.title}
          </Link>
        ),
      )}
    </nav>
  )
}
