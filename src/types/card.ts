export type TemplateType =
  | 'pop-badge'
  | 'driver-license'
  | 'citizen-id'
  | 'work-badge'
  | 'event-pass';

export type PatternType = 'plain' | 'dots' | 'grid' | 'cross' | 'vintage';

export interface CardData {
  id: string;
  name: string; // profile slot name
  template: TemplateType;

  // Common details
  title: string;        // e.g. "TII", "CALIFORNIA", "REPUBLIC OF TUDI"
  subtitle: string;     // e.g. "FEAR DEPT.", "Driver License", "Staff Pass"
  firstName: string;
  lastName: string;
  idNumber: string;     // NIK / License No / Employee ID / Barcode
  birthDate: string;
  gender: string;
  address?: string;

  // Pop Badge / Intern Badge specific (matching Image 2)
  companyLogoText: string; // e.g. "TII"
  department: string;      // e.g. "FEAR DEPT."
  roleTag: string;         // e.g. "THE INTERN"
  holderColor: string;     // Color of the badge holder frame (default: #95CBB5 sage green)
  holderPattern: 'flowers' | 'doodles' | 'clean' | 'dots';
  stickers: string[];      // ['dnf', 'no-headaches', 'voxel-pin', 'verified']

  // Driver License specific
  height: string;       // e.g. 6'2"
  weight: string;       // e.g. 595 lbs
  hair: string;         // e.g. Brown
  eyes: string;         // e.g. DOT
  licenseClass: string; // e.g. "CLASS M" or "BEAR"

  // Work Badge specific
  jobTitle: string;     // e.g. Snack Tasting Officer
  companyName: string;

  // Event Pass specific
  eventName: string;
  eventDate: string;
  accessTier: 'VIP' | 'ALL ACCESS' | 'STAFF' | 'CREW' | 'SPEAKER';
  venue: string;

  // Visual Styles
  themeColor: string;    // Main accent (default #6A5495)
  cardBgColor: string;   // Card paper background
  headerTextColor: string;
  bodyTextColor: string;
  pattern: PatternType;

  // Photo & Visuals
  photoUrl: string;      // Base64 or Preset SVG/URL
  photoPresetId?: string;
  photoFilter: 'none' | 'doodle-border' | 'comic' | 'sketch';

  // Signature
  signatureDataUrl?: string; // Hand-drawn from canvas
  signatureText?: string;    // Fallback typed signature

  // Badges & Doodles
  stamps: string[];      // ['verified', 'pawprint', 'approved', 'star']

  // Lanyard Mockup
  lanyardColor: string;  // Ribbon color
  lanyardText: string;   // Ribbon custom text
  lanyardPins: boolean;  // Whether to show enamel pins on lanyard strap

  updatedAt: number;
}

export interface PresetAvatar {
  id: string;
  name: string;
  emoji: string;
  svg: string;
}
