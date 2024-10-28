import React from 'react';
import Image from 'next/image';
import ReactComponent5 from "../../public/assets/Mobileimg.svg"

const Main1 = () => {
  return (
    <div className="text-center">
      <div className="hidden md:block">
        <p className="font-work-sans font-light text-4xl leading-[56.3px] text-[#25313E] m-0">
          Revolutionize Your 
        </p>
        <p className="font-work-sans font-semibold text-4xl leading-[56.3px] text-[#25313E]  m-0">
     Inbound Call Resolution!
        </p>
        <p className="font-work-sans font-light text-sm leading-[30.3px] text-[#8F94A8] m-0">
        Your Ultimate Solution for Customer Support and Inbound Call Automation.
        </p>
        <Image
                  
                  src="/assets/Mainimg.svg"
                  alt="Dialexa.ai logo"
                  width={1620}
                  height={120}
                 // className="shrink-0 aspect-square fill-[linear-gradient(120deg,#450DBD_15.71%,#DA12AE_80.8%)]"
                />
      </div>
      <div className="flex items-center justify-center ">
      <div className="block md:hidden w-full ">
        <div className="block md:hidden w-[289px] h-[56px] mx-auto text-center">
          <p className="font-work-sans font-light text-2xl leading-[28.15px] text-[#25313E] m-0">
            Revolutionize Your
          </p>
          <p className="font-work-sans font-semibold text-2xl leading-[28.15px] text-[#25313E] m-0">
            Inbound Call Resolution!
          </p>
          <p className="font-work-sans font-light text-sm leading-[20.3px] text-[#8F94A8] m-0 ">
            Your Ultimate Solution for Customer Support and Inbound Call Automation.
          </p>
        </div>
        {/* <Image
          
          src="/assets/Mobileimg.svg"
          alt="Dialexa.ai logo"
          width={420}
          height={420}
          style={{marginTop: 60}}
        /> */}
        <div style={{marginTop: 60}}>
        <ReactComponent5/>
        </div>

        {/* <Image
          
          src="/assets/Dashboard2.svg"
          alt="Dialexa.ai logo"
          width={420}
          height={120}
          style={{marginTop: -200}}
        /> */}
         
      </div>
    </div>

    </div>
  );
};

export default Main1;
