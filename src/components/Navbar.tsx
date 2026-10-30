'use client';

import React from 'react';
import {
  Download,
  Printer,
  Shuffle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface NavbarProps {
  onRandomize: () => void;
  onDownloadPNG: () => void;
  onPrint: () => void;
  isDownloading: boolean;
}

export default function Navbar({
  onRandomize,
  onDownloadPNG,
  onPrint,
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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Logo: ONLY the icon + text 'tudi', nothing else! */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center">
            <img src="/icon.svg" alt="tudi icon" className="w-full h-full object-contain" />
          </div>
          <span className="font-['Fredoka'] font-black text-2xl tracking-wide text-[#261F36]">
            tudi
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Surprise Me / Randomize */}
          <button
            type="button"
            onClick={onRandomize}
            className="friendly-btn flex items-center gap-1.5 px-3 py-1.5 bg-[#FFEAA7] text-[#261F36] text-xs hover:bg-[#FCE28B]"
            title="Generate a random character"
          >
            <Shuffle size={14} />
            <span className="hidden sm:inline">Surprise Me</span>
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
        </div>
      </div>
    </header>
  );
}
