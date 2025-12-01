'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin, Home, DollarSign, Bed, Bath, ArrowRight, SlidersHorizontal, X, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

type ListingType = 'sale' | 'rent'

interface SearchFilters {
  listingType: ListingType
  location: string
  propertyType: string
  priceRange: string
  bedrooms: string
  bathrooms: string
}

const LOCATIONS = [
  { value: '', label: 'All Areas' },
  { value: 'Capital', label: 'Capital (Kuwait City)' },
  { value: 'Hawalli', label: 'Hawalli' },
  { value: 'Salmiya', label: 'Salmiya' },
  { value: 'Jabriya', label: 'Jabriya' },
  { value: 'Fintas', label: 'Fintas' },
  { value: 'Salwa', label: 'Salwa' },
  { value: 'Ahmadi', label: 'Ahmadi' },
  { value: 'Farwaniya', label: 'Farwaniya' },
]

const PROPERTY_TYPES = [
  { value: '', label: 'All Types' },
  { value: 'Villa', label: 'Villa' },
  { value: 'Apartment', label: 'Apartment' },
  { value: 'Penthouse', label: 'Penthouse' },
  { value: 'Duplex', label: 'Duplex' },
  { value: 'Townhouse', label: 'Townhouse' },
  { value: 'Studio', label: 'Studio' },
]

const PRICE_RANGES_SALE = [
  { value: '', label: 'Any Price' },
  { value: '0-100000', label: 'Up to 100K KWD' },
  { value: '100000-300000', label: '100K - 300K KWD' },
  { value: '300000-500000', label: '300K - 500K KWD' },
  { value: '500000-1000000', label: '500K - 1M KWD' },
  { value: '1000000-5000000', label: '1M+ KWD' },
]

const PRICE_RANGES_RENT = [
  { value: '', label: 'Any Price' },
  { value: '0-500', label: 'Up to 500 KWD/mo' },
  { value: '500-1000', label: '500 - 1,000 KWD/mo' },
  { value: '1000-2000', label: '1,000 - 2,000 KWD/mo' },
  { value: '2000-5000', label: '2,000 - 5,000 KWD/mo' },
  { value: '5000-50000', label: '5,000+ KWD/mo' },
]

