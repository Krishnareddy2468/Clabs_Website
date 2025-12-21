"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = ["All", "Robotics", "AI", "IoT", "Cybersecurity", "Events"]

const galleryItems = [
  {
    src: "/Gallery/WhatsApp Image 2025-12-16 at 04.18.49.jpeg",
    alt: "STEM Workshop Activity",
    category: "Robotics",
  },
  {
    src: "/Gallery/WhatsApp Image 2025-12-16 at 04.18.50.jpeg",
    alt: "Students Learning",
    category: "AI",
  },
  {
    src: "/Gallery/WhatsApp Image 2025-12-16 at 04.18.51.jpeg",
    alt: "Hands-on Learning",
    category: "IoT",
  },
  {
    src: "/Gallery/WhatsApp Image 2025-12-16 at 04.19.12.jpeg",
    alt: "C-LABS Workshop",
    category: "Robotics",
  },
  {
    src: "/Gallery/WhatsApp Image 2025-12-16 at 04.19.13.jpeg",
    alt: "Coding Session",
    category: "AI",
  },
  {
    src: "/Gallery/fsdnsdov 2025-12-16 at 04.19.13.jpeg",
    alt: "Group Activity",
    category: "Events",
  },
  {
    src: "/Gallery/WhatsApp Image 2025-12-16 at 04.19.15.jpeg",
    alt: "Technology Exploration",
    category: "IoT",
  },
  {
    src: "/Gallery/WhatsApp Image 2025-12-16 at 04.19.16.jpeg",
    alt: "Student Project",
    category: "Robotics",
  },
  {
    src: "/Gallery/WhatsApp ge 2025-12-16 at 04.19.16.jpeg",
    alt: "Team Collaboration",
    category: "Events",
  },
  {
    src: "/Gallery/WhatsApp Image 2025-12-16 at 04.19.17.jpeg",
    alt: "Innovation Lab",
    category: "AI",
  },
  {
    src: "/Gallery/WhatsApp Image -12-16 at 04.19.18.jpeg",
    alt: "STEM Learning",
    category: "Cybersecurity",
  },
  {
    src: "/Gallery/WhatsApp Image 2025-12- at 04.19.19.jpeg",
    alt: "Workshop Session",
    category: "Robotics",
  },
  {
    src: "/Gallery/WhatsApp025-12-16 at 04.19.19.jpeg",
    alt: "Creative Thinking",
    category: "AI",
  },
  {
    src: "/Gallery/WhatsApp  2025-12-16 at 04.19.20.jpeg",
    alt: "Building Projects",
    category: "IoT",
  },
  {
    src: "/Gallery/WhatsApp Image 2025-12-16 at 04.19.20.jpeg",
    alt: "Student Engagement",
    category: "Events",
  },
  {
    src: "/Gallery/WhatsApp Image -12-16 at 04.19.21.jpeg",
    alt: "Technology Workshop",
    category: "Robotics",
  },
  {
    src: "/Gallery/WhatsApp Image 2025-12-16 at 04.19.21.jpeg",
    alt: "Interactive Learning",
    category: "AI",
  },
  {
    src: "/Gallery/WhatsApp Image 2025-12-16 04.19.22.jpeg",
    alt: "Project Development",
    category: "IoT",
  },
  {
    src: "/Gallery/WhatsApp Image 2025-12-16t 04.19.22.jpeg",
    alt: "Collaborative Work",
    category: "Cybersecurity",
  },
  {
    src: "/Gallery/WhatsApp Image -16 at 04.19.23.jpeg",
    alt: "Practical Learning",
    category: "Events",
  },
  {
    src: "/Gallery/WhatsApp Image 202-16 at 04.19.23.jpeg",
    alt: "STEM Education",
    category: "Robotics",
  },
  {
    src: "/Gallery/WhatsApp Image 20256 at 04.19.23.jpeg",
    alt: "Innovation Session",
    category: "AI",
  },
  {
    src: "/Gallery/WhatsApp Image12-16 at 04.19.24.jpeg",
    alt: "Coding Workshop",
    category: "AI",
  },
  {
    src: "/Gallery/WhatsApp Im5-12-16 at 04.19.25.jpeg",
    alt: "Tech Exploration",
    category: "IoT",
  },
  {
    src: "/Gallery/WhatsApp Image -12-16 at 04.19.25.jpeg",
    alt: "Student Success",
    category: "Events",
  },
  {
    src: "/Gallery/WhatsApp Image 6 at 04.19.27.jpeg",
    alt: "Learning Experience",
    category: "Robotics",
  },
  {
    src: "/Gallery/WhatsApp Image 6 at 04.19.28.jpeg",
    alt: "Creative Solutions",
    category: "AI",
  },
  {
    src: "/Gallery/WhatsApp Image at 04.19.28.jpeg",
    alt: "Teamwork",
    category: "Events",
  },
  {
    src: "/Gallery/WhatsApp Image 2025-104.19.29.jpeg",
    alt: "Problem Solving",
    category: "IoT",
  },
  {
    src: "/Gallery/WhatsApp Imag12-16 at 04.19.30.jpeg",
    alt: "Innovation Workshop",
    category: "Robotics",
  },
  {
    src: "/Gallery/WhatsApp Image 216 at 04.19.30.jpeg",
    alt: "STEM Activities",
    category: "AI",
  },
  {
    src: "/Gallery/WhatsApp Image 2004.19.31.jpeg",
    alt: "Technology Projects",
    category: "Cybersecurity",
  },
  {
    src: "/Gallery/WhatsApp Image 2025-124.19.32.jpeg",
    alt: "Learning Lab",
    category: "IoT",
  },
  {
    src: "/Gallery/WhatsApp Image 2025at 04.19.32.jpeg",
    alt: "Student Innovation",
    category: "Events",
  },
  {
    src: "/Gallery/WhatsApp Image 2025t 04.19.34.jpeg",
    alt: "Hands-on Experience",
    category: "Robotics",
  },
  {
    src: "/Gallery/WhatsApp Image 2025-12-4.19.35.jpeg",
    alt: "Group Learning",
    category: "AI",
  },
  {
    src: "/Gallery/WhatsApp Image-16 at 04.19.36.jpeg",
    alt: "C-LABS Program",
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
