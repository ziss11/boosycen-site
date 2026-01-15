import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Griselda Putri Cahyaningtyas | UI/UX Designer',
  description:
    "Crafting intuitive digital experiences through thoughtful UI/UX design. View my work and let's create something beautiful together.",
  keywords: [
    'UI/UX Design',
    'Product Design',
    'User Experience',
    'Interface Design',
    'Portfolio',
    'Griselda Putri',
  ],
  authors: [{ name: 'Griselda Putri Cahyaningtyas' }],
  openGraph: {
    title: 'Griselda Putri Cahyaningtyas | UI/UX Designer',
    description:
      'Crafting intuitive digital experiences through thoughtful UI/UX design.',
    type: 'website',
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
    >
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
