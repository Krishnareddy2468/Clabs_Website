import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Cpu, Sparkles, Shield } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f0f7ff] to-[#e8f4ff] py-16 sm:py-24 md:py-28 lg:py-40">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Circular glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] sm:h-[500px] md:h-[600px] w-[400px] sm:w-[500px] md:w-[600px] rounded-full bg-gradient-to-br from-[#276EF1]/10 to-[#37D2C5]/10 blur-3xl" />

        <div className="hidden sm:block absolute left-[12%] top-[25%] animate-float">
          <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl bg-white/80 text-[#276EF1] shadow-lg shadow-primary/10 backdrop-blur-sm">
            <Cpu className="h-6 w-6 md:h-7 md:w-7" />
          </div>
        </div>
        <div className="hidden sm:block absolute right-[12%] top-[30%] animate-float animate-delay-200">
          <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-white/80 text-[#37D2C5] shadow-lg shadow-secondary/10 backdrop-blur-sm">
            <Shield className="h-5 w-5 md:h-6 md:w-6" />
          </div>
        </div>
        <div className="hidden md:block absolute bottom-[30%] left-[8%] animate-float animate-delay-400">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 text-[#FFC947] shadow-lg shadow-accent/10 backdrop-blur-sm">
            <Sparkles className="h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-[#276EF1] shadow-sm backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>India's Leading FutureTech Learning Platform</span>
          </div>

          <h1 className="mb-6 sm:mb-8 text-balance text-[2rem] sm:text-[2.5rem] md:text-[3.25rem] lg:text-[4rem] font-bold leading-[1.15] sm:leading-[1.1] tracking-tight text-[#0A1B2A]">
            Empowering Children With{" "}
            <span className="bg-gradient-to-r from-[#276EF1] to-[#37D2C5] bg-clip-text text-transparent">
              Future-Ready Skills
            </span>
          </h1>

          <p className="mx-auto mb-8 sm:mb-12 max-w-2xl text-pretty text-base sm:text-lg md:text-xl leading-relaxed text-[#4A6382] px-2 sm:px-0">
            Hands-on learning in Robotics, Coding, AI, IoT & Cybersecurity. Prepare your child for tomorrow's world with
            innovative STEM education.
          </p>

          <div className="flex items-center justify-center">
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-full bg-gradient-to-r from-[#276EF1] to-[#37D2C5] px-8 sm:px-10 py-5 sm:py-6 text-base font-semibold text-white shadow-xl shadow-primary/25 transition-all hover:shadow-2xl hover:shadow-primary/30 btn-shimmer"
              asChild
            >
              <Link href="/programs">Explore Programs</Link>
            </Button>
          </div>
        </div>

        {/* Hero Image with circular glow */}
        <div className="mx-auto mt-12 sm:mt-16 md:mt-20 max-w-5xl px-2 sm:px-0">
          <div className="relative">
            <div className="absolute -inset-2 sm:-inset-4 rounded-2xl sm:rounded-[2rem] bg-gradient-to-br from-[#276EF1]/20 to-[#37D2C5]/20 blur-xl sm:blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl sm:rounded-[2rem] border border-white/50 bg-white shadow-2xl shadow-primary/10">
              <img
                src="/children-learning-robotics-coding-in-modern-classr.jpg"
                alt="Students learning robotics and coding at CLABS"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
