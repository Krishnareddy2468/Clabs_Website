"use client"

import { useEffect, useState, useRef } from "react"
import { Users, GraduationCap, Award, BookOpen } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: 15000,
    suffix: "+",
    label: "Students Trained",
  },
  {
    icon: GraduationCap,
    value: 200,
    suffix: "+",
    label: "Partner Schools",
  },
  {
    icon: Award,
    value: 50,
    suffix: "+",
    label: "Expert Mentors",
  },
  {
    icon: BookOpen,
    value: 25,
    suffix: "+",
    label: "Programs Offered",
  },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible, value])

  return (
    <div ref={ref} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0A1B2A]">
      {count.toLocaleString()}
      {suffix}
    </div>
  )
}

export function StatsSection() {
  return (
    <section className="border-y border-border/50 bg-white py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#f8fbff] to-white p-4 sm:p-6 md:p-8 text-center shadow-sm border border-border/50"
            >
              <div className="mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-[#276EF1]/10 text-[#276EF1]">
                <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" strokeWidth={1.5} />
              </div>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <span className="mt-1.5 sm:mt-2 text-xs sm:text-sm font-medium text-[#4A6382]">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
