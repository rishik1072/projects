import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '360px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
      screens: {
        sm: '100%',
        md: '720px',
        lg: '960px',
        xl: '1160px',
        '2xl': '1320px',
      },
    },
    extend: {
      colors: {
        background: 'rgb(var(--color-background) / <alpha-value>)',
        foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        'surface-elevated': 'rgb(var(--color-surface-elevated) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        brand: {
          violet: 'rgb(var(--color-brand-violet) / <alpha-value>)',
          electric: 'rgb(var(--color-brand-electric) / <alpha-value>)',
          pink: 'rgb(var(--color-brand-pink) / <alpha-value>)',
          lime: 'rgb(var(--color-brand-lime) / <alpha-value>)',
          orange: 'rgb(var(--color-brand-orange) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: [
          'Geist',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        display: [
          'Geist',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem, 14vw, 7.5rem)', { lineHeight: '0.9', letterSpacing: '-0.075em' }],
        'display-lg': ['clamp(3rem, 10vw, 5.5rem)', { lineHeight: '0.94', letterSpacing: '-0.06em' }],
        'heading-xl': ['clamp(2.25rem, 7vw, 4rem)', { lineHeight: '1', letterSpacing: '-0.045em' }],
        'heading-lg': ['clamp(1.875rem, 5vw, 3rem)', { lineHeight: '1.05', letterSpacing: '-0.035em' }],
        'heading-md': ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.12', letterSpacing: '-0.025em' }],
        'body-lg': ['clamp(1.125rem, 2vw, 1.25rem)', { lineHeight: '1.65' }],
        'body-md': ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        caption: ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.04em' }],
      },
      borderRadius: {
        xs: '0.375rem',
        sm: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        glow: '0 0 48px rgb(var(--color-brand-violet) / 0.25)',
        card: '0 24px 80px rgb(0 0 0 / 0.35)',
        elevated: '0 32px 120px rgb(0 0 0 / 0.5)',
        inset: 'inset 0 1px 0 rgb(255 255 255 / 0.08)',
      },
      backgroundImage: {
        'pulse-gradient': 'linear-gradient(135deg, #8B5CF6 0%, #F472B6 45%, #22D3EE 100%)',
        'glass-gradient': 'linear-gradient(180deg, rgb(255 255 255 / 0.10), rgb(255 255 255 / 0.03))',
        'hero-radial': 'radial-gradient(circle at 50% 0%, rgb(139 92 246 / 0.28), transparent 55%)',
      },
      transitionDuration: {
        fast: '180ms',
        base: '280ms',
        slow: '550ms',
        reveal: '750ms',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.22, 1, 0.36, 1)',
        entrance: 'cubic-bezier(0.16, 1, 0.3, 1)',
        exit: 'cubic-bezier(0.7, 0, 0.84, 0)',
      },
      zIndex: {
        header: '50',
        overlay: '80',
        modal: '100',
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
