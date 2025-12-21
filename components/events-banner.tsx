"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, X } from "lucide-react"
import Link from "next/link"

interface Event {
  id: string
  title: string
  description: string
  date: string
  end_date?: string
  image: string
  apply_link: string
  active: boolean
}

export function EventsBanner() {
  const [events, setEvents] = useState<Event[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Load active events from API
    const loadEvents = async () => {
      try {
        const response = await fetch('/api/events?active=true')
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
    if (events.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length)
    }, 5000) // Change event every 5 seconds

    return () => clearInterval(interval)
  }, [events.length])

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
    <div className="relative overflow-hidden bg-gradient-to-r from-[#276EF1] to-[#37D2C5] text-white">
      <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-4">
            <div className="hidden rounded-lg bg-white/20 p-2 backdrop-blur-sm sm:block">
              <Calendar className="h-6 w-6" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/30 px-3 py-0.5 text-xs font-medium">
                  Upcoming Event
                </span>
                {events.length > 1 && (
                  <span className="text-xs text-white/80">
                    {currentIndex + 1} of {events.length}
                  </span>
                )}
              </div>
              <h3 className="mt-1 truncate font-semibold sm:text-lg">{currentEvent.title}</h3>
              <p className="mt-0.5 line-clamp-1 text-xs text-white/90 sm:text-sm">
                {currentEvent.description}
              </p>
              <div className="mt-1 flex items-center gap-3 text-xs text-white/80">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {new Date(currentEvent.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentEvent.apply_link && (
              <Link href={currentEvent.apply_link} target="_blank">
                <Button
                  size="sm"
                  className="bg-white text-[#276EF1] hover:bg-white/90"
                >
                  Apply Now
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            )}

            <button
              onClick={handleClose}
              className="rounded-full p-1 transition-colors hover:bg-white/20"
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
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-all ${
                  index === currentIndex ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
