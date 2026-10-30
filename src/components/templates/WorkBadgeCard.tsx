'use client';

import React from 'react';
import { CardData } from '@/types/card';
import { PRESET_AVATARS } from '@/lib/constants';

interface WorkBadgeCardProps {
  card: CardData;
  isBack?: boolean;
}

export default function WorkBadgeCard({ card, isBack = false }: WorkBadgeCardProps) {
  const currentAvatar = PRESET_AVATARS.find((a) => a.id === card.photoPresetId) || PRESET_AVATARS[0];

  // Vertical Badge dimensions: 320px x 480px
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
          {/* Company Brand Header */}
          <div className="text-center border-b-2 border-[#261F36] pb-2">
            <h1
              className="text-2xl font-black uppercase font-['Fredoka'] tracking-wider"
              style={{ color: card.themeColor }}
            >
              {card.companyName || card.title || 'ACME CORP'}
            </h1>
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-600 font-['Space_Mono']">
              {card.subtitle || 'STAFF IDENTIFICATION'}
            </p>
          </div>

          {/* Photo Frame */}
          <div className="flex justify-center my-auto">
            <div
              className={`w-[130px] h-[150px] rounded-xl border-[2.5px] border-[#261F36] bg-[#6A5495]/10 overflow-hidden shadow-[4px_4px_0px_#261F36] relative flex items-center justify-center ${
                card.photoFilter === 'comic'
                  ? 'contrast-125 saturate-150'
                  : card.photoFilter === 'sketch'
                  ? 'grayscale contrast-150'
                  : ''
              }`}
            >
              {card.photoUrl ? (
                <img src={card.photoUrl} alt="Staff ID" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: currentAvatar.svg }} />
              )}
            </div>
          </div>

          {/* Employee Name & Job Info */}
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-black uppercase tracking-wide text-[#261F36]">
              {`${card.firstName} ${card.lastName}`.trim() || 'CREATIVE MEMBER'}
            </h2>

            <div
              className="inline-block px-3 py-0.5 rounded-full border-2 border-[#261F36] text-white font-bold text-xs uppercase shadow-[2px_2px_0px_#261F36]"
              style={{ backgroundColor: card.themeColor }}
            >
              {card.jobTitle || 'Snack Operations Lead'}
            </div>

            <p className="text-xs text-gray-600 font-semibold">
              Dept: {card.department || 'Creative Development'}
            </p>
          </div>

          {/* Barcode & ID Number */}
          <div className="border-t-2 border-[#261F36] pt-2 flex flex-col items-center gap-1">
            <div className="flex items-center gap-1 h-7">
              {[3, 1, 4, 2, 5, 1, 4, 2, 3, 5, 2, 4, 1, 3, 5, 2, 4].map((h, i) => (
                <div
                  key={i}
                  className="w-[2.5px] bg-[#261F36] rounded-full"
                  style={{ height: `${h * 4}px` }}
                />
              ))}
            </div>
            <span className="text-[11px] font-['Space_Mono'] font-bold tracking-widest">
              {card.idNumber || 'EMP-2026-981'}
            </span>
          </div>
        </div>
      ) : (
        /* BACK SIDE */
        <div className="relative z-10 flex flex-col h-full justify-between pt-3">
          <div className="text-center border-b-2 border-[#261F36] pb-2">
            <h2 className="text-lg font-black uppercase font-['Fredoka']" style={{ color: card.themeColor }}>
              SECURITY & ACCESS
            </h2>
          </div>

          <div className="my-auto space-y-3 text-center">
            {/* 2D QR Code */}
            <div className="w-28 h-28 mx-auto border-2 border-[#261F36] rounded-xl p-1.5 bg-white shadow-[3px_3px_0px_#261F36] flex flex-wrap gap-1 justify-center items-center">
              {[...Array(16)].map((_, idx) => (
                <div
                  key={idx}
                  className={`w-5 h-5 rounded-xs ${
                    [0, 2, 3, 5, 6, 9, 10, 12, 15].includes(idx) ? 'bg-[#261F36]' : 'bg-transparent'
                  }`}
                />
              ))}
            </div>

            <p className="text-xs text-gray-600 italic px-3">
              If found, please return to the nearest coffee machine or refrigerator.
            </p>

            <div className="border border-[#261F36]/30 p-2 rounded-lg bg-white/60 text-xs">
              <span className="block font-bold">EMERGENCY:</span>
              <span className="font-['Space_Mono'] text-[11px]">tudi-hq-support@2d.id</span>
            </div>
          </div>

          <div className="border-t-2 border-[#261F36] pt-1 text-center text-xs font-['Space_Mono']">
            AUTHORIZED BADGE
          </div>
        </div>
      )}

      {card.stamps.includes('verified') && (
        <div className="absolute bottom-16 right-4 rotate-12 pointer-events-none border-2 border-[#6A5495] text-[#6A5495] px-2 py-0.5 rounded text-[10px] font-black uppercase font-['Fredoka'] bg-white/90 shadow-[2px_2px_0px_#6A5495]">
          ★ OFFICIAL
        </div>
      )}
    </div>
  );
}

