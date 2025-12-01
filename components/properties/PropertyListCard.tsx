'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Bed, Bath, Maximize, CheckCircle2, Star, Crown, Eye, Phone, Mail, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FavoriteButton } from '@/components/user/FavoriteButton'
import { formatPrice, formatArea } from '@/lib/utils/formatters'
import { cn } from '@/lib/utils/cn'

interface PropertyListCardProps {
  property: {
    id: string
    title: string
    description?: string
    price: number
    area: string
    bedrooms: number
    bathrooms: number
    area_sqm: number
    featured_image_url: string
    status: string
    featured?: boolean
    verified?: boolean
    prime?: boolean
    is_new?: boolean
    no_commission?: boolean
    view_count?: number
    days_listed?: number
    amenities?: string[]
  }
}

export function PropertyListCard({ property }: PropertyListCardProps) {

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-white",
        "shadow-luxury hover:shadow-luxury-xl transition-all duration-500",
        "flex flex-col sm:flex-row",
        "hover:-translate-y-1",
        "animate-fade-in",
        property.featured && "ring-2 ring-primary-400/50 shadow-gold"
      )}
    >
      <Link href={`/properties/${property.id}`} className="flex flex-col sm:flex-row flex-1">
        {/* Image Container */}
        <div className="relative w-full sm:w-80 lg:w-96 h-64 sm:h-auto flex-shrink-0 overflow-hidden">
          <Image
            src={property.featured_image_url}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent
                         group-hover:from-black/70 transition-all duration-500" />

          {/* Premium shimmer effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100
                         bg-gradient-to-r from-transparent via-white/10 to-transparent
                         -translate-x-full group-hover:translate-x-full
                         transition-all duration-1000 ease-out" />

          {/* Status Badges - Top Left */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <Badge
              className={cn(
                "backdrop-blur-md font-semibold tracking-wide",
                property.status === 'For Sale'
                  ? "bg-emerald-500/90 text-white border-0"
                  : "bg-blue-500/90 text-white border-0"
              )}
            >
              {property.status}
            </Badge>

            {property.featured && (
              <Badge
                className="backdrop-blur-md bg-gradient-to-r from-primary-500 to-primary-600
                          text-white border-0 font-semibold gap-1.5 shadow-gold"
              >
                <Star className="h-3 w-3 fill-white" />
                Featured
              </Badge>
            )}

            {property.prime && (
              <Badge
                className="backdrop-blur-md bg-gradient-to-r from-purple-500 to-purple-600
                          text-white border-0 font-semibold gap-1.5"
              >
                <Crown className="h-3 w-3" />
                Prime
              </Badge>
            )}

            {property.is_new && (
              <Badge
                className="backdrop-blur-md bg-blue-500/90 text-white border-0 font-semibold
                          animate-pulse-soft"
              >
                New
              </Badge>
            )}

            {property.no_commission && (
              <Badge
                className="backdrop-blur-md bg-accent-500/90 text-white border-0 font-semibold"
              >
                No Commission
              </Badge>
            )}
          </div>

          {/* Save Button - Top Right */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100
                         transition-opacity duration-300">
            <FavoriteButton
              propertyId={property.id}
              propertyTitle={property.title}
              variant="ghost"
              size="icon"
              className="backdrop-blur-md bg-white/90 hover:bg-white shadow-luxury
                       hover:scale-110 transition-transform duration-300"
            />
          </div>

          {/* Verified badge - Bottom Right */}
          {property.verified && (
            <div className="absolute bottom-4 right-4">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full
                            backdrop-blur-md bg-emerald-500/90 text-white text-xs font-semibold
                            shadow-lg">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Verified</span>
              </div>
            </div>
          )}

          {/* Price on Image - Bottom Left (Mobile) */}
          <div className="absolute bottom-4 left-4 sm:hidden">
            <p className="text-2xl font-bold text-white font-display drop-shadow-lg">
              {formatPrice(property.price)}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 md:p-6 lg:p-8 flex flex-col">
          {/* Price - Desktop */}
          <div className="hidden sm:block mb-3">
            <p className="text-2xl md:text-3xl font-bold text-primary-700 font-display">
              {formatPrice(property.price)}
            </p>
            {property.area_sqm && (
              <p className="text-xs md:text-sm text-neutral-500 mt-1">
                {formatPrice(Math.round(property.price / property.area_sqm))}/sqm
              </p>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-neutral-800 mb-2
                         line-clamp-1 group-hover:text-primary-600
                         transition-colors duration-300 font-display">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-2 text-neutral-600 mb-3">
            <MapPin className="h-4 w-4 text-primary-500" />
            <span className="text-sm font-medium">{property.area}</span>
          </div>

          {/* Description */}
          {property.description && (
            <p className="text-sm text-neutral-600 mb-4 line-clamp-2 leading-relaxed">
              {property.description}
            </p>
          )}

          {/* Property specs */}
          <div className="flex items-center gap-4 md:gap-6 text-sm text-neutral-700 mb-4
                         pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center">
                <Bed className="h-4 w-4 text-primary-600" />
              </div>
              <div>
                <p className="font-semibold">{property.bedrooms}</p>
                <p className="text-xs text-neutral-500">Beds</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center">
                <Bath className="h-4 w-4 text-primary-600" />
              </div>
              <div>
                <p className="font-semibold">{property.bathrooms}</p>
                <p className="text-xs text-neutral-500">Baths</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center">
                <Maximize className="h-4 w-4 text-primary-600" />
              </div>
              <div>
                <p className="font-semibold">{formatArea(property.area_sqm)}</p>
                <p className="text-xs text-neutral-500">Area</p>
              </div>
            </div>
          </div>

          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {property.amenities.slice(0, 4).map((amenity) => (
                <span key={amenity} className="text-xs px-3 py-1.5 bg-neutral-50 text-neutral-600
                                              rounded-full border border-neutral-100 font-medium">
                  {amenity}
                </span>
              ))}
              {property.amenities.length > 4 && (
                <span className="text-xs px-3 py-1.5 bg-primary-50 text-primary-600
                                rounded-full border border-primary-100 font-medium">
                  +{property.amenities.length - 4} more
                </span>
              )}
            </div>
          )}

          {/* Bottom row */}
          <div className="flex items-center justify-between mt-auto pt-4">
            <div className="flex items-center gap-4 text-xs text-neutral-500">
              {property.view_count !== undefined && (
                <div className="flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5" />
                  <span>{property.view_count} views</span>
                </div>
              )}
              {property.days_listed !== undefined && (
                <span className="text-neutral-400">
                  {property.days_listed === 0
                    ? 'Listed today'
                    : property.days_listed === 1
                    ? 'Listed yesterday'
                    : `${property.days_listed} days ago`}
                </span>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="rounded-lg border-neutral-200 hover:border-primary-300
                         hover:bg-primary-50 transition-all duration-300"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
              >
                <Phone className="h-4 w-4 mr-1.5" />
                Call
              </Button>
              <Button
                size="sm"
                className="rounded-lg bg-gradient-to-r from-primary-500 to-primary-600
                         hover:from-primary-600 hover:to-primary-700 shadow-gold
                         transition-all duration-300"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
              >
                <Mail className="h-4 w-4 mr-1.5" />
                Inquire
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
