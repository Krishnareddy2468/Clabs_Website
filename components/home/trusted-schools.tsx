"use client"

import { GraduationCap } from "lucide-react"
import { useEffect, useState } from "react"

interface School {
  id: string
  name: string
  logo_url: string | null
}

export function TrustedSchools() {
  const [schools, setSchools] = useState<School[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSchools()
  }, [])

  const fetchSchools = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/schools")
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Loaded schools:', data)
      setSchools(data || [])
      setError(null)
    } catch (err) {
      console.error('Failed to load schools:', err)
      setError('Failed to load schools')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="bg-[#f5f8fc] py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-[#4A6382]">Loading schools...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="bg-[#f5f8fc] py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  if (schools.length === 0) {
    return (
      <section className="bg-[#f5f8fc] py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-[2rem] md:text-[2.5rem] font-semibold text-[#0A1B2A] mb-2 sm:mb-3">
              Trusted by Schools
            </h2>
            <p className="text-base sm:text-lg text-[#4A6382]">
              Add schools from the admin panel to display them here
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-[#f5f8fc] py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-[2rem] md:text-[2.5rem] font-semibold text-[#0A1B2A] mb-2 sm:mb-3">
            Trusted by Schools
          </h2>
          <p className="text-base sm:text-lg text-[#4A6382]">
            Partnering with leading educational institutions across India
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
          {schools.map((school) => (
            <div
              key={school.id}
              className="flex items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl bg-white px-3 sm:px-4 md:px-6 py-3 sm:py-4 shadow-sm border border-border/50"
              title={school.name}
            >
              {school.logo_url ? (
                <img 
                  src={school.logo_url} 
                  alt={school.name}
                  className="h-8 w-8 sm:h-10 sm:w-10 object-contain shrink-0"
                />
              ) : (
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-[#276EF1]/10 text-[#276EF1] shrink-0">
                  <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} />
                </div>
              )}
              <span className="text-xs sm:text-sm font-medium text-[#0A1B2A] line-clamp-2">{school.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
