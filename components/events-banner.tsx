"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, X, Users, MessageSquare, CheckCircle } from "lucide-react"
import Link from "next/link"
import { EventFeedbackModal } from "@/components/home/event-feedback-modal"

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

export function EventsBanner() {
  const [events, setEvents] = useState<Event[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  useEffect(() => {
    // Load active events from API
    const loadEvents = async () => {
      try {
        const response = await fetch('/api/events')
        if (response.ok) {
          const data = await response.json()
          setEvents(data)
        }
      } catch (error) {
        console.error('Failed to load events:', error)
      }
    }
    
    loadEvents()
  }, [])

  useEffect(() => {
    if (events.length <= 1 || isPaused) return

    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % events.length)
        setIsTransitioning(false)
      }, 500)
    }, 15000) // Change event every 15 seconds

    return () => clearInterval(interval)
  }, [events.length, isPaused])

  const handleClose = () => {
    setIsVisible(false)
    // Store in session storage so it doesn't show again during this session
    sessionStorage.setItem("eventsBannerClosed", "true")
  }

  useEffect(() => {
    const wasClosed = sessionStorage.getItem("eventsBannerClosed")
    if (wasClosed) {
      setIsVisible(false)
    }
  }, [])

  if (!isVisible || events.length === 0) return null

  const currentEvent = events[currentIndex]

  return (
    <div 
      className="relative overflow-hidden bg-gradient-to-r from-[#276EF1] to-[#37D2C5] text-white transition-all duration-500 hover:shadow-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1e5dd9] via-[#276EF1] to-[#2fc9ba] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      
      <div className={`container mx-auto px-4 py-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-in-out ${
        isTransitioning ? 'opacity-0 scale-98 translate-y-2' : 'opacity-100 scale-100 translate-y-0'
      }`}>
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-4">
            <div className="hidden rounded-lg bg-white/20 p-2 backdrop-blur-sm sm:block transition-all duration-300 hover:bg-white/30 hover:scale-110 hover:rotate-3">
              <Calendar className="h-6 w-6 transition-transform duration-300" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                {currentEvent.status === 'ongoing' ? (
                  <span className="rounded-full bg-green-500/90 px-3 py-0.5 text-xs font-medium backdrop-blur-sm transition-all duration-300 hover:bg-green-500 hover:scale-105 animate-pulse flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Ongoing
                  </span>
                ) : currentEvent.status === 'completed' ? (
                  <span className="rounded-full bg-gray-500/90 px-3 py-0.5 text-xs font-medium backdrop-blur-sm transition-all duration-300 hover:bg-gray-500 hover:scale-105 flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Completed
                  </span>
                ) : (
                  <span className="rounded-full bg-white/30 px-3 py-0.5 text-xs font-medium backdrop-blur-sm transition-all duration-300 hover:bg-white/40 hover:scale-105 animate-pulse flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Upcoming
                  </span>
                )}
                {events.length > 1 && (
                  <span className="text-xs text-white/80 transition-all duration-300 hover:text-white">
                    {currentIndex + 1} of {events.length}
                  </span>
                )}
              </div>
              <div className="block mt-1 group/title">
                <h3 className="font-bold text-base sm:text-xl transition-all duration-300 text-white bg-yellow-400/20 px-3 py-1.5 rounded-lg border-2 border-yellow-300 inline-flex items-center gap-2">
                  👉 {currentEvent.title}
                </h3>
              </div>
              <p className="mt-2 line-clamp-1 text-xs text-white/90 sm:text-sm transition-all duration-300 hover:text-white">
                {currentEvent.description}
              </p>
              <div className="mt-1 flex items-center gap-3 text-xs text-white/80">
                <span className="flex items-center gap-1 transition-all duration-300 hover:text-white hover:scale-105">
                  <Calendar className="h-3 w-3" />
                  {new Date(currentEvent.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1 transition-all duration-300 hover:text-white hover:scale-105">
                  📍 {currentEvent.location}
                </span>
                {currentEvent.status === 'upcoming' && (
                  <span className={`flex items-center gap-1 font-medium transition-all duration-300 hover:scale-110 ${
                    currentEvent.available_seats === 0 ? 'text-red-300 animate-pulse' :
                    currentEvent.available_seats < 10 ? 'text-yellow-300 animate-bounce' :
                    'text-white'
                  }`}>
                    <Users className="h-3 w-3" />
                    {currentEvent.available_seats === 0 
                      ? 'Seats Full' 
                      : currentEvent.available_seats < 10 
                        ? `Only ${currentEvent.available_seats} seats left!` 
                        : `${currentEvent.available_seats}/${currentEvent.total_seats} seats`
                    }
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentEvent.status === 'ongoing' || currentEvent.status === 'completed' ? (
              <Button
                size="sm"
                onClick={() => {
                  setSelectedEvent(currentEvent)
                  setIsFeedbackModalOpen(true)
                }}
                className="bg-[#1e3a8a] text-white hover:bg-[#1e40af] transition-all duration-300 hover:scale-110 hover:shadow-xl hover:-translate-y-0.5"
              >
                Share Feedback
                <MessageSquare className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            ) : (
              <Button
                size="sm"
                disabled={currentEvent.available_seats === 0}
                className="bg-white text-[#276EF1] hover:bg-white/90 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50"
              >
                {currentEvent.available_seats === 0 ? 'Event Full' : 'Register Now'}
                <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            )}

            <button
              onClick={handleClose}
              className="rounded-full p-1 transition-all duration-300 hover:bg-white/20 hover:rotate-90 hover:scale-110"
              aria-label="Close banner"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Progress indicator for multiple events */}
        {events.length > 1 && (
          <div className="mt-3 flex gap-1">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsTransitioning(true)
                  setTimeout(() => {
                    setCurrentIndex(index)
                    setIsTransitioning(false)
                  }, 500)
                }}
                className={`h-1 flex-1 rounded-full transition-all duration-500 hover:h-1.5 cursor-pointer ${
                  index === currentIndex ? "bg-white scale-105" : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to event ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Pause indicator */}
      {isPaused && events.length > 1 && (
        <div className="absolute top-2 right-2 sm:right-20 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 text-xs animate-fade-in">
          Paused
        </div>
      )}
      
      {/* Feedback Modal */}
      {selectedEvent && (
        <EventFeedbackModal
          event={selectedEvent}
          isOpen={isFeedbackModalOpen}
          onClose={() => {
            setIsFeedbackModalOpen(false)
            setSelectedEvent(null)
          }}
        />
      )}
    </div>
  )
}
