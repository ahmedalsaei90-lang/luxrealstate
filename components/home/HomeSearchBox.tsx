'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Search, MapPin, Home, DollarSign, Bed, Bath, ArrowRight,
  SlidersHorizontal, X, Building2, Maximize2, Plus,
  Waves, Dumbbell, Car, Shield, Trees, PanelTop, ArrowUpFromLine, Thermometer
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'

type ListingType = 'sale' | 'rent'

interface SearchFilters {
  listingType: ListingType
  locations: string[]
  propertyTypes: string[]
  priceMin: string
  priceMax: string
  bedrooms: string
  bathrooms: string
  amenities: string[]
  areaSize: string
}

const LOCATIONS = [
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
  { value: 'Villa', label: 'Villa' },
  { value: 'Apartment', label: 'Apartment' },
  { value: 'Penthouse', label: 'Penthouse' },
  { value: 'Duplex', label: 'Duplex' },
  { value: 'Townhouse', label: 'Townhouse' },
  { value: 'Studio', label: 'Studio' },
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

const AREA_SIZE_OPTIONS = [
  { value: '', label: 'Any Size' },
  { value: '0-100', label: 'Up to 100 sqm' },
  { value: '100-200', label: '100 - 200 sqm' },
  { value: '200-300', label: '200 - 300 sqm' },
  { value: '300-500', label: '300 - 500 sqm' },
  { value: '500-1000', label: '500+ sqm' },
]

const QUICK_AMENITIES = [
  { id: 'Swimming Pool', label: 'Pool', icon: Waves },
  { id: 'Gym', label: 'Gym', icon: Dumbbell },
  { id: 'Parking', label: 'Parking', icon: Car },
  { id: 'Security', label: 'Security', icon: Shield },
  { id: 'Garden', label: 'Garden', icon: Trees },
  { id: 'Balcony', label: 'Balcony', icon: PanelTop },
  { id: 'Elevator', label: 'Elevator', icon: ArrowUpFromLine },
  { id: 'Central AC', label: 'AC', icon: Thermometer },
]

// Format number with thousand separators
const formatNumber = (value: string) => {
  const num = value.replace(/[^\d]/g, '')
  if (!num) return ''
  return parseInt(num).toLocaleString()
}

// Parse formatted number back to plain digits
const parseNumber = (value: string) => {
  return value.replace(/[^\d]/g, '')
}

export function HomeSearchBox() {
  const router = useRouter()
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [filters, setFilters] = useState<SearchFilters>({
    listingType: 'sale',
    locations: [],
    propertyTypes: [],
    priceMin: '',
    priceMax: '',
    bedrooms: '',
    bathrooms: '',
    amenities: [],
    areaSize: '',
  })

  // Temporary values for dropdowns (before adding to array)
  const [tempLocation, setTempLocation] = useState('')
  const [tempPropertyType, setTempPropertyType] = useState('')

  const updateFilter = <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => {
    setFilters(prev => {
      const updated = { ...prev, [key]: value }
      // Reset price when switching listing type
      if (key === 'listingType') {
        updated.priceMin = ''
        updated.priceMax = ''
      }
      return updated
    })
  }

  const addLocation = (loc: string) => {
    if (loc && !filters.locations.includes(loc)) {
      updateFilter('locations', [...filters.locations, loc])
    }
    setTempLocation('')
  }

  const removeLocation = (loc: string) => {
    updateFilter('locations', filters.locations.filter(l => l !== loc))
  }

  const addPropertyType = (type: string) => {
    if (type && !filters.propertyTypes.includes(type)) {
      updateFilter('propertyTypes', [...filters.propertyTypes, type])
    }
    setTempPropertyType('')
  }

  const removePropertyType = (type: string) => {
    updateFilter('propertyTypes', filters.propertyTypes.filter(t => t !== type))
  }

  const toggleAmenity = (amenity: string) => {
    if (filters.amenities.includes(amenity)) {
      updateFilter('amenities', filters.amenities.filter(a => a !== amenity))
    } else {
      updateFilter('amenities', [...filters.amenities, amenity])
    }
  }

  const handleSearch = () => {
    const params = new URLSearchParams()

    // Always include listing type
    params.set('type', filters.listingType)

    // Multi-select values (comma-separated)
    if (filters.locations.length > 0) {
      params.set('location', filters.locations.join(','))
    }
    if (filters.propertyTypes.length > 0) {
      params.set('propertyType', filters.propertyTypes.join(','))
    }

    // Price range with separate min/max
    if (filters.priceMin) {
      params.set('priceMin', parseNumber(filters.priceMin))
    }
    if (filters.priceMax) {
      params.set('priceMax', parseNumber(filters.priceMax))
    }

    // Other filters
    if (filters.bedrooms) params.set('beds', filters.bedrooms)
    if (filters.bathrooms) params.set('baths', filters.bathrooms)

    // Amenities (comma-separated)
    if (filters.amenities.length > 0) {
      params.set('amenities', filters.amenities.join(','))
    }

    // Area size
    if (filters.areaSize) {
      params.set('size', filters.areaSize)
    }

    router.push(`/properties?${params.toString()}`)
  }

  const activeFilterCount = [
    filters.locations.length > 0,
    filters.propertyTypes.length > 0,
    filters.priceMin || filters.priceMax,
    filters.bedrooms,
    filters.bathrooms,
    filters.amenities.length > 0,
    filters.areaSize,
  ].filter(Boolean).length

  const clearAllFilters = () => {
    setFilters({
      listingType: filters.listingType,
      locations: [],
      propertyTypes: [],
      priceMin: '',
      priceMax: '',
      bedrooms: '',
      bathrooms: '',
      amenities: [],
      areaSize: '',
    })
    setTempLocation('')
    setTempPropertyType('')
  }

  // Get available locations (not already selected)
  const availableLocations = LOCATIONS.filter(l => !filters.locations.includes(l.value))
  const availablePropertyTypes = PROPERTY_TYPES.filter(t => !filters.propertyTypes.includes(t.value))

  // Price placeholders based on listing type
  const pricePlaceholders = filters.listingType === 'sale'
    ? { min: 'Min (e.g. 100,000)', max: 'Max (e.g. 500,000)' }
    : { min: 'Min (e.g. 500)', max: 'Max (e.g. 2,000)' }

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-neutral-200 shadow-luxury">
      {/* Search Type Toggle - Buy / Rent */}
      <div className="flex justify-center gap-2 mb-6">
        <button
          onClick={() => updateFilter('listingType', 'sale')}
          className={cn(
            "px-8 py-2.5 rounded-full font-semibold transition-all duration-300 flex items-center gap-2",
            filters.listingType === 'sale'
              ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-gold"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
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
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
          )}
        >
          <Home className="h-4 w-4" />
          Rent
        </button>
      </div>

      {/* Main Search Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Location - Hybrid Multi-Select */}
        <div className="relative">
          <label className="block text-xs font-semibold text-neutral-600 mb-2 tracking-wide uppercase">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-500 z-10" />
            <select
              value={tempLocation}
              onChange={(e) => {
                addLocation(e.target.value)
              }}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-neutral-200 bg-white text-neutral-800 font-medium focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all appearance-none cursor-pointer"
            >
              <option value="">{filters.locations.length > 0 ? 'Add more...' : 'All Areas'}</option>
              {availableLocations.map(loc => (
                <option key={loc.value} value={loc.value}>{loc.label}</option>
              ))}
            </select>
          </div>
          {/* Selected Location Tags */}
          {filters.locations.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {filters.locations.map(loc => (
                <span
                  key={loc}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold border border-primary-200"
                >
                  {LOCATIONS.find(l => l.value === loc)?.label || loc}
                  <button onClick={() => removeLocation(loc)} className="hover:bg-primary-200 rounded-full p-0.5 transition-colors">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Property Type - Hybrid Multi-Select */}
        <div className="relative">
          <label className="block text-xs font-semibold text-neutral-600 mb-2 tracking-wide uppercase">
            Property Type
          </label>
          <div className="relative">
            <Home className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-500 z-10" />
            <select
              value={tempPropertyType}
              onChange={(e) => {
                addPropertyType(e.target.value)
              }}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-neutral-200 bg-white text-neutral-800 font-medium focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all appearance-none cursor-pointer"
            >
              <option value="">{filters.propertyTypes.length > 0 ? 'Add more...' : 'All Types'}</option>
              {availablePropertyTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          {/* Selected Property Type Tags */}
          {filters.propertyTypes.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {filters.propertyTypes.map(type => (
                <span
                  key={type}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold border border-primary-200"
                >
                  {type}
                  <button onClick={() => removePropertyType(type)} className="hover:bg-primary-200 rounded-full p-0.5 transition-colors">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Price Range - Dual Inputs */}
        <div className="relative lg:col-span-2">
          <label className="block text-xs font-semibold text-neutral-600 mb-2 tracking-wide uppercase">
            Budget (KWD{filters.listingType === 'rent' ? '/month' : ''})
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-500" />
              <input
                type="text"
                value={filters.priceMin}
                onChange={(e) => updateFilter('priceMin', formatNumber(e.target.value))}
                placeholder={pricePlaceholders.min}
                className="w-full pl-9 pr-4 py-3.5 rounded-xl border-2 border-neutral-200 bg-white text-neutral-800 font-medium placeholder:text-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all text-sm"
              />
            </div>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-500" />
              <input
                type="text"
                value={filters.priceMax}
                onChange={(e) => updateFilter('priceMax', formatNumber(e.target.value))}
                placeholder={pricePlaceholders.max}
                className="w-full pl-9 pr-4 py-3.5 rounded-xl border-2 border-neutral-200 bg-white text-neutral-800 font-medium placeholder:text-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Amenities - 8 Chips */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-neutral-600 mb-3 tracking-wide uppercase text-center">
          Quick Amenities
        </label>
        <div className="flex flex-wrap justify-center gap-2">
          {QUICK_AMENITIES.map(amenity => {
            const Icon = amenity.icon
            const isSelected = filters.amenities.includes(amenity.id)
            return (
              <button
                key={amenity.id}
                onClick={() => toggleAmenity(amenity.id)}
                className={cn(
                  "px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1.5 border-2",
                  isSelected
                    ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white border-primary-500 shadow-gold"
                    : "bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-primary-300 hover:bg-primary-50"
                )}
              >
                <Icon className="h-4 w-4" />
                {amenity.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-neutral-600 hover:text-neutral-800 text-sm font-medium transition-colors"
        >
          <SlidersHorizontal className="h-4 w-4" />
          {showAdvanced ? 'Hide' : 'More'} Filters
          {activeFilterCount > 0 && !showAdvanced && (
            <span className="px-2 py-0.5 rounded-full bg-primary-500 text-white text-xs font-semibold">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Advanced Filters Panel */}
      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 rounded-2xl bg-neutral-50 border border-neutral-200 animate-fade-in">
          {/* Bedrooms */}
          <div className="relative">
            <label className="block text-xs font-semibold text-neutral-600 mb-2 tracking-wide uppercase">
              Bedrooms
            </label>
            <div className="relative">
              <Bed className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-500" />
              <select
                value={filters.bedrooms}
                onChange={(e) => updateFilter('bedrooms', e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-neutral-200 bg-white text-neutral-800 font-medium focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all appearance-none cursor-pointer"
              >
                {BEDROOM_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Bathrooms */}
          <div className="relative">
            <label className="block text-xs font-semibold text-neutral-600 mb-2 tracking-wide uppercase">
              Bathrooms
            </label>
            <div className="relative">
              <Bath className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-500" />
              <select
                value={filters.bathrooms}
                onChange={(e) => updateFilter('bathrooms', e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-neutral-200 bg-white text-neutral-800 font-medium focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all appearance-none cursor-pointer"
              >
                {BATHROOM_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Area Size */}
          <div className="relative">
            <label className="block text-xs font-semibold text-neutral-600 mb-2 tracking-wide uppercase">
              Size (sqm)
            </label>
            <div className="relative">
              <Maximize2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-500" />
              <select
                value={filters.areaSize}
                onChange={(e) => updateFilter('areaSize', e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-neutral-200 bg-white text-neutral-800 font-medium focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all appearance-none cursor-pointer"
              >
                {AREA_SIZE_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear Filters */}
          <div className="flex items-end justify-center md:justify-end">
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium transition-colors px-4 py-2 rounded-lg hover:bg-red-50"
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
        className="w-full py-4 text-lg flex items-center justify-center gap-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-gold hover:shadow-gold-lg transition-all duration-300 hover:scale-[1.01]"
      >
        <Search className="h-5 w-5" />
        <span>
          Search {filters.listingType === 'sale' ? 'Properties for Sale' : 'Rental Properties'}
        </span>
        <ArrowRight className="h-5 w-5" />
      </button>

      {/* Quick Stats */}
      <div className="flex items-center justify-center gap-6 mt-6 text-neutral-500 text-sm">
        <span className="flex items-center gap-1">
          <Building2 className="h-4 w-4 text-primary-500" />
          2,500+ Properties
        </span>
        <span className="hidden md:block w-px h-4 bg-neutral-300" />
        <span className="hidden md:flex items-center gap-1">
          <MapPin className="h-4 w-4 text-primary-500" />
          All Kuwait Areas
        </span>
      </div>
    </div>
  )
}
