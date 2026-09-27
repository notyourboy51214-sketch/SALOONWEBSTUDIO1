import React from 'react';
import { PageId } from '../types';
import { SERVICES, GROOMING_STEPS } from '../data/salonData';
import { EditorialVisual } from '../components/EditorialVisual';

interface GroomingRoomPageProps {
  onNavigate: (page: PageId, extraParams?: { artistId?: string; serviceId?: string }) => void;
}

export const GroomingRoomPage: React.FC<GroomingRoomPageProps> = ({ onNavigate }) => {
  const groomingServices = SERVICES.filter(
    (s) => s.category === 'grooming' || s.category === 'package'
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 space-y-20">
      {/* 1. Header */}
      <div className="space-y-4 max-w-4xl">
        <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#A87C4F] font-semibold">
          <span>Chapter 04</span>
          <span>·</span>
          <span>The Shave & Beard Sanctum</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#1F2B3A] tracking-tight text-balance">
          The Grooming Room
        </h1>
        <p className="text-base sm:text-lg text-[#1F2B3A]/80 leading-relaxed max-w-3xl">
          Where traditional straight-razor discipline meets contemporary facial geometry. Spearheaded by Senior Artist Rohit on MM Alam Road.
        </p>
      </div>

      {/* 2. Visual Anchor & Craft Highlight */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7">
          <EditorialVisual
            type="grooming-ritual"
            aspect="16:9"
            title="The Straight Razor & Steamed Linen Ritual"
            subtitle="The Grooming Room · Gulberg III"
          />
        </div>
        <div className="lg:col-span-5 space-y-4">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#A87C4F] font-semibold">
            The Senior Artist Standard
          </span>
          <h2 className="font-serif text-3xl text-[#1F2B3A] leading-snug">
            Razor precision that honors skin integrity.
          </h2>
          <p className="text-xs sm:text-sm text-[#1F2B3A]/80 leading-relaxed">
            A hurried beard trim leaves razor bumps, dry flaking skin, and uneven sideburn lines. In The Grooming Room, every stroke is lubricated by cold-pressed sandalwood oils and calmed by authentic Lahore rosewater.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('reserve', { artistId: 'rohit' })}
              className="px-6 py-3 bg-[#1F2B3A] text-[#EDE6DC] hover:bg-[#A87C4F] transition-colors text-xs font-semibold uppercase tracking-widest cursor-pointer"
            >
              Book With Rohit (Senior Artist)
            </button>
          </div>
        </div>
      </div>

      {/* 3. The 5-Step Anatomy of a Signature Grooming Session */}
      <section className="space-y-8 hairline-border-t pt-12">
        <div className="max-w-2xl">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#A87C4F] font-semibold">
            Procedural Rigor
          </span>
          <h2 className="font-serif text-3xl text-[#1F2B3A] mt-1">
            Anatomy of the Grooming Ritual
          </h2>
          <p className="text-xs text-[#1F2B3A]/70 mt-1">
            Step-by-step methodology practiced at our chairs every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {GROOMING_STEPS.map((step) => (
            <div
              key={step.step}
              className="bg-[#F7F3ED] border border-[#1F2B3A]/10 p-6 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-serif text-3xl text-[#A87C4F]">{step.step}</span>
                  <span className="text-[10px] font-mono text-[#1F2B3A]/50">{step.duration}</span>
                </div>
                <h3 className="font-serif text-base text-[#1F2B3A] mt-3 font-semibold leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs text-[#1F2B3A]/70 mt-2 leading-relaxed">
                  {step.detail}
                </p>
              </div>
              <div className="h-0.5 w-8 bg-[#A87C4F]/40" />
            </div>
          ))}
        </div>
      </section>

      {/* 4. Grooming Room Services & Master Packages (Editorial Menu Presentation) */}
      <section className="space-y-8 hairline-border-t pt-12">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#A87C4F] font-semibold">
            Curated Services & Packages
          </span>
          <h2 className="font-serif text-3xl text-[#1F2B3A] mt-1">
            Beard Sculpting, Shaves & Full Grooming
          </h2>
          <p className="text-xs text-[#1F2B3A]/70 mt-1">
            Repeatedly reviewed by Lahore patrons for detail-oriented execution and refreshing botanical care.
          </p>
        </div>

        <div className="divide-y divide-[#1F2B3A]/10">
          {groomingServices.map((service) => (
            <div
              key={service.id}
              className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start hover:bg-[#F7F3ED]/40 transition-colors px-4 -mx-4"
            >
              <div className="lg:col-span-4 space-y-1">
                <div className="flex items-center gap-2">
                  {service.category === 'package' && (
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#A87C4F] font-semibold">
                      Signature Package ·
                    </span>
                  )}
                  <h3 className="font-serif text-xl sm:text-2xl text-[#1F2B3A]">
                    {service.name}
                  </h3>
                </div>
                <div className="text-xs text-[#1F2B3A]/60 font-mono">
                  {service.durationMin} Minutes Ritual
                </div>
              </div>

              <div className="lg:col-span-5 space-y-3">
                <p className="text-xs sm:text-sm text-[#1F2B3A]/80 leading-relaxed">
                  {service.description}
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

              <div className="lg:col-span-3 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 pt-2 sm:pt-0">
                <span className="font-serif text-2xl text-[#1F2B3A] font-semibold tabular-nums">
                  PKR {service.pricePKR.toLocaleString()}
                </span>
                <button
                  onClick={() => onNavigate('reserve', { serviceId: service.id, artistId: 'rohit' })}
                  className="px-5 py-2.5 bg-[#1F2B3A] text-[#EDE6DC] hover:bg-[#A87C4F] transition-colors text-xs font-semibold uppercase tracking-wider cursor-pointer whitespace-nowrap"
                >
                  Reserve Session
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
