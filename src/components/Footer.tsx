import React from 'react';
import { SALON_INFO } from '../data/salonData';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToSection }) => {
  const handleLinkClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    onScrollToSection(sectionId);
  };

  return (
    <footer className="w-full bg-[#1F2B3A] text-[#EDE6DC] border-t border-[#A87C4F]/30">
      {/* Top Banner / Trust Band */}
      <div className="border-b border-[#EDE6DC]/10 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-serif text-lg tracking-tight text-[#EDE6DC]">
              Paragon Salon Gulberg
            </span>
            <span className="text-[#EDE6DC]/40">·</span>
            <span className="text-xs text-[#EDE6DC]/80 font-mono">
              4.7★ (400+ Verified Lahore Reviews)
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-[#EDE6DC]/70">
            <span>Open Daily 11:00 AM – 9:00 PM</span>
            <span className="text-[#A87C4F]">·</span>
            <span>Opposite Butlers Chocolate Cafe</span>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
        {/* Column 1: Brand & Atelier Presence */}
        <div className="space-y-4">
          <h3 className="font-serif text-xl tracking-tight text-[#EDE6DC]">
            The Atelier
          </h3>
          <p className="text-xs leading-relaxed text-[#EDE6DC]/70">
            An editorial sanctuary for hair styling, artisanal beard sculpting, and restorative nail therapy on Lahore’s premier boulevard.
          </p>
          <div className="pt-2 text-xs font-mono text-[#A87C4F]">
            59-B-3, MM Alam Road, Gulberg III, Lahore
          </div>
          <div className="text-xs text-[#EDE6DC]/60">
            Direct Telephone / WhatsApp: <br />
            <a
              href={`tel:${SALON_INFO.phoneRaw}`}
              className="text-[#EDE6DC] underline decoration-[#A87C4F] underline-offset-4 hover:text-[#A87C4F] transition-colors"
            >
              {SALON_INFO.phone}
            </a>
          </div>
        </div>

        {/* Column 2: Continuous Page Sections (1-4) */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-[#A87C4F]">
            Story & Services
          </h4>
          <ul className="space-y-2 text-xs text-[#EDE6DC]/75">
            <li>
              <a
                href="#home"
                onClick={(e) => handleLinkClick(e, 'home')}
                className="hover:text-[#EDE6DC] transition-colors cursor-pointer"
              >
                Top / Welcome
              </a>
            </li>
            <li>
              <a
                href="#story"
                onClick={(e) => handleLinkClick(e, 'story')}
                className="hover:text-[#EDE6DC] transition-colors cursor-pointer"
              >
                The House (Heritage & Space)
              </a>
            </li>
            <li>
              <a
                href="#services"
                onClick={(e) => handleLinkClick(e, 'services')}
                className="hover:text-[#EDE6DC] transition-colors cursor-pointer"
              >
                Services (Hair, Shave, Nails)
              </a>
            </li>
            <li>
              <a
                href="#approach"
                onClick={(e) => handleLinkClick(e, 'approach')}
                className="hover:text-[#EDE6DC] transition-colors cursor-pointer"
              >
                Resident Artists (Adeel, Rohit, Jiya)
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Continuous Page Sections (5-9) */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-[#A87C4F]">
            Archive & Guidance
          </h4>
          <ul className="space-y-2 text-xs text-[#EDE6DC]/75">
            <li>
              <a
                href="#gallery"
                onClick={(e) => handleLinkClick(e, 'gallery')}
                className="hover:text-[#EDE6DC] transition-colors cursor-pointer"
              >
                Signature Lookbook
              </a>
            </li>
            <li>
              <a
                href="#reviews"
                onClick={(e) => handleLinkClick(e, 'reviews')}
                className="hover:text-[#EDE6DC] transition-colors cursor-pointer"
              >
                Client Voices (4.7★ / 400+ Reviews)
              </a>
            </li>
            <li>
              <a
                href="#process"
                onClick={(e) => handleLinkClick(e, 'process')}
                className="hover:text-[#EDE6DC] transition-colors cursor-pointer"
              >
                The 5-Step Grooming Ritual
              </a>
            </li>
            <li>
              <a
                href="#visiting-tips"
                onClick={(e) => handleLinkClick(e, 'visiting-tips')}
                className="hover:text-[#EDE6DC] transition-colors cursor-pointer"
              >
                Peak Hours & Visiting Tips
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, 'contact')}
                className="hover:text-[#EDE6DC] transition-colors cursor-pointer text-[#A87C4F] font-semibold"
              >
                Reserve Your Chair (Form & WhatsApp)
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Hours, WhatsApp & Location */}
        <div className="space-y-4">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-[#A87C4F]">
            MM Alam Concierge
          </h4>
          <p className="text-xs text-[#EDE6DC]/70 leading-relaxed">
            Appointments honored with zero delay. Walk-in appointments welcomed based on live chair availability.
          </p>
          <div className="space-y-2">
            <a
              href={`https://wa.me/${SALON_INFO.whatsappRaw}?text=${encodeURIComponent(SALON_INFO.whatsappDefaultMessage)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#A87C4F] text-[#1F2B3A] font-semibold text-xs uppercase tracking-wider hover:bg-[#C29668] transition-colors"
            >
              <span>Instant WhatsApp Concierge</span>
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Paragon+Salon+59-B-3+MM+Alam+Road+Gulberg+III+Lahore"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs text-[#EDE6DC]/80 hover:text-[#A87C4F] underline transition-colors"
            >
              <span>📍 View on Google Maps ↗</span>
            </a>
          </div>
          <p className="text-[11px] text-[#EDE6DC]/50 font-mono">
            {SALON_INFO.hours}
          </p>
        </div>
      </div>

      {/* Bottom Legal / Copyright Strip */}
      <div className="border-t border-[#EDE6DC]/10 py-6 text-xs text-[#EDE6DC]/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Paragon Salon Gulberg. All rights reserved. 59-B-3 MM Alam Road, Gulberg III, Lahore.
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, 'home')}
              className="hover:text-[#EDE6DC] transition-colors flex items-center gap-1 font-mono text-[11px]"
            >
              <span>Back to Top ↑</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
