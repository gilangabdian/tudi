"use client";

import React from "react";
import { CardData } from "@/types/card";
import { PRESET_AVATARS } from "@/lib/constants";

interface DriverLicenseCardProps {
  card: CardData;
  isBack?: boolean;
}

export default function DriverLicenseCard({ card, isBack = false }: DriverLicenseCardProps) {
  const currentAvatar = PRESET_AVATARS.find((a) => a.id === card.photoPresetId) || PRESET_AVATARS[0];

  return (
    <div
      className={`relative w-[500px] h-[315px] rounded-2xl border-[3.5px] border-[#261F36] shadow-[6px_6px_0px_#261F36] p-5 select-none overflow-hidden transition-all duration-300 font-['Patrick_Hand'] ${
        card.pattern === "dots"
          ? "pattern-dots"
          : card.pattern === "grid"
            ? "pattern-grid"
            : card.pattern === "vintage"
              ? "pattern-vintage"
              : ""
      }`}
      style={{
        backgroundColor: card.cardBgColor || "#FAF7F0",
        color: card.bodyTextColor || "#1A1A1A",
      }}>
      {/* Background Watermark Doodles */}
      <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center">
        <span className="text-8xl font-black font-['Fredoka'] rotate-[-15deg] uppercase">
          {card.title || "CALIFORNIA"}
        </span>
      </div>

      {!isBack ? (
        /* FRONT SIDE */
        <div className="relative z-10 flex flex-col h-full justify-between">
          {/* Header */}
          <div className="flex items-baseline justify-between border-b-2 border-[#261F36] pb-1.5">
            <h1
              className="text-3xl font-black tracking-wider uppercase font-['Fredoka'] drop-shadow-[1px_1px_0px_#261F36]"
              style={{ color: card.themeColor }}>
              {card.title || "CALIFORNIA"}
            </h1>
            <div className="relative">
              <span
                className="text-lg font-bold tracking-wide underline decoration-wavy decoration-2 decoration-[#261F36]"
                style={{ color: card.themeColor }}>
                {card.subtitle || "Driver License"}
              </span>
            </div>
          </div>

          {/* Main Body: Photo Left + Data Right */}
          <div className="flex gap-4 items-start my-auto">
            {/* Left: Photo / Avatar Frame */}
            <div className="flex flex-col items-center">
              <div
                className={`w-[125px] h-[155px] rounded-xl border-[2.5px] border-[#261F36] bg-[#4B9CD3] overflow-hidden shadow-[3px_3px_0px_#261F36] relative flex items-center justify-center ${
                  card.photoFilter === "comic"
                    ? "contrast-125 saturate-150"
                    : card.photoFilter === "sketch"
                      ? "grayscale contrast-150"
                      : ""
                }`}>
                {card.photoUrl ? (
                  <img src={card.photoUrl} alt="License ID" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: currentAvatar.svg }} />
                )}
                {/* 2D Hand-drawn frame corners */}
                <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-white/60 pointer-events-none" />
                <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-white/60 pointer-events-none" />
              </div>
            </div>

            {/* Right: Personal Data Table */}
            <div className="flex-1 text-[17px] leading-[1.35] space-y-0.5 tracking-wide">
              <div className="flex gap-2">
                <span className="font-bold text-[#3A8891]" style={{ color: card.themeColor }}>
                  LN:
                </span>
                <span className="font-extrabold uppercase">{card.lastName || "BEAR"}</span>
              </div>

              <div className="flex gap-2">
                <span className="font-bold" style={{ color: card.themeColor }}>
                  FN:
                </span>
                <span className="font-extrabold uppercase">{card.firstName || "FOREST"}</span>
              </div>

              <div className="flex gap-2 items-center">
                <span className="font-bold" style={{ color: card.themeColor }}>
                  DOB:
                </span>
                <span className="font-black text-[#E17055] tracking-widest uppercase">
                  {card.birthDate || "UNKNOWN"}
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
                  <span>{card.weight || "595 lbs"}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <span className="font-bold" style={{ color: card.themeColor }}>
                  GENDER:
                </span>
                <span className="uppercase">{card.gender || "M"}</span>
              </div>

              <div className="flex gap-2">
                <span className="font-bold" style={{ color: card.themeColor }}>
                  HAIR:
                </span>
                <span>{card.hair || "Brown"}</span>
              </div>

              <div className="flex gap-2">
                <span className="font-bold" style={{ color: card.themeColor }}>
                  EYES:
                </span>
                <span className="uppercase">{card.eyes || "DOT"}</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Signature + Barcode */}
          <div className="flex items-end justify-between pt-1 border-t border-[#261F36]/20">
            {/* Signature Area */}
            <div className="w-[140px] h-[36px] flex items-center justify-start border-b border-[#261F36]/40">
              {card.signatureDataUrl ? (
                <img src={card.signatureDataUrl} alt="Signature" className="max-h-[34px] max-w-full object-contain" />
              ) : (
                <span className="font-['Caveat'] text-2xl font-bold leading-none text-[#261F36]">
                  {card.signatureText || "Grizzly Bear"}
                </span>
              )}
            </div>

            {/* Wobbly Doodle Barcode */}
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-[2.5px] h-6 px-1">
                {[4, 2, 5, 1, 3, 6, 2, 4, 1, 5, 2, 4, 6, 1, 3, 5, 2, 4].map((h, i) => (
                  <div key={i} className="w-[2px] bg-[#261F36] rounded-full" style={{ height: `${h * 3.5}px` }} />
                ))}
              </div>
              <span className="text-[10px] tracking-widest font-['Space_Mono'] uppercase">
                {card.idNumber || "DL-98214-BEAR"}
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* BACK SIDE */
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex items-baseline justify-between border-b-2 border-[#261F36] pb-1">
            <h1 className="text-2xl font-black uppercase font-['Fredoka']" style={{ color: card.themeColor }}>
              {card.title || "CALIFORNIA"}
            </h1>
            <span className="text-sm font-bold tracking-wide" style={{ color: card.themeColor }}>
              {card.subtitle || "Driver License"}
            </span>
          </div>

          {/* Pawprint / Fingerprint + Large Wobbly Barcode */}
          <div className="flex gap-6 items-center my-auto">
            {/* Paw Box */}
            <div className="w-[110px] h-[135px] rounded-xl border-2 border-[#261F36] bg-[#4B9CD3] flex items-center justify-center shadow-[3px_3px_0px_#261F36]">
              {/* 2D Paw Print Graphic */}
              <svg viewBox="0 0 60 70" className="w-16 h-18 fill-[#8B5A2B]">
                <ellipse cx="30" cy="46" rx="14" ry="17" />
                <circle cx="30" cy="46" r="6" fill="#F8B195" />
                <circle cx="16" cy="22" r="5" />
                <circle cx="26" cy="15" r="5" />
                <circle cx="36" cy="15" r="5" />
                <circle cx="45" cy="22" r="5" />
              </svg>
            </div>

            {/* Back Information & Chunky Barcode */}
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-['Fredoka'] font-black text-xl text-[#E17055]">tudi • 2D OFFICIAL</span>
                <span className="text-xs bg-[#261F36] text-white px-2 py-0.5 rounded-full font-bold">
                  {card.licenseClass || "CLASS M"}
                </span>
              </div>

              {/* Chunky Stylized Barcode */}
              <div
                className="w-full h-14 rounded-lg border-2 border-[#261F36] p-1 flex items-center justify-between"
                style={{ backgroundColor: card.themeColor }}>
                <div className="flex items-center justify-between w-full h-full px-1">
                  {[6, 3, 8, 2, 7, 4, 9, 3, 6, 2, 8, 5, 4, 7, 2, 6, 9, 4, 3, 7].map((w, idx) => (
                    <div key={idx} className="bg-white rounded-sm h-full" style={{ width: `${(w % 4) + 2}px` }} />
                  ))}
                </div>
              </div>

              <p className="text-[11px] leading-tight text-gray-600 italic">
                * Issued by the tudi universe. Cardholder is authorized for unlimited salmon treats and cozy vibes
                without speed tickets.
              </p>
            </div>
          </div>

          {/* Magnetic Stripe / Bottom Note */}
          <div className="flex justify-between items-center pt-1 border-t border-[#261F36]/20 text-xs">
            <span className="font-['Space_Mono']">{card.idNumber || "DL-98214-BEAR"}</span>
            <span className="font-['Caveat'] text-xl font-bold">{card.signatureText || "Grizzly Bear"}</span>
          </div>
        </div>
      )}

      {/* Decorative Stamps Overlay */}
      {card.stamps.includes("verified") && (
        <div className="absolute top-3 right-3 pointer-events-none rotate-12 border-2 border-[#2ECC71] text-[#2ECC71] px-2 py-0.5 rounded-md text-[11px] font-black uppercase font-['Fredoka'] tracking-widest bg-white/80 shadow-[2px_2px_0px_#2ECC71]">
          ★ VERIFIED
        </div>
      )}
    </div>
  );
}
