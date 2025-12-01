'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Bell, Search, Menu, LogOut, Settings, Shield, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/components/auth/AuthProvider'

interface DashboardHeaderProps {
  onMenuToggle?: () => void
}

export function DashboardHeader({ onMenuToggle }: DashboardHeaderProps) {
  const { user, profile, signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-40 h-16 bg-white border-b border-neutral-200 px-4 md:px-6">
      <div className="flex items-center justify-between h-full">
        {/* Left: Mobile menu + Logo */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuToggle}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
              <Crown className="h-4 w-4 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-primary-600 hidden sm:inline">
              Dashboard
            </span>
          </Link>
        </div>

        {/* Center: Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              placeholder="Search properties, inquiries..."
              className="pl-10 bg-neutral-50 border-neutral-200"
            />
          </div>
        </div>

        {/* Right: Notifications + User Menu */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-neutral-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-sm font-semibold">
                  {profile?.full_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                </div>
                <span className="hidden sm:inline text-sm font-medium text-neutral-700">
                  {profile?.full_name?.split(' ')[0] || 'User'}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-3 py-2 border-b">
                <p className="font-medium text-sm">{profile?.full_name || 'User'}</p>
                <p className="text-xs text-neutral-500 truncate">{user?.email}</p>
                {profile?.role === 'admin' && (
                  <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                    <Shield className="h-3 w-3" />
                    Admin
                  </span>
                )}
              </div>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings" className="flex items-center gap-2 cursor-pointer">
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              {profile?.role === 'admin' && (
                <DropdownMenuItem asChild>
                  <Link href="/admin" className="flex items-center gap-2 cursor-pointer text-primary-600">
                    <Shield className="h-4 w-4" />
                    Admin Panel
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
