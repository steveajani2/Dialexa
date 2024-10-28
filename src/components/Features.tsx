

'use client';
import { useState } from 'react';
import Image from 'next/image';


const Features = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className=" text-white p-2  flex flex-col justify-between" >
      <div className="hidden md:block w-full flex-grow">
      

        {showMore ? (
            <>
          <Image
            
            src="/assets/Property2.svg"
            alt="Dialexa.ai logo"
             width={1420}
            height={120}
            className="transition-opacity duration-500"
          />
          <div className="flex justify-center " style={{marginTop:-60}}>
          <button
            onClick={() => setShowMore(!showMore)}
            className=" text-white px-4 py-2 rounded-full"
            style={{background: "#450DBD"}}
          >
            {showMore ? 'Less Features' : 'More Features'}
          </button>
        </div>
        </>
        ) : (
            <>
          <Image
            
            src="/assets/Property1.svg"
            alt="Dialexa.ai logo"
            width={1420}
            height={120}
            className="transition-opacity duration-500"
            
          />
           <div className="flex justify-center "style={{marginTop:-60}}>
          <button
            onClick={() => setShowMore(!showMore)}
            className=" text-white px-4 py-2 rounded-full"
            style={{background: "#450DBD"}}
          >
            {showMore ? 'Less Features' : 'More Features'}
          </button>
        </div>
          </>
        )}
      </div>
      <div className="block md:hidden w-full flex-grow" >
      

      {showMore ? (
          <>
        <Image
          
          src="/assets/Mobileproperty2.svg"
          alt="Dialexa.ai logo"
           width={320}
          height={120}
          className="transition-opacity duration-500"
        />
        <div className="flex justify-center " style={{marginTop:-60}}>
        <button
          onClick={() => setShowMore(!showMore)}
          className=" text-white px-4 py-2 rounded-full"
          style={{fontSize:12,background: "#450DBD"}}
          // style={{background: "#450DBD"}}
        >
          {showMore ? 'Less Features' : 'More Features'}
        </button>
      </div>
      </>
      ) : (
          <>
        <Image
          
          src="/assets/Mobileproperty1.svg"
          alt="Dialexa.ai logo"
          width={320}
          height={120}
          className="transition-opacity duration-500"
          
        />
         <div className="flex justify-center "style={{marginTop:-60}}>
        <button
          onClick={() => setShowMore(!showMore)}
          className=" text-white px-4 py-2 rounded-full"
          style={{fontSize:12, background: "#450DBD"}}
          // style={{background: "#450DBD"}}
        >
          {showMore ? 'Less Features' : 'More Features'}
        </button>
      </div>
        </>
      )}
    </div>
   
    </div>
  );
};

export default Features;
