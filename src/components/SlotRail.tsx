'use client';

import React from 'react';
import { CardData } from '@/types/card';

interface SlotRailProps {
  currentSlotIndex: number; // 0 to 9 (corresponds to slots 1 to 10)
  slotsData: Record<number, CardData | null>;
  onSelectSlot: (index: number) => void;
}

export default function SlotRail({
  currentSlotIndex,
  slotsData,
  onSelectSlot,
}: SlotRailProps) {
  // Pre-calculated progressive fading opacities for slots 1 to 10
  const baseOpacities = [1.0, 0.85, 0.72, 0.58, 0.46, 0.36, 0.28, 0.22, 0.17, 0.14];

  return (
    <aside
      aria-label="Save Slots"
      className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-1.5 p-1.5 rounded-2xl bg-white/70 backdrop-blur-md border border-[#261F36]/20 shadow-sm"
    >
      <div className="text-[9px] font-['Space_Mono'] font-bold text-gray-400 uppercase tracking-tighter pb-0.5 select-none">
        SLOTS
      </div>

      {[...Array(10)].map((_, i) => {
        const slotNumber = i + 1;
        const isActive = currentSlotIndex === i;
        const savedCard = slotsData[i];
        const hasData = Boolean(savedCard);

        // Active slot is always 100% opacity; otherwise use progressive fade
        const normalOpacity = isActive ? 1.0 : baseOpacities[i];

        const cardTitle = savedCard
          ? `${savedCard.firstName} ${savedCard.lastName}`.trim() || savedCard.title || 'Untitled Card'
          : `Slot ${slotNumber} (Empty)`;

        const templateName = savedCard?.template
          ? savedCard.template.replace('-', ' ').toUpperCase()
          : 'NEW DRAFT';

        return (
          <div key={slotNumber} className="relative group">
            {/* Slot Button */}
            <button
              type="button"
              onClick={() => onSelectSlot(i)}
              style={{ opacity: normalOpacity }}
              className={`w-9 h-9 rounded-xl border-2 font-['Space_Mono'] font-bold text-xs flex items-center justify-center transition-all duration-200 group-hover:!opacity-100 group-hover:scale-105 ${
                isActive
                  ? 'bg-[#6A5495] text-white border-[#261F36] ring-2 ring-[#6A5495]/20 shadow-xs'
                  : hasData
                  ? 'bg-gray-100 text-[#261F36] border-[#261F36]/60 hover:border-[#6A5495] hover:bg-white'
                  : 'bg-white/80 text-gray-400 border-gray-300 hover:border-[#6A5495] hover:text-[#261F36]'
              }`}
            >
              {slotNumber}
            </button>

            {/* Left-Floating Tooltip on Hover */}
            <div className="absolute right-12 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 z-50 whitespace-nowrap">
              <div className="bg-[#261F36] text-white text-xs px-3 py-1.5 rounded-xl shadow-lg border border-[#3D3352] flex flex-col items-start gap-0.5">
                <div className="flex items-center gap-1.5 text-[10px] text-gray-300 font-['Space_Mono']">
                  <span className="font-bold text-[#FFEAA7]">SLOT #{slotNumber}</span>
                  <span>•</span>
                  <span className="text-gray-400">{templateName}</span>
                </div>
                <div className="font-bold font-['Fredoka'] text-sm tracking-wide text-white">
                  {cardTitle}
                </div>
                <div className="text-[9px] text-gray-400 font-['Patrick_Hand']">
                  {isActive ? '● Currently Editing' : hasData ? 'Click to load card' : 'Click to start new card'}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </aside>
  );
}

