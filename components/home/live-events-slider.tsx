"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Calendar, MapPin, Users, ArrowRight, MessageSquare } from "lucide-react"
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

export function LiveEventsSlider() {
  const [events, setEvents] = useState<Event[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)

  useEffect(() => {
    fetch("/api/events")
      .then(res => res.json())
      .then(data => {
        const filtered = (Array.isArray(data) ? data : []).filter(
          (event: Event) =>
            event.image_url &&
            event.image_url.trim() !== "" &&
            (event.status === "upcoming" || event.status === "ongoing")
        )
        setEvents(filtered)
        setIsLoading(false)
      })
      .catch(err => {
        console.error("Failed to load live events:", err)
        setIsLoading(false)
      })
  }, [])

  // Auto-advance slideshow
  useEffect(() => {
    if (events.length <= 1 || isPaused) return
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % events.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [events.length, isPaused])

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % events.length)
  }, [events.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + events.length) % events.length)
  }, [events.length])

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX)
  const handleTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX)
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) nextSlide()
    if (touchStart - touchEnd < -75) prevSlide()
  }

  if (isLoading || events.length === 0) return null

  const current = events[currentIndex]

  const statusConfig = {
    ongoing: {
      gradient: "from-green-500 to-emerald-600",
      dot: "bg-green-400",
      label: "🔴 Live Now",
      ping: true,
    },
    upcoming: {
      gradient: "from-blue-500 to-indigo-600",
      dot: "bg-blue-300",
      label: "Upcoming",
      ping: false,
    },
  }

  const cfg = statusConfig[current?.status as keyof typeof statusConfig] ?? statusConfig.upcoming

  return (
    <>
      <section className="relative py-6 sm:py-8 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1b2a] via-[#1a2e4a] to-[#0d1b2a]">
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-green-500/15 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-4 sm:mb-6">
            <span className="inline-block px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-xs font-medium mb-2">
              📅 Events
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1">
              Upcoming &amp;{" "}
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Ongoing Events
              </span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-xs sm:text-sm">
              Register now for our latest STEM workshops and programs
            </p>
          </div>

          {/* Slideshow Container */}
          <div
            className="relative max-w-6xl mx-auto"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/20 border border-white/10">

              {/* Image — clean, no overlay text */}
              <div className="relative">
                {/* Mobile: image natural size (no fixed height = no black gap) */}
                {/* Desktop: fixed tall height */}
                <div className="relative overflow-hidden bg-[#0d1b2a] sm:h-[70vh] sm:min-h-[500px] lg:h-[80vh] lg:min-h-[600px]">
                  {events.map((event, index) => (
                    <div
                      key={event.id}
                      className={`transition-opacity duration-700 ease-out ${
                        index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                      } sm:absolute sm:inset-0`}
                    >
                      <img
                        src={event.image_url || ""}
                        alt={event.title}
                        className="w-full h-auto sm:h-full sm:object-contain sm:object-center"
                      />
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows — over image only */}
                <button
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/60 transition-all"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Info strip below image */}
              <div className="bg-[#0d1b2a] border-t border-white/10 px-4 py-4 sm:px-6 sm:py-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                  {/* Left: status + title + meta */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${cfg.gradient} text-white text-xs font-semibold`}>
                        <span className="relative flex h-2 w-2">
                          {cfg.ping && (
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                          )}
                          <span className={`relative inline-flex rounded-full h-2 w-2 ${cfg.dot}`}></span>
                        </span>
                        {cfg.label}
                      </div>
                      {/* Slide counter */}
                      <span className="text-white/40 text-xs ml-auto sm:hidden">
                        {String(currentIndex + 1).padStart(2, "0")} / {String(events.length).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white truncate mb-1">
                      {current?.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      <span className="flex items-center gap-1 text-white/60 text-xs">
                        <Calendar className="w-3 h-3" />
                        {new Date(current?.date || "").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                      <span className="flex items-center gap-1 text-white/60 text-xs">
                        <MapPin className="w-3 h-3" />
                        {current?.location}
                      </span>
                      <span className="flex items-center gap-1 text-white/60 text-xs">
                        <Users className="w-3 h-3" />
                        {current?.available_seats} seats left
                      </span>
                    </div>
                  </div>

                  {/* Right: action + counter */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {current?.status === "ongoing" ? (
                      <button
                        onClick={() => { setSelectedEvent(current); setIsFeedbackModalOpen(true) }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full transition-all hover:scale-105 shadow-lg"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Share Feedback
                      </button>
                    ) : (
                      <button
                        onClick={() => { setSelectedEvent(current); setIsModalOpen(true) }}
                        disabled={current?.available_seats === 0}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-sm font-semibold rounded-full transition-all hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {current?.available_seats === 0 ? "Event Full" : "Register Now"}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                    <div className="hidden sm:flex items-center gap-1">
                      <span className="text-xl font-bold text-white tabular-nums">{String(currentIndex + 1).padStart(2, "0")}</span>
                      <span className="text-white/40 text-sm">/</span>
                      <span className="text-white/40 text-sm tabular-nums">{String(events.length).padStart(2, "0")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {events.length > 1 && (
              <div className="mt-6 lg:mt-8 hidden sm:block">
                <div className="flex justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 px-4">
                  {events.map((event, index) => (
                    <button
                      key={event.id}
                      onClick={() => setCurrentIndex(index)}
                      className={`relative flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300 ${
                        index === currentIndex
                          ? "ring-2 ring-green-400 ring-offset-2 ring-offset-[#0d1b2a] scale-105"
                          : "opacity-50 hover:opacity-80"
                      }`}
                    >
                      <div className="w-24 h-16 lg:w-32 lg:h-20">
                        <img
                          src={event.image_url || ""}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {index === currentIndex && (
                        <div className="absolute inset-0 bg-green-500/20"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <EventRegistrationModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setSelectedEvent(null) }}
      />
      <EventFeedbackModal
        event={selectedEvent}
        isOpen={isFeedbackModalOpen}
        onClose={() => { setIsFeedbackModalOpen(false); setSelectedEvent(null) }}
        onSuccess={() => {}}
      />
    </>
  )
}
