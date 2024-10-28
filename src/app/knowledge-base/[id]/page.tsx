'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { IoReturnUpBackOutline } from 'react-icons/io5';
import { RiDeleteBin6Line } from 'react-icons/ri';

import IconButton from '@/components/icon-button';
import LIstText from '@/components/list-text';
const KnowledgeBaseCreate: React.FC = () => {
  const router = useRouter();

  const handlePreviousPage = () => {
    router.push('/knowledge-base');
  };

  const handleEditItem = () => {
    const itemId = 1;
    router.push(`${itemId}/edit`);
  };

  const handleDeleteItem = () => {
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
        <span className="text-gray-400">Knowledge/</span>
        <span className="text-blue-600">View knowledge base</span>
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
        <div className="flex justify-between items-center">
          <div className="title">
            <h1 className="text-2xl font-semibold leading-normal mb-1">
              What services do your Restaurant offer?
            </h1>
            <span className="bg-slate-200 text-gray-600 text-xs leading-normal font-medium p-1.5 rounded-sm">
              By Elvis Anthony, May 12, 2024
            </span>
          </div>
          <div className="flex gap-1">
            <IconButton
              onClick={handleEditItem}
              tooltip="Create source"
              icon={<BiEditAlt className="w-4 h-4 text-indigo-600" />}
              className="text-indigo-600 flex gap-1 justify-center items-center p-2.5 font-medium w-20"
              color=''
            >
              <span className="text-xs leading-normal font-medium">Edit</span>
            </IconButton>
            <IconButton
              onClick={handleDeleteItem}
              tooltip="Create source"
              icon={<RiDeleteBin6Line className="w-4 h-4 text-rose-600" />}
              className="text-rose-600 bg-rose-50 flex gap-1 justify-center items-center p-2.5 font-medium w-20"
              color=''
            >
              <span className="text-xs leading-normal font-medium">Delete</span>
            </IconButton>
          </div>
        </div>
        <div className="text-xs leading-5 text-gray-600">
          <p className="mb-4">
            We offer a range of services to provide customers with a satisfying dining experience.
            These services can include:
          </p>
          {services.map((service, index) => (
            <LIstText key={index} title={service.title} details={service.details} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default KnowledgeBaseCreate;
