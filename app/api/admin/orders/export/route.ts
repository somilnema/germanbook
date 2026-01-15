import { NextResponse } from 'next/server'
import { Order } from '@/lib/models/Order'

export async function GET(req: Request) {
  try {
    const orders = await Order.find({}).populate('userId', 'email').lean()
    
    // Convert orders to CSV
    const csvHeader = 'Order ID,User Email,Amount,Status,Payment Method,Date\n'
    const csvRows = orders?.map(order => {
      return `${order._id},${order.userId.email},${order.amount},${order.status},${order.paymentMethod},${new Date(order.createdAt).toISOString()}`
    }).join('\n')
    const csv = csvHeader + csvRows

    // Return as downloadable CSV
    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename=orders-${new Date().toISOString().split('T')[0]}.csv`
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to export orders' }, { status: 500 })
  }
} 