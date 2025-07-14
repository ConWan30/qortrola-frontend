import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { HolographicCard } from "../ui/holographic-card"

export function CtaSection() {
  return (
    <section className="container mx-auto py-24 px-4 sm:px-6 lg:px-8">
      <HolographicCard className="text-center hover:shadow-neon-secondary transition-shadow duration-500">
        <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-wider">Begin Your Masterpiece</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground font-sans">
          Join the forefront of gaming innovation. Get your API key and start building the future today.
        </p>
        <div className="mt-8">
          <Button asChild size="lg" className="group">
            <Link href="/developers">
              Get Started for Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </HolographicCard>
    </section>
  )
}
