import React from 'react';
import { PageId } from '../types';
import { SERVICES, NAIL_CARE_STEPS } from '../data/salonData';
import { EditorialVisual } from '../components/EditorialVisual';

interface NailStudioPageProps {
  onNavigate: (page: PageId, extraParams?: { artistId?: string; serviceId?: string }) => void;
}

export const NailStudioPage: React.FC<NailStudioPageProps> = ({ onNavigate }) => {
  const nailServices = SERVICES.filter((s) => s.category === 'nails');

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 space-y-20">
      {/* 1. Page Header */}
      <div className="space-y-4 max-w-4xl">
        <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#A87C4F] font-semibold">
          <span>Chapter 05</span>
          <span>·</span>
          <span>Nail & Hand Atelier</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#1F2B3A] tracking-tight text-balance">
          Nail & Hand Studio
        </h1>
        <p className="text-base sm:text-lg text-[#1F2B3A]/80 leading-relaxed max-w-3xl">
          A dedicated private sanctuary within Paragon Salon. Directed by Nail Specialist Jiya, celebrated across Lahore for detail-oriented cuticle refinement and hygienic discipline.
        </p>
      </div>

      {/* 2. Visual Anchor & Hygiene Protocol */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7">
          <EditorialVisual
            type="nail-studio"
            aspect="16:9"
            title="The Natural Nail & Cuticle Restoration"
            subtitle="Specialist Jiya · Nail & Hand Studio"
          />
        </div>
        <div className="lg:col-span-5 space-y-4">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#A87C4F] font-semibold">
            Clinical Rigor Meets Restoration
          </span>
          <h2 className="font-serif text-3xl text-[#1F2B3A] leading-snug">
            Why Lahore patrons choose Jiya’s chair.
          </h2>
          <p className="text-xs sm:text-sm text-[#1F2B3A]/80 leading-relaxed">
            Many salons treat manicures as an afterthought, using harsh metal scrapers and rushed cutting that causes hangnails and irritation. Jiya uses micro-gentle Japanese cuticle softeners, individual sealed tool pouches, and therapeutic acupressure that relaxes hands taxed by daily typing and driving.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('reserve', { artistId: 'jiya' })}
              className="px-6 py-3 bg-[#1F2B3A] text-[#EDE6DC] hover:bg-[#A87C4F] transition-colors text-xs font-semibold uppercase tracking-widest cursor-pointer"
            >
              Book With Specialist Jiya
            </button>
          </div>
        </div>
      </div>

      {/* 3. Before & After Care Transformation Framework */}
      <section className="bg-[#F7F3ED] border border-[#1F2B3A]/10 p-8 sm:p-12 space-y-8">
        <div className="max-w-2xl">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#A87C4F] font-semibold">
            The Restoration Sequence
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#1F2B3A] tracking-tight mt-1">
            The Hand & Foot Care Protocol
          </h3>
          <p className="text-xs text-[#1F2B3A]/70 mt-1">
            Every session proceeds through four gentle, restorative movements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {NAIL_CARE_STEPS.map((step) => (
            <div key={step.step} className="bg-[#EDE6DC]/80 p-5 space-y-3 border border-[#1F2B3A]/10">
              <span className="font-serif text-2xl text-[#A87C4F]">{step.step}</span>
              <h4 className="font-serif text-base text-[#1F2B3A] font-semibold">{step.title}</h4>
              <p className="text-xs text-[#1F2B3A]/75 leading-relaxed">{step.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Nail Studio Menu */}
      <section className="space-y-8 hairline-border-t pt-12">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#A87C4F] font-semibold">
            Studio Services & Pricing
          </span>
          <h2 className="font-serif text-3xl text-[#1F2B3A] mt-1">
            Hand Grooming & Foot Therapy
          </h2>
        </div>

        <div className="divide-y divide-[#1F2B3A]/10">
          {nailServices.map((service) => (
            <div
              key={service.id}
              className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start hover:bg-[#F7F3ED]/40 transition-colors px-4 -mx-4"
            >
              <div className="lg:col-span-4 space-y-1">
                <h3 className="font-serif text-xl sm:text-2xl text-[#1F2B3A]">
                  {service.name}
                </h3>
                <div className="text-xs text-[#1F2B3A]/60 font-mono">
                  {service.durationMin} Minutes · Specialist Jiya
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
                  onClick={() => onNavigate('reserve', { serviceId: service.id, artistId: 'jiya' })}
                  className="px-5 py-2.5 bg-[#1F2B3A] text-[#EDE6DC] hover:bg-[#A87C4F] transition-colors text-xs font-semibold uppercase tracking-wider cursor-pointer whitespace-nowrap"
                >
                  Reserve with Jiya
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
