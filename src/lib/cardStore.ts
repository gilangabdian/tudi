import { CardData } from '@/types/card';
import { DEFAULT_CARD_DATA } from './constants';

export const STORAGE_SLOTS_KEY = 'tudi_10_slots_v3';
export const STORAGE_ACTIVE_SLOT_KEY = 'tudi_active_slot_index_v3';

export interface CardStoreState {
  currentSlotIndex: number;
  slotsData: Record<number, CardData | null>;
  card: CardData;
}

const defaultServerState: CardStoreState = {
  currentSlotIndex: 0,
  slotsData: { 0: DEFAULT_CARD_DATA },
  card: DEFAULT_CARD_DATA,
};

let currentState: CardStoreState = defaultServerState;
let isInitialized = false;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function loadInitialState(): CardStoreState {
  if (typeof window === 'undefined') {
    return defaultServerState;
  }
  try {
    const storedSlots = localStorage.getItem(STORAGE_SLOTS_KEY);
    const storedIndex = localStorage.getItem(STORAGE_ACTIVE_SLOT_KEY);
    let parsedSlots: Record<number, CardData | null> = { 0: DEFAULT_CARD_DATA };
    let initialIndex = 0;

    if (storedSlots) {
      parsedSlots = JSON.parse(storedSlots);
    }
    if (storedIndex) {
      const idx = parseInt(storedIndex, 10);
      if (!isNaN(idx) && idx >= 0 && idx <= 9) {
        initialIndex = idx;
      }
    }

    const initialCard = parsedSlots[initialIndex] || parsedSlots[0] || DEFAULT_CARD_DATA;
    return {
      currentSlotIndex: initialIndex,
      slotsData: parsedSlots,
      card: initialCard,
    };
  } catch (e) {
    console.warn('LocalStorage load error:', e);
    return defaultServerState;
  }
}

export function subscribe(listener: () => void) {
  listeners.add(listener);

  const handleStorageEvent = (event: StorageEvent) => {
    if (event.key === STORAGE_SLOTS_KEY || event.key === STORAGE_ACTIVE_SLOT_KEY) {
      currentState = loadInitialState();
      notify();
    }
  };

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', handleStorageEvent);
  }

  return () => {
    listeners.delete(listener);
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', handleStorageEvent);
    }
  };
}

export function getSnapshot(): CardStoreState {
  if (typeof window === 'undefined') {
    return defaultServerState;
  }
  if (!isInitialized) {
    isInitialized = true;
    currentState = loadInitialState();
  }
  return currentState;
}

export function getServerSnapshot(): CardStoreState {
  return defaultServerState;
}

export function updateCard(updated: Partial<CardData>) {
  const nextCard: CardData = {
    ...currentState.card,
    ...updated,
    updatedAt: Date.now(),
  };

  const nextSlots: Record<number, CardData | null> = {
    ...currentState.slotsData,
    [currentState.currentSlotIndex]: nextCard,
  };

  currentState = {
    ...currentState,
    card: nextCard,
    slotsData: nextSlots,
  };

  try {
    localStorage.setItem(STORAGE_SLOTS_KEY, JSON.stringify(nextSlots));
    localStorage.setItem(STORAGE_ACTIVE_SLOT_KEY, currentState.currentSlotIndex.toString());
  } catch (e) {
    console.warn('LocalStorage save error:', e);
  }

  notify();
}

export function selectSlot(index: number) {
  if (index === currentState.currentSlotIndex) return;

  const existing = currentState.slotsData[index];
  let nextCard: CardData;

  if (existing) {
    nextCard = existing;
  } else {
    nextCard = {
      ...DEFAULT_CARD_DATA,
      id: `slot-${index + 1}-${Date.now()}`,
      firstName: `CARD #${index + 1}`,
      lastName: '',
    };
  }

  const nextSlots: Record<number, CardData | null> = {
    ...currentState.slotsData,
    [index]: nextCard,
  };

  currentState = {
    currentSlotIndex: index,
    slotsData: nextSlots,
    card: nextCard,
  };

  try {
    localStorage.setItem(STORAGE_SLOTS_KEY, JSON.stringify(nextSlots));
    localStorage.setItem(STORAGE_ACTIVE_SLOT_KEY, index.toString());
  } catch (e) {
    console.warn('LocalStorage save error:', e);
  }

  notify();
}

