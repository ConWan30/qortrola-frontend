"use client"

import { motion } from "framer-motion"
import { HolographicCard } from "@/components/ui/holographic-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Award, Shield } from "lucide-react"

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
}

export function ProfileCard() {
  return (
    <motion.div variants={itemVariants}>
      <HolographicCard className="hover:shadow-neon-primary transition-shadow duration-300">
        <div className="flex flex-col items-center text-center">
          <Avatar className="w-24 h-24 border-2 border-primary">
            <AvatarImage src="/placeholder.svg?width=96&height=96" alt="Gamer Avatar" />
            <AvatarFallback>G</AvatarFallback>
          </Avatar>
          <h2 className="mt-4 text-3xl font-bold font-heading uppercase">CyberJunkie77</h2>
          <p className="text-sm text-primary">Level 42 - Void Runner</p>
        </div>
        <div className="mt-6 space-y-4 font-sans">
          <div className="flex items-center">
            <User className="w-5 h-5 mr-3 text-muted-foreground" />
            <span className="text-foreground">Joined: 2 years ago</span>
          </div>
          <div className="flex items-center">
            <Award className="w-5 h-5 mr-3 text-muted-foreground" />
            <span className="text-foreground">Achievements: 128</span>
          </div>
          <div className="flex items-center">
            <Shield className="w-5 h-5 mr-3 text-muted-foreground" />
            <span className="text-foreground">Guild: The Neon Ghosts</span>
          </div>
        </div>
      </HolographicCard>
    </motion.div>
  )
}
