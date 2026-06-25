export const theme = {
  colors: {
    background: '#050507',
    surface: '#0B0B10',
    surfaceElevated: '#12121A',
    textPrimary: '#F7F7FA',
    textSecondary: '#B5B6C4',
    textMuted: '#777986',
    pulseViolet: '#8B5CF6',
    pulseElectric: '#22D3EE',
    pulsePink: '#F472B6',
    pulseLime: '#A3E635',
    pulseOrange: '#FB923C',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #8B5CF6 0%, #F472B6 45%, #22D3EE 100%)',
    surface: 'linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))',
    ambient: 'radial-gradient(circle at 50% 0%, rgba(139,92,246,0.28), transparent 55%)',
  },
  radii: {
    xs: '0.375rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    full: '9999px',
  },
} as const;

export type Theme = typeof theme;
