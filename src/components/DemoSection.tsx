'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';


const DemoSection = () => {
  return (
    <div className="w-full py-16 px-4 flex flex-col items-center" style={{ backgroundColor: "#F3F5FC" }}>
    <h2 className="text-2xl font-semibold text-center mb-8" style={{color : "#25313E", fontSize: 30, textAlign: "center",maxWidth: 600}}>
      We help businesses save time, money and resources
    </h2>
    <div className="hidden md:block">
    <div className="flex flex-col md:flex-row justify-center items-center mb-12 space-y-4 md:space-y-0 md:space-x-4">
  <div className="max-w-md text-center mx-4">
    <div className="flex flex-col md:flex-row">
      <Image
        
        src="/assets/Qoute.svg"
        alt="Dialexa.ai logo"
        width={50}
        height={120}
        style={{ marginTop: -90 }}
       
      />
      <p className=" mb-4" style={{ color: "#435060" }}>
        "Dialexa Ai has revolutionized how we handle inbound calls. Our
        customer interactions are more efficient and personalized,
        leading to higher satisfaction rates!"
      </p>
    </div>
    <div className="flex flex-row" style={{gap: 15, marginLeft: 80}}>
    <Image
        
        src="/assets/jane.svg"
        alt="Dialexa.ai logo"
        width={50}
        height={120}
       // style={{ marginTop: -90 }}
      />
       <p className="font-bold" style={{ color: "#25313E", textAlign: "left" }}>
      Jane Doe,
      <br />
      CEO Happy Customers Inc.
    </p>
    </div>

  </div>
  <div className="max-w-md text-center mx-4" >
    <div className="flex flex-col md:flex-row">
      <Image
        
        src="/assets/Qoute.svg"
        alt="Dialexa.ai logo"
        width={50}
        height={120}
        style={{ marginTop: -90 }}
       
      />
      <p className="italic mb-4" style={{ color: "#435060" }}>
        "Dialexa Ai has revolutionized how we handle inbound calls. Our
        customer interactions are more efficient and personalized,
        leading to higher satisfaction rates!"
      </p>
    </div>
    <div className="flex flex-row" style={{gap: 15, marginLeft: 80}}>
    <Image
        
        src="/assets/john.svg"
        alt="Dialexa.ai logo"
        width={50}
        height={120}
       // style={{ marginTop: -90 }}
      />
       <p className="font-bold" style={{ color: "#25313E", textAlign: "left" }}>
      John Doe,
      <br />
      CEO Happy Customers Inc.
    </p>
    </div>

  </div>
</div>
    </div>
   

    <div className="block md:hidden w-full ">
    <div className="flex flex-col justify-center items-center mb-12 space-y-4 md:space-y-0 md:space-x-4">
  <div className="max-w-md text-center mx-4">
    <div className="flex flex-row" >
      <Image
        
        src="/assets/Qoute.svg"
        alt="Dialexa.ai logo"
        width={50}
        height={120}
        style={{ marginTop: -90 }}
      />
      <p className="italic mb-4" style={{ color: "#435060" }}>
        "Dialexa Ai has revolutionized how we handle inbound calls. Our
        customer interactions are more efficient and personalized,
        leading to higher satisfaction rates!"
      </p>
    </div>
    <div className="flex flex-row" style={{gap: 15, marginLeft: 30}}>
    <Image
        
        src="/assets/jane.svg"
        alt="Dialexa.ai logo"
        width={50}
        height={120}
       // style={{ marginTop: -90 }}
      />
       <p className="font-bold" style={{ color: "#25313E", textAlign: "left" }}>
      Jane Doe,
      <br />
      CEO Happy Customers Inc.
    </p>
    </div>

  </div>
  <div className="max-w-md text-center mx-4">
    <div className="flex flex-row">
      <Image
        
        src="/assets/Qoute.svg"
        alt="Dialexa.ai logo"
        width={50}
        height={120}
        style={{ marginTop: -90 }}
      />
      <p className="italic mb-4" style={{ color: "#435060" }}>
        "Dialexa Ai has revolutionized how we handle inbound calls. Our
        customer interactions are more efficient and personalized,
        leading to higher satisfaction rates!"
      </p>
    </div>
    <div className="flex flex-row" style={{gap: 15, marginLeft: 30}}>
    <Image
        
        src="/assets/john.svg"
        alt="Dialexa.ai logo"
        width={50}
        height={120}
       // style={{ marginTop: -90 }}
      />
       <p className="font-bold" style={{ color: "#25313E", textAlign: "left" }}>
      Jane Doe,
      <br />
      CEO Happy Customers Inc.
    </p>
    </div>

  </div>
</div>
    </div>


  
    <div
  className="rounded-lg py-8 px-6 text-center"
  style={{
    background: 'linear-gradient(90deg, #450DBD 0%, #DA12AE 100%)',
    color: 'white',
    width: "80%",
    margin: "0 auto", // Center the div itself
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30
  }}
>
  <h3 className="text-xl font-semibold mb-4" style={{ fontSize: 20, textAlign: "center", maxWidth: 620, lineHeight: 1.5 }}>
    Ready to Elevate Your Customer Support Experience with Dialexa Ai?
  </h3>
  <p className="mb-6" style={{ textAlign: "center", maxWidth: 560, lineHeight: 1.5, color: "#E6E6E8", fontSize: 13, }}>
    Sign up now for a demo or reach out to our team to learn more about
    how Dialexa Ai can transform your business
  </p>
  <a
    href="#"
    className="bg-white  hover:bg-green-100 font-semibold py-3 px-6 rounded-full"
    style={{fontSize: 13, color: "#450DBD"}}
  >
    Get a Demo
  </a>
</div>


  </div>
  
  );
};

export default DemoSection;
