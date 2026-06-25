import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

export type WithClassName<T = object> = T & {
  className?: string;
};

export type WithChildren<T = object> = T & {
  children?: ReactNode;
};

export type PolymorphicProps<TElement extends ElementType, TProps = object> = TProps &
  Omit<ComponentPropsWithoutRef<TElement>, keyof TProps | 'as'> & {
    as?: TElement;
  };
