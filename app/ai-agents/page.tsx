"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { AgentCard, type Agent } from "@/components/ai-agents/agent-card"
import { AgentInteractionModal } from "@/components/ai-agents/agent-interaction-modal"
import { Bot, BrainCircuit, DollarSign, HeartPulse, Cpu, ShieldCheck } from "lucide-react"

const agents: Agent[] = [
  {
    name: "Gaming Coach",
    description: "Personalized coaching and auto-survey triggers. Analyzes gameplay to provide actionable advice.",
    icon: BrainCircuit,
    color: "primary",
    endpoint: "coach",
    contextExample: `{ "game_state": "player_stuck_on_puzzle", "session_time": 60 }`,
  },
  {
    name: "Monetization",
    description: "Optimizes ARPU by 31% and triggers high-value surveys and offers.",
    icon: DollarSign,
    color: "secondary",
    endpoint: "monetization",
    contextExample: `{ "player_level": 25, "last_purchase_days": 14 }`,
  },
  {
    name: "Social",
    description: "Drives community building, suggests guilds, and triggers engagement surveys.",
    icon: Bot,
    color: "primary",
    endpoint: "social",
    contextExample: `{ "friends_online": 3, "recent_achievements": 0 }`,
  },
  {
    name: "Performance Optimizer",
    description: "Real-time analysis of game performance, suggesting optimal settings.",
    icon: Cpu,
    color: "secondary",
    endpoint: "performance-optimizer-real",
    contextExample: `{ "current_fps": 45, "gpu_temp": 75 }`,
  },
  {
    name: "Hardware Consultant",
    description: "Recommends hardware upgrades based on performance data.",
    icon: ShieldCheck,
    color: "primary",
    endpoint: "hardware-consultant-real",
    contextExample: `{ "avg_fps": 52, "cpu_load": 0.9, "gpu_load": 0.95 }`,
  },
  {
    name: "Wellness Enhanced",
    description: "LIVE Claude AI integration for gaming wellness and mental health support.",
    icon: HeartPulse,
    color: "secondary",
    endpoint: "wellness-enhanced",
    contextExample: `{ "session_time": 180, "sentiment": "frustrated" }`,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

export default function AiAgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)

  return (
    <>
      <div className="container mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-wider text-center">AI Agents Hub</h1>
          <p className="mt-4 text-lg text-muted-foreground font-sans text-center max-w-3xl mx-auto">
            Deploy intelligent agents from our marketplace to bring your game world to life. Click any agent to
            interact.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {agents.map((agent) => (
            <AgentCard key={agent.name} agent={agent} onInteract={() => setSelectedAgent(agent)} />
          ))}
        </motion.div>
      </div>
      <AgentInteractionModal agent={selectedAgent} isOpen={!!selectedAgent} onClose={() => setSelectedAgent(null)} />
    </>
  )
}
