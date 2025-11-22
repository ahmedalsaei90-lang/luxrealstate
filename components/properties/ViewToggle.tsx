'use client'

import { LayoutGrid, List, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'

export type ViewMode = 'grid' | 'list' | 'map'

interface ViewToggleProps {
  value: ViewMode
  onChange: (mode: ViewMode) => void
  className?: string
}

export function ViewToggle({ value, onChange, className }: ViewToggleProps) {
  const views = [
    { mode: 'grid' as const, icon: LayoutGrid, label: 'Grid' },
    { mode: 'list' as const, icon: List, label: 'List' },
    { mode: 'map' as const, icon: MapPin, label: 'Map' },
  ]

  return (
    <div className={cn('flex items-center gap-1 bg-neutral-100 p-1 rounded-lg', className)}>
      {views.map(({ mode, icon: Icon, label }) => (
        <Button
          key={mode}
          variant={value === mode ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onChange(mode)}
          className={cn(
            'flex items-center gap-2 transition-all',
            value === mode
              ? 'bg-white shadow-sm text-primary-700 hover:bg-white hover:text-primary-700'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
          )}
          aria-label={`${label} view`}
          aria-pressed={value === mode}
        >
          <Icon className="h-4 w-4" />
          <span className="hidden sm:inline">{label}</span>
        </Button>
      ))}
    </div>
  )
}
