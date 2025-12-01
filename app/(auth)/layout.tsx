import Link from 'next/link'
import { Building2 } from 'lucide-react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-neutral-50">
      {/* Decorative background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-100/40 rounded-full blur-3xl" />
      </div>

      <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600
                        flex items-center justify-center shadow-luxury">
            <Building2 className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-primary-600">
              Elite Properties
            </h1>
            <p className="text-xs text-neutral-500 -mt-0.5">Kuwait</p>
          </div>
        </Link>

        {/* Auth Card */}
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-luxury border border-neutral-100 p-8">
            {children}
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-neutral-500">
          &copy; {new Date().getFullYear()} Elite Properties Kuwait. All rights reserved.
        </p>
      </div>
    </div>
  )
}
