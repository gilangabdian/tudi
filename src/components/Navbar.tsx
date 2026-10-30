'use client';

import React from 'react';
import {
  Download,
  Printer,
  Share2,
  Shuffle,
  RefreshCw,
  Sparkles,
  BookmarkCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface NavbarProps {
  onRandomize: () => void;
  onFlip: () => void;
  isBack: boolean;
  isLanyardMode: boolean;
  onToggleLanyard: () => void;
  onDownloadPNG: () => void;
  onPrint: () => void;
  onShare: () => void;
  isDownloading: boolean;
  savedSlots: { id: string; name: string }[];
  currentCardId: string;
  onSelectSlot: (id: string) => void;
  onSaveNewSlot: () => void;
}

export default function Navbar({
  onRandomize,
  onFlip,
  isBack,
  isLanyardMode,
  onToggleLanyard,
  onDownloadPNG,
  onPrint,
  onShare,
  isDownloading,
  savedSlots,
  currentCardId,
  onSelectSlot,
  onSaveNewSlot,
}: NavbarProps) {
  const triggerConfettiDownload = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.2 },
      colors: ['#6A5495', '#FFEAA7', '#4B9CD3', '#2ECC71'],
    });
    onDownloadPNG();
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b-2 border-[#261F36] px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#6A5495] border-2 border-[#261F36] shadow-[2px_2px_0px_#261F36] flex items-center justify-center text-white font-['Fredoka'] font-black text-xl">
            t
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-['Fredoka'] font-black text-2xl tracking-wide text-[#261F36]">
                tudi
              </span>
              <span className="bg-[#6A5495] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-[#261F36]">
                2D CARD
              </span>
            </div>
            <p className="text-[11px] text-gray-500 font-['Patrick_Hand'] -mt-1">
              Hand-Drawn Identity Studio
            </p>
          </div>
        </div>

        {/* Action Controls & Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Randomize Button */}
          <button
            type="button"
            onClick={onRandomize}
            className="doodle-btn flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFEAA7] text-[#261F36] font-bold text-xs"
            title="Isi profil kartu dengan karakter acak lucu"
          >
            <Shuffle size={14} />
            <span className="hidden sm:inline">Acak Karakter</span>
          </button>

          {/* Flip Front/Back Toggle */}
          <button
            type="button"
            onClick={onFlip}
            className={`doodle-btn flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              isBack ? 'bg-[#6A5495] text-white' : 'bg-white text-[#261F36]'
            }`}
          >
            <RefreshCw size={13} className={isBack ? 'rotate-180 transition-transform' : ''} />
            <span>{isBack ? 'Sisi Belakang' : 'Sisi Depan'}</span>
          </button>

          {/* Lanyard Toggle */}
          <button
            type="button"
            onClick={onToggleLanyard}
            className={`doodle-btn flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              isLanyardMode
                ? 'bg-[#6A5495] text-white shadow-[2px_2px_0px_#261F36]'
                : 'bg-white text-[#261F36]'
            }`}
          >
            <span>📿</span>
            <span>{isLanyardMode ? 'Tali Lanyard: ON' : 'Tali Lanyard'}</span>
          </button>

          {/* Storage Slots Dropdown */}
          <div className="flex items-center gap-1 bg-gray-50 border-2 border-[#261F36] rounded-xl px-2 py-1 text-xs">
            <BookmarkCheck size={14} className="text-[#6A5495]" />
            <select
              value={currentCardId}
              onChange={(e) => onSelectSlot(e.target.value)}
              className="bg-transparent font-bold text-xs text-[#261F36] focus:outline-none cursor-pointer max-w-[120px] truncate"
            >
              {savedSlots.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={onSaveNewSlot}
              className="text-[#6A5495] font-black hover:text-[#261F36] ml-1 text-sm"
              title="Simpan sebagai slot baru"
            >
              +
            </button>
          </div>

          {/* Download PNG Button */}
          <button
            type="button"
            disabled={isDownloading}
            onClick={triggerConfettiDownload}
            className="doodle-btn flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#6A5495] text-white font-bold text-xs hover:bg-[#56427D]"
          >
            <Download size={14} />
            <span>{isDownloading ? 'Menyimpan...' : 'Download PNG'}</span>
          </button>

          {/* Print Button */}
          <button
            type="button"
            onClick={onPrint}
            className="doodle-btn flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-[#261F36] font-bold text-xs"
            title="Cetak kartu dengan ukuran pas dompet CR80"
          >
            <Printer size={14} />
            <span className="hidden md:inline">Cetak</span>
          </button>

          {/* Share Button */}
          <button
            type="button"
            onClick={onShare}
            className="doodle-btn flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white text-[#261F36] font-bold text-xs"
            title="Bagikan ke WhatsApp / Sosmed"
          >
            <Share2 size={14} />
          </button>
        </div>
      </div>
    </header>
  );
}

