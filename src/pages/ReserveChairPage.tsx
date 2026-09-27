import React, { useState, useEffect } from 'react';
import { PageId, ConfirmedBooking } from '../types';
import { SALON_INFO, ARTISTS, SERVICES } from '../data/salonData';

interface ReserveChairPageProps {
  onNavigate: (page: PageId) => void;
  initialArtistId?: string;
  initialServiceId?: string;
}

export const ReserveChairPage: React.FC<ReserveChairPageProps> = ({
  onNavigate,
  initialArtistId,
  initialServiceId
}) => {
  const [selectedArtist, setSelectedArtist] = useState<string>(initialArtistId || '');
  const [selectedService, setSelectedService] = useState<string>(initialServiceId || SERVICES[0].id);
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [date, setDate] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split('T')[0]
  );
  const [timeSlot, setTimeSlot] = useState<string>('14:00');
  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBooking | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (initialArtistId) setSelectedArtist(initialArtistId);
    if (initialServiceId) setSelectedService(initialServiceId);
  }, [initialArtistId, initialServiceId]);

  // Construct dynamic WhatsApp link
  const currentServiceObj = SERVICES.find((s) => s.id === selectedService) || SERVICES[0];
  const currentArtistObj = ARTISTS.find((a) => a.id === selectedArtist);

  const generateWhatsAppMessage = () => {
    let msg = `Hi, I'd like to book an appointment at Paragon Salon Gulberg.`;
    if (currentServiceObj) {
      msg += `\nService: ${currentServiceObj.name} (PKR ${currentServiceObj.pricePKR.toLocaleString()})`;
    }
    if (currentArtistObj) {
      msg += `\nPreferred Artist: ${currentArtistObj.name} (${currentArtistObj.role})`;
    } else {
      msg += `\nPreferred Artist: No preference (First available master artist)`;
    }
    if (date) msg += `\nDate: ${date}`;
    if (timeSlot) msg += `\nPreferred Time: ${timeSlot}`;
    if (fullName) msg += `\nName: ${fullName}`;
    return encodeURIComponent(msg);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      const refId = `PSG-${randomNum}`;

      const booking: ConfirmedBooking = {
        referenceId: refId,
        fullName: fullName.trim(),
        phone: phone.trim(),
        artistName: currentArtistObj ? currentArtistObj.name : 'First Available Master Artist',
        serviceName: currentServiceObj.name,
        pricePKR: currentServiceObj.pricePKR,
        durationMin: currentServiceObj.durationMin,
        date: date,
        timeSlot: timeSlot,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setConfirmedBooking(booking);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 space-y-16">
      {/* 1. Header */}
      <div className="space-y-4 max-w-4xl">
        <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#A87C4F] font-semibold">
          <span>Chapter 09</span>
          <span>·</span>
          <span>Reservations</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#1F2B3A] tracking-tight text-balance">
          Reserve Your Chair at Paragon
        </h1>
        <p className="text-base sm:text-lg text-[#1F2B3A]/80 leading-relaxed max-w-3xl">
          Located at 59-B-3 MM Alam Road, opposite Butlers Chocolate Cafe. Open daily until 9:00 PM. Book instantly via direct WhatsApp concierge or complete our reservation request below.
        </p>
      </div>

      {/* Confirmation State if Booking Received */}
      {confirmedBooking ? (
        <div className="bg-[#F7F3ED] border-2 border-[#A87C4F] p-8 sm:p-12 space-y-8 animate-fade-in max-w-3xl mx-auto shadow-sm">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#A87C4F] font-semibold block">
              Reservation Received · Immediate Review
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1F2B3A]">
              Your chair request has been logged.
            </h2>
            <p className="text-sm text-[#1F2B3A]/80 leading-relaxed">
              We have dispatched your request to our front-of-house team on MM Alam Road. We will confirm your exact slot via WhatsApp within 15 minutes.
            </p>
          </div>

          <div className="bg-[#EDE6DC] border border-[#1F2B3A]/10 p-6 space-y-4 font-mono text-xs text-[#1F2B3A]">
            <div className="flex justify-between items-center hairline-border-b pb-3 text-sm font-semibold">
              <span>REFERENCE ID:</span>
              <span className="text-[#A87C4F] text-base">{confirmedBooking.referenceId}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <span className="text-[#1F2B3A]/60 block">GUEST NAME:</span>
                <span className="font-bold">{confirmedBooking.fullName}</span>
              </div>
              <div>
                <span className="text-[#1F2B3A]/60 block">PHONE / WHATSAPP:</span>
                <span className="font-bold">{confirmedBooking.phone}</span>
              </div>
              <div>
                <span className="text-[#1F2B3A]/60 block">SELECTED SERVICE:</span>
                <span className="font-bold">{confirmedBooking.serviceName}</span>
              </div>
              <div>
                <span className="text-[#1F2B3A]/60 block">PRESCRIBED ARTIST:</span>
                <span className="font-bold">{confirmedBooking.artistName}</span>
              </div>
              <div>
                <span className="text-[#1F2B3A]/60 block">DATE & TIME:</span>
                <span className="font-bold">{confirmedBooking.date} at {confirmedBooking.timeSlot}</span>
              </div>
              <div>
                <span className="text-[#1F2B3A]/60 block">ESTIMATED TOTAL:</span>
                <span className="font-bold text-[#A87C4F]">PKR {confirmedBooking.pricePKR.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href={`https://wa.me/${SALON_INFO.whatsappNumber}?text=Hi%2C%20I%20just%20submitted%20reservation%20request%20${confirmedBooking.referenceId}%20for%20${encodeURIComponent(confirmedBooking.serviceName)}%20with%20${encodeURIComponent(confirmedBooking.artistName)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#1F2B3A] text-[#EDE6DC] hover:bg-[#A87C4F] transition-colors text-xs font-semibold uppercase tracking-widest inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Confirm on WhatsApp Now</span>
              <span className="text-[#A87C4F]">→</span>
            </a>
            <button
              onClick={() => setConfirmedBooking(null)}
              className="px-6 py-3.5 border border-[#1F2B3A]/20 text-[#1F2B3A] hover:bg-[#1F2B3A]/5 transition-colors text-xs font-semibold uppercase tracking-widest cursor-pointer"
            >
              Make Another Reservation
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct WhatsApp First-Action Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#1F2B3A] text-[#EDE6DC] p-8 space-y-6 border border-[#A87C4F]/30">
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#A87C4F] font-semibold">
                  Fastest Route
                </span>
                <h3 className="font-serif text-2xl text-[#EDE6DC]">
                  Direct WhatsApp Concierge
                </h3>
                <p className="text-xs text-[#EDE6DC]/75 leading-relaxed">
                  Our front desk monitors WhatsApp live from 11:00 AM to 9:00 PM. Click below to initiate a pre-filled booking inquiry with your chosen stylist.
                </p>
              </div>

              <div className="p-4 bg-[#141D27] border border-[#EDE6DC]/10 space-y-2 text-xs font-mono">
                <p className="text-[#A87C4F]">PRE-FILLED PARAMETERS:</p>
                <p className="text-[#EDE6DC]/80">Artist: {currentArtistObj ? currentArtistObj.name : 'Any Master Artist'}</p>
                <p className="text-[#EDE6DC]/80">Service: {currentServiceObj ? currentServiceObj.name : 'Select Below'}</p>
                <p className="text-[#EDE6DC]/60">Status: Instant Dispatch</p>
              </div>

              <a
                href={`https://wa.me/${SALON_INFO.whatsappNumber}?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#A87C4F] text-[#EDE6DC] hover:bg-[#A87C4F]/90 transition-colors text-xs font-semibold uppercase tracking-widest text-center block cursor-pointer"
              >
                Launch Pre-Filled WhatsApp →
              </a>

              <div className="text-[11px] text-[#EDE6DC]/50 text-center font-mono">
                Official Salon Line: {SALON_INFO.phone}
              </div>
            </div>

            {/* Atelier Visiting Card */}
            <div className="bg-[#F7F3ED] border border-[#1F2B3A]/10 p-6 space-y-3">
              <h4 className="font-serif text-lg text-[#1F2B3A]">MM Alam Road Atelier Address</h4>
              <p className="text-xs text-[#1F2B3A]/80 leading-relaxed">
                59-B-3, MM Alam Road, opposite Butlers Chocolate Cafe, Gulberg III, Lahore, 54660.
              </p>
              <div className="hairline-border-t pt-2 text-xs font-mono text-[#1F2B3A]/70 space-y-1">
                <p>• Valet parking attendant stationed outside</p>
                <p>• Closes at 9:00 PM tonight</p>
                <p>• Telephone: {SALON_INFO.phone}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Web Booking Form Fallback */}
          <div className="lg:col-span-7 bg-[#F7F3ED] border border-[#1F2B3A]/10 p-8 sm:p-10 space-y-8">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#A87C4F] font-semibold">
                Web Reservation Form
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1F2B3A] mt-1">
                Customize Your Chair Request
              </h3>
              <p className="text-xs text-[#1F2B3A]/70 mt-1">
                Fill out your details to receive an instant reference ID and confirmation.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Artist Selection */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#1F2B3A]">
                  Select Preferred Artist (Optional)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedArtist('')}
                    className={`p-3 text-xs text-left border transition-colors cursor-pointer ${
                      selectedArtist === ''
                        ? 'bg-[#1F2B3A] text-[#EDE6DC] border-[#1F2B3A]'
                        : 'bg-[#EDE6DC] text-[#1F2B3A] border-[#1F2B3A]/10 hover:border-[#1F2B3A]/40'
                    }`}
                  >
                    <p className="font-semibold">No Preference</p>
                    <p className="text-[10px] opacity-75">First Available</p>
                  </button>

                  {ARTISTS.map((artist) => (
                    <button
                      key={artist.id}
                      type="button"
                      onClick={() => setSelectedArtist(artist.id)}
                      className={`p-3 text-xs text-left border transition-colors cursor-pointer ${
                        selectedArtist === artist.id
                          ? 'bg-[#1F2B3A] text-[#EDE6DC] border-[#1F2B3A]'
                          : 'bg-[#EDE6DC] text-[#1F2B3A] border-[#1F2B3A]/10 hover:border-[#1F2B3A]/40'
                      }`}
                    >
                      <p className="font-semibold">{artist.name}</p>
                      <p className="text-[10px] opacity-75">{artist.role}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Service Selection */}
              <div className="space-y-2">
                <label htmlFor="service-select" className="text-xs font-semibold uppercase tracking-wider text-[#1F2B3A]">
                  Select Service
                </label>
                <select
                  id="service-select"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full p-3.5 bg-[#EDE6DC] border border-[#1F2B3A]/20 text-xs font-medium text-[#1F2B3A] focus:outline-none focus:border-[#A87C4F]"
                >
                  <optgroup label="Hair Services (The Chair)">
                    {SERVICES.filter((s) => s.category.includes('hair')).map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.durationMin} mins · PKR {s.pricePKR.toLocaleString()})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Beard & Shave (The Grooming Room)">
                    {SERVICES.filter((s) => s.category === 'grooming' || s.category === 'package').map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.durationMin} mins · PKR {s.pricePKR.toLocaleString()})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Nail & Hand Studio">
                    {SERVICES.filter((s) => s.category === 'nails').map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.durationMin} mins · PKR {s.pricePKR.toLocaleString()})
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="full-name" className="text-xs font-semibold uppercase tracking-wider text-[#1F2B3A]">
                    Full Name *
                  </label>
                  <input
                    id="full-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Bilal Tareen"
                    className="w-full p-3 bg-[#EDE6DC] border border-[#1F2B3A]/20 text-xs text-[#1F2B3A] focus:outline-none focus:border-[#A87C4F]"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone-number" className="text-xs font-semibold uppercase tracking-wider text-[#1F2B3A]">
                    WhatsApp / Phone *
                  </label>
                  <input
                    id="phone-number"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="03XX-XXXXXXX"
                    className="w-full p-3 bg-[#EDE6DC] border border-[#1F2B3A]/20 text-xs text-[#1F2B3A] focus:outline-none focus:border-[#A87C4F]"
                  />
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="booking-date" className="text-xs font-semibold uppercase tracking-wider text-[#1F2B3A]">
                    Preferred Date
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-3 bg-[#EDE6DC] border border-[#1F2B3A]/20 text-xs text-[#1F2B3A] focus:outline-none focus:border-[#A87C4F]"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="booking-time" className="text-xs font-semibold uppercase tracking-wider text-[#1F2B3A]">
                    Preferred Time Slot
                  </label>
                  <select
                    id="booking-time"
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full p-3 bg-[#EDE6DC] border border-[#1F2B3A]/20 text-xs text-[#1F2B3A] focus:outline-none focus:border-[#A87C4F]"
                  >
                    <option value="11:30">11:30 AM (Morning Calm)</option>
                    <option value="12:30">12:30 PM (Mid-Day)</option>
                    <option value="14:00">02:00 PM (Quiet Window)</option>
                    <option value="15:30">03:30 PM (Afternoon)</option>
                    <option value="17:00">05:00 PM (Transition)</option>
                    <option value="18:30">06:30 PM (Evening)</option>
                    <option value="19:30">07:30 PM (Boulevard Peak)</option>
                    <option value="20:15">08:15 PM (Final Session)</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <label htmlFor="special-notes" className="text-xs font-semibold uppercase tracking-wider text-[#1F2B3A]">
                  Special Requests or Hair History
                </label>
                <textarea
                  id="special-notes"
                  rows={3}
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="e.g. Fixing a previous fade, attending wedding event tomorrow, sensitive neck skin..."
                  className="w-full p-3 bg-[#EDE6DC] border border-[#1F2B3A]/20 text-xs text-[#1F2B3A] focus:outline-none focus:border-[#A87C4F]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#1F2B3A] text-[#EDE6DC] hover:bg-[#A87C4F] transition-colors text-xs font-semibold uppercase tracking-widest cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? 'Submitting Reservation Request...' : 'Submit Reservation Request'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3. Embedded Map & Boulevard Landmark Guidance */}
      <section className="hairline-border-t pt-12 space-y-8">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#A87C4F] font-semibold">
            Physical Orientation
          </span>
          <h3 className="font-serif text-3xl text-[#1F2B3A] mt-1">
            Navigating to MM Alam Road
          </h3>
        </div>

        <div className="bg-[#F7F3ED] border border-[#1F2B3A]/10 p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-serif text-2xl text-[#1F2B3A]">59-B-3 MM Alam Road</span>
              <span className="text-xs font-mono text-[#A87C4F]">Gulberg III</span>
            </div>
            <p className="text-xs sm:text-sm text-[#1F2B3A]/80 leading-relaxed">
              We are located on the main MM Alam Road boulevard, directly opposite <strong>Butlers Chocolate Cafe</strong> and adjacent to the retail precinct between Hussain Chowk and Mini Market. 
            </p>
            <div className="space-y-2 text-xs font-mono text-[#1F2B3A]/70">
              <p>• From Hussain Chowk: Drive 400m north down MM Alam Road; we are on the left.</p>
              <p>• From Mini Market: Drive 500m south; look for our warm stone facade opposite Butlers.</p>
              <p>• Complimentary Valet: Pull up directly in front of the building; our valet attendant will park your car.</p>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#EDE6DC] border border-[#1F2B3A]/20 p-6 text-center space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#A87C4F] block">
              Google Maps Pin Reference
            </span>
            <div className="font-serif text-lg text-[#1F2B3A]">
              Paragon Salon Gulberg
            </div>
            <p className="text-xs text-[#1F2B3A]/60 font-mono">
              31°30'45.4"N 74°21'14.8"E · Lahore
            </p>
            <a
              href="https://maps.google.com/?q=59-B-3+MM+Alam+Road+Gulberg+III+Lahore"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2.5 bg-[#1F2B3A] text-[#EDE6DC] text-xs font-semibold uppercase tracking-wider hover:bg-[#A87C4F] transition-colors cursor-pointer"
            >
              Open in Google Maps ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
