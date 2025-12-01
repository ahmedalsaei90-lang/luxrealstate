'use client'

import { useState } from 'react'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { Menu, X, Bell, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/components/auth/AuthProvider'
import { cn } from '@/lib/utils/cn'
import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const { profile } = useAuth()

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Admin Header */}
      <header className="sticky top-0 z-40 h-16 bg-neutral-900 text-white px-4 md:px-6 border-b border-neutral-800">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-neutral-800"
              onClick={() => setIsMobileSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold hidden sm:inline">Admin Panel</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-white hover:bg-neutral-800 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-sm font-semibold">
                {profile?.full_name?.[0]?.toUpperCase() || 'A'}
              </div>
              <span className="hidden sm:inline text-sm">{profile?.full_name || 'Admin'}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 lg:hidden',
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <button
          onClick={() => setIsMobileSidebarOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-lg text-white hover:bg-neutral-800 z-10"
        >
          <X className="h-5 w-5" />
        </button>
        <AdminSidebar />
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
    </div>
  )
}
