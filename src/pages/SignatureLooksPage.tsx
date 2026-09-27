import React, { useState } from 'react';
import { PageId } from '../types';
import { SIGNATURE_LOOKS } from '../data/salonData';
import { HorizontalScrollShowcase } from '../components/HorizontalScrollShowcase';
import { EditorialVisual } from '../components/EditorialVisual';

interface SignatureLooksPageProps {
  onNavigate: (page: PageId, extraParams?: { artistId?: string; serviceId?: string }) => void;
}

export const SignatureLooksPage: React.FC<SignatureLooksPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedLookId, setSelectedLookId] = useState<string>(SIGNATURE_LOOKS[0].id);

  const categories = ['all', 'Executive', 'Textured', 'Classic', 'Grooming', 'Editorial'];

  const filteredLooks = SIGNATURE_LOOKS.filter((look) => {
    if (activeCategory === 'all') return true;
    return look.category.toLowerCase() === activeCategory.toLowerCase();
  });

  const selectedLook = SIGNATURE_LOOKS.find((l) => l.id === selectedLookId) || SIGNATURE_LOOKS[0];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 space-y-20">
      {/* 1. Page Header */}
      <div className="space-y-4 max-w-4xl">
        <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#A87C4F] font-semibold">
          <span>Chapter 06</span>
          <span>·</span>
          <span>Editorial Lookbook</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#1F2B3A] tracking-tight text-balance">
          Signature Looks & Profiles
        </h1>
        <p className="text-base sm:text-lg text-[#1F2B3A]/80 leading-relaxed max-w-3xl">
          An ongoing archive of silhouettes cut and contoured at our MM Alam Road chairs. Each profile is engineered around natural skull architecture and manageable at home with minimal product.
        </p>
      </div>

      {/* 2. Category Filter Controls */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-[#1F2B3A] text-[#EDE6DC]'
                : 'bg-[#F7F3ED] text-[#1F2B3A]/70 hover:text-[#1F2B3A] border border-[#1F2B3A]/10'
            }`}
          >
            {cat === 'all' ? 'All Silhouettes' : cat}
          </button>
        ))}
      </div>

      {/* 3. Horizontal Scroll Showcase (Editorial Lookbook Strip) */}
      <section className="w-full">
        <HorizontalScrollShowcase
          subtitle="Atelier Archive"
          title="Flipping Through The Lookbook"
          countLabel={`${filteredLooks.length} Profiles Selected`}
        >
          {filteredLooks.map((look, i) => (
            <div
              key={look.id}
              onClick={() => setSelectedLookId(look.id)}
              className={`scroll-snap-card shrink-0 w-[300px] sm:w-[350px] bg-[#F7F3ED] border p-5 flex flex-col justify-between cursor-pointer transition-all ${
                selectedLookId === look.id
                  ? 'border-2 border-[#A87C4F] shadow-sm'
                  : 'border-[#1F2B3A]/10 hover:border-[#1F2B3A]/30'
              }`}
            >
              <div>
                <EditorialVisual
                  type={
                    i % 3 === 0
                      ? 'transformation-exec'
                      : i % 3 === 1
                      ? 'transformation-fade'
                      : 'transformation-classic'
                  }
                  title={look.title}
                  subtitle={look.category}
                  aspect="4:3"
                />
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono text-[#A87C4F] font-semibold uppercase">{look.category}</span>
                    <span className="text-[#1F2B3A]/60">Artist: {look.artist}</span>
                  </div>
                  <h4 className="font-serif text-lg text-[#1F2B3A]">{look.title}</h4>
                  <p className="text-xs text-[#1F2B3A]/70 leading-relaxed line-clamp-3">
                    {look.description}
                  </p>
                </div>
              </div>

              <div className="hairline-border-t pt-4 mt-6 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#A87C4F]">
                <span>{selectedLookId === look.id ? 'Viewing Anatomy' : 'Inspect Details'}</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </HorizontalScrollShowcase>
      </section>

      {/* 4. Detailed Anatomy of Selected Silhouette */}
      <section className="bg-[#1F2B3A] text-[#EDE6DC] p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5">
          <EditorialVisual
            type="transformation-exec"
            aspect="1:1"
            title={selectedLook.title}
            subtitle={`Executed by ${selectedLook.artist}`}
          />
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#A87C4F] font-semibold">
                {selectedLook.category} Archive
              </span>
              <span className="text-[#EDE6DC]/30">·</span>
              <span className="text-xs text-[#EDE6DC]/60 font-mono">
                Artist: {selectedLook.artist}
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#EDE6DC] mt-2">
              {selectedLook.title}
            </h2>
          </div>

          <p className="text-sm text-[#EDE6DC]/80 leading-relaxed">
            {selectedLook.description}
          </p>

          {/* Technical Specifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono border-t border-b border-[#EDE6DC]/10 py-4">
            <div>
              <span className="text-[#A87C4F] uppercase tracking-wider block">Recommended Hair Type:</span>
              <span className="text-[#EDE6DC] mt-1 block">{selectedLook.hairType}</span>
            </div>
            <div>
              <span className="text-[#A87C4F] uppercase tracking-wider block">Daily Maintenance:</span>
              <span className="text-[#EDE6DC] mt-1 block">{selectedLook.stylingTime}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-[#A87C4F] uppercase tracking-wider block">Finishing Aspect:</span>
              <span className="text-[#EDE6DC] mt-1 block">{selectedLook.aspect}</span>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('reserve', { artistId: selectedLook.artist.toLowerCase().includes('adeel') ? 'adeel' : 'rohit' })}
              className="px-6 py-3.5 bg-[#A87C4F] text-[#EDE6DC] hover:bg-[#A87C4F]/90 transition-colors text-xs font-semibold uppercase tracking-widest cursor-pointer"
            >
              Book This Exact Look
            </button>
            <a
              href={`https://wa.me/924232294007?text=Hi%2C%20I'd%20like%20to%20consult%20about%20${encodeURIComponent(selectedLook.title)}%20at%20Paragon%20Salon%20Gulberg`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 border border-[#EDE6DC]/30 text-[#EDE6DC] hover:bg-[#EDE6DC]/10 transition-colors text-xs font-semibold uppercase tracking-widest cursor-pointer"
            >
              WhatsApp Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
