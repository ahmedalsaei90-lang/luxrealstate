import { Suspense } from 'react'
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm'
import { Loader2 } from 'lucide-react'

export const metadata = {
  title: 'Reset Password | Elite Properties Kuwait',
  description: 'Set a new password for your Elite Properties Kuwait account',
}

export default function ResetPasswordPage() {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-display font-bold text-neutral-900">
          Reset Password
        </h2>
        <p className="mt-2 text-sm text-neutral-600">
          Create a new password for your account
        </p>
      </div>

      <Suspense
        fallback={
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          </div>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </div>
  )
}
