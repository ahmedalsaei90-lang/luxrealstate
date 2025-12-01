import { RegisterForm } from '@/components/auth/RegisterForm'

export const metadata = {
  title: 'Create Account | Elite Properties Kuwait',
  description: 'Create your Elite Properties Kuwait account to list properties',
}

export default function RegisterPage() {
  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-display font-bold text-neutral-900">
          Create Your Account
        </h2>
        <p className="mt-2 text-sm text-neutral-600">
          Join Elite Properties Kuwait to list and manage your properties
        </p>
      </div>

      <RegisterForm />
    </div>
  )
}
