'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'
import { Dialog, DialogContent } from '@/components/ui/dialog'

interface PropertyGalleryProps {
  images: string[]
  title: string
  open: boolean
  onOpenChange: (open: boolean) => void
  initialIndex?: number
}

export function PropertyGallery({
  images,
  title,
  open,
  onOpenChange,
  initialIndex = 0,
}: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isZoomed, setIsZoomed] = useState(false)

  // Reset index when opening
  useEffect(() => {
    if (open) {
      setCurrentIndex(initialIndex)
      setIsZoomed(false)
    }
  }, [open, initialIndex])

  // Navigation functions
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
    setIsZoomed(false)
  }, [images.length])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    setIsZoomed(false)
  }, [images.length])

  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(index)
    setIsZoomed(false)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goToNext()
      } else if (e.key === 'Escape') {
        e.preventDefault()
        onOpenChange(false)
      } else if (e.key === 'z' || e.key === 'Z') {
        e.preventDefault()
        setIsZoomed((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, goToNext, goToPrevious, onOpenChange])

  // Touch gesture handling
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      goToNext()
    } else if (isRightSwipe) {
      goToPrevious()
    }
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = images[currentIndex]
    link.download = `${title}-${currentIndex + 1}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Check out this property: ${title}`,
          url: window.location.href,
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    }
  }

  if (!open) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full max-h-full w-full h-full p-0 bg-black/95">
        <div className="relative w-full h-full flex flex-col">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-white font-semibold text-lg">{title}</h2>
                <p className="text-white/70 text-sm">
                  {currentIndex + 1} / {images.length}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="text-white hover:bg-white/10"
                  title={isZoomed ? 'Zoom Out' : 'Zoom In'}
                >
                  {isZoomed ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDownload}
                  className="text-white hover:bg-white/10"
                  title="Download"
                >
                  <Download className="h-5 w-5" />
                </Button>

                {navigator.share && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleShare}
                    className="text-white hover:bg-white/10"
                    title="Share"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onOpenChange(false)}
                  className="text-white hover:bg-white/10"
                  title="Close (Esc)"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Main Image */}
          <div
            className="flex-1 relative flex items-center justify-center p-4 md:p-16"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: isZoomed ? 1.5 : 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  'relative w-full h-full',
                  isZoomed && 'cursor-zoom-out',
                  !isZoomed && 'cursor-zoom-in'
                )}
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <Image
                  src={images[currentIndex]}
                  alt={`${title} - Image ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  priority
                  quality={95}
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 hover:bg-black/70 text-white border-2 border-white/20"
                  title="Previous (←)"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 hover:bg-black/70 text-white border-2 border-white/20"
                  title="Next (→)"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
          </div>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={cn(
                    'relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all',
                    'border-2',
                    currentIndex === index
                      ? 'border-primary-500 scale-110'
                      : 'border-white/20 hover:border-white/40 opacity-60 hover:opacity-100'
                  )}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Keyboard Hints */}
          <div className="absolute bottom-28 left-1/2 -translate-x-1/2 hidden md:block">
            <div className="flex items-center gap-4 text-white/50 text-xs">
              <span>← → Navigate</span>
              <span>•</span>
              <span>Z Zoom</span>
              <span>•</span>
              <span>ESC Close</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Thumbnail gallery component for property pages
interface PropertyGalleryGridProps {
  images: string[]
  title: string
  onImageClick?: (index: number) => void
}

export function PropertyGalleryGrid({ images, title, onImageClick }: PropertyGalleryGridProps) {
  const [showAll, setShowAll] = useState(false)
  const visibleImages = showAll ? images : images.slice(0, 6)

  return (
    <div className="grid grid-cols-4 gap-2">
      {visibleImages.map((image, index) => (
        <button
          key={index}
          onClick={() => onImageClick?.(index)}
          className={cn(
            'relative overflow-hidden rounded-lg transition-all hover:scale-105',
            index === 0 && 'col-span-2 row-span-2 aspect-[4/3]',
            index !== 0 && 'aspect-square'
          )}
        >
          <Image
            src={image}
            alt={`${title} - ${index + 1}`}
            fill
            className="object-cover"
            sizes={index === 0 ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'}
          />

          {index === 5 && !showAll && images.length > 6 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                +{images.length - 6} more
              </span>
            </div>
          )}
        </button>
      ))}
    </div>
  )
}
