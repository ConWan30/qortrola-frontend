"use client"

import { motion } from "framer-motion"
import { HolographicCard } from "@/components/ui/holographic-card"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string
  change: string
  icon: LucideIcon
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
}

export function StatsCard({ title, value, change, icon: Icon }: StatsCardProps) {
  const isPositive = change.startsWith("+")
  return (
    <motion.div variants={itemVariants}>
      <HolographicCard className="hover:shadow-neon-primary transition-shadow duration-300">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <Icon className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="mt-2">
          <h3 className="text-4xl font-bold font-heading">{value}</h3>
          <p className={cn("text-sm", isPositive ? "text-primary" : "text-destructive")}>{change} vs last period</p>
        </div>
      </HolographicCard>
    </motion.div>
  )
}
