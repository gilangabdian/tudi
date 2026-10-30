'use client';

import React, { useState } from 'react';
import { CardData, TemplateType } from '@/types/card';
import { COLOR_PRESETS, HOLDER_PRESETS, BG_PRESETS, BRAND_COLOR } from '@/lib/constants';
import PhotoUploader from './PhotoUploader';
import SignaturePad from './SignaturePad';
import {
  CreditCard,
  User,
  Palette,
  Sparkles,
} from 'lucide-react';

interface EditorSidebarProps {
  card: CardData;
  onChange: (updated: Partial<CardData>) => void;
}

type GroupTab = 'template' | 'identity' | 'creative';

export default function EditorSidebar({ card, onChange }: EditorSidebarProps) {
  const [activeGroup, setActiveGroup] = useState<GroupTab>('identity');

  const templates: { id: TemplateType; title: string; desc: string; icon: string }[] = [
    {
      id: 'pop-badge',
      title: 'Pop Intern Badge',
      desc: 'TII Studio ID with stickers & daisy frame',
      icon: '✨',
    },
    {
      id: 'driver-license',
      title: 'Driver License',
      desc: 'California Grizzly Bear hand-drawn style',
      icon: '🚗',
    },
    {
      id: 'citizen-id',
      title: 'Global Citizen ID',
      desc: 'Republic of Tudi ID with star hologram',
      icon: '🪪',
    },
    {
      id: 'work-badge',
      title: 'Corporate Pass',
      desc: 'Vertical staff badge with punch hole',
      icon: '💼',
    },
    {
      id: 'event-pass',
      title: 'Event VIP Pass',
      desc: 'Concert & festival admission pass',
      icon: '🎟️',
    },
  ];

  return (
    <div className="bg-white border-2 border-[#261F36]/80 rounded-2xl overflow-hidden flex flex-col h-full max-h-[85vh]">
      {/* 3 Streamlined Main Groups */}
      <div className="flex border-b-2 border-[#261F36]/20 bg-[#F4F0FA] p-1.5 gap-1.5 select-none">
        <button
          type="button"
          onClick={() => setActiveGroup('template')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold transition ${
            activeGroup === 'template'
              ? 'bg-[#6A5495] text-white shadow-xs'
              : 'text-[#261F36] hover:bg-white/70'
          }`}
        >
          <CreditCard size={14} />
          <span>1. Template</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveGroup('identity')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold transition ${
            activeGroup === 'identity'
              ? 'bg-[#6A5495] text-white shadow-xs'
              : 'text-[#261F36] hover:bg-white/70'
          }`}
        >
          <User size={14} />
          <span>2. Info & Colors</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveGroup('creative')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold transition ${
            activeGroup === 'creative'
              ? 'bg-[#6A5495] text-white shadow-xs'
              : 'text-[#261F36] hover:bg-white/70'
          }`}
        >
          <Palette size={14} />
          <span>3. Avatar & Art</span>
        </button>
      </div>

      {/* Group Content Container */}
      <div className="p-4 overflow-y-auto space-y-4 flex-1">
        {/* GROUP 1: TEMPLATE SELECTOR */}
        {activeGroup === 'template' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Select Card Type:
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {templates.map((tpl) => {
                const isSelected = card.template === tpl.id;
                return (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => {
                      let updates: Partial<CardData> = { template: tpl.id };
                      if (tpl.id === 'pop-badge') {
                        updates.title = 'TII';
                        updates.subtitle = 'FEAR DEPT.';
                        updates.department = 'FEAR DEPT.';
                        updates.roleTag = 'THE INTERN';
                        updates.companyLogoText = 'TII';
                        updates.holderColor = '#96C6B2';
                        updates.holderPattern = 'flowers';
                        updates.themeColor = '#6A5495';
                        updates.photoPresetId = 'intern-kase';
                      } else if (tpl.id === 'driver-license') {
                        updates.title = 'CALIFORNIA';
                        updates.subtitle = 'Driver License';
                        updates.themeColor = '#3A8891';
                        updates.photoPresetId = 'bear-grizzly';
                      } else if (tpl.id === 'citizen-id') {
                        updates.title = 'REPUBLIC OF TUDI';
                        updates.subtitle = 'CITIZEN IDENTITY CARD';
                        updates.themeColor = '#6A5495';
                        updates.photoPresetId = 'cool-cat';
                      } else if (tpl.id === 'work-badge') {
                        updates.title = 'ACME CORP';
                        updates.subtitle = 'STAFF IDENTIFICATION';
                        updates.themeColor = '#2D6A4F';
                        updates.photoPresetId = 'capybara';
                      } else if (tpl.id === 'event-pass') {
                        updates.title = 'TUDI FEST 2026';
                        updates.subtitle = 'ALL ACCESS PASS';
                        updates.themeColor = '#6A5495';
                        updates.photoPresetId = 'cool-alien';
                      }
                      onChange(updates);
                    }}
                    className={`flex items-start gap-3 p-3 rounded-xl border-2 text-left transition ${
                      isSelected
                        ? 'border-[#6A5495] bg-[#6A5495]/10'
                        : 'border-gray-200 hover:border-gray-400 bg-white'
                    }`}
                  >
                    <span className="text-2xl p-2 rounded-xl bg-white border border-gray-200">
                      {tpl.icon}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-sm text-[#261F36]">
                          {tpl.title}
                        </span>
                        {isSelected && (
                          <span className="bg-[#6A5495] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{tpl.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* GROUP 2: IDENTITY INFO & COLORS */}
        {activeGroup === 'identity' && (
          <div className="space-y-4">
            {/* Pop Badge Dynamic Fields */}
            {card.template === 'pop-badge' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Logo Text (Top Banner)
                    </label>
                    <input
                      type="text"
                      value={card.companyLogoText || card.title}
                      onChange={(e) =>
                        onChange({ companyLogoText: e.target.value, title: e.target.value })
                      }
                      placeholder="e.g. TII"
                      className="w-full px-2.5 py-1.5 border-2 border-gray-300 rounded-xl text-xs font-bold focus:outline-none focus:border-[#6A5495]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Department Box
                    </label>
                    <input
                      type="text"
                      value={card.department || card.subtitle}
                      onChange={(e) =>
                        onChange({ department: e.target.value, subtitle: e.target.value })
                      }
                      placeholder="e.g. FEAR DEPT."
                      className="w-full px-2.5 py-1.5 border-2 border-gray-300 rounded-xl text-xs font-bold focus:outline-none focus:border-[#6A5495]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={card.firstName}
                      onChange={(e) => onChange({ firstName: e.target.value })}
                      placeholder="e.g. KASE"
                      className="w-full px-2.5 py-1.5 border-2 border-gray-300 rounded-xl text-xs font-bold focus:outline-none focus:border-[#6A5495]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Last Name / Initial
                    </label>
                    <input
                      type="text"
                      value={card.lastName}
                      onChange={(e) => onChange({ lastName: e.target.value })}
                      placeholder="e.g. Y."
                      className="w-full px-2.5 py-1.5 border-2 border-gray-300 rounded-xl text-xs font-bold focus:outline-none focus:border-[#6A5495]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Role / Subtitle
                    </label>
                    <input
                      type="text"
                      value={card.roleTag || card.jobTitle}
                      onChange={(e) =>
                        onChange({ roleTag: e.target.value, jobTitle: e.target.value })
                      }
                      placeholder="e.g. THE INTERN"
                      className="w-full px-2.5 py-1.5 border-2 border-gray-300 rounded-xl text-xs font-bold focus:outline-none focus:border-[#6A5495]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Badge ID Code
                    </label>
                    <input
                      type="text"
                      value={card.idNumber}
                      onChange={(e) => onChange({ idNumber: e.target.value })}
                      placeholder="e.g. TII-404-INT"
                      className="w-full px-2.5 py-1.5 border-2 border-gray-300 rounded-xl text-xs font-['Space_Mono'] font-bold focus:outline-none focus:border-[#6A5495]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Other Templates Fields */}
            {card.template !== 'pop-badge' && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Card Title
                    </label>
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => onChange({ title: e.target.value })}
                      className="w-full px-2.5 py-1.5 border-2 border-gray-300 rounded-xl text-xs font-bold focus:outline-none focus:border-[#6A5495]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={card.subtitle}
                      onChange={(e) => onChange({ subtitle: e.target.value })}
                      className="w-full px-2.5 py-1.5 border-2 border-gray-300 rounded-xl text-xs font-bold focus:outline-none focus:border-[#6A5495]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={card.firstName}
                      onChange={(e) => onChange({ firstName: e.target.value })}
                      className="w-full px-2.5 py-1.5 border-2 border-gray-300 rounded-xl text-xs font-bold focus:outline-none focus:border-[#6A5495]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={card.lastName}
                      onChange={(e) => onChange({ lastName: e.target.value })}
                      className="w-full px-2.5 py-1.5 border-2 border-gray-300 rounded-xl text-xs font-bold focus:outline-none focus:border-[#6A5495]"
                    />
                  </div>
                </div>

                {/* Driver License specifics */}
                {card.template === 'driver-license' && (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">DOB</label>
                        <input
                          type="text"
                          value={card.birthDate}
                          onChange={(e) => onChange({ birthDate: e.target.value })}
                          className="w-full px-2.5 py-1.5 border-2 border-gray-300 rounded-xl text-xs font-bold focus:outline-none focus:border-[#6A5495]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">Gender</label>
                        <input
                          type="text"
                          value={card.gender}
                          onChange={(e) => onChange({ gender: e.target.value })}
                          className="w-full px-2.5 py-1.5 border-2 border-gray-300 rounded-xl text-xs font-bold focus:outline-none focus:border-[#6A5495]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">Height</label>
                        <input
                          type="text"
                          value={card.height}
                          onChange={(e) => onChange({ height: e.target.value })}
                          className="w-full px-2.5 py-1.5 border-2 border-gray-300 rounded-xl text-xs font-bold focus:outline-none focus:border-[#6A5495]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-700 block mb-1">Weight</label>
                        <input
                          type="text"
                          value={card.weight}
                          onChange={(e) => onChange({ weight: e.target.value })}
                          className="w-full px-2.5 py-1.5 border-2 border-gray-300 rounded-xl text-xs font-bold focus:outline-none focus:border-[#6A5495]"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Citizen ID specifics */}
                {card.template === 'citizen-id' && (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">Birth Date</label>
                      <input
                        type="text"
                        value={card.birthDate}
                        onChange={(e) => onChange({ birthDate: e.target.value })}
                        className="w-full px-2.5 py-1.5 border-2 border-gray-300 rounded-xl text-xs font-bold focus:outline-none focus:border-[#6A5495]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-700 block mb-1">Occupation</label>
                      <input
                        type="text"
                        value={card.jobTitle}
                        onChange={(e) => onChange({ jobTitle: e.target.value })}
                        className="w-full px-2.5 py-1.5 border-2 border-gray-300 rounded-xl text-xs font-bold focus:outline-none focus:border-[#6A5495]"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Colors & Palette Sub-section */}
            <div className="border-t border-gray-200 pt-3 space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">
                  Card Accent Color:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {COLOR_PRESETS.map((color) => (
                    <button
                      key={color.hex}
                      type="button"
                      onClick={() => onChange({ themeColor: color.hex })}
                      className={`flex items-center gap-1.5 py-1 px-2 rounded-lg border text-[11px] font-bold transition ${
                        card.themeColor === color.hex
                          ? 'border-[#6A5495] bg-[#6A5495]/10 text-[#6A5495]'
                          : 'border-gray-200 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">
                  Card Paper Tint:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {BG_PRESETS.map((bg) => (
                    <button
                      key={bg.hex}
                      type="button"
                      onClick={() => onChange({ cardBgColor: bg.hex })}
                      className={`flex items-center gap-1.5 py-1 px-2 rounded-lg border text-[11px] font-bold transition ${
                        card.cardBgColor === bg.hex
                          ? 'border-[#6A5495] bg-[#6A5495]/10 text-[#6A5495]'
                          : 'border-gray-200 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20"
                        style={{ backgroundColor: bg.hex }}
                      />
                      <span>{bg.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GROUP 3: CREATIVE (AVATAR, SIGNATURE & ACCESSORIES) */}
        {activeGroup === 'creative' && (
          <div className="space-y-4">
            {/* Avatar & Photo Picker */}
            <div className="border-b border-gray-200 pb-4">
              <PhotoUploader
                photoUrl={card.photoUrl}
                photoPresetId={card.photoPresetId}
                photoFilter={card.photoFilter}
                onPhotoChange={(url, presetId) =>
                  onChange({ photoUrl: url, photoPresetId: presetId })
                }
                onFilterChange={(filter) => onChange({ photoFilter: filter })}
              />
            </div>

            {/* Signature Canvas */}
            <div className="border-b border-gray-200 pb-4">
              <label className="text-xs font-bold text-gray-700 block mb-2">
                Handwritten Signature:
              </label>
              <SignaturePad
                signatureDataUrl={card.signatureDataUrl}
                signatureText={card.signatureText}
                onChange={(res) => onChange(res)}
              />
            </div>

            {/* Badge Holder & Lanyard Frame Settings */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1.5">
                  Holder Frame Color:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {HOLDER_PRESETS.map((h) => (
                    <button
                      key={h.hex}
                      type="button"
                      onClick={() => onChange({ holderColor: h.hex })}
                      className={`flex items-center gap-1.5 py-1 px-2 rounded-lg border text-[11px] font-bold transition ${
                        card.holderColor === h.hex
                          ? 'border-[#6A5495] bg-[#6A5495]/10 text-[#6A5495]'
                          : 'border-gray-200 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20"
                        style={{ backgroundColor: h.hex }}
                      />
                      <span>{h.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Edge Doodles Toggle */}
              <div className="flex items-center justify-between py-1">
                <span className="text-xs font-bold text-gray-700">Daisy Flower Doodles</span>
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      holderPattern: card.holderPattern === 'flowers' ? 'clean' : 'flowers',
                    })
                  }
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition border ${
                    card.holderPattern === 'flowers'
                      ? 'bg-[#6A5495] text-white border-[#6A5495]'
                      : 'bg-gray-100 text-gray-700 border-gray-300'
                  }`}
                >
                  {card.holderPattern === 'flowers' ? '🌼 Active' : 'Clean'}
                </button>
              </div>

              {/* Pop Badge Stickers Toggle */}
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Overlapping Badges:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: 'dnf', label: '🚨 DNF Tag' },
                    { id: 'no-headaches', label: '💊 No Headaches' },
                    { id: 'voxel-pin', label: '🧊 Mascot Pin' },
                  ].map((st) => {
                    const hasSticker = card.stickers?.includes(st.id);
                    return (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => {
                          const current = card.stickers || [];
                          const next = hasSticker
                            ? current.filter((s) => s !== st.id)
                            : [...current, st.id];
                          onChange({ stickers: next });
                        }}
                        className={`px-2.5 py-1 rounded-lg border text-xs font-bold transition ${
                          hasSticker
                            ? 'bg-[#6A5495] text-white border-[#6A5495]'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        {st.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
