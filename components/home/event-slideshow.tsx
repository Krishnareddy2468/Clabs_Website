"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Calendar, MapPin, Users, Play, Pause } from "lucide-react"

interface Event {
  id: string
  title: string
  description: string
  date: string
  location: string
  image_url: string | null
  status?: string
  total_seats: number
  available_seats: number
}

export function EventSlideshow() {
  const [events, setEvents] = useState<Event[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  useEffect(() => {
    fetch("/api/events")
      .then(res => res.json())
      .then(data => {
        // Filter events that have images
        const eventsWithImages = (Array.isArray(data) ? data : []).filter(
          (event: Event) => event.image_url && event.image_url.trim() !== ''
        )
        setEvents(eventsWithImages)
        setIsLoading(false)
      })
      .catch(err => {
        console.error('Failed to load events:', err)
        setIsLoading(false)
      })
  }, [])

  // Auto-advance slideshow
  useEffect(() => {
    if (events.length <= 1 || isPaused) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [events.length, isPaused])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % events.length)
  }, [events.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length)
  }, [events.length])

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide()
    }
    if (touchStart - touchEnd < -75) {
      prevSlide()
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

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-[400px] sm:h-[500px]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white/70 text-lg">Loading events...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (events.length === 0) {
    return null // Don't render anything if no events with images
  }

  const currentEvent = events[currentIndex]

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm font-medium mb-4">
            ✨ Our Events Gallery
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Recent <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Events</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base">
            Explore our exciting STEM workshops and educational events
          </p>
        </div>

        {/* Main Slideshow Container */}
        <div 
          className="relative max-w-6xl mx-auto"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Image Card */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/20 group">
            {/* Glassmorphism Frame */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm z-10 pointer-events-none rounded-2xl sm:rounded-3xl border border-white/10"></div>
            
            {/* Image Container */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden">
              {events.map((event, index) => (
                <div
                  key={event.id}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    index === currentIndex 
                      ? 'opacity-100 scale-100 z-20' 
                      : index === (currentIndex + 1) % events.length
                        ? 'opacity-0 scale-110 z-10'
                        : 'opacity-0 scale-95 z-0'
                  }`}
                >
                  <img
                    src={event.image_url || ''}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                </div>
              ))}

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-10 z-30">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 lg:gap-6">
                  {/* Left Content */}
                  <div className="flex-1 max-w-2xl">
                    {/* Status Badge */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${getStatusColor(currentEvent?.status)} text-white text-xs sm:text-sm font-semibold shadow-lg mb-3 sm:mb-4`}>
                      <span className="relative flex h-2 w-2">
                        {currentEvent?.status === 'ongoing' && (
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        )}
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </span>
                      {getStatusText(currentEvent?.status)}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 line-clamp-2 drop-shadow-lg">
                      {currentEvent?.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/70 text-sm sm:text-base lg:text-lg line-clamp-2 mb-3 sm:mb-4 hidden sm:block">
                      {currentEvent?.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-2 sm:gap-4">
                      <div className="flex items-center gap-1.5 text-white/80 text-xs sm:text-sm bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>
                          {new Date(currentEvent?.date || '').toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-white/80 text-xs sm:text-sm bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className="truncate max-w-[120px] sm:max-w-none">{currentEvent?.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-white/80 text-xs sm:text-sm bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full hidden sm:flex">
                        <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>{currentEvent?.total_seats} seats</span>
                      </div>
                    </div>
                  </div>

                  {/* Right - Slide Counter */}
                  <div className="flex items-center gap-3 lg:gap-4">
                    {/* Pause/Play Button */}
                    <button
                      onClick={() => setIsPaused(!isPaused)}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                    >
                      {isPaused ? <Play className="w-4 h-4 sm:w-5 sm:h-5" /> : <Pause className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </button>

                    {/* Counter */}
                    <div className="flex items-baseline gap-1 text-white">
                      <span className="text-2xl sm:text-3xl lg:text-4xl font-bold">{String(currentIndex + 1).padStart(2, '0')}</span>
                      <span className="text-white/50 text-lg sm:text-xl">/</span>
                      <span className="text-white/50 text-lg sm:text-xl">{String(events.length).padStart(2, '0')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all duration-300 group-hover:opacity-100 opacity-0 sm:opacity-100"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all duration-300 group-hover:opacity-100 opacity-0 sm:opacity-100"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Thumbnail Navigation */}
          <div className="mt-4 sm:mt-6 lg:mt-8">
            <div className="flex justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 px-4 scrollbar-hide">
              {events.map((event, index) => (
                <button
                  key={event.id}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative flex-shrink-0 rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 ${
                    index === currentIndex 
                      ? 'ring-2 ring-purple-400 ring-offset-2 ring-offset-slate-900 scale-105' 
                      : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  <div className="w-16 h-12 sm:w-24 sm:h-16 lg:w-32 lg:h-20">
                    <img
                      src={event.image_url || ''}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {index === currentIndex && (
                    <div className="absolute inset-0 bg-purple-500/20"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Progress Dots (Mobile) */}
          <div className="flex justify-center gap-1.5 mt-4 sm:hidden">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8 bg-purple-400' 
                    : 'w-1.5 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
