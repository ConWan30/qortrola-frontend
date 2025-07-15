"use client"

import { motion } from "framer-motion"
import { HolographicCard } from "@/components/ui/holographic-card"
import { History, Trophy, Users, Sword } from "lucide-react"

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
}

const feedItems = [
  {
    Icon: Trophy,
    text: "Unlocked the 'Galactic Conqueror' achievement in 'Starfall'.",
    time: "2 hours ago",
  },
  {
    Icon: Users,
    text: "Joined 'The Neon Ghosts' guild.",
    time: "1 day ago",
  },
  {
    Icon: Sword,
    text: "Defeated the final boss in 'Cyber-Dungeon X'.",
    time: "3 days ago",
  },
  {
    Icon: Trophy,
    text: "Reached Level 42.",
    time: "3 days ago",
  },
]

export function ActivityFeed() {
  return (
    <motion.div variants={itemVariants}>
      <HolographicCard className="h-full hover:shadow-neon-primary transition-shadow duration-300">
        <h3 className="text-2xl font-bold font-heading uppercase flex items-center">
          <History className="mr-3" />
          Recent Activity
        </h3>
        <ul className="mt-4 space-y-4 font-sans">
          {feedItems.map((item, index) => (
            <li key={index} className="flex items-start space-x-4">
              <div className="p-2 bg-muted/50 rounded-full mt-1">
                <item.Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-foreground">{item.text}</p>
                <p className="text-sm text-muted-foreground">{item.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </HolographicCard>
    </motion.div>
  )
}
