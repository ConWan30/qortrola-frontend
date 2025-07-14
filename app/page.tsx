import { HeroSection } from "@/components/home/hero-section"
import { FeaturesSection } from "@/components/home/features-section"
import { CtaSection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center space-y-24 md:space-y-32">
      <HeroSection />
      <FeaturesSection />
      <CtaSection />
    </div>
  )
}
