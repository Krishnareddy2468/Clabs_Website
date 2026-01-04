"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { ArrowUpRight, ArrowDownRight, TrendingUp, Users, Calendar, IndianRupee, Building2 } from "lucide-react"

interface AnalyticsData {
  last30Days: {
    registrations: number
    revenue: number
    events: number
    schools: number
  }
  allTime: {
    registrations: number
    revenue: number
    events: number
    schools: number
  }
  percentOfTotal: {
    registrations: number
    revenue: number
    events: number
    schools: number
    overall: number
  }
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const supabase = createClient()
        
        // Get date for last 30 days
        const now = new Date()
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

        // Last 30 days data
        const [recentRegs, recentSchools, recentEvents] = await Promise.all([
          supabase
            .from('event_registrations')
            .select('amount_paid, payment_status, created_at')
            .gte('created_at', thirtyDaysAgo.toISOString()),
          supabase
            .from('schools')
            .select('id', { count: 'exact' })
            .gte('created_at', thirtyDaysAgo.toISOString()),
          supabase
            .from('events')
            .select('id', { count: 'exact' })
            .gte('created_at', thirtyDaysAgo.toISOString())
        ])

        // All-time data
        const [allRegs, allSchools, allEvents] = await Promise.all([
          supabase
            .from('event_registrations')
            .select('amount_paid, payment_status, created_at'),
          supabase
            .from('schools')
            .select('id', { count: 'exact' }),
          supabase
            .from('events')
            .select('id', { count: 'exact' })
        ])

        // Calculate recent metrics (last 30 days)
        const recentRegistrations = recentRegs.data?.length || 0
        const recentRevenue = recentRegs.data
          ?.filter(r => r.payment_status === 'completed')
          .reduce((sum, r) => sum + r.amount_paid, 0) || 0

        // Calculate all-time metrics
        const allTimeRegistrations = allRegs.data?.length || 0
        const allTimeRevenue = allRegs.data
          ?.filter(r => r.payment_status === 'completed')
          .reduce((sum, r) => sum + r.amount_paid, 0) || 0

        // Calculate percentage of total (how much of all-time activity happened in last 30 days)
        const calculatePercent = (recent: number, total: number) => {
          if (total === 0) return 0
          return Math.round((recent / total) * 100)
        }

        const regPercent = calculatePercent(recentRegistrations, allTimeRegistrations)
        const revPercent = calculatePercent(recentRevenue, allTimeRevenue)
        const eventPercent = calculatePercent(recentEvents.count || 0, allEvents.count || 0)
        const schoolPercent = calculatePercent(recentSchools.count || 0, allSchools.count || 0)

        // Overall activity percentage
        const overallPercent = Math.round((regPercent + revPercent + eventPercent + schoolPercent) / 4)

