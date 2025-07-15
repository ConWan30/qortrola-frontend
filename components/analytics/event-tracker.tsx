"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { HolographicCard } from "../ui/holographic-card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader, Zap } from "lucide-react"
import { Textarea } from "../ui/textarea"

const formSchema = z.object({
  player_id: z.string().min(1, "Player ID is required"),
  event_type: z.string().min(3, "Event type is required"),
  metadata: z.string().refine(
    (val) => {
      try {
        JSON.parse(val)
        return true
      } catch {
        return false
      }
    },
    { message: "Metadata must be valid JSON" },
  ),
})

type FormValues = z.infer<typeof formSchema>

export function EventTracker() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { metadata: `{ "level": "dungeon_01" }` },
  })

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    try {
      const response = await fetch("https://qortrola-api-production.up.railway.app/api/v1/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, metadata: JSON.parse(data.metadata) }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.detail || "Failed to track event")
      toast({
        title: "Event Tracked!",
        description: `Qor Points: ${result.qor_points}, Survey Eligible: ${result.survey_eligible}`,
      })
      reset()
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <HolographicCard className="hover:shadow-neon-secondary transition-shadow duration-300">
      <h3 className="font-heading text-3xl uppercase flex items-center">
        <Zap className="mr-3" /> Track Event
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4 font-sans">
        <div>
          <Label htmlFor="player_id">Player ID</Label>
          <Input id="player_id" {...register("player_id")} className="mt-1" />
          {errors.player_id && <p className="text-sm text-destructive mt-1">{errors.player_id.message}</p>}
        </div>
        <div>
          <Label htmlFor="event_type">Event Type</Label>
          <Input id="event_type" {...register("event_type")} placeholder="e.g., level_complete" className="mt-1" />
          {errors.event_type && <p className="text-sm text-destructive mt-1">{errors.event_type.message}</p>}
        </div>
        <div>
          <Label htmlFor="metadata">Metadata (JSON)</Label>
          <Textarea id="metadata" {...register("metadata")} className="mt-1 font-mono" rows={3} />
          {errors.metadata && <p className="text-sm text-destructive mt-1">{errors.metadata.message}</p>}
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <Loader className="animate-spin" /> : "Track"}
        </Button>
      </form>
    </HolographicCard>
  )
}
