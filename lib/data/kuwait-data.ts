// Kuwait Governorates and Areas
export const governorates = [
  'Al Asimah (Capital)',
  'Hawally',
  'Farwaniya',
  'Mubarak Al-Kabeer',
  'Ahmadi',
  'Jahra',
]

export const areasByGovernorate: Record<string, string[]> = {
  'Al Asimah (Capital)': [
    'Kuwait City',
    'Sharq',
    'Mirqab',
    'Dasman',
    'Bneid Al-Qar',
    'Kaifan',
    'Khaldiya',
    'Adailiya',
    'Nuzha',
    'Faiha',
    'Shamiya',
    'Rawda',
    'Shuwaikh',
    'Abdullah Al-Salem',
    'Mansouriya',
    'Qadsiya',
    'Doha',
    'Jaber Al-Ahmad',
  ],
  'Hawally': [
    'Hawally',
    'Salmiya',
    'Salwa',
    'Rumaithiya',
    'Mishref',
    'Bayan',
    'Jabriya',
    'Maidan Hawally',
    'Shaab',
    'Hitteen',
    'Zahra',
    'Shuhada',
    'Siddiq',
    'Hateen',
  ],
  'Farwaniya': [
    'Farwaniya',
    'Khaitan',
    'Jleeb Al-Shuyoukh',
    'Abraq Khaitan',
    'Omariya',
    'Rabiya',
    'Andalous',
    'Riggae',
    'Rehab',
    'Sabah Al-Nasser',
    'Abdullah Al-Mubarak',
    'Ishbiliya',
    'Ardiya',
    'Firdous',
  ],
  'Mubarak Al-Kabeer': [
    'Mubarak Al-Kabeer',
    'Qurain',
    'Adan',
    'Qusour',
    'Sabah Al-Salem',
    'Messila',
    'Abu Fatira',
    'Abu Al-Hasaniya',
    'Funaitees',
  ],
  'Ahmadi': [
    'Ahmadi',
    'Fahaheel',
    'Mangaf',
    'Mahboula',
    'Fintas',
    'Abu Halifa',
    'Sabahiya',
    'Riqqa',
    'Hadiya',
    'Jaber Al-Ali',
    'Wafra',
    'Mina Abdullah',
    'Shuaiba',
    'Zoor',
    'Khiran',
    'Sabah Al-Ahmad City',
  ],
  'Jahra': [
    'Jahra',
    'Naseem',
    'Qasr',
    'Oyoun',
    'Waha',
    'Naeem',
    'Sulaibiya',
    'Amghara',
    'Saad Al-Abdullah',
    'Mutlaa',
    'Abdali',
    'Sulaibikhat',
    'Doha',
  ],
}

export function getAreasForGovernorate(governorate: string): string[] {
  return areasByGovernorate[governorate] || []
}

// Property Types
export const propertyTypes = [
  'Villa',
  'Apartment',
  'Penthouse',
  'Duplex',
  'Townhouse',
  'Floor',
  'Building',
  'Land',
  'Commercial',
  'Office',
  'Warehouse',
  'Chalet',
  'Farm',
]

// Amenities
export const amenitiesList = [
  'Swimming Pool',
  'Gym',
  'Garden',
  'Parking',
  'Security',
  'Elevator',
  'Central AC',
  'Maid\'s Room',
  'Driver\'s Room',
  'Balcony',
  'Sea View',
  'City View',
  'Storage Room',
  'Laundry Room',
  'Smart Home',
  'Solar Panels',
  'Basement',
  'Roof Access',
  'BBQ Area',
  'Playground',
  'Sauna',
  'Jacuzzi',
]

// Price ranges for filtering
export const priceRanges = {
  sale: [
    { min: 0, max: 100000, label: 'Under 100K KWD' },
    { min: 100000, max: 250000, label: '100K - 250K KWD' },
    { min: 250000, max: 500000, label: '250K - 500K KWD' },
    { min: 500000, max: 1000000, label: '500K - 1M KWD' },
    { min: 1000000, max: null, label: 'Above 1M KWD' },
  ],
  rent: [
    { min: 0, max: 500, label: 'Under 500 KWD/mo' },
    { min: 500, max: 1000, label: '500 - 1000 KWD/mo' },
    { min: 1000, max: 2000, label: '1000 - 2000 KWD/mo' },
    { min: 2000, max: 5000, label: '2000 - 5000 KWD/mo' },
    { min: 5000, max: null, label: 'Above 5000 KWD/mo' },
  ],
}

// Bedroom options
export const bedroomOptions = ['Studio', '1', '2', '3', '4', '5', '6+']

// Bathroom options
export const bathroomOptions = ['1', '2', '3', '4', '5', '6+']
