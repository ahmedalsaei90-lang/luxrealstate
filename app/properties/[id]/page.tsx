'use client'

import { useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  Share2,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Car,
  Droplets,
  Dumbbell,
  ShieldCheck,
  Trees,
  Wind,
  Warehouse,
  Phone,
  Mail,
  Calendar,
  Eye,
  CheckCircle2,
} from 'lucide-react'
import { PropertyGallery, PropertyGalleryGrid } from '@/components/properties/PropertyGallery'
import { PropertyCard } from '@/components/properties/PropertyCard'
import { QuickInquiryModal } from '@/components/properties/QuickInquiryModal'
import { FavoriteButton } from '@/components/user/FavoriteButton'
import { WhatsAppButton } from '@/components/properties/WhatsAppButton'
import { Breadcrumb, BreadcrumbItem } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { mockProperties } from '@/lib/data/mock-properties'
import { formatPrice, formatArea } from '@/lib/utils/formatters'
import { toast } from 'sonner'
import { cn } from '@/lib/utils/cn'

const amenityIcons: Record<string, any> = {
  Parking: Car,
  'Swimming Pool': Droplets,
  Gym: Dumbbell,
  Security: ShieldCheck,
  Garden: Trees,
  'Central AC': Wind,
  Storage: Warehouse,
}

