// Comprehensive mock property data for Elite Properties Kuwait

export interface Property {
  id: string
  title: string
  description: string
  price: number
  area: string
  governorate: string
  bedrooms: number
  bathrooms: number
  area_sqm: number
  property_type: string
  featured_image_url: string
  images: string[]
  status: string
  featured?: boolean
  verified?: boolean
  prime?: boolean
  is_new?: boolean
  no_commission?: boolean
  view_count: number
  days_listed: number
  amenities: string[]
  listing_type: 'sale' | 'rent'
  virtual_tour_url?: string
  agent?: {
    name: string
    phone: string
    email: string
    avatar: string
  }
}

const governorates = ['Capital', 'Hawalli', 'Farwaniya', 'Ahmadi', 'Jahra', 'Mubarak Al-Kabeer']
const areas: Record<string, string[]> = {
  Capital: ['Kuwait City', 'Shuwaikh', 'Doha', 'Dasman', 'Sharq'],
  Hawalli: ['Salmiya', 'Hawalli', 'Jabriya', 'Bayan', 'Salwa'],
  Farwaniya: ['Farwaniya', 'Jleeb Al-Shuyoukh', 'Ardiya', 'Ferdous'],
  Ahmadi: ['Fintas', 'Mangaf', 'Mahboula', 'Abu Halifa', 'Sabah Al-Ahmad'],
  Jahra: ['Jahra', 'Qasr', 'Sulaibiya', 'Naseem'],
  'Mubarak Al-Kabeer': ['Sabah Al-Salem', 'Fnaitees', 'Adan', 'Qurain'],
}

const propertyTypes = ['Apartment', 'Villa', 'Penthouse', 'Duplex', 'Townhouse', 'Studio']

const amenitiesList = [
  'Parking',
  'Swimming Pool',
  'Gym',
  'Security',
  'Garden',
  'Balcony',
  'Elevator',
  'Central AC',
  'Maid Room',
  'Storage',
]

const propertyTitles = [
  'Luxury Sea-View Villa',
  'Modern Penthouse',
  'Elegant Duplex',
  'Spacious Family Villa',
  'Contemporary Apartment',
  'Premium Townhouse',
  'Designer Studio',
  'Executive Villa',
  'Beachfront Penthouse',
  'Garden Apartment',
  'Sky-High Penthouse',
  'Traditional Kuwaiti Villa',
  'Smart Home Apartment',
  'Minimalist Studio',
  'Palatial Villa',
]

const descriptions = [
  'Experience luxury living in this stunning property featuring high-end finishes, spacious layouts, and breathtaking views. Perfect for families or executives seeking the ultimate in comfort and style.',
  'This exceptional property offers modern amenities, premium fixtures, and thoughtful design throughout. Ideally located in a prestigious neighborhood with easy access to shopping, dining, and entertainment.',
  'A rare opportunity to own this beautifully maintained property in one of Kuwait\'s most sought-after locations. Features include marble flooring, designer kitchen, and panoramic city views.',
  'Discover refined living in this elegant property boasting sophisticated interiors, state-of-the-art appliances, and generous living spaces. Perfect for those who appreciate quality and attention to detail.',
  'This contemporary property combines modern architecture with luxurious amenities. Featuring smart home technology, premium finishes, and stunning design elements throughout.',
]

const unsplashImages = [
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
  'https://images.unsplash.com/photo-1600573472550-8090b5e0745e',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0',
  'https://images.unsplash.com/photo-1600047509358-9dc75507daeb',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d',
  'https://images.unsplash.com/photo-1600047509782-20d39509f26d',
  'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87',
]

// Seeded random number generator for deterministic mock data
// This ensures server and client render the same data (prevents hydration errors)
class SeededRandom {
  private seed: number

  constructor(seed: number) {
    this.seed = seed
  }

  // Simple seeded random implementation (mulberry32)
  next(): number {
    let t = (this.seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }

  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min
  }
}

function getRandomItem<T>(array: T[], rng: SeededRandom): T {
  return array[Math.floor(rng.next() * array.length)]
}

function getRandomItems<T>(array: T[], count: number, rng: SeededRandom): T[] {
  const shuffled = [...array]
  // Fisher-Yates shuffle with seeded random
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng.next() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, count)
}

