import { NextResponse } from 'next/server'
import { getUsers } from '@/lib/models/User'
import { getOrders } from '@/lib/models/Order'
import { requireAdmin } from '@/lib/auth'

export async function GET(req: Request) {
  // Verify admin authentication
  const isAdmin = await requireAdmin(req)
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Fetch users
    const users = await getUsers()
    const totalUsers = users.length
    const paidUsers = users.filter((u: any) => u.isPaid).length
    const freeUsers = totalUsers - paidUsers

    // Fetch orders
    const orders = await getOrders()
    const totalRevenue = orders.reduce((sum: number, o: any) => sum + (o.amount || 0), 0)
    const recentOrders = orders.sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).slice(0, 5)

    // Dummy user growth data
    const userGrowth = [
      { date: '2024-05-01', users: 10 },
      { date: '2024-05-10', users: 20 },
      { date: '2024-05-20', users: 30 },
      { date: '2024-06-01', users: 50 },
    ]

    return NextResponse.json({ 
      totalUsers, 
      paidUsers, 
      freeUsers, 
      totalRevenue, 
      recentOrders, 
      userGrowth 
    })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 