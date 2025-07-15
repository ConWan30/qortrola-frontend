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
import { Loader, UserPlus } from "lucide-react"

const formSchema = z.object({
  player_name: z.string().min(3, "Player name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
})

type FormValues = z.infer<typeof formSchema>

export function PlayerCreator() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(formSchema) })

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    try {
      const response = await fetch("https://qortrola-api-production.up.railway.app/api/v1/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.detail || "Failed to create player")
      toast({
        title: "Player Created!",
        description: `Player ${result.player_name} (ID: ${result.player_id}) is ready.`,
      })
      reset()
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <HolographicCard className="hover:shadow-neon-primary transition-shadow duration-300">
      <h3 className="font-heading text-3xl uppercase flex items-center">
        <UserPlus className="mr-3" /> Create Player
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4 font-sans">
        <div>
          <Label htmlFor="player_name">Player Name</Label>
          <Input id="player_name" {...register("player_name")} className="mt-1" />
          {errors.player_name && <p className="text-sm text-destructive mt-1">{errors.player_name.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} className="mt-1" />
          {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <Loader className="animate-spin" /> : "Create"}
        </Button>
      </form>
    </HolographicCard>
  )
}
