'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';

export function ConditionalHeaderFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');
  const isHomePage = pathname === '/';

  return (
    <>
      {!isAdminPage && !isHomePage && <Header />}
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      {!isAdminPage && !isHomePage && <Footer />}
    </>
  );
}

