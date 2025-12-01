'use client'

import Link from 'next/link'
import { Heart, Trash2, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFavoritesStore } from '@/lib/stores/favorites-store'
import { formatPrice } from '@/lib/utils/formatters'

export default function FavoritesPage() {
  const { removeFavorite, getFavoriteProperties } = useFavoritesStore()
  const favoriteProperties = getFavoriteProperties()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-neutral-900">Favorites</h1>
        <p className="text-neutral-600">Properties you&apos;ve saved for later</p>
      </div>

      {/* Favorites Grid */}
      {favoriteProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[4/3] bg-neutral-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={property.images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400'}
                  alt={property.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <button
                  onClick={() => removeFavorite(property.id)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white text-red-500 shadow-sm transition-colors"
                >
                  <Heart className="h-5 w-5 fill-current" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-neutral-900 line-clamp-1">{property.title}</h3>
                <p className="text-lg font-bold text-primary-600 mt-1">
                  {formatPrice(property.price)}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <Link href={`/properties/${property.id}`}>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      View Details
                    </Button>
                  </Link>
                  <button
                    onClick={() => removeFavorite(property.id)}
                    className="text-neutral-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center">
          <Heart className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-neutral-900 mb-2">No favorites yet</h2>
          <p className="text-neutral-600 mb-6">
            Browse properties and click the heart icon to save them here
          </p>
          <Link href="/properties">
            <Button className="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
              Browse Properties
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
