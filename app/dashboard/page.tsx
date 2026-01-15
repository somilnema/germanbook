'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { LogOut, BookOpen } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export default function DashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isBookOpen, setIsBookOpen] = useState(false)

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to logout')
      }

      router.push('/login')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to logout. Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-green-400">Admivo Resume Kit</h1>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="text-gray-300 border-gray-600 hover:text-white hover:bg-gray-700"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Your Book</h1>
            <p className="text-gray-400 mt-2">Read your learning material here</p>
          </div>

          {/* Single Book */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <BookOpen className="h-6 w-6" />
                Your Book Title
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => setIsBookOpen(true)}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Open Book
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Book Reader Dialog */}
      <Dialog open={isBookOpen} onOpenChange={setIsBookOpen}>
        <DialogContent className="max-w-4xl h-[90vh] p-0">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle>Your Book</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-auto px-6 pb-6">
            {/* Book content will be displayed here - replace with your book content */}
            <div className="bg-gray-800 rounded-lg p-8 text-gray-100 space-y-4">
              <p className="text-lg leading-relaxed">
                Your book content will appear here. Replace this with actual book content.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 