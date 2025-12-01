'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Clock, CheckCircle2, XCircle, Eye, MapPin, Bed, Bath, Maximize, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils/cn'
import { formatPrice } from '@/lib/utils/formatters'
import { toast } from 'sonner'

// Mock data
const pendingProperties = [
  {
    id: '1',
    title: 'Luxury Villa with Private Pool in Salmiya',
    description: 'Stunning 5-bedroom villa featuring a private swimming pool, landscaped garden, and modern finishes throughout. Perfect for families seeking luxury living.',
    price: 450000,
    listing_type: 'sale',
    property_type: 'Villa',
    governorate: 'Hawally',
    area: 'Salmiya',
    bedrooms: 5,
    bathrooms: 6,
    area_sqm: 650,
    featured_image_url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600',
    ],
    user: {
      name: 'Ahmed Al-Sabah',
      email: 'ahmed@example.com',
    },
    submitted_at: '2024-01-19T10:30:00',
  },
  {
    id: '2',
    title: 'Modern 3BR Apartment in Kuwait City',
    description: 'Contemporary apartment in the heart of Kuwait City with stunning city views. Features include smart home technology and premium finishes.',
    price: 180000,
    listing_type: 'sale',
    property_type: 'Apartment',
    governorate: 'Al Asimah (Capital)',
    area: 'Kuwait City',
    bedrooms: 3,
    bathrooms: 3,
    area_sqm: 220,
    featured_image_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600',
    ],
    user: {
      name: 'Sara Al-Mutairi',
      email: 'sara@example.com',
    },
    submitted_at: '2024-01-18T15:45:00',
  },
]

export default function PendingApprovalsPage() {
  const [selectedProperty, setSelectedProperty] = useState<typeof pendingProperties[0] | null>(null)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [rejectionReason, setRejectionReason] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleApprove = async (propertyId: string) => {
    setIsProcessing(true)
    // TODO: Call Supabase to update status
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast.success('Property approved successfully!')
    setSelectedProperty(null)
    setIsProcessing(false)
  }

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      toast.error('Please provide a rejection reason')
      return
    }
    setIsProcessing(true)
    // TODO: Call Supabase to update status with reason
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast.success('Property rejected')
    setIsRejectDialogOpen(false)
    setSelectedProperty(null)
    setRejectionReason('')
    setIsProcessing(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-neutral-900">Pending Approvals</h1>
        <p className="text-neutral-600">Review and approve property listings</p>
      </div>

      {/* Stats */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-4">
        <div className="p-3 rounded-lg bg-amber-100">
          <Clock className="h-6 w-6 text-amber-600" />
        </div>
        <div>
          <p className="text-2xl font-bold text-amber-700">{pendingProperties.length}</p>
          <p className="text-sm text-amber-600">Properties awaiting review</p>
        </div>
      </div>

      {/* Properties Grid */}
      {pendingProperties.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {pendingProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Image */}
              <div className="relative aspect-[16/9] bg-neutral-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={property.featured_image_url}
                  alt={property.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-amber-500 text-white text-sm font-medium rounded-full flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    Pending Review
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{property.title}</h3>

                <div className="flex items-center gap-2 text-neutral-600 mb-3">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{property.area}, {property.governorate}</span>
                </div>

                <p className="text-2xl font-bold text-primary-600 mb-4">
                  {formatPrice(property.price)}
                  {property.listing_type === 'rent' && '/mo'}
                </p>

                <div className="flex items-center gap-4 text-sm text-neutral-600 mb-4">
                  <span className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    {property.bedrooms} Beds
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    {property.bathrooms} Baths
                  </span>
                  <span className="flex items-center gap-1">
                    <Maximize className="h-4 w-4" />
                    {property.area_sqm} sqm
                  </span>
                </div>

                {/* Submitter Info */}
                <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">{property.user.name}</p>
                    <p className="text-sm text-neutral-500">
                      Submitted {new Date(property.submitted_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => handleApprove(property.id)}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => {
                      setSelectedProperty(property)
                      setIsRejectDialogOpen(true)
                    }}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSelectedProperty(property)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-neutral-900 mb-2">All caught up!</h2>
          <p className="text-neutral-600">
            There are no properties pending approval at the moment.
          </p>
        </div>
      )}

      {/* Property Detail Modal */}
      <Dialog open={!!selectedProperty && !isRejectDialogOpen} onOpenChange={() => setSelectedProperty(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProperty && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProperty.title}</DialogTitle>
                <DialogDescription>
                  Submitted by {selectedProperty.user.name} on {new Date(selectedProperty.submitted_at).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Images */}
                <div className="grid grid-cols-2 gap-4">
                  {selectedProperty.images.map((img, idx) => (
                    <div key={idx} className="aspect-[4/3] rounded-lg overflow-hidden bg-neutral-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-neutral-500">Price</p>
                    <p className="font-semibold text-lg">{formatPrice(selectedProperty.price)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Type</p>
                    <p className="font-semibold">{selectedProperty.property_type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Location</p>
                    <p className="font-semibold">{selectedProperty.area}, {selectedProperty.governorate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Specs</p>
                    <p className="font-semibold">{selectedProperty.bedrooms} BR • {selectedProperty.bathrooms} BA • {selectedProperty.area_sqm} sqm</p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <p className="text-sm text-neutral-500 mb-1">Description</p>
                  <p className="text-neutral-700">{selectedProperty.description}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => handleApprove(selectedProperty.id)}
                    disabled={isProcessing}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Approve Property
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => setIsRejectDialogOpen(true)}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject Property
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Property</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this property. This will be shared with the property owner.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label htmlFor="reason">Rejection Reason *</Label>
              <Textarea
                id="reason"
                placeholder="e.g., Images are not clear enough, Missing important details..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
                className="mt-1"
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setIsRejectDialogOpen(false)
                  setRejectionReason('')
                }}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-red-600 hover:bg-red-700"
                onClick={handleReject}
                disabled={isProcessing}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Confirm Rejection
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
