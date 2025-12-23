"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = ["All", "Robotics", "AI", "IoT", "Cybersecurity", "Events"]

interface GalleryImage {
  id: string
  title: string
  image_url: string
  category: string | null
  created_at: string
}

// Static placeholder images from Gallery folder (will be replaced by admin uploads)
const staticPlaceholderImages = [
  {
    id: "static-1",
    image_url: "/Gallery/WhatsApp Image 2025-12-16t 04.19.22.jpeg",
    title: "Collaborative Work",
    category: "Cybersecurity",
    created_at: "",
  },
  {
    id: "static-2",
    image_url: "/Gallery/WhatsApp Image 202-16 at 04.19.23.jpeg",
    title: "STEM Education",
    category: "Robotics",
    created_at: "",
  },
  {
    id: "static-3",
    image_url: "/Gallery/WhatsApp Image 20256 at 04.19.23.jpeg",
    title: "Innovation Session",
    category: "AI",
    created_at: "",
  },
  {
    id: "static-4",
    image_url: "/Gallery/WhatsApp Image12-16 at 04.19.24.jpeg",
    title: "Coding Workshop",
    category: "AI",
    created_at: "",
  },
  {
    id: "static-5",
    image_url: "/Gallery/WhatsApp Im5-12-16 at 04.19.25.jpeg",
    title: "Tech Exploration",
    category: "IoT",
    created_at: "",
  },
  {
    id: "static-7",
    image_url: "/Gallery/WhatsApp Image 6 at 04.19.27.jpeg",
    title: "Learning Experience",
    category: "Robotics",
    created_at: "",
  },
  {
    id: "static-8",
    image_url: "/Gallery/WhatsApp Image 6 at 04.19.28.jpeg",
    title: "Creative Solutions",
    category: "AI",
    created_at: "",
  },
  {
    id: "static-10",
    image_url: "/Gallery/WhatsApp Image 2025-104.19.29.jpeg",
    title: "Problem Solving",
    category: "IoT",
    created_at: "",
  },
  {
    id: "static-11",
    image_url: "/Gallery/WhatsApp Imag12-16 at 04.19.30.jpeg",
    title: "Innovation Workshop",
    category: "Robotics",
    created_at: "",
  },
  {
    id: "static-12",
    image_url: "/Gallery/WhatsApp Image 216 at 04.19.30.jpeg",
    title: "STEM Activities",
    category: "AI",
    created_at: "",
  },
  {
    id: "static-13",
    image_url: "/Gallery/WhatsApp Image 2004.19.31.jpeg",
    title: "Technology Projects",
    category: "Cybersecurity",
    created_at: "",
  },
  {
    id: "static-14",
    image_url: "/Gallery/WhatsApp Image 2025-124.19.32.jpeg",
    title: "Learning Lab",
    category: "IoT",
    created_at: "",
  },
  {
    id: "static-16",
    image_url: "/Gallery/WhatsApp Image 2025t 04.19.34.jpeg",
    title: "Hands-on Experience",
    category: "Robotics",
    created_at: "",
  },
  {
    id: "static-17",
    image_url: "/Gallery/WhatsApp Image 2025-12-4.19.35.jpeg",
    title: "Group Learning",
    category: "AI",
    created_at: "",
  },
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/gallery")
      const data = await response.json()
      setImages(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error("Failed to fetch images:", error)
      setImages([])
    } finally {
      setLoading(false)
    }
  }

  // Combine database images with static placeholders
  const allImages = [...images, ...staticPlaceholderImages]
  
  const filteredItems =
    activeCategory === "All" 
      ? allImages 
      : allImages.filter((item) => item.category === activeCategory)

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 text-center lg:px-8">
            <h1 className="mb-4 sm:mb-6 text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-bold text-slate-900">
              Our Gallery
            </h1>
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-600">
              Explore moments of innovation, creativity, and learning from our STEM programs
            </p>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="border-b border-indigo-100 bg-white py-4 sm:py-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap sm:justify-center scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "shrink-0 rounded-full px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all",
                    activeCategory === category
                      ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg hover:shadow-xl hover:shadow-indigo-500/30"
                      : "bg-indigo-50/50 text-slate-600 hover:bg-indigo-100 hover:text-indigo-600",
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
            {loading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-slate-600">Loading gallery...</div>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-center">
                  <p className="text-slate-600 text-lg">No images found in this category.</p>
                  <p className="text-sm text-slate-500 mt-2">Images uploaded by admin will appear here.</p>
                </div>
              </div>
            ) : (
              <div className="grid gap-3 sm:gap-4 md:gap-6 grid-cols-2 lg:grid-cols-3">
                {filteredItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedImage(item.image_url)}
                    className="group relative overflow-hidden rounded-xl sm:rounded-2xl border border-indigo-100 bg-white hover:shadow-xl hover:shadow-indigo-500/10 transition-all"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image_url || "/placeholder.svg"}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 text-left opacity-0 transition-all duration-300 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                      <span className="inline-block rounded-full bg-indigo-500 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium text-white">
                        {item.category}
                      </span>
                      <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-medium text-white line-clamp-2">{item.title}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/90 p-2 sm:p-4 backdrop-blur-sm"
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
                className="absolute right-2 sm:right-4 top-2 sm:top-4 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/90 text-slate-900 backdrop-blur-sm transition-colors hover:bg-white"
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
