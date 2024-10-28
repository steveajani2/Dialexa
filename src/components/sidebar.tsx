

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState,useContext } from 'react';
import toast from 'react-hot-toast';
import { NearContext } from '../wallets/near'
type MenuItemProps = {
  link: string;
  icon: string;
  alt: string;
  label: string;
};

const MenuItem: React.FC<MenuItemProps & { isActive: boolean }> = ({
  link,
  icon,
  alt,
  label,
  isActive
}) => (
  <Link
    href={link}
    className={`flex gap-2 px-5 py-3 mt-5 cursor-pointer rounded ${isActive ? 'bg-purple-200 text-purple-800' : 'hover:bg-gray-200'}`}
  >
    <Image
      loading="lazy"
      src={`/assets/${icon}`}
      alt={alt}
      width={16}
      height={16}
      className="shrink-0 w-4 aspect-square"
    />

    <div className="my-auto whitespace-nowrap">{label}</div>
  </Link>
);

const Sidebar: React.FC = () => {

  const { signedAccountId, wallet } = useContext(NearContext);
  const [action, setAction] = useState(() => { });
  const [label, setLabel] = useState('Loading...');
  const [headerl, setheaderl] = useState('');
  useEffect(() => {
    if (!wallet) return;

    if (signedAccountId) {
      setAction(() => wallet.signOut);
      setLabel(`Disconnect ${signedAccountId}`);
      if (headerl === "yes"){
        wallet.signOut()
        handleSignout()
        
      }
    } else {
      setAction(() => wallet.signIn);
      // signIn2()
      setLabel('Connect wallet');
    }
  }, [signedAccountId, wallet,headerl]);
  const menuItems = [
    {
      link: '/dashboard',
      icon: 'icon-dashboard.svg',
      alt: '',
      label: 'Dashboard',
      component: 'Dashboard'
    },
    {
      link: '/knowledge-base',
      icon: 'icon-knowledgebase.svg',
      alt: '',
      label: 'Knowledge Base',
      component: 'KnowledgeBase'
    },
    {
      link: '/call-logs',
      icon: 'icon-call.svg',
      alt: '',
      label: 'Call Logs',
      component: 'CallLogs'
    },
    {
      link: '/agents',
      icon: 'icon-robot-line.svg',
      alt: '',
      label: 'AI Agents',
      component: 'AiAgents'
    },
    // {
    //   link: '/client',
    //   icon: 'icon-building.svg',
    //   alt: '',
    //   label: 'Client Page',
    //   component: 'ClientPage'
    // },
    {
      link: '/settings',
      icon: 'icon-settings.svg',
      alt: '',
      label: 'Settings',
      component: 'Settings'
    }
  ];

  const router = useRouter();
  //  const [menuOpen, setMenuOpen] = useState(false);
  const supabase = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  });

  const handleSignout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        // eslint-disable-next-line no-console
        console.error('ERROR:', error);
      } else {
        router.push('/signin');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.error('ERROR:', error.message);
      } else {
        console.error('Unexpected error', error);
      }
    }
  };
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // You can adjust the threshold value
    };

    handleResize(); // Call initially to set the state based on the initial screen size

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        <></>
      ) : (
        <>
          <nav className="flex flex-col px-2.5 py-12 text-xs font-medium leading-3 text-gray-600 bg-white rounded-2xl w-48">
            <div className="flex gap-2 justify-center self-center text-xl font-semibold whitespace-nowrap text-slate-800 mb-5">
              <Image
                loading="lazy"
                src="/assets/icon-logo.svg"
                alt="Dialexa.ai logo"
                width={20}
                height={20}
                className="shrink-0 aspect-square fill-[linear-gradient(120deg,#450DBD_15.71%,#DA12AE_80.8%)]"
              />
              <div>Dialexa.ai</div>
            </div>
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                link={item.link}
                icon={item.icon}
                alt={item.alt}
                label={item.label}
                isActive={false}
              />
            ))}
            <div className="flex-grow"></div>
            <div
              className="flex gap-3 px-5 py-3 whitespace-nowrap rounded max-md:mt-10 cursor-pointer"
              //onClick={action}
              onClick={() => {setheaderl('yes')}}
            >
              <Image
                loading="lazy"
                src="/assets/icon-logout.svg"
                alt="logout"
                width={16}
                height={16}
                className="shrink-0 w-4 aspect-square"
              />
              <div className="my-auto">Logout</div>
            </div>
          </nav>
        </>
      )}
    </>
  );
};

export default Sidebar;
