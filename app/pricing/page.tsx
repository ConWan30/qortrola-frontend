"use client"

import { motion } from "framer-motion"
import { PricingCard } from "@/components/pricing/pricing-card"

const plans = [
  {
    name: "Starter",
    price: "$750",
    description: "For indie devs and small studios getting started.",
    features: [
      "100K API calls/month",
      "AI Gaming Coach",
      "Auto-Survey Generation",
      "Real-time personalization",
      "Complete analytics",
    ],
    cta: "Subscribe Now",
    isPopular: false,
  },
  {
    name: "Professional",
    price: "$1,500",
    description: "The most popular choice for growing studios.",
    features: [
      "1M API calls/month",
      "All 4 AI Agents (incl. Wellness AI)",
      "Premium Auto-Surveys ($4.00/response)",
      "Advanced personalization & wellness tracking",
      "Complete revenue analytics",
    ],
    cta: "Subscribe Now",
    isPopular: true,
  },
  {
    name: "Enterprise",
    price: "$7,500",
    description: "For large-scale operations needing custom solutions.",
    features: [
      "Unlimited API calls",
      "Custom AI agents & Data sales",
      "White-label solution",
      "Dedicated success manager",
      "Highest revenue potential",
    ],
    cta: "Contact Sales",
    isPopular: false,
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

export default function PricingPage() {
  return (
    <div className="container mx-auto py-24 px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-wider text-center">Pricing Plans</h1>
        <p className="mt-4 text-lg text-muted-foreground font-sans text-center max-w-3xl mx-auto">
          Choose the plan that fits your scale and ambition. Start generating revenue today.
        </p>
      </motion.div>

      <motion.div
        className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {plans.map((plan) => (
          <PricingCard key={plan.name} {...plan} />
        ))}
      </motion.div>
    </div>
  )
}
