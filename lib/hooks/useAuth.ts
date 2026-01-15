'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface AdminUser {
  email: string
  role: 'admin'
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<AdminUser | null>(null)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    try {
      // Only check if we're in a browser environment
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('adminToken')
        const userStr = localStorage.getItem('adminUser')
        
        if (token && userStr) {
          setIsAuthenticated(true)
          setUser(JSON.parse(userStr))
        } else {
          setIsAuthenticated(false)
          setUser(null)
        }
      }
    } catch (error) {
      console.error('Auth check error:', error)
      setIsAuthenticated(false)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      })

      const data = await res.json()

      if (res.ok && data.token) {
        localStorage.setItem('adminToken', data.token)
        localStorage.setItem('adminUser', JSON.stringify(data.user))
        setIsAuthenticated(true)
        setUser(data.user)
        return { success: true }
      }

      return { success: false, error: data.error }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Failed to login' }
    }
  }

  const logout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: getAuthHeaders(),
        credentials: 'include'
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminUser')
      setIsAuthenticated(false)
      setUser(null)
      router.push('/admin/login')
    }
  }

  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken')
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token || ''}`,
      'adminToken': token || '',
    }
  }

  const authFetch = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      throw new Error('No auth token')
    }

    const headers = {
      ...getAuthHeaders(),
      ...(options.headers || {})
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        credentials: 'include'
      })

      if (response.status === 401) {
        // Clear auth state and redirect to login
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminUser')
        setIsAuthenticated(false)
        setUser(null)
        router.push('/admin/login')
        throw new Error('Unauthorized')
      }

      return response
    } catch (error) {
      console.error('Auth fetch error:', error)
      if (error instanceof Error && error.message === 'Unauthorized') {
        throw error
      }
      // For other errors, try to refresh the page once
      if (typeof window !== 'undefined') {
        router.refresh()
      }
      throw error
    }
  }

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    authFetch,
    getAuthHeaders
  }
} 