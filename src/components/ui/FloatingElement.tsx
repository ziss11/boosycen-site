import { ReactNode } from 'react';

interface FloatingElementProps {
  children: ReactNode;
  speed?: 'slow' | 'normal' | 'fast';
  delay?: number;
  className?: string;
}

export default function FloatingElement({
  children,
  speed = 'normal',
  delay = 0,
  className = '',
}: FloatingElementProps) {
  const speeds = {
    slow: 'animate-float-slow',
    normal: 'animate-float',
    fast: 'animate-float',
  };

  return (
    <div
      className={`${speeds[speed]} ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
