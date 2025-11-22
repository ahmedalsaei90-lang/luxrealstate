'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { X, Send, CheckCircle2, Phone, Mail, MessageSquare, Calendar, Info, DollarSign } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { formatPrice } from '@/lib/utils/formatters'
import { cn } from '@/lib/utils/cn'
import Image from 'next/image'

const inquirySchema = z.object({
  inquiryType: z.enum(['viewing', 'info', 'offer', 'general']),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(8, 'Phone number must be at least 8 digits'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  preferredContact: z.enum(['email', 'phone', 'whatsapp']),
  bestTime: z.enum(['morning', 'afternoon', 'evening', 'anytime']),
  viewingDate: z.string().optional(),
  viewingTime: z.enum(['morning', 'afternoon', 'evening']).optional(),
  offerAmount: z.string().optional(),
})

type InquiryFormData = z.infer<typeof inquirySchema>

interface Property {
  id: string
  title: string
  price: number
  area: string
  featured_image_url: string
}

interface QuickInquiryModalProps {
  property: Property
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (data: InquiryFormData) => Promise<void>
}

export function QuickInquiryModal({
  property,
  open,
  onOpenChange,
  onSubmit,
}: QuickInquiryModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      inquiryType: 'info',
      preferredContact: 'email',
      bestTime: 'anytime',
      message: `I'm interested in "${property.title}" and would like to know more details.`,
    },
  })

  const inquiryType = watch('inquiryType')
  const preferredContact = watch('preferredContact')

  const handleFormSubmit = async (data: InquiryFormData) => {
    setIsSubmitting(true)
    try {
      await onSubmit?.(data)
      setIsSuccess(true)
      setTimeout(() => {
        setIsSuccess(false)
        onOpenChange(false)
        reset()
      }, 2000)
    } catch (error) {
      console.error('Failed to submit inquiry:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
            <div className="animate-scale-in">
              <CheckCircle2 className="h-20 w-20 text-green-500 mb-4" />
            </div>
            <h3 className="text-2xl font-semibold text-neutral-900 mb-2">
              Inquiry Sent Successfully!
            </h3>
            <p className="text-neutral-600 text-center">
              We'll get back to you shortly via your preferred contact method.
            </p>
          </div>
        ) : (
          <div className="animate-fade-in">
              <DialogHeader>
                <DialogTitle className="text-2xl font-display">Quick Inquiry</DialogTitle>
                <DialogDescription>
                  Send a message about this property and we'll get back to you soon.
                </DialogDescription>
              </DialogHeader>

              {/* Property Preview */}
              <div className="my-6 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={property.featured_image_url}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-neutral-900 mb-1 truncate">
                      {property.title}
                    </h4>
                    <p className="text-sm text-neutral-600 mb-2">{property.area}</p>
                    <p className="text-lg font-bold text-primary-700">
                      {formatPrice(property.price)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                {/* Inquiry Type */}
                <div>
                  <Label>Inquiry Type *</Label>
                  <RadioGroup
                    defaultValue="info"
                    onValueChange={(value) => {
                      setValue('inquiryType', value as any)
                      // Update message based on inquiry type
                      if (value === 'viewing') {
                        setValue('message', `I would like to schedule a viewing for "${property.title}".`)
                      } else if (value === 'offer') {
                        setValue('message', `I would like to make an offer for "${property.title}".`)
                      } else if (value === 'info') {
                        setValue('message', `I would like more information about "${property.title}".`)
                      } else {
                        setValue('message', `I'm interested in "${property.title}".`)
                      }
                    }}
                    className="grid grid-cols-2 gap-3 mt-2"
                  >
                    <div className="flex items-center gap-2 p-3 border rounded-lg hover:bg-neutral-50 cursor-pointer">
                      <RadioGroupItem value="viewing" id="type-viewing" />
                      <Label htmlFor="type-viewing" className="cursor-pointer flex items-center gap-2 flex-1">
                        <Calendar className="h-4 w-4 text-primary-600" />
                        <div>
                          <p className="font-medium">Schedule Viewing</p>
                          <p className="text-xs text-neutral-500">Visit the property</p>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center gap-2 p-3 border rounded-lg hover:bg-neutral-50 cursor-pointer">
                      <RadioGroupItem value="info" id="type-info" />
                      <Label htmlFor="type-info" className="cursor-pointer flex items-center gap-2 flex-1">
                        <Info className="h-4 w-4 text-blue-600" />
                        <div>
                          <p className="font-medium">Request Info</p>
                          <p className="text-xs text-neutral-500">Ask questions</p>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center gap-2 p-3 border rounded-lg hover:bg-neutral-50 cursor-pointer">
                      <RadioGroupItem value="offer" id="type-offer" />
                      <Label htmlFor="type-offer" className="cursor-pointer flex items-center gap-2 flex-1">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <div>
                          <p className="font-medium">Make an Offer</p>
                          <p className="text-xs text-neutral-500">Submit your bid</p>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center gap-2 p-3 border rounded-lg hover:bg-neutral-50 cursor-pointer">
                      <RadioGroupItem value="general" id="type-general" />
                      <Label htmlFor="type-general" className="cursor-pointer flex items-center gap-2 flex-1">
                        <MessageSquare className="h-4 w-4 text-neutral-600" />
                        <div>
                          <p className="font-medium">General Inquiry</p>
                          <p className="text-xs text-neutral-500">Other questions</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Viewing Date & Time (shown only for viewing type) */}
                {inquiryType === 'viewing' && (
                  <div className="grid grid-cols-2 gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div>
                      <Label htmlFor="viewingDate">Preferred Date</Label>
                      <Input
                        id="viewingDate"
                        type="date"
                        {...register('viewingDate')}
                        min={new Date().toISOString().split('T')[0]}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="viewingTime">Preferred Time</Label>
                      <select
                        id="viewingTime"
                        {...register('viewingTime')}
                        className="mt-1 w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="morning">Morning (9AM - 12PM)</option>
                        <option value="afternoon">Afternoon (12PM - 5PM)</option>
                        <option value="evening">Evening (5PM - 8PM)</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Offer Amount (shown only for offer type) */}
                {inquiryType === 'offer' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <Label htmlFor="offerAmount">Your Offer Amount (KWD)</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-lg font-semibold text-neutral-600">KWD</span>
                      <Input
                        id="offerAmount"
                        type="number"
                        {...register('offerAmount')}
                        placeholder="Enter your offer"
                        min="0"
                        step="1000"
                        className="flex-1"
                      />
                    </div>
                    <p className="text-xs text-neutral-600 mt-2">
                      List price: {formatPrice(property.price)}
                    </p>
                  </div>
                )}

                {/* Name */}
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    {...register('name')}
                    placeholder="John Doe"
                    className={cn(errors.name && 'border-red-500')}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="john@example.com"
                    className={cn(errors.email && 'border-red-500')}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <div className="flex gap-2">
                    <div className="flex items-center px-3 bg-neutral-100 rounded-md border border-neutral-300">
                      <span className="text-sm text-neutral-600">+965</span>
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      {...register('phone')}
                      placeholder="12345678"
                      className={cn('flex-1', errors.phone && 'border-red-500')}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    {...register('message')}
                    placeholder="Tell us what you'd like to know..."
                    rows={4}
                    className={cn(errors.message && 'border-red-500')}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>
                  )}
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <Label>Preferred Contact Method *</Label>
                  <RadioGroup
                    defaultValue="email"
                    onValueChange={(value) =>
                      register('preferredContact').onChange({
                        target: { value, name: 'preferredContact' },
                      })
                    }
                    className="flex gap-4 mt-2"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="email" id="email-contact" />
                      <Label htmlFor="email-contact" className="cursor-pointer flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="phone" id="phone-contact" />
                      <Label htmlFor="phone-contact" className="cursor-pointer flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="whatsapp" id="whatsapp-contact" />
                      <Label htmlFor="whatsapp-contact" className="cursor-pointer flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        WhatsApp
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Best Time to Call */}
                <div>
                  <Label>Best Time to Contact</Label>
                  <RadioGroup
                    defaultValue="anytime"
                    onValueChange={(value) =>
                      register('bestTime').onChange({
                        target: { value, name: 'bestTime' },
                      })
                    }
                    className="grid grid-cols-2 gap-3 mt-2"
                  >
                    {['morning', 'afternoon', 'evening', 'anytime'].map((time) => (
                      <div key={time} className="flex items-center gap-2">
                        <RadioGroupItem value={time} id={`time-${time}`} />
                        <Label htmlFor={`time-${time}`} className="cursor-pointer capitalize">
                          {time}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-primary-600 hover:bg-primary-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 animate-spin">
                          <Send className="h-4 w-4" />
                        </div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Inquiry
                      </>
                    )}
                  </Button>
                </div>
              </form>

              <p className="text-xs text-neutral-500 text-center mt-4">
                By submitting this form, you agree to our privacy policy and terms of service.
              </p>
            </div>
          )}
      </DialogContent>
    </Dialog>
  )
}
