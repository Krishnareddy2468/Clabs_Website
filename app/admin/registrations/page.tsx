"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Users, Calendar, Download, Search, CheckCircle, XCircle, Plus, Pencil, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Registration {
  id: string;
  event_id: string;
  student_name: string;
  father_name: string;
  school_college: string;
  class: string;
  mobile_number: string;
  aadhaar_number: string;
  city: string;
  state: string;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  amount_paid: number;
  payment_status: string;
  created_at: string;
  events?: {
    title: string;
    date: string;
  };
}

interface Event {
  id: string;
  title: string;
  date: string;
}

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [showModal, setShowModal] = useState(false);
  const [editingReg, setEditingReg] = useState<Registration | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [formData, setFormData] = useState({
    event_id: "",
    student_name: "",
    father_name: "",
    school_college: "",
    class: "",
    mobile_number: "",
    aadhaar_number: "",
    city: "",
    state: "",
    amount_paid: 0,
    payment_status: "completed",
  });

  const supabase = createClient();

  useEffect(() => {
    loadRegistrations();
    loadEvents();
  }, []);

  const loadRegistrations = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/registrations");
      const data = await response.json();

      if (!response.ok) throw new Error(data.error);
      setRegistrations(Array.isArray(data.registrations) ? data.registrations : []);
    } catch (err) {
      console.error("Failed to load registrations:", err);
      setRegistrations([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadEvents = async () => {
    try {
      const response = await fetch("/api/events");
      const data = await response.json();
      setEvents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load events:", err);
    }
  };

  const handleAdd = () => {
    setEditingReg(null);
    setFormData({
      event_id: "",
      student_name: "",
      father_name: "",
      school_college: "",
      class: "",
      mobile_number: "",
      aadhaar_number: "",
      city: "",
      state: "",
      amount_paid: 0,
      payment_status: "completed",
    });
    setShowModal(true);
  };

  const handleEdit = (reg: Registration) => {
    setEditingReg(reg);
    setFormData({
      event_id: reg.event_id,
      student_name: reg.student_name,
      father_name: reg.father_name,
      school_college: reg.school_college,
      class: reg.class,
      mobile_number: reg.mobile_number,
      aadhaar_number: reg.aadhaar_number,
      city: reg.city,
      state: reg.state,
      amount_paid: reg.amount_paid,
      payment_status: reg.payment_status,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this registration?")) return;

    try {
      const { error } = await supabase
        .from("event_registrations")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      alert("Registration deleted successfully!");
      loadRegistrations();
    } catch (err: any) {
      console.error("Failed to delete registration:", err);
      alert(err.message || "Failed to delete registration");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingReg) {
        // Update existing
        const { error } = await supabase
          .from("event_registrations")
          .update(formData)
          .eq("id", editingReg.id);

        if (error) throw error;
        alert("Registration updated successfully!");
      } else {
        // Create new
        const { error } = await supabase
          .from("event_registrations")
          .insert([formData]);

        if (error) throw error;
        alert("Registration added successfully!");
      }

      setShowModal(false);
      loadRegistrations();
    } catch (err: any) {
      console.error("Failed to save registration:", err);
      alert(err.message || "Failed to save registration");
    }
  };

  const filteredRegistrations = registrations.filter((reg) => {
    const matchesSearch = 
      reg.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reg.mobile_number.includes(searchQuery) ||
      reg.events?.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = 
      filterStatus === "all" || reg.payment_status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const exportToCSV = () => {
    const headers = [
      "Registration Date",
      "Event",
      "Event Date",
      "Student Name",
      "Father Name",
      "School/College",
      "Class",
      "Mobile",
      "Aadhaar",
      "City",
      "State",
      "Amount Paid",
      "Payment Status",
      "Payment ID",
      "Order ID",
    ];

    const rows = filteredRegistrations.map((reg) => [
      formatDate(reg.created_at),
      reg.events?.title || "N/A",
      reg.events?.date ? formatDate(reg.events.date) : "N/A",
      reg.student_name,
      reg.father_name,
      reg.school_college,
      reg.class,
      reg.mobile_number,
      reg.aadhaar_number,
      reg.city,
      reg.state,
      `₹${reg.amount_paid}`,
      reg.payment_status,
      reg.razorpay_payment_id || "N/A",
      reg.razorpay_order_id || "N/A",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `event-registrations-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const stats = {
    total: registrations.length,
    completed: registrations.filter((r) => r.payment_status === "completed").length,
    pending: registrations.filter((r) => r.payment_status === "pending").length,
    totalRevenue: registrations
      .filter((r) => r.payment_status === "completed")
      .reduce((sum, r) => sum + r.amount_paid, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Event Registrations</h1>
          <p className="text-gray-500 mt-1">
            View and manage all event registrations
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleAdd} variant="default">
            <Plus className="w-4 h-4 mr-2" />
            Add Registration
          </Button>
          <Button onClick={exportToCSV} disabled={filteredRegistrations.length === 0} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Registrations</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold text-purple-600">₹</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₹{stats.totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by name, mobile, or event..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterStatus === "all" ? "default" : "outline"}
            onClick={() => setFilterStatus("all")}
            size="sm"
          >
            All
          </Button>
          <Button
            variant={filterStatus === "completed" ? "default" : "outline"}
            onClick={() => setFilterStatus("completed")}
            size="sm"
          >
            Completed
          </Button>
          <Button
            variant={filterStatus === "pending" ? "default" : "outline"}
            onClick={() => setFilterStatus("pending")}
            size="sm"
          >
            Pending
          </Button>
        </div>
      </div>

      {/* Registrations Table */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : filteredRegistrations.length > 0 ? (
        <div className="bg-white rounded-xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Event
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Student
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Contact
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    School/College
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredRegistrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {formatDate(reg.created_at)}
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">
                          {reg.events?.title || "Unknown Event"}
                        </p>
                        {reg.events?.date && (
                          <p className="text-xs text-gray-500">
                            {formatDate(reg.events.date)}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{reg.student_name}</p>
                        <p className="text-xs text-gray-500">
                          Class: {reg.class}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      <div>
                        <p>{reg.mobile_number}</p>
                        <p className="text-xs text-gray-500">
                          {reg.city}, {reg.state}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {reg.school_college}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">
                      ₹{reg.amount_paid}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          reg.payment_status === "completed"
                            ? "bg-green-100 text-green-800"
                            : reg.payment_status === "pending"
                            ? "bg-orange-100 text-orange-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {reg.payment_status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(reg)}
                        >
                          <Pencil className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(reg.id)}
                          className="text-red-600 hover:text-red-700 hover:border-red-300"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
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
          <p className="font-medium text-gray-900">No registrations found</p>
          <p className="text-sm text-gray-500 mt-1">
            {searchQuery || filterStatus !== "all"
              ? "Try adjusting your filters"
              : "Registrations will appear here when users sign up for events"}
          </p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  {editingReg ? "Edit Registration" : "Add New Registration"}
                </h2>
                <p className="text-blue-100 text-sm mt-1">
                  {editingReg ? "Update registration details" : "Fill in all required fields"}
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="space-y-6">
                {/* Event Selection */}
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                    Event <span className="text-red-500">*</span>
                  </Label>
                  <select
                    required
                    value={formData.event_id}
                    onChange={(e) => setFormData({ ...formData, event_id: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  >
                    <option value="">Select Event</option>
                    {events.map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.title} - {new Date(event.date).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Student Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        required
                        value={formData.student_name}
                        onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                        className="px-4 py-3"
                        placeholder="Enter student name"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Father Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        required
                        value={formData.father_name}
                        onChange={(e) => setFormData({ ...formData, father_name: e.target.value })}
                        className="px-4 py-3"
                        placeholder="Enter father's name"
                      />
                    </div>
                  </div>
                </div>

                {/* Academic Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-green-600 rounded-full"></div>
                    Academic Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        School/College <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        required
                        value={formData.school_college}
                        onChange={(e) => setFormData({ ...formData, school_college: e.target.value })}
                        className="px-4 py-3"
                        placeholder="Enter school/college name"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Class <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        required
                        value={formData.class}
                        onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                        className="px-4 py-3"
                        placeholder="e.g., 10th A"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-purple-600 rounded-full"></div>
                    Contact Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Mobile Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        required
                        type="tel"
                        value={formData.mobile_number}
                        onChange={(e) => setFormData({ ...formData, mobile_number: e.target.value })}
                        className="px-4 py-3"
                        placeholder="10-digit mobile number"
                        maxLength={10}
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Aadhaar Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        required
                        value={formData.aadhaar_number}
                        onChange={(e) => setFormData({ ...formData, aadhaar_number: e.target.value })}
                        className="px-4 py-3"
                        placeholder="12-digit Aadhaar number"
                        maxLength={12}
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        City <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="px-4 py-3"
                        placeholder="Enter city"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        State <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="px-4 py-3"
                        placeholder="Enter state"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-orange-600 rounded-full"></div>
                    Payment Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Amount Paid (₹) <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        required
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.amount_paid || ""}
                        onChange={(e) => setFormData({ ...formData, amount_paid: parseFloat(e.target.value) || 0 })}
                        className="px-4 py-3"
                        placeholder="0.00"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Payment Status <span className="text-red-500">*</span>
                      </Label>
                      <select
                        required
                        value={formData.payment_status}
                        onChange={(e) => setFormData({ ...formData, payment_status: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                      >
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 mt-6 border-t sticky bottom-0 bg-white">
                <Button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 text-base font-semibold shadow-lg"
                >
                  {editingReg ? "Update Registration" : "Add Registration"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowModal(false)}
                  className="px-8 py-3 text-base font-medium"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
