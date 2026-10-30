'use client';

import React from 'react';
import { CardData } from '@/types/card';

interface SlotRailProps {
  currentSlotIndex: number; // 0 to 9
  slotsData: Record<number, CardData | null>;
  onSelectSlot: (index: number) => void;
}

export default function SlotRail({
  currentSlotIndex,
  slotsData,
  onSelectSlot,
}: SlotRailProps) {
  return (
    <aside
      aria-label="Save Slots"
      className="fixed right-1.5 sm:right-2.5 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-1.5 p-1"
    >
      {[...Array(10)].map((_, i) => {
        const slotNumber = i + 1;
        const isActive = currentSlotIndex === i;
        const savedCard = slotsData[i];

        // Progressive fade for slots 1-4.
        // Slots 5-10 are opacity-0 by default, and ONLY reveal when user hovers directly on that specific button!
        let baseOpacityClass = 'opacity-0 hover:!opacity-100';
        if (i === 0) {
          baseOpacityClass = 'opacity-100';
        } else if (i === 1) {
          baseOpacityClass = 'opacity-50';
        } else if (i === 2) {
          baseOpacityClass = 'opacity-25';
        } else if (i === 3) {
          baseOpacityClass = 'opacity-10';
        }

        const tooltipText = `Save Slot ${slotNumber}${
          savedCard?.firstName ? ` • ${savedCard.firstName} ${savedCard.lastName || ''}`.trim() : ''
        }`;

        return (
          <div key={slotNumber} className="relative group/slot">
            {/* Slot Square Button */}
            <button
              type="button"
              onClick={() => onSelectSlot(i)}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl font-['Space_Mono'] font-bold text-xs flex items-center justify-center transition-all duration-150 hover:!opacity-100 hover:scale-105 ${baseOpacityClass} ${
                isActive
                  ? 'bg-[#6A5495] text-white border border-[#6A5495] !opacity-100 shadow-sm'
                  : 'bg-white/85 text-[#2D3748] border border-gray-300 hover:border-[#6A5495]'
              }`}
            >
              {slotNumber}
            </button>

            {/* Simple Clean Tooltip on Individual Slot Hover */}
            <div className="absolute right-10 sm:right-11 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 translate-x-1 group-hover/slot:opacity-100 group-hover/slot:translate-x-0 transition-all duration-150 z-50 whitespace-nowrap">
              <div className="bg-[#2D3748] text-white text-[11px] font-['Fredoka'] font-bold px-2.5 py-1 rounded-lg shadow-md">
                {tooltipText}
              </div>
            </div>
          </div>
        );
      })}
    </aside>
  );
}
