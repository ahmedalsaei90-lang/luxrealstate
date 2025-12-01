import { Suspense } from 'react'
import { LoginForm } from '@/components/auth/LoginForm'

export const metadata = {
  title: 'Sign In | Elite Properties Kuwait',
  description: 'Sign in to your Elite Properties Kuwait account',
}

export default function LoginPage() {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-display font-bold text-neutral-900">
          Welcome Back
        </h2>
        <p className="mt-2 text-sm text-neutral-600">
          Sign in to access your dashboard and manage your properties
        </p>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}
