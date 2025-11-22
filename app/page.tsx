'use client'

import Link from 'next/link'
import Image from 'next/image'
import { PropertyCard } from '@/components/properties/PropertyCard'
import { featuredProperties, recentProperties } from '@/lib/data/mock-properties'
import { Button } from '@/components/ui/button'
import {
  Search, Building2, Shield, Users, TrendingUp, Star,
  CheckCircle2, Phone, Mail, MapPin, ChevronRight, Quote,
  Home, DollarSign, Bed, Bath, SlidersHorizontal, ChevronDown
} from 'lucide-react'
import { motion } from 'framer-motion'

const areas = [
  { name: 'Salmiya', count: 156, image: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=600' },
  { name: 'Kuwait City', count: 243, image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600' },
  { name: 'Fintas', count: 89, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600' },
  { name: 'Jabriya', count: 127, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600' },
  { name: 'Hawalli', count: 198, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600' },
  { name: 'Salwa', count: 112, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600' },
]

const features = [
  {
    icon: Shield,
    title: 'Verified Listings',
    description: 'All properties are thoroughly verified and inspected by our team for authenticity and quality.',
  },
  {
    icon: Users,
    title: 'Expert Agents',
    description: 'Work with licensed professionals who have deep knowledge of the Kuwait real estate market.',
  },
  {
    icon: TrendingUp,
    title: 'Market Insights',
    description: 'Access comprehensive market data and trends to make informed investment decisions.',
  },
  {
    icon: CheckCircle2,
    title: 'No Hidden Fees',
    description: 'Transparent pricing with no surprises. What you see is what you pay.',
  },
]

const testimonials = [
  {
    name: 'Mohammed Al-Sabah',
    role: 'Property Investor',
    image: 'https://i.pravatar.cc/150?img=12',
    content: 'Elite Properties helped me find the perfect investment property in Salmiya. Their team was professional, knowledgeable, and made the entire process seamless.',
    rating: 5,
  },
  {
    name: 'Sara Al-Ahmad',
    role: 'First-time Buyer',
    image: 'https://i.pravatar.cc/150?img=45',
    content: 'As a first-time buyer, I was nervous about the process. The Elite Properties team guided me every step of the way and helped me find my dream home in Jabriya.',
    rating: 5,
  },
  {
    name: 'Abdullah Al-Khalifa',
    role: 'Business Owner',
    image: 'https://i.pravatar.cc/150?img=33',
    content: 'I\'ve worked with several real estate companies in Kuwait, but Elite Properties stands out for their professionalism and market expertise. Highly recommended!',
    rating: 5,
  },
]

const stats = [
  { value: '2,500+', label: 'Properties' },
  { value: '1,000+', label: 'Happy Clients' },
  { value: '95%', label: 'Satisfaction Rate' },
  { value: '10+', label: 'Years Experience' },
]

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section - Kuwait Landmarks */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 pb-20 md:pt-20 md:pb-32"
        style={{
          backgroundImage: 'url(/kuwait-towers.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Kuwait Towers & City Background Overlay */}
        <div className="absolute inset-0">
          {/* Modern Luxury Overlay - Lets landmarks shine through */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/35 via-blue-900/15 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

          {/* Elegant Gold Accent Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-blue-500/10" />
        </div>

        <div className="container mx-auto px-4 py-4 md:py-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="space-y-6 md:space-y-8 max-w-7xl mx-auto"
          >
            {/* Luxury Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-block"
            >
              <div className="px-6 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-amber-600/10
                            backdrop-blur-sm border border-amber-300/60 text-white text-sm font-bold
                            shadow-lg shadow-amber-500/10"
                   style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.4)' }}>
                Premium Real Estate in Kuwait
              </div>
            </motion.div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white
                         leading-tight"
                style={{ textShadow: '0 4px 24px rgba(0,0,0,0.7), 0 2px 12px rgba(0,0,0,0.5), 0 0 40px rgba(0,0,0,0.3)' }}>
              <span className="bg-gradient-to-r from-white via-blue-50 to-amber-100 bg-clip-text text-transparent"
                    style={{ textShadow: '0 4px 24px rgba(0,0,0,0.7), 0 0 40px rgba(0,0,0,0.4)' }}>
                Elite Properties
              </span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl font-light text-white">
                Kuwait
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-lg md:text-2xl lg:text-3xl text-white font-light max-w-3xl mx-auto
                        tracking-wide"
               style={{ textShadow: '0 2px 18px rgba(0,0,0,0.8), 0 1px 8px rgba(0,0,0,0.6), 0 0 30px rgba(0,0,0,0.4)' }}>
              Where Luxury Meets the Gulf
            </p>

            {/* Description */}
            <p className="text-sm md:text-base lg:text-lg text-white max-w-2xl mx-auto"
               style={{ textShadow: '0 2px 15px rgba(0,0,0,0.7), 0 1px 8px rgba(0,0,0,0.5), 0 0 25px rgba(0,0,0,0.3)' }}>
              Discover exceptional properties curated for discerning investors and families
              <br className="hidden md:block" />
              in the heart of Kuwait's most prestigious locations
            </p>

            {/* Advanced Premium Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="max-w-6xl mx-auto mt-6 md:mt-8 lg:mt-10"
            >
              <div className="backdrop-blur-sm bg-white/25 rounded-2xl shadow-2xl
                            border border-white/20 p-4 md:p-6 lg:p-8">

                {/* Main Search Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  {/* Location */}
                  <div className="relative">
                    <label className="block text-xs font-extrabold text-neutral-900 mb-2" style={{ textShadow: '0 1px 4px rgba(255,255,255,1), 0 0 8px rgba(255,255,255,0.6)' }}>
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-600" />
                      <select className="w-full pl-11 pr-10 py-3.5 rounded-xl border border-white/50
                                       focus:border-primary-500 focus:outline-none focus:ring-4
                                       focus:ring-primary-500/20 transition-all text-neutral-900
                                       font-bold appearance-none bg-white/30 backdrop-blur-sm cursor-pointer
                                       shadow-md">
                        <option value="">All Areas</option>
                        <option value="salmiya">Salmiya</option>
                        <option value="kuwait-city">Kuwait City</option>
                        <option value="fintas">Fintas</option>
                        <option value="jabriya">Jabriya</option>
                        <option value="hawalli">Hawalli</option>
                        <option value="salwa">Salwa</option>
                        <option value="mangaf">Mangaf</option>
                        <option value="mahboula">Mahboula</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Property Type */}
                  <div className="relative">
                    <label className="block text-xs font-extrabold text-neutral-900 mb-2" style={{ textShadow: '0 1px 4px rgba(255,255,255,1), 0 0 8px rgba(255,255,255,0.6)' }}>
                      Property Type
                    </label>
                    <div className="relative">
                      <Home className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-600" />
                      <select className="w-full pl-11 pr-10 py-3.5 rounded-xl border border-white/50
                                       focus:border-primary-500 focus:outline-none focus:ring-4
                                       focus:ring-primary-500/20 transition-all text-neutral-900
                                       font-bold appearance-none bg-white/30 backdrop-blur-sm cursor-pointer
                                       shadow-md">
                        <option value="">All Types</option>
                        <option value="apartment">Apartment</option>
                        <option value="villa">Villa</option>
                        <option value="house">House</option>
                        <option value="penthouse">Penthouse</option>
                        <option value="studio">Studio</option>
                        <option value="duplex">Duplex</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="relative">
                    <label className="block text-xs font-extrabold text-neutral-900 mb-2" style={{ textShadow: '0 1px 4px rgba(255,255,255,1), 0 0 8px rgba(255,255,255,0.6)' }}>
                      Price Range (KWD)
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-600" />
                      <select className="w-full pl-11 pr-10 py-3.5 rounded-xl border border-white/50
                                       focus:border-primary-500 focus:outline-none focus:ring-4
                                       focus:ring-primary-500/20 transition-all text-neutral-900
                                       font-bold appearance-none bg-white/30 backdrop-blur-sm cursor-pointer
                                       shadow-md">
                        <option value="">Any Price</option>
                        <option value="0-500">Up to 500</option>
                        <option value="500-1000">500 - 1,000</option>
                        <option value="1000-2000">1,000 - 2,000</option>
                        <option value="2000-5000">2,000 - 5,000</option>
                        <option value="5000+">5,000+</option>
                        <option value="100000-500000">100K - 500K (Sale)</option>
                        <option value="500000-1000000">500K - 1M (Sale)</option>
                        <option value="1000000+">1M+ (Sale)</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Bedrooms */}
                  <div className="relative">
                    <label className="block text-xs font-extrabold text-neutral-900 mb-2" style={{ textShadow: '0 1px 4px rgba(255,255,255,1), 0 0 8px rgba(255,255,255,0.6)' }}>
                      Bedrooms
                    </label>
                    <div className="relative">
                      <Bed className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-600" />
                      <select className="w-full pl-11 pr-10 py-3.5 rounded-xl border border-white/50
                                       focus:border-primary-500 focus:outline-none focus:ring-4
                                       focus:ring-primary-500/20 transition-all text-neutral-900
                                       font-bold appearance-none bg-white/30 backdrop-blur-sm cursor-pointer
                                       shadow-md">
                        <option value="">Any</option>
                        <option value="1">1+ Bed</option>
                        <option value="2">2+ Beds</option>
                        <option value="3">3+ Beds</option>
                        <option value="4">4+ Beds</option>
                        <option value="5">5+ Beds</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Advanced Filters Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {/* Bathrooms */}
                  <div className="relative">
                    <label className="block text-xs font-extrabold text-neutral-900 mb-2" style={{ textShadow: '0 1px 4px rgba(255,255,255,1), 0 0 8px rgba(255,255,255,0.6)' }}>
                      Bathrooms
                    </label>
                    <div className="relative">
                      <Bath className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-600" />
                      <select className="w-full pl-11 pr-10 py-3.5 rounded-xl border border-white/50
                                       focus:border-primary-500 focus:outline-none focus:ring-4
                                       focus:ring-primary-500/20 transition-all text-neutral-900
                                       font-bold appearance-none bg-white/30 backdrop-blur-sm cursor-pointer
                                       shadow-md">
                        <option value="">Any</option>
                        <option value="1">1+ Bath</option>
                        <option value="2">2+ Baths</option>
                        <option value="3">3+ Baths</option>
                        <option value="4">4+ Baths</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Listing Type */}
                  <div className="relative">
                    <label className="block text-xs font-extrabold text-neutral-900 mb-2" style={{ textShadow: '0 1px 4px rgba(255,255,255,1), 0 0 8px rgba(255,255,255,0.6)' }}>
                      Listing Type
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-600" />
                      <select className="w-full pl-11 pr-10 py-3.5 rounded-xl border border-white/50
                                       focus:border-primary-500 focus:outline-none focus:ring-4
                                       focus:ring-primary-500/20 transition-all text-neutral-900
                                       font-bold appearance-none bg-white/30 backdrop-blur-sm cursor-pointer
                                       shadow-md">
                        <option value="">All Listings</option>
                        <option value="sale">For Sale</option>
                        <option value="rent">For Rent</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Features */}
                  <div className="relative">
                    <label className="block text-xs font-extrabold text-neutral-900 mb-2" style={{ textShadow: '0 1px 4px rgba(255,255,255,1), 0 0 8px rgba(255,255,255,0.6)' }}>
                      Special Features
                    </label>
                    <div className="relative">
                      <Star className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-600" />
                      <select className="w-full pl-11 pr-10 py-3.5 rounded-xl border border-white/50
                                       focus:border-primary-500 focus:outline-none focus:ring-4
                                       focus:ring-primary-500/20 transition-all text-neutral-900
                                       font-bold appearance-none bg-white/30 backdrop-blur-sm cursor-pointer
                                       shadow-md">
                        <option value="">Any Features</option>
                        <option value="featured">Featured Only</option>
                        <option value="verified">Verified Only</option>
                        <option value="no-commission">No Commission</option>
                        <option value="new">New Listings</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Search Button */}
                  <div className="relative flex items-end">
                    <Link href="/properties" className="w-full">
                      <Button
                        size="lg"
                        className="w-full px-8 py-3.5 h-auto text-base font-semibold
                                 bg-gradient-to-r from-primary-600 to-primary-700
                                 hover:from-primary-700 hover:to-primary-800
                                 shadow-lg shadow-primary-500/30 hover:shadow-xl
                                 hover:shadow-primary-500/40 transition-all rounded-xl"
                      >
                        <Search className="h-5 w-5 mr-2" />
                        Search
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Quick Filter Tags */}
                <div className="pt-4 border-t border-white/20">
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
                    <span className="text-xs font-bold text-neutral-900 shrink-0" style={{ textShadow: '0 1px 4px rgba(255,255,255,1), 0 0 8px rgba(255,255,255,0.5)' }}>Quick:</span>
                    <button className="px-3 py-1.5 text-xs font-bold rounded-full bg-white/25 backdrop-blur-sm
                                     hover:bg-primary-100/50 hover:text-primary-700 transition-colors shrink-0 whitespace-nowrap
                                     border border-white/60 shadow-md text-neutral-900">
                      Luxury Villas
                    </button>
                    <button className="px-3 py-1.5 text-xs font-bold rounded-full bg-white/25 backdrop-blur-sm
                                     hover:bg-primary-100/50 hover:text-primary-700 transition-colors shrink-0 whitespace-nowrap
                                     border border-white/60 shadow-md text-neutral-900">
                      Sea View
                    </button>
                    <button className="px-3 py-1.5 text-xs font-bold rounded-full bg-white/25 backdrop-blur-sm
                                     hover:bg-primary-100/50 hover:text-primary-700 transition-colors shrink-0 whitespace-nowrap
                                     border border-white/60 shadow-md text-neutral-900">
                      Furnished
                    </button>
                    <button className="px-3 py-1.5 text-xs font-bold rounded-full bg-white/25 backdrop-blur-sm
                                     hover:bg-primary-100/50 hover:text-primary-700 transition-colors shrink-0 whitespace-nowrap
                                     border border-white/60 shadow-md text-neutral-900">
                      Pet Friendly
                    </button>
                    <button className="px-3 py-1.5 text-xs font-bold rounded-full bg-white/25 backdrop-blur-sm
                                     hover:bg-primary-100/50 hover:text-primary-700 transition-colors shrink-0 whitespace-nowrap
                                     border border-white/60 shadow-md text-neutral-900">
                      With Pool
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Browse by Area */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-neutral-900 mb-3 md:mb-4">
              Browse by Area
            </h2>
            <p className="text-base md:text-lg text-neutral-600 max-w-2xl mx-auto">
              Explore properties in Kuwait's most sought-after neighborhoods
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.map((area, index) => (
              <motion.div
                key={area.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/properties?area=${area.name}`}
                  className="group relative overflow-hidden rounded-xl block aspect-[4/3]"
                >
                  <Image
                    src={area.image}
                    alt={area.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-semibold mb-2">{area.name}</h3>
                    <p className="text-white/90">{area.count} Properties</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-primary-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="h-5 w-5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-12 md:py-16 lg:py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-neutral-900 mb-3 md:mb-4">
              Featured Properties
            </h2>
            <p className="text-base md:text-lg text-neutral-600">
              Hand-picked premium properties for discerning buyers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredProperties.slice(0, 6).map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
              />
            ))}
          </div>

          <div className="text-center">
            <Link href="/properties">
              <Button size="lg" variant="outline" className="px-8">
                View All Properties
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-neutral-900 mb-3 md:mb-4">
              Why Choose Elite Properties
            </h2>
            <p className="text-base md:text-lg text-neutral-600 max-w-2xl mx-auto">
              We're committed to providing exceptional service and helping you find your perfect property
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recently Added */}
      <section className="py-12 md:py-16 lg:py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-neutral-900 mb-3 md:mb-4">
              Recently Added
            </h2>
            <p className="text-base md:text-lg text-neutral-600">
              Fresh listings just added to our portfolio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentProperties.slice(0, 4).map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-neutral-900 mb-3 md:mb-4">
              What Our Clients Say
            </h2>
            <p className="text-base md:text-lg text-neutral-600">
              Trusted by thousands of satisfied clients across Kuwait
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-neutral-50 rounded-xl p-8 relative"
              >
                <Quote className="h-10 w-10 text-primary-200 mb-4" />
                <p className="text-neutral-700 mb-6 leading-relaxed">{testimonial.content}</p>
                <div className="flex items-center mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary-500 text-primary-500" />
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-neutral-900">{testimonial.name}</p>
                    <p className="text-sm text-neutral-600">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-white mb-4 md:mb-6">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto">
            Let our expert team help you navigate the Kuwait real estate market
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <Link href="/properties" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-white text-primary-700 hover:bg-neutral-100 px-6 md:px-8">
                <Building2 className="h-5 w-5 mr-2" />
                Browse Properties
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10 px-6 md:px-8">
              <Phone className="h-5 w-5 mr-2" />
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
