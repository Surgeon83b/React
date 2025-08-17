import Link from 'next/link';
import { Providers } from './providers';
import { ThemeToggle } from '@/components/ThemeToggle';
import '@/index.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <Providers>
          <header className='header'>
            <Link href='/about'>About</Link>
            <ThemeToggle />
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
