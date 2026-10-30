'use client';

import React, { useRef } from 'react';
import { PRESET_AVATARS } from '@/lib/constants';
import { Upload, Image as ImageIcon, Sparkles, Trash2 } from 'lucide-react';

interface PhotoUploaderProps {
  photoUrl: string;
  photoPresetId?: string;
  photoFilter: 'none' | 'doodle-border' | 'comic' | 'sketch';
  onPhotoChange: (url: string, presetId?: string) => void;
  onFilterChange: (filter: 'none' | 'doodle-border' | 'comic' | 'sketch') => void;
}

export default function PhotoUploader({
  photoUrl,
  photoPresetId,
  photoFilter,
  onPhotoChange,
  onFilterChange,
}: PhotoUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Harap pilih file gambar (JPG, PNG, WebP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      onPhotoChange(result, undefined);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPreset = (id: string) => {
    onPhotoChange('', id);
  };

  return (
    <div className="space-y-4">
      {/* Preset 2D Avatars */}
      <div>
        <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5 mb-2">
          <Sparkles size={14} className="text-[#6A5495]" /> Karakter 2D Kartun Pilihan:
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {PRESET_AVATARS.map((avatar) => {
            const isSelected = !photoUrl && photoPresetId === avatar.id;
            return (
              <button
                key={avatar.id}
                type="button"
                onClick={() => handleSelectPreset(avatar.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border-2 transition relative ${
                  isSelected
                    ? 'border-[#261F36] bg-[#6A5495]/10 shadow-[3px_3px_0px_#261F36]'
                    : 'border-gray-200 hover:border-[#6A5495] bg-white hover:bg-gray-50'
                }`}
              >
                <div
                  className="w-10 h-10 rounded-lg overflow-hidden border border-[#261F36]/40 mb-1"
                  dangerouslySetInnerHTML={{ __html: avatar.svg }}
                />
                <span className="text-[10px] font-bold text-gray-700 truncate w-full text-center">
                  {avatar.name.split(' ')[0]}
                </span>
                {isSelected && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#6A5495] text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Photo Upload */}
      <div>
        <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5 mb-2">
          <Upload size={14} className="text-[#6A5495]" /> Atau Upload Foto Kamu Sendiri:
        </label>
        <div className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 border-2 border-dashed border-[#6A5495] rounded-xl bg-[#6A5495]/5 hover:bg-[#6A5495]/10 text-xs font-bold text-[#6A5495] transition"
          >
            <ImageIcon size={15} /> Pilih Foto dari Perangkat
          </button>
          {photoUrl && (
            <button
              type="button"
              onClick={() => onPhotoChange('', 'bear-grizzly')}
              className="p-2 text-red-500 border-2 border-red-200 hover:bg-red-50 rounded-xl transition"
              title="Kembali ke avatar kartun"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Foto Filter 2D Style */}
      <div>
        <label className="text-xs font-bold text-gray-700 block mb-1.5">
          Gaya Frame / Filter Foto:
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {(
            [
              { id: 'doodle-border', label: '2D Outline' },
              { id: 'comic', label: 'Comic Pop' },
              { id: 'sketch', label: 'Sketch B&W' },
              { id: 'none', label: 'Normal' },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onFilterChange(item.id)}
              className={`py-1.5 px-2 rounded-lg text-[11px] font-bold border-2 transition text-center ${
                photoFilter === item.id
                  ? 'bg-[#6A5495] text-white border-[#261F36] shadow-[2px_2px_0px_#261F36]'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

