"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Loader2, Video, Edit, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FeaturedVideo {
  id: string;
  title: string;
  description: string;
  youtube_url: string;
  display_order: number;
  active: boolean;
  created_at: string;
}

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<FeaturedVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState<FeaturedVideo | null>(null);

  // Form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [displayOrder, setDisplayOrder] = useState("0");
  const [active, setActive] = useState(true);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/videos");
      const data = await response.json();

      if (!response.ok) throw new Error(data.error);
      setVideos(Array.isArray(data.videos) ? data.videos : []);
    } catch (err) {
      console.error("Failed to load videos:", err);
      setVideos([]);
    } finally {
      setIsLoading(false);
    }
  };

  const extractYouTubeId = (url: string): string | null => {
    const patterns = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !youtubeUrl.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setIsSubmitting(true);

      const videoData = {
        title: title.trim(),
        description: description.trim(),
        youtube_url: youtubeUrl.trim(),
        display_order: parseInt(displayOrder) || 0,
        active,
      };

      if (editingVideo) {
        // Update existing video
        const response = await fetch(`/api/videos/${editingVideo.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(videoData),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error);
        }

        alert("Video updated successfully!");
      } else {
        // Create new video
        const response = await fetch("/api/videos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(videoData),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error);
        }

        alert("Video added successfully!");
      }

      resetForm();
      await loadVideos();
    } catch (error: any) {
      alert(`Failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setYoutubeUrl("");
    setDisplayOrder("0");
    setActive(true);
    setShowForm(false);
    setEditingVideo(null);
  };

  const handleEdit = (video: FeaturedVideo) => {
    setEditingVideo(video);
    setTitle(video.title);
    setDescription(video.description || "");
    setYoutubeUrl(video.youtube_url);
    setDisplayOrder(video.display_order.toString());
    setActive(video.active);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this video?")) return;

    try {
      const response = await fetch(`/api/videos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }

      await loadVideos();
    } catch (error: any) {
      alert(`Failed to delete: ${error.message}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Featured Videos</h1>
          <p className="text-gray-500 mt-1">
            Manage YouTube videos displayed on the website
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Video
        </Button>
      </div>

      {/* Create/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">
              {editingVideo ? "Edit Video" : "Add New Video"}
            </h2>
            <button
              onClick={resetForm}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="title">Video Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter video title"
                  required
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="youtubeUrl">YouTube URL *</Label>
                <Input
                  id="youtubeUrl"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                />
                <p className="text-xs text-gray-500">
                  Paste the full YouTube video URL or embed link
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="displayOrder">Display Order</Label>
                <Input
                  id="displayOrder"
                  type="number"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(e.target.value)}
                  placeholder="0"
                />
              </div>

              <div className="space-y-2 flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm font-medium">Active</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter video description"
                rows={3}
              />
            </div>

            {/* Preview */}
            {youtubeUrl && extractYouTubeId(youtubeUrl) && (
              <div className="space-y-2">
                <Label>Preview</Label>
                <div className="aspect-video w-full max-w-2xl">
                  <iframe
                    src={`https://www.youtube.com/embed/${extractYouTubeId(youtubeUrl)}`}
                    className="w-full h-full rounded-lg"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4 mr-2" />
                )}
                {isSubmitting
                  ? editingVideo
                    ? "Updating..."
                    : "Adding..."
                  : editingVideo
                  ? "Update Video"
                  : "Add Video"}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Videos List */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : videos.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => {
            const videoId = extractYouTubeId(video.youtube_url);
            return (
              <div
                key={video.id}
                className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-gray-100">
                  {videoId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Video className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                      {video.title}
                    </h3>
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        video.active
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {video.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  {video.description && (
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {video.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Order: {video.display_order}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(video)}
                        className="text-blue-500 hover:text-blue-700 p-1"
                        title="Edit video"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(video.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        title="Delete video"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border">
          <Video className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="font-medium text-gray-900">No videos found</p>
          <p className="text-sm text-gray-500 mt-1">
            Add your first featured video to get started
          </p>
        </div>
      )}
    </div>
  );
}
