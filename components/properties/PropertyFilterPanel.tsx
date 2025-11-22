'use client'

import { useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils/formatters'
import { cn } from '@/lib/utils/cn'

export interface PropertyFilters {
  search: string
  governorates: string[]
  propertyTypes: string[]
  priceRange: [number, number]
  bedrooms: number | null
  bathrooms: number | null
  amenities: string[]
}

interface PropertyFilterPanelProps {
  filters: PropertyFilters
  onFiltersChange: (filters: PropertyFilters) => void
  onClear: () => void
  className?: string
  resultCount?: number
}

const GOVERNORATES = [
  'Capital',
  'Hawalli',
  'Farwaniya',
  'Ahmadi',
  'Jahra',
  'Mubarak Al-Kabeer',
]

const PROPERTY_TYPES = [
  'Apartment',
  'Villa',
  'Penthouse',
  'Duplex',
  'Townhouse',
  'Studio',
]

const AMENITIES = [
  'Parking',
  'Swimming Pool',
  'Gym',
  'Security',
  'Garden',
  'Balcony',
  'Elevator',
  'Central AC',
  'Maid Room',
  'Storage',
]

const BEDROOMS_OPTIONS = [1, 2, 3, 4, 5, 6]
const BATHROOMS_OPTIONS = [1, 2, 3, 4, 5, 6]

export function PropertyFilterPanel({
  filters,
  onFiltersChange,
  onClear,
  className,
  resultCount,
}: PropertyFilterPanelProps) {
  const [isPriceExpanded, setIsPriceExpanded] = useState(true)

  const activeFilterCount = [
    filters.governorates.length,
    filters.propertyTypes.length,
    filters.bedrooms ? 1 : 0,
    filters.bathrooms ? 1 : 0,
    filters.amenities.length,
  ].reduce((a, b) => a + b, 0)

  const toggleGovernorate = (gov: string) => {
    const newGovernorates = filters.governorates.includes(gov)
      ? filters.governorates.filter((g) => g !== gov)
      : [...filters.governorates, gov]
    onFiltersChange({ ...filters, governorates: newGovernorates })
  }

  const togglePropertyType = (type: string) => {
    const newTypes = filters.propertyTypes.includes(type)
      ? filters.propertyTypes.filter((t) => t !== type)
      : [...filters.propertyTypes, type]
    onFiltersChange({ ...filters, propertyTypes: newTypes })
  }

  const toggleAmenity = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity]
    onFiltersChange({ ...filters, amenities: newAmenities })
  }

  const setBedrooms = (beds: number) => {
    onFiltersChange({
      ...filters,
      bedrooms: filters.bedrooms === beds ? null : beds,
    })
  }

  const setBathrooms = (baths: number) => {
    onFiltersChange({
      ...filters,
      bathrooms: filters.bathrooms === baths ? null : baths,
    })
  }

  return (
    <div className={cn('bg-white rounded-lg shadow-sm border border-neutral-200', className)}>
      {/* Header */}
      <div className="p-6 border-b border-neutral-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-primary-600" />
            <h2 className="text-lg font-semibold text-neutral-900">Filters</h2>
            {activeFilterCount > 0 && (
              <Badge variant="default" className="bg-primary-600">
                {activeFilterCount}
              </Badge>
            )}
          </div>
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="text-neutral-600 hover:text-neutral-900"
            >
              <X className="h-4 w-4 mr-1" />
              Clear all
            </Button>
          )}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <Input
            type="text"
            placeholder="Search by location or keyword..."
            value={filters.search}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            className="pl-10"
          />
        </div>

        {resultCount !== undefined && (
          <p className="mt-3 text-sm text-neutral-600">
            <span className="font-semibold text-neutral-900">{resultCount.toLocaleString()}</span>{' '}
            properties found
          </p>
        )}
      </div>

      {/* Filters */}
      <div className="p-6 space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto">
        <Accordion type="multiple" defaultValue={['location', 'type', 'price']} className="w-full">
          {/* Location Filter */}
          <AccordionItem value="location">
            <AccordionTrigger className="text-sm font-semibold">
              Location
              {filters.governorates.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {filters.governorates.length}
                </Badge>
              )}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                {GOVERNORATES.map((gov) => (
                  <div key={gov} className="flex items-center gap-2">
                    <Checkbox
                      id={`gov-${gov}`}
                      checked={filters.governorates.includes(gov)}
                      onCheckedChange={() => toggleGovernorate(gov)}
                    />
                    <Label
                      htmlFor={`gov-${gov}`}
                      className="text-sm text-neutral-700 cursor-pointer flex-1"
                    >
                      {gov}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Property Type */}
          <AccordionItem value="type">
            <AccordionTrigger className="text-sm font-semibold">
              Property Type
              {filters.propertyTypes.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {filters.propertyTypes.length}
                </Badge>
              )}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                {PROPERTY_TYPES.map((type) => (
                  <div key={type} className="flex items-center gap-2">
                    <Checkbox
                      id={`type-${type}`}
                      checked={filters.propertyTypes.includes(type)}
                      onCheckedChange={() => togglePropertyType(type)}
                    />
                    <Label
                      htmlFor={`type-${type}`}
                      className="text-sm text-neutral-700 cursor-pointer flex-1"
                    >
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Price Range */}
          <AccordionItem value="price">
            <AccordionTrigger className="text-sm font-semibold">Price Range</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Min</span>
                  <span className="font-semibold text-primary-700">
                    {formatPrice(filters.priceRange[0])}
                  </span>
                </div>
                <Slider
                  min={0}
                  max={5000000}
                  step={50000}
                  value={filters.priceRange}
                  onValueChange={(value) =>
                    onFiltersChange({ ...filters, priceRange: value as [number, number] })
                  }
                  className="my-4"
                />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-600">Max</span>
                  <span className="font-semibold text-primary-700">
                    {formatPrice(filters.priceRange[1])}
                  </span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Bedrooms */}
          <AccordionItem value="bedrooms">
            <AccordionTrigger className="text-sm font-semibold">
              Bedrooms
              {filters.bedrooms && (
                <Badge variant="secondary" className="ml-2">
                  {filters.bedrooms}+
                </Badge>
              )}
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-3 gap-2 pt-2">
                {BEDROOMS_OPTIONS.map((beds) => (
                  <Button
                    key={beds}
                    variant={filters.bedrooms === beds ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setBedrooms(beds)}
                    className={cn(
                      filters.bedrooms === beds &&
                        'bg-primary-600 hover:bg-primary-700 text-white'
                    )}
                  >
                    {beds}+
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Bathrooms */}
          <AccordionItem value="bathrooms">
            <AccordionTrigger className="text-sm font-semibold">
              Bathrooms
              {filters.bathrooms && (
                <Badge variant="secondary" className="ml-2">
                  {filters.bathrooms}+
                </Badge>
              )}
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-3 gap-2 pt-2">
                {BATHROOMS_OPTIONS.map((baths) => (
                  <Button
                    key={baths}
                    variant={filters.bathrooms === baths ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setBathrooms(baths)}
                    className={cn(
                      filters.bathrooms === baths &&
                        'bg-primary-600 hover:bg-primary-700 text-white'
                    )}
                  >
                    {baths}+
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Amenities */}
          <AccordionItem value="amenities">
            <AccordionTrigger className="text-sm font-semibold">
              Amenities
              {filters.amenities.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {filters.amenities.length}
                </Badge>
              )}
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-3 pt-2">
                {AMENITIES.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2">
                    <Checkbox
                      id={`amenity-${amenity}`}
                      checked={filters.amenities.includes(amenity)}
                      onCheckedChange={() => toggleAmenity(amenity)}
                    />
                    <Label
                      htmlFor={`amenity-${amenity}`}
                      className="text-xs text-neutral-700 cursor-pointer flex-1"
                    >
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
