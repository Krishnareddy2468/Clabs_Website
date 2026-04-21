"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, Calendar, MapPin, Users, Play, Pause, ArrowRight, MessageSquare } from "lucide-react"
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
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/20 group">
              {/* Glassmorphism border */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm z-10 pointer-events-none rounded-2xl sm:rounded-3xl border border-white/10"></div>

              {/* Image Container */}
              <div className="relative h-[70vh] min-h-[480px] sm:h-[80vh] sm:min-h-[580px] lg:h-[85vh] lg:min-h-[650px] overflow-hidden">
                {events.map((event, index) => (
                  <div
                    key={event.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                      index === currentIndex ? "opacity-100 z-20" : "opacity-0 z-0"
                    }`}
                  >
                    <img
                      src={event.image_url || ""}
                      alt={event.title}
                      className="w-full h-full object-contain object-center bg-black"
                    />
                    {/* Mobile gradient */}
                    <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black via-black/60 to-transparent sm:hidden"></div>
                    {/* Desktop gradients */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent hidden sm:block"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent hidden sm:block"></div>
                  </div>
                ))}

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 pb-6 sm:p-6 lg:p-10 z-30">
                  <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 lg:gap-6">
                    {/* Left Content */}
                    <div className="flex-1 max-w-2xl">
                      {/* Status Badge */}
                      <div
                        className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-gradient-to-r ${cfg.gradient} text-white text-[10px] sm:text-sm font-semibold shadow-lg mb-2 sm:mb-4`}
                      >
                        <span className="relative flex h-2 w-2">
                          {cfg.ping && (
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                          )}
                          <span className={`relative inline-flex rounded-full h-2 w-2 ${cfg.dot}`}></span>
                        </span>
                        {cfg.label}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-2xl lg:text-4xl font-bold text-white mb-1.5 sm:mb-3 line-clamp-2 drop-shadow-lg leading-tight">
                        {current?.title}
                      </h3>

                      {/* Description */}
                      <p className="text-white/70 text-sm sm:text-base lg:text-lg line-clamp-2 mb-3 sm:mb-4 hidden sm:block">
                        {current?.description}
                      </p>

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-3 mb-3 sm:mb-5">
                        <div className="flex items-center gap-1 sm:gap-1.5 text-white/80 text-[10px] sm:text-sm bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>
                            {new Date(current?.date || "").toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-1.5 text-white/80 text-[10px] sm:text-sm bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="truncate max-w-[100px] sm:max-w-none">{current?.location}</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-1.5 text-white/80 text-[10px] sm:text-sm bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full hidden sm:flex">
                          <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{current?.available_seats} seats left</span>
                        </div>
                      </div>

                      {/* Action Button */}
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
                    </div>

                    {/* Right — Counter + Controls */}
                    <div className="flex items-center gap-2 sm:gap-3">
                      <button
                        onClick={() => setIsPaused(!isPaused)}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hidden sm:flex items-center justify-center text-white hover:bg-white/20 transition-all"
                        aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
                      >
                        {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                      </button>
                      <div className="flex items-center gap-1 px-3 py-1.5 sm:px-0 sm:py-0 rounded-full bg-black/30 sm:bg-transparent">
                        <span className="text-lg sm:text-3xl lg:text-4xl font-bold text-white tabular-nums">
                          {String(currentIndex + 1).padStart(2, "0")}
                        </span>
                        <span className="text-white/50 text-sm sm:text-xl">/</span>
                        <span className="text-white/50 text-sm sm:text-xl tabular-nums">
                          {String(events.length).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hidden sm:flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all duration-300 group-hover:opacity-100 opacity-0"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hidden sm:flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 transition-all duration-300 group-hover:opacity-100 opacity-0"
                aria-label="Next slide"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
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
