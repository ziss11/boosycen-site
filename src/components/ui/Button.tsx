import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
}

const variants = {
  primary:
    'bg-linear-to-br from-accent-primary to-[#7c6cef] text-white shadow-md hover:shadow-lg',
  secondary:
    'bg-linear-to-br from-white to-gray-50 text-foreground border-2 border-accent-primary/30 shadow-md hover:shadow-lg hover:border-accent-primary',
};

const sizes = {
  sm: 'py-2 px-4 text-sm',
  md: 'py-3 px-6 text-base',
  lg: 'py-4 px-8 text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-md transition-all duration-300 ease-out transform hover:-translate-y-1 hover:scale-[1.03] active:translate-y-0.5 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-accent-primary/20';

  const combinedStyles =
    `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`.trim();

  if (href) {
    return (
      <Link
        href={href}
        className={combinedStyles}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedStyles}
    >
      {children}
    </button>
  );
}
