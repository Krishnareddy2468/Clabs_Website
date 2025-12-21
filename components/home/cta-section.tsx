import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative py-16 sm:py-24 md:py-28 lg:py-36">
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-full h-10 sm:h-12 md:h-16" preserveAspectRatio="none" viewBox="0 0 1200 120">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="white"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#276EF1] to-[#37D2C5] p-6 sm:p-10 md:p-12 lg:p-20 text-center">
          {/* Decorative circles - hidden on mobile */}
          <div className="hidden sm:block absolute -left-16 -top-16 h-32 sm:h-48 w-32 sm:w-48 rounded-full bg-white/10" />
          <div className="hidden sm:block absolute -bottom-20 -right-20 h-48 sm:h-64 w-48 sm:w-64 rounded-full bg-white/10" />
          <div className="hidden md:block absolute top-1/2 left-1/4 h-32 w-32 rounded-full bg-white/5" />

          <div className="relative">
            <h2 className="mb-4 sm:mb-5 text-xl sm:text-2xl md:text-3xl lg:text-[2.75rem] font-bold text-white leading-tight">
              Ready to Excel in STEM Academics?
            </h2>
            <p className="mx-auto mb-6 sm:mb-8 md:mb-10 max-w-xl text-sm sm:text-base md:text-lg text-white/80">
              Enroll your child in our year-long STEM academic program for Classes 3-9. Comprehensive curriculum with specially designed academic books for each standard.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 sm:flex-row">
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-full bg-white px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold text-[#276EF1] shadow-lg hover:bg-white/90 btn-shimmer"
                asChild
              >
                <Link href="/contact">
                  Enroll Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto rounded-full border-2 border-white/30 bg-transparent px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold text-white hover:bg-white/10"
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
