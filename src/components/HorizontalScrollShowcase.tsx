import React, { useRef, useState, useEffect } from 'react';

interface HorizontalScrollShowcaseProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  countLabel?: string;
  actionButton?: React.ReactNode;
}

export const HorizontalScrollShowcase: React.FC<HorizontalScrollShowcaseProps> = ({
  children,
  title,
  subtitle,
  countLabel,
  actionButton
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const checkScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const offset = containerRef.current.clientWidth * 0.75;
    containerRef.current.scrollBy({
      left: direction === 'left' ? -offset : offset,
      behavior: 'smooth'
    });
  };

  // Mouse drag functionality for desktop editorial feel
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeftState(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeftState - walk;
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full relative group">
      {/* Header Bar with Editorial Title & Horizontal Controls */}
      {(title || subtitle || countLabel) && (
        <div className="max-w-7xl mx-auto px-6 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            {subtitle && (
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#A87C4F] font-semibold mb-1">
                {subtitle}
              </p>
            )}
            {title && (
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1F2B3A] tracking-tight">
                {title}
              </h3>
            )}
          </div>

          <div className="flex items-center gap-4">
            {countLabel && (
              <span className="text-xs font-mono text-[#1F2B3A]/60">
                {countLabel}
              </span>
            )}
            {actionButton}

            {/* Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                aria-label="Previous Lookbook Item"
                className={`w-9 h-9 rounded-full border border-[#1F2B3A]/20 flex items-center justify-center text-sm transition-colors cursor-pointer ${
                  canScrollLeft
                    ? 'text-[#1F2B3A] hover:bg-[#1F2B3A] hover:text-[#EDE6DC] border-[#1F2B3A]'
                    : 'text-[#1F2B3A]/20 border-[#1F2B3A]/10 cursor-not-allowed'
                }`}
              >
                ←
              </button>
              <button
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                aria-label="Next Lookbook Item"
                className={`w-9 h-9 rounded-full border border-[#1F2B3A]/20 flex items-center justify-center text-sm transition-colors cursor-pointer ${
                  canScrollRight
                    ? 'text-[#1F2B3A] hover:bg-[#1F2B3A] hover:text-[#EDE6DC] border-[#1F2B3A]'
                    : 'text-[#1F2B3A]/20 border-[#1F2B3A]/10 cursor-not-allowed'
                }`}
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Horizontal Scroll Track */}
      <div
        ref={containerRef}
        onScroll={checkScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        className={`horizontal-scroll-container flex gap-6 px-6 sm:px-12 py-2 overflow-x-auto select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
      >
        {children}
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-3 flex items-center justify-between text-[11px] text-[#1F2B3A]/50 font-mono">
        <span>← Drag or swipe horizontally to browse →</span>
        <span className="hidden sm:inline">MM Alam Atelier Lookbook</span>
      </div>
    </div>
  );
};
