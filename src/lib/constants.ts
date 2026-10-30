import { CardData, PresetAvatar } from '@/types/card';

export const BRAND_COLOR = '#6A5495';
export const BRAND_LIGHT = '#F3EEF9';
export const BRAND_DARK = '#261F36';

export const PRESET_AVATARS: PresetAvatar[] = [
  {
    id: 'bear-grizzly',
    name: 'Grizzly Bear',
    emoji: '🐻',
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#4B9CD3"/>
      <!-- Ears -->
      <circle cx="28" cy="28" r="14" fill="#8B5A2B" stroke="#1A1A1A" stroke-width="3"/>
      <circle cx="28" cy="28" r="7" fill="#693F19"/>
      <circle cx="72" cy="28" r="14" fill="#8B5A2B" stroke="#1A1A1A" stroke-width="3"/>
      <circle cx="72" cy="28" r="7" fill="#693F19"/>
      <!-- Body & Head -->
      <path d="M12 95 C12 60 22 25 50 25 C78 25 88 60 88 95 Z" fill="#8B5A2B" stroke="#1A1A1A" stroke-width="3"/>
      <!-- Eyes -->
      <circle cx="40" cy="48" r="3.5" fill="#1A1A1A"/>
      <circle cx="60" cy="48" r="3.5" fill="#1A1A1A"/>
      <!-- Snout & Nose -->
      <ellipse cx="50" cy="55" rx="8" ry="5.5" fill="#1A1A1A"/>
      <!-- Cute Smile -->
      <path d="M50 60.5 Q46 66 43 65 M50 60.5 Q54 66 57 65" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Hand-drawn cheek cheekiness -->
      <path d="M68 45 Q71 52 69 56" stroke="#1A1A1A" stroke-width="2" fill="none"/>
    </svg>`
  },
  {
    id: 'bear-panda',
    name: 'Panda Bear',
    emoji: '🐼',
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#F8B195"/>
      <!-- Ears -->
      <circle cx="28" cy="26" r="14" fill="#1A1A1A" stroke="#1A1A1A" stroke-width="3"/>
      <circle cx="72" cy="26" r="14" fill="#1A1A1A" stroke="#1A1A1A" stroke-width="3"/>
      <!-- Body & Head -->
      <path d="M12 95 C12 60 22 25 50 25 C78 25 88 60 88 95 Z" fill="#FFFFFF" stroke="#1A1A1A" stroke-width="3"/>
      <!-- Eye Patches -->
      <ellipse cx="38" cy="48" rx="8" ry="11" transform="rotate(-15 38 48)" fill="#1A1A1A"/>
      <ellipse cx="62" cy="48" rx="8" ry="11" transform="rotate(15 62 48)" fill="#1A1A1A"/>
      <circle cx="39" cy="48" r="2.5" fill="#FFFFFF"/>
      <circle cx="61" cy="48" r="2.5" fill="#FFFFFF"/>
      <!-- Nose & Mouth -->
      <ellipse cx="50" cy="56" rx="6" ry="4" fill="#1A1A1A"/>
      <path d="M50 60 Q45 65 42 63 M50 60 Q55 65 58 63" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Black Arms/Body bottom -->
      <path d="M12 85 C20 75 35 78 40 95 L12 95 Z" fill="#1A1A1A"/>
      <path d="M88 85 C80 75 65 78 60 95 L88 95 Z" fill="#1A1A1A"/>
    </svg>`
  },
  {
    id: 'cool-cat',
    name: 'Doodle Cat',
    emoji: '🐱',
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#FFEAA7"/>
      <!-- Ears -->
      <polygon points="20,40 32,15 48,32" fill="#FFA502" stroke="#1A1A1A" stroke-width="3"/>
      <polygon points="25,35 33,22 42,32" fill="#FF7F50"/>
      <polygon points="80,40 68,15 52,32" fill="#FFA502" stroke="#1A1A1A" stroke-width="3"/>
      <polygon points="75,35 67,22 58,32" fill="#FF7F50"/>
      <!-- Body & Head -->
      <path d="M18 95 C18 55 25 32 50 32 C75 32 82 55 82 95 Z" fill="#FFA502" stroke="#1A1A1A" stroke-width="3"/>
      <!-- Stripes -->
      <path d="M50 32 L50 42 M42 34 L45 42 M58 34 L55 42" stroke="#D35400" stroke-width="3" stroke-linecap="round"/>
      <!-- Eyes -->
      <circle cx="39" cy="52" r="3.5" fill="#1A1A1A"/>
      <circle cx="61" cy="52" r="3.5" fill="#1A1A1A"/>
      <!-- Nose & Mouth -->
      <polygon points="50,58 47,55 53,55" fill="#E84118"/>
      <path d="M50 58 Q45 64 40 61 M50 58 Q55 64 60 61" stroke="#1A1A1A" stroke-width="2" stroke-linecap="round"/>
      <!-- Whiskers -->
      <line x1="22" y1="56" x2="33" y2="57" stroke="#1A1A1A" stroke-width="2"/>
      <line x1="20" y1="62" x2="33" y2="61" stroke="#1A1A1A" stroke-width="2"/>
      <line x1="78" y1="56" x2="67" y2="57" stroke="#1A1A1A" stroke-width="2"/>
      <line x1="80" y1="62" x2="67" y2="61" stroke="#1A1A1A" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'capybara',
    name: 'Chill Capybara',
    emoji: '🍊',
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#9AECDB"/>
      <!-- Mandarin on head -->
      <circle cx="50" cy="18" r="9" fill="#E67E22" stroke="#1A1A1A" stroke-width="2"/>
      <ellipse cx="53" cy="10" rx="3" ry="1.5" fill="#2ECC71"/>
      <!-- Ears -->
      <circle cx="28" cy="35" r="7" fill="#784212" stroke="#1A1A1A" stroke-width="2.5"/>
      <circle cx="72" cy="35" r="7" fill="#784212" stroke="#1A1A1A" stroke-width="2.5"/>
      <!-- Head -->
      <rect x="26" y="28" width="48" height="65" rx="18" fill="#A0522D" stroke="#1A1A1A" stroke-width="3"/>
      <!-- Snout -->
      <rect x="30" y="52" width="40" height="35" rx="10" fill="#873600" stroke="#1A1A1A" stroke-width="2"/>
      <!-- Eyes (chill sleepy lines) -->
      <path d="M36 45 Q42 45 44 47" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round"/>
      <path d="M64 45 Q58 45 56 47" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round"/>
      <!-- Nostrils -->
      <circle cx="43" cy="64" r="2.5" fill="#1A1A1A"/>
      <circle cx="57" cy="64" r="2.5" fill="#1A1A1A"/>
      <line x1="50" y1="65" x2="50" y2="76" stroke="#1A1A1A" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'bunny',
    name: 'Boba Bunny',
    emoji: '🐰',
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#DFF9FB"/>
      <!-- Long Ears -->
      <path d="M32 45 C28 20 28 8 38 8 C48 8 45 25 40 45 Z" fill="#FFFFFF" stroke="#1A1A1A" stroke-width="3"/>
      <path d="M34 38 C32 24 32 14 38 14 C44 14 42 27 38 38 Z" fill="#FFB6C1"/>
      <path d="M68 45 C72 20 72 8 62 8 C52 8 55 25 60 45 Z" fill="#FFFFFF" stroke="#1A1A1A" stroke-width="3"/>
      <path d="M66 38 C68 24 68 14 62 14 C56 14 58 27 62 38 Z" fill="#FFB6C1"/>
      <!-- Head -->
      <ellipse cx="50" cy="65" rx="35" ry="30" fill="#FFFFFF" stroke="#1A1A1A" stroke-width="3"/>
      <!-- Eyes -->
      <ellipse cx="38" cy="62" rx="4" ry="5.5" fill="#1A1A1A"/>
      <ellipse cx="62" cy="62" rx="4" ry="5.5" fill="#1A1A1A"/>
      <circle cx="40" cy="60" r="1.5" fill="#FFFFFF"/>
      <circle cx="64" cy="60" r="1.5" fill="#FFFFFF"/>
      <!-- Nose & Mouth -->
      <polygon points="50,68 48,66 52,66" fill="#FF69B4"/>
      <path d="M50 68 Q46 72 43 70 M50 68 Q54 72 57 70" stroke="#1A1A1A" stroke-width="2"/>
      <!-- Blush -->
      <ellipse cx="30" cy="68" rx="5" ry="2.5" fill="#FFB6C1"/>
      <ellipse cx="70" cy="68" rx="5" ry="2.5" fill="#FFB6C1"/>
    </svg>`
  },
  {
    id: 'cool-alien',
    name: 'Cosmic Alien',
    emoji: '🛸',
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#2C3A47"/>
      <!-- Antennas -->
      <path d="M35 30 Q30 18 25 15" stroke="#2ED573" stroke-width="3" stroke-linecap="round"/>
      <circle cx="25" cy="15" r="4.5" fill="#FFA502" stroke="#1A1A1A" stroke-width="1.5"/>
      <path d="M65 30 Q70 18 75 15" stroke="#2ED573" stroke-width="3" stroke-linecap="round"/>
      <circle cx="75" cy="15" r="4.5" fill="#FFA502" stroke="#1A1A1A" stroke-width="1.5"/>
      <!-- Head -->
      <ellipse cx="50" cy="55" rx="36" ry="32" fill="#2ED573" stroke="#1A1A1A" stroke-width="3"/>
      <!-- Giant Dark Eyes -->
      <ellipse cx="35" cy="52" rx="9" ry="14" transform="rotate(-15 35 52)" fill="#1A1A1A"/>
      <circle cx="33" cy="48" r="3" fill="#FFFFFF"/>
      <ellipse cx="65" cy="52" rx="9" ry="14" transform="rotate(15 65 52)" fill="#1A1A1A"/>
      <circle cx="63" cy="48" r="3" fill="#FFFFFF"/>
      <!-- Small cute mouth -->
      <ellipse cx="50" cy="70" rx="3" ry="1.5" fill="#1A1A1A"/>
    </svg>`
  }
];

