'use client';

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import EditorSidebar from '@/components/EditorSidebar';
import CardRenderer from '@/components/CardRenderer';
import LanyardMockup from '@/components/LanyardMockup';
import SlotRail from '@/components/SlotRail';
import { CardData } from '@/types/card';
import { DEFAULT_CARD_DATA, FUNNY_RANDOM_PROFILES } from '@/lib/constants';
import { toPng } from 'html-to-image';
import { Sparkles, RotateCw, Scissors } from 'lucide-react';

const STORAGE_SLOTS_KEY = 'tudi_10_slots_v3';
const STORAGE_ACTIVE_SLOT_KEY = 'tudi_active_slot_index_v3';

export default function Home() {
  const [currentSlotIndex, setCurrentSlotIndex] = useState<number>(0);
  const [slotsData, setSlotsData] = useState<Record<number, CardData | null>>({
    0: DEFAULT_CARD_DATA,
  });
  const [card, setCard] = useState<CardData>(DEFAULT_CARD_DATA);
  const [isBack, setIsBack] = useState(false);
  const [isLanyardMode, setIsLanyardMode] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const cardRef = useRef<HTMLDivElement | null>(null);

  // Load slots and active index on mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const storedSlots = localStorage.getItem(STORAGE_SLOTS_KEY);
      const storedIndex = localStorage.getItem(STORAGE_ACTIVE_SLOT_KEY);
      let parsedSlots: Record<number, CardData | null> = { 0: DEFAULT_CARD_DATA };
      let initialIndex = 0;

      if (storedSlots) {
        parsedSlots = JSON.parse(storedSlots);
      }
      if (storedIndex) {
        initialIndex = parseInt(storedIndex, 10);
      }

      setSlotsData(parsedSlots);
      setCurrentSlotIndex(initialIndex);

      if (parsedSlots[initialIndex]) {
        setCard(parsedSlots[initialIndex]!);
      }
    } catch (e) {
      console.warn('LocalStorage load error:', e);
    }
  }, []);

  // Auto-sync current card changes to its active slot in LocalStorage
  useEffect(() => {
    if (!isMounted) return;
    try {
      const updatedSlots = {
        ...slotsData,
        [currentSlotIndex]: card,
      };
      setSlotsData(updatedSlots);
      localStorage.setItem(STORAGE_SLOTS_KEY, JSON.stringify(updatedSlots));
      localStorage.setItem(STORAGE_ACTIVE_SLOT_KEY, currentSlotIndex.toString());
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [card, isMounted]);

  const handleCardChange = (updated: Partial<CardData>) => {
    setCard((prev) => ({
      ...prev,
      ...updated,
      updatedAt: Date.now(),
    }));
  };

  const handleSelectSlot = (index: number) => {
    if (index === currentSlotIndex) return;

    // Check if slot has saved card, else initialize from template
    const existing = slotsData[index];
    if (existing) {
      setCard(existing);
    } else {
      const newCard: CardData = {
        ...DEFAULT_CARD_DATA,
        id: `slot-${index + 1}-${Date.now()}`,
        firstName: `CARD #${index + 1}`,
        lastName: '',
      };
      setCard(newCard);
    }
    setCurrentSlotIndex(index);
    localStorage.setItem(STORAGE_ACTIVE_SLOT_KEY, index.toString());
  };

  const handleRandomize = () => {
    const randomProfile =
      FUNNY_RANDOM_PROFILES[Math.floor(Math.random() * FUNNY_RANDOM_PROFILES.length)];
    handleCardChange({
      ...randomProfile,
      name: `${randomProfile.firstName || ''} ${randomProfile.lastName || ''}`.trim(),
    });
  };

  const handleDownloadPNG = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);

    try {
      // 300 DPI high-DPI export
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 3,
        cacheBust: true,
      });

      const safeName = (card.firstName || 'tudi')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-');
      const side = isBack ? 'back' : 'front';
      const link = document.createElement('a');
      link.download = `tudi-${card.template}-${safeName}-${side}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download PNG failed:', err);
      alert('Failed to generate image. Please try again!');
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `tudi • ${card.title} 2D Card`,
          text: `Check out my custom 2D card! Character: ${card.firstName} ${card.lastName}`,
          url: window.location.href,
        });
      } catch (e) {
        // user cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Website link copied to clipboard!');
    }
  };

  const isPortraitTemplate = card.template === 'work-badge' || card.template === 'event-pass';

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar with Star 't' Icon (Clean & Non-redundant) */}
      <Navbar
        onRandomize={handleRandomize}
        isLanyardMode={isLanyardMode}
        onToggleLanyard={() => setIsLanyardMode(!isLanyardMode)}
        onDownloadPNG={handleDownloadPNG}
        onPrint={handlePrint}
        onShare={handleShare}
        isDownloading={isDownloading}
      />

      {/* Floating 10-Slot Quick Switcher Rail on Right Side */}
      <SlotRail
        currentSlotIndex={currentSlotIndex}
        slotsData={slotsData}
        onSelectSlot={handleSelectSlot}
      />

      {/* Main Studio Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pr-14 sm:pr-18">
        {/* Left Column: Form Editor Sidebar (3 Structured Groups) */}
        <div className="lg:col-span-5 xl:col-span-4 w-full">
          <EditorSidebar card={card} onChange={handleCardChange} />
        </div>

        {/* Right Column: Live Interactive Card Canvas */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-center justify-center min-h-[580px] p-4 sm:p-8 rounded-3xl border-2 border-[#261F36]/20 bg-[#F4F0FA]/40 relative overflow-hidden">
          {/* Top Stage Badges */}
          <div className="absolute top-4 left-6 text-xs font-['Patrick_Hand'] text-gray-500 select-none flex items-center gap-1.5">
            <Sparkles size={14} className="text-[#6A5495]" /> 2D Live Stage Canvas
          </div>

          <div className="absolute top-4 right-6 flex items-center gap-2 select-none">
            <span className="text-[11px] font-['Space_Mono'] bg-white border border-[#261F36]/40 px-2.5 py-0.5 rounded-full font-bold">
              CR80 • 85.6mm × 54mm
            </span>
          </div>

          {/* Interactive Card Stage (Captured by html-to-image) */}
          <div className="my-auto py-4">
            <div
              id="printable-card-area"
              ref={cardRef}
              className="transition-transform duration-300"
            >
              {isLanyardMode ? (
                <LanyardMockup
                  color={card.lanyardColor}
                  text={card.lanyardText}
                  holderColor={card.holderColor || '#96C6B2'}
                  holderPattern={card.holderPattern || 'flowers'}
                  showPins={card.lanyardPins !== false}
                >
                  <CardRenderer card={card} isBack={isBack} />
                </LanyardMockup>
              ) : (
                <CardRenderer card={card} isBack={isBack} />
              )}
            </div>
          </div>

          {/* Single Clean Interactive Flip Control (No Redundant Buttons) */}
          <div className="flex items-center justify-center gap-3 mt-2 z-10">
            <button
              type="button"
              onClick={() => setIsBack(!isBack)}
              className="friendly-btn flex items-center gap-2 px-5 py-2.5 bg-white text-[#261F36] text-xs hover:bg-gray-50 shadow-xs"
            >
              <RotateCw size={14} className={isBack ? 'rotate-180 transition-transform' : ''} />
              <span>{isBack ? 'Flip to Front Side' : 'Flip to Back Side'}</span>
            </button>
          </div>

          {/* Stage Helper Tip */}
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-500 font-['Patrick_Hand']">
              💡 Tip: Click slots 1-10 on the right to manage your cards. Click &apos;Print A4&apos; to get front + back sides cut-ready!
            </p>
          </div>
        </div>
      </main>

      {/* DEDICATED DUAL-SIDED PRINT SHEET (Only Visible When Printing) */}
      <section
        id="printable-dual-card-sheet"
        className="hidden print:block p-8 bg-white text-center font-['Fredoka']"
      >
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Print Sheet Header Instructions */}
          <div className="border-b-2 border-gray-300 pb-3 text-left">
            <h2 className="text-xl font-black text-[#261F36] flex items-center gap-2">
              <Scissors size={18} /> tudi • Printable Double-Sided Card Sheet
            </h2>
            <p className="text-xs text-gray-600 mt-1 font-['Patrick_Hand']">
              Standard CR80 Wallet Size (85.6mm × 54mm). Cut along the dashed line, fold in half, and slide into your badge sleeve or wallet!
            </p>
          </div>

          {/* Dual Card Layout Container (Front & Back Side-by-Side without Lanyard) */}
          <div
            className={`flex items-center justify-center gap-6 p-4 border-2 border-dashed border-gray-400 rounded-2xl bg-white ${
              isPortraitTemplate ? 'flex-col sm:flex-row' : 'flex-col md:flex-row'
            }`}
          >
            {/* 1. FRONT SIDE */}
            <div className="flex flex-col items-center">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 font-['Space_Mono']">
                ▲ SISI DEPAN (FRONT)
              </span>
              <div className="border border-gray-300 rounded-2xl overflow-hidden p-0.5">
                <CardRenderer card={card} isBack={false} />
              </div>
            </div>

            {/* FOLD DIVIDER GUIDE */}
            <div className="flex md:flex-col items-center justify-center gap-1.5 text-gray-400 py-2">
              <div className="w-12 md:w-[2px] h-[2px] md:h-20 bg-dashed border border-gray-400" />
              <span className="text-[9px] font-['Space_Mono'] uppercase font-bold tracking-widest rotate-0 md:-rotate-90">
                FOLD LINE
              </span>
              <div className="w-12 md:w-[2px] h-[2px] md:h-20 bg-dashed border border-gray-400" />
            </div>

            {/* 2. BACK SIDE */}
            <div className="flex flex-col items-center">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 font-['Space_Mono']">
                ▲ SISI BELAKANG (BACK)
              </span>
              <div className="border border-gray-300 rounded-2xl overflow-hidden p-0.5">
                <CardRenderer card={card} isBack={true} />
              </div>
            </div>
          </div>

          <div className="text-center text-[10px] text-gray-400 font-['Space_Mono'] pt-2">
            Generated with tudi • 2D Name & Identity Card Studio • 100% Client-side
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-[#261F36]/20 bg-white py-4 px-6 text-center text-xs text-gray-500">
        <p className="font-['Fredoka'] font-bold text-gray-700">
          tudi • 2D Name & Identity Card Studio
        </p>
        <p className="font-['Patrick_Hand'] text-[13px] text-gray-400 mt-0.5">
          Pure client-side hand-drawn 2D vector card studio. Zero servers, instant export.
        </p>
      </footer>
    </div>
  );
}
