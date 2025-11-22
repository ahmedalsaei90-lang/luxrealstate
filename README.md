# Elite Properties Kuwait

A modern, luxury real estate platform showcasing premium properties across Kuwait. Built with cutting-edge web technologies to provide an exceptional browsing experience on all devices.

## Features

### Core Functionality
- **Advanced Property Search** - Filter properties by location, type, price range, and bedrooms
- **Interactive Property Listings** - Browse properties in grid or list view with smooth animations
- **Property Details** - Comprehensive property pages with image galleries, amenities, and location information
- **Quick Filters** - One-click access to popular property categories (Luxury Villas, Sea View, etc.)
- **Area-based Browsing** - Explore properties by Kuwait's premier neighborhoods

### User Features
- **Favorites System** - Save and manage favorite properties with local storage persistence
- **WhatsApp Integration** - Direct WhatsApp communication with agents for property inquiries
- **Quick Inquiry Modal** - Submit property inquiries with contact form validation
- **Property Sharing** - Share properties via native share API or clipboard

### Design & UX
- **Kuwait Landmarks Hero** - Stunning hero section featuring Kuwait Towers and skyline
- **Fully Mobile Responsive** - Optimized for all screen sizes with touch-friendly interfaces
- **Smooth Animations** - Framer Motion animations for delightful interactions
- **Glass-morphism Design** - Modern UI with backdrop-blur effects
- **Premium Typography** - Elegant font pairings (Inter, Cormorant Garamond, Playfair Display)

### Property Highlights
- Featured properties with special badges
- Verified listings with trust indicators
- Prime and luxury property designations
- No-commission property tags
- View counts and listing age tracking

## Technology Stack

### Frontend Framework
- **Next.js 16.0.3** - React framework with App Router and Turbopack
- **React 19.2.0** - Latest React with Server Components
- **TypeScript 5** - Type-safe development

### Styling & UI
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Framer Motion 11.5** - Animation library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Tailwindcss Animate** - Extended Tailwind animations

### State Management & Forms
- **Zustand 4.5** - Lightweight state management
- **React Hook Form 7.53** - Performant form handling
- **Zod 3.23** - TypeScript-first schema validation
- **TanStack Query 5.56** - Server state management

### Utilities
- **clsx & tailwind-merge** - Conditional className handling
- **date-fns 3.6** - Modern date utility library
- **nanoid 5.1** - Unique ID generation
- **sonner 2.0** - Toast notifications

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd elite-properties-kw
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3015](http://localhost:3015) in your browser

The application will hot-reload as you make changes to the code.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
elite-properties-kw/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with fonts and providers
│   ├── page.tsx                 # Homepage with hero and search
│   ├── properties/              # Property listing and detail pages
│   └── globals.css              # Global styles and Tailwind imports
├── components/                   # React components
│   ├── properties/              # Property-specific components
│   │   ├── PropertyCard.tsx     # Grid view property card
│   │   ├── PropertyListCard.tsx # List view property card
│   │   ├── PropertyGallery.tsx  # Image gallery modal
│   │   ├── QuickInquiryModal.tsx # Inquiry form modal
│   │   └── WhatsAppButton.tsx   # WhatsApp integration
│   ├── user/                    # User interaction components
│   │   └── FavoriteButton.tsx   # Favorite/save functionality
│   └── ui/                      # Reusable UI components (Radix-based)
├── lib/                         # Utilities and helpers
│   ├── data/                    # Mock data and constants
│   │   └── mock-properties.ts   # Sample property listings
│   ├── stores/                  # Zustand state stores
│   │   └── favorites-store.ts   # Favorites management
│   └── utils/                   # Utility functions
│       ├── cn.ts                # Tailwind class merger
│       └── formatters.ts        # Price and area formatters
├── public/                      # Static assets
│   └── kuwait-towers.jpg        # Hero background image
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Project dependencies
```

## Development

### Available Scripts

- `npm run dev` - Start development server on port 3015
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- **TypeScript** for type safety
- **Functional components** with React hooks
- **Tailwind CSS** for styling (utility-first approach)
- **Mobile-first** responsive design
- **Accessibility** best practices with Radix UI

### Responsive Breakpoints

- **Mobile**: Default (< 768px)
- **Tablet**: `md:` (≥ 768px)
- **Desktop**: `lg:` (≥ 1024px)

## Features Roadmap

### Completed
- ✅ Property search and filtering
- ✅ Property listing (grid and list views)
- ✅ Property detail pages
- ✅ Favorites system
- ✅ WhatsApp integration
- ✅ Quick inquiry modal
- ✅ Mobile responsive design
- ✅ Kuwait landmarks hero section

### Future Enhancements
- 🔄 Backend integration with real database
- 🔄 User authentication and profiles
- 🔄 Advanced search with map view
- 🔄 Property comparison feature
- 🔄 Saved searches and alerts
- 🔄 Agent profiles and listings
- 🔄 Property virtual tours
- 🔄 Multi-language support (Arabic/English)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Lighthouse Score**: Optimized for 90+ across all metrics
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Font Optimization**: next/font with display swap

## License

This project is private and proprietary.

## Contact

For inquiries about this project, please contact the development team.

---

Built with ❤️ using Next.js and modern web technologies.
