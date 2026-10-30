'use client';

import React from 'react';

interface LanyardMockupProps {
  color?: string;
  text?: string;
  holderColor?: string;
  holderPattern?: 'flowers' | 'doodles' | 'clean' | 'dots';
  showPins?: boolean;
  children: React.ReactNode;
}

export default function LanyardMockup({
  color = '#E2D4C9',
  text = 'TUDI STUDIO',
  holderColor = '#96C6B2',
  holderPattern = 'flowers',
  showPins = true,
  children,
}: LanyardMockupProps) {
  return (
    <div className="flex flex-col items-center select-none py-2 relative">
      {/* 1. Vertical Lanyard Strap (Clean & Straight) */}
      <div className="relative flex flex-col items-center z-10">
        <div
          className="w-12 h-36 border-[3px] border-[#1E293B] shadow-[3px_3px_0px_#1E293B] relative flex flex-col items-center justify-between py-2 overflow-hidden"
          style={{ backgroundColor: color }}
        >
          {/* Subtle Strap Fabric Grain Texture */}
          <div className="absolute inset-0 opacity-15 bg-[repeating-linear-gradient(45deg,#000_0,#000_2px,transparent_0,transparent_6px)] pointer-events-none" />

          {/* Optional Enamel Pins Pinned to the Strap */}
          {showPins ? (
            <div className="flex flex-col items-center gap-3 relative z-10">
              {/* Pin 1: Building / Temple Crest Pin */}
              <div className="w-9 h-8 bg-[#8473A1] border-2 border-[#1E293B] rounded-lg shadow-[2px_2px_0px_#1E293B] flex flex-col items-center justify-center p-0.5">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white stroke-[#1E293B]" strokeWidth="1">
                  <path d="M12 2 L2 7 L22 7 Z" />
                  <rect x="4" y="9" width="3" height="11" />
                  <rect x="10.5" y="9" width="3" height="11" />
                  <rect x="17" y="9" width="3" height="11" />
                  <rect x="2" y="20" width="20" height="2" />
                </svg>
                <span className="text-[6px] font-black text-white font-['Space_Mono'] -mt-0.5">TII</span>
              </div>

              {/* Pin 2: Playing Card Character Pin */}
              <div className="w-8 h-10 bg-white border-2 border-[#1E293B] rounded-md shadow-[2px_2px_0px_#1E293B] flex flex-col items-center justify-between p-1 rotate-[-4deg]">
                <span className="text-[7px] font-bold text-red-500 self-start leading-none">♦</span>
                {/* Mini Mascot */}
                <div className="w-4 h-5 bg-[#3B82F6] rounded-full border border-[#1E293B] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                </div>
                <span className="text-[7px] font-bold text-red-500 self-end leading-none">♦</span>
              </div>
            </div>
          ) : (
            <div className="rotate-90 whitespace-nowrap text-white text-[9px] font-['Space_Mono'] font-bold tracking-widest uppercase my-auto drop-shadow-sm">
              {text}
            </div>
          )}
        </div>

        {/* 2. Metal Connector Buckle / Crimp */}
        <div className="relative -mt-2 z-20 w-14 h-7 rounded-lg bg-[#3A2D38] border-[3px] border-[#1E293B] shadow-[2px_2px_0px_#1E293B] flex items-center justify-center">
          <div className="w-8 h-2 rounded-full border border-[#1E293B] bg-[#5C4D5A]" />
        </div>

        {/* 3. Metal Carabiner / Oval Ring Loop */}
        <div className="relative -mt-1 z-30 flex flex-col items-center">
          <div className="w-7 h-10 rounded-full border-[3.5px] border-[#1E293B] bg-[#D1D5DB] shadow-[2px_2px_0px_#1E293B] flex items-center justify-center">
            {/* Inner Ring Opening */}
            <div className="w-2.5 h-5 rounded-full bg-white border border-[#1E293B]" />
          </div>
        </div>
      </div>

      {/* 4. Badge Holder Rubber/Acrylic Frame */}
      <div
        className="relative -mt-4 z-20 rounded-[32px] border-[4px] border-[#1E293B] shadow-[8px_8px_0px_#1E293B] p-4 transition-colors duration-300"
        style={{ backgroundColor: holderColor }}
      >
        {/* Top Tab with 3 Punch Holes */}
        <div className="w-full flex items-center justify-center gap-3 -mt-3 pb-3">
          {/* Left Slot Hole */}
          <div className="w-8 h-2.5 bg-[#1E293B]/80 rounded-full border border-[#1E293B]" />
          {/* Center Main Slot Hole (where the metal ring passes through) */}
          <div className="w-14 h-3.5 bg-[#1E293B] rounded-full border-2 border-[#1E293B] flex items-center justify-center">
            <div className="w-6 h-1.5 bg-[#D1D5DB] rounded-full opacity-60" />
          </div>
          {/* Right Slot Hole */}
          <div className="w-8 h-2.5 bg-[#1E293B]/80 rounded-full border border-[#1E293B]" />
        </div>

        {/* Decorative Flower & Grass Doodles on the Frame Border */}
        {holderPattern === 'flowers' && (
          <>
            {/* Top Flowers */}
            <div className="absolute top-2 left-10 flex items-center gap-1 pointer-events-none">
              <span className="text-white text-xs">🌼</span>
              <span className="text-[#1E293B] text-[10px] font-bold">M</span>
            </div>
            <div className="absolute top-2 right-12 flex items-center gap-1 pointer-events-none">
              <span className="text-[#1E293B] text-[10px] font-bold">^</span>
              <span className="text-white text-xs">🌼</span>
            </div>

            {/* Side Doodles (Left) */}
            <div className="absolute left-1.5 top-1/4 text-[#1E293B] text-[10px] font-bold pointer-events-none space-y-4">
              <div>M</div>
              <div>^</div>
              <div>🌼</div>
              <div>M</div>
            </div>

            {/* Side Doodles (Right) */}
            <div className="absolute right-1.5 top-1/4 text-[#1E293B] text-[10px] font-bold pointer-events-none space-y-4 text-right">
              <div>^</div>
              <div>M</div>
              <div>🌼</div>
              <div>^</div>
            </div>

            {/* Bottom Doodles */}
            <div className="absolute bottom-1 left-8 right-8 flex justify-between text-[#1E293B] text-[10px] font-bold pointer-events-none px-4">
              <span>M</span>
              <span>_</span>
              <span>^</span>
              <span>M</span>
              <span>🌼</span>
              <span>^</span>
              <span>M</span>
            </div>
          </>
        )}

        {/* The Card Component inside the holder */}
        <div className="relative rounded-[20px] overflow-hidden border-2 border-[#1E293B] shadow-inner bg-white">
          {children}
        </div>
      </div>
    </div>
  );
}
