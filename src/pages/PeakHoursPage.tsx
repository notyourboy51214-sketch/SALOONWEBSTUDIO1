import React, { useState } from 'react';
import { PageId } from '../types';
import { PEAK_HOURS_DATA, SALON_INFO } from '../data/salonData';

interface PeakHoursPageProps {
  onNavigate: (page: PageId) => void;
}

export const PeakHoursPage: React.FC<PeakHoursPageProps> = ({ onNavigate }) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(1); // Default Tuesday (The Serene Day)
  const currentDayData = PEAK_HOURS_DATA[selectedDayIndex];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 space-y-20">
      {/* 1. Page Header */}
      <div className="space-y-4 max-w-4xl">
        <div className="flex items-center gap-3 text-xs tracking-widest uppercase text-[#A87C4F] font-semibold">
          <span>Chapter 08</span>
          <span>·</span>
          <span>Scheduling Intelligence</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#1F2B3A] tracking-tight text-balance">
          Peak Hours & Visiting Tips
        </h1>
        <p className="text-base sm:text-lg text-[#1F2B3A]/80 leading-relaxed max-w-3xl">
          MM Alam Road follows distinct weekly rhythms. Use our popular-times data to pick the exact atmosphere you prefer—whether a tranquil mid-day espresso session or an energetic pre-weekend transformation.
        </p>
      </div>

      {/* 2. Owner-Client Synergy Manifesto */}
      <div className="bg-[#F7F3ED] border-l-2 border-[#A87C4F] p-8 space-y-4">
        <h2 className="font-serif text-2xl text-[#1F2B3A]">
          Why We Publish Our Live Hourly Rhythm
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-[#1F2B3A]/80 leading-relaxed">
          <p>
            <strong>For the Patron:</strong> You deserve an unhurried chair experience without unexpected waiting in the lounge. If your schedule allows weekday mornings, you experience an almost private studio feel with Adeel, Rohit, or Jiya.
          </p>
          <p>
            <strong>For the Atelier:</strong> Smoothing appointments across the week allows our senior artists to maintain peak artistic focus on every single cut and straight-razor shave without fatigue.
          </p>
        </div>
      </div>

      {/* 3. Interactive Day-by-Day Traffic Matrix */}
      <div className="space-y-8 hairline-border-t pt-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#A87C4F] font-semibold">
              Weekly Timeline
            </span>
            <h3 className="font-serif text-3xl text-[#1F2B3A] mt-1">
              Popular Times by Day
            </h3>
          </div>

          {/* Day Selector Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {PEAK_HOURS_DATA.map((day, idx) => (
              <button
                key={day.dayName}
                onClick={() => setSelectedDayIndex(idx)}
                className={`px-3 py-2 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap ${
                  selectedDayIndex === idx
                    ? 'bg-[#1F2B3A] text-[#EDE6DC] font-semibold'
                    : 'bg-[#F7F3ED] text-[#1F2B3A]/70 hover:text-[#1F2B3A] border border-[#1F2B3A]/10'
                }`}
              >
                {day.shortDay}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Day Traffic Breakdown Card */}
        <div className="bg-[#F7F3ED] border border-[#1F2B3A]/10 p-8 space-y-8">
          <div className="flex items-center justify-between hairline-border-b pb-4">
            <div>
              <h4 className="font-serif text-2xl text-[#1F2B3A]">{currentDayData.dayName} at Paragon</h4>
              <p className="text-xs text-[#1F2B3A]/60 font-mono">11:00 AM – 9:00 PM Operating Hours</p>
            </div>
            <span className="text-xs font-mono text-[#A87C4F] font-semibold uppercase tracking-wider">
              Gulberg III Flow
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {currentDayData.hours.map((hour, i) => (
              <div
                key={i}
                className="bg-[#EDE6DC]/70 border border-[#1F2B3A]/10 p-5 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-base text-[#1F2B3A] font-semibold">
                      {hour.hourLabel}
                    </span>
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border ${
                        hour.trafficLevel === 'quiet'
                          ? 'text-emerald-800 bg-emerald-100/60 border-emerald-300'
                          : hour.trafficLevel === 'moderate'
                          ? 'text-amber-800 bg-amber-100/60 border-amber-300'
                          : 'text-rose-800 bg-rose-100/60 border-rose-300'
                      }`}
                    >
                      {hour.trafficLevel}
                    </span>
                  </div>

                  {/* Visual Occupancy Bar */}
                  <div className="w-full bg-[#1F2B3A]/10 h-1.5 mt-3 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        hour.trafficLevel === 'quiet'
                          ? 'bg-emerald-600'
                          : hour.trafficLevel === 'moderate'
                          ? 'bg-amber-600'
                          : 'bg-rose-600'
                      }`}
                      style={{ width: `${hour.occupancyPercent}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-[#1F2B3A]/50 mt-1 block">
                    {hour.occupancyPercent}% Average Chair Occupancy
                  </span>

                  <p className="text-xs text-[#1F2B3A]/80 mt-3 leading-relaxed">
                    {hour.tip}
                  </p>
                </div>

                <button
                  onClick={() => onNavigate('reserve')}
                  className="w-full py-2 bg-[#1F2B3A]/10 hover:bg-[#1F2B3A] hover:text-[#EDE6DC] text-[#1F2B3A] text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer text-center"
                >
                  Book This Slot
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. MM Alam Road Visiting Logistics & Valet Advice */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 hairline-border-t pt-12">
        <div className="space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#A87C4F] font-semibold">
            Tip 01 · Parking & Arrival
          </span>
          <h4 className="font-serif text-xl text-[#1F2B3A]">Valet Opposite Butlers</h4>
          <p className="text-xs text-[#1F2B3A]/75 leading-relaxed">
            MM Alam Road parking can be competitive in the evenings. We provide complimentary valet service directly outside our entrance at 59-B-3. Hand your keys to our attendant and proceed straight upstairs.
          </p>
        </div>

        <div className="space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#A87C4F] font-semibold">
            Tip 02 · The 10-Minute Buffer
          </span>
          <h4 className="font-serif text-xl text-[#1F2B3A]">Unhurried Welcome</h4>
          <p className="text-xs text-[#1F2B3A]/75 leading-relaxed">
            Arriving 10 minutes prior to your booking allows you to enjoy our complimentary green tea or espresso, rinse off street dust, and conduct an unhurried consultation with your artist.
          </p>
        </div>

        <div className="space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#A87C4F] font-semibold">
            Tip 03 · Weekend Protocol
          </span>
          <h4 className="font-serif text-xl text-[#1F2B3A]">Thursday Advance Lock</h4>
          <p className="text-xs text-[#1F2B3A]/75 leading-relaxed">
            Friday, Saturday, and Sunday evening slots for Senior Artist Rohit and Adeel consistently book out by Thursday 6 PM. We recommend reserving via WhatsApp at least 48 hours in advance.
          </p>
        </div>
      </div>
    </div>
  );
};
