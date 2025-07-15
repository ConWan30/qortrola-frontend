"use client"

import { motion } from "framer-motion"
import { HolographicCard } from "@/components/ui/holographic-card"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"

interface SdkCardProps {
  icon: LucideIcon
  title: string
  description: string
  link: string
  isDownload?: boolean
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
}

export function SdkCard({ icon: Icon, title, description, link, isDownload = false }: SdkCardProps) {
  return (
    <motion.div variants={itemVariants}>
      <HolographicCard className="h-full flex flex-col hover:shadow-neon-primary transition-shadow duration-300">
        <div className="flex-grow">
          <div className="flex items-center space-x-4">
            <Icon className="w-10 h-10 text-primary" />
            <h3 className="text-3xl font-bold font-heading uppercase">{title}</h3>
          </div>
          <p className="mt-4 text-muted-foreground font-sans">{description}</p>
        </div>
        <div className="mt-6">
          <Button asChild variant="outline" className="w-full bg-transparent">
            <Link href={link} target={isDownload ? "_self" : "_blank"} rel="noopener noreferrer">
              {isDownload ? "Download" : "Open Docs"}
            </Link>
          </Button>
        </div>
      </HolographicCard>
    </motion.div>
  )
}
