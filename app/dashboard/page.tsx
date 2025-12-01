'use client'

import Link from 'next/link'
import { Plus, ArrowRight, Home, Clock, Eye, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatsCards } from '@/components/dashboard/StatsCards'
import { useAuth } from '@/components/auth/AuthProvider'
import { cn } from '@/lib/utils/cn'

// Temporary mock data for recent properties
const recentProperties = [
  {
    id: '1',
    title: 'Modern Villa in Salmiya',
    status: 'approved',
    views: 245,
    inquiries: 3,
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Luxury Apartment in Kuwait City',
    status: 'pending',
    views: 0,
    inquiries: 0,
    createdAt: '2024-01-18',
  },
]

const recentInquiries = [
  {
    id: '1',
    propertyTitle: 'Modern Villa in Salmiya',
    name: 'Ahmed Al-Sabah',
    type: 'viewing',
    createdAt: '2024-01-19T10:30:00',
    status: 'new',
  },
  {
    id: '2',
    propertyTitle: 'Modern Villa in Salmiya',
    name: 'Sara Al-Mutairi',
    type: 'info',
    createdAt: '2024-01-18T15:45:00',
    status: 'read',
  },
]

export default function DashboardPage() {
  const { profile } = useAuth()

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-neutral-900">
            Welcome back, {profile?.full_name?.split(' ')[0] || 'User'}!
          </h1>
          <p className="mt-1 text-neutral-600">
            Here&apos;s what&apos;s happening with your properties today.
          </p>
        </div>
        <Link href="/dashboard/properties/new">
          <Button className="bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-gold">
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <StatsCards
        stats={{
          totalProperties: 2,
          totalViews: 245,
          totalInquiries: 5,
          pendingProperties: 1,
        }}
      />

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Properties */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-neutral-900">Recent Properties</h2>
            <Link
              href="/dashboard/properties"
              className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {recentProperties.length > 0 ? (
            <div className="space-y-4">
              {recentProperties.map((property) => (
                <div
                  key={property.id}
                  className="flex items-center gap-4 p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <Home className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-neutral-900 truncate">
                      {property.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 text-sm text-neutral-500">
                      <span className="flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5" />
                        {property.views}
                      </span>
                      <span
                        className={cn(
                          'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium',
                          property.status === 'approved' && 'bg-green-100 text-green-700',
                          property.status === 'pending' && 'bg-amber-100 text-amber-700',
                          property.status === 'rejected' && 'bg-red-100 text-red-700'
                        )}
                      >
                        {property.status === 'approved' && <CheckCircle2 className="h-3 w-3" />}
                        {property.status === 'pending' && <Clock className="h-3 w-3" />}
                        {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <Link href={`/dashboard/properties/${property.id}`}>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Home className="h-12 w-12 text-neutral-300 mx-auto mb-3" />
              <p className="text-neutral-600">No properties yet</p>
              <Link href="/dashboard/properties/new" className="mt-3 inline-block">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add your first property
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Recent Inquiries */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-neutral-900">Recent Inquiries</h2>
            <Link
              href="/dashboard/inquiries"
              className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {recentInquiries.length > 0 ? (
            <div className="space-y-4">
              {recentInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="p-4 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-neutral-900">{inquiry.name}</h3>
                      <p className="text-sm text-neutral-600 mt-0.5">
                        {inquiry.type === 'viewing' && 'Requested a viewing'}
                        {inquiry.type === 'info' && 'Requested information'}
                        {inquiry.type === 'offer' && 'Made an offer'}
                        {inquiry.type === 'general' && 'General inquiry'}
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">
                        For: {inquiry.propertyTitle}
                      </p>
                    </div>
                    <span
                      className={cn(
                        'px-2 py-0.5 rounded-full text-xs font-medium',
                        inquiry.status === 'new' && 'bg-blue-100 text-blue-700',
                        inquiry.status === 'read' && 'bg-neutral-100 text-neutral-600'
                      )}
                    >
                      {inquiry.status === 'new' ? 'New' : 'Read'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="h-12 w-12 text-neutral-300 mx-auto mb-3" />
              <p className="text-neutral-600">No inquiries yet</p>
              <p className="text-sm text-neutral-500 mt-1">
                Inquiries will appear here when someone contacts you
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
