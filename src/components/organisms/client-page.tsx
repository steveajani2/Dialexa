'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Router, { withRouter } from 'next/router'
import React, { useState,useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa';

import IconButton from '../icon-button';
import { RiArrowDropDownLine } from "react-icons/ri";
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

interface ClientItemProps {
  id?: number;
  name: string;
  phoneNumber: string;
  address: string;
  email: string;
  createdDate: string;
}


interface DropdownProps {
  options: string[];
  handleSelect: (option: string, index: number) => void;
  index : number
}




const ClientPageComponent: React.FC<{ clientItems: ClientItemProps[] }> = ({ clientItems }) => {
  const ITEMS_PER_PAGE = 15;
  // const [activedCategory, setActivedCategory] = useState('');
  const [filteredItems, setFilteredItems] = useState(clientItems);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(Math.ceil(clientItems.length / ITEMS_PER_PAGE));
   const router = useRouter();


  const [dropdownOpen, setDropdownOpen] = useState<boolean[]>(
    new Array(clientItems.length).fill(false)
  );

  const handleDropdownClick = (index: number) => {
    const newDropdownOpen = [...dropdownOpen];

    newDropdownOpen.forEach(
      (_, idx) => (newDropdownOpen[idx] = idx === index ? !newDropdownOpen[idx] : false)
    );
    setDropdownOpen(newDropdownOpen);
   //toast.error('Please ensure you select at least one knowledgebase', index);
    // if(index === 1) {
    //   router.push('/knowledge-base/create');
    // }
   
  };
  //const options = ['English', 'French', 'Igbo'];
  const [isMobile, setIsMobile] = useState(true);
  const options = ["View Details", "Edit Client", "Delete Client"];
  const checkedItemList: string[] = ["item1", "item2"];
const handleSelect = (option: string, index : number) => {
  
  if ( option === 'View Details'){
  const queryString = filteredItems.join(',');
  router.push(`/client/clientprofile`);
  // Router.push({
  //   pathname:`/client/clientprofile`,
  //   query: { data: JSON.stringify(filteredItems[index]) }
  // })
}
  // toast.error('Please ', error);

};
  // const [isOpen, setIsOpen] = useState(false);
  // const [selectedOption, setSelectedOption] = useState<string>(options[0]);
  // const handleSelect = (option: string) => {
  //   setSelectedOption(option);
  //   setIsOpen(false);
  //   //onSelect(option);
  // };


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    handleResize(); 

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const filtered = clientItems;

    setFilteredItems(filtered);
    setCurrentPage(1);
    setPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
  }, [clientItems /*, activedCategory*/]);

  const handleGoPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleGoNextPage = () => {
    if (currentPage < pages) setCurrentPage(currentPage + 1);
  };

  const Dropdown: React.FC<DropdownProps> = ({ options, handleSelect, index }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="relative inline-block text-left">
        <div className="max-md:w-full max-md:mt-2 flex justify-end w-full">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-white p-2 rounded-md shadow hover:bg-gray-200 transition-all"
          >
            <HiOutlineDotsHorizontal className="w-4 h-4 text-gray-400" />
          </button>
        </div>
  
        {isOpen && (
          <div
            className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
            style={{width : 130, marginLeft: -60}}
          >
            <div className="py-1" role="none">
              {options.map((option, idx) => (
                <button
                  key={idx}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                  role="menuitem"
                  onClick={() => {
                    handleSelect(option,index);
                    setIsOpen(false);
                  }}
                  style={{color : option === "Delete Client" ? "red" : "" }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-1">
    <div className="flex flex-1 flex-col gap-4 px-3.5 py-[15px] bg-white rounded-lg">
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
     
            
             <button  //onClick={handleFilter} 
             className="flex flex-col justify-center items-start p-2.5 bg-white rounded-lg border border-solid border-zinc-200 max-md:pr-5">
               <div className="flex gap-1">
               <span>Filter</span>
                 <RiArrowDropDownLine width={20} className="w-4 h-4" />
                
               </div>
             </button>
           </div>
        <IconButton
         onClick={() => {}}
         tooltip="Import Client"
          icon={<FaPlus className="w-5 h-5 text-white" />}
         // className="bg-violet-800 text-white flex gap-1 justify-center p-2.5 font-medium rounded-lg"
         className="flex gap-1 justify-center p-2.5 font-medium text-white rounded-lg max-md:px-5 bg-violet-800"
          color=''
        >
          <span className="my-auto">Import Client</span>
        </IconButton>
      </header>
      {isMobile ? 
     <div className="space-y-4">
     {filteredItems
       .slice(ITEMS_PER_PAGE * (currentPage - 1), ITEMS_PER_PAGE * currentPage)
       .map((item, idx) => (
         <div
           key={idx}
           className="w-full bg-white rounded-lg flex justify-between items-center border border-gray-200 p-4"
         >
           <div className="flex flex-col justify-between w-1/2 space-y-2">
             <div className="checkbox flex items-center gap-2.5">
               <input
                 type="checkbox"
                 className="form-checkbox w-4 h-4 text-blue-600"
               />
               <span className="font-semibold text-sm">{item.name}</span>
             </div>
             <div className="checkbox flex items-center gap-2.5">
               <span className="text-sm text-blue-600 ml-5">{item.phoneNumber}</span>
             </div>
           </div>
 
           <div className="flex flex-col justify-between w-1/2 space-y-2">
             <div className="checkbox flex items-center gap-2.5">
               <span className="text-sm text-gray-500 ml-2.5">{item.address}</span>
             </div>
             <div className="checkbox flex items-center gap-2.5">
               <span className="text-sm text-gray-500 ml-2.5">{item.createdDate}</span>
             </div>
           </div>
 
           <Dropdown options={options} handleSelect={handleSelect} index={idx}/>
         </div>
       ))}
   </div>
    
      : 
      
      <div className="w-full max-h-[680px] overflow-auto">
        <table className="min-w-full text-xs text-left border-spacing-2">
          <thead>
            <tr className="h-9 px-4 bg-slate-100 font-medium text-gray-400">
              <td>
                <input type="checkbox" />
              </td>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Email</th>
              <th>Date Created</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems
              .slice(ITEMS_PER_PAGE * (currentPage - 1), ITEMS_PER_PAGE * currentPage)
              .map((item, idx) => (
                <tr key={idx} className="h-[50px] py-[7px] px-4 cursor-pointer hover:bg-gray-100">
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td className="text-gray-600 font-semibold">{item.name}</td>
                  <td className="text-indigo-600">{item.phoneNumber}</td>
                  <td className="text-gray-600">{item.address}</td>
                  <td className="text-gray-400">{item.email}</td>
                  <td className="text-gray-400 font-medium">{item.createdDate}</td>
                  <td>
                  <Dropdown options={options} handleSelect={handleSelect} index={idx} />
                    {/* <button
                      onFocus={() => handleDropdownClick(idx)}
                      onBlur={() => handleDropdownClick(idx)}
                      className="relative"
                    >
                      <Image src="/assets/icon-more-alt.svg" alt="" width={20} height={20} />
                      <div
                        className={`${
                          dropdownOpen[idx] ? 'block' : 'hidden'
                        } w-[130px] h-[156px] px-2 py-2.5 bg-white rounded-lg shadow flex-col justify-center items-start gap-2.5 inline-flex text-gray-600 text-xs font-medium leading-10 text-left absolute ${
                          idx < 11 ? '-left-10' : '-left-10 -top-40'
                        } z-10`}
                      >
                        <div className="w-full px-2 hover:bg-gray-100 rounded-md">View Details</div>
                        <div className="w-full px-2 hover:bg-gray-100 rounded-md">Edit Client</div>
                        <div className="w-full px-2 hover:bg-gray-100 rounded-md text-rose-600">
                          Delete Client
                        </div>
                      </div>
                    </button> */}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      
      
      </div>}
     
    </div>
    <div className="flex justify-between">
      <div className="text-gray-600 text-xs">
        {`Showing ${ITEMS_PER_PAGE * (currentPage - 1) + 1} to ${
          currentPage === pages ? filteredItems.length : ITEMS_PER_PAGE * currentPage
        } of ${filteredItems.length} results`}
      </div>
      <div className="w-[66px] h-6 justify-start items-start gap-[18px] inline-flex">
        <button
          className="w-6 h-6 origin-top-left bg-white rounded justify-center items-center gap-2.5 flex hover:bg-gray-200 transition-all"
          onClick={handleGoPrevPage}
        >
          <Image src="/assets/icon-arrow-left.svg" alt="" width={16} height={16} />
        </button>
        <button
          className="w-6 h-6 bg-white rounded justify-center items-center gap-2.5 flex hover:bg-gray-200 transition-all"
          onClick={handleGoNextPage}
        >
          <Image src="/assets/icon-arrow-right.svg" alt="" width={16} height={16} />
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default ClientPageComponent;
