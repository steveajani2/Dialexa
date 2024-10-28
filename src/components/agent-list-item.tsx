'use client';

import { format } from 'date-fns';
import React, { useState,useEffect } from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { IoCallOutline } from 'react-icons/io5';

import { cn } from '@/lib/utils';

import IconButton from './icon-button';

interface AgentListItemProps {
  id: number;
  name: string;
  phone_number: string;
  language: string;
  voice: string;
  created_at: string;
  status: boolean;
}

const AgentListItem: React.FC<AgentListItemProps> = ({
  id,
  name,
  phone_number,
  language,
  voice,
  created_at,
  status
}) => {
  const handleTestCall = () => {
    alert('handle Test Call' + id);
  };

  const [isMobile, setIsMobile] = useState(true);
  const [isdropdown, setisdropdown] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    handleResize(); 

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
<>
    {isMobile ? <>
      <div
  style={{
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: "#D8D8E2",
    borderWidth: 1,
    marginTop: 20
  }}
>
  <div
    style={{
      borderRadius: 10,
      height: 70,
      width: "45%",
      display: "flex",
      justifyContent: "flex-start",
      flexDirection: "column",
      marginLeft: 10
    }}
  >
    <div className="checkbox flex-grow gap-2.5 p-2.5 flex items-center">
      <input
        type="checkbox"
        className="form-checkbox w-4 h-4 text-blue-600"
      />
      <span className="font-semibold">{name}</span>
    </div>
    <div className="checkbox flex-grow gap-2.5 p-2.5 flex items-center">
     
      <span className="font-xs" style={{fontSize:12, color: "#415BE6", marginLeft:20}}>{phone_number}</span>
    </div>
  </div>

  <div
    style={{
      borderRadius: 10,
      height: 75,
      width: "40%",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      marginLeft: 20
    }}
  >
    <div className="checkbox flex-grow gap-2.5 p-2.5 flex items-center">
      
      <span className="font-semibold" style={{color : status ?  "#8F94A8" : "#EF2940", fontSize:12, marginLeft: 10}}> {status ? 'Active' : 'Inactive'}</span>
    </div>
    <div className="checkbox flex-grow gap-2.5 p-2.5 flex items-center">
      <span className="font-semibold" style={{color: "#8F94A8"}}>{format(created_at, 'yyyy-MM-dd')}</span>
    </div>
  </div>

  <div className="max-md:w-full max-md:mt-2" style={{ display: 'flex', justifyContent: 'flex-end', width: '30%' }}>
    <IconButton
      onClick={handleTestCall}
      tooltip="Create source"
      icon={<HiOutlineDotsHorizontal className="w-4 h-4 text-gray-400" />}
      color=''
    />
  </div>
</div>

    </> : <div className="flex gap-6 justify-start items-center px-1.5 py-1 bg-white border-b border-gray-200 max-md:flex-col max-md:px-5 max-md:max-w-full">
  <div className="checkbox flex-grow gap-2.5 p-2.5 flex items-center">
    <span className="font-semibold">{name}</span>
  </div>
  <span className="w-[10%] max-md:w-full max-md:mt-2">{phone_number}</span>
  <span className="w-[10%] max-md:w-full max-md:mt-2">{language}</span>
  <span className="w-[10%] max-md:w-full max-md:mt-2">{voice}</span>
  <span className="w-[10%] max-md:w-full max-md:mt-2">{format(created_at, 'yyyy-MM-dd')}</span>
  {/* <label className="w-[8%] items-center cursor-pointer max-md:w-full max-md:mt-2">
    <IconButton
      onClick={handleTestCall}
      tooltip="Create source"
      icon={<IoCallOutline className="w-4 h-4 text-white" />}
      className="bg-emerald-600 text-white flex gap-1 justify-center items-center px-3 py-1 font-medium w-[65px] max-md:w-full"
      color=''
    >
      <span className="text-xs leading-normal font-medium">Call</span>
    </IconButton>
  </label> */}
  <span className={cn('w-[8%] max-md:w-full max-md:mt-2', status ? ' text-indigo-600' : 'text-rose-600')}>
    {status ? 'Active' : 'Inactive'}
  </span>
  <div className="max-md:w-full max-md:mt-2">
    <IconButton
      //onClick={handleTestCall}
      tooltip="Create source"
      icon={<HiOutlineDotsHorizontal className="w-4 h-4 text-gray-400" />}
      color=''
    />
  </div>
</div>}


</>

   
  );
};

export default AgentListItem;
