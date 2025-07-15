"use client"

import { LiveAPIPlayground } from "@/components/LiveAPIPlayground"
import { motion } from "framer-motion"

export default function PlaygroundPage() {
  return (
    <div className="container mx-auto py-24 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-wider">API Playground</h1>
          <p className="mt-4 text-lg text-muted-foreground font-sans">
            Test our live API with real requests and see actual revenue generation in action.
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-2">
              <p className="text-sm text-green-400 font-medium">✅ Live Backend Connected</p>
            </div>
            <div className="bg-primary/10 border border-primary/20 rounded-lg px-4 py-2">
              <p className="text-sm text-primary font-medium">🤖 AI Agents Active</p>
            </div>
          </div>
        </div>

        <LiveAPIPlayground />
      </motion.div>
    </div>
  )
}
