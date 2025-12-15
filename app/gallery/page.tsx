"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = ["All", "Robotics", "AI", "IoT", "Cybersecurity", "Events"]

const galleryItems = [
  {
    src: "/children-building-robots-in-classroom-workshop.jpg",
    alt: "Students building robots in workshop",
    category: "Robotics",
  },
  {
    src: "/kids-coding-on-computers-in-modern-classroom.jpg",
    alt: "Kids learning to code",
    category: "AI",
  },
  {
    src: "/students-assembling-iot-smart-home-project.jpg",
    alt: "IoT smart home project",
    category: "IoT",
  },
  {
    src: "/children-with-drones-flying-indoor.jpg",
    alt: "Drone flying session",
    category: "Robotics",
  },
  {
    src: "/cybersecurity-workshop-for-kids-with-computers.jpg",
    alt: "Cybersecurity workshop",
    category: "Cybersecurity",
  },
  {
    src: "/stem-education-award-ceremony-children.jpg",
    alt: "Award ceremony",
    category: "Events",
  },
  {
    src: "/children-programming-arduino-boards.jpg",
    alt: "Arduino programming session",
    category: "Robotics",
  },
  {
    src: "/students-working-on-ai-game-project.jpg",
    alt: "AI game development",
    category: "AI",
  },
  {
    src: "/raspberry-pi-workshop-for-children.jpg",
    alt: "Raspberry Pi workshop",
    category: "IoT",
  },
  {
    src: "/robotics-competition-kids-robots.jpg",
    alt: "Robotics competition",
    category: "Events",
  },
  {
    src: "/machine-learning-class-children.jpg",
    alt: "Machine learning class",
    category: "AI",
  },
  {
    src: "/summer-camp-stem-activities-children.jpg",
    alt: "Summer camp activities",
    category: "Events",
  },
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const filteredItems =
    activeCategory === "All" ? galleryItems : galleryItems.filter((item) => item.category === activeCategory)

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#f0f7ff] to-[#e8f4ff] py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 text-center lg:px-8">
            <h1 className="mb-4 sm:mb-6 text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-bold text-[#0A1B2A]">
              Our Gallery
            </h1>
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-[#4A6382]">
              Explore moments of innovation, creativity, and learning from our STEM programs
            </p>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="border-b border-border/50 bg-white py-4 sm:py-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap sm:justify-center scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "shrink-0 rounded-full px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all",
                    activeCategory === category
                      ? "bg-gradient-to-r from-[#276EF1] to-[#37D2C5] text-white shadow-lg shadow-primary/20"
                      : "bg-[#f0f7ff] text-[#4A6382] hover:bg-[#e8f4ff] hover:text-[#276EF1]",
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-10 sm:py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(item.src)}
                  className="premium-card group relative overflow-hidden rounded-xl sm:rounded-2xl border border-border/50 bg-white"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.src || "/placeholder.svg"}
                      alt={item.alt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1B2A]/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 text-left opacity-0 transition-all duration-300 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                    <span className="inline-block rounded-full bg-[#37D2C5] px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-white">
                      {item.category}
                    </span>
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-medium text-white line-clamp-2">{item.alt}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A1B2A]/90 p-2 sm:p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-xl sm:rounded-2xl">
              <img
                src={selectedImage || "/placeholder.svg"}
                alt="Gallery preview"
                className="h-auto max-h-[90vh] w-full object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute right-2 sm:right-4 top-2 sm:top-4 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/90 text-[#0A1B2A] backdrop-blur-sm transition-colors hover:bg-white"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
