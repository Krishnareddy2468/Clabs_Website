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
        setEvents(Array.isArray(data) ? data : [])
      })
      .catch(err => console.error('Failed to load events:', err))

    setIsLoading(true)
    fetch("/api/banners")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const validBanners = data.filter(banner => 
            banner && banner.image_url && banner.image_url.trim() !== ''
          )
          setBanners(validBanners)
        } else {
          setBanners([])
        }
        setIsLoading(false)
      })
      .catch(err => {
        console.error('Failed to load banners:', err)
        setBanners([])
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentBannerIndex((prev) => (prev + 1) % banners.length)
      }, 5000)
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

  const goToBanner = (index: number) => {
    setCurrentBannerIndex(index)
  }

  return (
    <>
      {/* Scrolling Event Banner - Vibrant Colors */}
      {showBanner && events.length > 0 && (
        <div className="relative bg-gradient-to-r from-violet-600 via-fuchsia-500 to-rose-500 text-white overflow-hidden shadow-xl shadow-fuchsia-500/20">
          <div className="container mx-auto px-4 relative">
            <div className="relative h-14 sm:h-16 flex items-center">
              {/* Scrolling content with improved animation */}
              <div className="absolute inset-0 flex items-center overflow-hidden">
                <div className="flex items-center gap-12 sm:gap-16 animate-marquee whitespace-nowrap">
                  {[...events, ...events, ...events, ...events].map((event, index) => (
                    <div key={index} className="flex items-center gap-3 sm:gap-4">
                      <span className="bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1 rounded-full text-xs sm:text-sm font-bold text-slate-900 shadow-lg animate-bounce">
                        Upcoming
                      </span>
                      <button 
                        onClick={() => handleRegister(event)}
                        className="font-bold text-sm sm:text-base bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border-2 border-white/40 hover:bg-white/30 hover:border-white/60 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer hover:scale-105"
                      >
                        ✨ {event.title} <ArrowRight className="w-4 h-4 animate-pulse" />
                      </button>
                      <span className="flex items-center gap-1.5 text-xs sm:text-sm bg-white/10 px-2 py-1 rounded-full">
                        <Calendar className="w-3 h-3" />
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs sm:text-sm bg-white/10 px-2 py-1 rounded-full">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </span>
                      <button
                        onClick={() => handleRegister(event)}
                        className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 px-5 py-2 rounded-full text-xs sm:text-sm font-bold hover:from-emerald-300 hover:to-cyan-300 transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:scale-110 animate-pulse"
                      >
                        🎯 Register Now
                      </button>
                      <span className="text-white/30 text-2xl">•</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={() => setShowBanner(false)}
                className="absolute right-2 sm:right-4 z-10 p-1.5 hover:bg-white/20 rounded-full transition-colors bg-white/10 backdrop-blur-sm"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#f0f7ff] to-[#e8f4ff] overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left space-y-5 sm:space-y-6 lg:max-w-md">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-white shadow-sm border border-border/50">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#276EF1]/10">
                  <svg
                    className="h-3 w-3 text-[#276EF1]"
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
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-[#0A1B2A]">
                Year-Long STEM Academic Excellence
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base lg:text-lg text-[#4A6382]">
                Comprehensive year-long academic course with specially designed academic books for each standard from Class 3 to Class 9.
              </p>

              {/* Call to Action */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
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

            {/* Right Content - School Banner Slideshow (Exact Banner Size) */}
            <div className="flex-[1.5] w-full">
              {isLoading ? (
                <div className="rounded-2xl bg-gradient-to-br from-[#276EF1]/10 to-[#37D2C5]/10 flex items-center justify-center h-[400px] sm:h-[500px] lg:h-[550px]">
                  <div className="text-center p-6">
                    <div className="w-10 h-10 border-4 border-[#276EF1] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-gray-500">Loading...</p>
                  </div>
                </div>
              ) : banners.length > 0 ? (
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-b from-gray-50 to-gray-100 h-[400px] sm:h-[500px] lg:h-[550px]">
                  {/* Banner Images - Responsive sizing */}
                  {banners.map((banner, index) => (
                    <div
                      key={banner.id}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                        index === currentBannerIndex 
                          ? 'opacity-100 z-10 scale-100' 
                          : 'opacity-0 z-0 scale-105'
                      }`}
                    >
                      <img
                        src={banner.image_url}
                        alt={banner.title}
                        className="w-full h-full object-cover sm:object-contain banner-image-mobile"
                      />
                    </div>
                  ))}

                  {/* Navigation Arrows */}
                  {banners.length > 1 && (
                    <>
                      <button
                        onClick={prevBanner}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/95 hover:bg-white rounded-full p-2.5 transition-all shadow-xl hover:scale-110 active:scale-95 border border-gray-200"
                        aria-label="Previous banner"
                      >
                        <ChevronLeft className="w-5 h-5 text-gray-800" />
                      </button>
                      <button
                        onClick={nextBanner}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/95 hover:bg-white rounded-full p-2.5 transition-all shadow-xl hover:scale-110 active:scale-95 border border-gray-200"
                        aria-label="Next banner"
                      >
                        <ChevronRight className="w-5 h-5 text-gray-800" />
                      </button>

                      {/* Dots Indicator */}
                      <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-0.5 sm:gap-1.5 bg-white/90 backdrop-blur-sm px-1.5 sm:px-3 py-0.5 sm:py-1.5 rounded-full shadow-lg scale-75 sm:scale-100">
                        {banners.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToBanner(index)}
                            className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 ${
                              index === currentBannerIndex
                                ? 'w-3 sm:w-6 bg-[#276EF1]'
                                : 'w-1 sm:w-1.5 bg-gray-400 hover:bg-gray-600'
                            }`}
                            aria-label={`Go to banner ${index + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Banner Counter */}
                  {banners.length > 1 && (
                    <div className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-sm text-gray-800 text-xs px-3 py-1 rounded-full font-semibold shadow-lg border border-gray-200">
                      {currentBannerIndex + 1} / {banners.length}
                    </div>
                  )}
                </div>
              ) : (
                <div className="rounded-2xl bg-gradient-to-br from-[#276EF1]/10 to-[#37D2C5]/10 flex items-center justify-center border-2 border-dashed border-[#276EF1]/20 h-[400px] sm:h-[500px] lg:h-[550px]">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-[#276EF1]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-[#276EF1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-600 font-semibold text-lg mb-2">No school banners yet</p>
                    <p className="text-sm text-gray-400">Add banners from admin panel</p>
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