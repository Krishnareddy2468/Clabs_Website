import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/home/hero"
import { TrustedSchools } from "@/components/home/trusted-schools"
import { FeaturesSection } from "@/components/home/features-section"
import { ProgramsPreview } from "@/components/home/programs-preview"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { TeamSection } from "@/components/home/team-section"
import { CTASection } from "@/components/home/cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <TrustedSchools />
      <FeaturesSection />
      <ProgramsPreview />
      <TestimonialsSection />
      <TeamSection />
      <CTASection />
      <Footer />
    </main>
  )
}
