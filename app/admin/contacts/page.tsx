"use client"

import { useState, useEffect } from "react"
import { Mail, Phone, MessageSquare, Loader2, Eye, X, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Contact {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  status: string
  created_at: string
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [filter, setFilter] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      setIsLoading(true)
      const res = await fetch("/api/contacts")
      const data = await res.json()
      setContacts(Array.isArray(data.contacts) ? data.contacts : [])
    } catch (error) {
      console.error("Failed to fetch contacts:", error)
      setContacts([])
    } finally {
      setIsLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      fetchContacts()
    } catch (error) {
      console.error("Failed to update status:", error)
    }
  }

  const filteredContacts = contacts.filter(c => 
    filter === "all" || c.status === filter
  )

  const exportToCSV = () => {
    const headers = ["Date", "Name", "Email", "Phone", "Message", "Status"]
    const rows = filteredContacts.map(c => [
      new Date(c.created_at).toLocaleDateString(),
      c.name,
      c.email,
      c.phone || "N/A",
      c.message.replace(/"/g, '""'),
      c.status,
    ])

    const csv = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `contacts-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
          <p className="text-gray-500 mt-1">
            Manage inquiries from the contact form
          </p>
        </div>
        <Button onClick={exportToCSV} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="flex gap-2">
        {["all", "unread", "read", "replied"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg capitalize transition-colors ${
              filter === f
                ? "bg-[#276EF1] text-white"
                : "bg-white border hover:bg-gray-50"
            }`}
          >
            {f} ({contacts.filter(c => f === "all" || c.status === f).length})
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : filteredContacts.length > 0 ? (
        <div className="bg-white rounded-xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Contact
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Message
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Status
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(contact.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-gray-900">{contact.name}</p>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3 h-3" />
                          <a href={`mailto:${contact.email}`} className="hover:text-[#276EF1]">
                            {contact.email}
                          </a>
                        </div>
                        {contact.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-3 h-3" />
                            <a href={`tel:${contact.phone}`} className="hover:text-[#276EF1]">
                              {contact.phone}
                            </a>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 max-w-md">
                      <p className="line-clamp-2">{contact.message}</p>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={contact.status}
                        onChange={(e) => updateStatus(contact.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          contact.status === "unread"
                            ? "bg-red-100 text-red-700 border-red-200"
                            : contact.status === "read"
                            ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                            : "bg-green-100 text-green-700 border-green-200"
                        }`}
                      >
                        <option value="unread">Unread</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedContact(contact)}
                        className="text-blue-500 hover:text-blue-700 p-2"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border">
          <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="font-medium text-gray-900">No messages found</p>
          <p className="text-sm text-gray-500 mt-1">
            {filter === "all" 
              ? "Contact messages will appear here"
              : `No ${filter} messages`}
          </p>
        </div>
      )}

      {selectedContact && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-semibold">Message Details</h2>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">From</label>
                <p className="text-gray-900 font-medium">{selectedContact.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Email</label>
                <p className="text-gray-900">
                  <a href={`mailto:${selectedContact.email}`} className="text-[#276EF1] hover:underline">
                    {selectedContact.email}
                  </a>
                </p>
              </div>
              {selectedContact.phone && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <p className="text-gray-900">
                    <a href={`tel:${selectedContact.phone}`} className="text-[#276EF1] hover:underline">
                      {selectedContact.phone}
                    </a>
                  </p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-gray-500">Date</label>
                <p className="text-gray-900">
                  {new Date(selectedContact.created_at).toLocaleString()}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Message</label>
                <p className="text-gray-900 whitespace-pre-wrap">{selectedContact.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
