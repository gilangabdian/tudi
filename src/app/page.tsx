'use client';

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import EditorSidebar from '@/components/EditorSidebar';
import CardRenderer from '@/components/CardRenderer';
import LanyardMockup from '@/components/LanyardMockup';
import { CardData } from '@/types/card';
import { DEFAULT_CARD_DATA, FUNNY_RANDOM_PROFILES } from '@/lib/constants';
import { toPng } from 'html-to-image';
import { Sparkles, Scissors, Eye, RotateCw } from 'lucide-react';

const STORAGE_ACTIVE_KEY = 'tudi_active_card_v1';
const STORAGE_SLOTS_KEY = 'tudi_saved_slots_v1';

export default function Home() {
  const [card, setCard] = useState<CardData>(DEFAULT_CARD_DATA);
  const [isBack, setIsBack] = useState(false);
  const [isLanyardMode, setIsLanyardMode] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [savedSlots, setSavedSlots] = useState<{ id: string; name: string }[]>([
    { id: DEFAULT_CARD_DATA.id, name: DEFAULT_CARD_DATA.name },
  ]);
  const [isMounted, setIsMounted] = useState(false);

  const cardRef = useRef<HTMLDivElement | null>(null);

  // Load from LocalStorage on mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const storedActive = localStorage.getItem(STORAGE_ACTIVE_KEY);
      if (storedActive) {
        setCard(JSON.parse(storedActive));
      }
      const storedSlots = localStorage.getItem(STORAGE_SLOTS_KEY);
      if (storedSlots) {
        setSavedSlots(JSON.parse(storedSlots));
      }
    } catch (e) {
      console.warn('LocalStorage load error:', e);
    }
  }, []);

  // Save active card to LocalStorage on change
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem(STORAGE_ACTIVE_KEY, JSON.stringify(card));
      // Update name in slots if current slot matches
      setSavedSlots((prev) => {
        const next = prev.map((s) =>
          s.id === card.id ? { ...s, name: `${card.firstName} ${card.lastName}`.trim() || 'Untitled Card' } : s
        );
        localStorage.setItem(STORAGE_SLOTS_KEY, JSON.stringify(next));
        return next;
      });
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

  const handleRandomize = () => {
    const randomProfile =
      FUNNY_RANDOM_PROFILES[Math.floor(Math.random() * FUNNY_RANDOM_PROFILES.length)];
    handleCardChange({
      ...randomProfile,
      name: `${randomProfile.firstName} ${randomProfile.lastName}`.trim(),
    });
  };

  const handleSaveNewSlot = () => {
    const newId = `card-${Date.now()}`;
    const newName = `Kartu Baru #${savedSlots.length + 1}`;
    const newCard: CardData = {
      ...card,
      id: newId,
      name: newName,
      updatedAt: Date.now(),
    };
    const nextSlots = [...savedSlots, { id: newId, name: newName }];
    setSavedSlots(nextSlots);
    setCard(newCard);
    try {
      localStorage.setItem(STORAGE_SLOTS_KEY, JSON.stringify(nextSlots));
      localStorage.setItem(STORAGE_ACTIVE_KEY, JSON.stringify(newCard));
    } catch (e) {
      console.warn(e);
    }
  };

  const handleSelectSlot = (id: string) => {
    if (id === card.id) return;
    // Load slot or keep current
    const slot = savedSlots.find((s) => s.id === id);
    if (!slot) return;
    handleCardChange({ id: slot.id, name: slot.name });
  };

  const handleDownloadPNG = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);

    try {
      // High-DPI export: pixelRatio 3 gives 300 DPI resolution
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
      alert('Gagal mendownload gambar. Coba lagi!');
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
          text: `Lihat kartu 2D buatan ku di tudi! Karakter: ${card.firstName} ${card.lastName}`,
          url: window.location.href,
        });
      } catch (e) {
        // user dismissed
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link website berhasil disalin ke clipboard! Bagikan ke temanmu.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navbar */}
      <Navbar
        onRandomize={handleRandomize}
        onFlip={() => setIsBack(!isBack)}
        isBack={isBack}
        isLanyardMode={isLanyardMode}
        onToggleLanyard={() => setIsLanyardMode(!isLanyardMode)}
        onDownloadPNG={handleDownloadPNG}
        onPrint={handlePrint}
        onShare={handleShare}
        isDownloading={isDownloading}
        savedSlots={savedSlots}
        currentCardId={card.id}
        onSelectSlot={handleSelectSlot}
        onSaveNewSlot={handleSaveNewSlot}
      />

      {/* Main Studio Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form Editor Sidebar */}
        <div className="lg:col-span-5 xl:col-span-4 w-full">
          <EditorSidebar card={card} onChange={handleCardChange} />
        </div>

        {/* Right Column: Live Interactive Card Stage */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-center justify-center min-h-[600px] p-4 sm:p-8 rounded-3xl border-2 border-dashed border-[#6A5495]/30 bg-[#F4F0FA]/40 relative overflow-hidden">
          {/* Subtle Background 2D Decors */}
          <div className="absolute top-4 left-6 text-xs font-['Patrick_Hand'] text-gray-400 select-none flex items-center gap-1.5">
            <Sparkles size={14} className="text-[#6A5495]" /> 2D Live Interactive Preview
          </div>

          <div className="absolute top-4 right-6 flex items-center gap-2 select-none">
            <span className="text-[11px] font-['Space_Mono'] bg-white border border-[#261F36] px-2 py-0.5 rounded-full font-bold">
              CR80 • 85.6mm × 54mm
            </span>
          </div>

          {/* The Target Card Wrapper (captured by html-to-image) */}
          <div className="my-auto py-6">
            <div id="printable-card-area" ref={cardRef} className="transition-transform duration-300">
              {isLanyardMode ? (
                <LanyardMockup color={card.lanyardColor} text={card.lanyardText}>
                  <CardRenderer card={card} isBack={isBack} />
                </LanyardMockup>
              ) : (
                <CardRenderer card={card} isBack={isBack} />
              )}
            </div>
          </div>

          {/* Quick Action Floating Bar Below Card */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4 z-10">
            <button
              type="button"
              onClick={() => setIsBack(!isBack)}
              className="doodle-btn flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[#261F36] font-bold text-xs"
            >
              <RotateCw size={14} />
              <span>{isBack ? 'Lihat Sisi Depan' : 'Lihat Sisi Belakang'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsLanyardMode(!isLanyardMode)}
              className={`doodle-btn flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs transition ${
                isLanyardMode
                  ? 'bg-[#6A5495] text-white shadow-[2px_2px_0px_#261F36]'
                  : 'bg-white text-[#261F36]'
              }`}
            >
              <span>📿</span>
              <span>{isLanyardMode ? 'Lepas Lanyard' : 'Pasang Lanyard Tali'}</span>
            </button>
          </div>

          {/* Helpful Tip */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 font-['Patrick_Hand']">
              💡 Tip: Data tersimpan otomatis di browser kamu (LocalStorage). Hasil download PNG beresolusi tajam 300 DPI siap cetak!
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-[#261F36] bg-white py-4 px-6 text-center text-xs text-gray-500">
        <p className="font-['Fredoka'] font-bold text-gray-700">
          tudi • 2D Name & Identity Card Studio
        </p>
        <p className="font-['Patrick_Hand'] text-[13px] text-gray-400 mt-0.5">
          Dibuat dengan gaya kartun 2D & doodle unik tanpa backend. Bebas pakai langsung di browser.
        </p>
      </footer>
    </div>
  );
}
