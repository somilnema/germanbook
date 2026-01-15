"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, Mail, Ban, CheckCircle } from 'lucide-react'

interface User {
  _id: string
  name: string
  email: string
  isPaid: boolean
  isBlocked: boolean
  createdAt: string
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState<'all' | 'paid' | 'free'>('all')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users', {
        headers: {
          'adminToken': localStorage.getItem('adminToken') || ''
        }
      })
      const data = await res.json()
      setUsers(data.users)
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBlockUser = async (userId: string, action: 'block' | 'unblock') => {
    try {
      const res = await fetch(`/api/admin/users/${userId}/${action}`, {
        method: 'POST',
        headers: {
          'adminToken': localStorage.getItem('adminToken') || ''
        }
      })
      if (res.ok) {
        fetchUsers() // Refresh user list
      }
    } catch (error) {
      console.error('Failed to block/unblock user:', error)
    }
  }

  const handleResendDownload = async (userId: string) => {
    try {
      const res = await fetch(`/api/admin/users/${userId}/resend-download`, {
        method: 'POST',
        headers: {
          'adminToken': localStorage.getItem('adminToken') || ''
        }
      })
      if (res.ok) {
        alert('Download link sent successfully')
      }
    } catch (error) {
      console.error('Failed to resend download link:', error)
    }
  }

  const filteredUsers = users
    .filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(user => {
      if (filter === 'paid') return user.isPaid
      if (filter === 'free') return !user.isPaid
      return true
    })

  if (loading) return <div>Loading users...</div>

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>User Management</span>
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'paid' | 'free')}
                className="border rounded px-3 py-2"
              >
                <option value="all">All Users</option>
                <option value="paid">Paid Users</option>
                <option value="free">Free Users</option>
              </select>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Joined</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user._id} className="border-b">
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">
                      <Badge variant={user.isPaid ? "success" : "secondary"}>
                        {user.isPaid ? 'Paid' : 'Free'}
                      </Badge>
                      {user.isBlocked && (
                        <Badge variant="destructive" className="ml-2">
                          Blocked
                        </Badge>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        {user.isPaid && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleResendDownload(user._id)}
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant={user.isBlocked ? "outline" : "destructive"}
                          onClick={() => handleBlockUser(user._id, user.isBlocked ? 'unblock' : 'block')}
                        >
                          {user.isBlocked ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <Ban className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 