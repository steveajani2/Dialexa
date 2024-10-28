import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState,useContext } from 'react';
import toast from 'react-hot-toast';
import { NearContext } from '../wallets/near'
type HeaderProps = {
  title: string;
  subtitle: string;
};

type MenuItemProps = {
  link: string;
  icon: string;
  alt: string;
  label: string;
};

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const [isMobile, setIsMobile] = useState(true);
  const { signedAccountId, wallet } = useContext(NearContext);
  const [action, setAction] = useState(() => { });
  const [label, setLabel] = useState('Loading...');
  const [userdata, setuserdata] = useState()

  const [headerl, setheaderl] = useState('');

  useEffect(() => {
    if (!wallet) return;

    if (signedAccountId) {
      setAction(() => wallet.signOut);
      setLabel(`Disconnect ${signedAccountId}`);
     // handleSignout()
      // if (headerl === "yes"){
      //   wallet.signOut()
      //   handleSignout()
        
      // }
      //handleSignout()
    }
    else {
      setAction(() => wallet.signIn);
      // signIn2()
      // if (headerl === "yes"){
      //   wallet.signIn()
      //  // handleSignout()
        
      // }
      setLabel('Connect wallet');
      
    }
  }, [signedAccountId, wallet,headerl]);


  useEffect(() => {
 
    if (signedAccountId) {
      
      const handleResize = async () => {
        const {
          data: { user }
        } = await supabase.auth.getUser();

      
      
      const { data: items } = await supabase
        .from('user_data')
        .select('id, first_name, last_name, created_at, email, user_id, wallet_id ')
        .eq('user_id', user?.id)
        .eq('wallet_id', signedAccountId)
        setuserdata(items[0])
      }
      handleResize()
    }else {
      const handleResize = async () => {
        const {
          data: { user }
        } = await supabase.auth.getUser();

      
      
      const { data: items } = await supabase
        .from('user_data')
        .select('id, first_name, last_name, created_at, email, user_id, wallet_id ')
        .eq('user_id', user?.id)
       // .eq('wallet_id', signedAccountId)

        setuserdata(items[0])
      }
      handleResize()
    }
 
  }, [])

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
      onClick={() => setMenuOpen(!menuOpen)}
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // You can adjust the threshold value
    };

    handleResize(); // Call initially to set the state based on the initial screen size

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const supabase = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  });



  const menuItems = [
    {
      link: '/',
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

  return (
    <>
      {isMobile ? (
        <>
          <header className="absolute top-0 left-0 right-0 flex flex-col gap-3 px-3 py-4 bg-white shadow-md">
            <div className="flex justify-between items-center text-xl font-semibold whitespace-nowrap text-slate-800 mb-0.5">
              <div className="flex gap-2">
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
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 bg-transparent border-none cursor-pointer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Image
                  loading="lazy"
                  src="/assets/menu.svg"
                  alt="menu"
                  width={25}
                  height={25}
                  className="shrink-0 aspect-square fill-[linear-gradient(120deg,#450DBD_15.71%,#DA12AE_80.8%)]"
                  style={{ marginRight: '10px' }}
                />
              </button>
            </div>
            {/* <section className="flex flex-col justify-center mt-16 px-3 py-4">
  <h1 className="text-xl font-semibold text-slate-800">{title}</h1>
  <p className="mt-1 text-xs font-medium text-gray-400">{subtitle}</p>
</section> */}
          </header>

          {!menuOpen && (
            <header className="absolute top-20 left-0 right-0 flex flex-col gap-3 px-3 py-4 bg-white rounded-xl shadow-md">
              <div className="flex items-center gap-4">
                <button onClick={() =>{setheaderl('yes')}} style={{width: "50%", justifyContent: "center", alignItems: "center", alignContent: "center", height: 50}} className="justify-center self-stretch px-2 py-1.5 my-auto text-xs font-medium text-blue-600 rounded-lg bg-blue-600 bg-opacity-10">
                  {label}
                </button>
                {/* <div className="flex justify-between items-center self-stretch p-2 my-auto  bg-slate-200 rounded-full ">
                  <Image
                    loading="lazy"
                    src="/assets/icon-search.svg"
                    width={14}
                    height={14}
                    alt="search-normal"
                    className="shrink-0 w-4 aspect-square"
                  />
                </div>

                <Image
                  loading="lazy"
                  src="/assets/icon-notification.svg"
                  width={20}
                  height={20}
                  alt="notification-bing"
                  className="shrink-0 self-stretch my-auto w-5 aspect-[0.93]"
                />
               */}
                <button onClick={() => {router.push('/settings');}} style={{width: "40%",height: 40}} className="flex items-center justify-between p-2 bg-white rounded-xl shadow-sm ">
                  <div className="flex items-center gap-2">
                    <div className="flex justify-center items-center w-6 h-6 bg-violet-300 rounded-full">
                      <Image
                        loading="lazy"
                        src="/assets/avatar.png"
                        alt="avatar"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                    </div>
                    {/* <div className="text-xs font-semibold">Elvis Anthony</div> */}
                    <div className="text-xs font-semibold">{userdata?.first_name ? `${userdata?.first_name}` : ''}</div>
                  </div>
                  {/* <div className="flex items-center">
                    <Image
                      loading="lazy"
                      src="/assets/icon-arrow-down.svg"
                      alt="arrow-down"
                      width={10}
                      height={10}
                      className="w-5 h-5"
                    />
                  </div> */}
                </button>
              </div>
            </header>
          )}
          <section
            className="flex flex-col justify-center mt-24 px-3 py-4"
            style={{ marginTop: '130px', marginLeft: '-2%' }}
          >
            <h1 className="text-xl font-semibold text-slate-800" style={{ fontSize: 17 }}>
              {title}
            </h1>
            <p className="mt-1 text-xs font-medium text-gray-400">{subtitle}</p>
          </section>
          {menuOpen && (
            <div className="mt-2 " style={{ marginTop: -140 }}>
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex flex-col space-y-2">
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
                  <div
                    className="flex items-center gap-3 px-5 py-3 rounded cursor-pointer"
                    onClick={() => {
                      //setheaderl('yes')
                      setheaderl('yes')
                      if (signedAccountId) {
                      wallet.signOut()
                      handleSignout()
                     
                      }
                      else {
                        wallet.signIn()
                      }
                    }}
                  >
                    <Image
                      loading="lazy"
                      src="/assets/icon-logout.svg"
                      alt="logout"
                      width={16}
                      height={16}
                      className="shrink-0 w-4 aspect-square"
                    />
                    <div className="text-sm font-medium text-gray-600">Logout</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <header className="flex gap-5 justify-between px-px w-full max-md:flex-wrap max-md:max-w-full">
            <section className="flex flex-col justify-center">
              <h1 className="text-xl font-semibold text-slate-800">{title}</h1>
              <p className="mt-1 text-xs font-medium text-gray-400">{subtitle}</p>
            </section>
            <div className="flex gap-5 justify-between items-center self-start max-md:flex-wrap">
              
              {/* <div className="flex justify-center items-center self-stretch p-2.5 my-auto w-8 h-8 bg-slate-200 rounded-[32px]">
                <Image
                  loading="lazy"
                  src="/assets/icon-search.svg"
                  width={16}
                  height={16}
                  alt="search-normal"
                  className="shrink-0 w-4 aspect-square"
                />
              </div>
              <Image
                loading="lazy"
                src="/assets/icon-notification.svg"
                width={24}
                height={24}
                alt="notification-bing"
                className="shrink-0 self-stretch my-auto w-6 aspect-[0.93]"
              />
               */}
  <button onClick={() =>{
    //setheaderl('yes')
    if (signedAccountId) {
    wallet.signOut()
    handleSignout()
   
    }
    else {
      wallet.signIn()
    }
    }} className="justify-center self-stretch p-2.5 my-auto text-sm font-medium text-blue-600 rounded-lg bg-blue-600 bg-opacity-10">
                {label}
              </button>
              <button onClick={() => {router.push('/settings');}}  className="flex items-center justify-between p-2 bg-white rounded-xl shadow-sm">
                <div className="flex items-center gap-2">
                  <div className="flex justify-center items-center w-6 h-6 bg-violet-300 rounded-full">
                    <Image
                      loading="lazy"
                      src="/assets/avatar.png"
                      alt="avatar"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </div>
                  <div className="text-xs font-semibold">{userdata?.first_name  ? `${userdata?.first_name}` : ''}</div>
                </div>
                {/* <div className="flex items-center">
                  <Image
                    loading="lazy"
                    src="/assets/icon-arrow-down.svg"
                    alt="arrow-down"
                    width={10}
                    height={10}
                    className="w-5 h-5"
                  />
                </div> */}
              </button>
            
            </div>
          </header>
        </>
      )}
    </>
  );
};

export default Header;
