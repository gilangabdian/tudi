'use client';

import React from 'react';
import { CardData } from '@/types/card';
import { PRESET_AVATARS } from '@/lib/constants';

interface EventPassCardProps {
  card: CardData;
  isBack?: boolean;
}

export default function EventPassCard({ card, isBack = false }: EventPassCardProps) {
  const currentAvatar = PRESET_AVATARS.find((a) => a.id === card.photoPresetId) || PRESET_AVATARS[0];

  return (
    <div
      className={`relative w-[320px] h-[480px] rounded-2xl border-[3.5px] border-[#261F36] shadow-[6px_6px_0px_#261F36] p-5 select-none overflow-hidden transition-all duration-300 font-['Patrick_Hand'] flex flex-col justify-between ${
        card.pattern === 'dots'
          ? 'pattern-dots'
          : card.pattern === 'grid'
          ? 'pattern-grid'
          : 'bg-[#FAF7F0]'
      }`}
      style={{
        backgroundColor: card.cardBgColor || '#FAF7F0',
        color: card.bodyTextColor || '#1A1A1A',
      }}
    >
      {/* Top Punch Hole for Lanyard Clip */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-3.5 bg-white border-2 border-[#261F36] rounded-full shadow-inner z-20" />

      {!isBack ? (
        /* FRONT SIDE */
        <div className="relative z-10 flex flex-col h-full justify-between pt-3">
          {/* Event Header */}
          <div className="text-center">
            <h1
              className="text-2xl font-black uppercase font-['Fredoka'] tracking-wider leading-tight"
              style={{ color: card.themeColor }}
            >
              {card.eventName || card.title || 'TUDI FEST 2026'}
            </h1>
            <p className="text-xs font-bold text-gray-600 font-['Space_Mono'] mt-0.5">
              {card.eventDate || 'OCTOBER 30, 2026'}
            </p>
          </div>

          {/* Bold VIP Tier Banner */}
          <div className="my-1">
            <div
              className="w-full py-1.5 px-3 rounded-xl border-2 border-[#261F36] text-white text-center font-black tracking-widest font-['Fredoka'] text-lg shadow-[3px_3px_0px_#261F36]"
              style={{ backgroundColor: card.themeColor }}
            >
              ★ {card.accessTier || 'VIP ACCESS'} ★
            </div>
          </div>

          {/* Attendee Photo Frame */}
          <div className="flex justify-center my-auto">
            <div
              className={`w-[125px] h-[145px] rounded-xl border-[2.5px] border-[#261F36] bg-[#6A5495]/15 overflow-hidden shadow-[4px_4px_0px_#261F36] relative flex items-center justify-center ${
                card.photoFilter === 'comic'
                  ? 'contrast-125 saturate-150'
                  : card.photoFilter === 'sketch'
                  ? 'grayscale contrast-150'
                  : ''
              }`}
            >
              {card.photoUrl ? (
                <img src={card.photoUrl} alt="Event Attendee" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: currentAvatar.svg }} />
              )}
            </div>
          </div>

          {/* Name & Venue */}
          <div className="text-center space-y-0.5">
            <h2 className="text-2xl font-black uppercase text-[#261F36] leading-none">
              {`${card.firstName} ${card.lastName}`.trim() || 'SPECIAL GUEST'}
            </h2>
            <p className="text-xs font-bold text-gray-700">
              Venue: {card.venue || 'Main Stage A • Gate 4'}
            </p>
          </div>

          {/* Ticket Barcode */}
          <div className="border-t-2 border-[#261F36] pt-2 flex flex-col items-center gap-1">
            <div className="flex items-center gap-1 h-7">
              {[5, 2, 4, 1, 3, 5, 2, 4, 1, 3, 5, 2, 4, 1, 5, 3, 2, 4].map((h, i) => (
                <div
                  key={i}
                  className="w-[2.5px] bg-[#261F36] rounded-full"
                  style={{ height: `${h * 4}px` }}
                />
              ))}
            </div>
            <span className="text-[10px] font-['Space_Mono'] font-bold tracking-widest">
              TKT-{card.idNumber || 'VIP-999-TUDI'}
            </span>
          </div>
        </div>
      ) : (
        /* BACK SIDE */
        <div className="relative z-10 flex flex-col h-full justify-between pt-3 text-center">
          <div className="border-b-2 border-[#261F36] pb-2">
            <h2 className="text-lg font-black uppercase font-['Fredoka']" style={{ color: card.themeColor }}>
              EVENT GUIDELINES
            </h2>
          </div>

          <div className="my-auto space-y-2 text-xs text-gray-700 px-2 text-left">
            <p>• Pass ini memberikan akses masuk ke semua lounge 2D.</p>
            <p>• Tunjukkan kartu ini kepada penjaga pintu kartun.</p>
            <p>• Termasuk free refill snack & teh boba selama acara.</p>
          </div>

          <div className="border-t-2 border-[#261F36] pt-2 text-center text-xs font-['Space_Mono']">
            NON-TRANSFERABLE PASS
          </div>
        </div>
      )}
    </div>
  );
}

