"use client"

import { ChartContainer } from '@/components/ui/chart'
import { useEffect, useState } from 'react'

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAnalytics() {
      setLoading(true)
      const adminToken = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null
      const res = await fetch('/api/admin/analytics', {
        headers: { 'adminToken': adminToken || '' }
      })
      const data = await res.json()
      setAnalytics(data)
      setLoading(false)
    }
    fetchAnalytics()
  }, [])

  if (loading) return <div>Loading analytics...</div>
  if (!analytics) return <div>Failed to load analytics.</div>

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-4">Analytics Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow flex flex-col items-center">
          <span className="text-gray-400">Total Users</span>
          <span className="text-3xl font-bold text-green-400">{analytics.totalUsers}</span>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow flex flex-col items-center">
          <span className="text-gray-400">Paid Users</span>
          <span className="text-3xl font-bold text-green-400">{analytics.paidUsers}</span>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow flex flex-col items-center">
          <span className="text-gray-400">Free Users</span>
          <span className="text-3xl font-bold text-green-400">{analytics.freeUsers}</span>
        </div>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">User Growth</h3>
        <ChartContainer config={{ users: { label: 'Users', color: '#22d3ee' } }}>
          {/* Example: Replace with real chart data */}
          {/* <LineChart data={analytics.userGrowth} /> */}
          <div className="text-gray-400">[User Growth Chart Placeholder]</div>
        </ChartContainer>
      </div>
    </div>
  )
} 