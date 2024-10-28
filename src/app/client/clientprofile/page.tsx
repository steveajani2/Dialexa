'use client';

import { useRouter } from 'next/navigation';
import React, { useState,useEffect } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Image from 'next/image';
import IconButton from '@/components/icon-button';
import LIstText from '@/components/list-text';
import { RiArrowDropDownLine } from "react-icons/ri";
const KnowledgeBaseCreate: React.FC = (props) => {
  const router = useRouter();

  const handlePreviousPage = () => {
    router.push('/client');
  };

  const handleEditItem = () => {
    const itemId = 1;
    router.push(`${itemId}/edit`);
  };

  const handleDeleteItem = () => {
    alert('delete item');
  };
//   useEffect(() => {
//     console.log(props.router.query.name);
// }, [props.router.query]);

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
    {
      title: 'Event Hosting',
      details: [
        'Hosting private events or parties within the restaurant, providing dedicated spaces and customized services for birthdays, anniversaries, business meetings, and other celebrations.',
        'Offering event planning assistance and special menus.'
      ]
    }
  ];

  return (
    <div className="flex flex-col grow w-full max-md:max-w-full md:h-calc-100vh-120">
      <nav className="flex gap-0 py-5 text-xs whitespace-nowrap">
        <span className="text-gray-400">Client /</span>
        <span className="text-blue-600">Profile</span>
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
       
         <div className="flex items-center justify-center ">
      <div className="flex flex-col items-center">
        <Image
          loading="lazy"
          src="/assets/face.svg"
          alt="face"
          width={120}
          height={120}
          style={{ marginBottom: 20 }}
        />
        <h1 className="text-2xl font-semibold text-center">
          Selena Gomez
        </h1>
        <div className="flex flex-wrap justify-center gap-10 mt-6 w-full max-w-5xl">
          <div className="flex flex-col items-start w-full sm:w-auto space-y-2">
            <div className="checkbox flex items-center gap-2.5">
              <span className="font-semibold text-sm" style={{ color: "#8F94A8" }}>Email</span>
            </div>
            <div className="checkbox flex items-center gap-2.5">
              <span className="text-sm text-blue-600 ml-0" style={{ color: "#435060" }}>selenagom@email.com	</span>
            </div>
          </div>
          <div className="flex flex-col items-start w-full sm:w-auto space-y-2">
            <div className="checkbox flex items-center gap-2.5">
              <span className="font-semibold text-sm" style={{ color: "#8F94A8" }}>Phone Number</span>
            </div>
            <div className="checkbox flex items-center gap-2.5">
              <span className="text-sm text-blue-600 ml-0" style={{ color: "#435060" }}>+123 4337896</span>
            </div>
          </div>
          <div className="flex flex-col items-start w-full sm:w-auto space-y-2">
            <div className="checkbox flex items-center gap-2.5">
              <span className="font-semibold text-sm" style={{ color: "#8F94A8" }}>Address</span>
            </div>
            <div className="checkbox flex items-center gap-2.5">
              <span className="text-sm text-blue-600 ml-0" style={{ color: "#435060" }}>45th Street West End Allen Avenue, Sasktatoon 00098, Canada</span>
            </div>
          </div>
          <div className="flex flex-col items-start w-full sm:w-auto space-y-2">
            <div className="checkbox flex items-center gap-2.5">
              <span className="font-semibold text-sm" style={{ color: "#8F94A8" }}>Date Created</span>
            </div>
            <div className="checkbox flex items-center gap-2.5">
              <span className="text-sm text-blue-600 ml-0" style={{ color: "#435060" }}>12 May 2024</span>
            </div>
          </div>
        </div>
      </div>
    </div>
        
      </section>

      <section className="flex flex-row justify-between items-center px-20 py-8 gap-6 bg-white rounded-lg max-md:px-5 max-md:max-w-full mt-10">
  <h1 className="text-xl font-semibold">
    Client’s Rating
  </h1>
  <div className="flex items-center gap-2">
    <h1 className="text-2xl font-semibold text-end">
      4.0
    </h1>
    <Image
      loading="lazy"
      src="/assets/star.svg"
      alt="star"
      width={25}
      height={25}
    />
    <Image
      loading="lazy"
      src="/assets/star.svg"
      alt="star"
      width={25}
      height={25}
    />
    <Image
      loading="lazy"
      src="/assets/star.svg"
      alt="star"
      width={25}
      height={25}
    />
    <Image
      loading="lazy"
      src="/assets/star.svg"
      alt="star"
      width={25}
      height={25}
    />
  </div>
</section>

<div className="flex flex-col gap-4 px-4 py-4 bg-white rounded-lg w-full max-w-full" style={{marginTop: 20}}>


<h1 className="text-xl font-semibold">
    Call History
  </h1>
<div className="w-full max-h-[680px] overflow-auto">
  <table className="min-w-full text-xs text-left">
    <thead>
      <tr className="h-9 bg-slate-100 font-medium text-gray-400">
        <td></td>
        <th>Phone Number</th>
        <th>Agent</th>
        <th>Category</th>
        <th>Details</th>
        <th>Date</th>
        <th>Call Type</th>
        <th>Duration</th>
        <th>Ratings</th>
        <th>Action</th>
      </tr>
    </thead>
   
    <tbody className="px-6">
   
      {/* {filteredLogs
        .slice(LOGS_PER_PAGE * (currentPage - 1), LOGS_PER_PAGE * currentPage)
        .map((call, idx) => (
         
          <tr onClick={() => { 
            router.push('/call-logs/transcript');
          }} key={idx} className="h-[50px] px-3 py-[7px] cursor-pointer hover:bg-gray-100">
            <td></td>
            <td className="text-gray-600 font-semibold">{call.clientName}</td>
            <td className="text-indigo-600">{call.phoneNumber}</td>
            <td className={`${call.category === 'Received' ? 'text-slate-800' : call.category === 'Missed' ? 'text-rose-600' : 'text-violet-800'}`}>
              {call.category}
            </td>
            <td className="text-gray-400">{call.details}</td>
            <td className="text-gray-400">{call.date}</td>
            <td>
              <div className="w-16 h-[22px] bg-slate-100 rounded justify-center items-center gap-0.5 inline-flex">
                <Image src="/assets/icon-microphone.svg" alt="" width={16} height={16} />
                <div className="text-gray-600 font-medium">Audio</div>
              </div>
            </td>
            <td className="text-gray-400">{call.duration}</td>
            <td></td>
          </tr>
        ))} */}

    </tbody>

  </table>
</div>
</div>

    </div>
  );
};

export default KnowledgeBaseCreate;
