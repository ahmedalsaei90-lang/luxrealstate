'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Filter, Home, Eye, CheckCircle2, Clock, XCircle, Star, MoreVertical, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils/cn'
import { formatPrice } from '@/lib/utils/formatters'

// Mock data
const allProperties = [
  {
    id: '1',
    title: 'Luxury Villa with Private Pool',
    price: 450000,
    status: 'approved',
    featured: true,
    user: 'Ahmed Al-Sabah',
    area: 'Salmiya',
    views: 1245,
    created_at: '2024-01-15',
    featured_image_url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=200',
  },
  {
    id: '2',
    title: 'Modern Apartment in Kuwait City',
    price: 180000,
    status: 'pending',
    featured: false,
    user: 'Sara Al-Mutairi',
    area: 'Kuwait City',
    views: 0,
    created_at: '2024-01-18',
    featured_image_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200',
  },
  {
    id: '3',
    title: 'Cozy Studio for Rent',
    price: 500,
    status: 'rejected',
    featured: false,
    user: 'Mohammed Al-Rashid',
    area: 'Hawally',
    views: 0,
    created_at: '2024-01-10',
    featured_image_url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200',
  },
  {
    id: '4',
    title: 'Beachfront Villa in Julaia',
    price: 850000,
    status: 'approved',
    featured: true,
    user: 'Fatima Al-Abdullah',
    area: 'Julaia',
    views: 2356,
    created_at: '2024-01-05',
    featured_image_url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200',
  },
]

export default function AdminPropertiesPage() {
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredProperties = statusFilter === 'all'
    ? allProperties
    : allProperties.filter(p => p.status === statusFilter)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-neutral-900">All Properties</h1>
        <p className="text-neutral-600">Manage all property listings on the platform</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input placeholder="Search properties..." className="pl-10" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Properties Table */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50">
                <th className="text-left py-4 px-6 font-medium text-neutral-600">Property</th>
                <th className="text-left py-4 px-4 font-medium text-neutral-600">Status</th>
                <th className="text-left py-4 px-4 font-medium text-neutral-600">Owner</th>
                <th className="text-left py-4 px-4 font-medium text-neutral-600">Views</th>
                <th className="text-left py-4 px-4 font-medium text-neutral-600">Date</th>
                <th className="text-right py-4 px-6 font-medium text-neutral-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties.map((property) => (
                <tr key={property.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0 relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={property.featured_image_url}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                        {property.featured && (
                          <div className="absolute top-1 left-1">
                            <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-neutral-900">{property.title}</h3>
                        <p className="text-sm text-neutral-500">{property.area} • {formatPrice(property.price)}</p>
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
                  <td className="py-4 px-4 text-neutral-600">{property.user}</td>
                  <td className="py-4 px-4">
                    <span className="flex items-center gap-1 text-neutral-600">
                      <Eye className="h-4 w-4" />
                      {property.views.toLocaleString()}
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
                          <Link href={`/properties/${property.id}`} className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Star className="h-4 w-4" />
                          {property.featured ? 'Remove Featured' : 'Mark Featured'}
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
    </div>
  )
}
