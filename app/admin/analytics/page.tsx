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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard label="Total Users" value={analytics.totalUsers} />
        <StatCard label="Paid Users" value={analytics.paidUsers} />
        <StatCard label="Free Users" value={analytics.freeUsers} />
        <StatCard label="Total Revenue" value={analytics.totalRevenue} prefix="₹" />
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">User Growth</h3>
        <ChartContainer config={{ users: { label: 'Users', color: '#22d3ee' } }}>
          {/* Replace with real chart component if available */}
          <div className="text-gray-400">[User Growth Chart Placeholder]</div>
        </ChartContainer>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400">
              <th className="py-2">Order ID</th>
              <th className="py-2">User ID</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Status</th>
              <th className="py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {analytics.recentOrders?.map((order: any) => (
              <tr key={order._id} className="border-t border-gray-700">
                <td className="py-2">{order._id}</td>
                <td className="py-2">{order.userId}</td>
                <td className="py-2">₹{order.amount}</td>
                <td className="py-2">{order.status}</td>
                <td className="py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function StatCard({ label, value, prefix = '' }: { label: string, value: any, prefix?: string }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow flex flex-col items-center">
      <span className="text-gray-400">{label}</span>
      <span className="text-3xl font-bold text-green-400">{prefix}{value}</span>
    </div>
  )
} 