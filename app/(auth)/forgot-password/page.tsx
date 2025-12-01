import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm'

export const metadata = {
  title: 'Forgot Password | Elite Properties Kuwait',
  description: 'Reset your Elite Properties Kuwait account password',
}

export default function ForgotPasswordPage() {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-display font-bold text-neutral-900">
          Forgot Password?
        </h2>
        <p className="mt-2 text-sm text-neutral-600">
          No worries, we&apos;ll help you reset it
        </p>
      </div>

      <ForgotPasswordForm />
    </div>
  )
}
