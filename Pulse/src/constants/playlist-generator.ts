import type { GeneratedPlaylist, PlaylistPromptExample } from '@/types/content';

export const playlistPromptExamples = [
  'Late Night Drive',
  'Gym Motivation',
  'Rainy Evening',
  'Coding Focus',
] satisfies PlaylistPromptExample[];

export const generatedPlaylists = [
  {
    id: 'midnight-velocity',
    title: 'Midnight Velocity',
    description: 'Neon-lit synths, smooth basslines, and open-road momentum for late city drives.',
    mood: 'Focused · Nocturnal',
    tracks: 34,
    duration: '1h 52m',
    gradient: 'from-violet-500 via-fuchsia-400 to-cyan-300',
  },
  {
    id: 'pulse-lift',
    title: 'Pulse Lift',
    description: 'High-energy rhythms and sharp hooks designed to push one more rep.',
    mood: 'Intense · Motivating',
    tracks: 28,
    duration: '1h 18m',
    gradient: 'from-orange-400 via-pink-400 to-violet-500',
  },
  {
    id: 'rainroom',
    title: 'Rainroom',
    description: 'Warm ambient textures, soft vocals, and low-tempo reflections for stormy evenings.',
    mood: 'Calm · Cinematic',
    tracks: 31,
    duration: '1h 36m',
    gradient: 'from-slate-800 via-blue-500 to-cyan-200',
  },
] satisfies GeneratedPlaylist[];
