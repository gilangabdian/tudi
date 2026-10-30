import { CardData, PresetAvatar } from '@/types/card';

export const BRAND_COLOR = '#6A5495';
export const BRAND_LIGHT = '#F3EEF9';
export const BRAND_DARK = '#261F36';

export const PRESET_AVATARS: PresetAvatar[] = [
  {
    id: 'intern-kase',
    name: 'Kase the Intern',
    emoji: '🧢',
    svg: `<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full block">
      <rect width="100%" height="100%" fill="#CBD5E1"/>
      <!-- Shirt Collar -->
      <path d="M25 100 L25 95 L50 78 L75 95 L75 100 Z" fill="#F8FAFC" stroke="#1E1B2E" stroke-width="2.5"/>
      <polygon points="50,78 45,100 55,100" fill="#6A5495" stroke="#1E1B2E" stroke-width="2"/>
      <!-- Neck & Head -->
      <rect x="42" y="72" width="16" height="12" fill="#F6C492" stroke="#1E1B2E" stroke-width="2"/>
      <rect x="26" y="44" width="48" height="34" rx="10" fill="#F6C492" stroke="#1E1B2E" stroke-width="2.5"/>
      <!-- Curly Hair Sides -->
      <circle cx="25" cy="56" r="8" fill="#3D291F" stroke="#1E1B2E" stroke-width="2"/>
      <circle cx="23" cy="67" r="7" fill="#3D291F" stroke="#1E1B2E" stroke-width="2"/>
      <circle cx="75" cy="56" r="8" fill="#3D291F" stroke="#1E1B2E" stroke-width="2"/>
      <circle cx="77" cy="67" r="7" fill="#3D291F" stroke="#1E1B2E" stroke-width="2"/>
      <!-- Earmuffs/Headphones -->
      <rect x="18" y="58" width="8" height="15" rx="3" fill="#D97706" stroke="#1E1B2E" stroke-width="2"/>
      <rect x="74" y="58" width="8" height="15" rx="3" fill="#D97706" stroke="#1E1B2E" stroke-width="2"/>
      <!-- Cap Base & Peak -->
      <path d="M22 45 C22 26 30 18 50 18 C70 18 78 26 78 45 Z" fill="#E2E8F0" stroke="#1E1B2E" stroke-width="2.5"/>
      <ellipse cx="50" cy="46" rx="34" ry="7" fill="#CBD5E1" stroke="#1E1B2E" stroke-width="2.5"/>
      <!-- DNF Cap Letters -->
      <rect x="30" y="24" width="40" height="16" rx="4" fill="#FFFFFF" stroke="#1E1B2E" stroke-width="1.5"/>
      <text x="35" y="36" font-family="'Fredoka', sans-serif" font-weight="900" font-size="11" fill="#EC4899">D</text>
      <text x="46" y="36" font-family="'Fredoka', sans-serif" font-weight="900" font-size="11" fill="#F59E0B">N</text>
      <text x="58" y="36" font-family="'Fredoka', sans-serif" font-weight="900" font-size="11" fill="#3B82F6">F</text>
      <!-- Glasses -->
      <rect x="31" y="52" width="16" height="12" rx="3" fill="#FFFFFF" opacity="0.4" stroke="#1E1B2E" stroke-width="2"/>
      <rect x="53" y="52" width="16" height="12" rx="3" fill="#FFFFFF" opacity="0.4" stroke="#1E1B2E" stroke-width="2"/>
      <line x1="47" y1="57" x2="53" y2="57" stroke="#1E1B2E" stroke-width="2"/>
      <!-- Eyes & Nose -->
      <circle cx="39" cy="58" r="2.5" fill="#1E1B2E"/>
      <circle cx="61" cy="58" r="2.5" fill="#1E1B2E"/>
      <rect x="44" y="62" width="12" height="7" rx="3.5" fill="#F43F5E" stroke="#1E1B2E" stroke-width="1.8"/>
      <line x1="46" y1="73" x2="54" y2="73" stroke="#1E1B2E" stroke-width="2" stroke-linecap="round"/>
      <circle cx="29" cy="66" r="3" fill="#FB923C"/>
      <circle cx="71" cy="66" r="3" fill="#FB923C"/>
    </svg>`
  },
  {
    id: 'cool-cat',
    name: 'Doodle Cat',
    emoji: '🐱',
    svg: `<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full block">
      <!-- Full Background fill covering 100% -->
      <rect width="100%" height="100%" fill="#FFEAA7"/>
      <!-- Ears -->
      <polygon points="20,40 32,15 48,32" fill="#FFA502" stroke="#1A1A1A" stroke-width="3"/>
      <polygon points="80,40 68,15 52,32" fill="#FFA502" stroke="#1A1A1A" stroke-width="3"/>
      <!-- Body extends all the way down to 100% -->
      <path d="M18 100 L18 55 C18 55 25 32 50 32 C75 32 82 55 82 55 L82 100 Z" fill="#FFA502" stroke="#1A1A1A" stroke-width="3"/>
      <!-- Eyes & Nose -->
      <circle cx="39" cy="52" r="3.5" fill="#1A1A1A"/>
      <circle cx="61" cy="52" r="3.5" fill="#1A1A1A"/>
      <polygon points="50,58 47,55 53,55" fill="#E84118"/>
      <path d="M50 58 Q45 64 40 61 M50 58 Q55 64 60 61" stroke="#1A1A1A" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'bear-grizzly',
    name: 'Grizzly Bear',
    emoji: '🐻',
    svg: `<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full block">
      <rect width="100%" height="100%" fill="#4B9CD3"/>
      <!-- Ears -->
      <circle cx="28" cy="28" r="14" fill="#8B5A2B" stroke="#1A1A1A" stroke-width="3"/>
      <circle cx="28" cy="28" r="7" fill="#693F19"/>
      <circle cx="72" cy="28" r="14" fill="#8B5A2B" stroke="#1A1A1A" stroke-width="3"/>
      <circle cx="72" cy="28" r="7" fill="#693F19"/>
      <!-- Body & Head extends down -->
      <path d="M12 100 L12 60 C12 60 22 25 50 25 C78 25 88 60 88 60 L88 100 Z" fill="#8B5A2B" stroke="#1A1A1A" stroke-width="3"/>
      <!-- Eyes -->
      <circle cx="40" cy="48" r="3.5" fill="#1A1A1A"/>
      <circle cx="60" cy="48" r="3.5" fill="#1A1A1A"/>
      <!-- Snout & Nose -->
      <ellipse cx="50" cy="55" rx="8" ry="5.5" fill="#1A1A1A"/>
      <path d="M50 60.5 Q46 66 43 65 M50 60.5 Q54 66 57 65" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M68 45 Q71 52 69 56" stroke="#1A1A1A" stroke-width="2" fill="none"/>
    </svg>`
  },
  {
    id: 'capybara',
    name: 'Chill Capybara',
    emoji: '🍊',
    svg: `<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full block">
      <rect width="100%" height="100%" fill="#9AECDB"/>
      <!-- Mandarin on head -->
      <circle cx="50" cy="18" r="9" fill="#E67E22" stroke="#1A1A1A" stroke-width="2"/>
      <ellipse cx="53" cy="10" rx="3" ry="1.5" fill="#2ECC71"/>
      <!-- Ears -->
      <circle cx="28" cy="35" r="7" fill="#784212" stroke="#1A1A1A" stroke-width="2.5"/>
      <circle cx="72" cy="35" r="7" fill="#784212" stroke="#1A1A1A" stroke-width="2.5"/>
      <!-- Head extends down -->
      <rect x="26" y="28" width="48" height="72" rx="18" fill="#A0522D" stroke="#1A1A1A" stroke-width="3"/>
      <!-- Snout -->
      <rect x="30" y="52" width="40" height="48" rx="10" fill="#873600" stroke="#1A1A1A" stroke-width="2"/>
      <!-- Eyes (chill sleepy lines) -->
      <path d="M36 45 Q42 45 44 47" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round"/>
      <path d="M64 45 Q58 45 56 47" stroke="#1A1A1A" stroke-width="3" stroke-linecap="round"/>
      <circle cx="43" cy="64" r="2.5" fill="#1A1A1A"/>
      <circle cx="57" cy="64" r="2.5" fill="#1A1A1A"/>
      <line x1="50" y1="65" x2="50" y2="85" stroke="#1A1A1A" stroke-width="2"/>
    </svg>`
  },
  {
    id: 'bear-panda',
    name: 'Panda Bear',
    emoji: '🐼',
    svg: `<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full block">
      <rect width="100%" height="100%" fill="#F8B195"/>
      <!-- Ears -->
      <circle cx="28" cy="26" r="14" fill="#1A1A1A" stroke="#1A1A1A" stroke-width="3"/>
      <circle cx="72" cy="26" r="14" fill="#1A1A1A" stroke="#1A1A1A" stroke-width="3"/>
      <!-- Body & Head -->
      <path d="M12 100 L12 60 C12 60 22 25 50 25 C78 25 88 60 88 60 L88 100 Z" fill="#FFFFFF" stroke="#1A1A1A" stroke-width="3"/>
      <!-- Eye Patches -->
      <ellipse cx="38" cy="48" rx="8" ry="11" transform="rotate(-15 38 48)" fill="#1A1A1A"/>
      <ellipse cx="62" cy="48" rx="8" ry="11" transform="rotate(15 62 48)" fill="#1A1A1A"/>
      <circle cx="39" cy="48" r="2.5" fill="#FFFFFF"/>
      <circle cx="61" cy="48" r="2.5" fill="#FFFFFF"/>
      <!-- Nose & Mouth -->
      <ellipse cx="50" cy="56" rx="6" ry="4" fill="#1A1A1A"/>
      <path d="M50 60 Q45 65 42 63 M50 60 Q55 65 58 63" stroke="#1A1A1A" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'cool-alien',
    name: 'Cosmic Alien',
    emoji: '🛸',
    svg: `<svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full block">
      <rect width="100%" height="100%" fill="#2C3A47"/>
      <path d="M35 30 Q30 18 25 15 M65 30 Q70 18 75 15" stroke="#2ED573" stroke-width="3" stroke-linecap="round"/>
      <ellipse cx="50" cy="55" rx="36" ry="32" fill="#2ED573" stroke="#1A1A1A" stroke-width="3"/>
      <ellipse cx="35" cy="52" rx="9" ry="14" transform="rotate(-15 35 52)" fill="#1A1A1A"/>
      <circle cx="33" cy="48" r="3" fill="#FFFFFF"/>
      <ellipse cx="65" cy="52" rx="9" ry="14" transform="rotate(15 65 52)" fill="#1A1A1A"/>
      <circle cx="63" cy="48" r="3" fill="#FFFFFF"/>
    </svg>`
  }
];

