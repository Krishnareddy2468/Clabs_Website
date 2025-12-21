import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { StatsSection } from "@/components/home/stats-section"
import { FeaturesSection } from "@/components/home/features-section"
import { ProgramsPreview } from "@/components/home/programs-preview"
import { TrustedSchools } from "@/components/home/trusted-schools"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { CTASection } from "@/components/home/cta-section"
import { EventsBanner } from "@/components/events-banner"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <EventsBanner />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <ProgramsPreview />
        <TrustedSchools />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
