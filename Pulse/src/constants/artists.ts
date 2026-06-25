import type { FeaturedArtist } from '@/types/content';

function createArtistPortraitDataUri({
  name,
  from,
  via,
  to,
}: {
  name: string;
  from: string;
  via: string;
  to: string;
}) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const safeName = name.replace(/[<&>]/g, '');

  const svg = `
    <svg width="900" height="900" viewBox="0 0 900 900" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="900" height="900" rx="450" fill="#050507"/>
      <rect width="900" height="900" rx="450" fill="url(#bg)"/>
      <circle cx="238" cy="220" r="220" fill="white" opacity="0.18"/>
      <circle cx="712" cy="704" r="280" fill="white" opacity="0.1"/>
      <path d="M140 654C252 558 351 543 460 622C575 706 674 696 772 602" stroke="white" stroke-opacity="0.2" stroke-width="18" stroke-linecap="round"/>
      <circle cx="450" cy="378" r="164" fill="#050507" fill-opacity="0.24" stroke="white" stroke-opacity="0.16" stroke-width="2"/>
      <text x="450" y="405" fill="white" fill-opacity="0.9" font-family="Inter, Arial, sans-serif" font-size="118" font-weight="750" text-anchor="middle" letter-spacing="-8">${initials}</text>
      <text x="450" y="704" fill="white" fill-opacity="0.78" font-family="Inter, Arial, sans-serif" font-size="42" font-weight="700" text-anchor="middle" letter-spacing="-1.5">${safeName}</text>
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="900" y2="900" gradientUnits="userSpaceOnUse">
          <stop stop-color="${from}"/>
          <stop offset="0.48" stop-color="${via}"/>
          <stop offset="1" stop-color="${to}"/>
        </linearGradient>
      </defs>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const featuredArtists = [
  {
    id: 'mira-vale',
    name: 'Mira Vale',
    role: 'Synthwave producer',
    bio: 'Cinematic night-drive electronics with crystalline vocals and velvet low end.',
    image: createArtistPortraitDataUri({ name: 'Mira Vale', from: '#8B5CF6', via: '#F472B6', to: '#22D3EE' }),
    genres: ['Synthwave', 'Alt Pop', 'Night Drive'],
    monthlyListeners: '4.8M',
    followers: '912K',
    tracks: '86',
    accent: 'violet',
  },
  {
    id: 'aya-sol',
    name: 'Aya Sol',
    role: 'Future soul vocalist',
    bio: 'Sunlit grooves, warm harmonies, and intimate hooks built for golden-hour listening.',
    image: createArtistPortraitDataUri({ name: 'Aya Sol', from: '#7C2D12', via: '#FB923C', to: '#A3E635' }),
    genres: ['Future Soul', 'R&B', 'Groove'],
    monthlyListeners: '3.2M',
    followers: '648K',
    tracks: '59',
    accent: 'orange',
  },
  {
    id: 'iris-chrome',
    name: 'Iris Chrome',
    role: 'Alternative R&B architect',
    bio: 'Glass-cut percussion and smoky melodies designed for after-hours rooms.',
    image: createArtistPortraitDataUri({ name: 'Iris Chrome', from: '#BE123C', via: '#F472B6', to: '#A78BFA' }),
    genres: ['Alt R&B', 'Electronic', 'After Hours'],
    monthlyListeners: '5.6M',
    followers: '1.4M',
    tracks: '104',
    accent: 'pink',
  },
  {
    id: 'rune-harbor',
    name: 'Rune Harbor',
    role: 'Dream techno collective',
    bio: 'Deep spatial club music with floating pads, slow-blooming builds, and oceanic pulse.',
    image: createArtistPortraitDataUri({ name: 'Rune Harbor', from: '#0F172A', via: '#14B8A6', to: '#E0F2FE' }),
    genres: ['Dream Techno', 'Ambient', 'Spatial'],
    monthlyListeners: '2.7M',
    followers: '520K',
    tracks: '73',
    accent: 'electric',
  },
  {
    id: 'north-room',
    name: 'North Room',
    role: 'Ambient pop duo',
    bio: 'Minimal pop textures, soft static, and immersive vocal layers for quiet focus.',
    image: createArtistPortraitDataUri({ name: 'North Room', from: '#111827', via: '#6366F1', to: '#A78BFA' }),
    genres: ['Ambient Pop', 'Focus', 'Minimal'],
    monthlyListeners: '1.9M',
    followers: '401K',
    tracks: '47',
    accent: 'violet',
  },
] satisfies FeaturedArtist[];
