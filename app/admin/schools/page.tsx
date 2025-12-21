"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Upload, Trash2, Loader2, Plus, Building2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface School {
  id: string
  name: string
  logo_url: string | null
  banner_url: string | null
  created_at: string
}

export default function ManageSchoolsPage() {
  const searchParams = useSearchParams()
  const [schools, setSchools] = useState<School[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [name, setName] = useState("")
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [bannerFile, setBannerFile] = useState<File | null>(null)
  const [bannerPreview, setBannerPreview] = useState<string | null>(null)
  const supabase = createClient()

  // Check if action=add is in the URL
  useEffect(() => {
    if (searchParams.get('action') === 'add') {
      setShowForm(true)
    }
  }, [searchParams])

  useEffect(() => {
    loadSchools()
  }, [])

  useEffect(() => {
    if (bannerFile) {
      const url = URL.createObjectURL(bannerFile)
      setBannerPreview(url)
      return () => URL.revokeObjectURL(url)
    } else {
      setBannerPreview(null)
    }
  }, [bannerFile])

  const loadSchools = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await supabase
        .from("schools")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setSchools(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("Failed to load schools:", err)
      setSchools([])
    } finally {
      setIsLoading(false)
    }
  }

  const uploadFile = async (file: File, folder: string): Promise<string> => {
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `${folder}/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from("images")
      .getPublicUrl(filePath)

    return publicUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !bannerFile) {
      alert("Please provide school name and banner image")
      return
    }

    try {
      setIsUploading(true)

      let logoUrl = null
      if (logoFile) {
        logoUrl = await uploadFile(logoFile, "logos")
      }

      const bannerUrl = await uploadFile(bannerFile, "banners")

      const { error } = await supabase
        .from("schools")
        .insert([{ name: name.trim(), logo_url: logoUrl, banner_url: bannerUrl }])

      if (error) throw error

      // Reset form
      setName("")
      setLogoFile(null)
      setBannerFile(null)
      setBannerPreview(null)
      setShowForm(false)
      
      // Clear URL params
      window.history.replaceState({}, '', '/admin/schools')
      
      await loadSchools()
      alert("School added successfully!")
    } catch (error: any) {
      alert(`Failed: ${error.message}`)
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this school?")) return

    try {
      const { error } = await supabase.from("schools").delete().eq("id", id)
      if (error) throw error
      await loadSchools()
    } catch (error) {
      alert("Failed to delete")
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setName("")
    setLogoFile(null)
    setBannerFile(null)
    setBannerPreview(null)
    window.history.replaceState({}, '', '/admin/schools')
  }

  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Schools</h1>
          <p className="text-gray-500 mt-1">Manage school banners for the homepage slideshow</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Add School
        </Button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-white rounded-xl border p-6">
          <h2 className="text-lg font-semibold mb-6">Add New School</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">School Name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter school name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo">Logo (Optional)</Label>
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="banner">Banner Image (Required) *</Label>
              <Input
                id="banner"
                type="file"
                accept="image/*"
                onChange={(e) => setBannerFile(e.target.files?.[0] || null)}
                required
              />
              <p className="text-xs text-gray-500">This will appear in the homepage slideshow</p>
            </div>
            {bannerPreview && (
              <img src={bannerPreview} alt="Preview" className="w-full max-w-md h-40 object-cover rounded-lg" />
            )}
            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={isUploading}>
                {isUploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                {isUploading ? "Uploading..." : "Add School"}
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search schools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Schools Grid */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : filteredSchools.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSchools.map((school) => (
            <div key={school.id} className="bg-white rounded-xl border overflow-hidden group">
              <div className="relative aspect-video bg-gray-100">
                {school.banner_url ? (
                  <img src={school.banner_url} alt={school.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Building2 className="w-12 h-12 text-gray-300" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(school.id)}
                    className="opacity-0 group-hover:opacity-100 bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-4 flex items-center gap-3">
                {school.logo_url && (
                  <img src={school.logo_url} alt="" className="w-10 h-10 object-contain rounded" />
                )}
                <div>
                  <p className="font-medium">{school.name}</p>
                  <p className="text-xs text-gray-500">{new Date(school.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border">
          <Building2 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="font-medium text-gray-900">No schools found</p>
          <p className="text-sm text-gray-500 mt-1">Add your first school to get started</p>
        </div>
      )}
    </div>
  )
}
