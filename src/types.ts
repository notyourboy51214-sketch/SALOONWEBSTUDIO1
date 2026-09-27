export type PageId =
  | 'home'
  | 'house'
  | 'artists'
  | 'chair'
  | 'grooming'
  | 'nails'
  | 'looks'
  | 'voices'
  | 'peak-hours'
  | 'reserve';

export interface Artist {
  id: string;
  name: string;
  role: string;
  title: string;
  experienceYears: number;
  specialties: string[];
  signatureLine: string;
  bio: string;
  availableDays: string[];
  serviceCategory: 'hair' | 'grooming' | 'nails' | 'all';
  photoUrl?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: 'hair-men' | 'hair-women' | 'grooming' | 'nails' | 'package';
  durationMin: number;
  pricePKR: number;
  description: string;
  idealFor: string;
  recommendedArtist?: string;
  features: string[];
  imageUrl?: string;
}

export interface SignatureLook {
  id: string;
  title: string;
  category: 'Executive' | 'Textured' | 'Classic' | 'Grooming' | 'Editorial';
  artist: string;
  hairType: string;
  stylingTime: string;
  description: string;
  aspect: string;
  imageUrl?: string;
}

export interface ReviewStory {
  id: string;
  patronName: string;
  residence: string;
  visitContext: string;
  rating: number;
  artistMentioned?: string;
  date: string;
  headline: string;
  story: string;
  keyHighlight: string;
}

export interface PeakHourDay {
  dayName: string;
  shortDay: string;
  hours: {
    hourLabel: string;
    trafficLevel: 'quiet' | 'moderate' | 'peak';
    occupancyPercent: number;
    tip: string;
  }[];
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  artistId: string;
  serviceId: string;
  date: string;
  timeSlot: string;
  specialNotes: string;
}

export interface ConfirmedBooking {
  referenceId: string;
  fullName: string;
  phone: string;
  artistName: string;
  serviceName: string;
  pricePKR: number;
  durationMin: number;
  date: string;
  timeSlot: string;
  timestamp: string;
}
