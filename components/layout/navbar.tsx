"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Menu, X, Gamepad2 } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const navLinks = [
  { name: "Developers", href: "/developers" },
  { name: "Gamers", href: "/gamers" },
  { name: "AI Agents", href: "/ai-agents" },
  { name: "Analytics", href: "/analytics" },
  { name: "Docs", href: "/docs" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2">
            <Gamepad2 className="h-8 w-8 text-primary" />
            <span className="text-3xl font-bold font-heading uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Qortrola
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-6 font-sans">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <ThemeToggle />
            <Button asChild>
              <Link href="/developers">Get API Key</Link>
            </Button>
          </div>
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden px-4 pt-2 pb-4 space-y-2 border-t border-border/50 font-sans"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Button asChild className="w-full">
            <Link href="/developers">Get API Key</Link>
          </Button>
        </motion.div>
      )}
    </motion.nav>
  )
}
