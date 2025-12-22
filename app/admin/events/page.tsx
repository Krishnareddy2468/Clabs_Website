"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Plus, Trash2, Loader2, Calendar, Search, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image_url: string | null;
  amount: number;
  total_seats: number;
  available_seats: number;
  created_at: string;
}

function EventsPageContent() {
  const searchParams = useSearchParams();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [amount, setAmount] = useState("");
  const [totalSeats, setTotalSeats] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const supabase = createClient();

  // Check if action=create is in the URL
  useEffect(() => {
    if (searchParams.get("action") === "create") {
      setShowForm(true);
    }
  }, [searchParams]);

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImagePreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setImagePreview(null);
    }
  }, [imageFile]);

  const loadEvents = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (error) throw error;
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load events:", err);
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadFile = async (file: File): Promise<string> => {
    try {
      const fileExt = file.name.split(".").pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const filePath = fileName

      const { error: uploadError } = await supabase.storage
        .from("event-images")  // Changed from "images" to "event-images"
        .upload(filePath, file)

      if (uploadError) {
        console.error("Upload error:", uploadError)
        throw new Error(`Upload failed: ${uploadError.message}`)
      }

      const { data: { publicUrl } } = supabase.storage
        .from("event-images")  // Changed from "images" to "event-images"
        .getPublicUrl(filePath)

      return publicUrl
    } catch (error: any) {
      throw new Error(error.message || "Failed to upload file")
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date || !location.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setIsSubmitting(true);

      let imageUrl = editingEvent?.image_url || null;
      if (imageFile) {
        imageUrl = await uploadFile(imageFile);
      }

      const seats = parseInt(totalSeats) || 100;
      const eventData = {
        title: title.trim(),
        description: description.trim(),
        date,
        location: location.trim(),
        amount: parseFloat(amount) || 0,
        total_seats: seats,
        available_seats: editingEvent ? editingEvent.available_seats : seats,
        image_url: imageUrl,
      };

      if (editingEvent) {
        // Update existing event
        const { error } = await supabase
          .from("events")
          .update(eventData)
          .eq("id", editingEvent.id);

        if (error) throw error;
        alert("Event updated successfully!");
      } else {
        // Create new event
        const { error } = await supabase
          .from("events")
          .insert([eventData]);

        if (error) throw error;
        alert("Event created successfully!");
      }

      // Reset form
      resetForm();
      await loadEvents();
    } catch (error: any) {
      alert(`Failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDate("");
    setLocation("");
    setAmount("");
    setTotalSeats("");
    setImageFile(null);
    setImagePreview(null);
    setShowForm(false);
    setEditingEvent(null);
    window.history.replaceState({}, "", "/admin/events");
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setTitle(event.title);
    setDescription(event.description);
    setDate(event.date.slice(0, 16)); // Format for datetime-local input
    setLocation(event.location);
    setAmount(event.amount.toString());
    setTotalSeats(event.total_seats.toString());
    setImagePreview(event.image_url);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this event?")) return;

    try {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) throw error;
      await loadEvents();
    } catch (error) {
      alert("Failed to delete");
    }
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-500 mt-1">
            Manage upcoming events and registrations
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </Button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="bg-white rounded-xl border p-6">
          <h2 className="text-lg font-semibold mb-6">
            {editingEvent ? "Edit Event" : "Create New Event"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter event title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Event Date *</Label>
                <Input
                  id="date"
                  type="datetime-local"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter event location"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Registration Fee (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0 for free events"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalSeats">Total Seats *</Label>
                <Input
                  id="totalSeats"
                  type="number"
                  min="1"
                  value={totalSeats}
                  onChange={(e) => setTotalSeats(e.target.value)}
                  placeholder="100"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter event description"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Event Image (Optional)</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
            </div>

            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="w-full max-w-md h-40 object-cover rounded-lg" />
            )}

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                {isSubmitting ? (editingEvent ? "Updating..." : "Creating...") : (editingEvent ? "Update Event" : "Create Event")}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
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
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Events List */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : filteredEvents.length > 0 ? (
        <div className="bg-white rounded-xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Event
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Location
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Fee
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Seats
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {event.image_url ? (
                          <img
                            src={event.image_url}
                            alt=""
                            className="w-12 h-12 object-cover rounded"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{event.title}</p>
                          <p className="text-sm text-gray-500 line-clamp-1">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {formatDate(event.date)}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {event.location}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {event.amount > 0 ? `₹${event.amount}` : "Free"}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span className={`font-medium ${
                        event.available_seats === 0 ? "text-red-600" : 
                        event.available_seats < 10 ? "text-orange-600" : 
                        "text-green-600"
                      }`}>
                        {event.available_seats}/{event.total_seats}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(event)}
                          className="text-blue-500 hover:text-blue-700 p-2"
                          title="Edit event"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="text-red-500 hover:text-red-700 p-2"
                          title="Delete event"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border">
          <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="font-medium text-gray-900">No events found</p>
          <p className="text-sm text-gray-500 mt-1">
            Create your first event to get started
          </p>
        </div>
      )}
    </div>
  );
}

export default function ManageEventsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-[#276EF1] border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <EventsPageContent />
    </Suspense>
  );
}
