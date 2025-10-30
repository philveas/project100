import type { LucideIcon } from 'lucide-react';
import {
  Waves,
  Ruler,
  HardHat,
  Building2,
  ClipboardList,
  Headphones,
  FileAudio,
  MapPin,
} from 'lucide-react';

export type ServiceKey =
  | 'noise-survey'
  | 'noise-impact-assessment'
  | 'acoustic-planning-support'
  | 'building-acoustics'
  | 'acoustic-consultant'
  | 'site'
  | 'reporting'
  | 'listening';

export const ServiceIcons: Record<ServiceKey, LucideIcon> = {
  'noise-survey': Ruler,
  'noise-impact-assessment': HardHat,
  'acoustic-planning-support': ClipboardList,
  'building-acoustics': Building2,
  'acoustic-consultant': Waves,
  site: MapPin,
  reporting: FileAudio,
  listening: Headphones,
};
