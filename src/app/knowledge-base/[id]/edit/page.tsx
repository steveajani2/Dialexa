'use client';

import React, { useState } from 'react';
import { CiCircleInfo } from 'react-icons/ci';
import { useDropzone } from 'react-dropzone';

const KnowledgeBaseEdit: React.FC = () => {
  const [availability, setAvailability] = useState(false);

  const onAvailablityChange = () => {
    setAvailability(!availability);
  };

  return (
    <div className="flex flex-col grow w-full max-md:max-w-full md:h-calc-100vh-120">
       <nav className="flex gap-0 self-start py-5 text-xs whitespace-nowrap">
        <span className="text-gray-400">Knowledge/</span>
        <span className="text-blue-600">Create source</span>
      </nav>
      <section className="flex flex-col justify-center items-center px-5 py-8 bg-white rounded-lg max-md:max-w-full md:px-20">
  <header className="flex gap-2 flex-wrap md:flex-nowrap w-full max-w-2xl">
    <div className="mt-1">
      <CiCircleInfo className="w-4 h-4 text-gray-600" />
    </div>
    <div className="flex flex-col justify-center">
      <h2 className="text-2xl leading-normal font-semibold text-slate-800">
        Define an Action for your AI Agent
      </h2>
      <p className="mt-2 text-sm font-medium text-gray-400">
        Tell your AI Agent what this action is for and when to use it.
      </p>
    </div>
  </header>
  <form className="flex flex-col w-full max-w-2xl" //onSubmit={handleSubmit(saveSource)}
  >
    <label
      htmlFor="sourceTitle"
      className="mt-8 text-sm font-bold text-gray-400"
    >
      <span className="text-slate-800">Source Title</span>
      <span className="text-gray-400"> (The potential question being asked your AI Agent)</span>
    </label>
    <input
      type="text"
      id="sourceTitle"
      className="justify-center items-start p-2.5 mt-1 w-full text-xs font-medium bg-white rounded-lg border"
      placeholder="Restaurant Location"
      aria-label="Source Title"
      // {...register('title')}
    />
    {/* {errors.title && <span className="text-red-600">{errors.title.message}</span>} */}
    <label
      htmlFor="description"
      className="mt-4 text-sm font-bold text-gray-400"
    >
      <span className="text-slate-800">Description</span>
      <span className="text-gray-400"> (The response provided by your AI Agent)</span>
    </label>
    <textarea
      id="description"
      className="justify-center items-start p-2.5 mt-1 w-full text-xs font-medium bg-white rounded-lg border"
      placeholder="Enter response description here"
      aria-label="Description"
      // {...register('description')}
    ></textarea>
    {/* {errors.description && <span className="text-red-600">{errors.description.message}</span>} */}
    <label className="mt-4 text-sm font-bold text-slate-800">
      Availability
    </label>
    <div className="flex gap-1 justify-between items-center px-4 py-2 mt-1 w-full text-sm rounded-lg bg-slate-100 flex-wrap">
      <div className="w-full md:w-auto">
        <span className="font-bold text-slate-800">Everyone</span>
        <br />
        <span className="text-gray-400"> (Make this open for all channels used in contacting your AI Agent)</span>
      </div>
     
       <label className="items-center cursor-pointer" style={{ marginLeft: '5px' }}> {/* Reduced margin */}
    <div className="relative">
      <input
        type="checkbox"
        checked={availability}
        // onChange={onAvailabilityChange}
        className="sr-only"
      />
      <div
        className={`block w-10 h-4 rounded-full ${availability ? 'bg-green-500' : 'bg-gray-400'}`}
      ></div>
      <div
        className={`absolute -top-0.5 w-5 h-5 bg-gray-100 rounded-full transition ${
          availability ? 'transform translate-x-full' : ''
        }`}
      ></div>
    </div>
  </label>
    </div>
    <div className="flex gap-4 self-start mt-7 text-sm font-medium flex-wrap">
      <button
        type="submit"
        className="justify-center p-2.5 text-white bg-violet-800 rounded-lg"
        style={{backgroundColor: "#00A45F"}}
      >
        Save Response
      </button>
      <a
        type="button"
        className="justify-center p-2.5 text-gray-600 whitespace-nowrap rounded-lg bg-slate-100"
        // onClick={() => {
        //   router.push('/knowledge-base');
        // }}
      >
        Cancel
      </a>
    </div>
  </form>
</section>


    </div>
  );
};

export default KnowledgeBaseEdit;
