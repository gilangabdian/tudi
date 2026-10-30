'use client';

import React, { useState, useRef, useSyncExternalStore } from 'react';
import Navbar from '@/components/Navbar';
import EditorSidebar from '@/components/EditorSidebar';
import CardRenderer from '@/components/CardRenderer';
import LanyardMockup from '@/components/LanyardMockup';
import SlotRail from '@/components/SlotRail';
import { CardData } from '@/types/card';
import { FUNNY_RANDOM_PROFILES } from '@/lib/constants';
import {
  subscribe,
  getSnapshot,
  getServerSnapshot,
  updateCard,
  selectSlot,
} from '@/lib/cardStore';
import { toPng } from 'html-to-image';
import { RotateCw, Scissors } from 'lucide-react';

export default function Home() {
  const { currentSlotIndex, slotsData, card } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
  const [isBack, setIsBack] = useState(false);
  const [isLanyardMode, setIsLanyardMode] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const exportCardRef = useRef<HTMLDivElement | null>(null);

  const handleCardChange = (updated: Partial<CardData>) => {
    updateCard(updated);
  };

  const handleSelectSlot = (index: number) => {
    selectSlot(index);
  };

  const handleRandomize = () => {
    const randomProfile =
      FUNNY_RANDOM_PROFILES[Math.floor(Math.random() * FUNNY_RANDOM_PROFILES.length)];
    updateCard({
      ...randomProfile,
      name: `${randomProfile.firstName || ''} ${randomProfile.lastName || ''}`.trim(),
    });
  };

  const handleDownloadPNG = async () => {
    const exportNode = exportCardRef.current || cardRef.current;
    if (!exportNode) return;
    setIsDownloading(true);

    try {
      const dataUrl = await toPng(exportNode, {
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

  const isPortraitTemplate = card.template === 'work-badge' || card.template === 'event-pass';

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Clean Navbar */}
      <Navbar
        onRandomize={handleRandomize}
        onDownloadPNG={handleDownloadPNG}
        onPrint={handlePrint}
        isDownloading={isDownloading}
      />

      {/* Save Slots Rail (Fading 1-4, 5-10 reveal on hover) */}
      <SlotRail
        currentSlotIndex={currentSlotIndex}
        slotsData={slotsData}
        onSelectSlot={handleSelectSlot}
      />

      {/* Main Studio Workspace with Reduced Gap and No Card Wrapping */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start pr-11 sm:pr-14">
        {/* Left Column: Settings Panel (Clean, Unwrapped) */}
        <div className="lg:col-span-5 xl:col-span-4 w-full">
          <EditorSidebar
            card={card}
            onChange={handleCardChange}
            isLanyardMode={isLanyardMode}
          />
        </div>

        {/* Right Column: Clean Preview Stage (Sticky so it stays visible while scrolling sidebar) */}
        <div className="lg:col-span-7 xl:col-span-8 lg:sticky lg:top-16 lg:self-start flex flex-col items-center justify-center py-2">
          {/* Card Target Element (Visible on screen) */}
          <div className="py-2">
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

          {/* Action Controls below Preview: Flip Card + Preview with Lanyard Toggle */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-3 z-10">
            {/* Flip Action Button */}
            <button
              type="button"
              onClick={() => setIsBack(!isBack)}
              className="friendly-btn flex items-center gap-2 px-4 py-2 bg-white text-[#261F36] text-xs hover:bg-gray-50 shadow-xs"
            >
              <RotateCw size={14} className={isBack ? 'rotate-180 transition-transform' : ''} />
              <span>{isBack ? 'Flip to Front Side' : 'Flip to Back Side'}</span>
            </button>

            {/* Preview with Lanyard Toggle Button (relocated from header) */}
            <button
              type="button"
              onClick={() => setIsLanyardMode(!isLanyardMode)}
              className={`friendly-btn flex items-center gap-2 px-4 py-2 text-xs transition shadow-xs ${
                isLanyardMode
                  ? 'bg-[#6A5495] text-white hover:bg-[#56427D]'
                  : 'bg-white text-[#261F36] hover:bg-gray-50'
              }`}
            >
              <span>📿</span>
              <span>{isLanyardMode ? 'Preview with Lanyard: ON' : 'Preview with Lanyard'}</span>
            </button>
          </div>
        </div>
      </main>

      {/* Offscreen Target for Pure Card PNG Export (Always excludes lanyard) */}
      <div
        className="fixed -left-[9999px] -top-[9999px] pointer-events-none opacity-0 select-none overflow-hidden"
        aria-hidden="true"
      >
        <div ref={exportCardRef}>
          <CardRenderer card={card} isBack={isBack} />
        </div>
      </div>

      {/* DEDICATED DUAL-SIDED PRINT SHEET (Only Visible When Printing) */}
      <section
        id="printable-dual-card-sheet"
        className="hidden print:block p-8 bg-white text-center font-['Fredoka']"
      >
        <div className="max-w-3xl mx-auto space-y-4">
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
            <div className="flex flex-col items-center">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 font-['Space_Mono']">
                ▲ SISI DEPAN (FRONT)
              </span>
              <div className="border border-gray-300 rounded-2xl overflow-hidden p-0.5">
                <CardRenderer card={card} isBack={false} />
              </div>
            </div>

            <div className="flex md:flex-col items-center justify-center gap-1.5 text-gray-400 py-2">
              <div className="w-12 md:w-[2px] h-[2px] md:h-20 bg-dashed border border-gray-400" />
              <span className="text-[9px] font-['Space_Mono'] uppercase font-bold tracking-widest rotate-0 md:-rotate-90">
                FOLD LINE
              </span>
              <div className="w-12 md:w-[2px] h-[2px] md:h-20 bg-dashed border border-gray-400" />
            </div>

            <div className="flex flex-col items-center">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 font-['Space_Mono']">
                ▲ SISI BELAKANG (BACK)
              </span>
              <div className="border border-gray-300 rounded-2xl overflow-hidden p-0.5">
                <CardRenderer card={card} isBack={true} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer requested by user */}
      <footer className="py-6 border-t border-gray-200 text-center text-xs text-gray-500 font-['Space_Mono']">
        Copyright &copy; 2026 Abdian
      </footer>
    </div>
  );
}
