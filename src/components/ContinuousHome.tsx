import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  SALON_INFO,
  ARTISTS,
  SERVICES,
  SIGNATURE_LOOKS,
  REVIEWS,
  GROOMING_STEPS,
  PEAK_HOURS_DATA
} from '../data/salonData';
import { EditorialVisual } from './EditorialVisual';
import { HorizontalScrollShowcase } from './HorizontalScrollShowcase';

interface ContinuousHomeProps {
  onScrollToSection: (sectionId: string) => void;
  selectedArtistId?: string;
  selectedServiceId?: string;
  onSelectArtist: (artistId: string) => void;
  onSelectService: (serviceId: string) => void;
}

// Editorial staggered animation configurations for viewport entrance
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  }
};

const scaleImageVariant: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
};

const viewportConfig = { once: true, amount: 0.15 };

export const ContinuousHome: React.FC<ContinuousHomeProps> = ({
  onScrollToSection,
  selectedArtistId,
  selectedServiceId,
  onSelectArtist,
  onSelectService,
}) => {
  // Service category tab
  const [serviceFilter, setServiceFilter] = useState<'all' | 'hair' | 'grooming' | 'nails'>('all');
  
  // Lookbook filter
  const [lookFilter, setLookFilter] = useState<string>('All');

  // Reviews filter
  const [reviewFilter, setReviewFilter] = useState<string>('all');

  // Peak hours selected day (5 = Saturday)
  const [selectedDayIndex, setSelectedDayIndex] = useState(5);

  // Booking form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '14:00',
    artist: selectedArtistId || 'no-pref',
    service: selectedServiceId || SERVICES[0].id,
    notes: '',
  });

  // Reference ID state after submission
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [referenceId, setReferenceId] = useState<string>('');

  // Handle service quick-book click
  const handleQuickBookService = (serviceId: string, artistId?: string) => {
    onSelectService(serviceId);
    if (artistId) onSelectArtist(artistId);
    setFormData((prev) => ({
      ...prev,
      service: serviceId,
      artist: artistId || prev.artist,
    }));
    onScrollToSection('contact');
  };

  // Handle artist quick-book click
  const handleQuickBookArtist = (artistId: string) => {
    onSelectArtist(artistId);
    setFormData((prev) => ({
      ...prev,
      artist: artistId,
    }));
    onScrollToSection('contact');
  };

  // Form submit handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const newRefId = `PSG-${randomCode}`;
    setReferenceId(newRefId);
    setBookingConfirmed(true);
  };

  // Build WhatsApp pre-filled text
  const currentArtistObj = ARTISTS.find((a) => a.id === (formData.artist !== 'no-pref' ? formData.artist : selectedArtistId));
  const currentServiceObj = SERVICES.find((s) => s.id === formData.service);
  
  const artistName = currentArtistObj ? currentArtistObj.name : 'No preference';
  const serviceName = currentServiceObj ? currentServiceObj.name : 'Hair & Grooming Service';

  const prefilledWhatsAppText = `Hi, I'd like to book an appointment at Paragon Salon Gulberg%0A• Service: ${encodeURIComponent(
    serviceName
  )}%0A• Preferred Artist: ${encodeURIComponent(artistName)}%0A• Date: ${formData.date}%0A• Time: ${
    formData.time
  }`;

  // Filtered services
  const filteredServices = SERVICES.filter((s) => {
    if (serviceFilter === 'hair') return s.category.startsWith('hair');
    if (serviceFilter === 'grooming') return s.category === 'grooming' || s.category === 'package';
    if (serviceFilter === 'nails') return s.category === 'nails';
    return true;
  });

  // Filtered looks
  const filteredLooks =
    lookFilter === 'All'
      ? SIGNATURE_LOOKS
      : SIGNATURE_LOOKS.filter((look) => look.category.toLowerCase().includes(lookFilter.toLowerCase()));

  // Filtered reviews
  const filteredReviews =
    reviewFilter === 'all'
      ? REVIEWS
      : REVIEWS.filter((r) => {
          if (reviewFilter === 'adeel') return r.artistMentioned?.toLowerCase().includes('adeel');
          if (reviewFilter === 'rohit') return r.artistMentioned?.toLowerCase().includes('rohit');
          if (reviewFilter === 'jiya') return r.artistMentioned?.toLowerCase().includes('jiya');
          if (reviewFilter === 'atmosphere') return !r.artistMentioned;
          return true;
        });

  return (
    <div className="w-full">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (id="home") WITH HIGH-DEFINITION SALON BACKGROUND IMAGE   */}
      {/* ========================================================================= */}
      <section
        id="home"
        className="relative w-full overflow-hidden min-h-[95vh] flex flex-col justify-between py-16 sm:py-24 border-b border-[#1F2B3A]/20 bg-[#141D27] text-[#EDE6DC]"
      >
        {/* Editorial Luxury Salon Interior Background Image Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=2600&q=85"
            alt="Paragon Salon Atelier Interior on MM Alam Road"
            className="w-full h-full object-cover object-center scale-105 filter brightness-[0.78] contrast-[1.08] saturate-[1.05]"
          />
          {/* Refined Scrim: Deep navy gradient ensures 100% typography legibility while salon ambiance shines vividly */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#141D27]/96 via-[#141D27]/82 to-[#141D27]/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141D27] via-transparent to-[#141D27]/60" />
          {/* Subtle Warm Bronze Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#A87C4F]/10 rounded-full blur-3xl" />
        </div>

        {/* Hero Content Container (Z-10) with Framer Motion Staggered Entrance */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 max-w-7xl mx-auto px-6 w-full space-y-10 my-auto"
        >
          {/* Status & Trust Band */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EDE6DC]/15 pb-4 text-xs font-mono text-[#EDE6DC]/85"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-[#EDE6DC]">{SALON_INFO.status}</span>
              <span>·</span>
              <span>Closes {SALON_INFO.closesAt}</span>
              <span className="hidden sm:inline">·</span>
              <span className="hidden sm:inline">59-B-3 MM Alam Road, Gulberg III</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[#C29668] font-bold">4.7★ (400+ Verified Reviews)</span>
              <span>·</span>
              <span className="text-[#EDE6DC]/80">Opposite Butlers Chocolate Cafe</span>
            </div>
          </motion.div>

          {/* Oversized Editorial Typography Hero */}
          <div className="space-y-6 max-w-5xl">
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.25em] uppercase text-[#C29668] font-semibold bg-[#141D27]/80 px-3.5 py-1.5 border border-[#A87C4F]/40 backdrop-blur-md"
            >
              <span>Atelier of Deliberate Grooming</span>
              <span>·</span>
              <span>MM Alam Road, Lahore</span>
            </motion.div>
            
            <motion.h1
              variants={fadeInUp}
              className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#EDE6DC] leading-[1.02] text-balance drop-shadow-md"
            >
              Paragon Salon Gulberg
            </motion.h1>
            
            <motion.p
              variants={fadeInUp}
              className="font-serif text-2xl sm:text-3xl text-[#EDE6DC]/90 italic font-light max-w-3xl leading-snug drop-shadow-sm"
            >
              Where architectural scissor precision and traditional straight-razor discipline meet the unhurried calm of MM Alam Road.
            </motion.p>
          </div>

          {/* Hero Action CTAs */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <button
              onClick={() => onScrollToSection('contact')}
              className="px-8 py-4 bg-[#A87C4F] text-[#141D27] hover:bg-[#C29668] transition-all duration-200 text-xs font-bold tracking-widest uppercase cursor-pointer shadow-xl hover:shadow-2xl"
            >
              Reserve Your Chair
            </button>

            <a
              href={`https://wa.me/${SALON_INFO.whatsappRaw}?text=${encodeURIComponent(
                SALON_INFO.whatsappDefaultMessage
              )}`}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 bg-[#141D27]/80 text-[#EDE6DC] border border-[#EDE6DC]/30 hover:bg-[#EDE6DC] hover:text-[#141D27] transition-all duration-200 text-xs font-semibold tracking-widest uppercase flex items-center gap-2 backdrop-blur-md"
            >
              <span>WhatsApp Atelier</span>
              <span className="text-xs">→</span>
            </a>

            <button
              onClick={() => onScrollToSection('services')}
              className="px-6 py-4 text-xs font-mono uppercase tracking-wider text-[#EDE6DC]/80 hover:text-[#C29668] transition-colors cursor-pointer font-medium"
            >
              Explore Services ↓
            </button>
          </motion.div>

          {/* Quick Department Portals with Real Photography - Staggered */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6"
          >
            <motion.div
              variants={cardVariant}
              onClick={() => {
                setServiceFilter('hair');
                onScrollToSection('services');
              }}
              className="group relative overflow-hidden bg-[#1F2B3A]/90 border border-[#EDE6DC]/15 hover:border-[#A87C4F] transition-all cursor-pointer shadow-xl backdrop-blur-sm"
            >
              <div className="h-36 w-full overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=700&q=80"
                  alt="The Chair Hair Craft"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141D27] via-transparent to-transparent" />
                <span className="absolute bottom-2 left-3 font-mono text-[10px] text-[#C29668] uppercase tracking-widest font-semibold">
                  01 / THE CHAIR
                </span>
              </div>
              <div className="p-5 space-y-1">
                <h3 className="font-serif text-lg text-[#EDE6DC] group-hover:text-[#C29668] transition-colors">
                  Master Scissor & Styling
                </h3>
                <p className="text-xs text-[#EDE6DC]/75 leading-relaxed">
                  Tailored hair design by Senior Stylist Adeel. Cranial contouring and effortless texture.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariant}
              onClick={() => {
                setServiceFilter('grooming');
                onScrollToSection('services');
              }}
              className="group relative overflow-hidden bg-[#1F2B3A]/90 border border-[#EDE6DC]/15 hover:border-[#A87C4F] transition-all cursor-pointer shadow-xl backdrop-blur-sm"
            >
              <div className="h-36 w-full overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=700&q=80"
                  alt="The Grooming Room Beard & Shave"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141D27] via-transparent to-transparent" />
                <span className="absolute bottom-2 left-3 font-mono text-[10px] text-[#C29668] uppercase tracking-widest font-semibold">
                  02 / THE GROOMING ROOM
                </span>
              </div>
              <div className="p-5 space-y-1">
                <h3 className="font-serif text-lg text-[#EDE6DC] group-hover:text-[#C29668] transition-colors">
                  Beard & Straight-Razor Rituals
                </h3>
                <p className="text-xs text-[#EDE6DC]/75 leading-relaxed">
                  Led by Senior Artist Rohit. Hot steamed linen, botanical sandalwood oils, and surgical lines.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={cardVariant}
              onClick={() => {
                setServiceFilter('nails');
                onScrollToSection('services');
              }}
              className="group relative overflow-hidden bg-[#1F2B3A]/90 border border-[#EDE6DC]/15 hover:border-[#A87C4F] transition-all cursor-pointer shadow-xl backdrop-blur-sm"
            >
              <div className="h-36 w-full overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=700&q=80"
                  alt="Hand & Nail Studio"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141D27] via-transparent to-transparent" />
                <span className="absolute bottom-2 left-3 font-mono text-[10px] text-[#C29668] uppercase tracking-widest font-semibold">
                  03 / HAND & NAIL STUDIO
                </span>
              </div>
              <div className="p-5 space-y-1">
                <h3 className="font-serif text-lg text-[#EDE6DC] group-hover:text-[#C29668] transition-colors">
                  Clinical Nail Architecture
                </h3>
                <p className="text-xs text-[#EDE6DC]/75 leading-relaxed">
                  Meticulous care by specialist Jiya. Hospital-grade autoclave hygiene and natural buffing.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 2. INTRO / BRAND STORY (id="story") WITH SCROLL-TRIGGERED REVEAL          */}
      {/* ========================================================================= */}
      <section id="story" className="relative w-full py-20 sm:py-28 bg-[#F7F3ED] border-b border-[#1F2B3A]/10">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          {/* Chapter Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeInUp}
            className="space-y-4 max-w-4xl"
          >
            <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#A87C4F] font-semibold">
              <span>Chapter 01</span>
              <span>·</span>
              <span>The Atelier Heritage</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl text-[#1F2B3A] tracking-tight text-balance">
              The House on MM Alam Road
            </h2>
            <p className="text-base sm:text-lg text-[#1F2B3A]/80 leading-relaxed max-w-3xl">
              Situated at 59-B-3 MM Alam Road, opposite Butlers Chocolate Cafe, Paragon Salon Gulberg was conceived as a bright, serene antidote to the frantic pace of Lahore.
            </p>
          </motion.div>

          {/* Dual Photographic Visual Showcase */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <motion.div variants={scaleImageVariant} className="lg:col-span-8">
              <EditorialVisual
                type="interior"
                aspect="16:9"
                title="The Main Salon Floor · Natural Daylight & Warm Stone"
                subtitle="MM Alam Road, Gulberg III · Opposite Butlers"
                imageSrc="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80"
              />
            </motion.div>
            <motion.div variants={scaleImageVariant} className="lg:col-span-4">
              <EditorialVisual
                type="grooming-ritual"
                aspect="4:3"
                title="Artisanal Straight Razor Station"
                subtitle="The Grooming Room"
                imageSrc="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80"
              />
            </motion.div>
          </motion.div>

          {/* Narrative & Principles */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          >
            <motion.div variants={cardVariant} className="lg:col-span-5 space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#A87C4F] font-semibold">
                Our Origin & Philosophy
              </span>
              <h3 className="font-serif text-3xl text-[#1F2B3A] leading-snug">
                A sanctuary built for craft, not conveyor-belt volume.
              </h3>
              <p className="text-xs text-[#1F2B3A]/60 font-mono">
                4.7★ Rating · 400+ Verified Lahore Patrons
              </p>
            </motion.div>

            <motion.div variants={cardVariant} className="lg:col-span-7 space-y-6 text-sm text-[#1F2B3A]/85 leading-relaxed">
              <p>
                MM Alam Road is the beating heart of Lahore’s retail and culinary prestige. Yet for years, discerning patrons faced a frustrating compromise: either dim, cramped barbershops running on noisy buzzers and hurried 10-minute turnarounds, or generic franchise parlors with little artistic continuity.
              </p>
              <p>
                Paragon was established to restore dignity, spatial comfort, and architectural precision to personal grooming. When you step through our glass entrance opposite Butlers Chocolate Cafe, the acoustic roar of the boulevard fades into soft ambient jazz and the sound of handcrafted Japanese shears.
              </p>
              <p>
                Our master chairs are spaced generously apart. Natural daylight illuminates every station so that hair tones and skin fades are seen in true daylight conditions—never distorted by unflattering fluorescent strips.
              </p>
            </motion.div>
          </motion.div>

          {/* Three Non-Negotiable Standards - Staggered Entrance */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="bg-[#EDE6DC] border border-[#1F2B3A]/10 p-8 sm:p-12 space-y-8"
          >
            <motion.div variants={fadeInUp} className="max-w-2xl">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#A87C4F] font-semibold">
                The Paragon Standards
              </span>
              <h4 className="font-serif text-2xl sm:text-3xl text-[#1F2B3A] tracking-tight mt-1">
                Built directly on real patron feedback.
              </h4>
              <p className="text-xs text-[#1F2B3A]/70 mt-2">
                Over 400 patrons have documented their experiences with us. These are the three vows that govern every chair in the house.
              </p>
            </motion.div>

            <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div variants={cardVariant} className="space-y-3">
                <span className="font-serif text-2xl text-[#A87C4F]">01</span>
                <h5 className="font-serif text-lg text-[#1F2B3A]">The Unhurried Consultation</h5>
                <p className="text-xs text-[#1F2B3A]/75 leading-relaxed">
                  We never touch a shear or razor until your artist has analyzed your facial bone structure, hair growth direction, and work routine. You will never be rushed out the door.
                </p>
              </motion.div>

              <motion.div variants={cardVariant} className="space-y-3">
                <span className="font-serif text-2xl text-[#A87C4F]">02</span>
                <h5 className="font-serif text-lg text-[#1F2B3A]">Cooperative, Respectful Staff</h5>
                <p className="text-xs text-[#1F2B3A]/75 leading-relaxed">
                  Our hospitality team is trained to be genuinely helpful without intruding. Whether you wish to work quietly, enjoy fresh pour-over coffee, or converse about technique, we respect your space.
                </p>
              </motion.div>

              <motion.div variants={cardVariant} className="space-y-3">
                <span className="font-serif text-2xl text-[#A87C4F]">03</span>
                <h5 className="font-serif text-lg text-[#1F2B3A]">Meticulous Hospital Cleanliness</h5>
                <p className="text-xs text-[#1F2B3A]/75 leading-relaxed">
                  In both our main grooming room and Jiya’s Nail & Hand Studio, all steel clippers, tweezers, and shears undergo clinical sanitation cycles between every client. Fresh linen, always.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MAIN SERVICES / OFFER (id="services") WITH VISUAL PHOTOGRAPHY          */}
      {/* ========================================================================= */}
      <section id="services" className="w-full py-20 sm:py-28 max-w-7xl mx-auto px-6 space-y-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          className="space-y-4 max-w-3xl"
        >
          <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#A87C4F] font-semibold">
            <span>Chapter 02</span>
            <span>·</span>
            <span>Master Service Menu</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl text-[#1F2B3A] tracking-tight">
            The Service Directory
          </h2>
          <p className="text-base text-[#1F2B3A]/80 leading-relaxed">
            Presented as an honest, transparent menu with tactile photography. Every service reflects dedicated chair time, master craftsmanship, and hospital-clean hygiene on MM Alam Road.
          </p>
        </motion.div>

        {/* Filter Tabs for Quick Department Browsing */}
        <div className="flex flex-wrap items-center gap-3 hairline-border-b pb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#A87C4F] mr-2">Filter Department:</span>
          {[
            { id: 'all', label: 'All Services' },
            { id: 'hair', label: 'The Chair (Hair Services)' },
            { id: 'grooming', label: 'The Grooming Room (Beard & Shave)' },
            { id: 'nails', label: 'Nail & Hand Studio' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setServiceFilter(tab.id as any)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                serviceFilter === tab.id
                  ? 'bg-[#1F2B3A] text-[#EDE6DC]'
                  : 'bg-[#F7F3ED] text-[#1F2B3A]/80 hover:bg-[#EDE6DC] border border-[#1F2B3A]/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Service List with High-End Staggered Animation and Visual Photography */}
        <motion.div
          key={serviceFilter}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-6"
        >
          {filteredServices.map((service) => {
            const recommendedArtistObj = ARTISTS.find((a) => a.id === service.recommendedArtist);

            return (
              <motion.div
                key={service.id}
                variants={cardVariant}
                className="bg-[#F7F3ED] border border-[#1F2B3A]/10 hover:border-[#A87C4F] transition-all group shadow-sm hover:shadow-md overflow-hidden flex flex-col md:flex-row"
              >
                {/* Visual Service Photo Thumbnail */}
                {service.imageUrl && (
                  <div className="md:w-56 h-48 md:h-auto flex-shrink-0 relative overflow-hidden bg-[#243345]">
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F2B3A]/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#F7F3ED]/40" />
                    <span className="absolute bottom-2 left-3 md:hidden font-mono text-[10px] text-[#EDE6DC] uppercase tracking-wider bg-[#1F2B3A]/80 px-2 py-0.5">
                      {service.durationMin} Mins
                    </span>
                  </div>
                )}

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between gap-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="space-y-2 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-serif text-2xl text-[#1F2B3A] group-hover:text-[#A87C4F] transition-colors">
                          {service.name}
                        </h3>
                        <span className="text-xs font-mono text-[#A87C4F] bg-[#EDE6DC] px-2 py-0.5 border border-[#A87C4F]/20">
                          {service.durationMin} Minutes
                        </span>
                        {recommendedArtistObj && (
                          <span className="text-xs font-mono text-[#1F2B3A]/60">
                            Recommended: {recommendedArtistObj.name} ({recommendedArtistObj.role})
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[#1F2B3A]/80 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="pt-2 flex flex-wrap gap-2">
                        {service.features.map((feat, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-mono text-[#1F2B3A]/70 bg-[#EDE6DC]/60 px-2 py-1"
                          >
                            ✓ {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end justify-between gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-[#1F2B3A]/10">
                      <div className="text-left md:text-right">
                        <div className="font-serif text-2xl sm:text-3xl text-[#1F2B3A]">
                          PKR {service.pricePKR.toLocaleString()}
                        </div>
                        <span className="text-[10px] font-mono text-[#1F2B3A]/50">Inclusive of taxes & linens</span>
                      </div>

                      <button
                        onClick={() => handleQuickBookService(service.id, service.recommendedArtist)}
                        className="px-5 py-2.5 bg-[#1F2B3A] text-[#EDE6DC] hover:bg-[#A87C4F] transition-colors text-xs font-semibold uppercase tracking-wider cursor-pointer whitespace-nowrap shadow-sm hover:shadow"
                      >
                        Book This Service →
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 4. UNIQUE VALUE / APPROACH (id="approach") WITH RESIDENT ARTISTS           */}
      {/* ========================================================================= */}
      <section id="approach" className="relative w-full py-20 sm:py-28 bg-[#1F2B3A] text-[#EDE6DC] overflow-hidden">
        {/* Salon Interior Atelier Atmospheric Photographic Background */}
        <div className="absolute inset-0 z-0 opacity-25 pointer-events-none overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=2200&q=85"
            alt="Salon Atelier Background"
            className="w-full h-full object-cover filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F2B3A] via-[#1F2B3A]/85 to-[#1F2B3A]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 space-y-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeInUp}
            className="space-y-4 max-w-3xl"
          >
            <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#C29668] font-semibold">
              <span>Chapter 03</span>
              <span>·</span>
              <span>Named Master Reputations</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl text-[#EDE6DC] tracking-tight">
              The Resident Artists
            </h2>
            <p className="text-base text-[#EDE6DC]/80 leading-relaxed">
              At Paragon Salon Gulberg, you are never handed off to an anonymous junior assistant. Our chairs are anchored by seasoned masters with established reputations in Lahore.
            </p>
          </motion.div>

          {/* Three Resident Artists Cards with Staggered Entrance */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {ARTISTS.map((artist) => (
              <motion.div
                key={artist.id}
                variants={cardVariant}
                className="bg-[#141D27] border border-[#EDE6DC]/10 overflow-hidden flex flex-col justify-between hover:border-[#A87C4F] transition-all group shadow-xl"
              >
                {/* Artist Photo Header */}
                <div className="relative h-72 w-full overflow-hidden bg-[#243345]">
                  <img
                    src={artist.photoUrl}
                    alt={artist.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141D27] via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 bg-[#141D27]/85 backdrop-blur-sm border border-[#EDE6DC]/20 px-2.5 py-1 text-[10px] font-mono text-[#EDE6DC]">
                    {artist.experienceYears} Years Exp
                  </div>
                  <div className="absolute bottom-4 left-6 right-6">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#C29668] font-semibold block">
                      {artist.role}
                    </span>
                    <h3 className="font-serif text-3xl text-[#EDE6DC]">
                      {artist.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                  <p className="text-sm font-serif italic text-[#C29668] leading-snug">
                    "{artist.signatureLine}"
                  </p>

                  <p className="text-xs text-[#EDE6DC]/75 leading-relaxed">
                    {artist.bio}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-[#EDE6DC]/10">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#EDE6DC]/50">
                      Technical Specialties:
                    </span>
                    <ul className="space-y-1">
                      {artist.specialties.map((spec, i) => (
                        <li key={i} className="text-xs text-[#EDE6DC]/85 flex items-center gap-2">
                          <span className="text-[#C29668]">·</span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[#EDE6DC]/10 space-y-3">
                    <div className="text-[10px] font-mono text-[#EDE6DC]/50">
                      Available: {artist.availableDays.join(', ')}
                    </div>
                    <button
                      onClick={() => handleQuickBookArtist(artist.id)}
                      className="w-full py-3 bg-[#A87C4F] text-[#141D27] font-semibold text-xs uppercase tracking-widest hover:bg-[#C29668] transition-colors cursor-pointer shadow-md"
                    >
                      Request {artist.name} in Chair →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Why Discerning Patrons Choose Paragon - Staggered */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-8 border-t border-[#EDE6DC]/10 text-xs"
          >
            <motion.div variants={cardVariant} className="space-y-2">
              <span className="font-mono text-[#C29668] uppercase tracking-wider">No Junior Hand-offs</span>
              <p className="text-[#EDE6DC]/70">
                Your booked senior artist performs your service from consultation to final styling.
              </p>
            </motion.div>
            <motion.div variants={cardVariant} className="space-y-2">
              <span className="font-mono text-[#C29668] uppercase tracking-wider">Dedicated 45+ Min Slots</span>
              <p className="text-[#EDE6DC]/70">
                Chairs are never double-booked. No rushing to turn over stations on MM Alam Road.
              </p>
            </motion.div>
            <motion.div variants={cardVariant} className="space-y-2">
              <span className="font-mono text-[#C29668] uppercase tracking-wider">Natural Daylight Studio</span>
              <p className="text-[#EDE6DC]/70">
                Generous natural illumination allows accurate assessment of fades, textures, and skin tones.
              </p>
            </motion.div>
            <motion.div variants={cardVariant} className="space-y-2">
              <span className="font-mono text-[#C29668] uppercase tracking-wider">Hospital Autoclave Rigor</span>
              <p className="text-[#EDE6DC]/70">
                Medical sterilization pouches opened in front of you. Cleanliness is our primary ethos.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. FEATURED CONTENT / VISUAL STORY (id="gallery")                         */}
      {/* ========================================================================= */}
      <section id="gallery" className="w-full py-20 sm:py-28 max-w-7xl mx-auto px-6 space-y-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#A87C4F] font-semibold">
              <span>Chapter 04</span>
              <span>·</span>
              <span>Lookbook & Visual Archive</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl text-[#1F2B3A] tracking-tight">
              Signature Looks
            </h2>
            <p className="text-base text-[#1F2B3A]/80 leading-relaxed">
              Curated transformations sculpted at our chairs on MM Alam Road. Drag horizontally or browse categorized styles below.
            </p>
          </div>

          {/* Lookbook Category Filters */}
          <div className="flex flex-wrap gap-2">
            {['All', 'Executive', 'Textured', 'Classic', 'Grooming'].map((cat) => (
              <button
                key={cat}
                onClick={() => setLookFilter(cat)}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider cursor-pointer transition-colors ${
                  lookFilter === cat
                    ? 'bg-[#1F2B3A] text-[#EDE6DC]'
                    : 'bg-[#F7F3ED] text-[#1F2B3A]/70 border border-[#1F2B3A]/10 hover:bg-[#EDE6DC]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Horizontal Drag-to-Scroll Lookbook Showcase with Reveal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
        >
          <HorizontalScrollShowcase
            title="Transformations & Silhouettes"
            subtitle="Swipe horizontally or use arrows to inspect craft"
            countLabel={`${filteredLooks.length} Curated Looks`}
          >
            {filteredLooks.map((look) => (
              <div
                key={look.id}
                className="min-w-[300px] sm:min-w-[360px] max-w-[380px] flex-shrink-0 bg-[#F7F3ED] border border-[#1F2B3A]/10 flex flex-col justify-between shadow-sm"
              >
                <div className="p-4">
                  <EditorialVisual
                    type={
                      look.id === 'look-1'
                        ? 'transformation-exec'
                        : look.id === 'look-2'
                        ? 'transformation-fade'
                        : look.id === 'look-3'
                        ? 'transformation-classic'
                        : 'grooming-ritual'
                    }
                    aspect="4:3"
                    title={look.title}
                    subtitle={`${look.artist} · ${look.stylingTime}`}
                    imageSrc={look.imageUrl}
                  />
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-[#A87C4F] font-semibold">{look.category} Silhouette</span>
                    <span className="text-xs font-mono text-[#1F2B3A]/50">Artist: {look.artist}</span>
                  </div>

                  <h3 className="font-serif text-xl text-[#1F2B3A] leading-snug">
                    {look.title}
                  </h3>

                  <p className="text-xs text-[#1F2B3A]/75 leading-relaxed">
                    {look.description}
                  </p>

                  <div className="pt-2 border-t border-[#1F2B3A]/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-[#1F2B3A]/60">Hair: {look.hairType}</span>
                    <button
                      onClick={() => {
                        const artistObj = ARTISTS.find((a) => a.name.toLowerCase().includes(look.artist.toLowerCase()));
                        if (artistObj) onSelectArtist(artistObj.id);
                        onScrollToSection('contact');
                      }}
                      className="text-[#A87C4F] font-semibold hover:underline cursor-pointer"
                    >
                      Request Look →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </HorizontalScrollShowcase>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 6. TRUST / REVIEWS (id="reviews") WITH STAGGER REVEAL                     */}
      {/* ========================================================================= */}
      <section id="reviews" className="w-full py-20 sm:py-28 bg-[#EDE6DC] border-t border-[#1F2B3A]/10">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          {/* Header & Trust Metrics */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
          >
            <motion.div variants={cardVariant} className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#A87C4F] font-semibold">
                <span>Chapter 05</span>
                <span>·</span>
                <span>The Voice of Lahore</span>
              </div>
              <h2 className="font-serif text-4xl sm:text-6xl text-[#1F2B3A] tracking-tight">
                Patron Stories & Standing
              </h2>
              <p className="text-base text-[#1F2B3A]/80 leading-relaxed max-w-2xl">
                4.7 out of 5 stars from over 400 verified client evaluations. These testimonials reflect genuine experiences with our senior artists, cooperative team, and serene environment.
              </p>
            </motion.div>

            <motion.div variants={cardVariant} className="lg:col-span-4 bg-[#F7F3ED] border border-[#1F2B3A]/10 p-6 flex flex-col justify-center space-y-2 shadow-sm">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-5xl text-[#1F2B3A] font-bold">4.7</span>
                <span className="text-xl text-[#A87C4F]">★★★★★</span>
              </div>
              <p className="text-xs font-mono text-[#1F2B3A]/70">
                400+ Verified Patron Reviews · MM Alam Road, Gulberg III
              </p>
            </motion.div>
          </motion.div>

          {/* Review Filter Tabs */}
          <div className="flex flex-wrap gap-2 hairline-border-b pb-4">
            {[
              { id: 'all', label: 'All Reviews' },
              { id: 'adeel', label: 'Stylist Adeel' },
              { id: 'rohit', label: 'Senior Artist Rohit' },
              { id: 'jiya', label: 'Nail Specialist Jiya' },
              { id: 'atmosphere', label: 'Space & Hospitality' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setReviewFilter(tab.id)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider cursor-pointer transition-colors ${
                  reviewFilter === tab.id
                    ? 'bg-[#1F2B3A] text-[#EDE6DC]'
                    : 'bg-[#F7F3ED] text-[#1F2B3A]/70 border border-[#1F2B3A]/10 hover:bg-[#E4DACE]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Testimonial Cards - Staggered */}
          <motion.div
            key={reviewFilter}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredReviews.map((review) => (
              <motion.div
                key={review.id}
                variants={cardVariant}
                className="bg-[#F7F3ED] border border-[#1F2B3A]/10 p-8 flex flex-col justify-between space-y-6 shadow-sm hover:border-[#A87C4F] transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#A87C4F] font-mono tracking-widest">
                      {'★'.repeat(review.rating)}
                    </span>
                    <span className="font-mono text-[#1F2B3A]/40">{review.date}</span>
                  </div>

                  <h3 className="font-serif text-lg text-[#1F2B3A] leading-snug">
                    "{review.headline}"
                  </h3>

                  <p className="text-xs text-[#1F2B3A]/80 leading-relaxed italic">
                    "{review.story}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1F2B3A]/10">
                  <div className="font-serif text-sm font-semibold text-[#1F2B3A]">
                    {review.patronName}
                  </div>
                  <div className="text-[11px] font-mono text-[#1F2B3A]/60 flex justify-between items-center mt-1">
                    <span>{review.residence}</span>
                    {review.artistMentioned && (
                      <span className="text-[#A87C4F]">{review.artistMentioned}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. PROCESS / HOW IT WORKS (id="process") WITH STEP PHOTOGRAPHY & REVEAL   */}
      {/* ========================================================================= */}
      <section id="process" className="relative w-full py-20 sm:py-28 bg-[#F7F3ED] border-y border-[#1F2B3A]/10 overflow-hidden">
        {/* Subtle Background Texture Layer */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=2200&q=80"
            alt="Process Background"
            className="w-full h-full object-cover filter grayscale contrast-125"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 space-y-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeInUp}
            className="space-y-4 max-w-3xl"
          >
            <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#A87C4F] font-semibold">
              <span>Chapter 06</span>
              <span>·</span>
              <span>The Paragon Protocol</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl text-[#1F2B3A] tracking-tight">
              Anatomy of the Grooming Ritual
            </h2>
            <p className="text-base text-[#1F2B3A]/80 leading-relaxed">
              Every appointment follows a strict five-stage architectural ritual designed to eliminate rushing and guarantee symmetry, documented with authentic craft photography.
            </p>
          </motion.div>

          {/* 5-Step Process Sequence with High-Quality Photography - Staggered */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-5 gap-6"
          >
            {GROOMING_STEPS.map((step) => (
              <motion.div
                key={step.step}
                variants={cardVariant}
                className="bg-[#EDE6DC] border border-[#1F2B3A]/10 overflow-hidden flex flex-col justify-between shadow-sm group hover:border-[#A87C4F] transition-all"
              >
                {/* Step Photo Thumbnail */}
                {step.imageUrl && (
                  <div className="h-36 w-full relative overflow-hidden bg-[#243345]">
                    <img
                      src={step.imageUrl}
                      alt={step.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#EDE6DC] via-transparent to-transparent" />
                    <span className="absolute top-2 left-2 font-serif text-2xl text-[#EDE6DC] font-bold drop-shadow-md bg-[#1F2B3A]/70 px-2 py-0.5">
                      {step.step}
                    </span>
                  </div>
                )}

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#1F2B3A]/60">
                      <span className="uppercase text-[#A87C4F] font-semibold">Stage {step.step}</span>
                      <span className="bg-[#F7F3ED] px-2 py-0.5 border border-[#1F2B3A]/10">
                        {step.duration}
                      </span>
                    </div>
                    <h3 className="font-serif text-base text-[#1F2B3A] mt-2 font-semibold leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#1F2B3A]/75 mt-2 leading-relaxed">
                      {step.detail}
                    </p>
                  </div>
                  <div className="h-0.5 w-10 bg-[#A87C4F]" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Clinical Autoclave Hygiene Note */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeInUp}
            className="bg-[#1F2B3A] text-[#EDE6DC] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
          >
            <div className="space-y-2 max-w-2xl">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#A87C4F] font-semibold">
                Clinical Hygiene Protocol
              </span>
              <h3 className="font-serif text-2xl text-[#EDE6DC]">
                Hospital-Grade Autoclave Sterilization
              </h3>
              <p className="text-xs text-[#EDE6DC]/75 leading-relaxed">
                All stainless Japanese shears, straight razors, and manicure tweezers are sealed in sterile medical pouches and opened only in your presence. Clean linen, disposable neck strips, and organic disinfectant used for every patron.
              </p>
            </div>
            <button
              onClick={() => onScrollToSection('contact')}
              className="px-6 py-3 bg-[#A87C4F] text-[#1F2B3A] text-xs font-semibold uppercase tracking-wider hover:bg-[#C29668] transition-colors cursor-pointer whitespace-nowrap shadow-md"
            >
              Experience the Ritual →
            </button>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. BUSINESS-SPECIFIC INFORMATION (id="visiting-tips") WITH STAGGER REVEAL  */}
      {/* ========================================================================= */}
      <section id="visiting-tips" className="w-full py-20 sm:py-28 max-w-7xl mx-auto px-6 space-y-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          className="space-y-4 max-w-3xl"
        >
          <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#A87C4F] font-semibold">
            <span>Chapter 07</span>
            <span>·</span>
            <span>Popular Times & Boulevard Logistics</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl text-[#1F2B3A] tracking-tight">
            Peak Hours & Visiting Guide
          </h2>
          <p className="text-base text-[#1F2B3A]/80 leading-relaxed">
            MM Alam Road experiences significant traffic during afternoon tea and dinner rushes. Use our live historical density schedule to plan an unhurried, serene visit.
          </p>
        </motion.div>

        {/* Boulevard Context Photographic Banner */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={scaleImageVariant}
          className="relative h-64 sm:h-80 w-full overflow-hidden border border-[#1F2B3A]/15 shadow-md"
        >
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1800&q=80"
            alt="MM Alam Road Boulevard Atelier"
            className="w-full h-full object-cover filter brightness-[0.88] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F2B3A]/90 via-[#1F2B3A]/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1 text-[#EDE6DC]">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C29668]">
                Boulevard Valet & Parking
              </span>
              <h3 className="font-serif text-2xl text-[#EDE6DC]">
                Opposite Butlers Chocolate Cafe
              </h3>
              <p className="text-xs text-[#EDE6DC]/80 max-w-xl">
                Dedicated valet parking is stationed directly outside our main entrance. Hand your keys to our bonded attendant and enter the atelier without boulevard delay.
              </p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Paragon+Salon+59-B-3+MM+Alam+Road+Gulberg+III+Lahore"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 bg-[#EDE6DC] text-[#1F2B3A] text-xs font-semibold uppercase tracking-wider hover:bg-[#A87C4F] hover:text-[#EDE6DC] transition-colors whitespace-nowrap self-start sm:self-auto shadow-sm"
            >
              Get Exact Directions on Google Maps ↗
            </a>
          </div>
        </motion.div>

        {/* Day Selector & Peak Hours Grid */}
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2 hairline-border-b pb-4">
            {PEAK_HOURS_DATA.map((dayData, idx) => (
              <button
                key={dayData.dayName}
                onClick={() => setSelectedDayIndex(idx)}
                className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                  selectedDayIndex === idx
                    ? 'bg-[#1F2B3A] text-[#EDE6DC]'
                    : 'bg-[#F7F3ED] text-[#1F2B3A]/70 border border-[#1F2B3A]/10 hover:bg-[#EDE6DC]'
                }`}
              >
                {dayData.dayName}
              </button>
            ))}
          </div>

          <motion.div
            key={selectedDayIndex}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {PEAK_HOURS_DATA[selectedDayIndex].hours.map((hourSlot) => (
              <motion.div
                key={hourSlot.hourLabel}
                variants={cardVariant}
                className="bg-[#F7F3ED] border border-[#1F2B3A]/10 p-6 space-y-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg text-[#1F2B3A] font-semibold">
                    {hourSlot.hourLabel}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 uppercase tracking-wider ${
                      hourSlot.trafficLevel === 'quiet'
                        ? 'bg-emerald-100 text-emerald-800'
                        : hourSlot.trafficLevel === 'moderate'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {hourSlot.trafficLevel}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono text-[#1F2B3A]/60">
                    <span>Chair Density:</span>
                    <span>{hourSlot.occupancyPercent}%</span>
                  </div>
                  <div className="w-full bg-[#EDE6DC] h-1.5 overflow-hidden">
                    <div
                      className={`h-full ${
                        hourSlot.occupancyPercent > 80
                          ? 'bg-[#A87C4F]'
                          : hourSlot.occupancyPercent > 50
                          ? 'bg-[#1F2B3A]'
                          : 'bg-emerald-600'
                      }`}
                      style={{ width: `${hourSlot.occupancyPercent}%` }}
                    />
                  </div>
                </div>

                <p className="text-xs text-[#1F2B3A]/75 leading-relaxed pt-2 border-t border-[#1F2B3A]/10">
                  {hourSlot.tip}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. LOCATION & CONTACT (id="contact") WITH BOOKING FORM & STUDIO IMAGERY   */}
      {/* ========================================================================= */}
      <section id="contact" className="w-full py-20 sm:py-28 bg-[#EDE6DC] border-t border-[#1F2B3A]/10">
        <div className="max-w-7xl mx-auto px-6 space-y-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={fadeInUp}
            className="space-y-4 max-w-3xl"
          >
            <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#A87C4F] font-semibold">
              <span>Chapter 08</span>
              <span>·</span>
              <span>Direct Concierge & Reservations</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl text-[#1F2B3A] tracking-tight">
              Reserve Your Chair
            </h2>
            <p className="text-base text-[#1F2B3A]/80 leading-relaxed">
              Book your preferred artist and appointment slot on MM Alam Road without advance card fees, or message our WhatsApp concierge directly for immediate coordination.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          >
            {/* Left: Interactive Booking Form */}
            <motion.div variants={cardVariant} className="lg:col-span-7 bg-[#F7F3ED] border border-[#1F2B3A]/10 p-8 sm:p-10 space-y-6 shadow-sm">
              {bookingConfirmed ? (
                <div className="p-8 bg-[#1F2B3A] text-[#EDE6DC] space-y-6 animate-fade-in text-center">
                  <div className="inline-block p-3 rounded-full bg-[#A87C4F]/20 text-[#A87C4F] text-2xl">
                    ✓
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#A87C4F]">
                      Reservation Request Received
                    </span>
                    <h3 className="font-serif text-3xl text-[#EDE6DC]">
                      Reference ID: {referenceId}
                    </h3>
                    <p className="text-xs text-[#EDE6DC]/75 max-w-md mx-auto leading-relaxed">
                      Thank you, {formData.name || 'Patron'}. Your chair request for {serviceName} with {artistName} on {formData.date} at {formData.time} is registered in our MM Alam system.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#EDE6DC]/10 flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href={`https://wa.me/${SALON_INFO.whatsappRaw}?text=${prefilledWhatsAppText}%0A• Ref ID: ${referenceId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3 bg-[#A87C4F] text-[#1F2B3A] text-xs font-semibold uppercase tracking-wider hover:bg-[#C29668] transition-colors"
                    >
                      Instant WhatsApp Confirmation →
                    </a>
                    <button
                      onClick={() => setBookingConfirmed(false)}
                      className="px-6 py-3 border border-[#EDE6DC]/30 text-[#EDE6DC] text-xs uppercase tracking-wider hover:bg-[#EDE6DC]/10 transition-colors"
                    >
                      New Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl text-[#1F2B3A]">
                      Chair Reservation Form
                    </h3>
                    <p className="text-xs text-[#1F2B3A]/60 font-mono mt-1">
                      No advance payment required. Generates official reference ID.
                    </p>
                  </div>

                  {/* Service Selection */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#1F2B3A]/70 block">
                      Select Service:
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full p-3 text-sm bg-[#EDE6DC] border border-[#1F2B3A]/20 focus:border-[#A87C4F] outline-none text-[#1F2B3A]"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} — PKR {s.pricePKR.toLocaleString()} ({s.durationMin} mins)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Artist Selection */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#1F2B3A]/70 block">
                      Preferred Senior Artist:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, artist: 'no-pref' })}
                        className={`p-2.5 text-xs font-mono text-center border cursor-pointer ${
                          formData.artist === 'no-pref'
                            ? 'bg-[#1F2B3A] text-[#EDE6DC] border-[#1F2B3A]'
                            : 'bg-[#EDE6DC] text-[#1F2B3A] border-[#1F2B3A]/15 hover:border-[#A87C4F]'
                        }`}
                      >
                        Any Master
                      </button>
                      {ARTISTS.map((artist) => (
                        <button
                          key={artist.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, artist: artist.id })}
                          className={`p-2.5 text-xs font-mono text-center border cursor-pointer ${
                            formData.artist === artist.id
                              ? 'bg-[#1F2B3A] text-[#EDE6DC] border-[#1F2B3A]'
                              : 'bg-[#EDE6DC] text-[#1F2B3A] border-[#1F2B3A]/15 hover:border-[#A87C4F]'
                          }`}
                        >
                          {artist.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-[#1F2B3A]/70 block">
                        Preferred Date:
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full p-3 text-sm bg-[#EDE6DC] border border-[#1F2B3A]/20 focus:border-[#A87C4F] outline-none text-[#1F2B3A]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-[#1F2B3A]/70 block">
                        Preferred Time (11 AM – 9 PM):
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full p-3 text-sm bg-[#EDE6DC] border border-[#1F2B3A]/20 focus:border-[#A87C4F] outline-none text-[#1F2B3A]"
                      >
                        {['11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'].map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-[#1F2B3A]/70 block">
                        Full Name:
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Daniyal Farooq"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-3 text-sm bg-[#EDE6DC] border border-[#1F2B3A]/20 focus:border-[#A87C4F] outline-none text-[#1F2B3A]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-[#1F2B3A]/70 block">
                        Phone / WhatsApp:
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+92 300 0000000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full p-3 text-sm bg-[#EDE6DC] border border-[#1F2B3A]/20 focus:border-[#A87C4F] outline-none text-[#1F2B3A]"
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-[#1F2B3A]/70 block">
                      Specific Notes / Hair History:
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Sensitive skin, skin fade maintenance, wedding event preparation"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full p-3 text-sm bg-[#EDE6DC] border border-[#1F2B3A]/20 focus:border-[#A87C4F] outline-none text-[#1F2B3A]"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      className="flex-1 py-4 bg-[#1F2B3A] text-[#EDE6DC] hover:bg-[#A87C4F] transition-colors text-xs font-semibold uppercase tracking-widest cursor-pointer shadow-md"
                    >
                      Submit Reservation Request →
                    </button>

                    <a
                      href={`https://wa.me/${SALON_INFO.whatsappRaw}?text=${prefilledWhatsAppText}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-4 bg-[#A87C4F] text-[#1F2B3A] text-xs font-semibold uppercase tracking-wider hover:bg-[#C29668] transition-colors flex items-center justify-center gap-2"
                    >
                      <span>WhatsApp Directly</span>
                    </a>
                  </div>
                </form>
              )}
            </motion.div>

            {/* Right: Atelier Location & Contact Info */}
            <motion.div variants={cardVariant} className="lg:col-span-5 space-y-6">
              <div className="bg-[#1F2B3A] text-[#EDE6DC] p-8 space-y-6 shadow-xl relative overflow-hidden">
                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#A87C4F]">
                    MM Alam Location
                  </span>
                  <h3 className="font-serif text-2xl text-[#EDE6DC]">
                    Paragon Salon Gulberg
                  </h3>
                  <p className="text-xs text-[#EDE6DC]/70 font-mono">
                    59-B-3, MM Alam Road, Gulberg III, Lahore
                  </p>
                </div>

                <div className="space-y-3 text-xs text-[#EDE6DC]/85">
                  <div className="flex items-start gap-2">
                    <span className="text-[#A87C4F] font-bold">📍</span>
                    <span>Directly opposite Butlers Chocolate Cafe, between Hussain Chowk & Mini Market.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#A87C4F] font-bold">📞</span>
                    <span>
                      Telephone:{' '}
                      <a
                        href={`tel:${SALON_INFO.phoneRaw}`}
                        className="text-[#EDE6DC] font-semibold underline decoration-[#A87C4F] hover:text-[#A87C4F] transition-colors"
                      >
                        {SALON_INFO.phone} (Tap to Call)
                      </a>
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#A87C4F] font-bold">💬</span>
                    <span>
                      WhatsApp Concierge:{' '}
                      <a
                        href={`https://wa.me/${SALON_INFO.whatsappRaw}?text=${encodeURIComponent(SALON_INFO.whatsappDefaultMessage)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#C29668] font-semibold underline decoration-[#C29668] hover:text-[#EDE6DC] transition-colors"
                      >
                        +92 42 32294007 (Open Chat)
                      </a>
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#A87C4F] font-bold">⏰</span>
                    <span>{SALON_INFO.hours} (Open Now)</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EDE6DC]/10">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Paragon+Salon+59-B-3+MM+Alam+Road+Gulberg+III+Lahore"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center py-3 bg-[#EDE6DC] text-[#1F2B3A] text-xs font-semibold uppercase tracking-wider hover:bg-[#A87C4F] hover:text-[#EDE6DC] transition-colors shadow-sm"
                  >
                    Open Exact Location on Google Maps ↗
                  </a>
                </div>
              </div>

              {/* Map Mock Graphic / Landmark Pin */}
              <div className="p-6 bg-[#F7F3ED] border border-[#1F2B3A]/10 space-y-3 shadow-sm">
                <span className="text-[10px] font-mono text-[#A87C4F] uppercase tracking-wider font-semibold">
                  Boulevard Landmark Pin
                </span>
                <div className="relative h-44 bg-[#DFD6C9] border border-[#1F2B3A]/10 overflow-hidden flex items-center justify-center">
                  {/* Stylized Minimal Vector Map */}
                  <svg className="w-full h-full opacity-70" viewBox="0 0 400 200">
                    <rect width="400" height="200" fill="#E8E1D5" />
                    {/* MM Alam Road Line */}
                    <line x1="0" y1="100" x2="400" y2="100" stroke="#1F2B3A" strokeWidth="16" />
                    <line x1="0" y1="100" x2="400" y2="100" stroke="#EDE6DC" strokeWidth="2" strokeDasharray="8 8" />
                    {/* Side Streets */}
                    <line x1="120" y1="0" x2="120" y2="200" stroke="#D3C7B5" strokeWidth="8" />
                    <line x1="280" y1="0" x2="280" y2="200" stroke="#D3C7B5" strokeWidth="8" />
                    
                    {/* Butlers Landmark */}
                    <rect x="200" y="30" width="110" height="40" fill="#3D2B1F" />
                    <text x="255" y="55" fill="#EDE6DC" fontSize="9" fontFamily="sans-serif" textAnchor="middle">
                      Butlers Chocolate Cafe
                    </text>

                    {/* Paragon Salon Landmark */}
                    <rect x="190" y="130" width="130" height="45" fill="#1F2B3A" />
                    <text x="255" y="152" fill="#A87C4F" fontSize="10" fontFamily="sans-serif" fontWeight="bold" textAnchor="middle">
                      PARAGON SALON
                    </text>
                    <text x="255" y="165" fill="#EDE6DC" fontSize="8" fontFamily="sans-serif" textAnchor="middle">
                      59-B-3 MM Alam Rd
                    </text>

                    {/* Pin Marker */}
                    <circle cx="255" cy="125" r="5" fill="#A87C4F" />
                  </svg>

                  <div className="absolute bottom-2 right-2 bg-[#1F2B3A]/90 text-[#EDE6DC] text-[9px] font-mono px-2 py-0.5">
                    Opposite Butlers
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. FINAL CTA (id="cta") WITH ATMOSPHERIC PHOTOGRAPHIC BACKGROUND         */}
      {/* ========================================================================= */}
      <section id="cta" className="relative w-full py-24 sm:py-36 bg-[#141D27] text-[#EDE6DC] overflow-hidden border-t border-[#A87C4F]/40">
        {/* Full-bleed Salon Architectural Visual Background */}
        <div className="absolute inset-0 z-0 opacity-35 overflow-hidden pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=2400&q=85"
            alt="Paragon Salon Atelier Floor"
            className="w-full h-full object-cover filter brightness-75 contrast-125 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141D27] via-[#141D27]/80 to-[#141D27]/90" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={fadeInUp}
          className="relative z-10 max-w-5xl mx-auto px-6 text-center space-y-8"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#C29668] bg-[#1F2B3A]/90 px-4 py-1.5 border border-[#A87C4F]/40 backdrop-blur-sm">
            <span>59-B-3 MM Alam Road · Gulberg III, Lahore</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#EDE6DC] tracking-tight leading-[1.05] text-balance">
            Your Chair is Waiting on MM Alam Road.
          </h2>

          <p className="font-serif text-xl sm:text-2xl text-[#EDE6DC]/85 italic font-light max-w-2xl mx-auto leading-relaxed">
            Experience unhurried craft, deliberate precision, and the true standard of Lahore grooming.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onScrollToSection('contact')}
              className="px-10 py-5 bg-[#A87C4F] text-[#141D27] hover:bg-[#C29668] transition-all duration-200 text-xs font-bold tracking-widest uppercase cursor-pointer shadow-2xl hover:scale-105"
            >
              Reserve an Appointment
            </button>

            <a
              href={`https://wa.me/${SALON_INFO.whatsappRaw}?text=${encodeURIComponent(
                'Hi, I would like to schedule a visit to Paragon Salon Gulberg.'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-5 bg-[#1F2B3A]/90 text-[#EDE6DC] border border-[#EDE6DC]/30 hover:bg-[#EDE6DC] hover:text-[#141D27] transition-all duration-200 text-xs font-semibold tracking-widest uppercase flex items-center gap-2 backdrop-blur-sm"
            >
              <span>WhatsApp Directly</span>
              <span className="text-xs">→</span>
            </a>
          </div>

          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-[#EDE6DC]/60 border-t border-[#EDE6DC]/10 max-w-xl mx-auto">
            <span>Open Daily 11:00 AM – 9:00 PM</span>
            <span>·</span>
            <span>Opposite Butlers Chocolate Cafe</span>
            <span>·</span>
            <a
              href={`tel:${SALON_INFO.phoneRaw}`}
              className="text-[#C29668] hover:underline"
            >
              📞 +92 42 32294007 (Call Now)
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
