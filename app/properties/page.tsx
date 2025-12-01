'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { PropertyCard } from '@/components/properties/PropertyCard'
import { PropertyListCard } from '@/components/properties/PropertyListCard'
import { PropertyFilterPanel, PropertyFilters } from '@/components/properties/PropertyFilterPanel'
import { ViewToggle, ViewMode } from '@/components/properties/ViewToggle'
import { SortDropdown, SortOption } from '@/components/properties/SortDropdown'
import { mockProperties, filterProperties, sortProperties } from '@/lib/data/mock-properties'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Home, Building2, Search, SlidersHorizontal, X, MapPin, Sparkles, Tag, Loader2 } from 'lucide-react'

const ITEMS_PER_PAGE = 12

// Loading fallback for Suspense
function PropertiesLoading() {
  return (
    <div className="min-h-screen bg-neutral-50 pt-20 md:pt-24 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary-500 mx-auto mb-4" />
        <p className="text-neutral-600">Loading properties...</p>
      </div>
    </div>
  )
}

// Main component that uses useSearchParams
function PropertiesContent() {
  const searchParams = useSearchParams()
  const listingTypeParam = searchParams.get('type') as 'sale' | 'rent' | null

  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sortBy, setSortBy] = useState<SortOption>('recommended')
  const [currentPage, setCurrentPage] = useState(1)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [filters, setFilters] = useState<PropertyFilters>({
    search: '',
    governorates: [],
    propertyTypes: [],
    priceRange: [0, 5000000],
    bedrooms: null,
    bathrooms: null,
    amenities: [],
    listingType: listingTypeParam || undefined,
  })

  // Sync listingType when URL changes
  useEffect(() => {
    setFilters(prev => ({ ...prev, listingType: listingTypeParam || undefined }))
    setCurrentPage(1)
  }, [listingTypeParam])

  // Get page title and description based on listing type
  const pageContent = useMemo(() => {
    switch (listingTypeParam) {
      case 'sale':
        return {
          title: 'Properties for Sale',
          subtitle: 'Buy Your Dream Home',
          description: 'Discover premium properties available for purchase in Kuwait',
          badge: 'FOR SALE',
          badgeColor: 'bg-emerald-500/20 text-emerald-400',
        }
      case 'rent':
        return {
          title: 'Properties for Rent',
          subtitle: 'Find Your Perfect Rental',
          description: 'Browse luxury rental properties across Kuwait',
          badge: 'FOR RENT',
          badgeColor: 'bg-blue-500/20 text-blue-400',
        }
      default:
        return {
          title: 'All Properties',
          subtitle: 'Property in Kuwait',
          description: 'Browse our exclusive collection of premium properties, from luxury villas to modern apartments',
          badge: null,
          badgeColor: '',
        }
    }
  }, [listingTypeParam])

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    const filtered = filterProperties(mockProperties, filters)
    return sortProperties(filtered, sortBy)
  }, [filters, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE)
  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    const end = start + ITEMS_PER_PAGE
    return filteredProperties.slice(start, end)
  }, [filteredProperties, currentPage])

  // Reset to page 1 when filters change
  const handleFiltersChange = (newFilters: PropertyFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handleClearFilters = () => {
    setFilters({
      search: '',
      governorates: [],
      propertyTypes: [],
      priceRange: [0, 5000000],
      bedrooms: null,
      bathrooms: null,
      amenities: [],
      listingType: listingTypeParam || undefined, // Preserve URL-based listing type
    })
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Count active filters
  const activeFilterCount = [
    filters.search,
    filters.governorates.length > 0,
    filters.propertyTypes.length > 0,
    filters.priceRange[0] > 0 || filters.priceRange[1] < 5000000,
    filters.bedrooms !== null,
    filters.bathrooms !== null,
    filters.amenities.length > 0,
  ].filter(Boolean).length

  return (
    <div className="min-h-screen bg-neutral-50 pt-20 md:pt-24">
      {/* Premium Header */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,188,36,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(245,188,36,0.05),transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

        <div className="container mx-auto px-4 py-12 md:py-16 relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-6 animate-fade-in">
            <Link href="/" className="text-neutral-400 hover:text-primary-400 transition-colors">
              <Home className="h-4 w-4" />
            </Link>
            <ChevronRight className="h-4 w-4 text-neutral-600" />
            <span className="text-white font-medium">Properties</span>
          </nav>

          {/* Title & Description */}
          <div className="max-w-2xl animate-fade-in-up animation-delay-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600
                            flex items-center justify-center shadow-gold">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <span className="px-3 py-1 rounded-full bg-primary-500/20 text-primary-400
                             text-sm font-semibold tracking-wide">
                {filteredProperties.length} Properties
              </span>
              {pageContent.badge && (
                <span className={`px-3 py-1 rounded-full text-sm font-semibold tracking-wide ${pageContent.badgeColor}`}>
                  {pageContent.badge}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4 tracking-tight">
              {pageContent.title === 'All Properties' ? 'Discover Your Perfect' : pageContent.title}
              <span className="text-gradient-gold block">{pageContent.subtitle}</span>
            </h1>
            <p className="text-lg text-neutral-400 leading-relaxed">
              {pageContent.description}
            </p>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-neutral-50 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6">
          <Button
            onClick={() => setMobileFiltersOpen(true)}
            variant="outline"
            className="w-full justify-between rounded-xl py-6 border-neutral-200"
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5" />
              <span>Filters</span>
            </div>
            {activeFilterCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-primary-500 text-white text-xs font-semibold">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filters (Desktop) */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-32">
              <PropertyFilterPanel
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClear={handleClearFilters}
                resultCount={filteredProperties.length}
              />
            </div>
          </aside>

          {/* Mobile Filters Overlay */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
              <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-neutral-200 p-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button variant="ghost" size="icon" onClick={() => setMobileFiltersOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="p-4">
                  <PropertyFilterPanel
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    onClear={handleClearFilters}
                    resultCount={filteredProperties.length}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            {/* Controls Bar */}
            <div className="bg-white rounded-2xl shadow-luxury p-4 md:p-5 mb-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-sm text-neutral-600">
                  Showing{' '}
                  <span className="font-semibold text-neutral-900">
                    {filteredProperties.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0}
                  </span>
                  {' - '}
                  <span className="font-semibold text-neutral-900">
                    {Math.min(currentPage * ITEMS_PER_PAGE, filteredProperties.length)}
                  </span>
                  {' of '}
                  <span className="font-semibold text-primary-600">
                    {filteredProperties.length}
                  </span>
                  {' properties'}
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <SortDropdown value={sortBy} onChange={setSortBy} className="w-56" />
                  <ViewToggle value={viewMode} onChange={setViewMode} />
                </div>
              </div>
            </div>

            {/* Properties Grid/List */}
            {filteredProperties.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-luxury p-12 text-center animate-fade-in">
                <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-6">
                  <Search className="h-10 w-10 text-neutral-400" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2 font-display">No properties found</h3>
                <p className="text-neutral-500 mb-6 max-w-md mx-auto">
                  We couldn't find any properties matching your criteria. Try adjusting your filters to see more results.
                </p>
                <Button onClick={handleClearFilters} className="bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-gold">
                  Clear all filters
                </Button>
              </div>
            ) : (
              <>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 mb-8">
                    {paginatedProperties.map((property, index) => (
                      <div
                        key={property.id}
                        className="animate-fade-in-up animation-fill-both"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <PropertyCard property={property} />
                      </div>
                    ))}
                  </div>
                ) : viewMode === 'list' ? (
                  <div className="space-y-6 mb-8">
                    {paginatedProperties.map((property, index) => (
                      <div
                        key={property.id}
                        className="animate-fade-in-up animation-fill-both"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <PropertyListCard property={property} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl shadow-luxury p-12 text-center animate-fade-in">
                    <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-6">
                      <MapPin className="h-10 w-10 text-neutral-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-800 mb-2 font-display">Map View</h3>
                    <p className="text-neutral-500">
                      Interactive map integration coming soon
                    </p>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="bg-white rounded-2xl shadow-luxury p-6 animate-fade-in">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <Button
                        variant="outline"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="rounded-xl"
                      >
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Previous
                      </Button>

                      <div className="flex items-center gap-2">
                        {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                          let pageNum: number
                          if (totalPages <= 7) {
                            pageNum = i + 1
                          } else if (currentPage <= 4) {
                            pageNum = i + 1
                          } else if (currentPage >= totalPages - 3) {
                            pageNum = totalPages - 6 + i
                          } else {
                            pageNum = currentPage - 3 + i
                          }

                          return (
                            <Button
                              key={pageNum}
                              variant={currentPage === pageNum ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => handlePageChange(pageNum)}
                              className={`min-w-[44px] rounded-lg ${
                                currentPage === pageNum
                                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-gold'
                                  : ''
                              }`}
                            >
                              {pageNum}
                            </Button>
                          )
                        })}
                      </div>

                      <Button
                        variant="outline"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="rounded-xl"
                      >
                        Next
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>

                    <p className="text-sm text-neutral-500 text-center mt-4">
                      Page <span className="font-semibold text-neutral-700">{currentPage}</span> of{' '}
                      <span className="font-semibold text-neutral-700">{totalPages}</span>
                    </p>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

// Default export with Suspense boundary (required for useSearchParams)
export default function PropertiesPage() {
  return (
    <Suspense fallback={<PropertiesLoading />}>
      <PropertiesContent />
    </Suspense>
  )
}
