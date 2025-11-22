'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Bed, Bath, Maximize, CheckCircle2, Star, Sparkles, Eye } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { FavoriteButton } from '@/components/user/FavoriteButton'
import { formatPrice, formatArea } from '@/lib/utils/formatters'
import { cn } from '@/lib/utils/cn'

interface PropertyCardProps {
  property: {
    id: string
    title: string
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
  }
}

export function PropertyCard({ property }: PropertyCardProps) {

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl bg-white",
        "shadow-md hover:shadow-xl transition-all duration-300",
        "hover:-translate-y-2 hover:scale-[1.02]",
        "animate-fade-in",
        property.featured && "ring-2 ring-primary-400 shadow-lg"
      )}
    >
      <Link href={`/properties/${property.id}`}>
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={property.featured_image_url}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-500
                       group-hover:scale-110"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t
                         from-black/60 via-black/0 to-black/0" />

          {/* Status Badges - Top Left (Multiple) */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {/* Primary status */}
            <Badge
              variant="secondary"
              className="backdrop-blur-sm bg-white/90 font-medium"
            >
              {property.status}
            </Badge>

            {/* Featured badge */}
            {property.featured && (
              <Badge
                className="backdrop-blur-sm bg-gradient-to-r from-primary-500 to-primary-600
                          text-white border-0 font-medium gap-1"
              >
                <Star className="h-3 w-3 fill-white" />
                Featured
              </Badge>
            )}

            {/* Prime badge */}
            {property.prime && (
              <Badge
                className="backdrop-blur-sm bg-gradient-to-r from-purple-500 to-purple-600
                          text-white border-0 font-medium gap-1"
              >
                <Sparkles className="h-3 w-3" />
                Prime
              </Badge>
            )}

            {/* New listing badge */}
            {property.is_new && (
              <Badge
                className="backdrop-blur-sm bg-blue-500 text-white border-0 font-medium"
              >
                New
              </Badge>
            )}

            {/* No commission badge */}
            {property.no_commission && (
              <Badge
                className="backdrop-blur-sm bg-accent-500 text-white border-0 font-medium"
              >
                No Commission
              </Badge>
            )}
          </div>

          {/* Save Button - Top Right */}
          <div className="absolute top-4 right-4">
            <FavoriteButton
              propertyId={property.id}
              propertyTitle={property.title}
              variant="ghost"
              size="icon"
              className="backdrop-blur-sm bg-white/90 hover:bg-white"
            />
          </div>

          {/* Verified badge - Bottom Right */}
          {property.verified && (
            <div className="absolute bottom-4 right-4">
              <div className="flex items-center gap-1 px-2 py-1 rounded-md
                            backdrop-blur-sm bg-green-500/90 text-white text-xs font-medium">
                <CheckCircle2 className="h-3 w-3" />
                <span>Verified</span>
              </div>
            </div>
          )}

          {/* Price */}
          <div className="absolute bottom-4 left-4">
            <p className="text-2xl md:text-3xl font-bold text-white font-display drop-shadow-lg">
              {formatPrice(property.price)}
            </p>
            {property.area_sqm && (
              <p className="text-xs text-white/90 mt-1">
                {formatPrice(Math.round(property.price / property.area_sqm))}/sqm
              </p>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          {/* Title */}
          <h3 className="text-lg md:text-xl font-semibold text-neutral-800 mb-2
                         line-clamp-2 group-hover:text-primary-600
                         transition-colors font-display">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-2 text-neutral-600 mb-3 md:mb-4">
            <MapPin className="h-4 w-4 text-primary-500" />
            <span className="text-sm font-medium">{property.area}</span>
          </div>

          {/* Property specs */}
          <div className="flex items-center gap-4 md:gap-6 text-sm text-neutral-700 mb-3 md:mb-4">
            <div className="flex items-center gap-2">
              <Bed className="h-4 w-4 text-neutral-500" />
              <span>{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="h-4 w-4 text-neutral-500" />
              <span>{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-2">
              <Maximize className="h-4 w-4 text-neutral-500" />
              <span>{formatArea(property.area_sqm)}</span>
            </div>
          </div>

          {/* Additional info */}
          <div className="flex items-center justify-between text-xs text-neutral-500 pt-4 border-t border-neutral-200">
            {property.view_count !== undefined && (
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{property.view_count} views</span>
              </div>
            )}
            {property.days_listed !== undefined && (
              <span>
                {property.days_listed === 0
                  ? 'Today'
                  : property.days_listed === 1
                  ? 'Yesterday'
                  : `${property.days_listed} days ago`}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
