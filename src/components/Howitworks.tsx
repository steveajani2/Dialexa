'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ReactComponent1 from "../../public/assets/Create1mob.svg"
import ReactComponent2 from "../../public/assets/Create2mob.svg"
import ReactComponent3 from "../../public/assets/Create3.svg"


const HowItWorks = () => {
    const [isMobile, setIsMobile] = useState(true);
    
    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 1120); // You can adjust the threshold value
        };
    
        handleResize()
    
        window.addEventListener('resize', handleResize);
    
        return () => window.removeEventListener('resize', handleResize);
      }, []);
  return (
    <>
    { isMobile ?   <div className="flex flex-col items-center py-8 w-full">
    <h2 className="text-3xl font-bold mb-6 text-[#25313E]">How It Works</h2>
    <div className="flex flex-col  space-y-6  w-full">
      
    <div className="flex flex-col md:flex-col items-start w-full">
        <div className="flex flex-col items-center md:items-center ">
          <Image
            src="/assets/1.svg"
            alt="Create AI Agent"
            width={70}
            height={70}
          />
          <div className="flex flex-col items-center md:items-center  mt-4 md:mt-4">
            <h3 className="text-lg font-semibold mb-2 text-[#25313E]">Setup Your AI Agent</h3>
            <p className="text-center text-gray-600 mb-4 w-[289px]">
              Select a number, voice, language, and configurations to create a personalized AI agent that resonates with your brand and your clientele.
            </p>
            {/* <Image
              src="/assets/Create1.svg"
              alt="Create AI Agent"
              width={380}
              height={380}
              className="rounded-lg shadow-lg"
            /> */}
            <div className="rounded-lg shadow-lg">
              <ReactComponent1/>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-col items-start w-full">
        <div className="flex flex-col items-center md:items-center ">
          <Image
            src="/assets/2.svg"
            alt="Create AI Agent"
            width={70}
            height={70}
          />
          <div className="flex flex-col items-center md:items-center mt-4 md:mt-4">
            <h3 className="text-lg font-semibold mb-2 text-[#25313E]">Setup Your AI Agent</h3>
            <p className="text-center text-gray-600 mb-4  w-[289px]">
              Select a number, voice, language, and configurations to create a personalized AI agent that resonates with your brand and your clientele.
            </p>
            {/* <Image
              src="/assets/Create2.svg"
              alt="Create AI Agent"
              width={380}
              height={380}
              className="rounded-lg shadow-lg"
            /> */}
             <div className="rounded-lg shadow-lg">
              <ReactComponent2/>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-col items-start w-full">
        <div className="flex flex-col items-center md:items-center ">
          <Image
            src="/assets/3.svg"
            alt="Create AI Agent"
            width={70}
            height={70}
          />
          <div className="flex flex-col items-center md:items-center  mt-4 md:mt-4">
            <h3 className="text-lg font-semibold mb-2 text-[#25313E]">Setup Your AI Agent</h3>
            <p className="text-center text-gray-600 mb-4 w-[289px]">
              Select a number, voice, language, and configurations to create a personalized AI agent that resonates with your brand and your clientele.
            </p>
            {/* <Image
              src="/assets/Create3.svg"
              alt="Create AI Agent"
              width={380}
              height={380}
              className="rounded-lg shadow-lg"
            /> */}
             <div className="rounded-lg shadow-lg">
              <ReactComponent3/>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  </div> :    <div className="flex flex-col items-center py-8 w-full">
      <h2 className="text-3xl font-bold mb-6 text-[#25313E]" >How It Works</h2>
      <div className="flex flex-col md:flex-row md:justify-center md:space-x-28 space-y-6 md:space-y-10 w-full">
      <div className="flex flex-col w-full">
        <div className="flex flex-row items-start space-x-12 w-full">
            <Image
                src="/assets/1.svg"
                alt="Create AI Agent"
                width={70}
                height={70}
                //style={{ marginTop: -80 }}
            />
          

            <div className="flex flex-col items-start w-[289px]">
                <h3 className="text-xl font-semibold mb-2 text-[#25313E]">Setup Your AI Agent</h3>
                <p className="text-left text-gray-600 mb-4">
                Select a number, voice, language, and configurations to create a personalized AI agent that resonates with your brand and your clientele.
                </p>
            </div>
            <Image
                src="/assets/Create1.svg"
                alt="Create AI Agent"
                width={600}
                height={600}
                className="rounded-lg shadow-lg"
            />
            </div>
            <div style={{marginTop: -250, marginLeft: 30}}>
            <Image
                src="/assets/Gradientleft.svg"
                alt="Create AI Agent"
                width={650}
                height={70}
                
            />
                      </div>
                      <div className="flex flex-row items-start space-x-12 w-full">
                      <Image
                src="/assets/Create2.svg"
                alt="Create AI Agent"
                width={600}
                height={600}
                className="rounded-lg shadow-lg"
            />
            <Image
                src="/assets/2.svg"
                alt="Create AI Agent"
                width={70}
                height={70}
                //style={{ marginTop: -80 }}
            />
          

            <div className="flex flex-col items-start w-[289px]">
                <h3 className="text-xl font-semibold mb-2 text-[#25313E]">Knowledge Bank Implementation</h3>
                <p className="text-left text-gray-600 mb-4">
                Easily upload scripts, company details, and prompts to equip your AI agent with the necessary information to handle customer queries effectively.
                </p>
            </div>
           
            </div>
            <div style={{marginTop: -290, marginLeft: 33}}>
            <Image
                src="/assets/Gradientright.svg"
                alt="Create AI Agent"
                width={650}
                height={70}
                
            />
                      </div>
                      <div className="flex flex-row items-start space-x-12 w-full">
                     
            <Image
                src="/assets/3.svg"
                alt="Create AI Agent"
                width={70}
                height={70}
                //style={{ marginTop: -80 }}
            />
          

            <div className="flex flex-col items-start w-[289px]">
                <h3 className="text-xl font-semibold mb-2 text-[#25313E]">Go Live</h3>
                <p className="text-left text-gray-600 mb-4">
                Make your number visible to your clientele and witness the immediate resolution of incoming calls by your AI agent, ensuring prompt and efficient responses.
                </p>
                {/* <button className="mt-6 bg-green-500 text-white px-6 py-2 rounded-full">
        Get Started
      </button> */}
            </div>
            <Image
                src="/assets/Create3.svg"
                alt="Create AI Agent"
                width={450}
                height={450}
                className="rounded-lg shadow-lg"
            />
           
            </div>
           
        </div>

       
      </div>
      <div style={{alignSelf: "center",marginTop: 120}}>
            <Image
                src="/assets/Play 2.svg"
                alt="Create AI Agent"
                width={750}
                height={70}
                
            />
                      </div>
    </div>}
    </>
  
 

  );
};

export default HowItWorks;

 {/* <div className="flex flex-col items-center">
          <div className="flex items-center justify-center bg-green-500 text-white rounded-full w-10 h-10 mb-4">
            #2
          </div>
          <h3 className="text-xl font-semibold mb-2">Knowledge Bank Implementation</h3>
          <p className="text-center text-gray-600 mb-4">
            Easily upload scripts, company details, and prompts to equip your AI agent with the necessary information to handle customer queries effectively.
          </p>
          <Image
            src="/path-to-your-image/knowledge-bank.png"
            alt="Knowledge Bank"
            width={300}
            height={200}
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center bg-green-500 text-white rounded-full w-10 h-10 mb-4">
            #3
          </div>
          <h3 className="text-xl font-semibold mb-2">Go Live</h3>
          <p className="text-center text-gray-600 mb-4">
            Make your number visible to your clientele and witness the immediate resolution of incoming calls by your AI agent, ensuring prompt and efficient responses.
          </p>
          <Image
            src="/path-to-your-image/go-live.png"
            alt="Go Live"
            width={300}
            height={200}
            className="rounded-lg shadow-lg"
          />
        </div> */}