'use client';

import React from 'react';
import { CardData } from '@/types/card';
import { PRESET_AVATARS } from '@/lib/constants';

interface DriverLicenseCardProps {
  card: CardData;
  isBack?: boolean;
}

export default function DriverLicenseCard({ card, isBack = false }: DriverLicenseCardProps) {
  const currentAvatar =
    PRESET_AVATARS.find((a) => a.id === card.photoPresetId) || PRESET_AVATARS[0];

  return (
    <div
      className={`relative w-[500px] h-[315px] rounded-2xl border-2 border-[#334155] shadow-xs p-5 select-none overflow-hidden transition-all duration-300 font-['Patrick_Hand'] ${
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
      {/* Background Watermark Doodles */}
      <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center">
        <span className="text-8xl font-black font-['Fredoka'] rotate-[-15deg] uppercase">
          {card.title || 'CALIFORNIA'}
        </span>
      </div>

      {!isBack ? (
        /* FRONT SIDE */
        <div className="relative z-10 flex flex-col h-full justify-between">
          {/* Header */}
          <div className="flex items-baseline justify-between border-b-2 border-[#334155]/20 pb-1.5">
            <h1
              className="text-3xl font-black tracking-wider uppercase font-['Fredoka']"
              style={{ color: card.themeColor }}
            >
              {card.title || 'CALIFORNIA'}
            </h1>
            <div className="relative">
              <span
                className="text-lg font-bold tracking-wide underline decoration-wavy decoration-2 decoration-[#334155]/60"
                style={{ color: card.themeColor }}
              >
                {card.subtitle || 'Driver License'}
              </span>
            </div>
          </div>

          {/* Main Body */}
          <div className="flex gap-4 items-start my-auto">
            {/* Photo Box */}
            <div className="flex flex-col items-center">
              <div
                className={`w-[125px] h-[155px] rounded-xl border-2 border-[#334155] bg-white overflow-hidden relative flex items-center justify-center ${
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
                    alt="License ID"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full [&>svg]:w-full [&>svg]:h-full [&>svg]:block"
                    dangerouslySetInnerHTML={{ __html: currentAvatar.svg }}
                  />
                )}
                <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-white/60 pointer-events-none" />
                <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-white/60 pointer-events-none" />
              </div>
            </div>

            {/* Personal Data */}
            <div className="flex-1 text-[17px] leading-[1.35] space-y-0.5 tracking-wide">
              <div className="flex gap-2">
                <span className="font-bold text-[#3A8891]" style={{ color: card.themeColor }}>
                  LN:
                </span>
                <span className="font-extrabold uppercase">{card.lastName || 'BEAR'}</span>
              </div>

              <div className="flex gap-2">
                <span className="font-bold" style={{ color: card.themeColor }}>
                  FN:
                </span>
                <span className="font-extrabold uppercase">{card.firstName || 'FOREST'}</span>
              </div>

              <div className="flex gap-2 items-center">
                <span className="font-bold" style={{ color: card.themeColor }}>
                  DOB:
                </span>
                <span className="font-black text-[#E17055] tracking-widest uppercase">
                  {card.birthDate || 'UNKNOWN'}
                </span>
              </div>

              <div className="flex gap-4">
                <div className="flex gap-1.5">
                  <span className="font-bold" style={{ color: card.themeColor }}>
                    H:
                  </span>
                  <span>{card.height || `6'2"`}</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="font-bold" style={{ color: card.themeColor }}>
                    W:
                  </span>
                  <span>{card.weight || '595 lbs'}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <span className="font-bold" style={{ color: card.themeColor }}>
                  GENDER:
                </span>
                <span className="uppercase">{card.gender || 'M'}</span>
              </div>

              <div className="flex gap-2">
                <span className="font-bold" style={{ color: card.themeColor }}>
                  HAIR:
                </span>
                <span>{card.hair || 'Brown'}</span>
              </div>

              <div className="flex gap-2">
                <span className="font-bold" style={{ color: card.themeColor }}>
                  EYES:
                </span>
                <span className="uppercase">{card.eyes || 'DOT'}</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Signature + Barcode */}
          <div className="flex items-end justify-between pt-1 border-t border-[#334155]/20">
            {/* Signature Area */}
            <div className="w-[140px] h-[36px] flex items-center justify-start border-b border-[#334155]/40">
              {card.signatureType === 'type' ? (
                <span className="font-['Caveat'] text-2xl font-bold leading-none text-[#1E293B]">
                  {card.signatureText || 'Grizzly Bear'}
                </span>
              ) : card.signatureDataUrl ? (
                <img
                  src={card.signatureDataUrl}
                  alt="Signature"
                  className="max-h-[34px] max-w-full object-contain"
                />
              ) : null}
            </div>

            {/* Doodle Barcode */}
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-[2.5px] h-6 px-1">
                {[4, 2, 5, 1, 3, 6, 2, 4, 1, 5, 2, 4, 6, 1, 3, 5, 2, 4].map((h, i) => (
                  <div
                    key={i}
                    className="w-[2px] bg-[#334155] rounded-full"
                    style={{ height: `${h * 3.5}px` }}
                  />
                ))}
              </div>
              <span className="text-[10px] tracking-widest font-['Space_Mono'] uppercase text-gray-500">
                {card.idNumber || 'DL-98214-BEAR'}
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* BACK SIDE */
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex items-baseline justify-between border-b-2 border-[#334155]/20 pb-1">
            <h1
              className="text-2xl font-black uppercase font-['Fredoka']"
              style={{ color: card.themeColor }}
            >
              {card.title || 'CALIFORNIA'}
            </h1>
            <span className="text-sm font-bold tracking-wide" style={{ color: card.themeColor }}>
              {card.subtitle || 'Driver License'}
            </span>
          </div>

          {/* Pawprint / Fingerprint + Large Barcode */}
          <div className="flex gap-6 items-center my-auto">
            <div className="w-[110px] h-[135px] rounded-xl border border-[#334155] bg-[#4B9CD3] flex items-center justify-center">
              <svg viewBox="0 0 60 70" className="w-16 h-18 fill-[#8B5A2B]">
                <ellipse cx="30" cy="46" rx="14" ry="17" />
                <circle cx="30" cy="46" r="6" fill="#F8B195" />
                <circle cx="16" cy="22" r="5" />
                <circle cx="26" cy="15" r="5" />
                <circle cx="36" cy="15" r="5" />
                <circle cx="45" cy="22" r="5" />
              </svg>
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-['Fredoka'] font-black text-xl text-[#E17055]">
                  tudi • 2D OFFICIAL
                </span>
                <span className="text-xs bg-[#334155] text-white px-2 py-0.5 rounded-full font-bold">
                  {card.licenseClass || 'CLASS M'}
                </span>
              </div>

              {/* Chunky Barcode */}
              <div
                className="w-full h-14 rounded-lg border border-[#334155] p-1 flex items-center justify-between"
                style={{ backgroundColor: card.themeColor }}
              >
                <div className="flex items-center justify-between w-full h-full px-1">
                  {[6, 3, 8, 2, 7, 4, 9, 3, 6, 2, 8, 5, 4, 7, 2, 6, 9, 4, 3, 7].map((w, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-sm h-full"
                      style={{ width: `${(w % 4) + 2}px` }}
                    />
                  ))}
                </div>
              </div>

              <p className="text-[11px] leading-tight text-gray-600 italic">
                * Issued by the 2D tudi universe. Cardholder is authorized for unlimited salmon treats and cozy vibes without speed tickets.
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-1 border-t border-[#334155]/20 text-xs">
            <span className="font-['Space_Mono']">{card.idNumber || 'DL-98214-BEAR'}</span>
            <span className="font-['Caveat'] text-xl font-bold">
              {card.signatureText || 'Grizzly Bear'}
            </span>
          </div>
        </div>
      )}

      {/* Stamps only on FRONT side (positioned safely to never collide with text or signature) */}
      {!isBack && (
        <>
          {/* Decorative Verified Stamp Overlay (Safe in open right area, never touching text or headers) */}
          {card.stamps?.includes('verified') && (
            <div className="absolute top-14 right-5 pointer-events-none rotate-6 border-2 border-[#10B981] text-[#10B981] px-2 py-0.5 rounded-md text-[9.5px] font-black uppercase font-['Fredoka'] tracking-wider bg-white/95 shadow-xs z-30">
              ★ VERIFIED
            </div>
          )}

          {/* Approved Seal Overlay (Safe in open right area above barcode, never touching signature) */}
          {card.stamps?.includes('approved') && (
            <div className="absolute bottom-12 right-6 pointer-events-none rotate-[-6deg] border-2 border-[#EF4444] text-[#EF4444] px-2 py-0.5 rounded-md text-[9.5px] font-black uppercase font-['Fredoka'] tracking-wider bg-white/95 shadow-xs z-30">
              ✓ APPROVED
            </div>
          )}

          {/* 2D Grizzly Bear Paw Watermark (Faint background watermark) */}
          {card.stamps?.includes('pawprint') && (
            <div className="absolute bottom-9 right-28 pointer-events-none rotate-[-15deg] opacity-20 z-10">
              <svg viewBox="0 0 60 70" className="w-10 h-12 fill-[#8B5A2B]">
                <ellipse cx="30" cy="46" rx="14" ry="17" />
                <circle cx="16" cy="22" r="5" />
                <circle cx="26" cy="15" r="5" />
                <circle cx="36" cy="15" r="5" />
                <circle cx="45" cy="22" r="4.5" />
              </svg>
            </div>
          )}
        </>
      )}
    </div>
  );
}
