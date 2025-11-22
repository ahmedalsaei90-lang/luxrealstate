'use client'

import { useState } from 'react'
import { PropertyCard } from '@/components/properties/PropertyCard'
import { PropertyListCard } from '@/components/properties/PropertyListCard'
import { PropertyFilterPanel, PropertyFilters } from '@/components/properties/PropertyFilterPanel'
import { ViewToggle, ViewMode } from '@/components/properties/ViewToggle'
import { SortDropdown, SortOption } from '@/components/properties/SortDropdown'
import { Breadcrumb, BreadcrumbItem } from '@/components/ui/breadcrumb'
import { PropertyCardSkeleton } from '@/components/properties/PropertyCardSkeleton'
import { TrustBadges } from '@/components/properties/TrustBadges'
import { QuickInquiryModal } from '@/components/properties/QuickInquiryModal'
import { Button } from '@/components/ui/button'
import { mockProperties } from '@/lib/data/mock-properties'
import { toast } from 'sonner'

const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Components', href: '/demo' },
  { label: 'Showcase' },
]

export default function DemoPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sortBy, setSortBy] = useState<SortOption>('recommended')
  const [inquiryOpen, setInquiryOpen] = useState(false)
  const [filters, setFilters] = useState<PropertyFilters>({
    search: '',
    governorates: [],
    propertyTypes: [],
    priceRange: [0, 5000000],
    bedrooms: null,
    bathrooms: null,
    amenities: [],
  })

  const sampleProperty = mockProperties[0]

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-display font-bold mb-4">Component Showcase</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Explore all the UI components built for Elite Properties Kuwait
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Breadcrumb items={breadcrumbItems} className="mb-8" />

        {/* Components Grid */}
        <div className="space-y-16">
          {/* Breadcrumb */}
          <section>
            <h2 className="text-3xl font-display font-semibold mb-4">Breadcrumb</h2>
            <p className="text-neutral-600 mb-6">Navigation breadcrumb with responsive design</p>
            <div className="bg-white rounded-lg p-6 border border-neutral-200">
              <Breadcrumb items={[{ label: 'Properties', href: '/properties' }, { label: 'Villa' }]} />
            </div>
          </section>

          {/* PropertyCard */}
          <section>
            <h2 className="text-3xl font-display font-semibold mb-4">Property Card (Grid View)</h2>
            <p className="text-neutral-600 mb-6">Feature-rich property card with animations and badges</p>
            <div className="bg-white rounded-lg p-6 border border-neutral-200">
              <div className="max-w-sm">
                <PropertyCard
                  property={sampleProperty}
                />
              </div>
            </div>
          </section>

          {/* PropertyListCard */}
          <section>
            <h2 className="text-3xl font-display font-semibold mb-4">Property List Card</h2>
            <p className="text-neutral-600 mb-6">Horizontal layout for list view</p>
            <div className="bg-white rounded-lg p-6 border border-neutral-200">
              <PropertyListCard
                property={sampleProperty}
              />
            </div>
          </section>

          {/* View Toggle */}
          <section>
            <h2 className="text-3xl font-display font-semibold mb-4">View Toggle</h2>
            <p className="text-neutral-600 mb-6">Switch between grid, list, and map views</p>
            <div className="bg-white rounded-lg p-6 border border-neutral-200">
              <ViewToggle value={viewMode} onChange={setViewMode} />
            </div>
          </section>

          {/* Sort Dropdown */}
          <section>
            <h2 className="text-3xl font-display font-semibold mb-4">Sort Dropdown</h2>
            <p className="text-neutral-600 mb-6">Multi-option sorting selector</p>
            <div className="bg-white rounded-lg p-6 border border-neutral-200">
              <SortDropdown value={sortBy} onChange={setSortBy} className="w-64" />
            </div>
          </section>

          {/* Trust Badges */}
          <section>
            <h2 className="text-3xl font-display font-semibold mb-4">Trust Badges</h2>
            <p className="text-neutral-600 mb-6">Verification and trust indicators with tooltips</p>
            <div className="bg-white rounded-lg p-6 border border-neutral-200">
              <TrustBadges
                badges={[
                  { type: 'verified', enabled: true },
                  { type: 'licensed', enabled: true },
                  { type: 'no-fees', enabled: true },
                  { type: 'support', enabled: true },
                ]}
              />
            </div>
          </section>

          {/* Loading Skeleton */}
          <section>
            <h2 className="text-3xl font-display font-semibold mb-4">Loading Skeleton</h2>
            <p className="text-neutral-600 mb-6">Shimmer loading states for property cards</p>
            <div className="bg-white rounded-lg p-6 border border-neutral-200">
              <div className="max-w-sm">
                <PropertyCardSkeleton />
              </div>
            </div>
          </section>

          {/* Filter Panel */}
          <section>
            <h2 className="text-3xl font-display font-semibold mb-4">Property Filter Panel</h2>
            <p className="text-neutral-600 mb-6">Comprehensive filtering with search, location, price, and amenities</p>
            <div className="bg-white rounded-lg p-6 border border-neutral-200">
              <div className="max-w-sm">
                <PropertyFilterPanel
                  filters={filters}
                  onFiltersChange={setFilters}
                  onClear={() => setFilters({
                    search: '',
                    governorates: [],
                    propertyTypes: [],
                    priceRange: [0, 5000000],
                    bedrooms: null,
                    bathrooms: null,
                    amenities: [],
                  })}
                  resultCount={50}
                />
              </div>
            </div>
          </section>

          {/* Quick Inquiry Modal */}
          <section>
            <h2 className="text-3xl font-display font-semibold mb-4">Quick Inquiry Modal</h2>
            <p className="text-neutral-600 mb-6">Contact form with validation and success animation</p>
            <div className="bg-white rounded-lg p-6 border border-neutral-200">
              <Button onClick={() => setInquiryOpen(true)}>
                Open Inquiry Modal
              </Button>
            </div>
          </section>

          {/* Color Palette */}
          <section>
            <h2 className="text-3xl font-display font-semibold mb-4">Color Palette</h2>
            <p className="text-neutral-600 mb-6">Luxury design system colors</p>
            <div className="bg-white rounded-lg p-6 border border-neutral-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="h-24 rounded-lg bg-primary-500 mb-2"></div>
                  <p className="text-sm font-medium">Primary</p>
                  <p className="text-xs text-neutral-500">#f1ad3e</p>
                </div>
                <div>
                  <div className="h-24 rounded-lg bg-accent-500 mb-2"></div>
                  <p className="text-sm font-medium">Accent</p>
                  <p className="text-xs text-neutral-500">#14b8a6</p>
                </div>
                <div>
                  <div className="h-24 rounded-lg bg-green-500 mb-2"></div>
                  <p className="text-sm font-medium">Success</p>
                  <p className="text-xs text-neutral-500">#10b981</p>
                </div>
                <div>
                  <div className="h-24 rounded-lg bg-neutral-800 mb-2"></div>
                  <p className="text-sm font-medium">Neutral</p>
                  <p className="text-xs text-neutral-500">#44403c</p>
                </div>
              </div>
            </div>
          </section>

          {/* Typography */}
          <section>
            <h2 className="text-3xl font-display font-semibold mb-4">Typography</h2>
            <p className="text-neutral-600 mb-6">Premium font system</p>
            <div className="bg-white rounded-lg p-6 border border-neutral-200 space-y-4">
              <div>
                <p className="text-sm text-neutral-500 mb-2">Display Font (Cormorant Garamond)</p>
                <h1 className="text-4xl font-display font-bold">Elite Properties Kuwait</h1>
              </div>
              <div>
                <p className="text-sm text-neutral-500 mb-2">Accent Font (Playfair Display)</p>
                <p className="text-2xl font-accent font-semibold">Where Luxury Meets Comfort</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500 mb-2">Body Font (Inter)</p>
                <p className="text-base font-body">Discover exceptional properties curated for discerning investors and families seeking the finest real estate in Kuwait.</p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center py-12 border-t border-neutral-200">
          <h3 className="text-2xl font-display font-semibold mb-4">Ready to Explore?</h3>
          <p className="text-neutral-600 mb-6">Check out the live application pages</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild size="lg">
              <a href="/">Homepage</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/properties">Property Listings</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/properties/1">Property Detail</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <QuickInquiryModal
        property={{
          id: sampleProperty.id,
          title: sampleProperty.title,
          price: sampleProperty.price,
          area: sampleProperty.area,
          featured_image_url: sampleProperty.featured_image_url,
        }}
        open={inquiryOpen}
        onOpenChange={setInquiryOpen}
        onSubmit={async (data) => {
          console.log('Demo inquiry:', data)
          await new Promise((resolve) => setTimeout(resolve, 1000))
        }}
      />
    </div>
  )
}
