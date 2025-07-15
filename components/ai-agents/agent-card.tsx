"use client"

import { motion } from "framer-motion"
import { HolographicCard } from "@/components/ui/holographic-card"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"

interface AgentCardProps {
  name: string
  description: string
  icon: LucideIcon
  color: "primary" | "secondary"
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
}

export function AgentCard({ name, description, icon: Icon, color }: AgentCardProps) {
  return (
    <motion.div variants={itemVariants}>
      <HolographicCard className={`h-full flex flex-col hover:shadow-neon-${color} transition-shadow duration-300`}>
        <div className="flex-grow">
          <div className="flex items-center space-x-4">
            <Icon className={`w-10 h-10 text-${color}`} />
            <h3 className="text-3xl font-bold font-heading uppercase">{name}</h3>
          </div>
          <p className="mt-4 text-muted-foreground font-sans">{description}</p>
        </div>
        <div className="mt-6">
          <Button variant="outline" className="w-full bg-transparent">
            View Integration
          </Button>
        </div>
      </HolographicCard>
    </motion.div>
  )
}
