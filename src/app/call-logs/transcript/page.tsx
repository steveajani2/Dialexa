'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Image from 'next/image';

import IconButton from '@/components/icon-button';
import LIstText from '@/components/list-text';

interface Message {
  text: string;
  sender: 'human' | 'ai';
}

const CallLogTranscript: React.FC = () => {
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Dummy data for past messages
    const dummyMessages: Message[] = [
      { text: 'Kenneth: Hello, my name is Kenneth and I am calling from Toronto, Canada. ', sender: 'human' },
      { text: 'AI Agent: Hello! Kenneth, how are you doing today and how can i be of service?', sender: 'ai' },
      { text: 'Kenneth: I’m doing great, I would like to make some enquires.', sender: 'human' },
      { text: 'AI Agent: Ok, Kenneth, please go ahead, let’s see how I can help you.', sender: 'ai' },
      { text: 'Kenneth: What are the food you have on your menu for Tuesday mornings?', sender: 'human' },
      { text: `AI Agent: Well, our menu for Tuesday morning include the following but not limited to them as well,\n 
      \n . French toast\n 
      . Boa buns
      . Omelet and pancakes
      . Juice and scrambled eggs
      
      Please note that these options are only for Tuesday mornings from 8AM till 10AM, after which we would not be able to serve them. We also offer home or office deliveries.`, sender: 'ai' },
    
    ];
    setMessages(dummyMessages);
  }, []);
  const handlePreviousPage = () => {
    router.push('/call-logs');
  };

  const handlePlay = () => {
    const itemId = 1;
    //router.push(`${itemId}/edit`);
  };

  const handleDownload = () => {
    alert('delete item');
  };

  const services = [
    {
      title: 'Dine-In Service',
      details: [
        'Providing a comfortable and inviting environment for customers to enjoy their meals.',
        'Offering table service with waitstaff taking orders, serving food, and attending to customer needs.'
      ]
    },
    {
      title: 'Delivery Service',
      details: [
        "Delivering food directly to customers' homes or workplaces through in-house delivery staff or third-party delivery services.",
        'Ensuring timely and accurate delivery of orders.'
      ]
    },
    {
      title: 'Reservation Service',
      details: [
        'Allowing customers to reserve tables in advance to ensure seating availability, especially during peak hours or for large groups.',
        'Offering online or phone reservation systems.'
      ]
    },
    // {
    //   title: 'Event Hosting',
    //   details: [
    //     'Hosting private events or parties within the restaurant, providing dedicated spaces and customized services for birthdays, anniversaries, business meetings, and other celebrations.',
    //     'Offering event planning assistance and special menus.'
    //   ]
    // }
  ];

  return (
    <div className="flex flex-col grow w-full max-md:max-w-full md:h-calc-100vh-120">
      <nav className="flex gap-0 py-5 text-xs whitespace-nowrap">
        <span className="text-gray-400">Call logs/</span>
        <span className="text-blue-600">Transcript</span>
      </nav>
      <section className="flex flex-col px-20 py-8 gap-6 bg-white rounded-lg max-md:px-5 max-md:max-w-full">
        <IconButton
          onClick={handlePreviousPage}
          tooltip="Create source"
          icon={<IoReturnUpBackOutline className="w-4 h-4 text-indigo-500" />}
          className="bg-indigo-100 text-indigo-500 flex gap-1 justify-center items-center p-2.5 font-medium rounded-lg w-[65px]"
          color=''
        >
          <span className="text-xs leading-normal font-medium">Back</span>
        </IconButton>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full">
  <div className="title mb-2 md:mb-0">
    <h1 className="text-xl md:text-2xl font-semibold leading-normal mb-1">
      Transcript
    </h1>
    <span className="bg-slate-200 text-gray-600 text-xs md:text-sm leading-normal font-medium p-1.5 rounded-sm">
      Duration: 3 min | 07:45AM | May 12, 2024
    </span>
  </div>
  <div className="flex gap-2 mt-2 md:mt-0">
    <IconButton
      onClick={handlePlay}
      tooltip="Play audio"
      icon={
        <Image
          loading="lazy"
          src="/assets/play.svg"
          alt="play"
          width={6}
          height={16}
          className="shrink-0 my-auto w-4 aspect-square"
        />
      }
      className="text-indigo-600 flex gap-1 justify-center items-center p-2.5 font-medium w-30 border border-[#450DBD] rounded"
      color=''
    >
      <span className="text-xs md:text-s leading-normal font-medium  ">Play audio</span>
    </IconButton>
    <IconButton
      onClick={handleDownload}
      tooltip="Download"
      icon={
        <Image
          loading="lazy"
          src="/assets/download.svg"
          alt="download"
          width={6}
          height={16}
          className="shrink-0 my-auto w-4 aspect-square"
        />
      }
      className="text-rose-600 bg-rose-50 flex gap-1 justify-center items-center p-2.5 font-medium w-30 rounded"
      color='#450DBD'
    >
      <span style={{color: "white"}} className="text-xs md:text-sm leading-normal font-medium">Download</span>
    </IconButton>
  </div>
</div>

        {/* <div className="flex justify-between items-center">
          <div className="title">
            <h1 className="text-2xl font-semibold leading-normal mb-1">
            Transcript
            </h1>
            <span className="bg-slate-200 text-gray-600 text-xs leading-normal font-medium p-1.5 rounded-sm">
             Duration: 3 min | 07:45AM | May 12, 2024
            </span>
          </div>
          <div className="flex gap-1">
            <IconButton
              onClick={handlePlay}
              tooltip="Create source"
              icon={<Image
                loading="lazy"
                src="/assets/play.svg"
                alt="arrow-down"
                width={6}
                height={16}
                className="shrink-0 my-auto w-4 aspect-square"
       
              />}
              className="text-indigo-600 flex gap-1 justify-center items-center p-2.5 font-medium w-30 border border-[#450DBD]"
              color=''
            >
              <span className="text-xs leading-normal font-medium">Play audio</span>
            </IconButton>
            <IconButton
              onClick={handleDownload}
              tooltip="Create source"
              icon={<Image
                loading="lazy"
                src="/assets/download.svg"
                alt="arrow-down"
                width={6}
                height={16}
                className="shrink-0 my-auto w-4 aspect-square"
       
              />}
              className="text-rose-600 bg-rose-50 flex gap-1 justify-center items-center p-2.5 font-medium w-30"
              color='#450DBD'
            >
              <span style={{color: "white"}} className="text-xs leading-normal font-medium">Download</span>
            </IconButton>
          </div>
        </div> */}
       
          <div
      className="text-xs leading-5 text-gray-600 bg-indigo-50 p-4"
      style={{ borderRadius: 20, height: '500px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      <div className="flex-1 overflow-auto mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-center my-4 p-3 rounded-lg ${
              message.sender === 'human' ? 'bg-white' : 'bg-indigo-200'
            }`}
            style={{ maxWidth:  message.text.length < 100? "70%" : '95%', marginLeft: 10 }}
          >
            <Image
              loading="lazy"
              src={message.sender === 'human' ? '/assets/human.svg' : '/assets/ai.svg'}
              alt={message.sender}
              width={20}
              height={20}
              className="mr-2"
            />
            <span style={{ color: message.sender === 'human' ? '' : '#450DBD' }}>{message.text}</span>
          </div>
        ))}
      </div>
      {/* <div className="flex items-center border-t border-gray-300 pt-2">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-lg outline-none"
          placeholder="Type your message..."
        />
        <button className="ml-2 p-2 bg-indigo-500 text-white rounded-lg">Send</button>
      </div> */}
    </div>



      </section>
    </div>
  );
};

export default CallLogTranscript;
