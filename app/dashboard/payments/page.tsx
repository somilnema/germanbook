import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, Receipt } from 'lucide-react'

// Mock payment data - replace with actual data from your backend
const payments = [
  {
    id: 'PAY-001',
    date: '2024-03-15',
    amount: 99.99,
    status: 'Completed',
    description: 'Premium Resume Templates & Video Lectures'
  },
  {
    id: 'PAY-002',
    date: '2024-02-15',
    amount: 99.99,
    status: 'Completed',
    description: 'Premium Resume Templates & Video Lectures'
  }
]

export default function PaymentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Payment History</h1>
        <p className="text-muted-foreground">View your payment history and download receipts.</p>
      </div>

      <div className="grid gap-6">
        {payments.map((payment) => (
          <Card key={payment.id} className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold">{payment.id}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{payment.description}</p>
                <p className="text-sm text-muted-foreground">
                  Date: {new Date(payment.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-2xl font-bold">${payment.amount}</p>
                  <p className="text-sm text-green-600">{payment.status}</p>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  <span>Receipt</span>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Current Plan</h2>
            <p className="text-muted-foreground">Premium Access - Monthly Subscription</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-2xl font-bold">$99.99</p>
              <p className="text-sm text-muted-foreground">per month</p>
            </div>
            <Button variant="outline">Manage Subscription</Button>
          </div>
        </div>
      </Card>
    </div>
  )
} 