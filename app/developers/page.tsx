"use client"

import { DeveloperRegistration } from "@/components/DeveloperRegistration"
import { motion } from "framer-motion"

export default function DevelopersPage() {
  return (
    <div className="container mx-auto py-24 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-wider">Developer Portal</h1>
          <p className="mt-4 text-lg text-muted-foreground font-sans">
            Get your API key and start integrating Qortrola's powerful features into your game.
          </p>
          <div className="mt-6 flex justify-center">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <p className="text-sm text-primary font-medium">
                🚀 Live Backend: qortrola-api-production.up.railway.app
              </p>
            </div>
          </div>
        </div>

        <DeveloperRegistration />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12"
        >
          <div className="bg-muted/20 rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-4">What happens next?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-primary mb-2">1. Get Your API Key</h4>
                <p className="text-muted-foreground">
                  Register above to receive your unique API key instantly from our live backend.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">2. Test the Playground</h4>
                <p className="text-muted-foreground">
                  Use our live API playground to test real requests and see actual revenue generation.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">3. Integrate & Earn</h4>
                <p className="text-muted-foreground">
                  Integrate our SDKs and start generating revenue from player data and AI interactions.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