        setAnalytics({
          last30Days: {
            registrations: recentRegistrations,
            revenue: recentRevenue,
            events: recentEvents.count || 0,
            schools: recentSchools.count || 0
          },
          allTime: {
            registrations: allTimeRegistrations,
            revenue: allTimeRevenue,
            events: allEvents.count || 0,
            schools: allSchools.count || 0
          },
          percentOfTotal: {
            registrations: regPercent,
            revenue: revPercent,
            events: eventPercent,
            schools: schoolPercent,
            overall: overallPercent
          }
        })
      } catch (error) {
        console.error('Failed to load analytics:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadAnalytics()
  }, [])

  const GrowthBadge = ({ value }: { value: number }) => {
    const isPositive = value >= 0
    return (
      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-semibold ${
        isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
      }`}>
        {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
        {isPositive ? '+' : ''}{value}%
      </div>
    )
  }

  const MetricCard = ({ 
    title, 
    recent, 
    total, 
    percent, 
    icon: Icon, 
    color,
    prefix = '',
    suffix = ''
  }: { 
    title: string
    recent: number
    total: number
    percent: number
    icon: any
    color: string
    prefix?: string
    suffix?: string
  }) => (
    <div className="bg-white rounded-xl border p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color} text-white`}>
          <Icon className="w-6 h-6" />
        </div>
        <GrowthBadge value={percent} />
      </div>
      <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
      <div className="space-y-2">
        <div>
          <p className="text-2xl font-bold text-gray-900">
            {prefix}{total.toLocaleString()}{suffix}
          </p>
          <p className="text-xs text-gray-500">All time total</p>
        </div>
        <div className="pt-2 border-t">
          <p className="text-lg text-gray-600">
            {prefix}{recent.toLocaleString()}{suffix}
          </p>
          <p className="text-xs text-gray-500">Last 30 days</p>
        </div>
      </div>
    </div>
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Growth Analytics</h1>
        <p className="text-gray-500 mt-1">
          All-time performance with last 30 days activity breakdown
        </p>
      </div>

      {/* Overall Activity */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-lg font-medium opacity-90">Recent Activity Rate</h2>
            <p className="text-sm opacity-75">Last 30 days vs all-time total</p>
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-5xl font-bold">
            {analytics?.percentOfTotal.overall || 0}%
          </p>
          <p className="text-xl opacity-75">of all-time activity</p>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        <MetricCard
          title="Total Registrations"
          recent={analytics?.last30Days.registrations || 0}
          total={analytics?.allTime.registrations || 0}
          percent={analytics?.percentOfTotal.registrations || 0}
          icon={Users}
          color="from-purple-500 to-purple-600"
        />
        <MetricCard
          title="Total Revenue"
          recent={analytics?.last30Days.revenue || 0}
          total={analytics?.allTime.revenue || 0}
          percent={analytics?.percentOfTotal.revenue || 0}
          icon={IndianRupee}
          color="from-green-500 to-green-600"
          prefix="₹"
        />
        <MetricCard
          title="Total Events"
          recent={analytics?.last30Days.events || 0}
          total={analytics?.allTime.events || 0}
          percent={analytics?.percentOfTotal.events || 0}
          icon={Calendar}
          color="from-blue-500 to-blue-600"
        />
        <MetricCard
          title="Total Schools"
          recent={analytics?.last30Days.schools || 0}
          total={analytics?.allTime.schools || 0}
          percent={analytics?.percentOfTotal.schools || 0}
          icon={Building2}
          color="from-indigo-500 to-indigo-600"
        />
      </div>

      {/* Insights */}
      <div className="bg-white rounded-xl border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h2>
        <div className="space-y-3">
          {analytics && (
            <>
              {analytics.percentOfTotal.overall > 50 ? (
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <ArrowUpRight className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-900">High Recent Activity</p>
                    <p className="text-sm text-green-700">
                      {analytics.percentOfTotal.overall}% of all your activity happened in the last 30 days - excellent momentum!
                    </p>
                  </div>
                </div>
              ) : analytics.percentOfTotal.overall > 20 ? (
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900">Steady Activity</p>
                    <p className="text-sm text-blue-700">
                      {analytics.percentOfTotal.overall}% of activity in last 30 days shows consistent engagement
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                  <ArrowDownRight className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-orange-900">Low Recent Activity</p>
                    <p className="text-sm text-orange-700">
                      Only {analytics.percentOfTotal.overall}% of activity in last 30 days. Consider boosting engagement
                    </p>
                  </div>
                </div>
              )}

              {analytics.last30Days.registrations > 0 && (
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                  <Users className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-purple-900">Recent Registrations</p>
                    <p className="text-sm text-purple-700">
                      {analytics.last30Days.registrations} new registrations in the last 30 days ({analytics.percentOfTotal.registrations}% of all-time)
                    </p>
                  </div>
                </div>
              )}

              {analytics.last30Days.revenue > 0 && (
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <IndianRupee className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-900">Recent Revenue</p>
                    <p className="text-sm text-green-700">
                      ₹{analytics.last30Days.revenue.toLocaleString()} earned in last 30 days ({analytics.percentOfTotal.revenue}% of total revenue)
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
