"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, MapPin, X, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import { EventRegistrationModal } from "./event-registration-modal"

interface Event {
  id: string
  title: string
  description: string
  date: string
  location: string
  image_url: string | null
  amount: number
}

interface Banner {
  id: string
  title: string
  image_url: string
}

export function Hero() {
  const [events, setEvents] = useState<Event[]>([])
  const [banners, setBanners] = useState<Banner[]>([])
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
  const [showBanner, setShowBanner] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch("/api/events")
      .then(res => res.json())
      .then(data => {
        console.log('Events loaded in hero:', data)
        setEvents(data || [])
      })
      .catch(err => console.error('Failed to load events:', err))

    setIsLoading(true)
    fetch("/api/banners")
      .then(res => {
        console.log('Banner response status:', res.status)
        return res.json()
      })
      .then(data => {
        console.log('Banners loaded:', data)
        console.log('Number of banners:', data?.length || 0)
        if (data && data.length > 0) {
          console.log('First banner:', data[0])
          setBanners(data)
        } else {
          console.warn('No banners found in response')
          setBanners([])
        }
        setIsLoading(false)
      })
      .catch(err => {
        console.error('Failed to load banners:', err)
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentBannerIndex((prev) => (prev + 1) % banners.length)
      }, 5000) // Change this value to adjust rotation speed (in milliseconds)
      return () => clearInterval(interval)
    }
  }, [banners.length])

  const handleRegister = (event: Event) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  const nextBanner = () => {
    setCurrentBannerIndex((prev) => (prev + 1) % banners.length)
  }

  const prevBanner = () => {
    setCurrentBannerIndex((prev) => (prev - 1 + banners.length) % banners.length)
  }

  return (
    <>
      {/* Scrolling Event Banner */}
      {showBanner && events.length > 0 && (
        <div className="relative bg-gradient-to-r from-[#276EF1] to-[#37D2C5] text-white overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="relative h-16 flex items-center">
              {/* Scrolling content */}
              <div className="absolute inset-0 flex items-center overflow-hidden">
                <div className="flex items-center gap-8 animate-scroll-left whitespace-nowrap">
                  {[...events, ...events, ...events].map((event, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                        Upcoming Event
                      </span>
                      <span className="font-semibold">{event.title}</span>
                      <span className="flex items-center gap-1 text-sm">
                        <Calendar className="w-3 h-3" />
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1 text-sm">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </span>
                      <button
                        onClick={() => handleRegister(event)}
                        className="bg-white text-[#276EF1] px-4 py-1 rounded-full text-sm font-medium hover:bg-white/90 transition-colors"
                      >
                        Register Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={() => setShowBanner(false)}
                className="absolute right-4 z-10 p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#f0f7ff] to-[#e8f4ff] overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left space-y-6 sm:space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white shadow-sm border border-border/50">
                <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-[#276EF1]/10">
                  <svg
                    className="h-3 w-3 sm:h-4 sm:w-4 text-[#276EF1]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm font-medium text-[#0A1B2A]">
                  C LABS STEM ACADEMICS - Classes 3 to 9
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-[#0A1B2A]">
                Year-Long STEM Academic Excellence
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-[#4A6382] max-w-[600px] mx-auto lg:mx-0">
                Comprehensive year-long academic course with specially designed academic books for each standard from Class 3 to Class 9. Build strong STEM foundations with C LABS innovative curriculum.
              </p>

              {/* Call to Action */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
                <Button 
                  variant="default" 
                  size="lg" 
                  className="flex items-center gap-2"
                  onClick={() => window.open("/contact", "_self")}
                >
                  <span>Enroll Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="flex items-center gap-2"
                  onClick={() => window.open("/contact", "_self")}
                >
                  <span>Contact Us</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Right Content - School Banner Slideshow */}
            <div className="flex-1 w-full relative">
              {isLoading ? (
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#276EF1]/10 to-[#37D2C5]/10 flex items-center justify-center">
                  <div className="text-center p-6">
                    <p className="text-gray-500">Loading banners...</p>
                  </div>
                </div>
              ) : banners.length > 0 ? (
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  {/* Banner Image */}
                  <img
                    src={banners[currentBannerIndex]?.image_url || ''}
                    alt={banners[currentBannerIndex]?.title || 'School banner'}
                    className="w-full h-full object-cover transition-opacity duration-500"
                    onError={(e) => {
                      console.error('Image failed to load:', banners[currentBannerIndex]?.image_url)
                      const img = e.target as HTMLImageElement
                      img.style.display = 'none'
                    }}
                  />

                  {/* School Name Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                    <p className="text-white font-semibold text-lg">
                      {banners[currentBannerIndex]?.title}
                    </p>
                  </div>

                  {/* Navigation Arrows */}
                  {banners.length > 1 && (
                    <>
                      <button
                        onClick={prevBanner}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-all shadow-lg"
                      >
                        <ChevronLeft className="w-6 h-6 text-gray-800" />
                      </button>
                      <button
                        onClick={nextBanner}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-all shadow-lg"
                      >
                        <ChevronRight className="w-6 h-6 text-gray-800" />
                      </button>

                      {/* Dots Indicator */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {banners.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentBannerIndex(index)}
                            className={`h-2 rounded-full transition-all ${
                              index === currentBannerIndex
                                ? 'w-8 bg-white'
                                : 'w-2 bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#276EF1]/10 to-[#37D2C5]/10 flex items-center justify-center border-2 border-dashed border-[#276EF1]/20">
                  <div className="text-center p-6">
                    <p className="text-gray-500 mb-2">No banners uploaded yet</p>
                    <p className="text-sm text-gray-400">Upload school banners from the admin panel</p>
                    <p className="text-xs text-gray-300 mt-2">Check browser console for details</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      {selectedEvent && (
        <EventRegistrationModal
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedEvent(null)
          }}
        />
      )}
    </>
  )
}