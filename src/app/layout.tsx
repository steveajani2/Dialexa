'use client';
import '@/styles/globals.css';

import { Metadata } from 'next';
import { Work_Sans } from 'next/font/google';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { MainProvider } from '@/components/providers/MainProvider';
import { MainLayout } from '@/components/templates/MainLayout';
import { NearContext } from '../wallets/near';

import { NetworkId, HelloNearContract } from '../config';

import { Wallet } from '../wallets/near';

const wallet = new Wallet({ networkId: NetworkId, createAccessKeyFor: HelloNearContract });
import { cn } from '@/lib/utils';

const workSans = Work_Sans({ subsets: ['latin'], variable: '--font-primary' });

// const defaultUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : 'http://localhost:3000';

// export const metadata: Metadata = {
//   metadataBase: new URL(defaultUrl),
//   title: 'Dialexa -ai',
//   description:
//     '🚀 Dialexa -ai for Next.js, Tailwind CSS and TypeScript ⚡️ Made with developer experience first: Next.js, TypeScript, ESLint, Prettier, Husky, Lint-Staged, Jest, React Testing Library, PostCSS, Tailwind CSS, Storybook, Plop, GH actions.'
// };

interface RootLayoutProps {
  children: ReactNode;
}

const noNavs = [ '/', '/aboutus', 'contactus', '/pricing'];

const RootLayout = ({ children }: RootLayoutProps) => {

  const [signedAccountId, setSignedAccountId] = useState('');

  useEffect(() => { wallet.startUp(setSignedAccountId); }, []);
  return (
    <html lang="en">
      <body className={cn(workSans.variable, 'font-primary')} suppressHydrationWarning>
          <NearContext.Provider value={{ wallet, signedAccountId }}>
        <Toaster position="bottom-center" />
        <MainProvider>
          <MainLayout>
            <main className="py-9">{children}</main>
          </MainLayout>
        </MainProvider>
        </NearContext.Provider>
        {/* <main >{children}</main> */}
      </body>
    </html>
  );
};

export default RootLayout;