export const DEFAULT_CARD_DATA: CardData = {
  id: 'card-default',
  name: 'Kase Pop Intern Badge',
  template: 'pop-badge',
  title: 'TII',
  subtitle: 'FEAR DEPT.',
  firstName: 'KASE',
  lastName: 'Y.',
  idNumber: 'TII-404-INT',
  birthDate: '10-24-2004',
  gender: 'M',
  address: 'Studio 4B, Sector 7',
  height: `5'9"`,
  weight: '145 lbs',
  hair: 'Black Curly',
  eyes: 'DOT',
  licenseClass: 'CLASS M',
  companyLogoText: 'TII',
  department: 'FEAR DEPT.',
  roleTag: 'THE INTERN',
  holderColor: '#96C6B2',
  holderPattern: 'flowers',
  stickers: ['dnf', 'no-headaches', 'voxel-pin'],
  jobTitle: 'Assistant to the Snack Lead',
  companyName: 'TII Studio Co.',
  eventName: 'TUDI EXPO 2026',
  eventDate: 'OCT 30, 2026',
  accessTier: 'VIP',
  venue: 'Creative Park Stage A',
  themeColor: '#6A5495',
  cardBgColor: '#FAF7F0',
  headerTextColor: '#FFFFFF',
  bodyTextColor: '#1E293B',
  pattern: 'plain',
  photoUrl: '',
  photoPresetId: 'intern-kase',
  photoFilter: 'doodle-border',
  signatureText: 'Kase Y.',
  stamps: ['verified'],
  lanyardColor: '#6A5495',
  lanyardText: 'TII • SPECIAL ACCESS PASS',
  lanyardPins: true,
  updatedAt: Date.now()
};

