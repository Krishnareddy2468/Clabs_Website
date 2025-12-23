"use client"

import { useEffect, useState } from "react"
import { Building2 } from "lucide-react"

interface School {
  id: string
  name: string
  logo_url: string | null
  banner_url: string | null
}

export function TrustedSchools() {
  const [schools, setSchools] = useState<School[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch schools directly from Supabase
    fetch("/api/schools")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setSchools(data)
        }
        setIsLoading(false)
      })
      .catch(err => {
        console.error("Failed to load schools:", err)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <section className="py-12 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-y border-purple-500/20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  if (schools.length === 0) {
    return null
  }

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-violet-950 via-fuchsia-900 to-rose-950 border-y border-fuchsia-500/30 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-fuchsia-200 to-rose-200 bg-clip-text text-transparent mb-2">
            ⭐ Trusted by Leading Schools
          </h2>
          <p className="text-fuchsia-200 text-sm sm:text-base">
            Partnering with 22+ schools across India
          </p>
        </div>

        {/* School logos - scrolling animation */}
        <div className="relative">
          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-900 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-900 to-transparent z-10"></div>
          
          <div className="overflow-hidden">
            <div className="flex animate-scroll-logos hover:pause-animation">
              {/* Triple the schools for seamless loop */}
              {[...schools, ...schools, ...schools].map((school, index) => (
                <div
                  key={`${school.id}-${index}`}
                  className="flex-shrink-0 flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 mx-3 border border-purple-500/30 hover:border-cyan-400/50 min-w-[150px] sm:min-w-[200px] h-[150px] sm:h-[170px] hover:scale-105 transition-all duration-300 hover:bg-white/20"
                >
                  {school.logo_url ? (
                    <img
                      src={school.logo_url}
                      alt={school.name}
                      className="h-16 sm:h-20 w-auto object-contain mb-2"
                    />
                  ) : (
                    <Building2 className="h-16 sm:h-20 w-16 sm:w-20 text-purple-300 mb-2" />
                  )}
                  <p className="text-xs sm:text-sm text-white text-center font-medium">
                    {school.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto">
          <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-400/40 hover:scale-105 transition-transform shadow-lg shadow-cyan-500/10">
            <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-300 to-cyan-500 bg-clip-text text-transparent">22+</p>
            <p className="text-xs sm:text-sm text-fuchsia-200 mt-1">Partner Schools</p>
          </div>
          <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-fuchsia-500/20 to-fuchsia-500/5 border border-fuchsia-400/40 hover:scale-105 transition-transform shadow-lg shadow-fuchsia-500/10">
            <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-fuchsia-300 to-rose-400 bg-clip-text text-transparent">5,000+</p>
            <p className="text-xs sm:text-sm text-fuchsia-200 mt-1">Students Enrolled</p>
          </div>
          <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-500/5 border border-amber-400/40 hover:scale-105 transition-transform shadow-lg shadow-amber-500/10">
            <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">98%</p>
            <p className="text-xs sm:text-sm text-fuchsia-200 mt-1">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </section>
  )
}
