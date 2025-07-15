"use client"

import { useState, useEffect } from "react"
import { HolographicCard } from "@/components/ui/holographic-card"
import { cn } from "@/lib/utils"

type Status = "loading" | "operational" | "error"

export function ApiStatusCard() {
  const [status, setStatus] = useState<Status>("loading")
  const [apiVersion, setApiVersion] = useState<string | null>(null)

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch("https://qortrola-api.onrender.com/api/v1/health")
        if (response.ok) {
          const data = await response.json()
          if (data.status === "healthy") {
            setStatus("operational")
            setApiVersion(data.version)
          } else {
            setStatus("error")
          }
        } else {
          setStatus("error")
        }
      } catch (error) {
        setStatus("error")
      }
    }

    fetchStatus()
  }, [])

  const getStatusInfo = () => {
    switch (status) {
      case "operational":
        return {
          text: `API v${apiVersion || ""} Operational`,
          color: "text-primary",
          dotColor: "bg-primary animate-pulse",
        }
      case "error":
        return {
          text: "API Systems Disrupted",
          color: "text-destructive",
          dotColor: "bg-destructive",
        }
      case "loading":
      default:
        return {
          text: "Checking API Status...",
          color: "text-muted-foreground",
          dotColor: "bg-muted-foreground animate-pulse",
        }
    }
  }

  const { text, color, dotColor } = getStatusInfo()

  return (
    <HolographicCard className="w-full max-w-xs hover:shadow-neon-primary transition-shadow duration-300">
      <div className="flex items-center justify-center space-x-3 p-0">
        <div className={cn("h-3 w-3 rounded-full", dotColor)} />
        <span className={cn("text-sm font-medium font-sans", color)}>{text}</span>
      </div>
    </HolographicCard>
  )
}
