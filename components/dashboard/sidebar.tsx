'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  ShoppingCart,
  BarChart2,
  Home,
  Video,
  FileUp,
  Library,
  Upload,
  Folder
} from 'lucide-react'
import { useAuth } from '@/lib/hooks/useAuth'
import { useToast } from '@/components/ui/use-toast'

interface SidebarProps {
  type: 'admin' | 'user'
}

interface NavItem {
  title: string
  href: string
  icon: JSX.Element
}

interface NavSection {
  title: string
  items: NavItem[]
}

export default function Sidebar({ type }: SidebarProps) {
  const pathname = usePathname()
  const { logout } = useAuth()
  const { toast } = useToast()

  const adminNavSections: NavSection[] = [
    {
      title: 'Overview',
      items: [
        {
          title: 'Dashboard',
          href: '/admin/dashboard',
          icon: <Home className="h-5 w-5 mr-2" />,
        },
        {
          title: 'Analytics',
          href: '/admin/analytics',
          icon: <BarChart2 className="h-5 w-5 mr-2" />,
        },
      ]
    },
    {
      title: 'Content Management',
      items: [
        {
          title: 'Resume Templates',
          href: '/admin/resumes',
          icon: <FileUp className="h-5 w-5 mr-2" />,
        },
        {
          title: 'Tutorial Videos',
          href: '/admin/videos',
          icon: <Video className="h-5 w-5 mr-2" />,
        },
        {
          title: 'Content Library',
          href: '/admin/content',
          icon: <Library className="h-5 w-5 mr-2" />,
        },
      ]
    },
    {
      title: 'User Management',
      items: [
        {
          title: 'Users',
          href: '/admin/users',
          icon: <Users className="h-5 w-5 mr-2" />,
        },
        {
          title: 'Orders',
          href: '/admin/orders',
          icon: <ShoppingCart className="h-5 w-5 mr-2" />,
        },
      ]
    },
    {
      title: 'System',
      items: [
        {
          title: 'Settings',
          href: '/admin/settings',
          icon: <Settings className="h-5 w-5 mr-2" />,
        },
      ]
    }
  ]

  const userNavItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <Home className="h-5 w-5 mr-2" />,
    },
    {
      title: 'Analytics',
      href: '/dashboard/analytics',
      icon: <BarChart2 className="h-5 w-5 mr-2" />,
    },
    {
      title: 'Templates',
      href: '/dashboard/templates',
      icon: <FileText className="h-5 w-5 mr-2" />,
    },
    {
      title: 'Videos',
      href: '/dashboard/videos',
      icon: <Video className="h-5 w-5 mr-2" />,
    },
    {
      title: 'Settings',
      href: '/dashboard/settings',
      icon: <Settings className="h-5 w-5 mr-2" />,
    },
  ]

  const handleLogout = async () => {
    try {
      await logout()
      toast({
        title: 'Logged out successfully',
        variant: 'default'
      })
    } catch (error) {
      console.error('Logout error:', error)
      toast({
        title: 'Logout failed',
        description: 'An error occurred while logging out',
        variant: 'destructive'
      })
    }
  }

  return (
    <aside className="w-64 bg-gray-800 min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-green-400">
          {type === 'admin' ? 'Admin Dashboard' : 'Dashboard'}
        </h1>
      </div>
      <nav className="space-y-6">
        {type === 'admin' ? (
          // Admin Navigation with Sections
          adminNavSections.map((section, index) => (
            <div key={section.title} className={index !== 0 ? 'pt-4 border-t border-gray-700' : ''}>
              <h2 className="text-xs uppercase text-gray-400 font-semibold mb-2 px-3">
                {section.title}
              </h2>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center px-3 py-2 rounded-md transition-colors text-sm',
                      pathname === item.href
                        ? 'bg-gray-700 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                    )}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))
        ) : (
          // User Navigation
          <div className="space-y-1">
            {userNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center px-3 py-2 rounded-md transition-colors',
                  pathname === item.href
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                )}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        )}
      </nav>
      <div className="absolute bottom-4">
        <Button
          variant="ghost"
          className="text-gray-400 hover:text-white hover:bg-gray-700"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  )
} 