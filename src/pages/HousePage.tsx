import React from 'react';
import { PageId } from '../types';
import { SALON_INFO } from '../data/salonData';
import { EditorialVisual } from '../components/EditorialVisual';

interface HousePageProps {
  onNavigate: (page: PageId) => void;
}

export const HousePage: React.FC<HousePageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 space-y-20">
      {/* 1. Chapter Header */}
      <div className="space-y-4 max-w-4xl">
        <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#A87C4F] font-semibold">
          <span>Chapter 01</span>
          <span>·</span>
          <span>The Atelier</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#1F2B3A] tracking-tight text-balance">
          The House on MM Alam Road
        </h1>
        <p className="text-base sm:text-lg text-[#1F2B3A]/80 leading-relaxed max-w-3xl">
          Situated at 59-B-3 MM Alam Road, opposite Butlers Chocolate Cafe, Paragon Salon Gulberg was conceived as a bright, serene antidote to the frantic pace of Lahore.
        </p>
      </div>

      {/* 2. Hero Visual of Interior Architecture */}
      <div className="w-full">
        <EditorialVisual
          type="interior"
          aspect="16:9"
          title="The Main Salon Floor · Natural Daylight & Warm Stone"
          subtitle="MM Alam Road, Gulberg III"
        />
      </div>

      {/* 3. The Story & Standing on MM Alam Road */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start hairline-border-t pt-12">
        <div className="lg:col-span-5 space-y-4">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#A87C4F] font-semibold">
            Our Origin & Philosophy
          </span>
          <h2 className="font-serif text-3xl text-[#1F2B3A] leading-snug">
            A sanctuary built for craft, not conveyor-belt volume.
          </h2>
          <p className="text-xs text-[#1F2B3A]/60 font-mono">
            4.7★ Rating · 400+ Verified Lahore Patrons
          </p>
        </div>

        <div className="lg:col-span-7 space-y-6 text-sm text-[#1F2B3A]/85 leading-relaxed">
          <p>
            MM Alam Road is the beating heart of Lahore’s retail and culinary prestige. Yet for years, discerning patrons faced a frustrating compromise: either dim, cramped barbershops running on noisy buzzers and hurried 10-minute turnarounds, or generic franchise parlors with little artistic continuity.
          </p>
          <p>
            Paragon was established to restore dignity, spatial comfort, and architectural precision to personal grooming. When you step through our glass entrance opposite Butlers Chocolate Cafe, the acoustic roar of the boulevard fades into soft ambient jazz and the sound of handcrafted Japanese shears.
          </p>
          <p>
            Our master chairs are spaced generously apart. Natural daylight illuminates every station so that hair tones and skin fades are seen in true daylight conditions—never distorted by unflattering fluorescent strips.
          </p>
        </div>
      </div>

      {/* 4. Three Non-Negotiable Standards (Review Sentiment Synthesis) */}
      <div className="bg-[#F7F3ED] border border-[#1F2B3A]/10 p-8 sm:p-12 space-y-8">
        <div className="max-w-2xl">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#A87C4F] font-semibold">
            The Paragon Standards
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#1F2B3A] tracking-tight mt-1">
            Built directly on real patron feedback.
          </h3>
          <p className="text-xs text-[#1F2B3A]/70 mt-2">
            Over 400 patrons have documented their experiences with us. These are the three vows that govern every chair in the house.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <span className="font-serif text-2xl text-[#A87C4F]">01</span>
            <h4 className="font-serif text-lg text-[#1F2B3A]">The Unhurried Consultation</h4>
            <p className="text-xs text-[#1F2B3A]/75 leading-relaxed">
              We never touch a shear or razor until your artist has analyzed your facial bone structure, hair growth direction, and work routine. You will never be rushed out the door.
            </p>
          </div>

          <div className="space-y-3">
            <span className="font-serif text-2xl text-[#A87C4F]">02</span>
            <h4 className="font-serif text-lg text-[#1F2B3A]">Cooperative, Respectful Staff</h4>
            <p className="text-xs text-[#1F2B3A]/75 leading-relaxed">
              Our hospitality team is trained to be genuinely helpful without intruding. Whether you wish to work quietly, enjoy fresh pour-over coffee, or converse about technique, we respect your space.
            </p>
          </div>

          <div className="space-y-3">
            <span className="font-serif text-2xl text-[#A87C4F]">03</span>
            <h4 className="font-serif text-lg text-[#1F2B3A]">Meticulous Hospital Cleanliness</h4>
            <p className="text-xs text-[#1F2B3A]/75 leading-relaxed">
              In both our main grooming room and Jiya’s Nail & Hand Studio, all steel clippers, tweezers, and shears undergo clinical sanitation cycles between every client. Fresh linen, always.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Physical Architecture & Location Pin */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hairline-border-t pt-12">
        <div className="lg:col-span-6">
          <EditorialVisual
            type="building-facade"
            aspect="4:3"
            title="59-B-3 MM Alam Road, Gulberg III"
            subtitle="Opposite Butlers Chocolate Cafe"
          />
        </div>

        <div className="lg:col-span-6 space-y-5">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#A87C4F] font-semibold">
            Visiting Details
          </span>
          <h3 className="font-serif text-3xl text-[#1F2B3A]">
            MM Alam Road Landmark & Arrival
          </h3>
          <p className="text-xs text-[#1F2B3A]/80 leading-relaxed">
            Located conveniently on 59-B-3, MM Alam Road, directly opposite Butlers Chocolate Cafe, between Hussain Chowk and Mini Market. 
          </p>

          <div className="space-y-2 text-xs font-mono text-[#1F2B3A]/80">
            <div className="flex justify-between py-1.5 hairline-border-b">
              <span>Operating Hours:</span>
              <span className="text-[#A87C4F] font-semibold">11:00 AM – 9:00 PM (Daily)</span>
            </div>
            <div className="flex justify-between py-1.5 hairline-border-b">
              <span>Valet Parking:</span>
              <span className="text-emerald-700 font-semibold">Complimentary at Entrance</span>
            </div>
            <div className="flex justify-between py-1.5 hairline-border-b">
              <span>Direct Concierge:</span>
              <span>{SALON_INFO.phone}</span>
            </div>
          </div>

          <div className="pt-2 flex gap-4">
            <button
              onClick={() => onNavigate('reserve')}
              className="px-6 py-3 bg-[#1F2B3A] text-[#EDE6DC] hover:bg-[#A87C4F] transition-colors text-xs font-semibold uppercase tracking-widest cursor-pointer"
            >
              Reserve Chair Now
            </button>
            <button
              onClick={() => onNavigate('artists')}
              className="px-6 py-3 border border-[#1F2B3A]/30 text-[#1F2B3A] hover:bg-[#1F2B3A]/5 transition-colors text-xs font-semibold uppercase tracking-widest cursor-pointer"
            >
              Meet The Artists →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
