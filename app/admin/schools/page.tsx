"use client"

import { useState, useEffect } from "react"
import { Pencil, Trash2, Upload, Loader2 } from "lucide-react"
import { compressImage, uploadToSupabase } from "@/lib/image-compression"

interface School {
  id: string
  name: string
  logo_url: string | null
  banner_url: string | null
}

export default function AdminSchoolsPage() {
  const [schools, setSchools] = useState<School[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [currentSchool, setCurrentSchool] = useState<School | null>(null)
  const [formData, setFormData] = useState({ name: "", logo_url: "", banner_url: "" })
  const [uploading, setUploading] = useState(false)
  const [uploadingBanner, setUploadingBanner] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchSchools()
  }, [])

  const fetchSchools = async () => {
    const res = await fetch("/api/schools")
    const data = await res.json()
    setSchools(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const method = currentSchool ? "PUT" : "POST"
      const url = currentSchool ? `/api/schools/${currentSchool.id}` : "/api/schools"

      console.log('Submitting school:', { method, url, data: formData })

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save school')
      }

      const result = await response.json()
      console.log('School saved:', result)

      alert(currentSchool ? 'School updated successfully!' : 'School added successfully!')
      
      setFormData({ name: "", logo_url: "", banner_url: "" })
      setCurrentSchool(null)
      setIsEditing(false)
      await fetchSchools()
    } catch (error) {
      console.error('Error saving school:', error)
      alert(`Failed to save school: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (school: School) => {
    setCurrentSchool(school)
    setFormData({ name: school.name, logo_url: school.logo_url || "", banner_url: school.banner_url || "" })
    setIsEditing(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this school?")) {
      await fetch(`/api/schools/${id}`, { method: "DELETE" })
      fetchSchools()
    }
  }

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const compressed = await compressImage(file)
      const url = await uploadToSupabase(compressed, "school-logos")
      setFormData(prev => ({ ...prev, logo_url: url }))
      alert('Logo uploaded successfully!')
    } catch (error) {
      console.error("Upload error:", error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      alert(`Failed to upload image: ${errorMessage}\n\nPlease make sure:\n1. Supabase credentials are set in .env.local\n2. Storage bucket "school-logos" exists in Supabase\n3. Bucket is set to public`)
    } finally {
      setUploading(false)
    }
  }

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingBanner(true)
    try {
      const compressed = await compressImage(file)
      const url = await uploadToSupabase(compressed, "school-logos", "banners")
      setFormData(prev => ({ ...prev, banner_url: url }))
      alert('Banner uploaded successfully!')
    } catch (error) {
      console.error("Upload error:", error)
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      alert(`Failed to upload banner: ${errorMessage}`)
    } finally {
      setUploadingBanner(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Schools</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            {isEditing ? "Edit School" : "Add New School"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">School Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">School Logo</label>
              <label className="w-full px-4 py-2 bg-gray-100 border rounded-lg cursor-pointer hover:bg-gray-200 flex items-center justify-center gap-2">
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Upload Logo
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
              {formData.logo_url && (
                <img src={formData.logo_url} alt="Preview" className="mt-2 h-16 object-contain border rounded p-2" />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">School Banner (for slideshow)</label>
              <label className="w-full px-4 py-2 bg-gray-100 border rounded-lg cursor-pointer hover:bg-gray-200 flex items-center justify-center gap-2">
                {uploadingBanner ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Upload Banner
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerUpload}
                  className="hidden"
                  disabled={uploadingBanner}
                />
              </label>
              {formData.banner_url && (
                <img src={formData.banner_url} alt="Banner Preview" className="mt-2 h-32 w-full object-cover border rounded" />
              )}
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading || uploading || uploadingBanner}
                className="flex-1 bg-[#276EF1] text-white px-4 py-2 rounded-lg hover:bg-[#1e5acc] disabled:opacity-50"
              >
                {loading ? "Saving..." : isEditing ? "Update School" : "Add School"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false)
                    setCurrentSchool(null)
                    setFormData({ name: "", logo_url: "", banner_url: "" })
                  }}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Schools List ({schools.length})</h2>
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {schools.map((school) => (
              <div key={school.id} className="border rounded-lg p-3 hover:bg-gray-50">
                {school.banner_url && (
                  <img src={school.banner_url} alt={school.name} className="w-full h-24 object-cover rounded mb-2" />
                )}
                <div className="flex items-center gap-3">
                  {school.logo_url ? (
                    <img src={school.logo_url} alt={school.name} className="h-10 w-10 object-contain" />
                  ) : (
                    <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center text-xs">
                      No Logo
                    </div>
                  )}
                  <span className="flex-1 font-medium">{school.name}</span>
                  <button
                    onClick={() => handleEdit(school)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(school.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
