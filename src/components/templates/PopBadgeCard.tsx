'use client';

import React from 'react';
import { CardData } from '@/types/card';
import { PRESET_AVATARS } from '@/lib/constants';

interface PopBadgeCardProps {
  card: CardData;
  isBack?: boolean;
}

export default function PopBadgeCard({ card, isBack = false }: PopBadgeCardProps) {
  const currentAvatar =
    PRESET_AVATARS.find((a) => a.id === card.photoPresetId) || PRESET_AVATARS[0];

  const showDrawnSignature = card.signatureType !== 'type' && Boolean(card.signatureDataUrl);

  return (
    <div
      className={`relative w-[480px] h-[320px] rounded-[22px] border-[2.5px] border-[#334155] shadow-xs select-none overflow-hidden transition-all duration-300 font-['Fredoka'] ${
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
        color: card.bodyTextColor || '#1E293B',
      }}
    >
      {!isBack ? (
        /* FRONT SIDE */
        <div className="relative z-10 flex flex-col h-full justify-between p-4">
          {/* Top Row: Mascot/Logo Banner on Right */}
          <div className="flex justify-end items-start -mr-4 -mt-4">
            <div
              className="flex items-center gap-3 px-5 py-2.5 rounded-bl-3xl border-b-[2.5px] border-l-[2.5px] border-[#334155]"
              style={{ backgroundColor: card.themeColor || '#6A5495' }}
            >
              {/* Mascot Circle */}
              <div className="w-9 h-9 rounded-full bg-white border border-[#334155] flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#334155]">
                  <circle cx="8" cy="11" r="2" />
                  <circle cx="16" cy="11" r="2" />
                  <path d="M7 16 C8.5 14 11 15 12 16 C13 15 15.5 14 17 16" stroke="#334155" strokeWidth="2" strokeLinecap="round" fill="none" />
                </svg>
              </div>

              {/* Logo Text (e.g. TII) */}
              <span className="text-white font-black text-2xl tracking-widest uppercase">
                {card.companyLogoText || card.title || 'TII'}
              </span>
            </div>
          </div>

          {/* Center Main Area: Photo on Left + Text on Right */}
          <div className="flex gap-5 items-center my-auto px-1">
            {/* Left Photo with overlapping 2D stickers */}
            <div className="relative">
              {/* Photo Box */}
              <div
                className={`w-[145px] h-[165px] rounded-2xl border-2 border-[#334155] bg-transparent overflow-hidden relative flex items-center justify-center ${
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
                    alt="Badge Photo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full [&>svg]:w-full [&>svg]:h-full [&>svg]:block"
                    dangerouslySetInnerHTML={{ __html: currentAvatar.svg }}
                  />
                )}
              </div>

              {/* STICKER 1: Top-Left Alarm Sticker */}
              {card.stickers?.includes('dnf') && (
                <div className="absolute -top-3 -left-3 rotate-[-12deg] bg-[#FF477E] border border-[#334155] rounded-xl p-1.5 flex items-center gap-1 z-20">
                  <div className="w-4 h-4 bg-[#261F36] rounded-md flex items-center justify-center text-white text-[9px] font-black">
                    !
                  </div>
                  <span className="text-white text-[10px] font-black tracking-wide pr-1">DNF</span>
                </div>
              )}

              {/* STICKER 2: Bottom-Left 'NO HEADACHES' Pixel Sticker */}
              {card.stickers?.includes('no-headaches') && (
                <div className="absolute -bottom-4 -left-3 rotate-[6deg] bg-white border border-[#334155] rounded-lg p-1 z-20">
                  <div className="border border-dashed border-[#FF477E] px-1.5 py-0.5 rounded text-center">
                    <span className="block text-[11px] font-black font-['Space_Mono'] text-[#1E293B] leading-none">
                      NO
                    </span>
                    <span className="block text-[7px] font-black tracking-widest text-[#FF477E] uppercase leading-tight">
                      HEADACHES
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Information Column */}
            <div className="flex-1 space-y-2">
              {/* Full Name */}
              <div>
                <h2 className="text-2xl font-black uppercase tracking-wider text-[#1E293B] leading-tight">
                  {`${card.firstName} ${card.lastName}`.trim() || 'KASE Y.'}
                </h2>
              </div>

              {/* Department Pill */}
              <div className="inline-block">
                <span
                  className="border border-[#334155] px-3 py-1 rounded-xl font-black text-sm uppercase tracking-wider"
                  style={{
                    backgroundColor: `${card.themeColor}20` || '#CBD5E1',
                    color: card.themeColor || '#1E293B',
                  }}
                >
                  {card.department || card.subtitle || 'FEAR DEPT.'}
                </span>
              </div>

              {/* Dashed Line */}
              <div className="flex gap-1.5 py-0.5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-3.5 h-[3px] bg-[#94A3B8] rounded-full" />
                ))}
              </div>

              {/* Role Tag & Signature */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-black tracking-widest text-[#64748B] uppercase">
                  {card.roleTag || card.jobTitle || 'THE INTERN'}
                </span>

                {/* Handwritten or Typed Signature */}
                <div className="w-[110px] h-[28px] flex items-center justify-center border-b border-[#334155]/40">
                  {showDrawnSignature ? (
                    <img
                      src={card.signatureDataUrl}
                      alt="Signature"
                      className="max-h-[26px] max-w-full object-contain"
                    />
                  ) : (
                    <span className="font-['Caveat'] text-xl font-bold leading-none text-[#1E293B]">
                      {card.signatureText || `${card.firstName}`}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Barcode Left & Isometric Pin Right */}
          <div className="flex items-end justify-between pt-1">
            {/* Barcode */}
            <div className="flex flex-col gap-0.5 pl-36">
              <div className="flex items-center gap-[3px] h-6">
                {[4, 2, 5, 2, 6, 3, 2, 5, 2, 6, 3, 5, 2, 4, 6, 2, 4].map((h, i) => (
                  <div
                    key={i}
                    className="w-[2.5px] bg-[#94A3B8] rounded-xs"
                    style={{ height: `${h * 3.5}px` }}
                  />
                ))}
              </div>
              <span className="text-[10px] font-['Space_Mono'] font-bold tracking-widest text-gray-400">
                {card.idNumber || 'TII-404-INT'}
              </span>
            </div>

            {/* STICKER 3: Isometric Character Pin on bottom right */}
            {card.stickers?.includes('voxel-pin') && (
              <div className="rotate-[-8deg] bg-[#8B5CF6] border border-[#334155] rounded-xl p-1.5 flex items-center justify-center">
                <svg viewBox="0 0 32 32" className="w-7 h-7">
                  <polygon points="16,4 28,10 16,16 4,10" fill="#FBBF24" stroke="#1E293B" strokeWidth="1.5" />
                  <polygon points="4,10 16,16 16,28 4,22" fill="#F59E0B" stroke="#1E293B" strokeWidth="1.5" />
                  <polygon points="28,10 16,16 16,28 28,22" fill="#D97706" stroke="#1E293B" strokeWidth="1.5" />
                  <polygon points="16,6 25,10 16,14 7,10" fill="#3B82F6" />
                </svg>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* BACK SIDE */
        <div className="relative z-10 flex flex-col h-full justify-between p-5">
          <div className="flex items-center justify-between border-b border-[#334155]/30 pb-2">
            <h2 className="text-lg font-black uppercase text-[#1E293B]">
              {card.companyLogoText || 'TII'} • OFFICIAL DIRECTIVE
            </h2>
            <span className="text-xs font-['Space_Mono'] text-gray-500">REV. 2D</span>
          </div>

          <div className="my-auto space-y-2 text-xs text-gray-700">
            <div className="p-3 bg-white/70 border border-[#334155]/30 rounded-xl">
              <p className="font-black text-[#1E293B]">INTERN HANDBOOK RULE #1:</p>
              <p className="text-[11px] text-gray-600 mt-0.5">
                Always keep this badge visible when entering the snack room. In case of monsters, offer coffee first.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#334155]/30 text-xs font-['Space_Mono']">
            <span>ID: {card.idNumber || 'TII-404-INT'}</span>
            <span className="font-bold" style={{ color: card.themeColor || '#6A5495' }}>
              SEC LEVEL 0 (INTERN)
            </span>
          </div>
        </div>
      )}

      {/* Verified Stamp */}
      {card.stamps?.includes('verified') && (
        <div className="absolute top-3 left-3 rotate-[-8deg] pointer-events-none border border-[#2ECC71] text-[#2ECC71] px-2 py-0.5 rounded text-[10px] font-black uppercase font-['Fredoka'] bg-white/90">
          ★ VERIFIED
        </div>
      )}
      {/* Approved Stamp */}
      {card.stamps?.includes('approved') && (
        <div className="absolute bottom-12 left-4 rotate-[12deg] pointer-events-none border border-[#E17055] text-[#E17055] px-2 py-0.5 rounded text-[10px] font-black uppercase font-['Fredoka'] bg-white/90">
          ✓ APPROVED
        </div>
      )}
    </div>
  );
}
