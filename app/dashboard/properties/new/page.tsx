'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, ArrowRight, Check, Loader2, Home, MapPin, Settings, Image, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils/cn'
import { toast } from 'sonner'
import { governorates, getAreasForGovernorate, propertyTypes, amenitiesList } from '@/lib/data/kuwait-data'
import { formatPrice } from '@/lib/utils/formatters'

// Form schema
const propertySchema = z.object({
  // Step 1: Basic Info
  title: z.string().min(10, 'Title must be at least 10 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  listing_type: z.enum(['sale', 'rent'], { required_error: 'Please select a listing type' }),
  property_type: z.string().min(1, 'Please select a property type'),
  price: z.number().min(1, 'Price is required'),

  // Step 2: Location
  governorate: z.string().min(1, 'Please select a governorate'),
  area: z.string().min(1, 'Please select an area'),
  address: z.string().optional(),

  // Step 3: Details
  bedrooms: z.number().min(0, 'Bedrooms is required'),
  bathrooms: z.number().min(1, 'At least 1 bathroom is required'),
  area_sqm: z.number().min(1, 'Area is required'),
  amenities: z.array(z.string()).default([]),
})

type PropertyFormData = z.infer<typeof propertySchema>

const steps = [
  { id: 1, title: 'Basic Info', icon: Home },
  { id: 2, title: 'Location', icon: MapPin },
  { id: 3, title: 'Details', icon: Settings },
  { id: 4, title: 'Images', icon: Image },
  { id: 5, title: 'Review', icon: Eye },
]

export default function NewPropertyPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const router = useRouter()

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: '',
      description: '',
      listing_type: undefined,
      property_type: '',
      price: 0,
      governorate: '',
      area: '',
      address: '',
      bedrooms: 0,
      bathrooms: 1,
      area_sqm: 0,
      amenities: [],
    },
  })

  const selectedGovernorate = form.watch('governorate')
  const areas = selectedGovernorate ? getAreasForGovernorate(selectedGovernorate) : []

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const remainingSlots = 15 - images.length

    if (files.length > remainingSlots) {
      toast.error(`You can only upload ${remainingSlots} more image(s)`)
      return
    }

    const validFiles = files.filter(file => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large. Max 5MB per image.`)
        return false
      }
      return true
    })

    setImages(prev => [...prev, ...validFiles])

    validFiles.forEach(file => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  const nextStep = async () => {
    // Validate current step fields
    let fieldsToValidate: (keyof PropertyFormData)[] = []

    switch (currentStep) {
      case 1:
        fieldsToValidate = ['title', 'description', 'listing_type', 'property_type', 'price']
        break
      case 2:
        fieldsToValidate = ['governorate', 'area']
        break
      case 3:
        fieldsToValidate = ['bedrooms', 'bathrooms', 'area_sqm']
        break
      case 4:
        if (images.length === 0) {
          toast.error('Please upload at least one image')
          return
        }
        break
    }

    const isValid = await form.trigger(fieldsToValidate)
    if (!isValid) return

    setCurrentStep(prev => Math.min(prev + 1, 5))
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const onSubmit = async (data: PropertyFormData) => {
    setIsSubmitting(true)

    try {
      // TODO: Upload images to Supabase Storage
      // TODO: Create property in Supabase Database

      toast.success('Property submitted for approval!')
      router.push('/dashboard/properties')
    } catch (error) {
      toast.error('Failed to submit property')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <h1 className="text-2xl font-display font-bold text-neutral-900">Add New Property</h1>
        <p className="text-neutral-600">Fill in the details to list your property</p>
      </div>

      {/* Steps Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = currentStep === step.id
            const isCompleted = currentStep > step.id

            return (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
                      isCompleted && 'bg-green-500 text-white',
                      isActive && 'bg-primary-500 text-white',
                      !isActive && !isCompleted && 'bg-neutral-100 text-neutral-400'
                    )}
                  >
                    {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <span
                    className={cn(
                      'mt-2 text-xs font-medium',
                      isActive ? 'text-primary-600' : 'text-neutral-500'
                    )}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'w-full h-0.5 mx-2',
                      currentStep > step.id ? 'bg-green-500' : 'bg-neutral-200'
                    )}
                    style={{ width: '60px' }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="bg-white rounded-xl border border-neutral-200 p-6 md:p-8">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="title">Property Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Modern Villa with Sea View in Salmiya"
                  {...form.register('title')}
                  className="mt-1"
                />
                {form.formState.errors.title && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.title.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your property in detail..."
                  rows={6}
                  {...form.register('description')}
                  className="mt-1"
                />
                {form.formState.errors.description && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.description.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Listing Type *</Label>
                  <Select
                    value={form.watch('listing_type')}
                    onValueChange={(value) => form.setValue('listing_type', value as 'sale' | 'rent')}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select listing type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sale">For Sale</SelectItem>
                      <SelectItem value="rent">For Rent</SelectItem>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.listing_type && (
                    <p className="text-sm text-red-500 mt-1">{form.formState.errors.listing_type.message}</p>
                  )}
                </div>

                <div>
                  <Label>Property Type *</Label>
                  <Select
                    value={form.watch('property_type')}
                    onValueChange={(value) => form.setValue('property_type', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.property_type && (
                    <p className="text-sm text-red-500 mt-1">{form.formState.errors.property_type.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="price">Price (KWD) *</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder={form.watch('listing_type') === 'rent' ? 'Monthly rent' : 'Sale price'}
                  {...form.register('price', { valueAsNumber: true })}
                  className="mt-1"
                />
                {form.formState.errors.price && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.price.message}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Governorate *</Label>
                  <Select
                    value={form.watch('governorate')}
                    onValueChange={(value) => {
                      form.setValue('governorate', value)
                      form.setValue('area', '')
                    }}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select governorate" />
                    </SelectTrigger>
                    <SelectContent>
                      {governorates.map((gov) => (
                        <SelectItem key={gov} value={gov}>{gov}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.governorate && (
                    <p className="text-sm text-red-500 mt-1">{form.formState.errors.governorate.message}</p>
                  )}
                </div>

                <div>
                  <Label>Area *</Label>
                  <Select
                    value={form.watch('area')}
                    onValueChange={(value) => form.setValue('area', value)}
                    disabled={!selectedGovernorate}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder={selectedGovernorate ? 'Select area' : 'Select governorate first'} />
                    </SelectTrigger>
                    <SelectContent>
                      {areas.map((area) => (
                        <SelectItem key={area} value={area}>{area}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.area && (
                    <p className="text-sm text-red-500 mt-1">{form.formState.errors.area.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="address">Street Address (Optional)</Label>
                <Input
                  id="address"
                  placeholder="e.g., Block 5, Street 10"
                  {...form.register('address')}
                  className="mt-1"
                />
              </div>
            </div>
          )}

          {/* Step 3: Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="bedrooms">Bedrooms *</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    min="0"
                    {...form.register('bedrooms', { valueAsNumber: true })}
                    className="mt-1"
                  />
                  {form.formState.errors.bedrooms && (
                    <p className="text-sm text-red-500 mt-1">{form.formState.errors.bedrooms.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="bathrooms">Bathrooms *</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    min="1"
                    {...form.register('bathrooms', { valueAsNumber: true })}
                    className="mt-1"
                  />
                  {form.formState.errors.bathrooms && (
                    <p className="text-sm text-red-500 mt-1">{form.formState.errors.bathrooms.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="area_sqm">Area (sqm) *</Label>
                  <Input
                    id="area_sqm"
                    type="number"
                    min="1"
                    {...form.register('area_sqm', { valueAsNumber: true })}
                    className="mt-1"
                  />
                  {form.formState.errors.area_sqm && (
                    <p className="text-sm text-red-500 mt-1">{form.formState.errors.area_sqm.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label className="mb-3 block">Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {amenitiesList.map((amenity) => (
                    <label
                      key={amenity}
                      className="flex items-center gap-2 p-3 rounded-lg border border-neutral-200 hover:border-primary-300 cursor-pointer"
                    >
                      <Checkbox
                        checked={form.watch('amenities')?.includes(amenity)}
                        onCheckedChange={(checked) => {
                          const current = form.watch('amenities') || []
                          if (checked) {
                            form.setValue('amenities', [...current, amenity])
                          } else {
                            form.setValue('amenities', current.filter(a => a !== amenity))
                          }
                        }}
                      />
                      <span className="text-sm">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Images */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <Label className="mb-3 block">Property Images ({images.length}/15)</Label>
                <div className="border-2 border-dashed border-neutral-300 rounded-xl p-8 text-center">
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                    disabled={images.length >= 15}
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Image className="h-12 w-12 text-neutral-400 mb-3" />
                    <p className="text-neutral-600">
                      <span className="text-primary-600 font-medium">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-sm text-neutral-500 mt-1">
                      JPG, PNG or WebP (max 5MB each)
                    </p>
                  </label>
                </div>
              </div>

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-neutral-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-sm hover:bg-red-600"
                      >
                        ×
                      </button>
                      {index === 0 && (
                        <span className="absolute bottom-2 left-2 px-2 py-1 bg-primary-500 text-white text-xs rounded">
                          Featured
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-neutral-900">Review Your Listing</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-neutral-500">Title</p>
                    <p className="font-medium">{form.watch('title')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Price</p>
                    <p className="font-medium text-lg text-primary-600">
                      {formatPrice(form.watch('price'))}
                      {form.watch('listing_type') === 'rent' && '/mo'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Type</p>
                    <p className="font-medium">
                      {form.watch('property_type')} • For {form.watch('listing_type') === 'sale' ? 'Sale' : 'Rent'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Location</p>
                    <p className="font-medium">{form.watch('area')}, {form.watch('governorate')}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-neutral-500">Specs</p>
                    <p className="font-medium">
                      {form.watch('bedrooms')} Beds • {form.watch('bathrooms')} Baths • {form.watch('area_sqm')} sqm
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Amenities</p>
                    <p className="font-medium">
                      {form.watch('amenities')?.join(', ') || 'None selected'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Images</p>
                    <p className="font-medium">{images.length} image(s) uploaded</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-neutral-500">Description</p>
                <p className="text-neutral-700 mt-1">{form.watch('description')}</p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> Your listing will be reviewed by our team before it becomes visible to the public.
                  This usually takes 1-2 business days.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentStep < 5 ? (
            <Button type="button" onClick={nextStep}>
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Submit for Approval
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}
