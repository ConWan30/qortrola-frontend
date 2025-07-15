"use client"

import { motion } from "framer-motion"
import { HolographicCard } from "@/components/ui/holographic-card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface PricingCardProps {
  name: string
  price: string
  description: string
  features: string[]
  cta: string
  isPopular: boolean
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
}

export function PricingCard({ name, price, description, features, cta, isPopular }: PricingCardProps) {
  return (
    <motion.div variants={itemVariants} className={cn(isPopular ? "scale-105" : "")}>
      <HolographicCard
        className={cn(
          "h-full flex flex-col",
          isPopular ? "shadow-neon-primary" : "hover:shadow-neon-secondary transition-shadow duration-300",
        )}
      >
        {isPopular && (
          <div className="absolute -top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold uppercase">
            Most Popular
          </div>
        )}
        <div className="flex-grow">
          <h3 className="text-3xl font-bold font-heading uppercase">{name}</h3>
          <p className="mt-2 text-muted-foreground">{description}</p>
          <div className="mt-6">
            <span className="text-5xl font-bold">{price}</span>
            <span className="text-muted-foreground">/month</span>
          </div>
          <ul className="mt-8 space-y-4 font-sans">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8">
          <Button className="w-full" variant={isPopular ? "default" : "outline"}>
            {cta}
          </Button>
        </div>
      </HolographicCard>
    </motion.div>
  )
}
