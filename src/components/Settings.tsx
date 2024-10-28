'use client';

import { useState } from 'react';
import { FaUserCircle, FaBell, FaSearch } from 'react-icons/fa';
import Image from 'next/image';
import Basicinfo from '@/components/BasicInfo';
import Security from '@/components/Security';
import Notification from '@/components/Notification';
import Subscription from '@/components/Subscription';


import Link from 'next/link';
// import { useRouter } from 'next/router';

import { IoReturnUpBackOutline } from 'react-icons/io5';


const Settings: React.FC<{ userId : string }> = ({ userId }) => {
// export default function Settings() {
  const [profileCompletion, setProfileCompletion] = useState(50);
  const [Active, setActive] = useState('Basic');
//   const router = useRouter();

  const isActive = (path : any) => path === Active
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">

      <aside className="w-full md:w-64 bg-white shadow-md p-5">
        <h2 className="text-xl font-semibold mb-8">Dialexa.ai</h2>
 
         <nav>
      <ul className="space-y-4">
        <li style={{fontFamily: "Work Sans"}} onClick={() => {setActive("Basic")}}  className={`font-medium ${isActive('Basic') ? 'text-purple-600' : 'text-gray-600'}`}>
        Basic Information
        
        </li>
        <li style={{fontFamily: "Work Sans"}} onClick={() => {setActive("Security")}}  className={isActive('Security') ? 'text-purple-600' : 'text-gray-600'}>
        Security
        </li>
        <li style={{fontFamily: "Work Sans"}} onClick={() => {setActive("Notification")}} className={isActive('/settings/notification') ? 'text-purple-600' : 'text-gray-600'}>
        Notification
        </li>
        <li style={{fontFamily: "Work Sans"}} onClick={() => {setActive("Subscription")}} className={isActive('/settings/notification') ? 'text-purple-600' : 'text-gray-600'}>
        Subscription
        </li>

        {/* <li  style={{fontFamily: "Work Sans"}}className={isActive('/settings/subscription') ? 'text-purple-600' : 'text-gray-600'}>
          <Link href="/settings/subscription">Subscription</Link>
        </li> */}
      </ul>
    </nav>
       
      </aside>

   { Active === "Basic" && <Basicinfo userId={userId}/>}
   { Active === "Security" && <Security userId={userId}/>}
   { Active === "Notification" && <Notification userId={userId}/>}
   { Active === "Subscription" && <Subscription userId={userId}/>}
    </div>
  );
}


export default Settings;