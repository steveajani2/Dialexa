'use client';

import { useRouter } from 'next/navigation';
import React, { useState,useEffect ,useContext} from 'react';
import { FaPlus, FaFilter, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { RiArrowDropDownLine } from "react-icons/ri";
import AgentListItem from '../agent-list-item';
import IconButton from '../icon-button';
import Image from 'next/image';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { NearContext } from '../../wallets/near'
interface InitialAgentsProps {
  id: number;
  name: string;
  phone_number: string;
  language: string;
  voice: string;
  created_at: string;
  status: boolean;
}
const Agents: React.FC<{ initialAgentsItems2: InitialAgentsProps[], userId : string }> = ({ initialAgentsItems2, userId }) => {
  const router = useRouter();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [initialAgentsItems, setinitialAgentsItems] = useState<any[]>([]);
// console.log(initialAgentsItems)
const supabase = createClientComponentClient();

const { signedAccountId, wallet } = useContext(NearContext);



  useEffect(() => {
 
    if (signedAccountId) {
      const handleResize = async () => {
        const { data: items } = await supabase
        .from('ai_agents')
        .select('id, name, phone_number, created_at, language, voice, status')
        .eq('user_id',userId)
        .eq('wallet_id', signedAccountId)
        setinitialAgentsItems(items?.length > 0 ? items : [] )
      //  console.log(items)
      }
      handleResize()
    }else {
      const handleResize = async () => {
        const { data: items } = await supabase
        .from('ai_agents')
        .select('id, name, phone_number, created_at, language, voice, status')
        .eq('user_id',userId)
        setinitialAgentsItems(items?.length > 0 ? items: [] )
       
      }
      handleResize()
    }
 
  }, [])

  const totalPages = Math.ceil(initialAgentsItems?.length / itemsPerPage);

  const handleCreateAgent = () => {
    router.push('/agents/create');
  };

  const handleFilter = () => {
    alert('Filter clicked');
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // You can adjust the threshold value
     
    };

    handleResize(); // Call initially to set the state based on the initial screen size

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = initialAgentsItems.slice(startIndex, startIndex + itemsPerPage);
// console.log(initialAgentsItems)
  return (
    <div className="flex flex-col grow shrink-0 basis-0 w-full max-md:max-w-full md:h-calc-100vh-120">
    <nav className="flex gap-0 self-start py-5 text-xs whitespace-nowrap">
      <span className="text-gray-400">Ai Agents/</span>
      <span className="text-blue-600">List</span>
    </nav>
    <section className="flex flex-col grow text-xs rounded-lg max-md:max-w-full">
    {currentItems.length > 0 ? 
    
    <>
    
     <header className="flex gap-5 justify-between px-5 py-4 w-full bg-white text-sm max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
        
        <div className="flex gap-3 text-xs text-gray-600">
           <div className="flex flex-col justify-center items-start p-2.5 bg-white rounded-lg border border-solid border-zinc-200 max-md:pr-5">
           <div className="flex gap-3">
        
         <Image
                       loading="lazy"
                       src="/assets/search.svg"
                       alt="arrow-down"
                       width={20}
                       height={20}
                      
                     />
         <input
           type="text"
           placeholder="Search by title"
           className="border-none outline-none"
         />
       </div>
     </div>
     
            
             <button  onClick={handleFilter} className="flex flex-col justify-center items-start p-2.5 bg-white rounded-lg border border-solid border-zinc-200 max-md:pr-5">
               <div className="flex gap-1">
               <span>Filter</span>
                 <RiArrowDropDownLine width={20} className="w-4 h-4" />
                
               </div>
             </button>
           </div>
        {/* <IconButton
          onClick={handleCreateAgent}
          tooltip="Create source"
          icon={<FaPlus className="w-5 h-5 text-white" />}
         // className="bg-violet-800 text-white flex gap-1 justify-center p-2.5 font-medium rounded-lg"
         className="flex gap-1 justify-center p-2.5 font-medium text-white rounded-lg max-md:px-5 bg-violet-800"
          color=''
        >
          <span className="my-auto">Create New Agent</span>
        </IconButton> */}
      </header>
      <article className="w-full grow overflow-x-auto">
       
      {isMobile ? 
          <>
           <div style={{borderRadius:0}} className="flex flex-col flex-1 items-start px-7 py-3 bg-white rounded-lg max-md:px-5">
           {currentItems.map((item, index) => (
          <AgentListItem key={index} {...item} />
        ))}
          
          </div> 
          
          </> :  
          <>
          <div className="flex gap-6 justify-start items-center px-1.5 py-1 font-medium text-gray-400 bg-slate-100 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
  <span className="flex-grow p-2.5">Agent name</span>
  <span className="w-[10%] max-md:w-full max-md:mt-2">Phone Number</span>
  <span className="w-[10%] max-md:w-full max-md:mt-2">Language</span>
  <span className="w-[10%] max-md:w-full max-md:mt-2">Voice</span>
  <span className="w-[10%] max-md:w-full max-md:mt-2">Date created</span>
  {/* <span className="w-[8%] max-md:w-full max-md:mt-2">Test call</span> */}
  <span className="w-[8%] max-md:w-full max-md:mt-2">Status</span>
  <span className="max-md:w-full max-md:mt-2">Action</span>
</div>
           {currentItems.map((item, index) => (
          <AgentListItem key={index} {...item} />
        ))}
           </>
           }
       
       
        {/* <div className="flex gap-[70px] justify-start items-center px-1.5 py-1 font-medium text-gray-400 bg-slate-100 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
          <span className="flex-grow p-2.5">Agent name</span>
          <span className="w-[10%]">Phone Number</span>
          <span className="w-[10%]">Language</span>
          <span className="w-[10%]">Voice</span>
          <span className="w-[10%]">Date created</span>
          <span className="w-[8%]">Test call</span>
          <span className="w-[8%]">Status</span>
          <span className="">Action</span>
        </div>
        {currentItems.map((item, index) => (
          <AgentListItem key={index} {...item} />
        ))} */}
      </article>
    
    </>
    
    : 
    
    <div
    className="flex flex-col flex-1 items-start px-7 py-3 bg-white rounded-lg max-md:px-5"
    style={{
      width: '100%',
     
      height: 400,
      backgroundColor: 'white',
      padding: 20,
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      borderRadius: 8
    }}
  >
      <header className="flex gap-5 justify-between px-5 py-4 w-full bg-white text-sm max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
<IconButton
onClick={handleCreateAgent}
tooltip="Create source"
icon={<FaPlus className="w-5 h-5 text-white" />}
className=" text-white flex gap-1 justify-center p-2.5 font-medium rounded-lg"
color='#00A45F'
>
<span className="my-auto">Create New Agent</span>
</IconButton>
<div className="flex gap-3 text-xs text-gray-600">
<div className="flex flex-col justify-center items-start p-2.5 bg-white rounded-lg border border-solid border-zinc-200 max-md:pr-5">
<div className="flex gap-3">

<Image
        loading="lazy"
        src="/assets/search.svg"
        alt="arrow-down"
        width={20}
        height={20}
       
      />
<input
type="text"
placeholder="Search by title"
className="border-none outline-none"
/>
</div>
</div>


<button   className="flex flex-col justify-center items-start p-2.5 bg-white rounded-lg border border-solid border-zinc-200 max-md:pr-5">
<div className="flex gap-1">
<span>Filter</span>
  <RiArrowDropDownLine width={20} className="w-4 h-4" />
 
</div>
</button>
</div>
        {/* <IconButton
        onClick={handleManageSource}
        tooltip="Manage source"
        icon={<FaCog className="w-4 h-4 text-blue-600" />}
        className="flex gap-1 justify-center p-2.5 font-medium text-blue-600 rounded-lg max-md:px-5"
        color=''
        >
        <span className="underline">Manage source</span>
        </IconButton> */}
</header> 



    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px',
        alignSelf: "center",
        alignContent: "center",
       marginTop: 130,
       gap: 20,
      // height:300
       
      }}
    >
   
      <Image
        loading="lazy"
        src="/assets/notes.svg"
        alt="arrow-down"
        width={96}
        height={96}
        //className="shrink-0 my-auto w-4 aspect-square"
        style={{  borderRadius:20, }}
      />
       <h2
          className="my-auto text-base font-xs leading-4"
          style={{ fontSize: 12, color: '#8F94A8', textAlign:"center", width: 250 }}
        >
          You have not created any  AI agent yet.
        </h2>
        <IconButton
onClick={handleCreateAgent}
tooltip="Create source"
icon={<FaPlus className="w-5 h-5 text-white" />}
className=" text-white flex gap-1 justify-center p-2.5 font-medium rounded-lg"
color='#00A45F'
>
<span className="my-auto">Create New Agent </span>
</IconButton>
        
    </div>
   
  </div>
    
    }
      

      <div className="flex gap-5 justify-between mt-6 w-full max-md:flex-wrap max-md:max-w-full">
        <div className="my-auto text-xs tracking-tight text-gray-600">
          Showing {startIndex + 1} to {startIndex + currentItems.length} of{' '}
          {initialAgentsItems.length} results
        </div>
        <div className="flex gap-5">
          <IconButton
            onClick={handlePreviousPage}
            tooltip="Previous page"
            icon={<FaChevronLeft className="w-4 h-4 text-gray-600" />}
            className="flex justify-center items-center px-1 w-6 h-6 bg-white rounded"
            color=''
          />
          <IconButton
            onClick={handleNextPage}
            tooltip="Next page"
            icon={<FaChevronRight className="w-4 h-4 text-gray-600" />}
            className="flex justify-center items-center px-1 w-6 h-6 bg-white rounded"
            color=''
          />
        </div>
      </div>
    </section>
  </div>
  
  );
};

export default Agents;
