"use client"

import { HolographicCard } from "@/components/ui/holographic-card"
import { Bot, BarChart3, MessageSquareQuote, Share2 } from "lucide-react"
import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const features = [
  {
    value: "item-1",
    icon: Bot,
    title: "AI Agents",
    description:
      "Deploy intelligent NPCs, coaches, and monetization agents that adapt in real-time. Our agents learn from player behavior to create dynamic, personalized encounters that enhance engagement and retention.",
    color: "primary",
  },
  {
    value: "item-2",
    icon: BarChart3,
    title: "Player Analytics",
    description:
      "Gain deep insights into player behavior, predict churn, and personalize experiences. Track custom events, segment your player base, and understand the full player journey with our powerful analytics suite.",
    color: "secondary",
  },
  {
    value: "item-3",
    icon: MessageSquareQuote,
    title: "Survey Revenue",
    description:
      "Generate new revenue streams by integrating our non-intrusive, gamified survey system. Reward players for their feedback and gather valuable data without disrupting the gameplay experience.",
    color: "primary",
  },
  {
    value: "item-4",
    icon: Share2,
    title: "Decentralized Comms",
    description:
      "Build secure, player-owned communication channels with our DePIN integration. Empower your community with censorship-resistant chat, voice, and data sharing, all powered by a decentralized network.",
    color: "secondary",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
}

export function FeaturesSection() {
  return (
    <section className="container mx-auto py-24 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-wider">A Symphony of Features</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground font-sans">
          Explore the core components of the Qortrola API, designed for elegance and power.
        </p>
      </div>
      <motion.div
        className="mt-16 max-w-3xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Accordion type="single" collapsible className="w-full space-y-4">
          {features.map((feature) => (
            <motion.div key={feature.value} variants={itemVariants}>
              <HolographicCard className="hover:shadow-neon-primary transition-shadow duration-300">
                <AccordionItem value={feature.value} className="border-none">
                  <AccordionTrigger className="font-heading text-2xl hover:no-underline">
                    <div className="flex items-center space-x-4">
                      <feature.icon className={`h-6 w-6 text-${feature.color}`} />
                      <span>{feature.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4 text-muted-foreground font-sans">
                    {feature.description}
                  </AccordionContent>
                </AccordionItem>
              </HolographicCard>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </section>
  )
}
