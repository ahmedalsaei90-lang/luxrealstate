'use client'

import Link from 'next/link'
import { MapPin, Bed, Bath, Maximize, CheckCircle2, Star, Sparkles, Eye, Crown } from 'lucide-react'
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
        "group relative overflow-hidden rounded-2xl bg-white",
        "shadow-luxury hover:shadow-luxury-xl transition-all duration-500",
        "hover:-translate-y-3 hover:scale-[1.01]",
        property.featured && "ring-2 ring-primary-400/50 shadow-gold"
      )}
    >
      <Link href={`/properties/${property.id}`}>
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={property.featured_image_url}
            alt={property.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700
                       group-hover:scale-110"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t
                         from-black/70 via-black/20 to-transparent
                         group-hover:from-black/80 transition-all duration-500" />

          {/* Premium shimmer effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100
                         bg-gradient-to-r from-transparent via-white/10 to-transparent
                         -translate-x-full group-hover:translate-x-full
                         transition-all duration-1000 ease-out" />

          {/* Status Badges - Top Left (Multiple) */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {/* Primary status */}
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

            {/* Featured badge */}
            {property.featured && (
              <Badge
                className="backdrop-blur-md bg-gradient-to-r from-primary-500 to-primary-600
                          text-white border-0 font-semibold gap-1.5 shadow-gold"
              >
                <Star className="h-3 w-3 fill-white" />
                Featured
              </Badge>
            )}

            {/* Prime badge */}
            {property.prime && (
              <Badge
                className="backdrop-blur-md bg-gradient-to-r from-purple-500 to-purple-600
                          text-white border-0 font-semibold gap-1.5"
              >
                <Crown className="h-3 w-3" />
                Prime
              </Badge>
            )}

            {/* New listing badge */}
            {property.is_new && (
              <Badge
                className="backdrop-blur-md bg-blue-500/90 text-white border-0 font-semibold
                          animate-pulse-soft"
              >
                New
              </Badge>
            )}

            {/* No commission badge */}
            {property.no_commission && (
              <Badge
                className="backdrop-blur-md bg-accent-500/90 text-white border-0 font-semibold"
              >
                No Commission
              </Badge>
            )}
          </div>

          {/* Save Button - Top Right */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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

          {/* Price - Bottom Left */}
          <div className="absolute bottom-4 left-4">
            <p className="text-2xl md:text-3xl font-bold text-white font-display
                         drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              {formatPrice(property.price)}
            </p>
            {property.area_sqm && (
              <p className="text-xs text-white/80 mt-1 font-medium">
                {formatPrice(Math.round(property.price / property.area_sqm))}/sqm
              </p>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          {/* Title */}
          <h3 className="text-lg md:text-xl font-semibold text-neutral-800 mb-2.5
                         line-clamp-2 group-hover:text-primary-600
                         transition-colors duration-300 font-display">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-2 text-neutral-600 mb-4">
            <MapPin className="h-4 w-4 text-primary-500" />
            <span className="text-sm font-medium">{property.area}</span>
          </div>

          {/* Property specs */}
          <div className="flex items-center gap-4 md:gap-5 text-sm text-neutral-700 mb-4
                         pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                <Bed className="h-4 w-4 text-primary-600" />
              </div>
              <span className="font-medium">{property.bedrooms}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                <Bath className="h-4 w-4 text-primary-600" />
              </div>
              <span className="font-medium">{property.bathrooms}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                <Maximize className="h-4 w-4 text-primary-600" />
              </div>
              <span className="font-medium">{formatArea(property.area_sqm)}</span>
            </div>
          </div>

          {/* Additional info */}
          <div className="flex items-center justify-between text-xs text-neutral-500">
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
        </div>
      </Link>
    </div>
  )
}
