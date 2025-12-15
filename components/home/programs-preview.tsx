import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Cpu, Code, Wifi, Shield, ArrowRight } from "lucide-react"

const programs = [
  {
    icon: Cpu,
    title: "Robotics Program",
    description: "LEGO Robotics, Arduino, and Drone building for hands-on engineering experience.",
    popular: true,
  },
  {
    icon: Code,
    title: "AI & Coding",
    description: "Python programming, machine learning basics, and AI-powered game development.",
    popular: false,
  },
  {
    icon: Wifi,
    title: "IoT & Smart Devices",
    description: "Build smart home kits, wearables, and explore Raspberry Pi projects.",
    popular: false,
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Ethical hacking basics, digital safety, and online security fundamentals.",
    popular: false,
  },
]

export function ProgramsPreview() {
  return (
    <section className="bg-gradient-to-b from-[#f0f7ff] to-[#e8f4ff] py-16 sm:py-24 md:py-28 lg:py-36">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-12 md:mb-16 flex flex-col items-center justify-between gap-4 sm:gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <h2 className="mb-2 text-2xl sm:text-[2rem] md:text-[2.5rem] font-semibold text-[#0A1B2A]">Our Programs</h2>
            <p className="text-base sm:text-lg text-[#4A6382]">Comprehensive STEM education for every age group</p>
          </div>
          <Button
            variant="outline"
            className="rounded-full border-[#276EF1]/20 bg-white px-5 sm:px-6 text-[#276EF1] hover:bg-[#276EF1] hover:text-white"
            asChild
          >
            <Link href="/programs">
              View All Programs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program, index) => (
            <Link
              key={index}
              href="/programs"
              className="premium-card group flex flex-col overflow-hidden rounded-xl sm:rounded-2xl border border-border/50 bg-white"
            >
              <div className="bg-gradient-to-br from-[#276EF1]/5 to-[#37D2C5]/5 p-5 sm:p-6 relative">
                {program.popular && (
                  <span className="absolute top-3 sm:top-4 right-3 sm:right-4 rounded-full bg-[#FFC947]/20 px-2 sm:px-2.5 py-1 text-[10px] sm:text-xs font-medium text-[#0A1B2A]">
                    Popular
                  </span>
                )}
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-white text-[#276EF1] shadow-sm">
                  <program.icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.5} />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="mb-2 text-base sm:text-lg font-semibold text-[#0A1B2A] group-hover:text-[#276EF1] transition-colors">
                  {program.title}
                </h3>
                <p className="mb-4 sm:mb-5 flex-1 text-sm leading-relaxed text-[#4A6382]">{program.description}</p>
                <span className="inline-flex items-center rounded-full bg-[#276EF1]/10 px-3 sm:px-4 py-2 text-sm font-medium text-[#276EF1] transition-colors group-hover:bg-[#276EF1] group-hover:text-white">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
