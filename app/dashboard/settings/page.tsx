'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { User, Mail, Phone, Lock, Camera, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/components/auth/AuthProvider'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

const profileSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().optional(),
})

const passwordSchema = z.object({
  currentPassword: z.string().min(6, 'Password must be at least 6 characters'),
  newPassword: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

type ProfileFormData = z.infer<typeof profileSchema>
type PasswordFormData = z.infer<typeof passwordSchema>

export default function SettingsPage() {
  const { user, profile, refreshProfile } = useAuth()
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false)

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: profile?.full_name || '',
      phone: profile?.phone || '',
    },
  })

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  })

  const onProfileSubmit = async (data: ProfileFormData) => {
    if (!user) return
    setIsUpdatingProfile(true)

    try {
      const supabase = createClient()

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: data.full_name,
          phone: data.phone || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)

      if (error) throw error

      await refreshProfile()
      toast.success('Profile updated successfully')
    } catch (error) {
      toast.error('Failed to update profile')
    } finally {
      setIsUpdatingProfile(false)
    }
  }

  const onPasswordSubmit = async (data: PasswordFormData) => {
    setIsUpdatingPassword(true)

    try {
      const supabase = createClient()

      const { error } = await supabase.auth.updateUser({
        password: data.newPassword,
      })

      if (error) throw error

      passwordForm.reset()
      toast.success('Password updated successfully')
    } catch (error) {
      toast.error('Failed to update password')
    } finally {
      setIsUpdatingPassword(false)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-neutral-900">Settings</h1>
        <p className="text-neutral-600">Manage your account settings</p>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold text-neutral-900 mb-6">Profile Information</h2>

        {/* Avatar */}
        <div className="flex items-center gap-6 mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-2xl font-bold">
              {profile?.full_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
            </div>
            <button className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-white border border-neutral-200 shadow-sm hover:bg-neutral-50">
              <Camera className="h-4 w-4 text-neutral-600" />
            </button>
          </div>
          <div>
            <p className="font-medium text-neutral-900">{profile?.full_name || 'User'}</p>
            <p className="text-sm text-neutral-500">{user?.email}</p>
          </div>
        </div>

        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <Input
                  id="full_name"
                  className="pl-10"
                  {...profileForm.register('full_name')}
                />
              </div>
              {profileForm.formState.errors.full_name && (
                <p className="text-sm text-red-500">{profileForm.formState.errors.full_name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <Input
                  id="email"
                  className="pl-10 bg-neutral-50"
                  value={user?.email || ''}
                  disabled
                />
              </div>
              <p className="text-xs text-neutral-500">Email cannot be changed</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <Input
                  id="phone"
                  className="pl-10"
                  placeholder="+965 1234 5678"
                  {...profileForm.register('phone')}
                />
              </div>
            </div>
          </div>

          <Button type="submit" disabled={isUpdatingProfile}>
            {isUpdatingProfile ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </form>
      </div>

      {/* Password Section */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold text-neutral-900 mb-6">Change Password</h2>

        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <Input
                id="currentPassword"
                type="password"
                className="pl-10"
                {...passwordForm.register('currentPassword')}
              />
            </div>
            {passwordForm.formState.errors.currentPassword && (
              <p className="text-sm text-red-500">{passwordForm.formState.errors.currentPassword.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <Input
                  id="newPassword"
                  type="password"
                  className="pl-10"
                  {...passwordForm.register('newPassword')}
                />
              </div>
              {passwordForm.formState.errors.newPassword && (
                <p className="text-sm text-red-500">{passwordForm.formState.errors.newPassword.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  className="pl-10"
                  {...passwordForm.register('confirmPassword')}
                />
              </div>
              {passwordForm.formState.errors.confirmPassword && (
                <p className="text-sm text-red-500">{passwordForm.formState.errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <Button type="submit" variant="outline" disabled={isUpdatingPassword}>
            {isUpdatingPassword ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              'Update Password'
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
