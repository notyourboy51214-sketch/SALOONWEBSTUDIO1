import React, { useState } from 'react';

interface EditorialVisualProps {
  type:
    | 'interior'
    | 'scissor-cut'
    | 'grooming-ritual'
    | 'nail-studio'
    | 'transformation-exec'
    | 'transformation-fade'
    | 'transformation-classic'
    | 'building-facade';
  title?: string;
  subtitle?: string;
  className?: string;
  aspect?: '16:9' | '4:3' | '3:4' | '1:1';
  imageSrc?: string;
}

const DEFAULT_IMAGE_MAP: Record<string, string> = {
  interior: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1600&q=80',
  'scissor-cut': 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1200&q=80',
  'grooming-ritual': 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=80',
  'nail-studio': 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1200&q=80',
  'transformation-exec': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80',
  'transformation-fade': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80',
  'transformation-classic': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=80',
  'building-facade': 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80'
};

export const EditorialVisual: React.FC<EditorialVisualProps> = ({
  type,
  title,
  subtitle,
  className = '',
  aspect = '4:3',
  imageSrc
}) => {
  const [imgError, setImgError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const targetSrc = imageSrc || DEFAULT_IMAGE_MAP[type];

  const aspectClass =
    aspect === '16:9'
      ? 'aspect-[16/9]'
      : aspect === '3:4'
      ? 'aspect-[3/4]'
      : aspect === '1:1'
      ? 'aspect-square'
      : 'aspect-[4/3]';

  // If a real imageSrc or default photography exists and hasn't errored
  if (targetSrc && !imgError) {
    return (
      <div className={`relative overflow-hidden bg-[#E2D9CD] ${aspectClass} ${className} border border-[#1F2B3A]/15 group`}>
        <img
          src={targetSrc}
          alt={title || 'Paragon Salon Gulberg'}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setImgError(true)}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
            loaded ? 'opacity-100 filter brightness-[0.92] contrast-[1.04]' : 'opacity-0'
          }`}
        />

        {/* Warm editorial tint overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F2B3A]/70 via-[#1F2B3A]/15 to-transparent pointer-events-none" />

        {/* Editorial Title / Subtitle Overlay */}
        {(title || subtitle) && (
          <div className="absolute bottom-4 left-4 right-4 pointer-events-none z-10 space-y-1">
            {subtitle && (
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#EDE6DC]/90 font-mono font-medium drop-shadow-sm">
                {subtitle}
              </p>
            )}
            {title && (
              <h4 className="text-sm sm:text-base font-serif text-[#EDE6DC] leading-snug drop-shadow-md">
                {title}
              </h4>
            )}
          </div>
        )}
      </div>
    );
  }

  // Fallback Handcrafted Editorial Vector Graphics
  return (
    <div
      className={`relative overflow-hidden bg-[#DFD6C9] ${aspectClass} ${className} border border-[#1F2B3A]/10 select-none group`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#EDE6DC] via-[#E4DACE] to-[#D5C9BA] p-6 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#A87C4F] font-semibold">
            Paragon Salon · MM Alam Rd
          </span>
          <span className="text-[10px] font-mono text-[#1F2B3A]/40">ATELIER CRAFT</span>
        </div>

        <div className="relative h-36 w-full flex items-center justify-center my-auto">
          <div className="w-24 h-36 rounded-t-full border-2 border-[#A87C4F] bg-gradient-to-b from-[#FFFDF9] to-[#DDCFBF] shadow-md flex flex-col items-center justify-end p-3">
            <div className="w-14 h-16 rounded-t-xl bg-[#8A5A36]/80 border-t-2 border-[#A87C4F]" />
            <div className="w-2 h-4 bg-[#A87C4F]" />
            <div className="w-12 h-2 bg-[#1F2B3A]/80 rounded-full" />
          </div>
        </div>

        <div className="hairline-border-t pt-3 flex items-center justify-between">
          <span className="text-xs font-serif italic text-[#1F2B3A]/80">
            {title || 'MM Alam Road, Gulberg III'}
          </span>
          <span className="text-[10px] tracking-wider uppercase text-[#A87C4F] font-semibold">
            {subtitle || 'Natural Daylight'}
          </span>
        </div>
      </div>
    </div>
  );
};
