"use client"

import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion } from "framer-motion"

import { HolographicCard } from "@/components/ui/holographic-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader, Copy, Check } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  developer_name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  plan: z.enum(["starter", "professional", "enterprise"]),
})

type FormValues = z.infer<typeof formSchema>

interface ApiResponse {
  message: string
  api_key: string
  developer_id: string
}

export default function DevelopersPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { plan: "starter" },
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true)
    try {
      const response = await fetch("https://qortrola-api.onrender.com/api/v1/developers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.detail || "An error occurred")
      }

      setApiResponse(result)
      setIsModalOpen(true)
      toast({
        title: "Registration Successful!",
        description: "Your API key is ready.",
      })
      reset()
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error.message || "Failed to register. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    if (apiResponse?.api_key) {
      navigator.clipboard.writeText(apiResponse.api_key)
      setIsCopied(true)
      toast({ title: "API Key Copied!" })
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  return (
    <>
      <div className="container mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-wider">Developer Portal</h1>
            <p className="mt-4 text-lg text-muted-foreground font-sans">
              Get your API key and start integrating Qortrola's powerful features into your game.
            </p>
          </div>

          <HolographicCard
            className="mt-12 hover:shadow-neon-primary transition-shadow duration-300"
            motionProps={{
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
              transition: { delay: 0.2 },
            }}
          >
            <h2 className="text-4xl font-bold text-center uppercase tracking-wide">Register for an API Key</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6 font-sans">
              <div>
                <Label htmlFor="developer_name">Developer/Studio Name</Label>
                <Input id="developer_name" {...register("developer_name")} className="mt-2" />
                {errors.developer_name && (
                  <p className="text-sm text-destructive mt-1">{errors.developer_name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" {...register("email")} className="mt-2" />
                {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="plan">Choose Your Plan</Label>
                <Select onValueChange={(value) => (control._formValues.plan = value as any)} defaultValue="starter">
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="starter">Starter (Free)</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader className="animate-spin" /> : "Generate API Key"}
              </Button>
            </form>
          </HolographicCard>
        </motion.div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="holographic-border bg-card/80 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="font-heading text-4xl text-primary uppercase tracking-wide">
              Registration Successful!
            </DialogTitle>
            <DialogDescription className="font-sans">
              Your API key is ready. Store it securely, as it will not be shown again.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4 font-sans">
            <div>
              <Label>Developer ID</Label>
              <p className="text-sm text-muted-foreground">{apiResponse?.developer_id}</p>
            </div>
            <div>
              <Label>Your API Key</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Input readOnly value={apiResponse?.api_key} className="font-mono" />
                <Button variant="ghost" size="icon" onClick={handleCopy}>
                  {isCopied ? <Check className="text-green-400" /> : <Copy />}
                </Button>
              </div>
            </div>
            <Button className="w-full" onClick={() => setIsModalOpen(false)}>
              Got it, thanks!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
