import {
  AudioLines,
  BrainCircuit,
  Download,
  Headphones,
  Mic2,
  Radar,
  RefreshCcw,
  Users,
} from 'lucide-react';

import type { FeatureItem } from '@/types/content';

export const pulseFeatures = [
  {
    title: 'AI Playlist Generation',
    description:
      'Builds adaptive queues from your mood, taste graph, listening history, and the moment you are in.',
    icon: BrainCircuit,
    accent: 'violet',
  },
  {
    title: 'Spatial Audio',
    description:
      'Immersive sound fields that make albums, mixes, and live rooms feel wider, deeper, and more physical.',
    icon: Headphones,
    accent: 'electric',
  },
  {
    title: 'Offline Downloads',
    description:
      'Save albums, stations, and daily rituals with intelligent storage that refreshes before you ask.',
    icon: Download,
    accent: 'lime',
  },
  {
    title: 'Cross-device Sync',
    description:
      'Move from laptop to phone to speakers with queue, position, lyrics, and session state perfectly intact.',
    icon: RefreshCcw,
    accent: 'pink',
  },
  {
    title: 'Live Lyrics',
    description:
      'Time-synced lyrics with cinematic focus, translations, and creator annotations when available.',
    icon: Mic2,
    accent: 'orange',
  },
  {
    title: 'Smart Discovery',
    description:
      'Find music through energy, context, scene, tempo, and taste adjacency — not just genre tags.',
    icon: Radar,
    accent: 'violet',
  },
  {
    title: 'Dolby Quality',
    description:
      'High-resolution streaming paths tuned for clarity, warmth, and studio-grade dynamics.',
    icon: AudioLines,
    accent: 'electric',
  },
  {
    title: 'Collaborative Sessions',
    description:
      'Create shared listening spaces where friends can vote, react, add tracks, and shape the room together.',
    icon: Users,
    accent: 'pink',
  },
] satisfies FeatureItem[];
