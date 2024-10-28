'use client';

import { format } from 'date-fns';
import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
interface KnowledgeListItemProps {
  id: number;
  title: string;
  created_at: string;
  description: string;
  availability: string;
  onStatusChange: () => void;
  onCheckboxChange: (id: number, isClicked: boolean) => void;
  //checkedItemList : number[];
}

const KnowledgeListItem: React.FC<KnowledgeListItemProps> = ({

  id,
  title,
  created_at,
  description,
  availability,
  onStatusChange,
  onCheckboxChange,
  //checkedItemList,
  
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    onCheckboxChange(id, isChecked); // Call the callback function with the item's ID and its new checked status
  };
console.log(availability)
  const [isMobile, setIsMobile] = useState(true);
  const [isdropdown, setisdropdown] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // You can adjust the threshold value
     
    };

    handleResize(); // Call initially to set the state based on the initial screen size

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const router = useRouter();
  
  return (
<>
    {isMobile ? <>
      <div 
    
                      style={{
                        width: '100%',
                        //boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                        backgroundColor: 'white',
                        borderRadius: 12,
                        display: 'flex',
                        //alignItems: 'center',
                        justifyContent: 'start',
                        flexDirection: 'column',
                        borderColor: "#D8D8E2", borderWidth: 1 ,
                      marginTop: 20
                      }}
                     // key={index}
                    >
<button
  onClick={ () => {setisdropdown(!isdropdown)}}
  style={{ borderRadius: 10, width: "100%", height: 75, display: "flex", justifyContent: "start", alignItems: "center", paddingRight: '10px' }} // Added paddingRight
>
  <div className="checkbox flex-grow gap-2.5 p-2.5 flex items-center">
    <input
      type="checkbox"
      className="form-checkbox w-4 h-4 text-blue-600"
      onChange={handleChange}
    />
    <span className="font-semibold">{title}</span>
  </div>
  <label className="items-center cursor-pointer" style={{ marginLeft: '5px' }}> 
    <div className="relative">
      <input
        type="checkbox"
        checked={availability === 'true'}
        onChange={onStatusChange}
        className="sr-only"
      />
      <div
        className={`block w-10 h-4 rounded-full ${availability === 'true' ? 'bg-green-500' : 'bg-gray-400'}`}
      ></div>
      <div
        className={`absolute -top-0.5 w-5 h-5 bg-gray-100 rounded-full transition ${
          availability === 'true' ? 'transform translate-x-full' : ''
        }`}
      ></div>
    </div>
  </label>
</button>

{isdropdown && (                     <div style={{ borderRadius: 5, height: 175, width: "100%", backgroundColor: "#1D4CF61A", display: 'flex', justifyContent: "start", flexDirection: "column", alignItems: 'center', padding: '20px 0', boxShadow: '0 -10px 10px -5px rgba(0,0,0,0.1)', marginTop: 10 }}>
  <div style={{ display: 'flex', flexDirection: "column", gap: 10 }}>
    <div style={{ display: 'flex', gap: 155, alignItems: 'center' }}>
      <h3 className="my-auto text-base font-xs leading-4" style={{ fontSize: 13, color: '#8F94A8', marginLeft: 30 }}>
        Language:
      </h3>
      <h3 className="my-auto text-base font-xs leading-4" style={{ fontSize: 13, color: 'black' }}>
        English
      </h3>
    </div>
    <div style={{ display: 'flex', gap: 150, alignItems: 'center' }}>
      <h3 className="my-auto text-base font-xs leading-4" style={{ fontSize: 13, color: '#8F94A8', marginLeft: 30 }}>
        Availability:
      </h3>
      <h3 className="my-auto text-base font-xs leading-4" style={{ fontSize: 13, color: 'black' }}>
        {availability ? 'Public' : 'Private'}
      </h3>
    </div>
    <div style={{ display: 'flex', gap: 115, alignItems: 'center' }}>
      <h3 className="my-auto text-base font-xs leading-4" style={{ fontSize: 13, color: '#8F94A8', marginLeft: 30 }}>
        Last edited:
      </h3>
      <h3 className="my-auto text-base font-xs leading-4" style={{ fontSize: 13, color: '#8F94A8' }}>
       {format(created_at, 'yyyy-MM-dd')}
      </h3>
    </div>
  </div>
  <button
  // router.push(`/knowledge-base/${checkedItemList[0]}`);
  //onClick={() => {router.push(`/knowledge-base/${checkedItemList[0]}`)}}
    style={{
      display: 'flex',
      flexDirection: 'row',
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      padding: '8px',
      borderRadius: 8,
      marginTop: 30,
      width: "40%",
      backgroundColor: 'rgba(37, 99, 235, 0.1)',
      alignSelf: "center"
    }}
    className="justify-center self-stretch p-2.5 my-auto text-sm font-medium text-blue-600 rounded-lg bg-blue-600 bg-opacity-10"
  >
    <p className="my-auto text-base font-xs leading-4" style={{ fontSize: 12 }}>
      View details
    </p>
  </button>
</div>
)}


                    </div>
    </> : <div className="flex gap-[70px] justify-start items-center px-1.5 py-1 bg-white border-b border-gray-200 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
    <div className="checkbox flex-grow gap-2.5 p-2.5 flex items-center">
      <input
        type="checkbox"
        className="form-checkbox w-4 h-4 text-blue-600"
        onChange={handleChange}
      />
      <span className="font-semibold">{title}</span>
    </div>
    <span className="w-[12.5%]">{description}</span>
    <span className="w-[12.5%]">{availability === 'true' ? 'Public' : 'Private'}</span>
    <span className="w-[12.5%]">{format(created_at, 'yyyy-MM-dd')}</span>
    <label className="w-[8%] items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          checked={availability === 'true'}
          onChange={onStatusChange}
          className="sr-only"
        />
        <div
          className={`block w-10 h-4 rounded-full ${availability === 'true' ? 'bg-green-500 ' : 'bg-gray-400'}`}
        ></div>
        <div
          className={`absolute -top-0.5 w-5 h-5 bg-gray-100 rounded-full transition ${
            availability === 'true' ? 'transform translate-x-full' : ''
          }`}
        ></div>
      </div>
    </label>
  </div>}

  </>
  );
};

export default KnowledgeListItem;
