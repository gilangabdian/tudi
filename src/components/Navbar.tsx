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
  printLayout?: '1-page' | '2-page';
  onTogglePrintLayout?: () => void;
}

export default function Navbar({
  onRandomize,
  onDownloadPNG,
  onPrint,
  isDownloading,
  printLayout = '1-page',
  onTogglePrintLayout,
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

          {/* Print Dual-Sided Card with Mode Switcher */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={onPrint}
              className={`friendly-btn flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#261F36] text-xs hover:bg-gray-50 ${
                onTogglePrintLayout ? 'rounded-r-none border-r-0' : ''
              }`}
              title="Print Dual-Sided Card Sheet on A4 paper"
            >
              <Printer size={14} />
              <span className="hidden sm:inline">Print A4</span>
            </button>
            {onTogglePrintLayout && (
              <button
                type="button"
                onClick={onTogglePrintLayout}
                className="friendly-btn px-2 py-1.5 bg-gray-50 text-[#261F36] text-[11px] font-bold hover:bg-gray-100 rounded-l-none border-l border-gray-200"
                title={`Print Sheet Mode: ${printLayout === '1-page' ? '1-Page Foldable (Both sides on 1 sheet)' : '2-Pages Separate (Page 1 Front, Page 2 Back)'}. Click to switch.`}
              >
                <span>{printLayout === '1-page' ? '📄 1-Page' : '📑 2-Page'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