export const DEFAULT_CARD_DATA: CardData = {
  id: 'card-default',
  name: 'Grizzly Driver License',
  template: 'driver-license',
  title: 'CALIFORNIA',
  subtitle: 'Driver License',
  firstName: 'FOREST',
  lastName: 'BEAR',
  idNumber: 'DL-98214-BEAR',
  birthDate: 'UNKNOWN',
  gender: 'M',
  address: 'Cave 404, Redwood Forest',
  height: `6'2"`,
  weight: '595 lbs',
  hair: 'Brown',
  eyes: 'DOT',
  licenseClass: 'CLASS M / BEAR',
  jobTitle: 'Senior Salmon Hunter',
  department: 'Forestry Operations',
  companyName: 'We Bare Bears Co.',
  eventName: 'TUDI EXPO 2026',
  eventDate: 'OCT 30, 2026',
  accessTier: 'VIP',
  venue: 'Creative Park Stage A',
  themeColor: '#3A8891', // Classic California blue / teal
  cardBgColor: '#FAF7F0', // Creamy vintage paper
  headerTextColor: '#3A8891',
  bodyTextColor: '#1A1A1A',
  pattern: 'vintage',
  photoUrl: '',
  photoPresetId: 'bear-grizzly',
  photoFilter: 'doodle-border',
  signatureText: 'Grizzly Bear',
  stamps: ['pawprint', 'verified'],
  lanyardColor: '#6A5495', // Brand color
  lanyardText: 'TUDI • OFFICIAL ID CARD',
  updatedAt: Date.now()
};

