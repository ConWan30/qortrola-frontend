"use client"

import { motion } from "framer-motion"
import { PlayerCreator } from "@/components/analytics/player-creator"
import { EventTracker } from "@/components/analytics/event-tracker"
import { HolographicCard } from "@/components/ui/holographic-card"
import { MainChart } from "@/components/analytics/main-chart"

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto py-24 px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-wider text-center">Live Analytics</h1>
        <p className="mt-4 text-lg text-muted-foreground font-sans text-center max-w-3xl mx-auto">
          Interact with the Qortrola API in real-time and see live data visualizations.
        </p>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8"
        >
          <PlayerCreator />
          <EventTracker />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <HolographicCard className="h-full">
            <MainChart />
          </HolographicCard>
        </motion.div>
      </div>
    </div>
  )
}
