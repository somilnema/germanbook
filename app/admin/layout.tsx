'use client'

import { useAuth } from '@/lib/hooks/useAuth'
import Sidebar from '@/components/dashboard/sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isLoading } = useAuth()

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
      </div>
    )
  }

  // Don't render dashboard if not authenticated
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      <Sidebar type="admin" />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
} 