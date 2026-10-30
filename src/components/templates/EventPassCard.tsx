'use client';

import React from 'react';
import { CardData } from '@/types/card';
import { PRESET_AVATARS } from '@/lib/constants';

interface EventPassCardProps {
  card: CardData;
  isBack?: boolean;
}

export default function EventPassCard({ card, isBack = false }: EventPassCardProps) {
  const currentAvatar =
    PRESET_AVATARS.find((a) => a.id === card.photoPresetId) || PRESET_AVATARS[0];

  return (
    <div
      className={`relative w-[320px] h-[480px] rounded-2xl border-[3.5px] border-[#261F36] shadow-sm p-5 select-none overflow-hidden transition-all duration-300 font-['Patrick_Hand'] flex flex-col justify-between ${
        card.pattern === 'dots'
          ? 'pattern-dots'
          : card.pattern === 'grid'
          ? 'pattern-grid'
          : ''
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
              className="w-full py-1.5 px-3 rounded-xl border-2 border-[#261F36] text-white text-center font-black tracking-widest font-['Fredoka'] text-lg shadow-xs"
              style={{ backgroundColor: card.themeColor }}
            >
              ★ {card.accessTier || 'VIP ACCESS'} ★
            </div>
          </div>

          {/* Attendee Photo Frame */}
          <div className="flex justify-center my-auto">
            <div
              className={`w-[125px] h-[145px] rounded-xl border-[2.5px] border-[#261F36] bg-white overflow-hidden shadow-xs relative flex items-center justify-center ${
                card.photoFilter === 'comic'
                  ? 'contrast-125 saturate-150'
                  : card.photoFilter === 'sketch'
                  ? 'grayscale contrast-150'
                  : ''
              }`}
            >
              {card.photoUrl ? (
                <img
                  src={card.photoUrl}
                  alt="Event Attendee"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full [&>svg]:w-full [&>svg]:h-full [&>svg]:block"
                  dangerouslySetInnerHTML={{ __html: currentAvatar.svg }}
                />
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

            {/* Signature */}
            <div className="w-[110px] mx-auto h-[22px] flex items-center justify-center border-b border-[#261F36]/30">
              {card.signatureType !== 'type' && card.signatureDataUrl ? (
                <img src={card.signatureDataUrl} alt="Signature" className="max-h-[20px] max-w-full object-contain" />
              ) : (
                <span className="font-['Caveat'] text-lg font-bold leading-none text-[#261F36]">
                  {card.signatureText || `${card.firstName || 'Guest'}`}
                </span>
              )}
            </div>
          </div>

          {/* Stamps if selected */}
          {card.stamps && card.stamps.length > 0 && (
            <div className="flex justify-center gap-2 py-0.5">
              {card.stamps.includes('verified') && (
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-blue-50 border border-blue-400 text-blue-700 text-[9px] font-black rounded-md uppercase tracking-wider">
                  ★ Verified
                </span>
              )}
              {card.stamps.includes('approved') && (
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-green-50 border border-green-400 text-green-700 text-[9px] font-black rounded-md uppercase tracking-wider">
                  ✓ Approved
                </span>
              )}
              {card.stamps.includes('pawprint') && (
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-purple-50 border border-purple-400 text-purple-700 text-[9px] font-black rounded-md uppercase tracking-wider">
                  🐾 Paw
                </span>
              )}
            </div>
          )}

          {/* Ticket Barcode */}
          <div className="border-t-2 border-[#261F36] pt-1 flex flex-col items-center gap-0.5">
            <div className="flex items-center gap-1 h-6">
              {[5, 2, 4, 1, 3, 5, 2, 4, 1, 3, 5, 2, 4, 1, 5, 3, 2, 4].map((h, i) => (
                <div
                  key={i}
                  className="w-[2.5px] bg-[#261F36] rounded-full"
                  style={{ height: `${h * 3.5}px` }}
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
            <h2
              className="text-lg font-black uppercase font-['Fredoka']"
              style={{ color: card.themeColor }}
            >
              EVENT GUIDELINES
            </h2>
          </div>

          <div className="my-auto space-y-2 text-xs text-gray-700 px-2 text-left">
            <p>• This pass grants full admission to all 2D lounges.</p>
            <p>• Present this badge to the cartoon gatekeeper at entry.</p>
            <p>• Includes complimentary snack refills and boba drinks.</p>
          </div>

          <div className="border-t-2 border-[#261F36] pt-2 text-center text-xs font-['Space_Mono']">
            NON-TRANSFERABLE PASS
          </div>
        </div>
      )}
    </div>
  );
}
