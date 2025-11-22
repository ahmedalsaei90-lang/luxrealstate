'use client'

import { useState, useMemo } from 'react'
import { PropertyCard } from '@/components/properties/PropertyCard'
import { PropertyListCard } from '@/components/properties/PropertyListCard'
import { PropertyFilterPanel, PropertyFilters } from '@/components/properties/PropertyFilterPanel'
import { ViewToggle, ViewMode } from '@/components/properties/ViewToggle'
import { SortDropdown, SortOption } from '@/components/properties/SortDropdown'
import { Breadcrumb, BreadcrumbItem } from '@/components/ui/breadcrumb'
import { PropertyListingSkeleton } from '@/components/properties/PropertyCardSkeleton'
import { mockProperties, filterProperties, sortProperties } from '@/lib/data/mock-properties'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const ITEMS_PER_PAGE = 12

export default function PropertiesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sortBy, setSortBy] = useState<SortOption>('recommended')
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<PropertyFilters>({
    search: '',
    governorates: [],
    propertyTypes: [],
    priceRange: [0, 5000000],
    bedrooms: null,
    bathrooms: null,
    amenities: [],
  })

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
    })
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Properties' },
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 py-6">
          <Breadcrumb items={breadcrumbItems} className="mb-4" />
          <h1 className="text-4xl font-display font-semibold text-neutral-900 mb-2">
            Properties for Sale
          </h1>
          <p className="text-neutral-600">
            Discover your dream property from our exclusive collection
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filters */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-8">
              <PropertyFilterPanel
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClear={handleClearFilters}
                resultCount={filteredProperties.length}
              />
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            {/* Controls */}
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-sm text-neutral-600">
                  Showing{' '}
                  <span className="font-semibold text-neutral-900">
                    {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                  </span>
                  {' - '}
                  <span className="font-semibold text-neutral-900">
                    {Math.min(currentPage * ITEMS_PER_PAGE, filteredProperties.length)}
                  </span>
                  {' of '}
                  <span className="font-semibold text-neutral-900">
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
              <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-12 text-center">
                <p className="text-xl text-neutral-600 mb-2">No properties found</p>
                <p className="text-neutral-500 mb-4">
                  Try adjusting your filters to see more results
                </p>
                <Button onClick={handleClearFilters} variant="outline">
                  Clear all filters
                </Button>
              </div>
            ) : (
              <>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                    {paginatedProperties.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                      />
                    ))}
                  </div>
                ) : viewMode === 'list' ? (
                  <div className="space-y-6 mb-8">
                    {paginatedProperties.map((property) => (
                      <PropertyListCard
                        key={property.id}
                        property={property}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-12 text-center">
                    <p className="text-xl text-neutral-600 mb-2">Map View</p>
                    <p className="text-neutral-500">
                      Map integration coming soon
                    </p>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
                    <div className="flex items-center justify-between">
                      <Button
                        variant="outline"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
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
                              className="min-w-[40px]"
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
                      >
                        Next
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>

                    <p className="text-sm text-neutral-600 text-center mt-4">
                      Page {currentPage} of {totalPages}
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
