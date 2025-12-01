'use client'

import Link from 'next/link'
import { Home, Users, Clock, CheckCircle2, Eye, TrendingUp, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'

// Mock data
const stats = {
  totalProperties: 156,
  pendingApproval: 8,
  totalUsers: 234,
  totalViews: 45678,
}

const recentPending = [
  {
    id: '1',
    title: 'Luxury Villa in Salmiya',
    user: 'Ahmed Al-Sabah',
    submitted: '2024-01-19T10:30:00',
    price: 450000,
  },
  {
    id: '2',
    title: 'Modern Apartment in Kuwait City',
    user: 'Sara Al-Mutairi',
    submitted: '2024-01-18T15:45:00',
    price: 180000,
  },
  {
    id: '3',
    title: 'Beachfront Chalet in Julaia',
    user: 'Mohammed Al-Rashid',
    submitted: '2024-01-17T09:15:00',
    price: 320000,
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-neutral-900">
          Admin Dashboard
        </h1>
        <p className="text-neutral-600">
          Overview of platform activity and pending tasks
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Properties</p>
              <p className="mt-2 text-3xl font-bold text-neutral-900">{stats.totalProperties}</p>
              <p className="mt-2 text-sm text-green-600">+12 this month</p>
            </div>
            <div className="p-3 rounded-xl bg-primary-50">
              <Home className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Pending Approval</p>
              <p className="mt-2 text-3xl font-bold text-amber-600">{stats.pendingApproval}</p>
              <p className="mt-2 text-sm text-neutral-500">Requires action</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-50">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Users</p>
              <p className="mt-2 text-3xl font-bold text-neutral-900">{stats.totalUsers}</p>
              <p className="mt-2 text-sm text-green-600">+28 this month</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-50">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Views</p>
              <p className="mt-2 text-3xl font-bold text-neutral-900">{stats.totalViews.toLocaleString()}</p>
              <p className="mt-2 text-sm text-green-600">+15% this week</p>
            </div>
            <div className="p-3 rounded-xl bg-green-50">
              <Eye className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Pending Approvals */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">Pending Approvals</h2>
            <p className="text-sm text-neutral-500">Properties waiting for your review</p>
          </div>
          <Link href="/admin/properties/pending">
            <Button variant="outline" size="sm">
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>

        {recentPending.length > 0 ? (
          <div className="divide-y divide-neutral-100">
            {recentPending.map((property) => (
              <div key={property.id} className="p-4 hover:bg-neutral-50 flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-neutral-900">{property.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-sm text-neutral-500">
                    <span>By {property.user}</span>
                    <span>•</span>
                    <span>{new Date(property.submitted).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className="text-primary-600 font-medium">
                      {property.price.toLocaleString()} KWD
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/admin/properties/${property.id}`}>
                    <Button size="sm">Review</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <p className="text-neutral-600">All caught up! No pending approvals.</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/admin/properties/pending">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 hover:bg-amber-100 transition-colors cursor-pointer">
            <Clock className="h-8 w-8 text-amber-600 mb-3" />
            <h3 className="font-semibold text-neutral-900">Review Pending</h3>
            <p className="text-sm text-neutral-600 mt-1">
              {stats.pendingApproval} properties waiting
            </p>
          </div>
        </Link>

        <Link href="/admin/properties">
          <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 hover:bg-primary-100 transition-colors cursor-pointer">
            <Home className="h-8 w-8 text-primary-600 mb-3" />
            <h3 className="font-semibold text-neutral-900">Manage Properties</h3>
            <p className="text-sm text-neutral-600 mt-1">
              View and manage all listings
            </p>
          </div>
        </Link>

        <Link href="/admin/users">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 hover:bg-blue-100 transition-colors cursor-pointer">
            <Users className="h-8 w-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-neutral-900">Manage Users</h3>
            <p className="text-sm text-neutral-600 mt-1">
              View and manage user accounts
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}
