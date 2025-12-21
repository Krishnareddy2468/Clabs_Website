"use client"

import { useState, useEffect } from "react"
import { Calendar, MapPin, ArrowRight, IndianRupee } from "lucide-react"
import { Button } from "@/components/ui/button"
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

export function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/events")
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Loaded events:', data)
      setEvents(data || [])
      setError(null)
    } catch (err) {
      console.error('Failed to load events:', err)
      setError('Failed to load events')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (events.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [events.length])

  const handleRegister = (event: Event) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  if (loading) {
    return (
      <section className="py-8">
        <div className="text-center">
          <p className="text-[#4A6382]">Loading events...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-8">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </section>
    )
  }

  if (events.length === 0) {
    return null
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-[2rem] md:text-[2.5rem] font-semibold text-[#0A1B2A] mb-2 sm:mb-3">
            Upcoming Events
          </h2>
          <p className="text-base sm:text-lg text-[#4A6382]">
            Join our exciting workshops and programs
          </p>
        </div>

        {/* Event Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {events.map((event) => (
                <div key={event.id} className="min-w-full">
                  <div className="grid md:grid-cols-2 gap-8 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
                    {/* Event Image */}
                    <div className="relative h-64 md:h-auto rounded-xl overflow-hidden">
                      {event.image_url ? (
                        <img
                          src={event.image_url}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#276EF1] to-[#37D2C5] flex items-center justify-center">
                          <Calendar className="w-24 h-24 text-white opacity-50" />
                        </div>
                      )}
                    </div>

                    {/* Event Details */}
                    <div className="flex flex-col justify-center">
                      <h3 className="text-2xl md:text-3xl font-bold text-[#0A1B2A] mb-4">
                        {event.title}
                      </h3>
                      
                      <p className="text-[#4A6382] mb-6 line-clamp-3">
                        {event.description}
                      </p>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-[#4A6382]">
                          <Calendar className="w-5 h-5 text-[#276EF1]" />
                          <span>{new Date(event.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}</span>
                        </div>

                        <div className="flex items-center gap-3 text-[#4A6382]">
                          <MapPin className="w-5 h-5 text-[#276EF1]" />
                          <span>{event.location}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <IndianRupee className="w-5 h-5 text-green-600" />
                          <span className="text-lg font-semibold text-green-600">
                            {event.amount === 0 ? 'Free Event' : `₹${event.amount.toFixed(2)}`}
                          </span>
                        </div>
                      </div>

                      <Button
                        onClick={() => handleRegister(event)}
                        className="w-full md:w-auto bg-gradient-to-r from-[#276EF1] to-[#37D2C5] text-white px-8 py-6 text-lg group"
                      >
                        Register for Event
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          {events.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {events.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-8 bg-[#276EF1]'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to event ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Event Counter */}
          <div className="text-center mt-4 text-sm text-[#4A6382]">
            {currentIndex + 1} / {events.length}
          </div>
        </div>
      </div>

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
    </section>
  )
}
