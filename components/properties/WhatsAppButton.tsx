'use client'

import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'
import { formatPrice } from '@/lib/utils/formatters'
import type { Property } from '@/lib/data/mock-properties'

interface WhatsAppButtonProps {
  property: Property
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
  className?: string
  showText?: boolean
}

export function WhatsAppButton({
  property,
  variant = 'default',
  size = 'default',
  className,
  showText = true,
}: WhatsAppButtonProps) {
  const handleWhatsAppClick = () => {
    // Get agent's phone number and clean it (remove spaces, dashes, etc.)
    const phoneNumber = property.agent?.phone?.replace(/\D/g, '') || '96500000000'

    // Create WhatsApp message with property details
    const message = encodeURIComponent(
      `Hi! I'm interested in this property:\n\n` +
        `🏠 ${property.title}\n` +
        `💰 Price: ${formatPrice(property.price)}\n` +
        `📍 Location: ${property.area}, ${property.governorate}\n` +
        `🛏️ ${property.bedrooms} Bedrooms | ${property.bathrooms} Bathrooms\n` +
        `📏 Area: ${property.area_sqm} sqm\n` +
        `🔗 Reference: EP-${property.id.padStart(4, '0')}\n\n` +
        `View: ${window.location.href}\n\n` +
        `Can you provide more details?`
    )

    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleWhatsAppClick}
      className={className}
      style={{
        backgroundColor: variant === 'default' ? '#25D366' : undefined,
        borderColor: variant === 'outline' ? '#25D366' : undefined,
        color: variant === 'outline' ? '#25D366' : variant === 'default' ? 'white' : undefined,
      }}
      onMouseEnter={(e) => {
        if (variant === 'default') {
          e.currentTarget.style.backgroundColor = '#20BA5A'
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'default') {
          e.currentTarget.style.backgroundColor = '#25D366'
        }
      }}
    >
      <MessageCircle className="h-5 w-5 mr-2" />
      {showText && 'WhatsApp'}
    </Button>
  )
}
