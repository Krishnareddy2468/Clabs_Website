"use client"

import { useState, useEffect } from "react"
import { Mail, Phone, MessageSquare, Check, X } from "lucide-react"

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

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    const res = await fetch("/api/contacts")
    const data = await res.json()
    setContacts(data)
  }

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    fetchContacts()
  }

  const filteredContacts = contacts.filter(c => 
    filter === "all" || c.status === filter
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Contact Responses</h1>
        <div className="flex gap-2">
          {["all", "new", "contacted", "resolved"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg capitalize ${
                filter === f
                  ? "bg-[#276EF1] text-white"
                  : "bg-white border hover:bg-gray-50"
              }`}
            >
              {f} ({contacts.filter(c => f === "all" || c.status === f).length})
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredContacts.map((contact) => (
          <div key={contact.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{contact.name}</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${contact.email}`} className="hover:text-[#276EF1]">
                      {contact.email}
                    </a>
                  </div>
                  {contact.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <a href={`tel:${contact.phone}`} className="hover:text-[#276EF1]">
                        {contact.phone}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-xs text-gray-500">
                      {new Date(contact.created_at).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <select
                value={contact.status}
                onChange={(e) => updateStatus(contact.id, e.target.value)}
                className={`px-3 py-1 rounded-full text-sm font-medium border-2 ${
                  contact.status === "new"
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : contact.status === "contacted"
                    ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                    : "bg-green-50 text-green-700 border-green-200"
                }`}
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{contact.message}</p>
            </div>
          </div>
        ))}

        {filteredContacts.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No {filter !== "all" && filter} contact responses yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
