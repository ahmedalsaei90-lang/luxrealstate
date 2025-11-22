'use client'

import { useState, useEffect } from 'react'
import { useFavoritesStore } from '@/lib/stores/favorites-store'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { cn } from '@/lib/utils/cn'

interface FavoriteButtonProps {
  propertyId: string
  propertyTitle?: string
  variant?: 'default' | 'ghost' | 'outline'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
  showText?: boolean
}

export function FavoriteButton({
  propertyId,
  propertyTitle,
  variant = 'ghost',
  size = 'icon',
  className,
  showText = false,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavoritesStore()
  const [mounted, setMounted] = useState(false)

  // Wait for client-side hydration to complete
  useEffect(() => {
    setMounted(true)
  }, [])

  // Only check favorite status after mounting to avoid hydration mismatch
  const favorited = mounted ? isFavorite(propertyId) : false

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation if button is inside a Link
    e.stopPropagation()

    toggleFavorite(propertyId)

    if (favorited) {
      toast.success('Removed from favorites', {
        description: propertyTitle ? `${propertyTitle} has been removed` : undefined,
      })
    } else {
      toast.success('Added to favorites!', {
        description: propertyTitle
          ? `${propertyTitle} has been saved`
          : 'View your saved properties in favorites',
      })
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={cn(
        'relative group',
        favorited && 'bg-red-50 hover:bg-red-100 border-red-200',
        className
      )}
      aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <motion.div
        initial={false}
        animate={favorited ? { scale: [1, 1.3, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Heart
          className={cn(
            'h-5 w-5 transition-all',
            favorited
              ? 'fill-red-500 text-red-500'
              : 'text-neutral-600 group-hover:text-red-500'
          )}
        />
      </motion.div>
      {showText && (
        <span className="ml-2">{favorited ? 'Saved' : 'Save'}</span>
      )}
    </Button>
  )
}
