"use client"

import { AnalyticsDashboard } from "@/components/AnalyticsDashboard"
import { motion } from "framer-motion"

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto py-24 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-wider">Analytics Dashboard</h1>
          <p className="mt-4 text-lg text-muted-foreground font-sans">
            Deep insights into player behavior, revenue generation, and AI performance.
          </p>
        </div>

        <AnalyticsDashboard />
      </motion.div>
    </div>
  )
}
