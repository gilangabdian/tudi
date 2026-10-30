'use client';

import React, { useRef, useState, useEffect } from 'react';
import { RotateCcw, PenTool, Type, Eraser } from 'lucide-react';

interface SignaturePadProps {
  signatureDataUrl?: string;
  signatureText?: string;
  onChange: (data: { signatureDataUrl?: string; signatureText?: string }) => void;
}

export default function SignaturePad({
  signatureDataUrl,
  signatureText = '',
  onChange,
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [mode, setMode] = useState<'draw' | 'type'>(signatureDataUrl ? 'draw' : 'type');
  const [typedName, setTypedName] = useState(signatureText || 'Kase Y.');

  useEffect(() => {
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
    }
  }, [signatureDataUrl]);

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#1E1B2E';
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

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    onChange({ signatureDataUrl: dataUrl, signatureText: typedName });
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onChange({ signatureDataUrl: undefined, signatureText: typedName });
  };

  const handleTypeChange = (val: string) => {
    setTypedName(val);
    onChange({ signatureDataUrl, signatureText: val });
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setMode('draw')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold border-2 transition ${
            mode === 'draw'
              ? 'bg-[#6A5495] text-white border-[#261F36] shadow-[2px_2px_0px_#261F36]'
              : 'bg-white text-gray-700 border-gray-300 hover:border-[#6A5495]'
          }`}
        >
          <PenTool size={14} /> Draw by Hand
        </button>
        <button
          type="button"
          onClick={() => setMode('type')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold border-2 transition ${
            mode === 'type'
              ? 'bg-[#6A5495] text-white border-[#261F36] shadow-[2px_2px_0px_#261F36]'
              : 'bg-white text-gray-700 border-gray-300 hover:border-[#6A5495]'
          }`}
        >
          <Type size={14} /> Type Cursive Font
        </button>
      </div>

      {mode === 'draw' ? (
        <div className="space-y-2">
          <div className="relative border-2 border-[#261F36] rounded-xl bg-white overflow-hidden shadow-[3px_3px_0px_#261F36]">
            <canvas
              ref={canvasRef}
              width={340}
              height={100}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="w-full h-[100px] cursor-crosshair touch-none bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:12px_12px]"
            />
            <div className="absolute bottom-1 right-2 pointer-events-none text-[11px] font-['Patrick_Hand'] text-gray-400">
              draw signature here ✍️
            </div>
          </div>
          <button
            type="button"
            onClick={clearCanvas}
            className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-semibold px-2 py-1 rounded bg-red-50 border border-red-200"
          >
            <Eraser size={13} /> Clear Canvas
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <input
            type="text"
            value={typedName}
            onChange={(e) => handleTypeChange(e.target.value)}
            placeholder="Type name for signature..."
            className="w-full px-3 py-2 border-2 border-[#261F36] rounded-xl text-xs font-['Patrick_Hand'] text-lg focus:outline-none focus:ring-2 focus:ring-[#6A5495]"
          />
          <div className="p-3 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl text-center">
            <span className="text-xs text-gray-500 block mb-1">Live Signature Preview:</span>
            <span className="font-['Caveat'] text-2xl text-[#261F36] font-bold">
              {typedName || 'Your Signature'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
