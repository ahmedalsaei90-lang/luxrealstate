'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, Heart, Search, Phone, Crown, ChevronDown, Building2, User, LogOut, LayoutDashboard, Settings, Shield, Home as HomeIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils/cn'
import { useFavoritesStore } from '@/lib/stores/favorites-store'
import { useAuth } from '@/components/auth/AuthProvider'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Properties', href: '/properties' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isHomePage = pathname === '/'
  const favoritesCount = useFavoritesStore((state) => state.favorites.length)
  const { user, profile, isLoading, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
    router.refresh()
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    // Check initial scroll position
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const headerBg = isHomePage
    ? isScrolled
      ? 'bg-white/95 backdrop-blur-xl shadow-luxury border-b border-neutral-100'
      : 'bg-transparent border-b border-transparent'
    : 'bg-white/95 backdrop-blur-xl shadow-luxury border-b border-neutral-100'

  const textColor = isHomePage && !isScrolled ? 'text-white' : 'text-neutral-800'
  const logoColor = isHomePage && !isScrolled ? 'text-white' : 'text-primary-600'

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        headerBg
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
              "bg-gradient-to-br from-primary-500 to-primary-600 shadow-gold",
              "group-hover:shadow-gold-lg group-hover:scale-105"
            )}>
              <Crown className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className={cn(
                "font-display font-bold text-xl tracking-tight transition-colors",
                logoColor
              )}>
                Elite Properties
              </p>
              <p className={cn(
                "text-xs font-medium tracking-widest uppercase transition-colors",
                isHomePage && !isScrolled ? 'text-primary-300' : 'text-primary-500'
              )}>
                Kuwait
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href.split('?')[0]))

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300",
                    isHomePage && !isScrolled
                      ? "hover:bg-white/10 hover:text-white"
                      : "hover:bg-primary-50/80 hover:text-primary-600",
                    textColor,
                    isActive && (isHomePage && !isScrolled
                      ? "text-primary-400"
                      : "bg-primary-50 text-primary-600")
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "rounded-xl transition-all duration-300",
                isHomePage && !isScrolled
                  ? "text-white hover:bg-white/10"
                  : "text-neutral-700 hover:bg-neutral-100"
              )}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Favorites */}
            <Link href="/favorites">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-xl relative transition-all duration-300",
                  isHomePage && !isScrolled
                    ? "text-white hover:bg-white/10"
                    : "text-neutral-700 hover:bg-neutral-100"
                )}
              >
                <Heart className="h-5 w-5" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full
                                 bg-primary-500 text-white text-xs font-bold
                                 flex items-center justify-center animate-scale-in">
                    {favoritesCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center gap-2">
              {isLoading ? (
                <div className="w-24 h-10 bg-neutral-200 animate-pulse rounded-xl" />
              ) : user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "flex items-center gap-2 rounded-xl font-medium",
                        isHomePage && !isScrolled
                          ? "text-white hover:bg-white/10"
                          : "text-neutral-700 hover:bg-neutral-100"
                      )}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-sm font-semibold">
                        {profile?.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <span className="hidden lg:inline max-w-[100px] truncate">
                        {profile?.full_name || user.email?.split('@')[0]}
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-3 py-2 border-b">
                      <p className="font-medium text-sm">{profile?.full_name || 'User'}</p>
                      <p className="text-xs text-neutral-500 truncate">{user.email}</p>
                    </div>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/properties" className="flex items-center gap-2 cursor-pointer">
                        <HomeIcon className="h-4 w-4" />
                        My Properties
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/settings" className="flex items-center gap-2 cursor-pointer">
                        <Settings className="h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    {profile?.role === 'admin' && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href="/admin" className="flex items-center gap-2 cursor-pointer text-primary-600">
                            <Shield className="h-4 w-4" />
                            Admin Panel
                          </Link>
                        </DropdownMenuItem>
                      </>
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
              ) : (
                <>
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      className={cn(
                        "rounded-xl font-medium",
                        isHomePage && !isScrolled
                          ? "text-white hover:bg-white/10"
                          : "text-neutral-700 hover:bg-neutral-100"
                      )}
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button
                      className={cn(
                        "rounded-xl font-semibold",
                        "bg-gradient-to-r from-primary-500 to-primary-600 text-white",
                        "hover:from-primary-600 hover:to-primary-700 shadow-gold hover:shadow-gold-lg",
                        "transition-all duration-300"
                      )}
                    >
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "lg:hidden rounded-xl transition-all duration-300",
                isHomePage && !isScrolled
                  ? "text-white hover:bg-white/10"
                  : "text-neutral-700 hover:bg-neutral-100"
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-xl",
          "border-b border-neutral-200 shadow-luxury-lg overflow-hidden",
          "transition-all duration-500 ease-luxury",
          isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto px-4 py-6">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-3 rounded-xl font-medium transition-all duration-300",
                    "hover:bg-primary-50 hover:text-primary-600",
                    isActive
                      ? "bg-primary-50 text-primary-600"
                      : "text-neutral-700"
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Mobile Auth Section */}
          <div className="mt-6 pt-6 border-t border-neutral-200">
            {isLoading ? (
              <div className="w-full h-12 bg-neutral-200 animate-pulse rounded-xl" />
            ) : user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-semibold">
                    {profile?.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">{profile?.full_name || 'User'}</p>
                    <p className="text-sm text-neutral-500 truncate">{user.email}</p>
                  </div>
                </div>
                <Link href="/dashboard" className="block">
                  <Button variant="outline" className="w-full rounded-xl justify-start">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                {profile?.role === 'admin' && (
                  <Link href="/admin" className="block">
                    <Button variant="outline" className="w-full rounded-xl justify-start text-primary-600">
                      <Shield className="h-4 w-4 mr-2" />
                      Admin Panel
                    </Button>
                  </Link>
                )}
                <Button
                  variant="ghost"
                  className="w-full rounded-xl justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Link href="/login" className="block">
                  <Button variant="outline" className="w-full rounded-xl">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register" className="block">
                  <Button
                    className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white
                             hover:from-primary-600 hover:to-primary-700 shadow-gold
                             rounded-xl font-semibold"
                  >
                    Create Account
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
