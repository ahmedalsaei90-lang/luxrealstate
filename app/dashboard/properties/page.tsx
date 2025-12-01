'use client'

import Link from 'next/link'
import { Plus, Search, Filter, Home, Eye, MessageSquare, Clock, CheckCircle2, XCircle, MoreVertical, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils/cn'
import { formatPrice } from '@/lib/utils/formatters'

// Mock data - will be replaced with Supabase data
const mockProperties = [
  {
    id: '1',
    title: 'Modern Villa in Salmiya',
    price: 450000,
    status: 'approved',
    listing_type: 'sale',
    views: 245,
    inquiries: 3,
    featured_image_url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400',
    created_at: '2024-01-15',
    area: 'Salmiya',
  },
  {
    id: '2',
    title: 'Luxury Apartment in Kuwait City',
    price: 180000,
    status: 'pending',
    listing_type: 'sale',
    views: 0,
    inquiries: 0,
    featured_image_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
    created_at: '2024-01-18',
    area: 'Kuwait City',
  },
  {
    id: '3',
    title: 'Cozy Studio for Rent',
    price: 500,
    status: 'rejected',
    listing_type: 'rent',
    views: 0,
    inquiries: 0,
    featured_image_url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400',
    created_at: '2024-01-10',
    area: 'Hawally',
    rejection_reason: 'Images are not clear enough',
  },
]

export default function PropertiesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-neutral-900">My Properties</h1>
          <p className="text-neutral-600">Manage your property listings</p>
        </div>
        <Link href="/dashboard/properties/new">
          <Button className="bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-gold">
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input
            placeholder="Search properties..."
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Properties List */}
      {mockProperties.length > 0 ? (
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="text-left py-4 px-6 font-medium text-neutral-600">Property</th>
                  <th className="text-left py-4 px-4 font-medium text-neutral-600">Status</th>
                  <th className="text-left py-4 px-4 font-medium text-neutral-600">Views</th>
                  <th className="text-left py-4 px-4 font-medium text-neutral-600">Inquiries</th>
                  <th className="text-left py-4 px-4 font-medium text-neutral-600">Date</th>
                  <th className="text-right py-4 px-6 font-medium text-neutral-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockProperties.map((property) => (
                  <tr key={property.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-12 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={property.featured_image_url}
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-neutral-900">{property.title}</h3>
                          <p className="text-sm text-neutral-500">{property.area} • {formatPrice(property.price)}{property.listing_type === 'rent' && '/mo'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium',
                          property.status === 'approved' && 'bg-green-100 text-green-700',
                          property.status === 'pending' && 'bg-amber-100 text-amber-700',
                          property.status === 'rejected' && 'bg-red-100 text-red-700'
                        )}
                      >
                        {property.status === 'approved' && <CheckCircle2 className="h-3 w-3" />}
                        {property.status === 'pending' && <Clock className="h-3 w-3" />}
                        {property.status === 'rejected' && <XCircle className="h-3 w-3" />}
                        {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="flex items-center gap-1 text-neutral-600">
                        <Eye className="h-4 w-4" />
                        {property.views}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="flex items-center gap-1 text-neutral-600">
                        <MessageSquare className="h-4 w-4" />
                        {property.inquiries}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-neutral-600 text-sm">
                      {new Date(property.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/properties/${property.id}`} className="flex items-center gap-2">
                              <Edit className="h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/properties/${property.id}`} className="flex items-center gap-2">
                              <Eye className="h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 focus:text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center">
          <Home className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-neutral-900 mb-2">No properties yet</h2>
          <p className="text-neutral-600 mb-6">
            Start by adding your first property listing
          </p>
          <Link href="/dashboard/properties/new">
            <Button className="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
