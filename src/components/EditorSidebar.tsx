'use client';

import React, { useState } from 'react';
import { CardData, TemplateType, PatternType } from '@/types/card';
import { COLOR_PRESETS, BG_PRESETS, BRAND_COLOR } from '@/lib/constants';
import PhotoUploader from './PhotoUploader';
import SignaturePad from './SignaturePad';
import {
  CreditCard,
  User,
  Palette,
  Camera,
  PenTool,
  Tag,
  Sparkles,
} from 'lucide-react';

interface EditorSidebarProps {
  card: CardData;
  onChange: (updated: Partial<CardData>) => void;
}

type TabType = 'template' | 'details' | 'style' | 'photo' | 'signature' | 'lanyard';

export default function EditorSidebar({ card, onChange }: EditorSidebarProps) {
  const [activeTab, setActiveTab] = useState<TabType>('details');

  const templates: { id: TemplateType; title: string; desc: string; icon: string }[] = [
    {
      id: 'driver-license',
      title: 'Driver License',
      desc: 'California We Bare Bears Style',
      icon: '🚗',
    },
    {
      id: 'citizen-id',
      title: 'KTP Internasional',
      desc: 'Citizen Card Republik Tudi',
      icon: '🪪',
    },
    {
      id: 'work-badge',
      title: 'Work Badge',
      desc: 'Kartu Kerja & Staff Pass Vertikal',
      icon: '💼',
    },
    {
      id: 'event-pass',
      title: 'Event VIP Pass',
      desc: 'Konser & Festival Access Pass',
      icon: '🎟️',
    },
  ];

  return (
    <div className="bg-white border-2 border-[#261F36] rounded-2xl shadow-[4px_4px_0px_#261F36] overflow-hidden flex flex-col h-full max-h-[85vh]">
      {/* Tab Navigation */}
      <div className="flex border-b-2 border-[#261F36] bg-[#F4F0FA] p-1.5 gap-1 overflow-x-auto select-none">
        {[
          { id: 'template', label: 'Template', icon: CreditCard },
          { id: 'details', label: 'Identitas', icon: User },
          { id: 'style', label: 'Warna', icon: Palette },
          { id: 'photo', label: 'Foto', icon: Camera },
          { id: 'signature', label: 'Tanda Tangan', icon: PenTool },
          { id: 'lanyard', label: 'Lanyard', icon: Tag },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                isActive
                  ? 'bg-[#6A5495] text-white border-2 border-[#261F36] shadow-[2px_2px_0px_#261F36]'
                  : 'text-gray-700 hover:bg-white/70 hover:text-[#261F36]'
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Area (Scrollable) */}
      <div className="p-4 overflow-y-auto space-y-4 flex-1">
        {/* TAB 1: TEMPLATE */}
        {activeTab === 'template' && (
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase text-gray-500 tracking-wider">
              Pilih Jenis Kartu 2D:
            </h3>
            <div className="grid grid-cols-1 gap-2.5">
              {templates.map((tpl) => {
                const isSelected = card.template === tpl.id;
                return (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => {
                      let updates: Partial<CardData> = { template: tpl.id };
                      if (tpl.id === 'driver-license') {
                        updates.title = 'CALIFORNIA';
                        updates.subtitle = 'Driver License';
                        updates.themeColor = '#3A8891';
                      } else if (tpl.id === 'citizen-id') {
                        updates.title = 'REPUBLIK TUDI';
                        updates.subtitle = 'KARTU TANDA PENDUDUK';
                        updates.themeColor = '#6A5495';
                      } else if (tpl.id === 'work-badge') {
                        updates.title = 'ACME CORP';
                        updates.subtitle = 'STAFF IDENTIFICATION';
                        updates.themeColor = '#2D6A4F';
                      } else if (tpl.id === 'event-pass') {
                        updates.title = 'TUDI FEST 2026';
                        updates.subtitle = 'ALL ACCESS PASS';
                        updates.themeColor = '#6A5495';
                      }
                      onChange(updates);
                    }}
                    className={`flex items-start gap-3 p-3 rounded-xl border-2 text-left transition ${
                      isSelected
                        ? 'border-[#261F36] bg-[#6A5495]/10 shadow-[3px_3px_0px_#261F36]'
                        : 'border-gray-200 hover:border-[#6A5495] bg-white'
                    }`}
                  >
                    <span className="text-2xl p-2 rounded-lg bg-white border border-[#261F36]/20">
                      {tpl.icon}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-[#261F36]">
                          {tpl.title}
                        </span>
                        {isSelected && (
                          <span className="bg-[#6A5495] text-white text-[10px] font-bold px-1.5 py-0.2 rounded">
                            Aktif
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

        {/* TAB 2: DETAILS / IDENTITAS */}
        {activeTab === 'details' && (
          <div className="space-y-3.5">
            {/* Header Titles */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Judul Kartu
                </label>
                <input
                  type="text"
                  value={card.title}
                  onChange={(e) => onChange({ title: e.target.value })}
                  className="w-full px-2.5 py-1.5 border-2 border-[#261F36] rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#6A5495]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Sub-Judul
                </label>
                <input
                  type="text"
                  value={card.subtitle}
                  onChange={(e) => onChange({ subtitle: e.target.value })}
                  className="w-full px-2.5 py-1.5 border-2 border-[#261F36] rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#6A5495]"
                />
              </div>
            </div>

            {/* Names */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  {card.template === 'driver-license' ? 'First Name (FN)' : 'Nama Depan'}
                </label>
                <input
                  type="text"
                  value={card.firstName}
                  onChange={(e) => onChange({ firstName: e.target.value })}
                  className="w-full px-2.5 py-1.5 border-2 border-[#261F36] rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#6A5495]"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  {card.template === 'driver-license' ? 'Last Name (LN)' : 'Nama Belakang'}
                </label>
                <input
                  type="text"
                  value={card.lastName}
                  onChange={(e) => onChange({ lastName: e.target.value })}
                  className="w-full px-2.5 py-1.5 border-2 border-[#261F36] rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#6A5495]"
                />
              </div>
            </div>

            {/* ID Number / NIK */}
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                {card.template === 'citizen-id'
                  ? 'NIK (Nomor Induk Kependudukan)'
                  : card.template === 'driver-license'
                  ? 'No. License'
                  : 'ID Number / Kode Tiket'}
              </label>
              <input
                type="text"
                value={card.idNumber}
                onChange={(e) => onChange({ idNumber: e.target.value })}
                className="w-full px-2.5 py-1.5 border-2 border-[#261F36] rounded-xl text-xs font-['Space_Mono'] font-bold focus:outline-none focus:ring-2 focus:ring-[#6A5495]"
              />
            </div>

            {/* Driver License Specific Fields */}
            {card.template === 'driver-license' && (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      DOB (Tgl Lahir)
                    </label>
                    <input
                      type="text"
                      value={card.birthDate}
                      onChange={(e) => onChange({ birthDate: e.target.value })}
                      placeholder="e.g. UNKNOWN / 01-01-1995"
                      className="w-full px-2.5 py-1.5 border-2 border-[#261F36] rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#6A5495]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Gender
                    </label>
                    <input
                      type="text"
                      value={card.gender}
                      onChange={(e) => onChange({ gender: e.target.value })}
                      className="w-full px-2.5 py-1.5 border-2 border-[#261F36] rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#6A5495]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Height (Tinggi)
                    </label>
                    <input
                      type="text"
                      value={card.height}
                      onChange={(e) => onChange({ height: e.target.value })}
                      placeholder={`e.g. 6'2"`}
                      className="w-full px-2.5 py-1.5 border-2 border-[#261F36] rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#6A5495]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Weight (Berat)
                    </label>
                    <input
                      type="text"
                      value={card.weight}
                      onChange={(e) => onChange({ weight: e.target.value })}
                      placeholder="e.g. 595 lbs"
                      className="w-full px-2.5 py-1.5 border-2 border-[#261F36] rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#6A5495]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Hair Color
                    </label>
                    <input
                      type="text"
                      value={card.hair}
                      onChange={(e) => onChange({ hair: e.target.value })}
                      className="w-full px-2.5 py-1.5 border-2 border-[#261F36] rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#6A5495]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Eyes
                    </label>
                    <input
                      type="text"
                      value={card.eyes}
                      onChange={(e) => onChange({ eyes: e.target.value })}
                      className="w-full px-2.5 py-1.5 border-2 border-[#261F36] rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#6A5495]"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Citizen ID Specific Fields */}
            {card.template === 'citizen-id' && (
              <>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Tanggal Lahir
                  </label>
                  <input
                    type="text"
                    value={card.birthDate}
                    onChange={(e) => onChange({ birthDate: e.target.value })}
                    className="w-full px-2.5 py-1.5 border-2 border-[#261F36] rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#6A5495]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Alamat Domisili
                  </label>
                  <input
                    type="text"
                    value={card.address}
                    onChange={(e) => onChange({ address: e.target.value })}
                    className="w-full px-2.5 py-1.5 border-2 border-[#261F36] rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#6A5495]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Pekerjaan
                  </label>
                  <input
                    type="text"
                    value={card.jobTitle}
                    onChange={(e) => onChange({ jobTitle: e.target.value })}
                    className="w-full px-2.5 py-1.5 border-2 border-[#261F36] rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#6A5495]"
                  />
                </div>
              </>
            )}

            {/* Work Badge Specific Fields */}
            {card.template === 'work-badge' && (
              <>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Nama Perusahaan / Organisasi
                  </label>
                  <input
                    type="text"
                    value={card.companyName}
                    onChange={(e) => onChange({ companyName: e.target.value })}
                    className="w-full px-2.5 py-1.5 border-2 border-[#261F36] rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#6A5495]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Jabatan / Role
                    </label>
                    <input
                      type="text"
                      value={card.jobTitle}
                      onChange={(e) => onChange({ jobTitle: e.target.value })}
                      className="w-full px-2.5 py-1.5 border-2 border-[#261F36] rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#6A5495]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Departemen
                    </label>
                    <input
                      type="text"
                      value={card.department}
                      onChange={(e) => onChange({ department: e.target.value })}
                      className="w-full px-2.5 py-1.5 border-2 border-[#261F36] rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#6A5495]"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Event Pass Specific Fields */}
            {card.template === 'event-pass' && (
              <>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Nama Event
                  </label>
                  <input
                    type="text"
                    value={card.eventName}
                    onChange={(e) => onChange({ eventName: e.target.value })}
                    className="w-full px-2.5 py-1.5 border-2 border-[#261F36] rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#6A5495]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Tanggal Event
                    </label>
                    <input
                      type="text"
                      value={card.eventDate}
                      onChange={(e) => onChange({ eventDate: e.target.value })}
                      className="w-full px-2.5 py-1.5 border-2 border-[#261F36] rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#6A5495]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Tier Akses
                    </label>
                    <select
                      value={card.accessTier}
                      onChange={(e) =>
                        onChange({ accessTier: e.target.value as CardData['accessTier'] })
                      }
                      className="w-full px-2 py-1.5 border-2 border-[#261F36] rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#6A5495]"
                    >
                      <option value="VIP">VIP</option>
                      <option value="ALL ACCESS">ALL ACCESS</option>
                      <option value="STAFF">STAFF</option>
                      <option value="CREW">CREW</option>
                      <option value="SPEAKER">SPEAKER</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Venue / Panggung
                  </label>
                  <input
                    type="text"
                    value={card.venue}
                    onChange={(e) => onChange({ venue: e.target.value })}
                    className="w-full px-2.5 py-1.5 border-2 border-[#261F36] rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#6A5495]"
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* TAB 3: WARNA & KERTAS */}
        {activeTab === 'style' && (
          <div className="space-y-4">
            {/* Main Accent Color */}
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-2">
                Warna Aksen Utama (Header / Barcode):
              </label>
              <div className="grid grid-cols-4 gap-2">
                {COLOR_PRESETS.map((color) => (
                  <button
                    key={color.hex}
                    type="button"
                    onClick={() => onChange({ themeColor: color.hex })}
                    className={`flex items-center gap-1.5 p-1.5 rounded-lg border-2 text-[11px] font-bold transition ${
                      card.themeColor === color.hex
                        ? 'border-[#261F36] shadow-[2px_2px_0px_#261F36]'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/30"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="truncate">{color.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-gray-500">Custom hex:</span>
                <input
                  type="color"
                  value={card.themeColor}
                  onChange={(e) => onChange({ themeColor: e.target.value })}
                  className="w-8 h-8 rounded border-2 border-[#261F36] cursor-pointer"
                />
                <span className="text-xs font-['Space_Mono']">{card.themeColor}</span>
              </div>
            </div>

            {/* Background Paper */}
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-2">
                Warna Kertas Kartu:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {BG_PRESETS.map((bg) => (
                  <button
                    key={bg.hex}
                    type="button"
                    onClick={() => onChange({ cardBgColor: bg.hex })}
                    className={`p-2 rounded-lg border-2 text-xs font-bold transition flex items-center gap-2 ${
                      card.cardBgColor === bg.hex
                        ? 'border-[#261F36] shadow-[2px_2px_0px_#261F36]'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/30"
                      style={{ backgroundColor: bg.hex }}
                    />
                    <span className="truncate text-[11px]">{bg.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Pattern */}
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-2">
                Tekstur / Pola Kartu:
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['vintage', 'dots', 'grid', 'plain'] as PatternType[]).map((pat) => (
                  <button
                    key={pat}
                    type="button"
                    onClick={() => onChange({ pattern: pat })}
                    className={`py-1.5 px-2 rounded-lg border-2 text-xs font-bold capitalize transition ${
                      card.pattern === pat
                        ? 'bg-[#6A5495] text-white border-[#261F36] shadow-[2px_2px_0px_#261F36]'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {pat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: FOTO & AVATAR */}
        {activeTab === 'photo' && (
          <PhotoUploader
            photoUrl={card.photoUrl}
            photoPresetId={card.photoPresetId}
            photoFilter={card.photoFilter}
            onPhotoChange={(url, presetId) =>
              onChange({ photoUrl: url, photoPresetId: presetId })
            }
            onFilterChange={(filter) => onChange({ photoFilter: filter })}
          />
        )}

        {/* TAB 5: TANDA TANGAN */}
        {activeTab === 'signature' && (
          <SignaturePad
            signatureDataUrl={card.signatureDataUrl}
            signatureText={card.signatureText}
            onChange={(res) => onChange(res)}
          />
        )}

        {/* TAB 6: LANYARD & STAMPS */}
        {activeTab === 'lanyard' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Teks Sablon pada Tali Lanyard:
              </label>
              <input
                type="text"
                value={card.lanyardText}
                onChange={(e) => onChange({ lanyardText: e.target.value })}
                placeholder="e.g. TUDI • OFFICIAL MEMBER"
                className="w-full px-2.5 py-1.5 border-2 border-[#261F36] rounded-xl text-xs font-bold font-['Space_Mono'] uppercase focus:outline-none focus:ring-2 focus:ring-[#6A5495]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-2">
                Warna Tali Lanyard:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={card.lanyardColor}
                  onChange={(e) => onChange({ lanyardColor: e.target.value })}
                  className="w-9 h-9 rounded border-2 border-[#261F36] cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => onChange({ lanyardColor: BRAND_COLOR })}
                  className="px-2.5 py-1 text-xs border-2 border-[#261F36] rounded-lg bg-[#6A5495] text-white font-bold"
                >
                  Set Brand (#6A5495)
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-2">
                Stempel & Badge 2D Tambahan:
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'verified', label: '★ Verified Stamp' },
                  { id: 'approved', label: '✓ Approved Seal' },
                  { id: 'pawprint', label: '🐾 Pawprint Watermark' },
                ].map((st) => {
                  const hasStamp = card.stamps.includes(st.id);
                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => {
                        const newStamps = hasStamp
                          ? card.stamps.filter((s) => s !== st.id)
                          : [...card.stamps, st.id];
                        onChange({ stamps: newStamps });
                      }}
                      className={`px-3 py-1.5 rounded-lg border-2 text-xs font-bold transition ${
                        hasStamp
                          ? 'bg-[#6A5495] text-white border-[#261F36] shadow-[2px_2px_0px_#261F36]'
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
        )}
      </div>
    </div>
  );
}

