import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ThemeProvider } from '@/contexts/ThemeContext';

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Griselda Putri Cahyaningtyas | UI/UX Designer',
  description:
    'Crafting intuitive digital experiences through thoughtful UI/UX design. View my work and let\'s create something beautiful together.',
  keywords: [
    'UI/UX Design',
    'Product Design',
    'User Experience',
    'Interface Design',
    'Portfolio',
    'Griselda Putri',
    'Figma',
    'Design System',
  ],
  authors: [{ name: 'Griselda Putri Cahyaningtyas' }],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Griselda Putri Cahyaningtyas | UI/UX Designer',
    description:
      'Crafting intuitive digital experiences through thoughtful UI/UX design.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Griselda Putri Cahyaningtyas | UI/UX Designer',
    description: 'Crafting intuitive digital experiences through thoughtful UI/UX design.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className='scroll-smooth'
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})()` }} />
      </head>
      <body className={`${jakarta.variable} ${playfair.variable} antialiased`}>
        <ThemeProvider>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
