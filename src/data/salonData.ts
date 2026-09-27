import { Artist, ServiceItem, SignatureLook, ReviewStory, PeakHourDay } from '../types';

export const SALON_INFO = {
  name: 'Paragon Salon Gulberg',
  tagline: 'Hair & Grooming Atelier',
  address: '59-B-3, MM Alam Road, opposite Butlers Chocolate Cafe',
  area: 'Gulberg III, Lahore',
  city: 'Lahore, Pakistan',
  phone: '+92 42 32294007',
  phoneRaw: '924232294007',
  whatsappNumber: '924232294007',
  whatsappRaw: '924232294007',
  whatsappDefaultMessage: "Hi, I'd like to book an appointment at Paragon Salon Gulberg",
  email: 'concierge@paragonsalon.pk',
  hours: 'Open Daily · 11:00 AM – 9:00 PM',
  status: 'Open Today',
  closesAt: '9:00 PM',
  rating: 4.7,
  reviewCount: 400,
  landmark: 'Directly opposite Butlers Chocolate Cafe, between Hussain Chowk & Mini Market',
  valetAvailable: true,
  coordinates: {
    lat: 31.5126,
    lng: 74.3541
  }
};

export const ARTISTS: Artist[] = [
  {
    id: 'adeel',
    name: 'Adeel',
    role: 'Senior Stylist',
    title: 'Senior Hair Stylist & Scissor Craftsman',
    experienceYears: 11,
    specialties: ['Precision Scissor Cuts', 'Textured Tapers', 'Cranial Contour Styling', 'Natural Volume Control'],
    signatureLine: 'A true cut does not assert itself loudly; it quietly brings symmetry to your natural profile.',
    bio: 'Adeel is celebrated across Gulberg for his deliberate, measured approach at the chair. Patrons frequently remark upon his active listening during consultations and his refusal to rush even during peak Saturday boulevard hours. His scissor-over-comb work is among the sharpest on MM Alam Road.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    serviceCategory: 'hair',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rohit',
    name: 'Rohit',
    role: 'Senior Artist',
    title: 'Senior Artist & Master Groomer',
    experienceYears: 13,
    specialties: ['Seamless Low/Mid Fades', 'Signature Beard Sculpting', 'Hot Towel Ceremonial Shave', 'Executive Re-styling'],
    signatureLine: 'Every jawline tells a different architectural story. My craft is framing it with absolute precision.',
    bio: 'Known respectfully as "Senior Artist Rohit," he holds a loyal following of business leaders, entrepreneurs, and wedding parties. His reputation is built on razor-sharp line definition, custom beard contouring, and consistent execution that stays clean for weeks after a visit.',
    availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    serviceCategory: 'grooming',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'jiya',
    name: 'Jiya',
    role: 'Nail Specialist',
    title: 'Master Nail & Hand Care Specialist',
    experienceYears: 9,
    specialties: ['Deep Cuticle Architecture', 'Therapeutic Foot Recovery', 'Clinical Nail Buffing', 'Botanical Paraffin Care'],
    signatureLine: 'Detail is not a final flourish—it is the standard from the first mineral soak to the final buff.',
    bio: 'Jiya leads our Nail & Hand Studio with rigorous hygiene and gentle artistry. Revered by clients for her meticulous, unhurried technique, she transforms hand and foot care into a restorative ritual that leaves skin hydrated and nails naturally lustrous.',
    availableDays: ['Monday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    serviceCategory: 'nails',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'
  }
];

export const SERVICES: ServiceItem[] = [
  // Hair Services (The Chair)
  {
    id: 'hair-exec-cut',
    name: 'The Executive Scissor Cut',
    category: 'hair-men',
    durationMin: 45,
    pricePKR: 3200,
    description: 'Bespoke shear consultation, organic herbal wash, tailored scissor architecture, neck taper, and matte styling.',
    idealFor: 'Professionals seeking understated sophistication with effortless daily maintenance.',
    recommendedArtist: 'adeel',
    features: ['Bone-structure consultation', 'Double botanical wash', 'Precision shear detailing', 'Hot lather neck clean-up'],
    imageUrl: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'hair-fade-taper',
    name: 'Master Fade & Taper',
    category: 'hair-men',
    durationMin: 45,
    pricePKR: 3500,
    description: 'Flawless gradient blending from zero or foil shaver into textured crown with crisp perimeter framing.',
    idealFor: 'Sharp, modern silhouettes requiring surgical contrast and clean transitions.',
    recommendedArtist: 'rohit',
    features: ['Custom gradient consultation', 'Foil razor edge work', 'Cranial blending', 'Matte clay finish'],
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'hair-wash-scalp',
    name: 'Revitalizing Scalp Therapy & Cut',
    category: 'hair-men',
    durationMin: 60,
    pricePKR: 4800,
    description: 'Cooling tea-tree and eucalyptus scalp exfoliation, acupressure stimulation, warm towel wrap, followed by haircut.',
    idealFor: 'Combating city dust, scalp fatigue, and reviving healthy root vitality.',
    recommendedArtist: 'adeel',
    features: ['Micro-exfoliating scrub', '15-minute pressure point massage', 'Infused hot linen steam', 'Full styling'],
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'hair-style-blowdry',
    name: 'Editorial Texture & Blowdry',
    category: 'hair-men',
    durationMin: 30,
    pricePKR: 2000,
    description: 'Clarifying rinse, thermal round-brush molding, and lightweight botanical texture mist for events and evenings out.',
    idealFor: 'Dinners, speaking engagements, and celebrations on MM Alam Road.',
    features: ['Thermal protection prep', 'Sculpted root lift', 'Zero-weight finish'],
    imageUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=900&q=80'
  },

  // Grooming Room (Beard & Shave)
  {
    id: 'groom-beard-sculpt',
    name: 'The Signature Beard Sculpt',
    category: 'grooming',
    durationMin: 35,
    pricePKR: 2200,
    description: 'Hot towel compress, bespoke cheek and neckline mapping with Japanese straight razor, volume reduction, and cold rosewater pore seal.',
    idealFor: 'Maintaining crisp angular symmetry and removing unruly bulk without sacrificing density.',
    recommendedArtist: 'rohit',
    features: ['Facial geometry mapping', 'Steamed botanical towel', 'Single-blade razor detailing', 'Organic cedar balm massage'],
    imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'groom-traditional-shave',
    name: 'The MM Alam Ceremonial Shave',
    category: 'grooming',
    durationMin: 40,
    pricePKR: 2800,
    description: 'Triple hot linen preparation, pre-shave sandalwood oil, badger-brush lathering, two-pass straight razor glide, and cooling alum treatment.',
    idealFor: 'The ultimate smooth traditional shave experience with zero irritation or redness.',
    recommendedArtist: 'rohit',
    features: ['Triple hot towel ritual', 'Rich sandalwood lather', 'Two-pass razor glide', 'Chilled rosewater compress'],
    imageUrl: 'https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'groom-complete-package',
    name: 'The Paragon Signature Groom',
    category: 'package',
    durationMin: 80,
    pricePKR: 6500,
    description: 'Our benchmark package: Executive Haircut, Signature Beard Sculpt or Traditional Shave, Revitalizing Scalp Scrub, and Refreshing Facial Mask.',
    idealFor: 'Comprehensive grooming overhaul before key business milestones, weddings, or weekend events.',
    recommendedArtist: 'rohit',
    features: ['Full bespoke haircut', 'Master beard sculpt or shave', 'Hot towel steam & face cleanse', 'Beverage service included'],
    imageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'groom-wedding-package',
    name: 'The MM Alam Bridal / Groom Atelier',
    category: 'package',
    durationMin: 120,
    pricePKR: 11000,
    description: 'Full ceremonial preparation: Tailored Cut, Precision Facial Sculpt, Deep Hydration Face Mask, and Executive Hand & Foot Care.',
    idealFor: 'Grooms, best men, and celebration milestones needing head-to-toe refinement.',
    features: ['Full hair & beard sculpting', 'Deep pore purifying mask', 'Hand & nail groom with Jiya', 'Private chair allocation'],
    imageUrl: 'https://images.unsplash.com/photo-1517832606589-7629c3395909?auto=format&fit=crop&w=900&q=80'
  },

  // Nail & Hand Studio
  {
    id: 'nail-hand-groom',
    name: 'The Executive Manicure',
    category: 'nails',
    durationMin: 40,
    pricePKR: 2400,
    description: 'Warm almond milk soak, delicate cuticle push & trim, natural nail shaping, matte buffing, and warm shea butter wrist massage.',
    idealFor: 'Clean, polished hands that inspire confidence across the boardroom table.',
    recommendedArtist: 'jiya',
    features: ['Hygienic sterile instruments', 'Cuticle micro-detailing', 'Natural nail high-buff', 'Acupressure forearm massage'],
    imageUrl: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'nail-pedicure-therapy',
    name: 'Therapeutic Sole & Foot Restoration',
    category: 'nails',
    durationMin: 50,
    pricePKR: 3200,
    description: 'Epsom salt & peppermint foot bath, volcanic pumice callus smoothing, nail contouring, and deep calf reflexology massage.',
    idealFor: 'Relieving tired feet after long days, travel, or sporting sessions.',
    recommendedArtist: 'jiya',
    features: ['Mineral foot bath', 'Callus smoothing therapy', 'Clean nail edge shaping', 'Targeted reflexology'],
    imageUrl: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'nail-complete-duo',
    name: 'The Complete Hand & Foot Sanctum',
    category: 'nails',
    durationMin: 75,
    pricePKR: 5200,
    description: 'Synchronized luxury hand and foot ritual with Jiya: double soak, thorough exfoliation, cuticle therapy, and intense hydration balm.',
    idealFor: 'Full restoration and relaxation in our dedicated quiet hand studio.',
    recommendedArtist: 'jiya',
    features: ['Full executive manicure', 'Therapeutic pedicure', 'Warm towel cocoon', 'Cold pressed argan oil therapy'],
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=80'
  }
];

export const SIGNATURE_LOOKS: SignatureLook[] = [
  {
    id: 'look-1',
    title: 'The Gulberg Executive Taper',
    category: 'Executive',
    artist: 'Adeel',
    hairType: 'Straight to wavy, medium to dense',
    stylingTime: '3 minutes daily',
    description: 'A soft, low-shear contour that hugs the ears cleanly while maintaining natural length and dignified weight through the crown.',
    aspect: 'Natural satin finish with matte paste',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'look-2',
    title: 'The Razor Fade & Modern Crop',
    category: 'Textured',
    artist: 'Rohit',
    hairType: 'Coarse or dense hair',
    stylingTime: '2 minutes daily',
    description: 'Surgical foil taper down to the skin at the temples, blending seamlessly into a choppy, forward-swept textured crown.',
    aspect: 'Crisp hairline with sea salt mist',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'look-3',
    title: 'Classic Side Sweep & Beard Frame',
    category: 'Classic',
    artist: 'Adeel & Rohit',
    hairType: 'All textures, medium length',
    stylingTime: '5 minutes daily',
    description: 'A timeless gentleman’s parting coupled with a squared-off, dense beard contour that anchors the jawline with authority.',
    aspect: 'Conditioned luster with sandalwood beard balm',
    imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'look-4',
    title: 'Flow Taper with Scissor Softness',
    category: 'Editorial',
    artist: 'Adeel',
    hairType: 'Wavy or curlier textures',
    stylingTime: '4 minutes daily',
    description: 'Hand-sculpted entirely with shears to preserve natural movement, allowing curls to fall gracefully around the cheekbones without bulk.',
    aspect: 'Lightweight botanical oil leave-in',
    imageUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'look-5',
    title: 'Architectural Stubble & Crisp Cheekline',
    category: 'Grooming',
    artist: 'Rohit',
    hairType: 'Dense beard growth',
    stylingTime: '1 minute daily',
    description: 'Straight razor cheek and neck geometry with graduated stubble fading up into the sideburns for an effortlessly chiseled silhouette.',
    aspect: 'Cold rosewater mist and hydrating oil',
    imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'look-6',
    title: 'The Polished Hands & Buff Finish',
    category: 'Editorial',
    artist: 'Jiya',
    hairType: 'Nail & Hand Care',
    stylingTime: 'Zero maintenance',
    description: 'Clean cuticles, squared-oval nail profiles, and high-shine matte buff that looks impeccably groomed without artificial shine.',
    aspect: 'Warm organic shea butter treatment',
    imageUrl: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=900&q=80'
  }
];

export const CLIENT_STORIES: ReviewStory[] = [
  {
    id: 'story-1',
    patronName: 'Hamza K.',
    residence: 'Gulberg III, Lahore',
    visitContext: 'Weekly Executive Styling',
    rating: 5,
    artistMentioned: 'Adeel',
    date: 'Last week',
    headline: 'The only chair on MM Alam Road where you never have to look at the mirror with anxiety',
    story: 'I have tried nearly every high-end salon in Lahore over the past eight years. Adeel at Paragon is on a different level of craftsmanship. He studies your hair growth direction and head shape before even reaching for a shear. The vibe is calm, clean, and cooperative—no loud music or rushing.',
    keyHighlight: 'Precision Scissor Work'
  },
  {
    id: 'story-2',
    patronName: 'Zainab M.',
    residence: 'DHA Phase 5, Lahore',
    visitContext: 'Hand & Nail Studio Visit',
    rating: 5,
    artistMentioned: 'Jiya',
    date: '2 weeks ago',
    headline: 'Jiya’s attention to detail during the manicure and pedicure is unmatched',
    story: 'Finding a salon with hospital-grade sanitization and gentle technique for manicures in Lahore is rare. Jiya is so patient, so meticulous with cuticles, and never rushes. The space is bright and peaceful. It is opposite Butlers so I always grab an iced chocolate afterwards!',
    keyHighlight: 'Detail-Oriented Sanitation'
  },
  {
    id: 'story-3',
    patronName: 'Bilal T.',
    residence: 'Cantt, Lahore',
    visitContext: 'Grooming Package & Beard Sculpt',
    rating: 5,
    artistMentioned: 'Rohit (Senior Artist)',
    date: '3 weeks ago',
    headline: 'Senior Artist Rohit gave me the sharpest beard contour I have ever had',
    story: 'Booked the complete Groom Package before my sister’s wedding events. Rohit’s razor work is surgical. The hot towel pre-shave and rosewater finish felt incredible. The staff is remarkably cooperative—they offered fresh green tea and kept everything running right on time.',
    keyHighlight: 'Master Beard Architecture'
  },
  {
    id: 'story-4',
    patronName: 'Omer S.',
    residence: 'Model Town, Lahore',
    visitContext: 'First-time Walk-in converted to regular',
    rating: 5,
    artistMentioned: 'Adeel',
    date: '1 month ago',
    headline: '4.7 rating with 400 reviews is completely genuine—this place is legitimate',
    story: 'I walked in on a Tuesday afternoon around 2 PM because it looked bright and inviting from the street. They seated me promptly, gave an honest consultation on fixing a bad cut from another place, and completely restored the balance of my hair. Now I drive from Model Town every two weeks.',
    keyHighlight: 'Genuine Hospitality'
  },
  {
    id: 'story-5',
    patronName: 'Danish R.',
    residence: 'Gulberg II, Lahore',
    visitContext: 'Traditional Shave & Taper',
    rating: 4.8,
    artistMentioned: 'Rohit',
    date: '1 month ago',
    headline: 'Old-school hot towel etiquette with modern aesthetic standards',
    story: 'The straight-razor shave with sandalwood lather and cold linen seal is meditative. You step off the chaos of MM Alam Road into total acoustic comfort. The chairs are spacious and the staff knows how to respect your quiet time.',
    keyHighlight: 'Acoustic Comfort & Serenity'
  }
];

export const PEAK_HOURS_DATA: PeakHourDay[] = [
  {
    dayName: 'Monday',
    shortDay: 'Mon',
    hours: [
      { hourLabel: '11 AM – 1 PM', trafficLevel: 'quiet', occupancyPercent: 30, tip: 'Ideal for quiet walk-ins and leisurely consultations.' },
      { hourLabel: '1 PM – 4 PM', trafficLevel: 'quiet', occupancyPercent: 40, tip: 'Relaxed salon atmosphere with zero wait time.' },
      { hourLabel: '4 PM – 7 PM', trafficLevel: 'moderate', occupancyPercent: 65, tip: 'Steady post-office appointments; reserve 2 hrs ahead.' },
      { hourLabel: '7 PM – 9 PM', trafficLevel: 'moderate', occupancyPercent: 70, tip: 'Dinner crowd arriving on MM Alam Road.' }
    ]
  },
  {
    dayName: 'Tuesday',
    shortDay: 'Tue',
    hours: [
      { hourLabel: '11 AM – 1 PM', trafficLevel: 'quiet', occupancyPercent: 25, tip: 'Our quietest window of the week. Perfect for first-time restyles.' },
      { hourLabel: '1 PM – 4 PM', trafficLevel: 'quiet', occupancyPercent: 35, tip: 'Tranquil music, private room availability for manicures.' },
      { hourLabel: '4 PM – 7 PM', trafficLevel: 'moderate', occupancyPercent: 60, tip: 'Smooth rhythm; Adeel and Rohit are in steady flow.' },
      { hourLabel: '7 PM – 9 PM', trafficLevel: 'moderate', occupancyPercent: 68, tip: 'Evening slots book out by late afternoon.' }
    ]
  },
  {
    dayName: 'Wednesday',
    shortDay: 'Wed',
    hours: [
      { hourLabel: '11 AM – 1 PM', trafficLevel: 'quiet', occupancyPercent: 35, tip: 'Great window for multi-service groom packages.' },
      { hourLabel: '1 PM – 4 PM', trafficLevel: 'quiet', occupancyPercent: 45, tip: 'Peaceful tea service and dedicated chair focus.' },
      { hourLabel: '4 PM – 7 PM', trafficLevel: 'moderate', occupancyPercent: 70, tip: 'Mid-week grooming rush starts picking up.' },
      { hourLabel: '7 PM – 9 PM', trafficLevel: 'moderate', occupancyPercent: 75, tip: 'Reserve by 2 PM for same-evening bookings.' }
    ]
  },
  {
    dayName: 'Thursday',
    shortDay: 'Thu',
    hours: [
      { hourLabel: '11 AM – 1 PM', trafficLevel: 'quiet', occupancyPercent: 40, tip: 'Pre-weekend serenity; highly recommended.' },
      { hourLabel: '1 PM – 4 PM', trafficLevel: 'moderate', occupancyPercent: 55, tip: 'Comfortable pace before the weekend prep begins.' },
      { hourLabel: '4 PM – 7 PM', trafficLevel: 'peak', occupancyPercent: 85, tip: 'High demand for Senior Artist Rohit and Adeel.' },
      { hourLabel: '7 PM – 9 PM', trafficLevel: 'peak', occupancyPercent: 90, tip: 'MM Alam boulevard peaks; reservation mandatory.' }
    ]
  },
  {
    dayName: 'Friday',
    shortDay: 'Fri',
    hours: [
      { hourLabel: '11 AM – 1 PM', trafficLevel: 'moderate', occupancyPercent: 50, tip: 'Jummah morning window; arrive early for quick service.' },
      { hourLabel: '1 PM – 3 PM', trafficLevel: 'quiet', occupancyPercent: 35, tip: 'Post-prayer lull; very pleasant visiting window.' },
      { hourLabel: '3 PM – 6 PM', trafficLevel: 'peak', occupancyPercent: 90, tip: 'Weekend party & event preparation in full swing.' },
      { hourLabel: '6 PM – 9 PM', trafficLevel: 'peak', occupancyPercent: 95, tip: 'Full chairs; strictly advance bookings only.' }
    ]
  },
  {
    dayName: 'Saturday',
    shortDay: 'Sat',
    hours: [
      { hourLabel: '11 AM – 1 PM', trafficLevel: 'moderate', occupancyPercent: 65, tip: 'Morning appointments fill fast; book on Thursday.' },
      { hourLabel: '1 PM – 4 PM', trafficLevel: 'peak', occupancyPercent: 88, tip: 'Brisk energy; valet parking at capacity outside.' },
      { hourLabel: '4 PM – 7 PM', trafficLevel: 'peak', occupancyPercent: 98, tip: 'Peak hours of the week; wedding grooming sessions.' },
      { hourLabel: '7 PM – 9 PM', trafficLevel: 'peak', occupancyPercent: 95, tip: 'Celebration dinners on MM Alam Road.' }
    ]
  },
  {
    dayName: 'Sunday',
    shortDay: 'Sun',
    hours: [
      { hourLabel: '11 AM – 2 PM', trafficLevel: 'moderate', occupancyPercent: 60, tip: 'Relaxed Sunday grooming ritual with complimentary espresso.' },
      { hourLabel: '2 PM – 5 PM', trafficLevel: 'peak', occupancyPercent: 85, tip: 'Family and executive weekend preparation.' },
      { hourLabel: '5 PM – 8 PM', trafficLevel: 'peak', occupancyPercent: 90, tip: 'Final weekend rush before Monday morning work.' },
      { hourLabel: '8 PM – 9 PM', trafficLevel: 'moderate', occupancyPercent: 65, tip: 'Winding down towards 9 PM closing.' }
    ]
  }
];

export const GROOMING_STEPS = [
  {
    step: '01',
    title: 'Cranial & Facial Architecture Analysis',
    duration: '5 Mins',
    detail: 'Before water or shears touch your hair, your artist assesses hairline growth patterns, jawline geometry, and your routine to design a shape that grows out cleanly.',
    imageUrl: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80'
  },
  {
    step: '02',
    title: 'Botanical Steam & Pre-Shave Infusion',
    duration: '10 Mins',
    detail: 'A double-steamed linen towel steeped with eucalyptus and sweet almond essential oil softens hair follicles and primes skin without irritation.',
    imageUrl: 'https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=800&q=80'
  },
  {
    step: '03',
    title: 'Dual-Tool Precision Sculpting',
    duration: '20 Mins',
    detail: 'Japanese shears for natural crown balance and a single-edge straight razor for surgical perimeter definition, cheek symmetry, and neckline taper.',
    imageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80'
  },
  {
    step: '04',
    title: 'Cold Alum Seal & Chilled Rosewater Compress',
    duration: '5 Mins',
    detail: 'A chilled compress infused with natural Lahore rosewater tightens pores, stops micro-irritation instantly, and delivers immediate thermal contrast.',
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80'
  },
  {
    step: '05',
    title: 'Organic Cedar & Shea Butter Conditioning',
    duration: '5 Mins',
    detail: 'Lightweight, non-greasy conditioning balm worked into roots and facial hair, leaving a discreet natural fragrance and resilient satin texture.',
    imageUrl: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80'
  }
];

export const NAIL_CARE_STEPS = [
  {
    step: '01',
    title: 'Therapeutic Dead Sea Salt & Mineral Bath',
    detail: 'Warm water infused with magnesium minerals, botanical chamomile, and purifying salts to relax tired extremities and soften cuticles.'
  },
  {
    step: '02',
    title: 'Clinical Medical-Grade Cuticle Detailing',
    detail: 'Jiya applies gentle micro-instruments to lift and neaten cuticle borders without discomfort, restoring clean, elongated nail beds.'
  },
  {
    step: '03',
    title: 'Natural Buffing & High-Density Smoothing',
    detail: 'Three-stage micro-buffing generates an organic, healthy sheen across the nail surface without artificial clear coats or lacquers.'
  },
  {
    step: '04',
    title: 'Acupressure Forearm & Sole Stimulation',
    detail: 'Targeted pressure point massage with warm organic shea butter to release muscle tension from typing, driving, and prolonged standing.'
  }
];

export const REVIEWS = CLIENT_STORIES;
