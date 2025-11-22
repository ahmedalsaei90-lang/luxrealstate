'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Bed, Bath, Maximize, CheckCircle2, Star, Sparkles, Eye, Phone, Mail } from 'lucide-react'
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ x: 4 }}
      className={cn(
        "group relative overflow-hidden rounded-xl bg-white",
        "shadow-md hover:shadow-lg transition-all duration-300",
        "flex flex-col sm:flex-row",
        property.featured && "ring-2 ring-primary-400 shadow-lg"
      )}
    >
      <Link href={`/properties/${property.id}`} className="flex flex-col sm:flex-row flex-1">
        {/* Image */}
        <div className="relative w-full sm:w-80 h-64 sm:h-auto flex-shrink-0">
          <Image
            src={property.featured_image_url}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />

          {/* Status Badges - Top Left */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <Badge variant="secondary" className="backdrop-blur-sm bg-white/90 font-medium">
              {property.status}
            </Badge>

            {property.featured && (
              <Badge className="backdrop-blur-sm bg-gradient-to-r from-primary-500 to-primary-600 text-white border-0 font-medium gap-1">
                <Star className="h-3 w-3 fill-white" />
                Featured
              </Badge>
            )}

            {property.prime && (
              <Badge className="backdrop-blur-sm bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 font-medium gap-1">
                <Sparkles className="h-3 w-3" />
                Prime
              </Badge>
            )}

            {property.is_new && (
              <Badge className="backdrop-blur-sm bg-blue-500 text-white border-0 font-medium">
                New
              </Badge>
            )}

            {property.no_commission && (
              <Badge className="backdrop-blur-sm bg-accent-500 text-white border-0 font-medium">
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
              <div className="flex items-center gap-1 px-2 py-1 rounded-md backdrop-blur-sm bg-green-500/90 text-white text-xs font-medium">
                <CheckCircle2 className="h-3 w-3" />
                <span>Verified</span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 md:p-6 flex flex-col">
          {/* Price */}
          <div className="mb-2 md:mb-3">
            <p className="text-2xl md:text-3xl font-bold text-primary-700 font-display">
              {formatPrice(property.price)}
            </p>
            {property.area_sqm && (
              <p className="text-xs md:text-sm text-neutral-600 mt-1">
                {formatPrice(Math.round(property.price / property.area_sqm))}/sqm
              </p>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg md:text-xl font-semibold text-neutral-800 mb-2 line-clamp-1 group-hover:text-primary-600 transition-colors font-display">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-2 text-neutral-600 mb-2 md:mb-3">
            <MapPin className="h-4 w-4 text-primary-500" />
            <span className="text-sm font-medium">{property.area}</span>
          </div>

          {/* Description */}
          {property.description && (
            <p className="text-sm text-neutral-600 mb-3 md:mb-4 line-clamp-2">
              {property.description}
            </p>
          )}

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

          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {property.amenities.slice(0, 4).map((amenity) => (
                <span key={amenity} className="text-xs px-2 py-1 bg-neutral-100 text-neutral-700 rounded-md">
                  {amenity}
                </span>
              ))}
              {property.amenities.length > 4 && (
                <span className="text-xs px-2 py-1 bg-neutral-100 text-neutral-700 rounded-md">
                  +{property.amenities.length - 4} more
                </span>
              )}
            </div>
          )}

          {/* Bottom row */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-200">
            <div className="flex items-center gap-4 text-xs text-neutral-500">
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

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
              >
                <Phone className="h-4 w-4 mr-1" />
                Call
              </Button>
              <Button
                size="sm"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
              >
                <Mail className="h-4 w-4 mr-1" />
                Inquire
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
