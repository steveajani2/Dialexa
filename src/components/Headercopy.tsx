'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type HeaderProps = {
  title: string;
  
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header style={{marginTop: -70}} className="fixed w-full flex justify-between items-center border-b border-b-foreground/10 h-20 bg-white px-4 shadow-md z-50">

      <a href="/" className="flex items-center">
       
         <Image
                  
                  src="/assets/Logotext.svg"
                  alt="Dialexa.ai logo"
                  width={120}
                  height={120}
                  className="shrink-0 aspect-square fill-[linear-gradient(120deg,#450DBD_15.71%,#DA12AE_80.8%)]"
                />
      </a>

     
      <div className="hidden md:flex space-x-8" style ={{marginLeft: 80}}>
        <div className="flex flex-col" style={{gap :0, alignItems:"center"}}>
        <a href="/aboutus" className="text-sm text-gray-600 hover:text-gray-900">About Us</a>
       {title === "Aboutus" && <div className=" bg-purple-line w-full" style={{width : 49 , backgroundColor: "#450DBD", height:3, borderRadius: 20}}/>}
        </div>

        <div className="flex flex-col" style={{gap :0, alignItems:"center"}}>
        <a href="/pricing" className="text-sm text-gray-600 hover:text-gray-900">Pricing</a>
       {title === "Pricing" &&  <div className=" bg-purple-line w-full" style={{width : 42 , backgroundColor: "#450DBD", height:3, borderRadius: 20}}/>}
        </div>
        
        <div className="flex flex-col" style={{gap :0, alignItems:"center"}}>
        <a href="/contactus" className="text-sm text-gray-600 hover:text-gray-900">Contact Us</a>
      {title === "Contactus" && <div className="bg-purple-line w-full" style={{width : 49, backgroundColor: "#450DBD", height:3, borderRadius: 20}}/>}
        </div>


      </div>

     
      <div className="hidden md:flex space-x-4">
        {/* <button className="text-white px-4 py-2 rounded" style={{borderRadius: 40, borderColor: "black", backgroundColor: "transparent", color: "black", borderWidth:1, fontSize:13, width: 130}}>Get started</button> */}
        <a href="/dashboard">
        <button className=" text-white px-4 py-2 rounded"  style={{borderRadius: 40, backgroundColor:"#450DBD", fontSize:13, width: 130 }}>Get Started</button>    </a>
      </div>

  
     
       <div className="md:hidden flex items-center">
          <button onClick={toggleModal} className="focus:outline-none">
            {isModalOpen ? (
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            )}
          </button>
        </div>


      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 bg-black bg-opacity-0" onClick={closeModal}>
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-screen-sm mx-auto" onClick={e => e.stopPropagation()}>
            <a href="/aboutus" className="block text-gray-700 hover:text-gray-900 py-2 text-lg">About Us</a>
            <a href="/pricing" className="block text-gray-700 hover:text-gray-900 py-2 text-lg">Pricing</a>
            <a href="/contactus" className="block text-gray-700 hover:text-gray-900 py-2 text-lg">Contact Us</a>
            {/* <button 
              className="w-full text-white px-4 py-2 rounded my-2" 
              style={{borderRadius: 40, borderColor: "black", backgroundColor: "transparent", color: "black", borderWidth: 1, fontSize: 13, }}
            >
              Get started
            </button> */}
            <a href="/dashboard">
            <button 

className="w-full text-white px-4 py-2 rounded" 
style={{borderRadius: 40, backgroundColor: "#450DBD", fontSize: 13, }}
>
Get Started
</button>
            </a>
           
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

