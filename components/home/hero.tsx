"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, MapPin, X, ChevronLeft, ChevronRight, MessageSquare, CheckCircle, Clock, Play, Pause, Users } from "lucide-react"
import { useEffect, useState, useCallback } from "react"
import { EventRegistrationModal } from "./event-registration-modal"
import { EventFeedbackModal } from "./event-feedback-modal"

interface Event {
  id: string
  title: string
  description: string
  date: string
  location: string
  image_url: string | null
  amount: number
  total_seats: number
  available_seats: number
  status?: string
}

interface Banner {
  id: string
  title: string
  image_url: string
}

interface GalleryImage {
  id: string
  title: string
  image_url: string
  category: string
}

export function Hero() {
  const [events, setEvents] = useState<Event[]>([])
  const [banners, setBanners] = useState<Banner[]>([])
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
  const [showBanner, setShowBanner] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  // Event slideshow states
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  // Use gallery images from Events category for slideshow
  const slideshowImages = galleryImages.filter(img => img.image_url && img.image_url.trim() !== '')

  useEffect(() => {
    fetch("/api/events")
      .then(res => res.json())
      .then(data => {
        setEvents(Array.isArray(data) ? data : [])
      })
      .catch(err => console.error('Failed to load events:', err))

    // Fetch gallery images from Events category
    fetch("/api/gallery?category=Events")
      .then(res => res.json())
      .then(data => {
        console.log('Gallery images from Events:', data)
        if (Array.isArray(data) && data.length > 0) {
          setGalleryImages(data)
        } else {
          // Fallback: fetch all gallery images if no Events category
          fetch("/api/gallery")
            .then(res => res.json())
            .then(allData => {
              console.log('All gallery images:', allData)
              setGalleryImages(Array.isArray(allData) ? allData : [])
            })
            .catch(err => console.error('Failed to load all gallery images:', err))
        }
      })
      .catch(err => console.error('Failed to load gallery images:', err))

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

  // Auto-advance event slideshow every 6 seconds
  useEffect(() => {
    if (slideshowImages.length <= 1 || isPaused) return
    
    const interval = setInterval(() => {
      setCurrentEventIndex((prev) => (prev + 1) % slideshowImages.length)
    }, 6000)
    
    return () => clearInterval(interval)
  }, [slideshowImages.length, isPaused])

  const handleRegister = (event: Event) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  const handleFeedback = (event: Event) => {
    setSelectedEvent(event)
    setIsFeedbackModalOpen(true)
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

  // Event slideshow navigation
  const nextEvent = useCallback(() => {
    setCurrentEventIndex((prev) => (prev + 1) % slideshowImages.length)
  }, [slideshowImages.length])

  const prevEvent = useCallback(() => {
    setCurrentEventIndex((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length)
  }, [slideshowImages.length])

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextEvent()
    }
    if (touchStart - touchEnd < -75) {
      prevEvent()
    }
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'ongoing':
        return 'from-green-500 to-emerald-600'
      case 'completed':
        return 'from-gray-500 to-gray-600'
      default:
        return 'from-blue-500 to-indigo-600'
    }
  }

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'ongoing':
        return '🔴 Live Now'
      case 'completed':
        return '✓ Completed'
      default:
        return '🎯 Upcoming'
    }
  }

  const currentSlideImage = slideshowImages[currentEventIndex]

  return (
    <>
      {/* Scrolling Event Banner - Red Background - Hidden on mobile */}
      {showBanner && events.length > 0 && (
        <div className="relative bg-red-600 text-white overflow-hidden shadow-xl hidden sm:block">
          <div className="container mx-auto px-4 relative">
            <div className="relative h-14 sm:h-16 flex items-center">
              {/* Scrolling content with improved animation */}
              <div className="absolute inset-0 flex items-center overflow-hidden">
                <div className="flex items-center gap-12 sm:gap-16 animate-marquee whitespace-nowrap">
                  {[...events, ...events, ...events, ...events].map((event, index) => (
                    <div key={index} className="flex items-center gap-3 sm:gap-4">
                      {event.status === 'ongoing' ? (
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Ongoing
                        </span>
                      ) : event.status === 'completed' ? (
                        <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Completed
                        </span>
                      ) : (
                        <span className="bg-white text-red-600 px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Upcoming
                        </span>
                      )}
                      <button 
                        onClick={() => (event.status === 'ongoing' || event.status === 'completed') ? handleFeedback(event) : handleRegister(event)}
                        className="font-bold text-sm sm:text-base px-4 py-2 rounded-xl border-2 border-white hover:bg-white/20 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer hover:scale-105 animate-float"
                      >
                        <span className="text-white">
                          {event.title}
                        </span>
                        <ArrowRight className="w-4 h-4 text-white" />
                      </button>
                      <span className="flex items-center gap-1.5 text-xs sm:text-sm text-white bg-white/20 px-2 py-1 rounded-full">
                        <Calendar className="w-3 h-3" />
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs sm:text-sm text-white bg-white/20 px-2 py-1 rounded-full">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </span>
                      {event.status === 'ongoing' || event.status === 'completed' ? (
                        <button
                          onClick={() => handleFeedback(event)}
                          className="bg-[#1e3a8a] text-white px-5 py-2 rounded-full text-xs sm:text-sm font-bold hover:bg-[#1e40af] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 flex items-center gap-1"
                        >
                          <MessageSquare className="w-3 h-3" />
                          Share Feedback →
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRegister(event)}
                          disabled={event.available_seats === 0}
                          className="bg-white text-red-600 px-5 py-2 rounded-full text-xs sm:text-sm font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {event.available_seats === 0 ? 'Event Full' : 'Register Now →'}
                        </button>
                      )}
                      <span className="text-white/40 text-2xl">•</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={() => setShowBanner(false)}
                className="absolute right-2 sm:right-4 z-10 p-1.5 hover:bg-white/20 rounded-full transition-colors bg-white/10"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Premium Hero Slider - Apple/Framer Inspired */}
      {slideshowImages.length > 0 && (
        <section 
          className="relative w-full min-h-[60vh] h-[60vh] sm:min-h-screen sm:h-screen overflow-hidden bg-[#0B0F1A]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Background Images with Premium Transition */}
          {slideshowImages.map((image, index) => (
            <div
              key={image.id}
              className={`absolute inset-0 transition-all duration-[1200ms] ease-out ${
                index === currentEventIndex 
                  ? 'opacity-100 scale-100 z-10' 
                  : 'opacity-0 scale-110 z-0'
              }`}
            >
              <img
                src={image.image_url || ''}
                alt={image.title}
                className="w-full h-full object-cover object-top sm:object-center"
              />
              {/* Stronger bottom gradient for mobile - keeps faces visible at top */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent sm:from-black/50 sm:via-transparent sm:to-transparent z-20"></div>
              {/* Side gradient for desktop */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent hidden sm:block z-20"></div>
            </div>
          ))}

          {/* Content Container */}
          <div className="absolute inset-0 z-30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-16 h-full flex flex-col justify-end pb-6 sm:pb-20">
              <div className="w-full sm:max-w-3xl">
                {/* Pill Badge with staggered animation */}
                <div 
                  key={`badge-${currentEventIndex}`}
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 sm:bg-white/5 backdrop-blur-xl border border-white/10 text-white text-xs font-semibold mb-2 sm:mb-4 animate-fade-in-up"
                  style={{ animationDelay: '0ms' }}
                >
                  <span className="w-2 h-2 rounded-full bg-[#FF3B3B] animate-pulse"></span>
                  RECENT WORKSHOP
                </div>

                {/* Large Bold Headline - max 2 lines on mobile */}
                <h1 
                  key={`title-${currentEventIndex}`}
                  className="text-xl sm:text-3xl lg:text-5xl font-bold sm:font-black text-white leading-tight sm:leading-[1.1] mb-1.5 sm:mb-4 tracking-tight animate-fade-in-up line-clamp-2 sm:line-clamp-none"
                  style={{ animationDelay: '100ms' }}
                >
                  {currentSlideImage?.title}
                </h1>

                {/* Supporting Subtitle - single line on mobile */}
                <p 
                  key={`subtitle-${currentEventIndex}`}
                  className="text-sm sm:text-base lg:text-xl text-white/80 sm:text-white/70 font-normal sm:font-light mb-4 sm:mb-8 leading-snug sm:leading-relaxed animate-fade-in-up line-clamp-1 sm:line-clamp-none"
                  style={{ animationDelay: '200ms' }}
                >
                  Empowering the next generation with hands-on STEM learning
                </p>

                {/* CTAs - Only primary on mobile, both on desktop */}
                <div 
                  key={`ctas-${currentEventIndex}`}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-up"
                  style={{ animationDelay: '300ms' }}
                >
                  {/* Primary CTA - Full width on mobile, ~46px height */}
                  <a
                    href="/programs"
                    className="group flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto px-6 sm:px-8 h-[46px] sm:py-4 sm:h-auto bg-[#FF3B3B]/90 sm:bg-[#FF3B3B] hover:bg-[#E63333] text-white font-bold text-base rounded-xl sm:rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#FF3B3B]/30"
                  >
                    Explore Programs
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>

                  {/* Secondary Ghost CTA - Hidden on mobile */}
                  <a
                    href="/gallery"
                    className="hidden sm:flex items-center justify-center gap-3 w-auto px-8 py-4 bg-white/5 hover:bg-white/15 backdrop-blur-xl border border-white/20 hover:border-white/40 text-white font-semibold text-base rounded-full transition-all duration-300"
                  >
                    View Gallery
                  </a>
                </div>

                {/* Mobile Pagination Dots - Below CTA */}
                <div className="flex sm:hidden items-center justify-between mt-4">
                  <div className="flex items-center gap-1.5">
                    {slideshowImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentEventIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === currentEventIndex 
                            ? 'w-6 bg-white' 
                            : 'w-2 bg-white/40'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                  <span className="text-white/60 text-xs font-medium">
                    {currentEventIndex + 1} / {slideshowImages.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Minimal Progress Indicator - Desktop only */}
          <div className="absolute bottom-8 right-8 z-40 hidden sm:block">
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
              <span className="text-2xl font-bold text-white tabular-nums">
                {String(currentEventIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-white/50">/</span>
              <span className="text-lg text-white/70 tabular-nums">
                {String(slideshowImages.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Minimal Navigation Arrows - Hidden on mobile, visible on tablet+ */}
          <button
            onClick={prevEvent}
            className="absolute left-6 lg:left-10 top-1/2 -translate-y-1/2 z-40 w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white/5 backdrop-blur-xl hover:bg-white/10 border border-white/10 hover:border-white/20 hidden sm:flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
            aria-label="Previous"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <button
            onClick={nextEvent}
            className="absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 z-40 w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white/5 backdrop-blur-xl hover:bg-white/10 border border-white/10 hover:border-white/20 hidden sm:flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
            aria-label="Next"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        </section>
      )}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#f0f7ff] to-[#e8f4ff] overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left space-y-5 sm:space-y-6 w-full lg:max-w-lg">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-white shadow-sm border border-indigo-100">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600/10">
                  <svg
                    className="h-3 w-3 text-indigo-600"
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
                <span className="text-xs sm:text-sm font-medium text-slate-700">
                  C LABS STEM ACADEMICS - Classes 3 to 9
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-slate-900">
                Year-Long STEM Academic Excellence
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-600">
                Comprehensive year-long academic course with specially designed academic books for each standard from Class 3 to Class 9.
              </p>

              {/* Call to Action */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Button 
                  variant="default" 
                  size="lg" 
                  className="flex items-center gap-2"
                  onClick={() => window.open("/gallery", "_self")}
                >
                  <span>Explore Gallery</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="flex items-center gap-2"
                  onClick={() => window.open("/videos", "_self")}
                >
                  <span>Watch Videos</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Right Content - School Partnership Carousel Card */}
            <div className="flex-1 w-full">
              {isLoading ? (
                <div className="rounded-2xl sm:rounded-3xl bg-white shadow-2xl flex items-center justify-center h-[400px] sm:h-[500px] lg:h-[600px]">
                  <div className="text-center p-6">
                    <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-gray-500 font-medium">Loading school partnerships...</p>
                  </div>
                </div>
              ) : banners.length > 0 ? (
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-white h-[400px] sm:h-[500px] lg:h-[600px]">
                  {/* Banner Images with School Branding Overlay */}
                  {banners.map((banner, index) => (
                    <div
                      key={banner.id}
                      className={`absolute inset-0 transition-all duration-1000 ease-out ${
                        index === currentBannerIndex 
                          ? 'opacity-100 z-10' 
                          : 'opacity-0 z-0'
                      }`}
                    >
                      {/* Banner Image */}
                      <div className="w-full h-full flex items-center justify-center p-3 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100">
                        <img
                          src={banner.image_url}
                          alt={banner.title}
                          className="max-w-full max-h-full object-contain rounded-xl sm:rounded-2xl shadow-xl"
                        />
                      </div>
                    </div>
                  ))}

                  {/* Navigation Arrows - Clean & Minimal */}
                  {banners.length > 1 && (
                    <>
                      <button
                        onClick={prevBanner}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 sm:bg-white hover:bg-gray-50 rounded-full p-2 sm:p-3 transition-all shadow-lg hover:scale-110 active:scale-95 border border-gray-200"
                        aria-label="Previous"
                      >
                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                      </button>
                      <button
                        onClick={nextBanner}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 sm:bg-white hover:bg-gray-50 rounded-full p-2 sm:p-3 transition-all shadow-lg hover:scale-110 active:scale-95 border border-gray-200"
                        aria-label="Next"
                      >
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                      </button>
                    </>
                  )}

                  {/* Slide Counter - Top Right */}
                  {banners.length > 1 && (
                    <div className="absolute top-3 right-3 sm:top-6 sm:right-6 z-20 bg-white/95 backdrop-blur-sm text-gray-800 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold shadow-lg border border-gray-200">
                      {currentBannerIndex + 1} / {banners.length}
                    </div>
                  )}
                </div>
              ) : (
                <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center border-2 border-dashed border-indigo-200 h-[400px] sm:h-[500px] lg:h-[600px]">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-700 font-semibold text-lg mb-2">No school partnerships yet</p>
                    <p className="text-sm text-gray-500">Add school banners from the admin panel</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      {selectedEvent && (
        <>
          <EventRegistrationModal
            event={selectedEvent}
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false)
              setSelectedEvent(null)
            }}
          />
          <EventFeedbackModal
            event={selectedEvent}
            isOpen={isFeedbackModalOpen}
            onClose={() => {
              setIsFeedbackModalOpen(false)
              setSelectedEvent(null)
            }}
          />
        </>
      )}
    </>
  )
}