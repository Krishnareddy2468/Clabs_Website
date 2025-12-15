import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Cpu, Code, Wifi, Shield, FlaskConical, ArrowRight, Check } from "lucide-react"

const programs = [
  {
    id: "robotics",
    icon: Cpu,
    title: "Robotics Program",
    subtitle: "Build, Code, Innovate",
    description:
      "Dive into the exciting world of robotics with hands-on projects using LEGO Robotics, Arduino, and Drones. Students learn mechanical design, programming logic, and problem-solving through building real robots.",
    features: [
      "LEGO Mindstorms & WeDo kits",
      "Arduino programming basics",
      "Drone assembly & flight control",
      "Robotics competitions prep",
      "3D printing for custom parts",
    ],
    grades: "Grade 1-12",
  },
  {
    id: "ai-coding",
    icon: Code,
    title: "AI & Coding",
    subtitle: "Code the Future",
    description:
      "Learn the languages of the future with Python, machine learning basics, and AI-powered game development. From block-based coding for beginners to advanced programming for teens.",
    features: [
      "Scratch & block-based coding",
      "Python programming fundamentals",
      "Machine learning concepts",
      "AI game development",
      "Web development basics",
    ],
    grades: "Grade 3-12",
  },
  {
    id: "iot",
    icon: Wifi,
    title: "IoT & Smart Devices",
    subtitle: "Connect Everything",
    description:
      "Explore the Internet of Things by building smart home kits, wearables, and Raspberry Pi projects. Understand how connected devices are transforming our world.",
    features: [
      "Smart home automation projects",
      "Wearable technology creation",
      "Raspberry Pi programming",
      "Sensor integration",
      "Cloud connectivity basics",
    ],
    grades: "Grade 5-12",
  },
  {
    id: "cybersecurity",
    icon: Shield,
    title: "Cybersecurity for Kids",
    subtitle: "Stay Safe Online",
    description:
      "Learn ethical hacking basics, digital safety, and online security fundamentals. Empower students to protect themselves and understand the importance of cybersecurity.",
    features: [
      "Digital safety awareness",
      "Password security & encryption",
      "Ethical hacking introduction",
      "Network security basics",
      "Safe social media practices",
    ],
    grades: "Grade 4-12",
  },
  {
    id: "innovation-lab",
    icon: FlaskConical,
    title: "STEM Innovation Lab",
    subtitle: "Create & Experiment",
    description:
      "Access state-of-the-art equipment for prototype building, science fair preparation, and advanced STEM experiments. Perfect for students who want to take their projects to the next level.",
    features: [
      "3D printing & design",
      "Science fair project support",
      "Advanced electronics",
      "Prototype development",
      "Mentorship from industry experts",
    ],
    grades: "Grade 6-12",
  },
]

export default function ProgramsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#f0f7ff] to-[#e8f4ff] py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 text-center lg:px-8">
            <h1 className="mb-4 sm:mb-6 text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-bold text-[#0A1B2A]">
              Our Programs
            </h1>
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-[#4A6382]">
              Comprehensive STEM education designed for every age and skill level. Choose the perfect program for your
              child.
            </p>
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:gap-8">
              {programs.map((program, index) => (
                <div
                  key={program.id}
                  id={program.id}
                  className="premium-card overflow-hidden rounded-xl sm:rounded-2xl border border-border/50 bg-white"
                >
                  <div className="grid grid-cols-1 md:grid-cols-5">
                    {/* Program Header */}
                    <div className="bg-gradient-to-br from-[#276EF1] to-[#37D2C5] p-6 sm:p-8 md:col-span-2 md:p-10 relative">
                      {index === 0 && (
                        <span className="absolute top-4 sm:top-6 right-4 sm:right-6 rounded-full bg-white/20 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-medium text-white">
                          Most Popular
                        </span>
                      )}
                      <div className="mb-4 sm:mb-6 flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-xl sm:rounded-2xl bg-white/20 text-white backdrop-blur-sm">
                        <program.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" strokeWidth={1.5} />
                      </div>
                      <h2 className="mb-2 text-xl sm:text-2xl md:text-3xl font-bold text-white">{program.title}</h2>
                      <p className="mb-4 sm:mb-5 text-base sm:text-lg text-white/80">{program.subtitle}</p>
                      <span className="inline-block rounded-full bg-white/20 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-white">
                        {program.grades}
                      </span>
                    </div>

                    {/* Program Details */}
                    <div className="p-6 sm:p-8 md:col-span-3 md:p-10">
                      <p className="mb-5 sm:mb-6 text-sm sm:text-base text-[#4A6382] leading-relaxed">
                        {program.description}
                      </p>
                      <h3 className="mb-3 sm:mb-4 text-sm sm:text-base font-semibold text-[#0A1B2A]">
                        What You'll Learn:
                      </h3>
                      <ul className="mb-6 sm:mb-8 grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2">
                        {program.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-[#4A6382]">
                            <div className="flex h-4 w-4 sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-full bg-[#37D2C5]/10">
                              <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#37D2C5]" />
                            </div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="w-full sm:w-auto rounded-full bg-gradient-to-r from-[#276EF1] to-[#37D2C5] px-6 text-white shadow-lg shadow-primary/20 btn-shimmer"
                        asChild
                      >
                        <Link href="/contact">
                          Enroll Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-b from-[#f0f7ff] to-[#e8f4ff] py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 text-center lg:px-8">
            <h2 className="mb-4 sm:mb-5 text-2xl sm:text-[2rem] md:text-[2.5rem] font-semibold text-[#0A1B2A]">
              Not Sure Which Program is Right?
            </h2>
            <p className="mx-auto mb-8 sm:mb-10 max-w-xl text-base sm:text-lg text-[#4A6382]">
              Our education counselors can help you find the perfect program based on your child's age, interests, and
              goals.
            </p>
            <Button
              size="lg"
              className="w-full sm:w-auto rounded-full bg-gradient-to-r from-[#276EF1] to-[#37D2C5] px-8 sm:px-10 py-5 sm:py-6 text-base font-semibold text-white shadow-xl shadow-primary/25 btn-shimmer"
              asChild
            >
              <Link href="/contact">Schedule a Free Consultation</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
