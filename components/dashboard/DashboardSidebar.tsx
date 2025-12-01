'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Home,
  Heart,
  MessageSquare,
  Settings,
  Plus,
  Building2,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { Button } from '@/components/ui/button'

const sidebarLinks = [
  {
    label: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'My Properties',
    href: '/dashboard/properties',
    icon: Home,
  },
  {
    label: 'Favorites',
    href: '/dashboard/favorites',
    icon: Heart,
  },
  {
    label: 'Inquiries',
    href: '/dashboard/inquiries',
    icon: MessageSquare,
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r border-neutral-200 min-h-[calc(100vh-80px)] flex flex-col">
      {/* Add Property CTA */}
      <div className="p-4 border-b border-neutral-200">
        <Link href="/dashboard/properties/new">
          <Button className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-gold">
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1">
        {sidebarLinks.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href ||
            (link.href !== '/dashboard' && pathname.startsWith(link.href))

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200',
                isActive
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
              )}
            >
              <Icon className={cn('h-5 w-5', isActive && 'text-primary-500')} />
              <span>{link.label}</span>
              {isActive && (
                <ChevronRight className="h-4 w-4 ml-auto text-primary-400" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-200">
        <Link href="/" className="flex items-center gap-2 text-neutral-500 hover:text-neutral-700 text-sm">
          <Building2 className="h-4 w-4" />
          <span>Back to Website</span>
        </Link>
      </div>
    </aside>
  )
}
