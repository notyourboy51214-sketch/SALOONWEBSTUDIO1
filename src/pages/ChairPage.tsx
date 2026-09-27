import React, { useState } from 'react';
import { PageId } from '../types';
import { SERVICES, ARTISTS } from '../data/salonData';
import { HorizontalScrollShowcase } from '../components/HorizontalScrollShowcase';
import { EditorialVisual } from '../components/EditorialVisual';

interface ChairPageProps {
  onNavigate: (page: PageId, extraParams?: { artistId?: string; serviceId?: string }) => void;
}

export const ChairPage: React.FC<ChairPageProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<'all' | 'men' | 'treatment'>('all');

  const hairServices = SERVICES.filter(
    (s) => s.category === 'hair-men' || s.category === 'hair-women'
  );

  const filteredServices = hairServices.filter((s) => {
    if (filter === 'all') return true;
    if (filter === 'men') return s.id.includes('cut') || s.id.includes('fade');
    if (filter === 'treatment') return s.id.includes('scalp') || s.id.includes('blowdry');
    return true;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 space-y-20">
      {/* 1. Header */}
      <div className="space-y-4 max-w-4xl">
        <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#A87C4F] font-semibold">
          <span>Chapter 03</span>
          <span>·</span>
          <span>Hair Architecture</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#1F2B3A] tracking-tight text-balance">
          The Chair: Hair & Scalp Services
        </h1>
        <p className="text-base sm:text-lg text-[#1F2B3A]/80 leading-relaxed max-w-3xl">
          From tailored scissor craft by Adeel to surgical skin gradients by Rohit. Every service begins with a bone structure evaluation and finishes with refined matte texture.
        </p>
      </div>

      {/* 2. Horizontal-Scroll Showcase of Signature Hair Cuts */}
      <section className="w-full">
        <HorizontalScrollShowcase
          subtitle="Lookbook Showcase"
          title="Curated Haircut Silhouettes"
          countLabel="04 Signature Cuts"
        >
          {hairServices.map((service, idx) => (
            <div
              key={service.id}
              className="scroll-snap-card shrink-0 w-[300px] sm:w-[350px] bg-[#F7F3ED] border border-[#1F2B3A]/10 p-5 flex flex-col justify-between"
            >
              <div>
                <EditorialVisual
                  type={idx % 2 === 0 ? 'transformation-exec' : 'transformation-fade'}
                  title={service.name}
                  subtitle={`${service.durationMin} Mins · PKR ${service.pricePKR.toLocaleString()}`}
                  aspect="4:3"
                />
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono text-[#A87C4F] font-semibold">
                      PKR {service.pricePKR.toLocaleString()}
                    </span>
                    <span className="text-[#1F2B3A]/60 font-mono">{service.durationMin} MINS</span>
                  </div>
                  <h4 className="font-serif text-lg text-[#1F2B3A]">{service.name}</h4>
                  <p className="text-xs text-[#1F2B3A]/70 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="hairline-border-t pt-4 mt-6 flex items-center justify-between">
                <span className="text-[11px] text-[#1F2B3A]/60">
                  {service.recommendedArtist ? `Artist: ${service.recommendedArtist === 'adeel' ? 'Adeel' : 'Rohit'}` : 'Any Senior Artist'}
                </span>
                <button
                  onClick={() => onNavigate('reserve', { serviceId: service.id, artistId: service.recommendedArtist })}
                  className="text-xs font-semibold uppercase tracking-wider text-[#1F2B3A] hover:text-[#A87C4F] cursor-pointer"
                >
                  Book Service →
                </button>
              </div>
            </div>
          ))}
        </HorizontalScrollShowcase>
      </section>

      {/* 3. Pricing Menu Presentation (Editorial List, Not Symmetrical Boxes) */}
      <section className="space-y-8 hairline-border-t pt-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#A87C4F] font-semibold">
              Comprehensive Hair Menu
            </span>
            <h2 className="font-serif text-3xl text-[#1F2B3A] mt-1">
              Service Directory & Pricing
            </h2>
          </div>

          {/* Interactive Filter Controls */}
          <div className="flex items-center gap-2 p-1 bg-[#E2D9CD]/60 border border-[#1F2B3A]/10 self-start sm:self-auto">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                filter === 'all' ? 'bg-[#1F2B3A] text-[#EDE6DC]' : 'text-[#1F2B3A]/70 hover:text-[#1F2B3A]'
              }`}
            >
              All Hair Services
            </button>
            <button
              onClick={() => setFilter('men')}
              className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                filter === 'men' ? 'bg-[#1F2B3A] text-[#EDE6DC]' : 'text-[#1F2B3A]/70 hover:text-[#1F2B3A]'
              }`}
            >
              Cuts & Fades
            </button>
            <button
              onClick={() => setFilter('treatment')}
              className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                filter === 'treatment' ? 'bg-[#1F2B3A] text-[#EDE6DC]' : 'text-[#1F2B3A]/70 hover:text-[#1F2B3A]'
              }`}
            >
              Scalp & Styling
            </button>
          </div>
        </div>

        {/* Editorial Pricing Line Items */}
        <div className="divide-y divide-[#1F2B3A]/10">
          {filteredServices.map((service) => {
            const recommended = ARTISTS.find((a) => a.id === service.recommendedArtist);
            return (
              <div
                key={service.id}
                className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start hover:bg-[#F7F3ED]/40 transition-colors px-4 -mx-4"
              >
                {/* Name & Duration */}
                <div className="lg:col-span-4 space-y-1">
                  <h3 className="font-serif text-xl sm:text-2xl text-[#1F2B3A]">
                    {service.name}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-[#1F2B3A]/60 font-mono">
                    <span>{service.durationMin} Minutes</span>
                    {recommended && (
                      <>
                        <span>·</span>
                        <span className="text-[#A87C4F]">Recommended: {recommended.name}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Description & Included Features */}
                <div className="lg:col-span-5 space-y-3">
                  <p className="text-xs sm:text-sm text-[#1F2B3A]/80 leading-relaxed">
                    {service.description}
                  </p>
                  <p className="text-xs text-[#A87C4F] italic font-serif">
                    Ideal for: {service.idealFor}
                  </p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[#1F2B3A]/60 font-mono">
                    {service.features.map((feat, i) => (
                      <span key={i} className="flex items-center gap-1.5">
                        <span className="text-[#A87C4F]">✓</span>
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price & Action */}
                <div className="lg:col-span-3 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 pt-2 sm:pt-0">
                  <span className="font-serif text-2xl text-[#1F2B3A] font-semibold tabular-nums">
                    PKR {service.pricePKR.toLocaleString()}
                  </span>
                  <button
                    onClick={() => onNavigate('reserve', { serviceId: service.id, artistId: service.recommendedArtist })}
                    className="px-5 py-2.5 bg-[#1F2B3A] text-[#EDE6DC] hover:bg-[#A87C4F] transition-colors text-xs font-semibold uppercase tracking-wider cursor-pointer whitespace-nowrap"
                  >
                    Reserve Chair
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. The Consultation Protocol Banner */}
      <div className="bg-[#1F2B3A] text-[#EDE6DC] p-8 sm:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8 space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#A87C4F] font-semibold">
            The Consultation Protocol
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#EDE6DC]">
            Unsure which scissor technique suits your profile?
          </h3>
          <p className="text-xs sm:text-sm text-[#EDE6DC]/75 leading-relaxed">
            Our artists provide a complimentary 10-minute cranial mapping prior to washing. We discuss crown whorls, parting habits, and daily grooming maintenance.
          </p>
        </div>
        <div className="md:col-span-4 flex justify-start md:justify-end">
          <button
            onClick={() => onNavigate('reserve')}
            className="px-6 py-3.5 bg-[#A87C4F] text-[#EDE6DC] hover:bg-[#A87C4F]/90 transition-colors text-xs font-semibold uppercase tracking-widest cursor-pointer"
          >
            Book Free Consultation
          </button>
        </div>
      </div>
    </div>
  );
};