export default function PropertyDetailPage() {
  const params = useParams()
  const propertyId = params.id as string

  const property = useMemo(() => {
    return mockProperties.find((p) => p.id === propertyId)
  }, [propertyId])

  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [inquiryOpen, setInquiryOpen] = useState(false)

  // Similar properties (same area or type)
  const similarProperties = useMemo(() => {
    if (!property) return []
    return mockProperties
      .filter(
        (p) =>
          p.id !== property.id &&
          (p.area === property.area || p.property_type === property.property_type)
      )
      .slice(0, 3)
  }, [property])

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">Property not found</h1>
          <p className="text-neutral-600">The property you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Properties', href: '/properties' },
    { label: property.title },
  ]

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: `Check out this property: ${property.title}`,
          url: window.location.href,
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
    }
  }

  const openGallery = (index: number) => {
    setGalleryIndex(index)
    setGalleryOpen(true)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 md:py-6 lg:py-8">
        {/* Gallery */}
        <div className="mb-4 md:mb-6 lg:mb-8">
          <PropertyGalleryGrid
            images={property.images}
            title={property.title}
            onImageClick={openGallery}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4 md:p-6">
              <div className="flex items-start justify-between mb-3 md:mb-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2 md:mb-3">
                    {property.featured && (
                      <Badge className="bg-gradient-to-r from-primary-500 to-primary-600">
                        Featured
                      </Badge>
                    )}
                    {property.verified && (
                      <Badge className="bg-green-500">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    {property.no_commission && (
                      <Badge className="bg-accent-500">No Commission</Badge>
                    )}
                  </div>

                  <h1 className="text-2xl md:text-3xl font-display font-bold text-neutral-900 mb-2">
                    {property.title}
                  </h1>

                  <div className="flex items-center gap-2 text-neutral-600 mb-3 md:mb-4">
                    <MapPin className="h-4 md:h-5 w-4 md:w-5 text-primary-500" />
                    <span className="text-sm md:text-base font-medium">{property.area}, {property.governorate}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-neutral-500">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 md:h-4 w-3 md:w-4" />
                      <span>{property.view_count} views</span>
                    </div>
                    <span>•</span>
                    <span>Listed {property.days_listed} days ago</span>
                  </div>
                </div>

                <div className="flex gap-2 shrink-0">
                  <FavoriteButton
                    propertyId={property.id}
                    propertyTitle={property.title}
                    variant="outline"
                    size="icon"
                    showText={false}
                  />
                  <Button variant="outline" size="icon" onClick={handleShare}>
                    <Share2 className="h-4 md:h-5 w-4 md:w-5" />
                  </Button>
                </div>
              </div>

              <Separator className="my-4 md:my-6" />

              {/* Price & Key Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                <div>
                  <p className="text-xs md:text-sm text-neutral-600 mb-1">Price</p>
                  <p className="text-xl md:text-2xl font-bold text-primary-700 font-display">
                    {formatPrice(property.price)}
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">
                    {formatPrice(Math.round(property.price / property.area_sqm))}/sqm
                  </p>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-neutral-600 mb-1">Bedrooms</p>
                  <div className="flex items-center gap-2">
                    <Bed className="h-4 md:h-5 w-4 md:w-5 text-neutral-500" />
                    <span className="text-lg md:text-xl font-semibold">{property.bedrooms}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-neutral-600 mb-1">Bathrooms</p>
                  <div className="flex items-center gap-2">
                    <Bath className="h-4 md:h-5 w-4 md:w-5 text-neutral-500" />
                    <span className="text-lg md:text-xl font-semibold">{property.bathrooms}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-neutral-600 mb-1">Area</p>
                  <div className="flex items-center gap-2">
                    <Maximize className="h-4 md:h-5 w-4 md:w-5 text-neutral-500" />
                    <span className="text-lg md:text-xl font-semibold">{formatArea(property.area_sqm)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full bg-white border border-neutral-200">
                <TabsTrigger value="overview" className="flex-1">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="features" className="flex-1">
                  Features
                </TabsTrigger>
                <TabsTrigger value="location" className="flex-1">
                  Location
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
                  <h2 className="text-xl font-semibold mb-4">Description</h2>
                  <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
                    {property.description}
                  </p>

                  <Separator className="my-6" />

                  <h3 className="text-lg font-semibold mb-4">Property Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-neutral-600">Property Type</p>
                      <p className="font-medium">{property.property_type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-600">Status</p>
                      <p className="font-medium">{property.status}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-600">Listing Type</p>
                      <p className="font-medium capitalize">{property.listing_type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-600">Reference</p>
                      <p className="font-medium font-mono">EP-{property.id.padStart(4, '0')}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="features" className="mt-6">
                <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
                  <h2 className="text-xl font-semibold mb-4">Amenities & Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {property.amenities.map((amenity) => {
                      const Icon = amenityIcons[amenity] || CheckCircle2
                      return (
                        <div key={amenity} className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary-600" />
                          </div>
                          <span className="font-medium">{amenity}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="location" className="mt-6">
                <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
                  <h2 className="text-xl font-semibold mb-4">Location</h2>
                  <p className="text-neutral-700 mb-4">
                    {property.area}, {property.governorate}, Kuwait
                  </p>
                  <div className="aspect-video bg-neutral-100 rounded-lg flex items-center justify-center">
                    <p className="text-neutral-500">Map integration coming soon</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 sticky top-8">
              <h3 className="text-lg font-semibold mb-4">Contact Agent</h3>

              {property.agent && (
                <div className="flex items-center gap-3 mb-6">
                  <Image
                    src={property.agent.avatar}
                    alt={property.agent.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{property.agent.name}</p>
                    <p className="text-sm text-neutral-600">Licensed Agent</p>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <Button className="w-full" size="lg" onClick={() => setInquiryOpen(true)}>
                  <Mail className="h-5 w-5 mr-2" />
                  Send Message
                </Button>
                <WhatsAppButton
                  property={property}
                  variant="default"
                  size="lg"
                  className="w-full"
                />
                <Button variant="outline" className="w-full" size="lg">
                  <Phone className="h-5 w-5 mr-2" />
                  Call Now
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  <Calendar className="h-5 w-5 mr-2" />
                  Schedule Viewing
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-display font-semibold mb-6">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Gallery Modal */}
      <PropertyGallery
        images={property.images}
        title={property.title}
        open={galleryOpen}
        onOpenChange={setGalleryOpen}
        initialIndex={galleryIndex}
      />

      {/* Inquiry Modal */}
      <QuickInquiryModal
        property={{
          id: property.id,
          title: property.title,
          price: property.price,
          area: property.area,
          featured_image_url: property.featured_image_url,
        }}
        open={inquiryOpen}
        onOpenChange={setInquiryOpen}
        onSubmit={async (data) => {
          console.log('Inquiry submitted:', data)
          await new Promise((resolve) => setTimeout(resolve, 1000))
        }}
      />
    </div>
  )
}
