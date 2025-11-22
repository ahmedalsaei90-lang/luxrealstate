'use client'

import { useState, useMemo } from 'react'
import { useFavoritesStore } from '@/lib/stores/favorites-store'
import { PropertyCard } from '@/components/properties/PropertyCard'
import { PropertyListCard } from '@/components/properties/PropertyListCard'
import { ViewToggle, ViewMode } from '@/components/properties/ViewToggle'
import { SortDropdown, SortOption } from '@/components/properties/SortDropdown'
import { Breadcrumb, BreadcrumbItem } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { sortProperties } from '@/lib/data/mock-properties'
import { formatPrice } from '@/lib/utils/formatters'
import { Heart, Trash2, Download, Share2 } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Favorites' },
]

export default function FavoritesPage() {
  const { getFavoriteProperties, clearAll, getCount } = useFavoritesStore()
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sortBy, setSortBy] = useState<SortOption>('recommended')

  const favoriteProperties = getFavoriteProperties()
  const count = getCount()

  // Sort properties
  const sortedProperties = useMemo(() => {
    return sortProperties(favoriteProperties, sortBy)
  }, [favoriteProperties, sortBy])

  // Calculate stats
  const stats = useMemo(() => {
    if (favoriteProperties.length === 0) {
      return { totalValue: 0, avgPrice: 0 }
    }

    const totalValue = favoriteProperties.reduce((sum, p) => sum + p.price, 0)
    const avgPrice = totalValue / favoriteProperties.length

    return { totalValue, avgPrice }
  }, [favoriteProperties])

  const handleClearAll = () => {
    if (confirm('Are you sure you want to remove all favorites?')) {
      clearAll()
      toast.success('All favorites cleared')
    }
  }

  const handleShare = async () => {
    const propertyIds = favoriteProperties.map((p) => p.id).join(',')
    const shareUrl = `${window.location.origin}/favorites?ids=${propertyIds}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Favorite Properties',
          text: `Check out my ${count} favorite properties from Elite Properties Kuwait`,
          url: shareUrl,
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      navigator.clipboard.writeText(shareUrl)
      toast.success('Link copied to clipboard!')
    }
  }

  const handleExport = () => {
    const csvContent = [
      ['Title', 'Type', 'Location', 'Price', 'Bedrooms', 'Bathrooms', 'Area (sqm)', 'Status'].join(','),
      ...favoriteProperties.map((p) =>
        [
          `"${p.title}"`,
          p.property_type,
          `"${p.area}, ${p.governorate}"`,
          p.price,
          p.bedrooms,
          p.bathrooms,
          p.area_sqm,
          p.status,
        ].join(',')
      ),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `favorites-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)

    toast.success('Favorites exported to CSV')
  }

  // Empty state
  if (count === 0) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <div className="bg-white border-b border-neutral-200">
          <div className="container mx-auto px-4 py-4">
            <Breadcrumb items={breadcrumbItems} />
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-neutral-100 mb-6">
              <Heart className="h-10 w-10 text-neutral-400" />
            </div>
            <h1 className="text-3xl font-display font-bold text-neutral-900 mb-4">
              No Favorites Yet
            </h1>
            <p className="text-neutral-600 mb-8">
              Start saving properties you love to view them later. Click the heart icon on any property to add it to your favorites.
            </p>
            <Link href="/properties">
              <Button size="lg">
                Browse Properties
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-12">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} className="mb-4" />
          <h1 className="text-4xl font-display font-bold mb-2">My Favorites</h1>
          <p className="text-white/90">
            You have {count} {count === 1 ? 'property' : 'properties'} saved
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 border border-neutral-200">
            <p className="text-sm text-neutral-600 mb-1">Total Properties</p>
            <p className="text-3xl font-bold text-neutral-900">{count}</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-neutral-200">
            <p className="text-sm text-neutral-600 mb-1">Total Value</p>
            <p className="text-3xl font-bold text-primary-700">
              {formatPrice(stats.totalValue)}
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-neutral-200">
            <p className="text-sm text-neutral-600 mb-1">Average Price</p>
            <p className="text-3xl font-bold text-neutral-900">
              {formatPrice(stats.avgPrice)}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <ViewToggle value={viewMode} onChange={setViewMode} />
            <SortDropdown value={sortBy} onChange={setSortBy} className="w-64" />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={handleClearAll} className="text-red-600 hover:text-red-700">
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>

        {/* Properties Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {sortedProperties.map((property) => (
              <PropertyListCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
