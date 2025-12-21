"use client"

import { useState, useEffect } from "react"
import { Trash2, Upload, Loader2 } from "lucide-react"
import { compressImage, uploadToSupabase } from "@/lib/image-compression"

interface Banner {
  id: string
  title: string
  image_url: string
  created_at: string
}

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [formData, setFormData] = useState({ title: "", image_url: "" })
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchBanners()
  }, [])

  const fetchBanners = async () => {
    const res = await fetch("/api/banners")
    const data = await res.json()
    setBanners(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/banners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to add banner')
      }

      alert('Banner added successfully!')
      setFormData({ title: "", image_url: "" })
      await fetchBanners()
    } catch (error) {
      console.error('Error adding banner:', error)
      alert('Failed to add banner')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this banner?")) {
      await fetch(`/api/banners/${id}`, { method: "DELETE" })
      fetchBanners()
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const compressed = await compressImage(file)
      const url = await uploadToSupabase(compressed, "school-logos", "banners")
      setFormData(prev => ({ ...prev, image_url: url }))
      alert('Banner image uploaded successfully!')
    } catch (error) {
      console.error("Upload error:", error)
      alert("Failed to upload banner image")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage School Banners</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Upload New Banner</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Banner Title / School Name</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="e.g., ABC School Campus"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Banner Image</label>
              <label className="w-full px-4 py-3 bg-gray-100 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-200 flex flex-col items-center justify-center gap-2">
                {uploading ? (
                  <>
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                    <span className="text-sm text-gray-600">Uploading and compressing...</span>
                  </>
                ) : formData.image_url ? (
                  <>
                    <img src={formData.image_url} alt="Preview" className="max-h-48 w-full object-cover rounded" />
                    <span className="text-sm text-green-600">✓ Image uploaded - Click to change</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-400" />
                    <span className="text-sm text-gray-600">Click to upload banner image</span>
                    <span className="text-xs text-gray-500">Recommended: 1920x1080 (landscape)</span>
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
              {loading ? "Adding..." : "Add Banner"}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Banners List ({banners.length})</h2>
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {banners.map((banner) => (
              <div key={banner.id} className="relative group border rounded-lg overflow-hidden">
                <img
                  src={banner.image_url}
                  alt={banner.title}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(banner.id)}
                    className="opacity-0 group-hover:opacity-100 bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-3 bg-white">
                  <p className="font-medium text-sm">{banner.title}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(banner.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}

            {banners.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p>No banners uploaded yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