const BEDROOM_OPTIONS = [
  { value: '', label: 'Any' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
  { value: '5', label: '5+' },
]

const BATHROOM_OPTIONS = [
  { value: '', label: 'Any' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
]

export function HomeSearchBox() {
  const router = useRouter()
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [filters, setFilters] = useState<SearchFilters>({
    listingType: 'sale',
    location: '',
    propertyType: '',
    priceRange: '',
    bedrooms: '',
    bathrooms: '',
  })

  const priceRanges = filters.listingType === 'sale' ? PRICE_RANGES_SALE : PRICE_RANGES_RENT

  const updateFilter = <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => {
    setFilters(prev => {
      const updated = { ...prev, [key]: value }
      // Reset price range when switching listing type
      if (key === 'listingType') {
        updated.priceRange = ''
      }
      return updated
    })
  }

  const handleSearch = () => {
    const params = new URLSearchParams()

    // Always include listing type
    params.set('type', filters.listingType)

    // Add other filters if set
    if (filters.location) params.set('location', filters.location)
    if (filters.propertyType) params.set('propertyType', filters.propertyType)
    if (filters.priceRange) params.set('price', filters.priceRange)
    if (filters.bedrooms) params.set('beds', filters.bedrooms)
    if (filters.bathrooms) params.set('baths', filters.bathrooms)

    router.push(`/properties?${params.toString()}`)
  }

  const activeFilterCount = [
    filters.location,
    filters.propertyType,
    filters.priceRange,
    filters.bedrooms,
    filters.bathrooms,
  ].filter(Boolean).length

  return (
    <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/30">
      {/* Search Type Toggle - Buy / Rent */}
      <div className="flex justify-center gap-2 mb-6">
        <button
          onClick={() => updateFilter('listingType', 'sale')}
          className={cn(
            "px-8 py-2.5 rounded-full font-semibold transition-all duration-300 flex items-center gap-2",
            filters.listingType === 'sale'
              ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-gold"
              : "bg-white/20 text-white hover:bg-white/30"
          )}
        >
          <Building2 className="h-4 w-4" />
          Buy
        </button>
        <button
          onClick={() => updateFilter('listingType', 'rent')}
          className={cn(
            "px-8 py-2.5 rounded-full font-semibold transition-all duration-300 flex items-center gap-2",
            filters.listingType === 'rent'
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
              : "bg-white/20 text-white hover:bg-white/30"
          )}
        >
          <Home className="h-4 w-4" />
          Rent
        </button>
      </div>

      {/* Main Search Fields */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {/* Location */}
        <div className="relative">
          <label className="block text-xs font-semibold text-white/80 mb-2 tracking-wide uppercase">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-400" />
            <select
              value={filters.location}
              onChange={(e) => updateFilter('location', e.target.value)}
              className="input-luxury pl-12 bg-white/95 text-neutral-800"
            >
              {LOCATIONS.map(loc => (
                <option key={loc.value} value={loc.value}>{loc.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Property Type */}
        <div className="relative">
          <label className="block text-xs font-semibold text-white/80 mb-2 tracking-wide uppercase">
            Property Type
          </label>
          <div className="relative">
            <Home className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-400" />
            <select
              value={filters.propertyType}
              onChange={(e) => updateFilter('propertyType', e.target.value)}
              className="input-luxury pl-12 bg-white/95 text-neutral-800"
            >
              {PROPERTY_TYPES.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Price Range */}
        <div className="relative">
          <label className="block text-xs font-semibold text-white/80 mb-2 tracking-wide uppercase">
            Budget
          </label>
          <div className="relative">
            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-400" />
            <select
              value={filters.priceRange}
              onChange={(e) => updateFilter('priceRange', e.target.value)}
              className="input-luxury pl-12 bg-white/95 text-neutral-800"
            >
              {priceRanges.map(range => (
                <option key={range.value} value={range.value}>{range.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Bedrooms */}
        <div className="relative">
          <label className="block text-xs font-semibold text-white/80 mb-2 tracking-wide uppercase">
            Bedrooms
          </label>
          <div className="relative">
            <Bed className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-400" />
            <select
              value={filters.bedrooms}
              onChange={(e) => updateFilter('bedrooms', e.target.value)}
              className="input-luxury pl-12 bg-white/95 text-neutral-800"
            >
              {BEDROOM_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors"
        >
          <SlidersHorizontal className="h-4 w-4" />
          {showAdvanced ? 'Hide' : 'More'} Filters
          {activeFilterCount > 0 && !showAdvanced && (
            <span className="px-2 py-0.5 rounded-full bg-primary-500/80 text-white text-xs font-semibold">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Advanced Filters Panel */}
      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 rounded-2xl bg-white/10 backdrop-blur-sm animate-fade-in">
          {/* Bathrooms */}
          <div className="relative">
            <label className="block text-xs font-semibold text-white/80 mb-2 tracking-wide uppercase">
              Bathrooms
            </label>
            <div className="relative">
              <Bath className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-400" />
              <select
                value={filters.bathrooms}
                onChange={(e) => updateFilter('bathrooms', e.target.value)}
                className="input-luxury pl-12 bg-white/95 text-neutral-800"
              >
                {BATHROOM_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          <div className="md:col-span-2 flex items-end justify-end">
            {activeFilterCount > 0 && (
              <button
                onClick={() => setFilters({
                  listingType: filters.listingType,
                  location: '',
                  propertyType: '',
                  priceRange: '',
                  bedrooms: '',
                  bathrooms: '',
                })}
                className="flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors"
              >
                <X className="h-4 w-4" />
                Clear all filters
              </button>
            )}
          </div>
        </div>
      )}

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="btn-luxury w-full py-4 text-lg flex items-center justify-center gap-3"
      >
        <Search className="h-5 w-5" />
        <span>
          Search {filters.listingType === 'sale' ? 'Properties for Sale' : 'Rental Properties'}
        </span>
        <ArrowRight className="h-5 w-5" />
      </button>

      {/* Quick Stats */}
      <div className="flex items-center justify-center gap-6 mt-6 text-white/60 text-sm">
        <span className="flex items-center gap-1">
          <Building2 className="h-4 w-4 text-primary-400" />
          2,500+ Properties
        </span>
        <span className="hidden md:block w-px h-4 bg-white/30" />
        <span className="hidden md:flex items-center gap-1">
          <MapPin className="h-4 w-4 text-primary-400" />
          All Kuwait Areas
        </span>
      </div>
    </div>
  )
}