export const COLOR_PRESETS = [
  { name: 'Brand Purple', hex: '#6A5495' },
  { name: 'Sage Green', hex: '#96C6B2' },
  { name: 'California Teal', hex: '#3A8891' },
  { name: 'Sunset Coral', hex: '#E17055' },
  { name: 'Retro Forest', hex: '#2D6A4F' },
  { name: 'Mustard Pop', hex: '#D97706' },
  { name: 'Midnight Ink', hex: '#2C3A47' },
  { name: 'Candy Pink', hex: '#E84393' }
];

export const HOLDER_PRESETS = [
  { name: 'Sage Green', hex: '#96C6B2' },
  { name: 'Lavender Mist', hex: '#C5B4E3' },
  { name: 'Buttercup Yellow', hex: '#F9E79F' },
  { name: 'Sky Blue', hex: '#A9CCE3' },
  { name: 'Peach Cream', hex: '#EDBB99' },
  { name: 'Clean White', hex: '#FFFFFF' }
];

export const BG_PRESETS = [
  { name: 'Vintage Paper', hex: '#FAF7F0' },
  { name: 'Pure White', hex: '#FFFFFF' },
  { name: 'Parchment Warm', hex: '#FDF8E4' },
  { name: 'Soft Mint', hex: '#EBF7F2' },
  { name: 'Gentle Lavender', hex: '#F3EEF9' },
  { name: 'Pale Sky', hex: '#EBF4FA' }
];

