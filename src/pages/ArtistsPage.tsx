import React from 'react';
import { PageId } from '../types';
import { ARTISTS } from '../data/salonData';
import { EditorialVisual } from '../components/EditorialVisual';

interface ArtistsPageProps {
  onNavigate: (page: PageId, extraParams?: { artistId?: string; serviceId?: string }) => void;
}

export const ArtistsPage: React.FC<ArtistsPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 space-y-20">
      {/* 1. Page Header */}
      <div className="space-y-4 max-w-4xl">
        <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#A87C4F] font-semibold">
          <span>Chapter 02</span>
          <span>·</span>
          <span>The Craftsmen</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#1F2B3A] tracking-tight text-balance">
          The Senior Artists of Paragon
        </h1>
        <p className="text-base sm:text-lg text-[#1F2B3A]/80 leading-relaxed max-w-3xl">
          We do not employ revolving junior barbers. Every chair is commanded by dedicated artisans with over a decade of mastery in scissor architecture, skin fades, and clinical nail restoration.
        </p>
      </div>

      {/* 2. Direct Booking Advantage Notice */}
      <div className="bg-[#F7F3ED] border-l-2 border-[#A87C4F] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-lg text-[#1F2B3A]">Request Your Preferred Artist Directly</h3>
          <p className="text-xs text-[#1F2B3A]/70 mt-0.5">
            Loyal clients prefer their dedicated stylist. Choosing Adeel, Rohit, or Jiya locks their chair exclusively for your appointment time.
          </p>
        </div>
        <button
          onClick={() => onNavigate('reserve')}
          className="shrink-0 px-5 py-2.5 bg-[#1F2B3A] text-[#EDE6DC] text-xs font-semibold uppercase tracking-wider hover:bg-[#A87C4F] transition-colors cursor-pointer"
        >
          Book With Artist →
        </button>
      </div>

      {/* 3. Detailed Artist Profiles */}
      <div className="space-y-16">
        {ARTISTS.map((artist, index) => (
          <div
            key={artist.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start hairline-border-t pt-12"
          >
            {/* Left Column: Visual Canvas */}
            <div className="lg:col-span-5">
              <EditorialVisual
                type={
                  artist.id === 'adeel'
                    ? 'scissor-cut'
                    : artist.id === 'rohit'
                    ? 'grooming-ritual'
                    : 'nail-studio'
                }
                aspect="4:3"
                title={`${artist.name} · ${artist.role}`}
                subtitle={`MM Alam Atelier · ${artist.experienceYears} Years Experience`}
              />
              <div className="mt-4 p-4 bg-[#F7F3ED] border border-[#1F2B3A]/10 text-xs text-[#1F2B3A]/70 flex items-center justify-between">
                <span>Available Days:</span>
                <span className="font-mono text-[#1F2B3A] font-semibold">{artist.availableDays.join(', ')}</span>
              </div>
            </div>

            {/* Right Column: Bio, Philosophy & Specialties */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#A87C4F] font-semibold">
                    {artist.role}
                  </span>
                  <span className="text-[#1F2B3A]/30">·</span>
                  <span className="text-xs font-mono text-[#1F2B3A]/60">
                    {artist.experienceYears} Years Craft
                  </span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#1F2B3A] mt-1">
                  {artist.name}
                </h2>
                <p className="text-xs font-mono text-[#1F2B3A]/70 mt-0.5">
                  {artist.title}
                </p>
              </div>

              {/* Signature Philosophy Line */}
              <blockquote className="border-l-2 border-[#A87C4F] pl-4 py-1 italic font-serif text-base sm:text-lg text-[#1F2B3A]/90 bg-[#F7F3ED]/40">
                "{artist.signatureLine}"
              </blockquote>

              {/* Biography */}
              <p className="text-sm text-[#1F2B3A]/80 leading-relaxed">
                {artist.bio}
              </p>

              {/* Specialties Unboxed Tag List */}
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider text-[#A87C4F] font-semibold">
                  Core Mastery Areas
                </span>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#1F2B3A]/80 font-medium">
                  {artist.specialties.map((spec, i) => (
                    <span key={i} className="flex items-center gap-2">
                      <span>{spec}</span>
                      {i < artist.specialties.length - 1 && <span className="text-[#A87C4F]">·</span>}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('reserve', { artistId: artist.id })}
                  className="px-6 py-3 bg-[#1F2B3A] text-[#EDE6DC] hover:bg-[#A87C4F] transition-colors text-xs font-semibold uppercase tracking-widest cursor-pointer"
                >
                  Request {artist.name}'s Chair
                </button>
                <a
                  href={`https://wa.me/924232294007?text=Hi%2C%20I'd%20like%20to%20request%20an%20appointment%20with%20${encodeURIComponent(artist.name)}%20at%20Paragon%20Salon%20Gulberg`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-[#A87C4F] text-[#1F2B3A] hover:bg-[#A87C4F]/10 transition-colors text-xs font-semibold uppercase tracking-widest inline-flex items-center gap-2"
                >
                  <span>WhatsApp with {artist.name}</span>
                  <span className="text-[#A87C4F]">→</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
