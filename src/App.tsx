import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ContinuousHome } from './components/ContinuousHome';
import { SALON_INFO } from './data/salonData';

export default function App() {
  const [selectedArtistId, setSelectedArtistId] = useState<string | undefined>(undefined);
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>(undefined);

  // Smooth scroll handler for all anchor targets
  const handleScrollToSection = useCallback((sectionId: string) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '#home');
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${sectionId}`);
    }
  }, []);

  // Handle initial page load with URL hash
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        handleScrollToSection(hash);
      }, 100);
    }
  }, [handleScrollToSection]);

  return (
    <div className="min-h-screen flex flex-col bg-[#EDE6DC] text-[#1F2B3A] selection:bg-[#A87C4F] selection:text-[#EDE6DC]">
      {/* Top Banner Notice (Acoustic Sanctuary · Open Today) */}
      <div className="w-full bg-[#1F2B3A] text-[#EDE6DC] text-[11px] py-2 px-6 hairline-border-b border-[#EDE6DC]/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="font-mono">{SALON_INFO.hours}</span>
            <span className="hidden sm:inline text-[#EDE6DC]/40">|</span>
            <span className="hidden sm:inline text-[#EDE6DC]/75">
              59-B-3 MM Alam Road, opposite Butlers Chocolate Cafe
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-xs font-mono text-[#A87C4F]">
              4.7★ (400+ Verified Reviews)
            </span>
            <a
              href={`tel:${SALON_INFO.phoneRaw}`}
              className="text-[#EDE6DC] hover:text-[#A87C4F] transition-colors font-mono"
            >
              {SALON_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Slim Fixed Top Bar with Anchor Smooth Scrolling & Active State */}
      <Navbar onScrollToSection={handleScrollToSection} />

      {/* Main Single Continuous Scrolling Body */}
      <main className="flex-1 w-full">
        <ContinuousHome
          onScrollToSection={handleScrollToSection}
          selectedArtistId={selectedArtistId}
          selectedServiceId={selectedServiceId}
          onSelectArtist={(artistId) => setSelectedArtistId(artistId)}
          onSelectService={(serviceId) => setSelectedServiceId(serviceId)}
        />
      </main>

      {/* Continuous Footer with Anchor Links */}
      <Footer onScrollToSection={handleScrollToSection} />
    </div>
  );
}
