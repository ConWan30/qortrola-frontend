"use client"

import { motion } from "framer-motion"
import { HolographicCard } from "@/components/ui/holographic-card"
import { DocsSidebarNav } from "@/components/docs/sidebar-nav"

export default function DocsPage() {
  return (
    <div className="container mx-auto py-24 px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-wider text-center">Documentation</h1>
        <p className="mt-4 text-lg text-muted-foreground font-sans text-center">
          Your guide to integrating the Qortrola API.
        </p>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        <motion.div
          className="md:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <HolographicCard>
            <DocsSidebarNav />
          </HolographicCard>
        </motion.div>
        <motion.div
          className="md:col-span-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <HolographicCard className="prose prose-invert max-w-none prose-headings:font-heading prose-headings:uppercase prose-a:text-primary hover:prose-a:text-primary/80 prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border prose-pre:rounded-md">
            <h2>Getting Started</h2>
            <p>
              Welcome to the Qortrola API documentation. Our goal is to provide you with all the information you need to
              seamlessly integrate our powerful gaming services into your application.
            </p>
            <h3>Base URL</h3>
            <p>All API endpoints are relative to the following base URL:</p>
            <pre>
              <code>https://qortrola-api-production.up.railway.app/api/v1</code>
            </pre>

            <h3>Authentication</h3>
            <p>
              All API requests must be authenticated with an API key. You can generate a key from the{" "}
              <a href="/developers">Developer Portal</a>. Include your API key in the <code>X-API-Key</code> header of
              your requests.
            </p>

            <h2>Quick Start Example</h2>
            <p>Register your developer account to get an API key.</p>
            <pre>
              <code>
                {`curl -X POST "https://qortrola-api-production.up.railway.app/api/v1/developers/register" \\
-H "Content-Type: application/json" \\
-d '{
  "developer_name": "YourStudio",
  "email": "dev@yourstudio.com",
  "plan": "professional"
}'`}
              </code>
            </pre>

            <p>Test the Live Wellness Agent and generate real revenue.</p>
            <pre>
              <code>
                {`curl -X POST "https://qortrola-api-production.up.railway.app/api/v1/ai-agents/wellness?api_key=YOUR_API_KEY&player_id=PLAYER_ID" \\
-H "Content-Type: application/json" \\
-d '{
  "context": {
    "session_time": 120,
    "daily_playtime": 180,
    "sleep_quality": "poor"
  }
}'`}
              </code>
            </pre>
          </HolographicCard>
        </motion.div>
      </div>
    </div>
  )
}
