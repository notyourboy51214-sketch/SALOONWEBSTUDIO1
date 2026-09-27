import React, { useState, useEffect } from 'react';
import { SALON_INFO } from '../data/salonData';

interface NavbarProps {
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollToSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { id: 'story', label: 'The House' },
    { id: 'services', label: 'Services' },
    { id: 'approach', label: 'Artists & Value' },
    { id: 'gallery', label: 'Lookbook' },
    { id: 'reviews', label: 'Reviews (4.7★)' },
    { id: 'process', label: 'The Ritual' },
    { id: 'visiting-tips', label: 'Hours & Tips' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['home', 'story', 'services', 'approach', 'gallery', 'reviews', 'process', 'visiting-tips', 'contact'];
      const scrollPosition = window.scrollY + 220;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    onScrollToSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled ? 'bg-[#EDE6DC]/98 shadow-sm backdrop-blur-md' : 'bg-[#EDE6DC]/90 backdrop-blur-sm'
        } hairline-border-b`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark in display face */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, 'home')}
            className="text-left font-serif text-xl sm:text-2xl font-normal tracking-tight text-[#1F2B3A] hover:text-[#A87C4F] transition-colors cursor-pointer"
          >
            Paragon Salon
          </a>

          {/* Zone 2: Clean text navigation links for single page scroll */}
          <nav className="hidden xl:flex items-center gap-6 text-[13px] font-medium text-[#1F2B3A]/80">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={`relative py-1 transition-colors hover:text-[#1F2B3A] cursor-pointer whitespace-nowrap ${
                    isActive ? 'text-[#1F2B3A] font-semibold' : 'text-[#1F2B3A]/70'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#A87C4F]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Direct reservation CTA */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, 'contact')}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold tracking-wider uppercase text-[#EDE6DC] bg-[#1F2B3A] hover:bg-[#A87C4F] transition-colors duration-200 cursor-pointer whitespace-nowrap"
            >
              Reserve Your Chair
            </a>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-[#1F2B3A] hover:text-[#A87C4F] transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span
                  className={`h-0.5 w-full bg-current transition-transform duration-300 ${
                    mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-current transition-opacity duration-300 ${
                    mobileMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-current transition-transform duration-300 ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile overlay menu for seamless scrolling */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#EDE6DC] flex flex-col justify-between p-8 xl:hidden animate-fade-in overflow-y-auto">
          <div className="flex items-center justify-between hairline-border-b pb-6">
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, 'home')}
              className="font-serif text-2xl text-[#1F2B3A]"
            >
              Paragon Salon
            </a>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-sm uppercase tracking-widest text-[#1F2B3A]/70 hover:text-[#1F2B3A]"
            >
              Close ✕
            </button>
          </div>

          <div className="my-8 flex flex-col gap-4 text-left">
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#A87C4F] font-semibold">
              Scroll To Section
            </span>
            {[
              { id: 'home', label: '01 · Top / Welcome' },
              { id: 'story', label: '02 · The House (Story & Standards)' },
              { id: 'services', label: '03 · Master Services (Hair, Shave, Nails)' },
              { id: 'approach', label: '04 · Resident Artists (Adeel, Rohit, Jiya)' },
              { id: 'gallery', label: '05 · Signature Lookbook' },
              { id: 'reviews', label: '06 · Patron Reviews (4.7★)' },
              { id: 'process', label: '07 · The 5-Step Grooming Ritual' },
              { id: 'visiting-tips', label: '08 · Peak Hours & Visiting Tips' },
              { id: 'contact', label: '09 · Reserve Your Chair / Contact' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                className={`font-serif text-xl sm:text-2xl text-left py-1 hover:text-[#A87C4F] transition-colors ${
                  activeSection === item.id ? 'text-[#A87C4F] font-medium' : 'text-[#1F2B3A]'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-6 hairline-border-t space-y-4">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, 'contact')}
              className="w-full inline-flex items-center justify-center py-3.5 text-xs font-semibold tracking-widest uppercase bg-[#1F2B3A] text-[#EDE6DC] hover:bg-[#A87C4F] transition-colors"
            >
              Reserve Your Chair
            </a>
            <div className="text-xs text-[#1F2B3A]/60 flex justify-between items-center font-mono">
              <span>{SALON_INFO.hours}</span>
              <a
                href={`https://wa.me/${SALON_INFO.whatsappRaw}`}
                target="_blank"
                rel="noreferrer"
                className="text-[#A87C4F] underline"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
