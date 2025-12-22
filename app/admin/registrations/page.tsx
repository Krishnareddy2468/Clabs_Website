"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Users, Calendar, Download, Search, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const supabase = createClient();

  useEffect(() => {
    loadRegistrations();
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
        <Button onClick={exportToCSV} disabled={filteredRegistrations.length === 0}>
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
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
    </div>
  );
}
