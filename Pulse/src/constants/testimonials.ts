import type { Testimonial } from '@/types/content';

function createAvatarDataUri({ name, from, to }: { name: string; from: string; to: string }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const svg = `
    <svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="256" height="256" rx="128" fill="#050507"/>
      <rect width="256" height="256" rx="128" fill="url(#g)"/>
      <circle cx="78" cy="70" r="58" fill="white" opacity="0.16"/>
      <circle cx="198" cy="196" r="78" fill="white" opacity="0.1"/>
      <text x="128" y="145" fill="white" font-family="Inter, Arial, sans-serif" font-size="74" font-weight="750" text-anchor="middle" letter-spacing="-5">${initials}</text>
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="256" y2="256" gradientUnits="userSpaceOnUse">
          <stop stop-color="${from}"/>
          <stop offset="1" stop-color="${to}"/>
        </linearGradient>
      </defs>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const testimonials = [
  {
    quote:
      'Pulse feels less like opening an app and more like stepping into the exact room my mood needed.',
    name: 'Elena Park',
    role: 'Creative Director',
    rating: 5,
    avatar: createAvatarDataUri({ name: 'Elena Park', from: '#8B5CF6', to: '#F472B6' }),
  },
  {
    quote:
      'The discovery engine is frighteningly good. It keeps finding tracks that sound familiar and impossible at the same time.',
    name: 'Julian Moss',
    role: 'Independent Artist',
    rating: 5,
    avatar: createAvatarDataUri({ name: 'Julian Moss', from: '#22D3EE', to: '#6366F1' }),
  },
  {
    quote:
      'I use Pulse during deep work every day. The mixes evolve without ever pulling me out of focus.',
    name: 'Nora Imani',
    role: 'Product Designer',
    rating: 5,
    avatar: createAvatarDataUri({ name: 'Nora Imani', from: '#FB923C', to: '#F472B6' }),
  },
  {
    quote:
      'It finally treats artists like worlds, not rows in a database. The creator experience feels genuinely considered.',
    name: 'Mateo Silva',
    role: 'Music Curator',
    rating: 5,
    avatar: createAvatarDataUri({ name: 'Mateo Silva', from: '#14B8A6', to: '#A3E635' }),
  },
  {
    quote:
      'The interface has that rare quiet confidence. Premium, fast, emotional, and never overdesigned.',
    name: 'Avery Chen',
    role: 'Startup Founder',
    rating: 5,
    avatar: createAvatarDataUri({ name: 'Avery Chen', from: '#A78BFA', to: '#22D3EE' }),
  },
  {
    quote:
      'Collaborative sessions changed how our studio listens together. It makes taste feel shared without becoming noisy.',
    name: 'Sofia Grant',
    role: 'Studio Producer',
    rating: 5,
    avatar: createAvatarDataUri({ name: 'Sofia Grant', from: '#BE123C', to: '#FB923C' }),
  },
] satisfies Testimonial[];
