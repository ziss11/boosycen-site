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
