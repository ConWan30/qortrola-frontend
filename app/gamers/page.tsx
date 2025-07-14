"use client"

import { motion } from "framer-motion"
import { ProfileCard } from "@/components/gamers/profile-card"
import { SurveysCard } from "@/components/gamers/surveys-card"
import { ActivityFeed } from "@/components/gamers/activity-feed"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

export default function GamersPage() {
  return (
    <div className="container mx-auto py-24 px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-wider text-center">Gamer Portal</h1>
        <p className="mt-4 text-lg text-muted-foreground font-sans text-center">
          Your central hub for stats, rewards, and community.
        </p>
      </motion.div>

      <motion.div
        className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="lg:col-span-1 space-y-8">
          <ProfileCard />
          <SurveysCard />
        </div>
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
      </motion.div>
    </div>
  )
}
