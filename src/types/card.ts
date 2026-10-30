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
  title: string;
  subtitle: string;
  firstName: string;
  lastName: string;
  idNumber: string;
  birthDate: string;
  gender: string;
  address?: string;

  // Pop Badge specific
  companyLogoText: string;
  department: string;
  roleTag: string;
  holderColor: string;
  holderPattern: 'flowers' | 'doodles' | 'clean' | 'dots';
  stickers: string[];

  // Driver License specific
  height: string;
  weight: string;
  hair: string;
  eyes: string;
  licenseClass: string;

  // Work Badge specific
  jobTitle: string;
  companyName: string;

  // Event Pass specific
  eventName: string;
  eventDate: string;
  accessTier: 'VIP' | 'ALL ACCESS' | 'STAFF' | 'CREW' | 'SPEAKER';
  venue: string;

  // Visual Styles
  themeColor: string;
  cardBgColor: string;
  headerTextColor: string;
  bodyTextColor: string;
  pattern: PatternType;

  // Photo & Visuals
  photoUrl: string;
  photoPresetId?: string;
  photoFilter: 'none' | 'doodle-border' | 'comic' | 'sketch';

  // Signature
  signatureType?: 'draw' | 'type';
  signatureDataUrl?: string;
  signatureText?: string;

  // Badges & Doodles
  stamps: string[]; // ['verified', 'approved', 'pawprint']

  // Lanyard Mockup
  lanyardColor: string;
  lanyardText: string;
  lanyardPins: boolean;

  updatedAt: number;
}

export interface PresetAvatar {
  id: string;
  name: string;
  emoji: string;
  svg: string;
}
