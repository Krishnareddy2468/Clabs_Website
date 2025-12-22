"use client"

import { useState, useEffect } from "react"
import { Trash2, Upload, Loader2 } from "lucide-react"
import { compressImage, uploadToSupabase } from "@/lib/image-compression"

interface GalleryImage {
  id: string
  title: string
  image_url: string
  category: string | null
}

const CATEGORIES = ["All", "Robotics", "AI", "IoT", "Cybersecurity", "Events"]

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [formData, setFormData] = useState({ title: "", category: "Events", image_url: "" })
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [filterCategory, setFilterCategory] = useState("All")

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    const res = await fetch("/api/gallery")
    const data = await res.json()
    setImages(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })

    setFormData({ title: "", category: "Events", image_url: "" })
    setLoading(false)
    fetchImages()
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      await fetch(`/api/gallery/${id}`, { method: "DELETE" })
      fetchImages()
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const compressed = await compressImage(file)
      const url = await uploadToSupabase(compressed, "gallery-images")
      setFormData(prev => ({ ...prev, image_url: url }))
      alert('Image uploaded successfully!')
    } catch (error) {
      console.error("Upload error:", error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      alert(`Failed to upload image: ${errorMessage}\n\nPlease make sure:\n1. Supabase credentials are set in .env.local\n2. Storage bucket "gallery-images" exists in Supabase\n3. Bucket is set to public`)
    } finally {
      setUploading(false)
    }
  }

  const filteredImages = filterCategory === "All" 
    ? images 
    : images.filter(img => img.category === filterCategory)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Gallery</h1>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Upload New Image</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Image Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg bg-white"
                required
              >
                {CATEGORIES.filter(cat => cat !== "All").map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Upload Image</label>
            <label className="w-full px-4 py-3 bg-gray-100 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-200 flex flex-col items-center justify-center gap-2">
              {uploading ? (
                <>
                  <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                  <span className="text-sm text-gray-600">Uploading and compressing...</span>
                </>
              ) : formData.image_url ? (
                <>
                  <img src={formData.image_url} alt="Preview" className="max-h-48 object-contain rounded" />
                  <span className="text-sm text-green-600">✓ Image uploaded - Click to change</span>
                </>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-600">Click to upload image</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || uploading || !formData.image_url}
            className="w-full bg-[#276EF1] text-white px-4 py-3 rounded-lg hover:bg-[#1e5acc] disabled:opacity-50 font-medium"
          >
            {loading ? "Saving..." : "Add to Gallery"}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {/* Category Filter */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Gallery Images ({filteredImages.length})</h2>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filterCategory === category
                    ? "bg-gradient-to-r from-[#276EF1] to-[#37D2C5] text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <div key={image.id} className="bg-white rounded-xl border overflow-hidden group">
              <div className="relative aspect-video bg-gray-100">
                {image.image_url ? (
                  <img 
                    src={image.image_url} 
                    alt={image.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Upload className="w-12 h-12 text-gray-300" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(image.id)}
                    className="opacity-0 group-hover:opacity-100 bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <p className="font-medium text-sm truncate">{image.title}</p>
                {image.category && (
                  <p className="text-xs text-gray-500 bg-gray-100 inline-block px-2 py-1 rounded-full mt-1">
                    {image.category}
                  </p>
                )}
              </div>
            </div>
          ))}

          {filteredImages.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              No images in this category yet.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
