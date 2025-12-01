'use client'

import { Home, Eye, MessageSquare, Heart, TrendingUp, Clock } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
  icon: React.ElementType
  iconColor: string
  iconBg: string
}

function StatCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  iconColor,
  iconBg,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-600">{title}</p>
          <p className="mt-2 text-3xl font-bold text-neutral-900">{value}</p>
          {change && (
            <p
              className={cn(
                'mt-2 text-sm font-medium',
                changeType === 'positive' && 'text-green-600',
                changeType === 'negative' && 'text-red-600',
                changeType === 'neutral' && 'text-neutral-600'
              )}
            >
              {change}
            </p>
          )}
        </div>
        <div className={cn('p-3 rounded-xl', iconBg)}>
          <Icon className={cn('h-6 w-6', iconColor)} />
        </div>
      </div>
    </div>
  )
}

interface StatsCardsProps {
  stats?: {
    totalProperties: number
    totalViews: number
    totalInquiries: number
    pendingProperties: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  const defaultStats = {
    totalProperties: 0,
    totalViews: 0,
    totalInquiries: 0,
    pendingProperties: 0,
  }

  const data = stats || defaultStats

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <StatCard
        title="Total Properties"
        value={data.totalProperties}
        change="+2 this month"
        changeType="positive"
        icon={Home}
        iconColor="text-primary-600"
        iconBg="bg-primary-50"
      />
      <StatCard
        title="Total Views"
        value={data.totalViews.toLocaleString()}
        change="+12% from last week"
        changeType="positive"
        icon={Eye}
        iconColor="text-blue-600"
        iconBg="bg-blue-50"
      />
      <StatCard
        title="Inquiries"
        value={data.totalInquiries}
        change="3 new this week"
        changeType="neutral"
        icon={MessageSquare}
        iconColor="text-green-600"
        iconBg="bg-green-50"
      />
      <StatCard
        title="Pending Approval"
        value={data.pendingProperties}
        change="Awaiting review"
        changeType="neutral"
        icon={Clock}
        iconColor="text-amber-600"
        iconBg="bg-amber-50"
      />
    </div>
  )
}
