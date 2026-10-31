'use client';

import React from 'react';
import { CardData } from '@/types/card';
import { PRESET_AVATARS } from '@/lib/constants';

interface CitizenIdCardProps {
  card: CardData;
  isBack?: boolean;
}

export default function CitizenIdCard({ card, isBack = false }: CitizenIdCardProps) {
  const currentAvatar =
    PRESET_AVATARS.find((a) => a.id === card.photoPresetId) || PRESET_AVATARS[0];

  return (
    <div
      className={`relative w-[500px] h-[315px] rounded-2xl border-[3.5px] border-[#261F36] shadow-sm p-4 select-none overflow-hidden transition-all duration-300 font-['Patrick_Hand'] ${
        card.pattern === 'dots'
          ? 'pattern-dots'
          : card.pattern === 'grid'
          ? 'pattern-grid'
          : card.pattern === 'vintage'
          ? 'pattern-vintage'
          : ''
      }`}
      style={{
        backgroundColor: card.cardBgColor || '#FAF7F0',
        color: card.bodyTextColor || '#1A1A1A',
      }}
    >
      {/* 2D Hologram watermark lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-80 h-80 fill-current">
          <circle cx="50" cy="50" r="45" stroke="#261F36" strokeWidth="2" fill="none" />
          <polygon points="50,15 61,38 86,41 68,58 72,83 50,71 28,83 32,58 14,41 39,38" />
        </svg>
      </div>

      {!isBack ? (
        /* FRONT SIDE */
        <div className="relative z-10 flex flex-col h-full justify-between">
          {/* Header */}
          <div className="text-center border-b-2 border-[#261F36] pb-1">
            <h1
              className="text-2xl font-black tracking-widest uppercase font-['Fredoka']"
              style={{ color: card.themeColor }}
            >
              {card.title || 'REPUBLIC OF TUDI'}
            </h1>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-700">
              {card.subtitle || 'ELECTRONIC CITIZEN CARD'}
            </p>
          </div>

          {/* Citizen ID Bar */}
          <div className="flex items-center gap-2 pt-1">
            <span
              className="font-['Fredoka'] font-black text-sm tracking-wider"
              style={{ color: card.themeColor }}
            >
              ID NO :
            </span>
            <span className="font-['Space_Mono'] font-bold text-lg tracking-wider text-[#261F36]">
              {card.idNumber || '320109-882910-0001'}
            </span>
          </div>

          {/* Main Body */}
          <div className="flex gap-3 items-start my-auto">
            {/* Left Details */}
            <div className="flex-1 text-[15px] leading-tight space-y-1">
              <div className="flex">
                <span className="w-24 font-bold text-gray-600">Full Name</span>
                <span className="mr-1">:</span>
                <span className="font-extrabold uppercase">
                  {`${card.firstName} ${card.lastName}`.trim() || 'TUDI CITIZEN'}
                </span>
              </div>

              <div className="flex">
                <span className="w-24 font-bold text-gray-600">Birth Date</span>
                <span className="mr-1">:</span>
                <span className="uppercase font-semibold">{card.birthDate || '01-01-2000'}</span>
              </div>

              <div className="flex">
                <span className="w-24 font-bold text-gray-600">Gender</span>
                <span className="mr-1">:</span>
                <span className="uppercase">{card.gender || 'CITIZEN'}</span>
              </div>

              <div className="flex">
                <span className="w-24 font-bold text-gray-600">Address</span>
                <span className="mr-1">:</span>
                <span className="truncate max-w-[170px]">
                  {card.address || 'Cartoon Avenue No. 42'}
                </span>
              </div>

              <div className="flex">
                <span className="w-24 font-bold text-gray-600">Occupation</span>
                <span className="mr-1">:</span>
                <span>{card.jobTitle || 'Doodle Enthusiast'}</span>
              </div>

              <div className="flex">
                <span className="w-24 font-bold text-gray-600">Validity</span>
                <span className="mr-1">:</span>
                <span className="font-bold text-[#E17055]">LIFETIME</span>
              </div>
            </div>

            {/* Right Photo Frame & Signature */}
            <div className="flex flex-col items-center">
              <div
                className={`w-[115px] h-[140px] rounded-xl border-[2.5px] border-[#261F36] bg-white overflow-hidden shadow-xs relative flex items-center justify-center ${
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
                    alt="Citizen ID"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full [&>svg]:w-full [&>svg]:h-full [&>svg]:block"
                    dangerouslySetInnerHTML={{ __html: currentAvatar.svg }}
                  />
                )}

                {/* 2D Hologram sticker */}
                <div className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-300 to-yellow-500 border border-[#261F36] w-6 h-6 rounded-full flex items-center justify-center text-[10px] shadow-xs">
                  ★
                </div>
              </div>

              {/* Signature */}
              <div className="w-[115px] h-[34px] mt-1 border-b border-[#261F36]/40 flex items-center justify-center">
                {card.signatureType !== 'type' && card.signatureDataUrl ? (
                  <img
                    src={card.signatureDataUrl}
                    alt="Signature"
                    className="max-h-[30px] max-w-full object-contain"
                  />
                ) : (
                  <span className="font-['Caveat'] text-xl font-bold leading-none text-[#261F36]">
                    {card.signatureText || `${card.firstName || 'Citizen'}`}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Security */}
          <div className="flex justify-between items-center pt-1 border-t border-[#261F36]/20 text-[11px] text-gray-500 font-['Space_Mono']">
            <span>TUDI CITY • 2D IDENTITY STUDIO</span>
            <span>CR80 OFFICIAL ID</span>
          </div>
        </div>
      ) : (
        /* BACK SIDE */
        <div className="relative z-10 flex flex-col h-full justify-between p-2">
          <div className="text-center border-b-2 border-[#261F36] pb-1">
            <h2
              className="text-xl font-black font-['Fredoka'] uppercase"
              style={{ color: card.themeColor }}
            >
              REPUBLIC OF TUDI • MINISTRY OF CARTOON
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 items-center my-auto">
            <div className="p-3 border-2 border-[#261F36] rounded-xl bg-white shadow-xs text-xs space-y-1">
              <p className="font-bold">Terms of Use:</p>
              <p className="text-[11px] text-gray-600">
                1. This card is universally valid across all 2D universes.
              </p>
              <p className="text-[11px] text-gray-600">
                2. Do not replace photo with an overly serious passport photo.
              </p>
            </div>

            <div className="flex flex-col items-center">
              {/* 2D QR Code Doodle */}
              <div className="w-24 h-24 border-2 border-[#261F36] rounded-xl p-1 bg-white shadow-xs flex flex-wrap gap-1 justify-center items-center">
                {[...Array(16)].map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-4 h-4 rounded-xs ${
                      [0, 1, 3, 4, 7, 10, 12, 13, 15].includes(idx)
                        ? 'bg-[#261F36]'
                        : 'bg-transparent'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] font-['Space_Mono'] mt-1 font-bold">SCAN ME</span>
            </div>
          </div>

          <div className="text-center text-xs font-['Space_Mono'] border-t border-[#261F36]/20 pt-1">
            ID: {card.idNumber || '320109-882910-0001'}
          </div>
        </div>
      )}

      {/* Stamps only on FRONT side (positioned safely to never collide with text or signature) */}
      {!isBack && (
        <>
          {/* Verified Stamp Overlay (Safe in top right corner of the card) */}
          {card.stamps?.includes('verified') && (
            <div className="absolute top-2.5 right-4 rotate-8 pointer-events-none border-2 border-[#10B981] text-[#10B981] px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase font-['Fredoka'] tracking-wider bg-white/95 shadow-xs z-30">
              ★ VERIFIED
            </div>
          )}

          {/* Approved Seal Overlay (Safe consular seal overlapping lower-left photo border, clear of text) */}
          {card.stamps?.includes('approved') && (
            <div className="absolute bottom-14 right-28 rotate-[-10deg] pointer-events-none border-2 border-[#EF4444] text-[#EF4444] px-2 py-0.5 rounded-md text-[10px] font-black uppercase font-['Fredoka'] tracking-wider bg-white/95 shadow-xs z-30">
              ✓ APPROVED
            </div>
          )}

          {/* 2D Star Mascot Paw Watermark (Faint background watermark) */}
          {card.stamps?.includes('pawprint') && (
            <div className="absolute bottom-11 right-36 rotate-[-8deg] pointer-events-none opacity-15 z-10">
              <svg viewBox="0 0 60 60" className="w-13 h-13" style={{ fill: card.themeColor || '#6A5495' }}>
                <ellipse cx="30" cy="38" rx="14" ry="12" />
                <polygon points="30,32 32,36 36,37 33,40 34,44 30,42 26,44 27,40 24,37 28,36" fill="#FAF7F0" />
                <ellipse cx="14" cy="22" rx="4.5" ry="6" transform="rotate(-18 14 22)" />
                <ellipse cx="25" cy="15" rx="4.5" ry="6.5" transform="rotate(-6 25 15)" />
                <ellipse cx="35" cy="15" rx="4.5" ry="6.5" transform="rotate(6 35 15)" />
                <ellipse cx="46" cy="22" rx="4.5" ry="6" transform="rotate(18 46 22)" />
              </svg>
            </div>
          )}
        </>
      )}
    </div>
  );
}
