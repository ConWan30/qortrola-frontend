"use client"

import { motion } from "framer-motion"
import { Users, DollarSign, ClipboardList } from "lucide-react"
import { StatsCard } from "@/components/analytics/stats-card"
import { MainChart } from "@/components/analytics/main-chart"
import { HolographicCard } from "../components/ui/holographic-card"
import { Bot } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto py-24 px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-wider text-center">Analytics Dashboard</h1>
        <p className="mt-4 text-lg text-muted-foreground font-sans text-center">
          Deep insights into player behavior and game performance.
        </p>
      </motion.div>

      <motion.div
        className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <StatsCard icon={Users} title="Active Players" value="1,204" change="+150 today" />
        <StatsCard icon={DollarSign} title="Total Revenue" value="$18,340" change="+$280 today" />
        <StatsCard icon={Bot} title="AI Sessions" value="3,812" change="+300 today" />
        <StatsCard icon={ClipboardList} title="Surveys Answered" value="942" change="+50 today" />
      </motion.div>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <HolographicCard>
          <MainChart />
        </HolographicCard>
      </motion.div>
    </div>
  )
}
