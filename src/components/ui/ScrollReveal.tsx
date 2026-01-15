'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

export default function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className = '',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const animations = {
    'fade-up': {
      initial: 'translate-y-8 opacity-0',
      visible: 'translate-y-0 opacity-100',
    },
    'fade-in': {
      initial: 'opacity-0',
      visible: 'opacity-100',
    },
    'slide-left': {
      initial: '-translate-x-12 opacity-0',
      visible: 'translate-x-0 opacity-100',
    },
    'slide-right': {
      initial: 'translate-x-12 opacity-0',
      visible: 'translate-x-0 opacity-100',
    },
    scale: {
      initial: 'scale-90 opacity-0',
      visible: 'scale-100 opacity-100',
    },
  };

  const { initial, visible } = animations[animation];

  return (
    <div
      ref={ref}
      className={`
        transition-all ease-out
        ${isVisible ? visible : initial}
        ${className}
      `}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
