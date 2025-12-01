'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Home,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  Shield,
  Settings,
  ArrowLeft,
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const sidebarLinks = [
  {
    label: 'Overview',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    label: 'All Properties',
    href: '/admin/properties',
    icon: Home,
  },
  {
    label: 'Pending Approval',
    href: '/admin/properties/pending',
    icon: Clock,
    badge: true,
  },
  {
    label: 'Users',
    href: '/admin/users',
    icon: Users,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-neutral-900 text-white min-h-[calc(100vh-64px)] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary-500 flex items-center justify-center">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-semibold">Admin Panel</p>
            <p className="text-xs text-neutral-400">Elite Properties</p>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1">
        {sidebarLinks.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href ||
            (link.href !== '/admin' && pathname.startsWith(link.href))

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200',
                isActive
                  ? 'bg-primary-500/20 text-primary-400'
                  : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="flex-1">{link.label}</span>
              {link.badge && (
                <span className="px-2 py-0.5 bg-amber-500 text-white text-xs rounded-full">
                  3
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-800 space-y-2">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-4 py-2 text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 text-neutral-400 hover:text-white transition-colors"
        >
          <Home className="h-4 w-4" />
          <span>Back to Website</span>
        </Link>
      </div>
    </aside>
  )
}
