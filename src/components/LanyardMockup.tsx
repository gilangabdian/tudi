'use client';

import React from 'react';

interface LanyardMockupProps {
  color: string;
  text: string;
  children: React.ReactNode;
}

export default function LanyardMockup({
  color = '#6A5495',
  text = 'TUDI • OFFICIAL MEMBER',
  children,
}: LanyardMockupProps) {
  return (
    <div className="flex flex-col items-center select-none py-2">
      {/* 2D Lanyard Strap Top (Coming from user's neck) */}
      <div className="relative flex flex-col items-center w-64">
        {/* Left and Right Ribbon Straps converging */}
        <div className="flex justify-center items-start w-full relative h-28 overflow-hidden">
          {/* Left Strap */}
          <div
            className="w-10 h-36 border-2 border-[#261F36] shadow-[2px_2px_0px_#261F36] -rotate-12 origin-bottom-right flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: color }}
          >
            <div className="rotate-90 whitespace-nowrap text-white text-[9px] font-['Space_Mono'] font-bold tracking-widest opacity-90 uppercase">
              {text} • {text}
            </div>
          </div>

          {/* Right Strap */}
          <div
            className="w-10 h-36 border-2 border-[#261F36] shadow-[2px_2px_0px_#261F36] rotate-12 origin-bottom-left flex items-center justify-center overflow-hidden -ml-2"
            style={{ backgroundColor: color }}
          >
            <div className="-rotate-90 whitespace-nowrap text-white text-[9px] font-['Space_Mono'] font-bold tracking-widest opacity-90 uppercase">
              {text} • {text}
            </div>
          </div>
        </div>

        {/* Metal Crimp / Buckle */}
        <div className="relative -mt-3 z-10 w-12 h-6 rounded-md bg-[#DFE6E9] border-2 border-[#261F36] shadow-[2px_2px_0px_#261F36] flex items-center justify-center">
          <div className="w-8 h-2 rounded-full border border-[#261F36] bg-gray-300" />
        </div>

        {/* Metal Swivel Hook & Lobster Claw Clip (2D Illustrated) */}
        <div className="relative z-10 flex flex-col items-center -mt-1 mb-1">
          {/* Ring */}
          <div className="w-7 h-5 rounded-full border-2 border-[#261F36] bg-gray-200 shadow-sm" />
          {/* Claw clip */}
          <div className="w-5 h-7 rounded-b-xl border-2 border-[#261F36] bg-[#B2BEC3] -mt-1 shadow-[1px_1px_0px_#261F36] flex items-center justify-center">
            <div className="w-2 h-4 border-l-2 border-[#261F36]" />
          </div>
        </div>
      </div>

      {/* Transparent Plastic Pouch Wrapper around the Card */}
      <div className="relative p-2.5 rounded-3xl bg-white/70 backdrop-blur-[2px] border-[3px] border-[#261F36] shadow-[8px_8px_0px_#261F36]">
        {/* Pouch Header with Slot Cutout */}
        <div className="w-full flex justify-center pb-2">
          <div className="w-16 h-3 bg-white border-2 border-[#261F36] rounded-full shadow-inner" />
        </div>

        {/* Gloss Reflection Highlights */}
        <div className="absolute top-4 left-6 w-24 h-48 bg-gradient-to-br from-white/40 to-transparent rounded-2xl pointer-events-none rotate-12 z-20" />

        {/* The Card Component */}
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}

