import type { FAQItem } from '@/types/content';

export const faqItems = [
  {
    question: 'What makes Pulse different from other music apps?',
    answer:
      'Pulse is built around context instead of only catalog search. It adapts playlists, soundscapes, artist discovery, and shared sessions around mood, movement, time of day, and listening behavior.',
  },
  {
    question: 'Is the AI Playlist Generator real?',
    answer:
      'This landing page uses a frontend-only simulation with fake data. In the product vision, playlist generation would combine taste signals, audio metadata, and user intent to create adaptive mixes.',
  },
  {
    question: 'Can I download music for offline listening?',
    answer:
      'Yes. Offline downloads are included in Pulse Pro and Studio plans, with intelligent refreshes for daily mixes, saved albums, and listening rituals.',
  },
  {
    question: 'Does Pulse support creators and artists?',
    answer:
      'Yes. Pulse Studio is designed for artists, curators, and teams with creator profiles, fan signals, private rooms, early drops, and collaborative listening tools.',
  },
  {
    question: 'Which devices will Pulse support?',
    answer:
      'Pulse is designed for phone, tablet, desktop, and connected speakers. Cross-device sync keeps queue position, lyrics, and session state aligned as you move.',
  },
  {
    question: 'How does the private beta work?',
    answer:
      'Listeners can join the beta list from the landing page. Early access would roll out in waves to test discovery quality, playback flows, and creator tooling before public launch.',
  },
] satisfies FAQItem[];
