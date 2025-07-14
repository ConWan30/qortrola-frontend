"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { ApiStatusCard } from "./api-status-card"

export function HeroSection() {
  return (
    <section className="relative w-full flex items-center justify-center overflow-hidden pt-16 pb-16 md:pt-24 md:pb-24">
      <div className="relative z-10 container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-br from-foreground to-muted-foreground">
            Gaming, Reimagined
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground font-sans">
            A powerful API for a new era of play. Integrate our AI-powered tools to create visionary gaming experiences
            with unparalleled depth and intelligence.
          </p>
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              asChild
              size="lg"
              className="group shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow"
            >
              <Link href="/developers">
                Start Creating <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <ApiStatusCard />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
