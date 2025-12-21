"use client";

import { useState, useEffect } from "react";
import { Pencil, Trash2, Upload, Loader2, IndianRupee } from "lucide-react";
import { compressImage, uploadToSupabase } from "@/lib/image-compression";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image_url: string | null;
  amount: number;
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    image_url: "",
    amount: 0,
  });
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await fetch("/api/events");
    const data = await res.json();
    setEvents(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const method = currentEvent ? "PUT" : "POST";
      const url = currentEvent ? `/api/events/${currentEvent.id}` : "/api/events";

      console.log('Submitting event:', { method, url, data: formData });

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save event');
      }

      const result = await response.json();
      console.log('Event saved:', result);

      alert(currentEvent ? 'Event updated successfully!' : 'Event created successfully!');

      setFormData({ title: "", description: "", date: "", location: "", image_url: "", amount: 0 });
      setCurrentEvent(null);
      setIsEditing(false);
      await fetchEvents();
    } catch (error) {
      console.error('Error saving event:', error);
      alert(`Failed to save event: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event: Event) => {
    setCurrentEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date.split("T")[0],
      location: event.location,
      image_url: event.image_url || "",
      amount: event.amount || 0,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      await fetch(`/api/events/${id}`, { method: "DELETE" });
      fetchEvents();
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const compressed = await compressImage(file);
      const url = await uploadToSupabase(compressed, "event-images");
      setFormData((prev) => ({ ...prev, image_url: url }));
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error("Upload error:", error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Failed to upload image: ${errorMessage}\n\nPlease make sure:\n1. Supabase credentials are set in .env.local\n2. Storage bucket "event-images" exists in Supabase\n3. Bucket is set to public`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Events</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">{isEditing ? "Edit Event" : "Create New Event"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Event Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Event Amount (₹)</label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                  className="w-full pl-10 pr-3 py-2 border rounded-lg"
                  placeholder="0.00"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Enter 0 for free events</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Event Image</label>
              <label className="w-full px-4 py-2 bg-gray-100 border rounded-lg cursor-pointer hover:bg-gray-200 flex items-center justify-center gap-2">
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Upload Image
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
              {formData.image_url && (
                <img src={formData.image_url} alt="Preview" className="mt-2 h-32 object-cover w-full rounded border" />
              )}
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading || uploading}
                className="flex-1 bg-[#276EF1] text-white px-4 py-2 rounded-lg hover:bg-[#1e5acc] disabled:opacity-50"
              >
                {loading ? "Saving..." : isEditing ? "Update Event" : "Create Event"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setCurrentEvent(null);
                    setFormData({ title: "", description: "", date: "", location: "", image_url: "", amount: 0 });
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
          <h2 className="text-xl font-semibold mb-4">Events List ({events.length})</h2>
          <div className="space-y-3 max-h-[700px] overflow-y-auto">
            {events.map((event) => (
              <div key={event.id} className="border rounded-lg p-4 hover:bg-gray-50">
                {event.image_url && (
                  <img src={event.image_url} alt={event.title} className="w-full h-32 object-cover rounded mb-3" />
                )}
                <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{event.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <IndianRupee className="w-4 h-4 text-green-600" />
                  <span className="font-semibold text-green-600">
                    {event.amount === 0 ? "Free" : `₹${event.amount.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(event)}
                    className="flex-1 px-3 py-2 text-blue-600 bg-blue-50 rounded hover:bg-blue-100 flex items-center justify-center gap-2"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="flex-1 px-3 py-2 text-red-600 bg-red-50 rounded hover:bg-red-100 flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