export const FUNNY_RANDOM_PROFILES: Partial<CardData>[] = [
  {
    template: 'pop-badge',
    title: 'TII',
    subtitle: 'FEAR DEPT.',
    firstName: 'KASE',
    lastName: 'Y.',
    idNumber: 'TII-404-INT',
    companyLogoText: 'TII',
    department: 'FEAR DEPT.',
    roleTag: 'THE INTERN',
    holderColor: '#96C6B2',
    holderPattern: 'flowers',
    photoPresetId: 'intern-kase',
    themeColor: '#6A5495',
    stickers: ['dnf', 'no-headaches', 'voxel-pin'],
    signatureText: 'Kase Y.'
  },
  {
    template: 'driver-license',
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
    template: 'citizen-id',
    title: 'REPUBLIC OF TUDI',
    subtitle: 'CITIZEN IDENTITY CARD',
    firstName: 'BOBA',
    lastName: 'BUNNY',
    idNumber: '320109-882910-0001',
    birthDate: '14-02-2022',
    gender: 'FEMALE',
    address: 'Sweet Carrot Blvd No. 12',
    jobTitle: 'Chief Carrot Officer',
    photoPresetId: 'cool-cat',
    signatureText: 'Boba Bunny',
    themeColor: '#6A5495',
    stamps: ['approved', 'verified']
  },
  {
    template: 'work-badge',
    title: 'ACME LABS',
    subtitle: 'EMPLOYEE IDENTIFICATION',
    firstName: 'CHILL',
    lastName: 'CAPYBARA',
    idNumber: 'EMP-404-CHILL',
    birthDate: '01-01-2020',
    gender: 'CHILL',
    jobTitle: 'Senior Onsen Evaluator',
    department: 'Hydration & Relaxation',
    companyName: 'Capy Spa & Co.',
    photoPresetId: 'capybara',
    signatureText: 'Capy Chill',
    themeColor: '#2D6A4F',
    stamps: ['verified']
  },
  {
    template: 'event-pass',
    title: 'NEO COMIC CON',
    subtitle: 'OFFICIAL ADMISSION',
    firstName: 'COSMIC',
    lastName: 'ZORG',
    idNumber: 'TKT-999-GALAXY',
    birthDate: 'STAR-YEAR-3022',
    gender: 'ALIEN',
    eventName: 'INTERGALACTIC TUDI SUMMIT',
    eventDate: 'DEC 25, 2026',
    accessTier: 'VIP',
    venue: 'Nebula Hall 7B',
    photoPresetId: 'cool-alien',
    signatureText: 'Zorg',
    themeColor: '#6A5495',
    stamps: ['verified', 'approved']
  }
];
