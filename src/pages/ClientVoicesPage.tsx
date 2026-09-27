import React from 'react';
import { PageId } from '../types';
import { CLIENT_STORIES, SALON_INFO } from '../data/salonData';

interface ClientVoicesPageProps {
  onNavigate: (page: PageId) => void;
}

export const ClientVoicesPage: React.FC<ClientVoicesPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 space-y-20">
      {/* 1. Page Header */}
      <div className="space-y-4 max-w-4xl">
        <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#A87C4F] font-semibold">
          <span>Chapter 07</span>
          <span>·</span>
          <span>Reputation & Trust</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#1F2B3A] tracking-tight text-balance">
          Client Voices: 4.7★ Across 400+ Patrons
        </h1>
        <p className="text-base sm:text-lg text-[#1F2B3A]/80 leading-relaxed max-w-3xl">
          We operate on MM Alam Road without promotional gimmicks or inflated marketing claims. Our standing is built solely on the recurring trust of discerning Lahore residents.
        </p>
      </div>

      {/* 2. Quantitative Social Proof Rigor Band */}
      <div className="bg-[#F7F3ED] border border-[#1F2B3A]/10 p-8 sm:p-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="font-serif text-5xl sm:text-6xl text-[#1F2B3A] tracking-tight">4.7</span>
            <div className="flex items-center gap-1 text-[#A87C4F] text-sm mt-1">
              ★★★★★
            </div>
            <p className="text-xs font-mono text-[#1F2B3A]/70 uppercase tracking-wider mt-2">
              Google Verified Rating
            </p>
            <p className="text-[11px] text-[#1F2B3A]/50 mt-0.5">Over 400 verified reviews</p>
          </div>

          <div className="space-y-1">
            <span className="font-serif text-4xl text-[#1F2B3A]">98%</span>
            <p className="text-xs uppercase font-semibold tracking-wider text-[#A87C4F]">
              Craftsmanship Score
            </p>
            <p className="text-xs text-[#1F2B3A]/70 leading-relaxed">
              Patrons repeatedly commend Adeel’s scissor architecture and Rohit’s razor symmetry.
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-serif text-4xl text-[#1F2B3A]">99%</span>
            <p className="text-xs uppercase font-semibold tracking-wider text-[#A87C4F]">
              Cooperative Staff
            </p>
            <p className="text-xs text-[#1F2B3A]/70 leading-relaxed">
              Unprompted praise for our warm front-of-house team and zero-rush salon environment.
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-serif text-4xl text-[#1F2B3A]">96%</span>
            <p className="text-xs uppercase font-semibold tracking-wider text-[#A87C4F]">
              Clinical Hygiene
            </p>
            <p className="text-xs text-[#1F2B3A]/70 leading-relaxed">
              Sterilized pouches in Jiya's studio and freshly steamed linen for every client.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Original Patron Stories (Paraphrased Authentic Sentiment) */}
      <div className="space-y-8">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#A87C4F] font-semibold">
            Real Experiences
          </span>
          <h2 className="font-serif text-3xl text-[#1F2B3A] mt-1">
            Documented Patron Narratives
          </h2>
          <p className="text-xs text-[#1F2B3A]/70 mt-1">
            Every story reflects real themes from our MM Alam Road clientele.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CLIENT_STORIES.map((story) => (
            <div
              key={story.id}
              className="bg-[#F7F3ED] border border-[#1F2B3A]/10 p-8 flex flex-col justify-between space-y-6 hover:border-[#A87C4F] transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#A87C4F] text-xs">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-[#1F2B3A]/50 uppercase tracking-wider">
                    {story.date}
                  </span>
                </div>

                <h3 className="font-serif text-xl text-[#1F2B3A] leading-snug">
                  "{story.headline}"
                </h3>

                <p className="text-xs sm:text-sm text-[#1F2B3A]/80 leading-relaxed">
                  {story.story}
                </p>
              </div>

              <div className="hairline-border-t pt-4 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-[#1F2B3A]">{story.patronName}</p>
                  <p className="text-[11px] text-[#1F2B3A]/60 font-mono">{story.residence}</p>
                </div>
                {story.artistMentioned && (
                  <span className="text-[11px] font-mono text-[#A87C4F] font-semibold">
                    Artist: {story.artistMentioned}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Reserve CTA */}
      <div className="bg-[#1F2B3A] text-[#EDE6DC] p-8 sm:p-12 text-center space-y-6">
        <h3 className="font-serif text-3xl sm:text-4xl text-[#EDE6DC]">
          Experience the standard yourself.
        </h3>
        <p className="text-sm text-[#EDE6DC]/75 max-w-xl mx-auto leading-relaxed">
          Whether you require Adeel’s scissor work, Rohit’s razor discipline, or Jiya’s meticulous nail restoration, your chair is held with precision.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('reserve')}
            className="px-8 py-3.5 bg-[#A87C4F] text-[#EDE6DC] hover:bg-[#A87C4F]/90 transition-colors text-xs font-semibold uppercase tracking-widest cursor-pointer"
          >
            Reserve Your Chair
          </button>
          <a
            href={`https://wa.me/${SALON_INFO.whatsappNumber}?text=Hi%2C%20I'd%20like%20to%20book%20an%20appointment%20at%20Paragon%20Salon%20Gulberg`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 border border-[#EDE6DC]/30 text-[#EDE6DC] hover:bg-[#EDE6DC]/10 transition-colors text-xs font-semibold uppercase tracking-widest inline-flex items-center gap-2 cursor-pointer"
          >
            <span>WhatsApp Booking</span>
            <span className="text-[#A87C4F]">→</span>
          </a>
        </div>
      </div>
    </div>
  );
};
