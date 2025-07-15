"use client"

import { motion } from "framer-motion"
import { AgentCard } from "@/components/ai-agents/agent-card"
import { Bot, BrainCircuit, DollarSign, HeartPulse } from "lucide-react"

const agents = [
  {
    name: "Gaming Coach",
    description: "Personalized coaching and auto-survey triggers. Cost: $0.25/session.",
    icon: BrainCircuit,
    color: "primary",
  },
  {
    name: "Wellness AI",
    description: "LIVE Claude AI integration for gaming wellness and mental health. Generates $0.50/session.",
    icon: HeartPulse,
    color: "secondary",
  },
  {
    name: "Monetization",
    description: "Optimizes ARPU by 31% and triggers high-value surveys. Cost: $0.15/session.",
    icon: DollarSign,
    color: "primary",
  },
  {
    name: "Social Engagement",
    description: "Drives community building and engagement surveys. Cost: $0.10/session.",
    icon: Bot,
    color: "secondary",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

export default function AiAgentsPage() {
  return (
    <div className="container mx-auto py-24 px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-wider text-center">AI Agents Hub</h1>
        <p className="mt-4 text-lg text-muted-foreground font-sans text-center max-w-3xl mx-auto">
          Deploy intelligent agents from our marketplace to bring your game world to life.
        </p>
      </motion.div>

      <motion.div
        className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {agents.map((agent) => (
          <AgentCard key={agent.name} {...agent} />
        ))}
      </motion.div>
    </div>
  )
}
