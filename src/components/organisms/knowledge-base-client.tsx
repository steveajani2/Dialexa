'use client';

import { useRouter } from 'next/navigation';
import React, { useState,useEffect,useContext } from 'react';
import toast from 'react-hot-toast';
import { FaPlus, FaFilter, FaCog, FaChevronLeft, FaChevronRight,FaSearch,FaDropbox } from 'react-icons/fa';
import { RiArrowDropDownLine } from "react-icons/ri";
import Image from 'next/image';
import IconButton from '@/components/icon-button';
import KnowledgeListItem from '@/components/knowledge-base-list-item';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { NearContext } from '../../wallets/near'


interface InitialKnowledgeItemProps {
  id: number;
  title: string;
  created_at: string;
  language: string;
  availability: boolean;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const KnowledgeBaseClient: React.FC<{ initialKnowledgeItems2: InitialKnowledgeItemProps[], userId : string }> = ({
  initialKnowledgeItems2,userId
}) => {
  const router = useRouter();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [hasagent, sethasagent] = useState(false);
  const [knowledgeItems, setKnowledgeItems] = useState<any []>([]);
  const [checkedItemList, setCheckedItemList] = useState<number[]>([]); 
  const supabase = createClientComponentClient();

  const { signedAccountId, wallet } = useContext(NearContext);

  const totalPages = Math.ceil(knowledgeItems?.length / itemsPerPage);

  const handleCreateSource = () => {
    if(hasagent){
      router.push('/knowledge-base/create');
    }else{
      toast.error('Please ensure you created atleast 1 agent');
    }

  };

  useEffect(() => {
 
    if (signedAccountId) {
      const handleResize = async () => {
        const { data: items } = await supabase

        .from('knowledge_base')
        .select('id, title, description, created_at, language, availability',)
        .eq('user_id',userId)
        .eq('wallet_id', signedAccountId)

        const { data: items2 } = await supabase
        .from('ai_agents')
        .select('id, name, phone_number, created_at, language, voice, status')
        .eq('user_id', userId)
        .eq('wallet_id', signedAccountId)

        if(items2?.length === 0){
          sethasagent(false)
        }else{
          sethasagent(true)
        }
  
        setKnowledgeItems(items?.length > 0 ? items : [] )
      // console.log(knowledgeItems)
      }
      handleResize()
    }else {
      const handleResize = async () => {
        const { data: items } = await supabase
        .from('knowledge_base')
        .select('id, title, description, created_at, language, availability',)
        .eq('user_id',userId)

        const { data: items2 } = await supabase
      .from('ai_agents')
      .select('id, name, phone_number, created_at, language, voice, status')
      .eq('user_id', userId)

      if(items2?.length === 0){
        sethasagent(false)
      }else{
        sethasagent(true)
      }
        setKnowledgeItems(items?.length > 0 ? items : [] )
       
      }
      handleResize()
    }
 
  }, [])

  const handleManageSource = () => {
    if (!checkedItemList.length) {
      toast.error('Please ensure you select at least one knowledgebase');
    } else {
      router.push(`/knowledge-base/${checkedItemList[0]}`);
    }
  };

  const handleFilters = () => {
    toast.error('I never do this one yet');
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const handleStatusChange = (index: number) => {
    const newItems = [...knowledgeItems];
    newItems[index].availability = !newItems[index].availability;
    setKnowledgeItems(newItems);
  };

  const handleCheckboxChange = (itemId: number, isChecked: boolean) => {
    if (isChecked) {
      setCheckedItemList((prevList) => [...prevList, itemId]); // Add item to checkedItemList if checked
    } else {
      setCheckedItemList((prevList) => prevList.filter((id) => id !== itemId)); // Remove item from checkedItemList if unchecked
    }
    // Handle the checked status update as needed
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = knowledgeItems.slice(startIndex, startIndex + itemsPerPage);
  const [isMobile, setIsMobile] = useState(true);
  // console.log(knowledgeItems)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // You can adjust the threshold value
     
    };

    handleResize(); // Call initially to set the state based on the initial screen size

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col grow shrink-0 basis-0 w-full max-md:max-w-full md:h-calc-100vh-120">
      <nav className="flex gap-0 self-start py-5 text-xs whitespace-nowrap">
        <span className="text-gray-400">Knowledge/</span>
        <span className="text-blue-600">List</span>
      </nav>
      <section className="flex flex-col grow text-xs rounded-lg max-md:max-w-full">
       
       
           {currentItems.length > 0 ?
           <>
           <header className="flex gap-5 justify-between px-5 py-4 w-full bg-white text-sm max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
           <IconButton
             onClick={handleCreateSource}
             tooltip="Create source"
             icon={<FaPlus className="w-5 h-5 text-white" />}
             className=" text-white flex gap-1 justify-center p-2.5 font-medium rounded-lg"
             color='#00A45F'
           >
             <span className="my-auto">Create source</span>
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
     
            
             <button  onClick={handleFilters} className="flex flex-col justify-center items-start p-2.5 bg-white rounded-lg border border-solid border-zinc-200 max-md:pr-5">
               <div className="flex gap-1">
               <span>Filter</span>
                 <RiArrowDropDownLine width={20} className="w-4 h-4" />
                
               </div>
             </button>
           </div>
           <IconButton
             onClick={handleManageSource}
             tooltip="Manage source"
             icon={<FaCog className="w-4 h-4 text-blue-600" />}
             className="flex gap-1 justify-center p-2.5 font-medium text-blue-600 rounded-lg max-md:px-5"
             color=''
           >
             <span className="underline">Manage source</span>
           </IconButton>
         </header> 
         <article className="w-full grow overflow-x-auto">
          {isMobile ? 
          <>
           <div style={{borderRadius:0}} className="flex flex-col flex-1 items-start px-7 py-3 bg-white rounded-lg max-md:px-5">
           {currentItems.map((item, index) => (
             <KnowledgeListItem
               key={index}
               {...item}
               onStatusChange={() => handleStatusChange(startIndex + index)}
               onCheckboxChange={handleCheckboxChange}
             />
           ))}
          
          </div> 
          
          </> :  
          <>
          <div className="flex gap-[70px] justify-start items-center px-1.5 py-1 font-medium text-gray-400 bg-slate-100 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
             <span className="flex-grow p-2.5">Source Title</span>
             <span className="w-[12.5%]">description</span>
             <span className="w-[12.5%]">Availability</span>
             <span className="w-[12.5%]">Last edited</span>
             <span className="w-[8%]">Status</span>
           </div>
           {currentItems.map((item, index) => (
             <KnowledgeListItem
               key={index}
               {...item}
               onStatusChange={() => handleStatusChange(startIndex + index)}
               onCheckboxChange={handleCheckboxChange}
               //checkedItemList={checkedItemList}
             />
           ))}
           </>
           }
          

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
   onClick={handleCreateSource}
   tooltip="Create source"
   icon={<FaPlus className="w-5 h-5 text-white" />}
   className=" text-white flex gap-1 justify-center p-2.5 font-medium rounded-lg"
   color='#00A45F'
 >
   <span className="my-auto">Create source</span>
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

  
   <button  onClick={handleFilters} className="flex flex-col justify-center items-start p-2.5 bg-white rounded-lg border border-solid border-zinc-200 max-md:pr-5">
     <div className="flex gap-1">
     <span>Filter</span>
       <RiArrowDropDownLine width={20} className="w-4 h-4" />
      
     </div>
   </button>
 </div>
 <IconButton
   onClick={handleManageSource}
   tooltip="Manage source"
   icon={<FaCog className="w-4 h-4 text-blue-600" />}
   className="flex gap-1 justify-center p-2.5 font-medium text-blue-600 rounded-lg max-md:px-5"
   color=''
 >
   <span className="underline">Manage source</span>
 </IconButton>
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
               You have not create any knowledge file for your AI agent yet.
             </h2>
             <IconButton
   onClick={handleCreateSource}
   tooltip="Create source"
   icon={<FaPlus className="w-5 h-5 text-white" />}
   className=" text-white flex gap-1 justify-center p-2.5 font-medium rounded-lg"
   color='#00A45F'
 >
   <span className="my-auto">Create source</span>
 </IconButton>
             
         </div>
        
       </div>
          }     
                
                
        <div className="flex gap-5 justify-between mt-6 w-full max-md:flex-wrap max-md:max-w-full">
          <div className="my-auto text-xs tracking-tight text-gray-600">
            Showing {startIndex + 1} to {startIndex + currentItems.length} of{' '}
            {knowledgeItems?.length} results
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

export default KnowledgeBaseClient;
