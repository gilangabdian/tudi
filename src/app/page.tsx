import { Suspense } from 'react';
import { cookies } from 'next/headers';
import StudioApp from '@/components/StudioApp';
import { COOKIE_CARD_META_KEY, COOKIE_SIG_KEY, parseCardMetaCookie } from '@/lib/cardStore';

async function StudioWithCookie() {
  const cookieStore = await cookies();
  const rawMeta = cookieStore.get(COOKIE_CARD_META_KEY)?.value;
  const rawSig = cookieStore.get(COOKIE_SIG_KEY)?.value;

  let initialSlotIndex = 0;
  if (rawMeta) {
    try {
      let raw = rawMeta;
      if (raw.startsWith('%') || raw.includes('%7B') || raw.includes('%22')) {
        try {
          raw = decodeURIComponent(raw);
        } catch {}
      }
      const parsed = JSON.parse(raw);
      if (typeof parsed.currentSlotIndex === 'number' && parsed.currentSlotIndex >= 0 && parsed.currentSlotIndex <= 9) {
        initialSlotIndex = parsed.currentSlotIndex;
      }
    } catch {}
  }

  const initialCard = parseCardMetaCookie(rawMeta);

  if (rawSig && initialCard.signatureType !== 'type') {
    try {
      let decodedSig = rawSig;
      if (decodedSig.startsWith('%')) {
        try {
          decodedSig = decodeURIComponent(decodedSig);
        } catch {}
      }
      initialCard.signatureDataUrl = decodedSig;
      initialCard.signatureType = 'draw';
    } catch {}
  }

  return <StudioApp initialCard={initialCard} initialSlotIndex={initialSlotIndex} />;
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <StudioWithCookie />
    </Suspense>
  );
}
