'use client'

import { ArrowUpDown, Check } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export type SortOption =
  | 'recommended'
  | 'price-low-high'
  | 'price-high-low'
  | 'newest'
  | 'most-viewed'
  | 'area-largest'

interface SortDropdownProps {
  value: SortOption
  onChange: (value: SortOption) => void
  className?: string
}

const sortOptions = [
  { value: 'recommended' as const, label: 'Recommended' },
  { value: 'price-low-high' as const, label: 'Price: Low to High' },
  { value: 'price-high-low' as const, label: 'Price: High to Low' },
  { value: 'newest' as const, label: 'Newest First' },
  { value: 'most-viewed' as const, label: 'Most Viewed' },
  { value: 'area-largest' as const, label: 'Area: Largest First' },
]

export function SortDropdown({ value, onChange, className }: SortDropdownProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className}>
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-neutral-500" />
          <span className="hidden sm:inline text-sm text-neutral-600">Sort:</span>
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <div className="flex items-center justify-between w-full gap-2">
              <span>{option.label}</span>
              {value === option.value && <Check className="h-4 w-4 text-primary-600" />}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
