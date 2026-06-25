import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

type ButtonVariant = 'primary' | 'secondary' | 'glass' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

type BaseButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button';
  };

type ButtonAsAnchor = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: 'a';
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const variants: Record<ButtonVariant, string> = {
  primary:
    'border-white/10 bg-white text-background shadow-[0_1px_0_rgb(255_255_255_/_0.35)_inset,0_14px_32px_rgb(255_255_255_/_0.12)] hover:bg-white/90',
  secondary:
    'border-white/10 bg-surface-elevated text-foreground shadow-card hover:bg-white/[0.09]',
  glass:
    'border-white/10 bg-white/[0.06] text-foreground shadow-inset backdrop-blur-xl hover:bg-white/[0.1]',
  ghost: 'border-transparent bg-transparent text-muted hover:bg-white/[0.06] hover:text-foreground',
  outline: 'border-white/15 bg-transparent text-foreground hover:border-white/30 hover:bg-white/[0.06]',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 gap-2 rounded-full px-3.5 text-sm',
  md: 'h-10 gap-2 rounded-full px-4 text-sm',
  lg: 'h-11 gap-2.5 rounded-full px-5 text-sm',
  icon: 'size-10 rounded-full p-0',
};

function getButtonClassName(variant: ButtonVariant, size: ButtonSize, className?: string) {
  return cn(
    'group/button motion-gpu inline-flex shrink-0 items-center justify-center border font-medium tracking-[-0.01em] transition-[background,border-color,color,box-shadow,transform] duration-base ease-standard focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-electric focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-[0.985]',
    variants[variant],
    sizes[size],
    className,
  );
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children } = props;
  const buttonClassName = getButtonClassName(variant, size, className);

  if (props.as === 'a') {
    const { as: _as, variant: _variant, size: _size, className: _className, children: _children, ...anchorProps } = props;

    return (
      <a className={buttonClassName} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { as: _as, variant: _variant, size: _size, className: _className, children: _children, type = 'button', ...buttonProps } = props;

  return (
    <button className={buttonClassName} type={type} {...buttonProps}>
      {children}
    </button>
  );
}
