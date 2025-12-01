'use client'

import Link from 'next/link'
import Image from 'next/image'
import { PropertyCard } from '@/components/properties/PropertyCard'
import { featuredProperties, recentProperties } from '@/lib/data/mock-properties'
import { Button } from '@/components/ui/button'
import {
  Search, Building2, Shield, Users, TrendingUp, Star,
  CheckCircle2, Phone, Mail, MapPin, ChevronRight, Quote,
  Home, DollarSign, Bed, Bath, ArrowRight, Sparkles, Crown, Award
} from 'lucide-react'

const areas = [
  { name: 'Salmiya', count: 156, image: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=600', premium: true },
  { name: 'Kuwait City', count: 243, image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600', premium: true },
  { name: 'Fintas', count: 89, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600', premium: false },
  { name: 'Jabriya', count: 127, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600', premium: false },
  { name: 'Hawalli', count: 198, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600', premium: true },
  { name: 'Salwa', count: 112, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600', premium: false },
]

const features = [
  {
    icon: Shield,
    title: 'Verified Listings',
    description: 'Every property undergoes rigorous verification by our expert team.',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    icon: Crown,
    title: 'Premium Service',
    description: 'White-glove service tailored for discerning clients.',
    gradient: 'from-primary-500 to-primary-600',
  },
  {
    icon: TrendingUp,
    title: 'Market Insights',
    description: 'Data-driven insights to maximize your investment potential.',
    gradient: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: Award,
    title: 'Award Winning',
    description: "Kuwait's most trusted luxury real estate partner.",
    gradient: 'from-purple-500 to-purple-600',
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
    content: 'As a first-time buyer, I was nervous about the process. The Elite Properties team guided me every step of the way and helped me find my dream home.',
    rating: 5,
  },
  {
    name: 'Abdullah Al-Khalifa',
    role: 'Business Owner',
    image: 'https://i.pravatar.cc/150?img=33',
    content: "I've worked with several real estate companies in Kuwait, but Elite Properties stands out for their professionalism and market expertise.",
    rating: 5,
  },
]

const stats = [
  { value: '2,500+', label: 'Premium Properties', icon: Building2 },
  { value: '1,000+', label: 'Happy Clients', icon: Users },
  { value: '98%', label: 'Satisfaction Rate', icon: Star },
  { value: '15+', label: 'Years Excellence', icon: Award },
]

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden">
      {/* Hero Section - Immersive Kuwait Landmark Experience */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(/kuwait-towers.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Sophisticated Multi-Layer Overlay */}
        <div className="absolute inset-0">
          {/* Base dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-900/40 to-navy-950/70" />

          {/* Premium gold accent from corners */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-primary-600/10" />

          {/* Vignette effect for depth */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

          {/* Bottom gradient for seamless transition */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-neutral-50 via-neutral-50/80 to-transparent" />
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-float animation-delay-300" />

        <div className="container mx-auto px-4 py-20 md:py-32 text-center relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 mb-8 animate-fade-in-down">
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-full
                            bg-white/10 backdrop-blur-md border border-white/20
                            shadow-luxury">
                <Sparkles className="h-4 w-4 text-primary-400" />
                <span className="text-sm font-medium text-white tracking-wide">
                  Kuwait's Premier Luxury Real Estate
                </span>
                <Sparkles className="h-4 w-4 text-primary-400" />
              </div>
            </div>

            {/* Main Heading with Elegant Typography */}
            <h1 className="mb-6 animate-fade-in-up animation-delay-200">
              <span className="block text-5xl md:text-7xl lg:text-8xl font-display font-bold
                             text-white leading-[1.1] tracking-tight
                             drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                Elite Properties
              </span>
              <span className="block mt-2 text-2xl md:text-4xl lg:text-5xl font-display font-light
                             text-gradient-gold tracking-widest">
                KUWAIT
              </span>
            </h1>

            {/* Luxury Divider */}
            <div className="flex items-center justify-center gap-4 my-8 animate-fade-in animation-delay-300">
              <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent" />
              <Crown className="h-5 w-5 text-primary-400" />
              <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent" />
            </div>

            {/* Tagline */}
            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light
                        tracking-wide mb-12 animate-fade-in-up animation-delay-400
                        drop-shadow-lg">
              Where Luxury Meets the Arabian Gulf
            </p>

            {/* Premium Search Box */}
            <div className="max-w-5xl mx-auto animate-fade-in-up animation-delay-500">
              <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/30">
                {/* Search Type Toggle */}
                <div className="flex justify-center gap-2 mb-6">
                  <button className="px-6 py-2 rounded-full bg-primary-500 text-white font-medium
                                   shadow-gold transition-all duration-300">
                    Buy
                  </button>
                  <button className="px-6 py-2 rounded-full bg-white/20 text-white font-medium
                                   hover:bg-white/30 transition-all duration-300">
                    Rent
                  </button>
                </div>

                {/* Search Fields */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  {/* Location */}
                  <div className="relative">
                    <label className="block text-xs font-semibold text-white/80 mb-2 tracking-wide uppercase">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-400" />
                      <select className="input-luxury pl-12 bg-white/95 text-neutral-800">
                        <option value="">All Areas</option>
                        <option value="salmiya">Salmiya</option>
                        <option value="kuwait-city">Kuwait City</option>
                        <option value="fintas">Fintas</option>
                        <option value="jabriya">Jabriya</option>
                        <option value="hawalli">Hawalli</option>
                      </select>
                    </div>
                  </div>

                  {/* Property Type */}
                  <div className="relative">
                    <label className="block text-xs font-semibold text-white/80 mb-2 tracking-wide uppercase">
                      Property Type
                    </label>
                    <div className="relative">
                      <Home className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-400" />
                      <select className="input-luxury pl-12 bg-white/95 text-neutral-800">
                        <option value="">All Types</option>
                        <option value="villa">Villa</option>
                        <option value="apartment">Apartment</option>
                        <option value="penthouse">Penthouse</option>
                        <option value="townhouse">Townhouse</option>
                      </select>
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="relative">
                    <label className="block text-xs font-semibold text-white/80 mb-2 tracking-wide uppercase">
                      Budget
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-400" />
                      <select className="input-luxury pl-12 bg-white/95 text-neutral-800">
                        <option value="">Any Price</option>
                        <option value="100k-300k">100K - 300K KWD</option>
                        <option value="300k-500k">300K - 500K KWD</option>
                        <option value="500k-1m">500K - 1M KWD</option>
                        <option value="1m+">1M+ KWD</option>
                      </select>
                    </div>
                  </div>

                  {/* Bedrooms */}
                  <div className="relative">
                    <label className="block text-xs font-semibold text-white/80 mb-2 tracking-wide uppercase">
                      Bedrooms
                    </label>
                    <div className="relative">
                      <Bed className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-400" />
                      <select className="input-luxury pl-12 bg-white/95 text-neutral-800">
                        <option value="">Any</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                        <option value="5">5+</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <Link href="/properties" className="block">
                  <button className="btn-luxury w-full py-4 text-lg flex items-center justify-center gap-3">
                    <Search className="h-5 w-5" />
                    <span>Search Properties</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-12 max-w-4xl mx-auto
                          animate-fade-in-up animation-delay-600">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm
                           border border-white/10 hover:bg-white/10 transition-all duration-300"
                  style={{ animationDelay: `${600 + index * 100}ms` }}
                >
                  <stat.icon className="h-6 w-6 text-primary-400 mx-auto mb-2" />
                  <p className="text-2xl md:text-3xl font-bold text-white font-display">
                    {stat.value}
                  </p>
                  <p className="text-xs md:text-sm text-white/70 font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse-soft" />
          </div>
        </div>
      </section>

      {/* Browse by Area - Premium Cards */}
      <section className="py-20 md:py-28 bg-neutral-50 relative">
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-400 to-transparent" />

        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700
                           text-sm font-semibold tracking-wide mb-4">
              EXPLORE LOCATIONS
            </span>
            <h2 className="section-title mb-4">
              Discover Premium Neighborhoods
            </h2>
            <p className="section-subtitle">
              Explore Kuwait's most prestigious addresses, curated for luxury living
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {areas.map((area, index) => (
              <Link
                key={area.name}
                href={`/properties?area=${area.name}`}
                className="group relative overflow-hidden rounded-2xl block aspect-[4/3]
                         card-elegant animate-fade-in-up animation-fill-both"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Image
                  src={area.image}
                  alt={area.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent
                              group-hover:from-black/90 transition-all duration-500" />

                {/* Premium Badge */}
                {area.premium && (
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5
                                rounded-full bg-primary-500/90 backdrop-blur-sm">
                    <Crown className="h-3.5 w-3.5 text-white" />
                    <span className="text-xs font-semibold text-white">Premium</span>
                  </div>
                )}

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl md:text-3xl font-display font-semibold text-white mb-2
                               group-hover:text-primary-300 transition-colors">
                    {area.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text-white/80 font-medium">
                      {area.count} Properties
                    </p>
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm
                                  flex items-center justify-center opacity-0 -translate-x-4
                                  group-hover:opacity-100 group-hover:translate-x-0
                                  transition-all duration-300">
                      <ArrowRight className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties - Luxury Grid */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        {/* Subtle Pattern Background */}
        <div className="absolute inset-0 opacity-[0.02]"
             style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

        <div className="container mx-auto px-4 relative">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700
                             text-sm font-semibold tracking-wide mb-4">
                HANDPICKED SELECTION
              </span>
              <h2 className="section-title mb-4">
                Featured Properties
              </h2>
              <p className="section-subtitle text-left max-w-xl">
                Exceptional homes selected for their outstanding quality and prime locations
              </p>
            </div>
            <Link href="/properties" className="hidden md:flex items-center gap-2 text-primary-600
                                               font-semibold hover:text-primary-700 transition-colors mt-4 md:mt-0">
              View All Properties
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.slice(0, 6).map((property, index) => (
              <div
                key={property.id}
                className="animate-fade-in-up animation-fill-both"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>

          {/* Mobile View All Button */}
          <div className="text-center mt-12 md:hidden">
            <Link href="/properties">
              <Button size="lg" className="btn-luxury px-8">
                View All Properties
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Modern Feature Cards */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-neutral-900 to-neutral-950 relative overflow-hidden">
        {/* Background Glow Effects */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-primary-400
                           text-sm font-semibold tracking-wide mb-4 backdrop-blur-sm">
              WHY ELITE PROPERTIES
            </span>
            <h2 className="section-title text-white mb-4">
              The Gold Standard in Real Estate
            </h2>
            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto">
              Experience unparalleled service backed by expertise and trust
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10
                         hover:bg-white/10 hover:border-primary-500/30 transition-all duration-500
                         animate-fade-in-up animation-fill-both"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl
                               bg-gradient-to-br ${feature.gradient} mb-6
                               shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 font-display">
                  {feature.title}
                </h3>
                <p className="text-neutral-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recently Added - Horizontal Scroll on Mobile */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700
                             text-sm font-semibold tracking-wide mb-4">
                FRESH LISTINGS
              </span>
              <h2 className="section-title mb-4">
                Recently Added
              </h2>
              <p className="section-subtitle text-left max-w-xl">
                The newest additions to our exclusive portfolio
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentProperties.slice(0, 4).map((property, index) => (
              <div
                key={property.id}
                className="animate-fade-in-up animation-fill-both"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Premium Carousel Style */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700
                           text-sm font-semibold tracking-wide mb-4">
              CLIENT TESTIMONIALS
            </span>
            <h2 className="section-title mb-4">
              Trusted by Thousands
            </h2>
            <p className="section-subtitle">
              Hear from our satisfied clients across Kuwait
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="group p-8 rounded-2xl bg-neutral-50 border border-neutral-200
                         hover:shadow-luxury-lg hover:border-primary-200 transition-all duration-500
                         animate-fade-in-up animation-fill-both relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Quote Icon */}
                <Quote className="h-10 w-10 text-primary-200 mb-6 group-hover:text-primary-400 transition-colors" />

                {/* Content */}
                <p className="text-neutral-700 mb-8 leading-relaxed text-lg">
                  "{testimonial.content}"
                </p>

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary-400 text-primary-400" />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={56}
                    height={56}
                    className="rounded-full ring-2 ring-primary-100"
                  />
                  <div>
                    <p className="font-semibold text-neutral-900 font-display">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-neutral-600">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium Design */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900" />

        {/* Gold accent lines */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent" />

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]
                       bg-primary-500/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <Crown className="h-12 w-12 text-primary-400 mx-auto mb-6" />

            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
              Ready to Find Your
              <span className="block text-gradient-gold">Dream Property?</span>
            </h2>

            <p className="text-lg md:text-xl text-neutral-400 mb-10 max-w-2xl mx-auto">
              Let our expert team guide you through Kuwait's finest real estate opportunities.
              Your perfect home awaits.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/properties">
                <Button size="lg" className="btn-luxury px-10 py-4 text-lg">
                  <Building2 className="h-5 w-5 mr-2" />
                  Browse Properties
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="px-10 py-4 text-lg border-2 border-white/30 text-white
                         hover:bg-white/10 hover:border-white/50 transition-all"
              >
                <Phone className="h-5 w-5 mr-2" />
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
