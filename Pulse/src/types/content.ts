import type { LucideIcon } from 'lucide-react';

export type FeatureItem = {
  title: string;
  description: string;
  icon?: LucideIcon;
  accent?: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  rating: number;
  avatar?: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type TrendingAlbum = {
  id: string;
  title: string;
  artist: string;
  genre: string;
  duration: string;
  artwork: string;
};

export type PlaylistPromptExample = string;

export type GeneratedPlaylist = {
  id: string;
  title: string;
  description: string;
  mood: string;
  tracks: number;
  duration: string;
  gradient: string;
};

export type FeaturedArtist = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  genres: string[];
  monthlyListeners: string;
  followers: string;
  tracks: string;
  accent: string;
};
