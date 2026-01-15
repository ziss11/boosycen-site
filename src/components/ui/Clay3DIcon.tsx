import { ReactNode } from 'react';

interface Clay3DIconProps {
  children: ReactNode;
  gradient?: 'lavender' | 'pink' | 'mint' | 'peach' | 'sky';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  floating?: boolean;
}

const gradientClasses = {
  lavender: 'bg-linear-to-br from-pastel-lavender to-pastel-pink',
  pink: 'bg-linear-to-br from-pastel-pink to-pastel-peach',
  mint: 'bg-linear-to-br from-pastel-mint to-pastel-sky',
  peach: 'bg-linear-to-br from-pastel-peach to-pastel-cream',
  sky: 'bg-linear-to-br from-pastel-sky to-pastel-lavender',
};

const sizeClasses = {
  sm: 'w-10 h-10 text-lg',
  md: 'w-14 h-14 text-2xl',
  lg: 'w-20 h-20 text-3xl',
  xl: 'w-28 h-28 text-5xl',
};

export default function Clay3DIcon({
  children,
  gradient = 'lavender',
  size = 'md',
  className = '',
  floating = false,
}: Clay3DIconProps) {
  const floatingClass = floating ? 'animate-float' : '';

  return (
    <div
      className={`inline-flex items-center justify-center rounded-md shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 ${gradientClasses[gradient]} ${sizeClasses[size]} ${floatingClass} ${className}`.trim()}
    >
      {children}
    </div>
  );
}

// Pre-styled icons for common use cases
export function FigmaIcon({
  size = 'md',
  floating = false,
}: {
  size?: 'sm' | 'md' | 'lg';
  floating?: boolean;
}) {
  return (
    <Clay3DIcon
      gradient='lavender'
      size={size}
      floating={floating}
    >
      <svg
        viewBox='0 0 24 24'
        className='w-1/2 h-1/2'
        fill='currentColor'
      >
        <path d='M12 2H8.5C6.57 2 5 3.57 5 5.5S6.57 9 8.5 9H12V2Z' />
        <path
          d='M12 9H8.5C6.57 9 5 10.57 5 12.5S6.57 16 8.5 16H12V9Z'
          opacity='0.8'
        />
        <path
          d='M12 16H8.5C6.57 16 5 17.57 5 19.5S6.57 23 8.5 23 12 21.43 12 19.5V16Z'
          opacity='0.6'
        />
        <path
          d='M12 2H15.5C17.43 2 19 3.57 19 5.5S17.43 9 15.5 9H12V2Z'
          opacity='0.9'
        />
        <circle
          cx='15.5'
          cy='12.5'
          r='3.5'
          opacity='0.7'
        />
      </svg>
    </Clay3DIcon>
  );
}

export function PenToolIcon({
  size = 'md',
  floating = false,
}: {
  size?: 'sm' | 'md' | 'lg';
  floating?: boolean;
}) {
  return (
    <Clay3DIcon
      gradient='pink'
      size={size}
      floating={floating}
    >
      <svg
        viewBox='0 0 24 24'
        className='w-1/2 h-1/2'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
      >
        <path d='M12 19l7-7 3 3-7 7-3-3z' />
        <path d='M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z' />
        <path d='M2 2l7.586 7.586' />
        <circle
          cx='11'
          cy='11'
          r='2'
        />
      </svg>
    </Clay3DIcon>
  );
}

export function CodeIcon({
  size = 'md',
  floating = false,
}: {
  size?: 'sm' | 'md' | 'lg';
  floating?: boolean;
}) {
  return (
    <Clay3DIcon
      gradient='mint'
      size={size}
      floating={floating}
    >
      <svg
        viewBox='0 0 24 24'
        className='w-1/2 h-1/2'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
      >
        <polyline points='16 18 22 12 16 6' />
        <polyline points='8 6 2 12 8 18' />
      </svg>
    </Clay3DIcon>
  );
}

export function LightbulbIcon({
  size = 'md',
  floating = false,
}: {
  size?: 'sm' | 'md' | 'lg';
  floating?: boolean;
}) {
  return (
    <Clay3DIcon
      gradient='peach'
      size={size}
      floating={floating}
    >
      <svg
        viewBox='0 0 24 24'
        className='w-1/2 h-1/2'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
      >
        <path d='M9 18h6' />
        <path d='M10 22h4' />
        <path d='M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14' />
      </svg>
    </Clay3DIcon>
  );
}

export function TargetIcon({
  size = 'md',
  floating = false,
}: {
  size?: 'sm' | 'md' | 'lg';
  floating?: boolean;
}) {
  return (
    <Clay3DIcon
      gradient='sky'
      size={size}
      floating={floating}
    >
      <svg
        viewBox='0 0 24 24'
        className='w-1/2 h-1/2'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
      >
        <circle
          cx='12'
          cy='12'
          r='10'
        />
        <circle
          cx='12'
          cy='12'
          r='6'
        />
        <circle
          cx='12'
          cy='12'
          r='2'
        />
      </svg>
    </Clay3DIcon>
  );
}
