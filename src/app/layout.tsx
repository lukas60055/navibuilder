import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { MenuProvider } from '@/contexts/MenuContext';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Edytor nawigacji - Łukasz Duda',
  description:
    'Aplikacja Next.js umożliwiająca tworzenie i edycję list nawigacji z obsługą drag & drop, walidacją formularzy oraz możliwością dodawania zagnieżdżonych elementów. Projekt oparty na Tailwind CSS i dnd-kit, zgodnie z dostarczonym designem z Figmy.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <MenuProvider>{children}</MenuProvider>
      </body>
    </html>
  );
}
