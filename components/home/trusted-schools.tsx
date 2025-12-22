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
      <section className="py-12 bg-white border-y">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-[#276EF1] border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </section>
    )
  }

  if (schools.length === 0) {
    return null
  }

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-white to-gray-50 border-y">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0A1B2A] mb-2">
            Trusted by Leading Schools
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Partnering with {schools.length}+ schools across India
          </p>
        </div>

        {/* Scrolling logos */}
        <div className="relative overflow-hidden">
          <div className="flex items-center gap-8 sm:gap-12 animate-scroll-logos">
            {[...schools, ...schools, ...schools].map((school, index) => (
              <div
                key={`${school.id}-${index}`}
                className="flex-shrink-0 flex flex-col items-center justify-center bg-white rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 min-w-[120px] sm:min-w-[150px] h-[140px] sm:h-[160px]"
              >
                {school.logo_url ? (
                  <img
                    src={school.logo_url}
                    alt={school.name}
                    className="h-16 sm:h-20 w-auto object-contain mb-2"
                  />
                ) : (
                  <Building2 className="h-16 sm:h-20 w-16 sm:w-20 text-gray-300 mb-2" />
                )}
                <p className="text-xs sm:text-sm text-gray-600 text-center font-medium line-clamp-2">
                  {school.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-[#276EF1]">22+</p>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">Partner Schools</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-[#37D2C5]">5,000+</p>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">Students Enrolled</p>
          </div>
          <div className="text-center">
            <p className="text-2xl sm:text-3xl font-bold text-[#FFC947]">98%</p>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </section>
  )
}
