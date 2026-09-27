import React from 'react';
import { PageId } from '../types';
import { SALON_INFO, SIGNATURE_LOOKS, PEAK_HOURS_DATA } from '../data/salonData';
import { HorizontalScrollShowcase } from '../components/HorizontalScrollShowcase';
import { EditorialVisual } from '../components/EditorialVisual';

interface HomePageProps {
  onNavigate: (page: PageId, extraParams?: { artistId?: string; serviceId?: string }) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  // Current day recommendation from popular times
  const todayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
  const todayData = PEAK_HOURS_DATA.find((d) => d.dayName.toLowerCase() === todayName.toLowerCase()) || PEAK_HOURS_DATA[1];
  const quietHours = todayData.hours.filter((h) => h.trafficLevel === 'quiet');

  return (
    <div className="w-full flex flex-col space-y-24">
      {/* 1. Oversized Typography Hero */}
      <section className="pt-12 sm:pt-20 pb-8 px-6 max-w-7xl mx-auto w-full">
        {/* Top Micro-Metadata Bar (Clean Unboxed) */}
        <div className="flex flex-wrap items-center gap-3 text-xs tracking-wider uppercase text-[#1F2B3A]/70 mb-6">
          <span className="font-semibold text-[#A87C4F]">Gulberg III, Lahore</span>
          <span>·</span>
          <span>Opposite Butlers Chocolate Cafe</span>
          <span>·</span>
          <span className="font-mono text-[#1F2B3A]">{SALON_INFO.hours}</span>
        </div>

        {/* Oversized Didone Headline */}
        <div className="space-y-4 max-w-5xl">
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#1F2B3A] leading-[1.02] text-balance">
            Architecture for hair, beard, and hand.
          </h1>
          <p className="text-lg sm:text-xl text-[#1F2B3A]/80 font-normal max-w-2xl leading-relaxed">
            Paragon Salon Gulberg is an unhurried editorial grooming house on MM Alam Road. Home to Senior Stylist Adeel, Senior Artist Rohit, and Nail Specialist Jiya.
          </p>
        </div>

        {/* Supporting Texture / Visual & Primary WhatsApp Call-to-Action */}
        <div className="mt-10 pt-8 hairline-border-t grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('reserve')}
              className="px-8 py-4 bg-[#1F2B3A] text-[#EDE6DC] hover:bg-[#A87C4F] transition-colors duration-200 text-xs font-semibold uppercase tracking-[0.2em] cursor-pointer"
            >
              Reserve Your Chair
            </button>
            <a
              href={`https://wa.me/${SALON_INFO.whatsappNumber}?text=Hi%2C%20I'd%20like%20to%20book%20an%20appointment%20at%20Paragon%20Salon%20Gulberg`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 border border-[#A87C4F] text-[#1F2B3A] hover:bg-[#A87C4F]/10 transition-colors duration-200 text-xs font-semibold uppercase tracking-[0.2em] inline-flex items-center gap-2 cursor-pointer"
            >
              <span>WhatsApp Direct</span>
              <span className="text-[#A87C4F]">→</span>
            </a>
          </div>

          <div className="md:col-span-5 flex items-center justify-between p-4 bg-[#E5DCD0]/60 border border-[#1F2B3A]/10">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-[#A87C4F] font-semibold">Immediate Assistance</p>
              <p className="text-xs text-[#1F2B3A] font-mono mt-0.5">{SALON_INFO.phone}</p>
            </div>
            <div className="text-right">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 mr-2" />
              <span className="text-xs font-serif text-[#1F2B3A] font-medium">{SALON_INFO.status}</span>
              <p className="text-[10px] text-[#1F2B3A]/60">Closes 9 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Band (Clean Unboxed Quantitative Social Proof) */}
      <section className="hairline-border-t hairline-border-b bg-[#F7F3ED]/70 py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="font-serif text-3xl sm:text-4xl text-[#1F2B3A] tracking-tight">4.7★</p>
            <p className="text-xs uppercase tracking-wider text-[#A87C4F] font-semibold mt-1">400+ Verified Clients</p>
            <p className="text-xs text-[#1F2B3A]/60 mt-0.5">High volume on MM Alam Road</p>
          </div>

          <div>
            <p className="font-serif text-3xl sm:text-4xl text-[#1F2B3A] tracking-tight">13 Yrs</p>
            <p className="text-xs uppercase tracking-wider text-[#A87C4F] font-semibold mt-1">Master Senior Artists</p>
            <p className="text-xs text-[#1F2B3A]/60 mt-0.5">Led by Rohit & Adeel</p>
          </div>

          <div>
            <p className="font-serif text-3xl sm:text-4xl text-[#1F2B3A] tracking-tight">0-Rush</p>
            <p className="text-xs uppercase tracking-wider text-[#A87C4F] font-semibold mt-1">Attentive Consultations</p>
            <p className="text-xs text-[#1F2B3A]/60 mt-0.5">Pre-cut structural mapping</p>
          </div>

          <div>
            <p className="font-serif text-3xl sm:text-4xl text-[#1F2B3A] tracking-tight">100%</p>
            <p className="text-xs uppercase tracking-wider text-[#A87C4F] font-semibold mt-1">Hospital-Grade Sanitation</p>
            <p className="text-xs text-[#1F2B3A]/60 mt-0.5">Sterilized steel instruments</p>
          </div>
        </div>
      </section>

      {/* 3. Horizontal-Scroll Teaser: Signature Looks & Transformations */}
      <section className="w-full">
        <HorizontalScrollShowcase
          subtitle="Editorial Lookbook"
          title="Signature Transformations"
          countLabel="06 Curated Profiles"
          actionButton={
            <button
              onClick={() => onNavigate('looks')}
              className="text-xs font-semibold text-[#A87C4F] hover:underline uppercase tracking-wider cursor-pointer"
            >
              View Full Gallery →
            </button>
          }
        >
          {SIGNATURE_LOOKS.map((look, index) => (
            <div
              key={look.id}
              className="scroll-snap-card shrink-0 w-[300px] sm:w-[360px] bg-[#F7F3ED] border border-[#1F2B3A]/10 p-5 flex flex-col justify-between"
            >
              <div>
                <EditorialVisual
                  type={
                    index % 3 === 0
                      ? 'transformation-exec'
                      : index % 3 === 1
                      ? 'transformation-fade'
                      : 'transformation-classic'
                  }
                  title={look.title}
                  subtitle={look.category}
                  aspect="4:3"
                />
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[#A87C4F] font-semibold uppercase">{look.category}</span>
                    <span className="text-[#1F2B3A]/60">Artist: {look.artist}</span>
                  </div>
                  <h4 className="font-serif text-lg text-[#1F2B3A]">{look.title}</h4>
                  <p className="text-xs text-[#1F2B3A]/70 line-clamp-2 leading-relaxed">
                    {look.description}
                  </p>
                </div>
              </div>

              <div className="hairline-border-t pt-4 mt-6 flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#1F2B3A]/60">{look.stylingTime}</span>
                <button
                  onClick={() => onNavigate('reserve', { artistId: look.artist.toLowerCase().includes('adeel') ? 'adeel' : 'rohit' })}
                  className="text-xs font-semibold uppercase tracking-wider text-[#1F2B3A] hover:text-[#A87C4F] cursor-pointer"
                >
                  Book Look →
                </button>
              </div>
            </div>
          ))}
        </HorizontalScrollShowcase>
      </section>

      {/* 4. "This Week at Paragon" — Popular-Times Data & Calmer Visiting Hours */}
      <section className="max-w-7xl mx-auto px-6 w-full">
        <div className="bg-[#1F2B3A] text-[#EDE6DC] p-8 sm:p-12 relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#A87C4F] font-semibold">
                This Week at Paragon · Gulberg Schedule
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#EDE6DC] leading-snug">
                The Quiet Window: Plan a zero-wait chair session.
              </h2>
              <p className="text-sm text-[#EDE6DC]/75 leading-relaxed max-w-xl">
                MM Alam Road is famed for lively evenings, but weekday mornings between 11:00 AM and 3:00 PM offer complete acoustic calm. Enjoy complimentary pour-over coffee, undisturbed consultations with Adeel or Rohit, and direct valet parking at our entrance.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('peak-hours')}
                  className="px-6 py-3 bg-[#A87C4F] text-[#EDE6DC] hover:bg-[#A87C4F]/90 transition-colors text-xs font-semibold uppercase tracking-widest cursor-pointer"
                >
                  Explore Weekly Visiting Guide
                </button>
                <button
                  onClick={() => onNavigate('reserve')}
                  className="text-xs uppercase tracking-widest text-[#EDE6DC]/80 hover:text-[#EDE6DC] underline decoration-[#A87C4F] underline-offset-4 cursor-pointer"
                >
                  Reserve Ahead
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#141D27] p-6 border border-[#EDE6DC]/10 space-y-4">
              <div className="flex items-center justify-between hairline-border-b border-[#EDE6DC]/10 pb-3">
                <span className="text-xs font-serif text-[#EDE6DC]">Recommended Time Slots</span>
                <span className="text-[10px] font-mono text-[#A87C4F]">{todayName} Guidance</span>
              </div>

              <div className="space-y-3">
                {quietHours.length > 0 ? (
                  quietHours.map((qh, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <div>
                        <p className="font-medium text-[#EDE6DC]">{qh.hourLabel}</p>
                        <p className="text-[11px] text-[#EDE6DC]/60">{qh.tip}</p>
                      </div>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 border border-emerald-800/40">
                        Serene
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-[#EDE6DC]/70">
                    <p className="font-medium text-[#EDE6DC]">11:00 AM – 2:00 PM</p>
                    <p className="text-[11px] text-[#EDE6DC]/60">Tranquil early window before afternoon rush.</p>
                  </div>
                )}
              </div>

              <div className="pt-3 hairline-border-t border-[#EDE6DC]/10 text-[11px] text-[#EDE6DC]/50 font-mono">
                Location: 59-B-3, MM Alam Road, opposite Butlers Chocolate Cafe.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Quick Editorial Portals: The Chair, The Grooming Room, Nail & Hand Studio */}
      <section className="max-w-7xl mx-auto px-6 w-full">
        <div className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#A87C4F] font-semibold">
            Three Specialized Departments
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1F2B3A] tracking-tight mt-1">
            Curated Atelier Practices
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Department 1: The Chair */}
          <div
            onClick={() => onNavigate('chair')}
            className="group cursor-pointer bg-[#F7F3ED] border border-[#1F2B3A]/10 p-6 flex flex-col justify-between hover:border-[#A87C4F] transition-colors"
          >
            <div>
              <EditorialVisual type="scissor-cut" aspect="4:3" />
              <div className="mt-6 space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#A87C4F] font-semibold">
                  Hair Craft · Stylist Adeel
                </span>
                <h3 className="font-serif text-2xl text-[#1F2B3A] group-hover:text-[#A87C4F] transition-colors">
                  The Chair
                </h3>
                <p className="text-xs text-[#1F2B3A]/70 leading-relaxed">
                  Tailored scissor architecture, skull contour fades, and natural movement conditioning. Cuts designed to grow out cleanly over 6 weeks.
                </p>
              </div>
            </div>
            <div className="mt-6 hairline-border-t pt-4 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#1F2B3A]">
              <span>Explore Hair Services</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>

          {/* Department 2: The Grooming Room */}
          <div
            onClick={() => onNavigate('grooming')}
            className="group cursor-pointer bg-[#F7F3ED] border border-[#1F2B3A]/10 p-6 flex flex-col justify-between hover:border-[#A87C4F] transition-colors"
          >
            <div>
              <EditorialVisual type="grooming-ritual" aspect="4:3" />
              <div className="mt-6 space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#A87C4F] font-semibold">
                  Beard & Shave · Senior Artist Rohit
                </span>
                <h3 className="font-serif text-2xl text-[#1F2B3A] group-hover:text-[#A87C4F] transition-colors">
                  The Grooming Room
                </h3>
                <p className="text-xs text-[#1F2B3A]/70 leading-relaxed">
                  Traditional triple-steamed linen preparation, Japanese razor detailing, facial geometry sculpting, and chilled rosewater pore closure.
                </p>
              </div>
            </div>
            <div className="mt-6 hairline-border-t pt-4 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#1F2B3A]">
              <span>Explore Shave & Packages</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>

          {/* Department 3: Nail & Hand Studio */}
          <div
            onClick={() => onNavigate('nails')}
            className="group cursor-pointer bg-[#F7F3ED] border border-[#1F2B3A]/10 p-6 flex flex-col justify-between hover:border-[#A87C4F] transition-colors"
          >
            <div>
              <EditorialVisual type="nail-studio" aspect="4:3" />
              <div className="mt-6 space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#A87C4F] font-semibold">
                  Clinical Care · Specialist Jiya
                </span>
                <h3 className="font-serif text-2xl text-[#1F2B3A] group-hover:text-[#A87C4F] transition-colors">
                  Nail & Hand Studio
                </h3>
                <p className="text-xs text-[#1F2B3A]/70 leading-relaxed">
                  Quiet restorative hand and foot care. Medical-standard instrument sanitization, gentle cuticle therapy, mineral salts, and organic massage.
                </p>
              </div>
            </div>
            <div className="mt-6 hairline-border-t pt-4 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#1F2B3A]">
              <span>Explore Hand & Foot Care</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
