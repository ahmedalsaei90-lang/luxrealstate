'use client'

import { useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
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
  Crown,
  Star,
  ArrowLeft,
  ChevronRight,
  Building2,
  Home,
} from 'lucide-react'
import { PropertyGallery, PropertyGalleryGrid } from '@/components/properties/PropertyGallery'
import { PropertyCard } from '@/components/properties/PropertyCard'
import { QuickInquiryModal } from '@/components/properties/QuickInquiryModal'
import { FavoriteButton } from '@/components/user/FavoriteButton'
import { WhatsAppButton } from '@/components/properties/WhatsAppButton'
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
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-6">
            <Building2 className="h-10 w-10 text-neutral-400" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-2 font-display">Property not found</h1>
          <p className="text-neutral-600 mb-6">The property you're looking for doesn't exist.</p>
          <Link href="/properties">
            <Button className="bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-gold">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Browse Properties
            </Button>
          </Link>
        </div>
      </div>
    )
  }

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
    <div className="min-h-screen bg-neutral-50 pt-20 md:pt-24">
      {/* Breadcrumb & Quick Nav */}
      <div className="bg-white border-b border-neutral-200 sticky top-20 md:top-24 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-neutral-500 hover:text-primary-600 transition-colors">
                <Home className="h-4 w-4" />
              </Link>
              <ChevronRight className="h-4 w-4 text-neutral-300" />
              <Link href="/properties" className="text-neutral-500 hover:text-primary-600 transition-colors">
                Properties
              </Link>
              <ChevronRight className="h-4 w-4 text-neutral-300" />
              <span className="text-neutral-800 font-medium truncate max-w-[200px]">
                {property.title}
              </span>
            </nav>

            <div className="flex items-center gap-2">
              <FavoriteButton
                propertyId={property.id}
                propertyTitle={property.title}
                variant="outline"
                size="sm"
                className="rounded-lg"
              />
              <Button variant="outline" size="sm" onClick={handleShare} className="rounded-lg">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Gallery */}
        <div className="mb-6 md:mb-8 animate-fade-in">
          <PropertyGalleryGrid
            images={property.images}
            title={property.title}
            onImageClick={openGallery}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <div className="bg-white rounded-2xl shadow-luxury p-6 md:p-8 animate-fade-in-up">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge
                  className={cn(
                    "font-semibold",
                    property.status === 'For Sale'
                      ? "bg-emerald-500 text-white border-0"
                      : "bg-blue-500 text-white border-0"
                  )}
                >
                  {property.status}
                </Badge>
                {property.featured && (
                  <Badge className="bg-gradient-to-r from-primary-500 to-primary-600 text-white border-0 shadow-gold">
                    <Star className="h-3 w-3 mr-1 fill-white" />
                    Featured
                  </Badge>
                )}
                {property.verified && (
                  <Badge className="bg-emerald-100 text-emerald-700 border-0">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
                {property.no_commission && (
                  <Badge className="bg-accent-100 text-accent-700 border-0">No Commission</Badge>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-neutral-900 mb-3">
                {property.title}
              </h1>

              {/* Location */}
              <div className="flex items-center gap-2 text-neutral-600 mb-4">
                <MapPin className="h-5 w-5 text-primary-500" />
                <span className="text-base md:text-lg font-medium">{property.area}, {property.governorate}</span>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 mb-6">
                <div className="flex items-center gap-1.5">
                  <Eye className="h-4 w-4" />
                  <span>{property.view_count} views</span>
                </div>
                <span className="w-1 h-1 rounded-full bg-neutral-300" />
                <span>Listed {property.days_listed} days ago</span>
                <span className="w-1 h-1 rounded-full bg-neutral-300" />
                <span className="font-mono text-xs">Ref: EP-{property.id.padStart(4, '0')}</span>
              </div>

              <Separator className="my-6" />

              {/* Price & Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="col-span-2 md:col-span-1">
                  <p className="text-sm text-neutral-500 mb-1">Price</p>
                  <p className="text-3xl md:text-4xl font-bold text-primary-600 font-display">
                    {formatPrice(property.price)}
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">
                    {formatPrice(Math.round(property.price / property.area_sqm))}/sqm
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500 mb-1">Bedrooms</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
                      <Bed className="h-6 w-6 text-primary-600" />
                    </div>
                    <span className="text-2xl font-bold">{property.bedrooms}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-neutral-500 mb-1">Bathrooms</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
                      <Bath className="h-6 w-6 text-primary-600" />
                    </div>
                    <span className="text-2xl font-bold">{property.bathrooms}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-neutral-500 mb-1">Area</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
                      <Maximize className="h-6 w-6 text-primary-600" />
                    </div>
                    <span className="text-2xl font-bold">{formatArea(property.area_sqm)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full animate-fade-in-up animation-delay-200">
              <TabsList className="w-full bg-white border border-neutral-200 rounded-xl p-1 h-auto">
                <TabsTrigger value="overview" className="flex-1 rounded-lg py-3 data-[state=active]:bg-primary-50 data-[state=active]:text-primary-700">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="features" className="flex-1 rounded-lg py-3 data-[state=active]:bg-primary-50 data-[state=active]:text-primary-700">
                  Features
                </TabsTrigger>
                <TabsTrigger value="location" className="flex-1 rounded-lg py-3 data-[state=active]:bg-primary-50 data-[state=active]:text-primary-700">
                  Location
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="bg-white rounded-2xl shadow-luxury p-6 md:p-8">
                  <h2 className="text-xl font-semibold mb-4 font-display">Description</h2>
                  <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
                    {property.description}
                  </p>

                  <Separator className="my-8" />

                  <h3 className="text-lg font-semibold mb-6 font-display">Property Details</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                      <p className="text-sm text-neutral-500 mb-1">Property Type</p>
                      <p className="font-semibold">{property.property_type}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                      <p className="text-sm text-neutral-500 mb-1">Status</p>
                      <p className="font-semibold">{property.status}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                      <p className="text-sm text-neutral-500 mb-1">Listing Type</p>
                      <p className="font-semibold capitalize">{property.listing_type}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="features" className="mt-6">
                <div className="bg-white rounded-2xl shadow-luxury p-6 md:p-8">
                  <h2 className="text-xl font-semibold mb-6 font-display">Amenities & Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {property.amenities.map((amenity) => {
                      const Icon = amenityIcons[amenity] || CheckCircle2
                      return (
                        <div key={amenity} className="flex items-center gap-4 p-4 rounded-xl bg-neutral-50 border border-neutral-100
                                                     hover:border-primary-200 hover:bg-primary-50/50 transition-all duration-300">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-gold">
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <span className="font-medium text-neutral-800">{amenity}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="location" className="mt-6">
                <div className="bg-white rounded-2xl shadow-luxury p-6 md:p-8">
                  <h2 className="text-xl font-semibold mb-4 font-display">Location</h2>
                  <div className="flex items-center gap-2 text-neutral-700 mb-6">
                    <MapPin className="h-5 w-5 text-primary-500" />
                    <span>{property.area}, {property.governorate}, Kuwait</span>
                  </div>
                  <div className="aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-xl
                                flex items-center justify-center border border-neutral-200">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-neutral-400 mx-auto mb-3" />
                      <p className="text-neutral-500 font-medium">Interactive Map</p>
                      <p className="text-sm text-neutral-400">Coming Soon</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-2xl shadow-luxury p-6 sticky top-44 animate-fade-in-up animation-delay-300">
              <div className="flex items-center gap-2 mb-6">
                <Crown className="h-5 w-5 text-primary-500" />
                <h3 className="text-lg font-semibold font-display">Contact Agent</h3>
              </div>

              {property.agent && (
                <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                  <Image
                    src={property.agent.avatar}
                    alt={property.agent.name}
                    width={64}
                    height={64}
                    className="rounded-full ring-2 ring-primary-100"
                  />
                  <div>
                    <p className="font-semibold text-neutral-900">{property.agent.name}</p>
                    <p className="text-sm text-neutral-500">Licensed Real Estate Agent</p>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-primary-400 text-primary-400" />
                      ))}
                      <span className="text-xs text-neutral-500 ml-1">5.0</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <Button
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white
                           hover:from-primary-600 hover:to-primary-700 shadow-gold rounded-xl py-6"
                  size="lg"
                  onClick={() => setInquiryOpen(true)}
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Send Message
                </Button>
                <WhatsAppButton
                  property={property}
                  variant="default"
                  size="lg"
                  className="w-full rounded-xl py-6"
                />
                <Button variant="outline" className="w-full rounded-xl py-6" size="lg">
                  <Phone className="h-5 w-5 mr-2" />
                  Call Now
                </Button>
                <Button variant="outline" className="w-full rounded-xl py-6" size="lg">
                  <Calendar className="h-5 w-5 mr-2" />
                  Schedule Viewing
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <div className="flex items-center justify-center gap-4 text-sm text-neutral-500">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    <span>Verified</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                    <span>Licensed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <div className="mt-16 md:mt-20 animate-fade-in-up animation-delay-400">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700
                               text-sm font-semibold tracking-wide mb-3">
                  YOU MAY ALSO LIKE
                </span>
                <h2 className="text-2xl md:text-3xl font-display font-semibold">Similar Properties</h2>
              </div>
              <Link href="/properties" className="hidden md:flex items-center gap-2 text-primary-600
                                                 font-semibold hover:text-primary-700 transition-colors">
                View All
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {similarProperties.map((prop, index) => (
                <div
                  key={prop.id}
                  className="animate-fade-in-up animation-fill-both"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <PropertyCard property={prop} />
                </div>
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
