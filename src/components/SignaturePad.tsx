'use client';

import React, { useRef, useState, useEffect } from 'react';
import { PenTool, Type, Eraser } from 'lucide-react';

interface SignaturePadProps {
  signatureType?: 'draw' | 'type';
  signatureDataUrl?: string;
  signatureText?: string;
  onChange: (data: {
    signatureType: 'draw' | 'type';
    signatureDataUrl?: string;
    signatureText?: string;
  }) => void;
}

export default function SignaturePad({
  signatureType = 'draw',
  signatureDataUrl,
  signatureText = '',
  onChange,
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const mode = signatureType || 'draw';
  const typedName = signatureText || 'Kase Y.';

  // Restore drawing on canvas when mode is 'draw' or when signatureDataUrl changes
  useEffect(() => {
    if (mode !== 'draw') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (signatureDataUrl) {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      img.src = signatureDataUrl;
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [mode, signatureDataUrl]);

  const handleSwitchMode = (newMode: 'draw' | 'type') => {
    onChange({
      signatureType: newMode,
      signatureDataUrl,
      signatureText: typedName,
    });
  };

  const getCoordinates = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e, canvas);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#1E293B';
    setIsDrawing(true);
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e, canvas);

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Export compact webp or fallback png to ensure high performance and light cookie persistence
    const dataUrl = canvas.toDataURL('image/webp', 0.8) || canvas.toDataURL('image/png');
    onChange({
      signatureType: 'draw',
      signatureDataUrl: dataUrl,
      signatureText: typedName,
    });
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onChange({
      signatureType: 'draw',
      signatureDataUrl: undefined,
      signatureText: typedName,
    });
  };

  const handleTypeChange = (val: string) => {
    onChange({
      signatureType: 'type',
      signatureDataUrl,
      signatureText: val,
    });
  };

  return (
    <div className="space-y-3">
      {/* Mode Switcher Tabs */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => handleSwitchMode('draw')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold border transition ${
            mode === 'draw'
              ? 'bg-[#6A5495] text-white border-[#6A5495]'
              : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
          }`}
        >
          <PenTool size={13} /> Draw by Hand
        </button>
        <button
          type="button"
          onClick={() => handleSwitchMode('type')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold border transition ${
            mode === 'type'
              ? 'bg-[#6A5495] text-white border-[#6A5495]'
              : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
          }`}
        >
          <Type size={13} /> Type Cursive Font
        </button>
      </div>

      {mode === 'draw' ? (
        <div className="space-y-2">
          <div className="relative border border-gray-300 rounded-xl bg-white overflow-hidden shadow-2xs">
            <canvas
              ref={canvasRef}
              width={500}
              height={150}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-[150px] cursor-crosshair touch-none bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:12px_12px]"
            />
            <div className="absolute bottom-1.5 right-2.5 pointer-events-none text-xs font-['Patrick_Hand'] text-gray-400 select-none">
              draw signature here ✍️
            </div>
          </div>
          <button
            type="button"
            onClick={clearCanvas}
            className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-semibold px-2 py-1 rounded-lg bg-red-50 border border-red-200"
          >
            <Eraser size={12} /> Clear Canvas
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <input
            type="text"
            value={typedName}
            onChange={(e) => handleTypeChange(e.target.value)}
            placeholder="Type name for signature..."
            className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs font-['Patrick_Hand'] text-base focus:outline-none focus:border-[#6A5495]"
          />
          <div className="p-2.5 bg-gray-50 border border-dashed border-gray-300 rounded-xl text-center">
            <span className="text-[11px] text-gray-400 block mb-0.5">Live Signature:</span>
            <span className="font-['Caveat'] text-2xl text-[#2D3748] font-bold">
              {typedName || 'Your Signature'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
