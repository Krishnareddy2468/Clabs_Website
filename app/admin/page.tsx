"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { 
  Building2, 
  Calendar, 
  Users, 
  TrendingUp,
  ArrowRight,
  Plus,
  Eye
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Stats {
  schools: number
  events: number
  registrations: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ schools: 0, events: 0, registrations: 0 })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      try {
        const supabase = createClient()
        
        const [schoolsRes, eventsRes, registrationsRes] = await Promise.all([
          supabase.from('schools').select('id', { count: 'exact' }),
          supabase.from('events').select('id', { count: 'exact' }),
          supabase.from('registrations').select('id', { count: 'exact' })
        ])

        setStats({
          schools: schoolsRes.count || 0,
          events: eventsRes.count || 0,
          registrations: registrationsRes.count || 0
        })
      } catch (error) {
        console.error('Failed to load stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadStats()
  }, [])

  const statCards = [
    {
      title: "Total Schools",
      value: stats.schools,
      icon: Building2,
      color: "from-blue-500 to-blue-600",
      href: "/admin/schools"
    },
    {
      title: "Active Events",
      value: stats.events,
      icon: Calendar,
      color: "from-emerald-500 to-emerald-600",
      href: "/admin/events"
    },
    {
      title: "Registrations",
      value: stats.registrations,
      icon: Users,
      color: "from-purple-500 to-purple-600",
      href: "/admin/registrations"
    },
    {
      title: "Growth",
      value: "+12%",
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
      href: "/admin"
    }
  ]

  const quickActions = [
    {
      title: "Add New School",
      description: "Add a school with banner for homepage slideshow",
      icon: Building2,
      href: "/admin/schools",
      action: "Add School"
    },
    {
      title: "Create Event",
      description: "Create a new event for registrations",
      icon: Calendar,
      href: "/admin/events",
      action: "Create Event"
    },
    {
      title: "View Registrations",
      description: "Check latest event registrations",
      icon: Users,
      href: "/admin/registrations",
      action: "View All"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's what's happening.</p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Eye className="w-4 h-4" />
          View Website
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Link
            key={stat.title}
            href={stat.href}
            className="bg-white rounded-xl border p-6 hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
            <p className="text-2xl font-bold text-gray-900">
              {isLoading ? "..." : stat.value}
            </p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => (
            <div
              key={action.title}
              className="bg-white rounded-xl border p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <action.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900">{action.title}</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">{action.description}</p>
              <Link
                href={action.href}
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" />
                {action.action}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border">
        <div className="px-6 py-4 border-b">
          <h2 className="font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="text-center py-8 text-gray-500">
            <p>Activity feed coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
