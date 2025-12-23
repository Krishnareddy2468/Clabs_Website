import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative py-16 sm:py-24 md:py-28 lg:py-36 bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-700/50 border border-slate-600/50 p-6 sm:p-10 md:p-12 lg:p-20 text-center">
          {/* Decorative circles - hidden on mobile */}
          <div className="hidden sm:block absolute -left-16 -top-16 h-32 sm:h-48 w-32 sm:w-48 rounded-full bg-indigo-500/10" />
          <div className="hidden sm:block absolute -bottom-20 -right-20 h-48 sm:h-64 w-48 sm:w-64 rounded-full bg-indigo-500/10" />
          <div className="hidden md:block absolute top-1/2 left-1/4 h-32 w-32 rounded-full bg-indigo-500/5" />

          <div className="relative">
            <h2 className="mb-4 sm:mb-5 text-xl sm:text-2xl md:text-3xl lg:text-[2.75rem] font-bold text-white leading-tight">
               Ready to Excel in STEM Academics?
            </h2>
            <p className="mx-auto mb-6 sm:mb-8 md:mb-10 max-w-xl text-sm sm:text-base md:text-lg text-slate-300">
              Enroll your child in our year-long STEM academic program for Classes 3-9. Comprehensive curriculum with specially designed academic books for each standard.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 sm:flex-row">
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-full bg-indigo-500 px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-bold text-white shadow-lg hover:bg-indigo-400 hover:scale-105 transition-all"
                asChild
              >
                <Link href="/contact">
                  ⭐ Enroll Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto rounded-full border-2 border-slate-500 bg-transparent px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold text-white hover:bg-slate-600/50"
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
