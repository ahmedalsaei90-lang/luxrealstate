'use client'

import { Shield, CheckCircle2, Award, Clock, DollarSign } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils/cn'

export interface TrustBadgeConfig {
  type: 'verified' | 'licensed' | 'no-fees' | 'support' | 'secure'
  enabled: boolean
}

interface TrustBadgesProps {
  badges: TrustBadgeConfig[]
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const badgeConfig = {
  verified: {
    icon: CheckCircle2,
    label: 'Elite Verified',
    description: 'This property has been verified by Elite Properties Kuwait',
    color: 'text-green-600',
  },
  licensed: {
    icon: Award,
    label: 'Licensed Agent',
    description: 'Listed by a licensed and certified real estate agent',
    color: 'text-blue-600',
  },
  'no-fees': {
    icon: DollarSign,
    label: 'No Hidden Fees',
    description: 'Transparent pricing with no hidden charges',
    color: 'text-accent-600',
  },
  support: {
    icon: Clock,
    label: '24/7 Support',
    description: 'Round-the-clock customer support available',
    color: 'text-purple-600',
  },
  secure: {
    icon: Shield,
    label: 'Secure Transaction',
    description: 'Protected by secure payment and verification systems',
    color: 'text-primary-600',
  },
}

const sizeClasses = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
}

export function TrustBadges({ badges, className, size = 'md' }: TrustBadgesProps) {
  const enabledBadges = badges.filter((b) => b.enabled)

  if (enabledBadges.length === 0) return null

  return (
    <TooltipProvider>
      <div className={cn('flex items-center gap-2 flex-wrap', className)}>
        {enabledBadges.map(({ type }) => {
          const config = badgeConfig[type]
          const Icon = config.icon

          return (
            <Tooltip key={type}>
              <TooltipTrigger asChild>
                <div
                  className="flex items-center gap-1 cursor-help transition-transform hover:scale-110"
                  role="img"
                  aria-label={config.label}
                >
                  <Icon className={cn(sizeClasses[size], config.color)} />
                </div>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                <p className="font-semibold mb-1">{config.label}</p>
                <p className="text-xs text-neutral-600">{config.description}</p>
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>
    </TooltipProvider>
  )
}

// Convenience component for property cards
export function PropertyTrustBadges({
  verified,
  licensed,
  noFees,
  support,
  className,
}: {
  verified?: boolean
  licensed?: boolean
  noFees?: boolean
  support?: boolean
  className?: string
}) {
  const badges: TrustBadgeConfig[] = [
    { type: 'verified', enabled: verified || false },
    { type: 'licensed', enabled: licensed || false },
    { type: 'no-fees', enabled: noFees || false },
    { type: 'support', enabled: support || false },
  ]

  return <TrustBadges badges={badges} className={className} size="sm" />
}
