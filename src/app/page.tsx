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
  const [printLayout, setPrintLayout] = useState<'1-page' | '2-page'>('1-page');

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
        printLayout={printLayout}
        onTogglePrintLayout={() =>
          setPrintLayout((prev) => (prev === '1-page' ? '2-page' : '1-page'))
        }
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

            {/* Preview with Lanyard Toggle Button */}
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
        className="hidden print:block p-2 bg-white text-center font-['Fredoka']"
      >
        {printLayout === '1-page' ? (
          /* MODE 1: 1-PAGE DUAL-SIDED FOLDABLE BADGE SHEET (Crisp, spacious, perfectly unclipped) */
          <div className="flex flex-col items-center justify-center py-4">
            {/* Minimal Header */}
            <div
              className="flex items-center justify-between border-b border-gray-300 pb-1 mb-3 text-left"
              style={{ width: isPortraitTemplate ? '520px' : '416px' }}
            >
              <div className="flex items-center gap-1.5">
                <span className="font-['Fredoka'] font-black text-sm text-[#261F36]">tudi</span>
                <span className="text-[10px] font-bold text-gray-500 font-['Space_Mono']">• Double-Sided Printable Sheet</span>
              </div>
              <span className="text-[9px] text-gray-400 font-['Space_Mono']">
                CR80 Wallet Size (85.6 × 54 mm)
              </span>
            </div>

            {isPortraitTemplate ? (
              /* PORTRAIT TEMPLATES (Event Pass, Work Badge, Pop Badge): SIDE-BY-SIDE WITH VERTICAL FOLD LINE */
              <div
                className="border-2 border-dashed border-gray-400 rounded-2xl p-3 bg-white flex flex-col items-center shadow-xs"
                style={{ width: '520px' }}
              >
                {/* Side Labels Header */}
                <div className="w-full flex items-center justify-between px-2 mb-2 text-gray-400 font-['Space_Mono'] text-[9.5px] font-bold tracking-widest uppercase">
                  <span>▲ FRONT SIDE</span>
                  <span>▲ BACK SIDE</span>
                </div>

                {/* Cards Container Side-by-Side */}
                <div className="flex items-center justify-between w-full">
                  {/* Front Card Container */}
                  <div
                    className="overflow-hidden rounded-2xl relative shadow-xs border border-gray-200"
                    style={{ width: '232px', height: '348px' }}
                  >
                    <div
                      style={{
                        width: '320px',
                        height: '480px',
                        transform: 'scale(0.725)',
                        transformOrigin: 'top left',
                      }}
                    >
                      <CardRenderer card={card} isBack={false} />
                    </div>
                  </div>

                  {/* Vertical Fold / Cut Line with Scissors */}
                  <div className="flex flex-col items-center justify-between h-[348px] px-2 text-gray-400">
                    <Scissors size={12} className="text-gray-400 rotate-90" />
                    <div className="flex-1 w-0 border-r border-dashed border-gray-300 my-1" />
                    <span className="text-[7.5px] font-['Space_Mono'] uppercase font-bold tracking-widest text-gray-400 rotate-90 my-3 whitespace-nowrap">
                      FOLD OR CUT
                    </span>
                    <div className="flex-1 w-0 border-r border-dashed border-gray-300 my-1" />
                    <Scissors size={12} className="text-gray-400 -rotate-90" />
                  </div>

                  {/* Back Card Container */}
                  <div
                    className="overflow-hidden rounded-2xl relative shadow-xs border border-gray-200"
                    style={{ width: '232px', height: '348px' }}
                  >
                    <div
                      style={{
                        width: '320px',
                        height: '480px',
                        transform: 'scale(0.725)',
                        transformOrigin: 'top left',
                      }}
                    >
                      <CardRenderer card={card} isBack={true} />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* LANDSCAPE TEMPLATES (Citizen ID, Driver License): TOP-AND-BOTTOM WITH HORIZONTAL FOLD LINE */
              <div
                className="border-2 border-dashed border-gray-400 rounded-2xl p-3 bg-white flex flex-col items-center shadow-xs"
                style={{ width: '416px' }}
              >
                {/* Front Side Label */}
                <span className="text-[9.5px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 font-['Space_Mono'] self-start">
                  ▲ FRONT SIDE
                </span>

                {/* Front Card Container */}
                <div
                  className="overflow-hidden rounded-2xl relative shadow-xs border border-gray-200"
                  style={{ width: '380px', height: '240px' }}
                >
                  <div
                    style={{
                      width: '500px',
                      height: '315px',
                      transform: 'scale(0.76)',
                      transformOrigin: 'top left',
                    }}
                  >
                    <CardRenderer card={card} isBack={false} />
                  </div>
                </div>

                {/* Center Horizontal Fold / Cut Line */}
                <div className="w-full my-3 flex items-center justify-center gap-2 text-gray-400">
                  <Scissors size={11} className="text-gray-400" />
                  <div className="flex-1 border-b border-dashed border-gray-300" />
                  <span className="text-[8px] font-['Space_Mono'] uppercase font-bold tracking-widest px-2.5 py-0.5 bg-gray-100 rounded-full text-gray-500 border border-gray-200 flex items-center gap-1">
                    FOLD OR CUT LINE
                  </span>
                  <div className="flex-1 border-b border-dashed border-gray-300" />
                  <Scissors size={11} className="text-gray-400 rotate-180" />
                </div>

                {/* Back Side Label */}
                <span className="text-[9.5px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 font-['Space_Mono'] self-start">
                  ▲ BACK SIDE
                </span>

                {/* Back Card Container */}
                <div
                  className="overflow-hidden rounded-2xl relative shadow-xs border border-gray-200"
                  style={{ width: '380px', height: '240px' }}
                >
                  <div
                    style={{
                      width: '500px',
                      height: '315px',
                      transform: 'scale(0.76)',
                      transformOrigin: 'top left',
                    }}
                  >
                    <CardRenderer card={card} isBack={true} />
                  </div>
                </div>
              </div>
            )}

            {/* Instruction Tip */}
            <p className="text-[9.5px] text-gray-500 font-['Space_Mono'] mt-3 text-center">
              ✂ Cut along the outer dashed guide • Fold along the center line to fit into your badge sleeve or wallet
            </p>
          </div>
        ) : (
          /* MODE 2: 2-PAGES SEPARATE PRINT (Page 1 = Front, Page 2 = Back at Full Size) */
          <div className="w-full">
            {/* Sheet 1: Front */}
            <div className="flex flex-col items-center justify-center min-h-[90vh] py-6 text-center">
              <div className="border-b border-gray-300 pb-2 mb-6 w-full max-w-md text-center">
                <h2 className="text-base font-black text-[#261F36] font-['Fredoka']">
                  tudi • Card Print (Sheet 1 of 2: Front Side)
                </h2>
                <span className="text-xs text-gray-500 font-['Space_Mono']">
                  Standard CR80 Size • Full Scale 100%
                </span>
              </div>
              <div className="border border-gray-300 rounded-2xl overflow-hidden p-0.5 shadow-xs">
                <CardRenderer card={card} isBack={false} />
              </div>
            </div>

            {/* Page Break */}
            <div className="print-page-break" />

            {/* Sheet 2: Back */}
            <div className="flex flex-col items-center justify-center min-h-[90vh] py-6 text-center">
              <div className="border-b border-gray-300 pb-2 mb-6 w-full max-w-md text-center">
                <h2 className="text-base font-black text-[#261F36] font-['Fredoka']">
                  tudi • Card Print (Sheet 2 of 2: Back Side)
                </h2>
                <span className="text-xs text-gray-500 font-['Space_Mono']">
                  Standard CR80 Size • Full Scale 100%
                </span>
              </div>
              <div className="border border-gray-300 rounded-2xl overflow-hidden p-0.5 shadow-xs">
                <CardRenderer card={card} isBack={true} />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Footer requested by user */}
      <footer className="py-6 border-t border-gray-200 text-center text-xs text-gray-500 font-['Space_Mono']">
        Copyright &copy; 2026 Abdian
      </footer>
    </div>
  );
}
