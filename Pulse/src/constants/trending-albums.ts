import type { TrendingAlbum } from '@/types/content';

function createArtworkDataUri({
  title,
  artist,
  from,
  via,
  to,
}: {
  title: string;
  artist: string;
  from: string;
  via: string;
  to: string;
}) {
  const safeTitle = title.replace(/[<&>]/g, '');
  const safeArtist = artist.replace(/[<&>]/g, '');

  const svg = `
    <svg width="960" height="960" viewBox="0 0 960 960" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="960" height="960" rx="120" fill="#050507"/>
      <rect width="960" height="960" rx="120" fill="url(#bg)"/>
      <circle cx="248" cy="232" r="210" fill="white" opacity="0.16"/>
      <circle cx="740" cy="714" r="310" fill="white" opacity="0.11"/>
      <circle cx="496" cy="482" r="238" fill="black" opacity="0.22"/>
      <circle cx="496" cy="482" r="214" stroke="white" stroke-opacity="0.18" stroke-width="2"/>
      <circle cx="496" cy="482" r="82" fill="#050507" fill-opacity="0.52" stroke="white" stroke-opacity="0.18" stroke-width="2"/>
      <path d="M164 706C288 620 394 625 502 704C612 785 721 779 810 706" stroke="white" stroke-opacity="0.24" stroke-width="18" stroke-linecap="round"/>
      <path d="M176 760C296 697 400 710 506 772C611 833 705 830 792 768" stroke="white" stroke-opacity="0.16" stroke-width="10" stroke-linecap="round"/>
      <text x="86" y="124" fill="white" fill-opacity="0.9" font-family="Inter, Arial, sans-serif" font-size="54" font-weight="700" letter-spacing="-2">${safeTitle}</text>
      <text x="88" y="178" fill="white" fill-opacity="0.56" font-family="Inter, Arial, sans-serif" font-size="28" font-weight="500" letter-spacing="2">${safeArtist.toUpperCase()}</text>
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="960" y2="960" gradientUnits="userSpaceOnUse">
          <stop stop-color="${from}"/>
          <stop offset="0.48" stop-color="${via}"/>
          <stop offset="1" stop-color="${to}"/>
        </linearGradient>
      </defs>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const trendingAlbums = [
  {
    id: 'neon-fields',
    title: 'Neon Fields',
    artist: 'Mira Vale',
    genre: 'Synthwave',
    duration: '42 min',
    artwork: createArtworkDataUri({
      title: 'Neon Fields',
      artist: 'Mira Vale',
      from: '#8B5CF6',
      via: '#F472B6',
      to: '#22D3EE',
    }),
  },
  {
    id: 'soft-static',
    title: 'Soft Static',
    artist: 'North Room',
    genre: 'Ambient Pop',
    duration: '36 min',
    artwork: createArtworkDataUri({
      title: 'Soft Static',
      artist: 'North Room',
      from: '#111827',
      via: '#6366F1',
      to: '#A78BFA',
    }),
  },
  {
    id: 'velvet-circuit',
    title: 'Velvet Circuit',
    artist: 'Iris Chrome',
    genre: 'Alt R&B',
    duration: '48 min',
    artwork: createArtworkDataUri({
      title: 'Velvet Circuit',
      artist: 'Iris Chrome',
      from: '#BE123C',
      via: '#F97316',
      to: '#FDE68A',
    }),
  },
  {
    id: 'midnight-index',
    title: 'Midnight Index',
    artist: 'The Signalist',
    genre: 'Electronica',
    duration: '51 min',
    artwork: createArtworkDataUri({
      title: 'Midnight Index',
      artist: 'The Signalist',
      from: '#020617',
      via: '#2563EB',
      to: '#06B6D4',
    }),
  },
  {
    id: 'solar-language',
    title: 'Solar Language',
    artist: 'Aya Sol',
    genre: 'Future Soul',
    duration: '39 min',
    artwork: createArtworkDataUri({
      title: 'Solar Language',
      artist: 'Aya Sol',
      from: '#7C2D12',
      via: '#FB923C',
      to: '#A3E635',
    }),
  },
  {
    id: 'glass-echoes',
    title: 'Glass Echoes',
    artist: 'Rune Harbor',
    genre: 'Dream Techno',
    duration: '44 min',
    artwork: createArtworkDataUri({
      title: 'Glass Echoes',
      artist: 'Rune Harbor',
      from: '#0F172A',
      via: '#14B8A6',
      to: '#E0F2FE',
    }),
  },
] satisfies TrendingAlbum[];
