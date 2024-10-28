import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

type CardProps = {
  imgSrc: string;
  imgAlt: string;
  bgColor: string;
  title: string;
  subtitle: string;
  value: string;
};

const Card: React.FC<CardProps> = ({ imgSrc, imgAlt, bgColor, title, subtitle, value }) => {
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // You can adjust the threshold value
    };

    handleResize(); // Call initially to set the state based on the initial screen size

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const textsplit = value.split(' ');

  return (
    <>
      {isMobile ? (
        <section className="flex flex-col flex-1 items-start px-7 py-3 bg-white rounded-lg max-md:px-5">
          <div
            className={cn(
              'flex flex-col justify-center items-center p-2.5 rounded-lg bg-opacity-15 ',
              bgColor
            )}
            // className={cn(
            //   'flex flex-col justify-start items-start p-2.5 rounded-lg bg-opacity-15 max-md:pr-5 w-0/1',
            //   bgColor
            // )}

            // style={{width : 50, height : 30}}
          >
            <Image
              loading="lazy"
              src={`/assets/${imgSrc}`}
              alt={imgAlt}
              width={36}
              height={36}
              className="w-4 aspect-square"
              // style={{marginLeft: 10}}
            />
          </div>
          <div
            style={{ marginTop: -28, marginLeft: 60, fontSize: 13 }}
            className="mt-5 text-sm font-semibold leading-3 text-slate-800"
          >
            {title}
          </div>
          <div
            style={{ marginTop: 10, marginLeft: 62, fontSize: 12 }}
            className="flex gap-2.5 pr-5 mt-1 text-sm leading-3 text-gray-400"
          >
            <div>{subtitle}</div>
            <Image
              loading="lazy"
              src="/assets/icon-increase.svg"
              alt="icon-increase"
              width={14}
              height={14}
              className="shrink-0 w-3.5 aspect-square"
            />
          </div>
          <div
            style={{ marginTop: -35, marginLeft: 258 }}
            className="mt-5 text-x font-semibold leading-8 text-gray-600"
          >
            {textsplit[0]} <span style={{ fontSize: 12 }}>{textsplit[1]}</span>
          </div>
          {/* <div className="mt-5 text-4xl font-semibold leading-8 text-gray-600">
      {textsplit[0]}
      <span style={{ fontSize: 18 }}>{textsplit[1]}</span>
    </div> */}
        </section>
      ) : (
        <section className="flex flex-col flex-1 items-start px-7 py-3 bg-white rounded-lg max-md:px-5">
          <div
            className={cn(
              'flex flex-col justify-center items-start p-2.5 rounded-lg bg-opacity-15 max-md:pr-5',
              bgColor
            )}
          >
            <Image
              loading="lazy"
              src={`/assets/${imgSrc}`}
              alt={imgAlt}
              width={36}
              height={36}
              className="w-4 aspect-square"
            />
          </div>
          <div
            className="mt-5 text-sm font-semibold leading-3 text-slate-800"
            style={{ lineHeight: 1.5, fontSize: 13 }}
          >
            {title}
          </div>
          <div
            style={{ lineHeight: 1.5, fontSize: 12 }}
            className="flex gap-2.5 pr-5 mt-1 text-sm leading-3 text-gray-400"
          >
            <div>{subtitle}</div>
            <Image
              loading="lazy"
              src="/assets/icon-increase.svg"
              alt="icon-increase"
              width={14}
              height={14}
              className="shrink-0 w-3.5 aspect-square"
            />
          </div>
          <div
            className="mt-5 text-4xl font-semibold leading-8 text-gray-600"
            style={{ fontSize: 25 }}
          >
            {textsplit[0]}
            <span style={{ fontSize: 18 }}> {textsplit[1]}</span>
          </div>
        </section>
      )}
    </>
  );
};

export default Card;
