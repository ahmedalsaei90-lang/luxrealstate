'use client'

import { useState } from 'react'
import { MessageSquare, Mail, Phone, Clock, CheckCircle2, Eye, MoreVertical, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils/cn'

// Mock data - will be replaced with Supabase data
const mockInquiries = [
  {
    id: '1',
    property_title: 'Modern Villa in Salmiya',
    property_id: '1',
    name: 'Ahmed Al-Sabah',
    email: 'ahmed@example.com',
    phone: '+965 1234 5678',
    inquiry_type: 'viewing',
    message: 'I would like to schedule a viewing for this property. Is it available this weekend?',
    status: 'new',
    created_at: '2024-01-19T10:30:00',
  },
  {
    id: '2',
    property_title: 'Modern Villa in Salmiya',
    property_id: '1',
    name: 'Sara Al-Mutairi',
    email: 'sara@example.com',
    phone: '+965 9876 5432',
    inquiry_type: 'info',
    message: 'Is the property price negotiable? Also, what is the exact location?',
    status: 'read',
    created_at: '2024-01-18T15:45:00',
  },
  {
    id: '3',
    property_title: 'Luxury Apartment in Kuwait City',
    property_id: '2',
    name: 'Mohammed Al-Rashid',
    email: 'mohammed@example.com',
    phone: '+965 5555 1234',
    inquiry_type: 'offer',
    message: 'I am interested in making an offer. Can we discuss the terms?',
    status: 'responded',
    created_at: '2024-01-17T09:15:00',
  },
]

export default function InquiriesPage() {
  const [selectedInquiry, setSelectedInquiry] = useState<typeof mockInquiries[0] | null>(null)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-neutral-900">Inquiries</h1>
        <p className="text-neutral-600">Manage inquiries from potential buyers and renters</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-neutral-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50">
              <MessageSquare className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900">{mockInquiries.length}</p>
              <p className="text-sm text-neutral-600">Total Inquiries</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-50">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900">
                {mockInquiries.filter(i => i.status === 'new').length}
              </p>
              <p className="text-sm text-neutral-600">New Inquiries</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-50">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-neutral-900">
                {mockInquiries.filter(i => i.status === 'responded').length}
              </p>
              <p className="text-sm text-neutral-600">Responded</p>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiries List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-neutral-200 overflow-hidden">
          {mockInquiries.length > 0 ? (
            <div className="divide-y divide-neutral-100">
              {mockInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className={cn(
                    'p-4 hover:bg-neutral-50 cursor-pointer transition-colors',
                    selectedInquiry?.id === inquiry.id && 'bg-primary-50'
                  )}
                  onClick={() => setSelectedInquiry(inquiry)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-neutral-900">{inquiry.name}</h3>
                        <span
                          className={cn(
                            'px-2 py-0.5 rounded-full text-xs font-medium',
                            inquiry.status === 'new' && 'bg-blue-100 text-blue-700',
                            inquiry.status === 'read' && 'bg-neutral-100 text-neutral-600',
                            inquiry.status === 'responded' && 'bg-green-100 text-green-700'
                          )}
                        >
                          {inquiry.status === 'new' ? 'New' : inquiry.status === 'read' ? 'Read' : 'Responded'}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600 mt-1 line-clamp-1">
                        {inquiry.message}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-neutral-500">
                        <span>{inquiry.property_title}</span>
                        <span>•</span>
                        <span>{new Date(inquiry.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <MessageSquare className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-neutral-900 mb-2">No inquiries yet</h2>
              <p className="text-neutral-600">
                Inquiries from interested buyers will appear here
              </p>
            </div>
          )}
        </div>

        {/* Detail Panel */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6">
          {selectedInquiry ? (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg text-neutral-900">{selectedInquiry.name}</h3>
                <p className="text-sm text-neutral-500 mt-1">
                  {selectedInquiry.inquiry_type === 'viewing' && 'Requested a viewing'}
                  {selectedInquiry.inquiry_type === 'info' && 'Requested information'}
                  {selectedInquiry.inquiry_type === 'offer' && 'Made an offer'}
                  {selectedInquiry.inquiry_type === 'general' && 'General inquiry'}
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href={`mailto:${selectedInquiry.email}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors"
                >
                  <Mail className="h-5 w-5 text-neutral-400" />
                  <span className="text-sm text-neutral-700">{selectedInquiry.email}</span>
                </a>
                <a
                  href={`tel:${selectedInquiry.phone}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors"
                >
                  <Phone className="h-5 w-5 text-neutral-400" />
                  <span className="text-sm text-neutral-700">{selectedInquiry.phone}</span>
                </a>
              </div>

              <div>
                <h4 className="font-medium text-neutral-700 mb-2">Message</h4>
                <p className="text-neutral-600 text-sm bg-neutral-50 rounded-lg p-4">
                  {selectedInquiry.message}
                </p>
              </div>

              <div>
                <h4 className="font-medium text-neutral-700 mb-2">Property</h4>
                <a
                  href={`/properties/${selectedInquiry.property_id}`}
                  className="flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  {selectedInquiry.property_title}
                </a>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  Reply
                </Button>
                <Button variant="outline">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Eye className="h-12 w-12 text-neutral-300 mx-auto mb-3" />
              <p className="text-neutral-600">Select an inquiry to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
