'use client';

import React from 'react';
import { CardData } from '@/types/card';
import DriverLicenseCard from './templates/DriverLicenseCard';
import CitizenIdCard from './templates/CitizenIdCard';
import WorkBadgeCard from './templates/WorkBadgeCard';
import EventPassCard from './templates/EventPassCard';

interface CardRendererProps {
  card: CardData;
  isBack?: boolean;
}

export default function CardRenderer({ card, isBack = false }: CardRendererProps) {
  switch (card.template) {
    case 'driver-license':
      return <DriverLicenseCard card={card} isBack={isBack} />;
    case 'citizen-id':
      return <CitizenIdCard card={card} isBack={isBack} />;
    case 'work-badge':
      return <WorkBadgeCard card={card} isBack={isBack} />;
    case 'event-pass':
      return <EventPassCard card={card} isBack={isBack} />;
    default:
      return <DriverLicenseCard card={card} isBack={isBack} />;
  }
}

