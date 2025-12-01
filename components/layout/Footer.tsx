'use client'

import Link from 'next/link'
import { Crown, MapPin, Phone, Mail, Clock, Instagram, Twitter, Facebook, Linkedin, ArrowRight, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

const quickLinks = [
  { label: 'Properties for Sale', href: '/properties?type=sale' },
  { label: 'Properties for Rent', href: '/properties?type=rent' },
  { label: 'Featured Listings', href: '/properties?featured=true' },
  { label: 'New Listings', href: '/properties?sort=newest' },
]

const areas = [
  { label: 'Salmiya', href: '/properties?area=Salmiya' },
  { label: 'Kuwait City', href: '/properties?area=Kuwait%20City' },
  { label: 'Hawalli', href: '/properties?area=Hawalli' },
  { label: 'Fintas', href: '/properties?area=Fintas' },
  { label: 'Jabriya', href: '/properties?area=Jabriya' },
  { label: 'Salwa', href: '/properties?area=Salwa' },
]

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Our Team', href: '/team' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
]

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
]

export function Footer() {
  return (
    <footer className="relative bg-neutral-900 text-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />

      {/* Newsletter Section */}
      <div className="relative border-b border-white/10">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/20 text-primary-400
                           text-sm font-semibold tracking-wide mb-4">
              STAY UPDATED
            </span>
            <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Get Exclusive Property Alerts
            </h3>
            <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
              Be the first to know about new luxury listings, market insights, and exclusive offers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-4 rounded-xl bg-white/10 border border-white/10
                         text-white placeholder:text-neutral-500
                         focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20
                         transition-all duration-300"
              />
              <Button
                className="bg-gradient-to-r from-primary-500 to-primary-600 text-white
                         hover:from-primary-600 hover:to-primary-700 shadow-gold
                         px-8 py-4 rounded-xl font-semibold whitespace-nowrap"
              >
                Subscribe
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center
                            bg-gradient-to-br from-primary-500 to-primary-600 shadow-gold
                            group-hover:shadow-gold-lg transition-all duration-300">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-display font-bold text-xl text-white">Elite Properties</p>
                <p className="text-xs text-primary-400 tracking-widest uppercase">Kuwait</p>
              </div>
            </Link>
            <p className="text-neutral-400 mb-6 leading-relaxed">
              Kuwait's premier luxury real estate destination. We connect discerning buyers with exceptional properties.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-neutral-400">
                <MapPin className="h-5 w-5 text-primary-500 flex-shrink-0" />
                <span className="text-sm">Salmiya, Block 5, Kuwait</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-400">
                <Phone className="h-5 w-5 text-primary-500 flex-shrink-0" />
                <span className="text-sm">+965 2222 3333</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-400">
                <Mail className="h-5 w-5 text-primary-500 flex-shrink-0" />
                <span className="text-sm">info@eliteproperties.kw</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-400">
                <Clock className="h-5 w-5 text-primary-500 flex-shrink-0" />
                <span className="text-sm">Sun - Thu: 9AM - 6PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-primary-500 rounded-full" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-primary-400 transition-colors
                             text-sm flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100
                                         group-hover:translate-x-0 transition-all text-primary-400" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Areas */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-primary-500 rounded-full" />
              Popular Areas
            </h4>
            <ul className="space-y-3">
              {areas.map((area) => (
                <li key={area.href}>
                  <Link
                    href={area.href}
                    className="text-neutral-400 hover:text-primary-400 transition-colors
                             text-sm flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100
                                         group-hover:translate-x-0 transition-all text-primary-400" />
                    <span>{area.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-primary-500 rounded-full" />
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-primary-400 transition-colors
                             text-sm flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100
                                         group-hover:translate-x-0 transition-all text-primary-400" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="mt-8">
              <p className="text-sm font-semibold mb-4">Follow Us</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10
                             flex items-center justify-center text-neutral-400
                             hover:bg-primary-500 hover:text-white hover:border-primary-500
                             transition-all duration-300"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-neutral-500">
              © {new Date().getFullYear()} Elite Properties Kuwait. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-neutral-500">
              <Link href="/privacy" className="hover:text-primary-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="hover:text-primary-400 transition-colors">
                Sitemap
              </Link>
            </div>
            <p className="text-sm text-neutral-500 flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> in Kuwait
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
