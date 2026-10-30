'use client';

import React from 'react';
import { CardData } from '@/types/card';
import { PRESET_AVATARS } from '@/lib/constants';

interface CitizenIdCardProps {
  card: CardData;
  isBack?: boolean;
}

export default function CitizenIdCard({ card, isBack = false }: CitizenIdCardProps) {
  const currentAvatar = PRESET_AVATARS.find((a) => a.id === card.photoPresetId) || PRESET_AVATARS[0];

  return (
    <div
      className={`relative w-[500px] h-[315px] rounded-2xl border-[3.5px] border-[#261F36] shadow-[6px_6px_0px_#261F36] p-4 select-none overflow-hidden transition-all duration-300 font-['Patrick_Hand'] ${
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
      {/* 2D Hologram security background lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-80 h-80 fill-current">
          <circle cx="50" cy="50" r="45" stroke="#261F36" strokeWidth="2" fill="none" />
          <polygon points="50,15 61,38 86,41 68,58 72,83 50,71 28,83 32,58 14,41 39,38" />
        </svg>
      </div>

      {!isBack ? (
        /* FRONT SIDE */
        <div className="relative z-10 flex flex-col h-full justify-between">
          {/* Header Republik Tudi */}
          <div className="text-center border-b-2 border-[#261F36] pb-1">
            <h1
              className="text-2xl font-black tracking-widest uppercase font-['Fredoka'] drop-shadow-[1px_1px_0px_#261F36]"
              style={{ color: card.themeColor }}
            >
              {card.title || 'REPUBLIK TUDI'}
            </h1>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-700">
              {card.subtitle || 'KARTU TANDA PENDUDUK ELEKTRONIK'}
            </p>
          </div>

          {/* NIK Bar */}
          <div className="flex items-center gap-2 pt-1">
            <span className="font-['Fredoka'] font-black text-sm tracking-wider" style={{ color: card.themeColor }}>
              NIK :
            </span>
            <span className="font-['Space_Mono'] font-bold text-lg tracking-wider text-[#261F36]">
              {card.idNumber || '320109-882910-0001'}
            </span>
          </div>

          {/* Main Body: Data (Left) + Photo (Right) */}
          <div className="flex gap-3 items-start my-auto">
            {/* Left: Detail Biodata */}
            <div className="flex-1 text-[15px] leading-tight space-y-1">
              <div className="flex">
                <span className="w-24 font-bold text-gray-600">Nama</span>
                <span className="mr-1">:</span>
                <span className="font-extrabold uppercase">{`${card.firstName} ${card.lastName}`.trim() || 'WARGA TUDI'}</span>
              </div>

              <div className="flex">
                <span className="w-24 font-bold text-gray-600">Tgl Lahir</span>
                <span className="mr-1">:</span>
                <span className="uppercase font-semibold">{card.birthDate || '01-01-2000'}</span>
              </div>

              <div className="flex">
                <span className="w-24 font-bold text-gray-600">Jenis Kelamin</span>
                <span className="mr-1">:</span>
                <span className="uppercase">{card.gender || 'WARGA NEGARA'}</span>
              </div>

              <div className="flex">
                <span className="w-24 font-bold text-gray-600">Alamat</span>
                <span className="mr-1">:</span>
                <span className="truncate max-w-[170px]">{card.address || 'Komplek Kartun No. 42'}</span>
              </div>

              <div className="flex">
                <span className="w-24 font-bold text-gray-600">Pekerjaan</span>
                <span className="mr-1">:</span>
                <span>{card.jobTitle || 'Doodle Enthusiast'}</span>
              </div>

              <div className="flex">
                <span className="w-24 font-bold text-gray-600">Masa Berlaku</span>
                <span className="mr-1">:</span>
                <span className="font-bold text-[#E17055]">SEUMUR HIDUP</span>
              </div>
            </div>

            {/* Right: Photo Frame & Signature */}
            <div className="flex flex-col items-center">
              {/* Photo */}
              <div
                className={`w-[115px] h-[140px] rounded-xl border-[2.5px] border-[#261F36] bg-[#6A5495]/20 overflow-hidden shadow-[3px_3px_0px_#261F36] relative flex items-center justify-center ${
                  card.photoFilter === 'comic'
                    ? 'contrast-125 saturate-150'
                    : card.photoFilter === 'sketch'
                    ? 'grayscale contrast-150'
                    : ''
                }`}
              >
                {card.photoUrl ? (
                  <img src={card.photoUrl} alt="Citizen ID" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: currentAvatar.svg }} />
                )}

                {/* 2D Hologram sticker */}
                <div className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-300 to-yellow-500 border border-[#261F36] w-6 h-6 rounded-full flex items-center justify-center text-[10px] shadow-sm">
                  ★
                </div>
              </div>

              {/* Tanda Tangan */}
              <div className="w-[115px] h-[34px] mt-1 border-b-2 border-dashed border-[#261F36] flex items-center justify-center">
                {card.signatureDataUrl ? (
                  <img src={card.signatureDataUrl} alt="Signature" className="max-h-[30px] max-w-full object-contain" />
                ) : (
                  <span className="font-['Caveat'] text-xl font-bold leading-none text-[#261F36]">
                    {card.signatureText || `${card.firstName}`}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Bar: Security text */}
          <div className="flex justify-between items-center pt-1 border-t border-[#261F36]/20 text-[11px] text-gray-500 font-['Space_Mono']">
            <span>KOTA TUDI • 2D CARD STUDIO</span>
            <span>CR80 OFFICIAL ID</span>
          </div>
        </div>
      ) : (
        /* BACK SIDE */
        <div className="relative z-10 flex flex-col h-full justify-between p-2">
          <div className="text-center border-b-2 border-[#261F36] pb-1">
            <h2 className="text-xl font-black font-['Fredoka'] uppercase" style={{ color: card.themeColor }}>
              REPUBLIK TUDI • KEMENTERIAN KARTUN
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 items-center my-auto">
            <div className="p-3 border-2 border-[#261F36] rounded-xl bg-white shadow-[2px_2px_0px_#261F36] text-xs space-y-1">
              <p className="font-bold">Ketentuan Penggunaan:</p>
              <p className="text-[11px] text-gray-600">
                1. Kartu ini sah digunakan di seluruh semesta 2D tudi.
              </p>
              <p className="text-[11px] text-gray-600">
                2. Dilarang mengganti foto dengan foto yang terlalu serius.
              </p>
            </div>

            <div className="flex flex-col items-center">
              {/* 2D QR Code Doodle */}
              <div className="w-24 h-24 border-2 border-[#261F36] rounded-xl p-1 bg-white shadow-[3px_3px_0px_#261F36] flex flex-wrap gap-1 justify-center items-center">
                {[...Array(16)].map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-4 h-4 rounded-xs ${
                      [0, 1, 3, 4, 7, 10, 12, 13, 15].includes(idx) ? 'bg-[#261F36]' : 'bg-transparent'
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

      {card.stamps.includes('approved') && (
        <div className="absolute bottom-10 left-6 rotate-[-12deg] pointer-events-none border-2 border-red-500 text-red-500 px-2 py-0.5 rounded text-xs font-black uppercase font-['Fredoka'] bg-white/90 shadow-[2px_2px_0px_rgba(239,68,68,1)]">
          ✓ APPROVED
        </div>
      )}
    </div>
  );
}

