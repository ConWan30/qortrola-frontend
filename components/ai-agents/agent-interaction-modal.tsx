"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader, Sparkles } from "lucide-react"
import type { Agent } from "./agent-card"
import { HolographicCard } from "../ui/holographic-card"

interface AgentInteractionModalProps {
  agent: Agent | null
  isOpen: boolean
  onClose: () => void
}

export function AgentInteractionModal({ agent, isOpen, onClose }: AgentInteractionModalProps) {
  const { toast } = useToast()
  const [apiKey, setApiKey] = useState("")
  const [context, setContext] = useState(agent?.contextExample || "")
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<any>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agent) return
    setIsLoading(true)
    setResponse(null)

    try {
      let parsedContext
      try {
        parsedContext = JSON.parse(context)
      } catch (error) {
        throw new Error("Invalid JSON in context field.")
      }

      const res = await fetch(
        `https://qortrola-api-production.up.railway.app/api/v1/ai-agents/${agent.endpoint}?player_id=demo_player_123`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": apiKey,
          },
          body: JSON.stringify({ context: parsedContext }),
        },
      )

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.detail || "An unknown error occurred.")
      }

      setResponse(result)
      toast({ title: "Interaction Successful", description: `Received response from ${agent.name}.` })
    } catch (error: any) {
      toast({ variant: "destructive", title: "Interaction Failed", description: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  // Update context when agent changes
  if (isOpen && agent && context !== agent.contextExample && !response) {
    setContext(agent.contextExample)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="holographic-border bg-card/80 backdrop-blur-sm max-w-2xl">
        {agent && (
          <>
            <DialogHeader>
              <DialogTitle className={`font-heading text-4xl text-${agent.color} uppercase tracking-wide`}>
                Interact with {agent.name}
              </DialogTitle>
              <DialogDescription className="font-sans">
                Provide your API key and a context JSON to simulate a call to the agent.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 font-sans">
              <div>
                <Label htmlFor="api-key">API Key</Label>
                <Input
                  id="api-key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Your secret API key"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="context">Context (JSON)</Label>
                <Textarea
                  id="context"
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  rows={5}
                  className="mt-1 font-mono"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader className="animate-spin" /> : `Send to ${agent.name}`}
              </Button>
            </form>
            <AnimatePresence>
              {response && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <HolographicCard className="mt-4">
                    <h4 className="font-heading text-2xl flex items-center text-primary">
                      <Sparkles className="mr-2" /> Agent Response
                    </h4>
                    <pre className="mt-2 bg-muted/50 p-4 rounded-md text-sm whitespace-pre-wrap font-mono">
                      {JSON.stringify(response, null, 2)}
                    </pre>
                  </HolographicCard>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