export const COLOR_PRESETS = [
  { name: 'Brand Purple', hex: '#6A5495' },
  { name: 'California Teal', hex: '#3A8891' },
  { name: 'Sunset Coral', hex: '#E17055' },
  { name: 'Retro Forest', hex: '#2D6A4F' },
  { name: 'Mustard Pop', hex: '#D97706' },
  { name: 'Cherry Punch', hex: '#C0392B' },
  { name: 'Midnight Ink', hex: '#2C3A47' },
  { name: 'Bubble Pink', hex: '#D63031' }
];

export const BG_PRESETS = [
  { name: 'Vintage Paper', hex: '#FAF7F0' },
  { name: 'Pure White', hex: '#FFFFFF' },
  { name: 'Parchment Warm', hex: '#FDF8E4' },
  { name: 'Soft Mint', hex: '#EBF7F2' },
  { name: 'Gentle Lavender', hex: '#F3EEF9' },
  { name: 'Pale Sky', hex: '#EBF4FA' }
];

export const FUNNY_RANDOM_PROFILES = [
  {
    template: 'driver-license' as const,
    title: 'CALIFORNIA',
    subtitle: 'Driver License',
    firstName: 'FOREST',
    lastName: 'BEAR',
    idNumber: 'DL-98214-BEAR',
    birthDate: 'UNKNOWN',
    gender: 'M',
    height: `6'2"`,
    weight: '595 lbs',
    hair: 'Brown',
    eyes: 'DOT',
    licenseClass: 'CLASS M',
    photoPresetId: 'bear-grizzly',
    signatureText: 'Grizzly Bear',
    themeColor: '#3A8891',
    stamps: ['pawprint', 'verified']
  },
  {
    template: 'citizen-id' as const,
    title: 'REPUBLIK TUDI',
    subtitle: 'KARTU TANDA PENDUDUK (KTP)',
    firstName: 'BOBA',
    lastName: 'BUNNY',
    idNumber: '320109-882910-0001',
    birthDate: '14-02-2022',
    gender: 'FEMALE',
    address: 'Jl. Wortel Manis No. 12, Kel. Rebah, Kec. Santuy',
    jobTitle: 'Chief Carrot Officer',
    photoPresetId: 'bunny',
    signatureText: 'Boba Bunny',
    themeColor: '#6A5495',
    stamps: ['approved', 'verified']
  },
  {
    template: 'work-badge' as const,
    title: 'ACME LABS',
    subtitle: 'EMPLOYEE IDENTIFICATION',
    firstName: 'CHILL',
    lastName: 'CAPYBARA',
    idNumber: 'EMP-404-CHILL',
    birthDate: '01-01-2020',
    gender: 'CHILL',
    jobTitle: 'Senior Onsen Evaluator',
    department: 'Hydration & Peacefulness',
    companyName: 'Capy Spa & Co.',
    photoPresetId: 'capybara',
    signatureText: 'Capy Chill',
    themeColor: '#2D6A4F',
    stamps: ['verified']
  },
  {
    template: 'event-pass' as const,
    title: 'NEO COMIC CON',
    subtitle: 'OFFICIAL ADMISSION',
    firstName: 'COSMIC',
    lastName: 'ZORG',
    idNumber: 'TKT-999-GALAXY',
    birthDate: 'STAR-YEAR-3022',
    gender: 'ALIEN',
    eventName: 'INTERGALACTIC TUDI SUMMIT',
    eventDate: 'DEC 25, 2026',
    accessTier: 'VIP' as const,
    venue: 'Nebula Hall 7B',
    photoPresetId: 'cool-alien',
    signatureText: 'Zorg',
    themeColor: '#6A5495',
    stamps: ['verified', 'approved']
  }
];

