'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

import FullScreenLoader from '@/components/full-screen-loader'; // Ensure this path is correct
import Header from '@/components/header';
import Sidebar from '@/components/sidebar';

import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

// This is the place responsible for wrapping your app.
// Add here components like Footer, Nav etc.
export const MainLayout = ({ children, className }: MainLayoutProps) => {
  const [headerTitle, setHeaderTitle] = useState('');
  const [headerSubTitle, setHeaderSubTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      switch (url) {
        case '/':
          setHeaderTitle('Dashboard');
          setHeaderSubTitle('View the metrics within your dashboard');
          break;
        case '/knowledge-base':
          setHeaderTitle('Knowledge Base');
          setHeaderSubTitle(
            'Connect your knowledge base to let your AI Agent learn from existing content'
          );
          break;
        case '/call-logs':
          setHeaderTitle('Call Logs');
          setHeaderSubTitle('View all calls made to your AI Agent');
          break;
        default:
          setHeaderTitle('Dashboard');
          setHeaderSubTitle('View the metrics within your dashboard');
      }
    };

    handleRouteChange(pathname ?? '');

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname, router]);

  const wrapperStyles = cn(
    'flex gap-5 px-5 py-9 bg-slate-100 max-md:flex-wrap',
    'min-h-[100vh] max-h-[950vh]',
    className
  );
  const noNavs = ['/signin', '/signup', '/verify-email', '/forgot-password', '/reset-password', '/', '/aboutus', '/contactus', '/pricing'];
  const noLoads= [ '/', '/aboutus', '/contactus', '/pricing'];
  if (pathname === null) {
    return null;
  }

  if (isLoading && !noLoads.includes(pathname)) {
    return <FullScreenLoader />;
  }

  return (
    <div className={wrapperStyles}>
      {noNavs.includes(pathname) ? null : <Sidebar />}
      <main className="flex flex-col grow w-fit max-md:max-w-full">
        {noNavs.includes(pathname) ? null : (
          <Header title={headerTitle} subtitle={headerSubTitle} />
        )}
        {children}
      </main>
    </div>
  );
};