function generateProperty(id: number): Property {
  // Use property ID as seed for deterministic generation
  const rng = new SeededRandom(id * 12345)

  const governorate = getRandomItem(governorates, rng)
  const area = getRandomItem(areas[governorate], rng)
  const propertyType = getRandomItem(propertyTypes, rng)
  const title = getRandomItem(propertyTitles, rng)
  const listingType = rng.next() > 0.7 ? 'rent' : 'sale'

  const basePrice = listingType === 'sale'
    ? rng.nextInt(500000, 4500000)
    : rng.nextInt(500, 3500)

  const bedrooms = rng.nextInt(1, 6)
  const bathrooms = Math.min(bedrooms + rng.nextInt(0, 1), bedrooms + 1)
  const area_sqm = rng.nextInt(150, 650)

  const mainImage = getRandomItem(unsplashImages, rng)
  const additionalImages = getRandomItems(unsplashImages.filter(img => img !== mainImage), 5, rng)

  const agentNames = ['Ahmed Al-Sabah', 'Fatima Al-Mutairi', 'Mohammed Al-Rashid', 'Sara Al-Ahmad', 'Abdullah Al-Khalifa']

  return {
    id: id.toString(),
    title: `${title} in ${area}`,
    description: getRandomItem(descriptions, rng),
    price: basePrice,
    area,
    governorate,
    bedrooms,
    bathrooms,
    area_sqm,
    property_type: propertyType,
    featured_image_url: `${mainImage}?w=800&auto=format`,
    images: [mainImage, ...additionalImages].map(img => `${img}?w=1200&auto=format`),
    status: rng.next() > 0.9 ? 'Sold' : 'Available',
    featured: rng.next() > 0.85,
    verified: rng.next() > 0.3,
    prime: rng.next() > 0.9,
    is_new: rng.next() > 0.8,
    no_commission: rng.next() > 0.85,
    view_count: rng.nextInt(50, 2050),
    days_listed: rng.nextInt(0, 90),
    amenities: getRandomItems(amenitiesList, rng.nextInt(3, 8), rng),
    listing_type: listingType,
    virtual_tour_url: rng.next() > 0.7 ? 'https://example.com/virtual-tour' : undefined,
    agent: {
      name: getRandomItem(agentNames, rng),
      phone: '+965 ' + rng.nextInt(10000000, 99999999),
      email: 'agent@eliteproperties.kw',
      avatar: `https://i.pravatar.cc/150?img=${rng.nextInt(1, 70)}`,
    },
  }
}

// Generate 50 properties
export const mockProperties: Property[] = Array.from({ length: 50 }, (_, i) => generateProperty(i + 1))

// Featured properties (first 6)
export const featuredProperties = mockProperties.filter(p => p.featured).slice(0, 6)

// Recent properties
export const recentProperties = mockProperties
  .filter(p => p.days_listed <= 7)
  .sort((a, b) => a.days_listed - b.days_listed)
  .slice(0, 8)

// Premium properties
export const premiumProperties = mockProperties
  .filter(p => p.prime || p.featured)
  .sort((a, b) => b.price - a.price)
  .slice(0, 6)

// Helper function to filter properties
export function filterProperties(
  properties: Property[],
  filters: {
    search?: string
    governorates?: string[]
    propertyTypes?: string[]
    priceRange?: [number, number]
    bedrooms?: number | null
    bathrooms?: number | null
    amenities?: string[]
    listingType?: 'sale' | 'rent'
  }
): Property[] {
  return properties.filter(property => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      if (
        !property.title.toLowerCase().includes(searchLower) &&
        !property.area.toLowerCase().includes(searchLower) &&
        !property.description.toLowerCase().includes(searchLower)
      ) {
        return false
      }
    }

    // Governorate filter
    if (filters.governorates && filters.governorates.length > 0) {
      if (!filters.governorates.includes(property.governorate)) {
        return false
      }
    }

    // Property type filter
    if (filters.propertyTypes && filters.propertyTypes.length > 0) {
      if (!filters.propertyTypes.includes(property.property_type)) {
        return false
      }
    }

    // Price range filter
    if (filters.priceRange) {
      if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) {
        return false
      }
    }

    // Bedrooms filter
    if (filters.bedrooms !== null && filters.bedrooms !== undefined) {
      if (property.bedrooms < filters.bedrooms) {
        return false
      }
    }

    // Bathrooms filter
    if (filters.bathrooms !== null && filters.bathrooms !== undefined) {
      if (property.bathrooms < filters.bathrooms) {
        return false
      }
    }

    // Amenities filter
    if (filters.amenities && filters.amenities.length > 0) {
      if (!filters.amenities.every(amenity => property.amenities.includes(amenity))) {
        return false
      }
    }

    // Listing type filter
    if (filters.listingType) {
      if (property.listing_type !== filters.listingType) {
        return false
      }
    }

    return true
  })
}

// Helper function to sort properties
export function sortProperties(
  properties: Property[],
  sortBy: 'recommended' | 'price-low-high' | 'price-high-low' | 'newest' | 'most-viewed' | 'area-largest'
): Property[] {
  const sorted = [...properties]

  switch (sortBy) {
    case 'price-low-high':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-high-low':
      return sorted.sort((a, b) => b.price - a.price)
    case 'newest':
      return sorted.sort((a, b) => a.days_listed - b.days_listed)
    case 'most-viewed':
      return sorted.sort((a, b) => b.view_count - a.view_count)
    case 'area-largest':
      return sorted.sort((a, b) => b.area_sqm - a.area_sqm)
    case 'recommended':
    default:
      // Recommended: Featured first, then by views
      return sorted.sort((a, b) => {
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        return b.view_count - a.view_count
      })
  }
}
