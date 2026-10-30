'use client';

import React from 'react';
import {
  Download,
  Printer,
  Share2,
  Shuffle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface NavbarProps {
  onRandomize: () => void;
  isLanyardMode: boolean;
  onToggleLanyard: () => void;
  onDownloadPNG: () => void;
  onPrint: () => void;
  onShare: () => void;
  isDownloading: boolean;
}

export default function Navbar({
  onRandomize,
  isLanyardMode,
  onToggleLanyard,
  onDownloadPNG,
  onPrint,
  onShare,
  isDownloading,
}: NavbarProps) {
  const triggerConfettiDownload = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.15 },
      colors: ['#6A5495', '#FFEAA7', '#96C6B2', '#2ECC71'],
    });
    onDownloadPNG();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-[#261F36]/20 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand Logo with Star 't' Icon */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 flex items-center justify-center">
            <img src="/icon.svg" alt="tudi icon" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-['Fredoka'] font-black text-2xl tracking-wide text-[#261F36]">
                tudi
              </span>
              <span className="bg-[#6A5495] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                2D STUDIO
              </span>
            </div>
            <p className="text-[11px] text-gray-500 font-['Patrick_Hand'] -mt-1">
              Hand-Drawn Identity & Badge Creator
            </p>
          </div>
        </div>

        {/* Action Controls (Clean, Non-redundant) */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Surprise Me / Randomize */}
          <button
            type="button"
            onClick={onRandomize}
            className="friendly-btn flex items-center gap-1.5 px-3 py-1.5 bg-[#FFEAA7] text-[#261F36] text-xs hover:bg-[#FCE28B]"
            title="Generate a random fun character"
          >
            <Shuffle size={14} />
            <span className="hidden sm:inline">Surprise Me</span>
          </button>

          {/* Lanyard Mode Toggle */}
          <button
            type="button"
            onClick={onToggleLanyard}
            className={`friendly-btn flex items-center gap-1.5 px-3 py-1.5 text-xs transition ${
              isLanyardMode
                ? 'bg-[#6A5495] text-white'
                : 'bg-white text-[#261F36] hover:bg-gray-50'
            }`}
          >
            <span>📿</span>
            <span>{isLanyardMode ? 'Lanyard: ON' : 'Lanyard Mode'}</span>
          </button>

          {/* Download PNG Button */}
          <button
            type="button"
            disabled={isDownloading}
            onClick={triggerConfettiDownload}
            className="friendly-btn flex items-center gap-1.5 px-3.5 py-1.5 bg-[#6A5495] text-white text-xs hover:bg-[#56427D]"
          >
            <Download size={14} />
            <span>{isDownloading ? 'Saving...' : 'Download PNG'}</span>
          </button>

          {/* Print Dual-Sided Card */}
          <button
            type="button"
            onClick={onPrint}
            className="friendly-btn flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#261F36] text-xs hover:bg-gray-50"
            title="Print Front & Back sides on A4 paper"
          >
            <Printer size={14} />
            <span className="hidden md:inline">Print A4</span>
          </button>

          {/* Share */}
          <button
            type="button"
            onClick={onShare}
            className="friendly-btn flex items-center gap-1.5 px-2.5 py-1.5 bg-white text-[#261F36] text-xs hover:bg-gray-50"
            title="Share with friends"
          >
            <Share2 size={14} />
          </button>
        </div>
      </div>
    </header>
  );
}
