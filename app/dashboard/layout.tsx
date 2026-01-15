'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, LayoutDashboard, FileText, Video, Settings, Users, LogOut, BarChart2, Home } from 'lucide-react'

const sidebarNavItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Resumes',
    href: '/dashboard/resumes',
    icon: FileText,
  },
  {
    title: 'Videos',
    href: '/dashboard/videos',
    icon: Video,
  },
  {
    title: 'Users',
    href: '/dashboard/users',
    icon: Users,
  },
  {
    title: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen flex bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 hidden md:flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold text-green-400">Admin Dashboard</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <SidebarLink href="/dashboard" icon={<Home className="h-5 w-5 mr-2" />}
            active={pathname === '/dashboard'}>Dashboard Home</SidebarLink>
          <SidebarLink href="/dashboard/analytics" icon={<BarChart2 className="h-5 w-5 mr-2" />}
            active={pathname.startsWith('/dashboard/analytics')}>Analytics</SidebarLink>
          <SidebarLink href="/dashboard/users" icon={<Users className="h-5 w-5 mr-2" />}
            active={pathname.startsWith('/dashboard/users')}>Users</SidebarLink>
          <SidebarLink href="/dashboard/templates" icon={<FileText className="h-5 w-5 mr-2" />}
            active={pathname.startsWith('/dashboard/templates')}>Templates</SidebarLink>
          <SidebarLink href="/dashboard/videos" icon={<Video className="h-5 w-5 mr-2" />}
            active={pathname.startsWith('/dashboard/videos')}>Videos</SidebarLink>
          <SidebarLink href="/dashboard/settings" icon={<Settings className="h-5 w-5 mr-2" />}
            active={pathname.startsWith('/dashboard/settings')}>Settings</SidebarLink>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        {children}
      </main>
    </div>
  )
}

function SidebarLink({ href, icon, children, active }: { href: string, icon: React.ReactNode, children: React.ReactNode, active?: boolean }) {
  return (
    <Link href={href} className={cn(
      'flex items-center px-3 py-2 rounded-md transition-colors',
      active ? 'bg-gray-700 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-700')
    }>
      {icon}
      {children}
    </Link>
  )
} 