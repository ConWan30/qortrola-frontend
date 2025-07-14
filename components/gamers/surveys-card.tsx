"use client"

import { motion } from "framer-motion"
import { HolographicCard } from "@/components/ui/holographic-card"
import { Button } from "@/components/ui/button"
import { ClipboardList, Coins } from "lucide-react"

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
}

const surveys = [
  {
    title: "Feedback for 'Galaxy Raiders'",
    reward: 150,
  },
  {
    title: "New Character Concept Poll",
    reward: 75,
  },
]

export function SurveysCard() {
  return (
    <motion.div variants={itemVariants}>
      <HolographicCard className="hover:shadow-neon-secondary transition-shadow duration-300">
        <h3 className="text-2xl font-bold font-heading uppercase flex items-center">
          <ClipboardList className="mr-3" />
          Available Surveys
        </h3>
        <div className="mt-4 space-y-4 font-sans">
          {surveys.map((survey, index) => (
            <div key={index} className="flex justify-between items-center bg-muted/50 p-3 rounded-md">
              <div>
                <p className="font-semibold">{survey.title}</p>
                <div className="flex items-center text-sm text-primary">
                  <Coins className="w-4 h-4 mr-1" />
                  <span>{survey.reward} Credits</span>
                </div>
              </div>
              <Button size="sm" variant="ghost">
                Start
              </Button>
            </div>
          ))}
        </div>
      </HolographicCard>
    </motion.div>
  )
}
