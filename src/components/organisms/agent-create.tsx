'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import React, { useState ,useEffect,useContext} from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BsFillTelephonePlusFill } from 'react-icons/bs';
import { z } from 'zod';
import Image from 'next/image';
import { NearContext } from '../../wallets/near'
import { HelloNearContract } from '../../config';
import FullScreenLoader from '@/components/full-screen-loader';

import IconButton from '../icon-button';

const FormSchema = z.object({
  name: z.string().min(1),
  language: z.string(),
  voice: z.string(),
  phoneNumber: z.string(),
  prompt: z.string()
});

type FormData = z.infer<typeof FormSchema>;

interface AgentCreateProps {
  userId: string;
  itemlength : any;
}




const AgentCreate: React.FC<AgentCreateProps> = ({ userId, itemlength }) => {
  const router = useRouter();
  const CONTRACT = HelloNearContract;
  const supabase = createClientComponentClient();
  const options = ['English', 'French', 'Igbo'];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);

  const options2 = ['James voice', 'Terence voice', 'Ada voice'];

  const [isOpen2, setIsOpen2] = useState(false);
  const [selectedOption2, setSelectedOption2] = useState<string>(options[0])
  const [phoneNumber, setphoneNumber] = useState<string>("Generate Agent Number")
  const { signedAccountId, wallet } = useContext(NearContext);
  const [itemslength , setitemslength] = useState(0)
  const [isSub, setisSub] = useState(false)
  const [ isCase , setisCase] = useState('')
  const [isLoading, setisLoading] = useState(true)
  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    //onSelect(option);
  };

  const handleSelect2 = (option: string) => {
    setSelectedOption2(option);
    setIsOpen2(false);
    //onSelect(option);
  };


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      language: '',
      voice: '',
      phoneNumber: '',
      prompt: ''
    }
  });

  const saveAgent = async (formData: FormData) => {

    try {
      const { error } = await supabase.from('ai_agents').insert(
        {
          name: formData.name,
          language: "English", 
          voice: "Female voice",
          phone_number: phoneNumber,
          status : 'Active',
          user_id: userId,
          wallet_id : signedAccountId

        }
      );

      if (error) {
        console.error(error.message);
        throw error;
      }
      toast.success('new Agent Added');
      router.push('/agents');
      router.refresh();
    } catch (error: unknown) {
      console.error('Failed to add new Agent:', error);
      toast.error('Failed to add new Agent');
    }
  };

  const handleClaimNumber = () => {
    setphoneNumber("+16073054802")
  };


  const [isMobile, setIsMobile] = useState(true);



  useEffect(() => {
    const handleResize = async () => {
      const supabase = createClientComponentClient();
      const { data: items } = await supabase
      .from('ai_agents')
      .select('id, name, phone_number, created_at, language, voice, status')
      .eq('user_id', userId)
      .eq('wallet_id', signedAccountId)

      const { data: items2 } = await supabase
      .from('user_data')
      .select('id, first_name, last_name, created_at, email, user_id, wallet_id ')
      .eq('user_id', userId)
      .eq('wallet_id', signedAccountId)
      setitemslength(items?.length > 0 ? items?.length : 0)
      if (items2[0]?.first_name && items2[0]?.last_name){
        //const products = await wallet.viewMethod({ contractId: CONTRACT, method: 'getUser',  args: { Username: `${items?.first_name}${items?.last_name}` }});
        const products = await wallet.viewMethod({ contractId: CONTRACT, method: 'getUser',  args: { Username: `${items2[0]?.first_name}${items2[0]?.last_name}` }});
  
// console.log(products)
        if (!products){
          setisSub(false)
          setisCase('Ensure you Subscribe to a plan to be able to create agent')
        }else{
          setisSub(products.subscribed)
        // const products2 = await wallet.callMethod({ contractId: CONTRACT, method: 'createUser', args: { Firstname: items[0]?.first_name ,Lastname :items[0]?.last_name,Username : `${items[0]?.first_name}${items[0]?.last_name}`  } });
         if(products.subscribed && items?.length > 0){
            setisCase('You have reached the maximum of Ai agents for the Testnet version')
         }
         else{
          setisCase('Ensure you Subscribe to a plan to be able to create agent')
         }
        }

        // if (products.subscribed){
        //   setplan(products.plan)
        //   if (products.plan === 10 || products.plan === 12){
        //     setcplan("Basic")
        //   }else if(products.plan === 67){
        //     setcplan("Pro")
        //   }else if(products.plan === 150){
        //     setcplan("Premium")
        //   }
        // }
        // setisuser(true)
       

       
      }else{
        setisSub(false)
        setisCase('Ensure your profile has been completed to be able to create agent')
        
      }
      setisLoading(false)

    };
    const handleResize2 = async () => {
      const supabase = createClientComponentClient();
      const { data: items } = await supabase
      .from('ai_agents')
      .select('id, name, phone_number, created_at, language, voice, status')
      .eq('user_id', userId)
  
      setitemslength(items?.length > 0 ? items?.length : 0)
      setisSub(false)
      setisCase('Ensure your wallet is connected to proceed')
      setisLoading(false)
    };

    if(signedAccountId){
      handleResize()
    }else{
      handleResize2()
    }

   

    
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // You can adjust the threshold value
     
    };

    handleResize(); // Call initially to set the state based on the initial screen size

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const handleClaimNumber2 = () => {
    const options = {
      method: 'GET',
      headers: {Authorization: 'Bearer 8398609e-b62a-4a20-b508-a94a7b839c7f'}
    };
    
    fetch('https://api.vapi.ai/assistant/c7919cb8-8577-457e-9d45-a523388befde', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  };

  // const handleClaimNumber = async () => {
  //   const {
  //     data: { user }
  //   } = await supabase.auth.getUser();
  //   const { data: items } = await supabase
  //   .from('ai_agents')
  //   .select('id, name, phone_number, created_at, language, voice, status')
  //   .eq('customer_id', user?.user_metadata['sub']);
  // };

// console.log(itemslength)
  
// console.log(isSub)

  return (
    <div className="flex flex-col grow w-full max-md:max-w-full md:h-calc-100vh-120">
      {isSubmitting && <FullScreenLoader />}
      {isLoading && <FullScreenLoader />}
      <nav className="flex gap-0 self-start py-5 text-xs whitespace-nowrap">
        <span style={{fontFamily: "Work Sans"}} className="text-gray-400">Ai Agents/</span>
        <span style={{fontFamily: "Work Sans"}} className="text-blue-600">New Agent</span>
      </nav>
      {itemslength > 0 && !isSub && (
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
            style={{ fontSize: 20, color: '#8F94A8', textAlign:"center", width: 320, lineHeight: 1.9 }}
          >
            {isCase}
          </h2>
          {/* <IconButton
  onClick={handleCreateAgent}
  tooltip="Create source"
  icon={<FaPlus className="w-5 h-5 text-white" />}
  className=" text-white flex gap-1 justify-center p-2.5 font-medium rounded-lg"
  color='#00A45F'
  >
  <span className="my-auto">Create New Agent </span>
  </IconButton> */}
          
      </div>
     
    </div> )}
  
    {itemslength <= 0 && !isSub && (
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
            style={{ fontSize: 20, color: '#8F94A8', textAlign:"center", width: 320, lineHeight: 1.9 }}
          >
            {isCase}
          </h2>
          {/* <IconButton
  onClick={handleCreateAgent}
  tooltip="Create source"
  icon={<FaPlus className="w-5 h-5 text-white" />}
  className=" text-white flex gap-1 justify-center p-2.5 font-medium rounded-lg"
  color='#00A45F'
  >
  <span className="my-auto">Create New Agent </span>
  </IconButton> */}
          
      </div>
     
    </div> )}

    {itemslength > 0 && isSub && (
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
            style={{ fontSize: 20, color: '#8F94A8', textAlign:"center", width: 320, lineHeight: 1.9 }}
          >
            {isCase}
          </h2>
          {/* <IconButton
  onClick={handleCreateAgent}
  tooltip="Create source"
  icon={<FaPlus className="w-5 h-5 text-white" />}
  className=" text-white flex gap-1 justify-center p-2.5 font-medium rounded-lg"
  color='#00A45F'
  >
  <span className="my-auto">Create New Agent </span>
  </IconButton> */}
          
      </div>
     
    </div> )}

  
    {
   
   itemslength <= 0 && isSub && 
   
   <section className="flex flex-col justify-center items-center px-5 md:px-20 py-8 bg-white rounded-lg w-full">
     <div className="flex flex-col w-full ">
       <header className="flex flex-col md:flex-row gap-2 md:items-center w-full">
         <div className="flex flex-col justify-center">
           <h2 style={{fontFamily: "Work Sans"}} className="text-2xl leading-normal font-semibold text-slate-800">
             Create AI Agent
           </h2>
           <p  style={{fontFamily: "Work Sans"}}className="mt-2 text-sm font-medium text-gray-400">
             Customize your AI agent to suit your needs.
           </p>
         </div>
       </header>
       <form className="flex flex-col w-full mt-4" onSubmit={handleSubmit(saveAgent)}>
         <label htmlFor="agentName" className="mt-8 text-sm font-bold text-gray-400 w-full">
           <span style={{fontFamily: "Work Sans"}} className="text-slate-800">Agent Name</span>
           <span style={{fontFamily: "Work Sans", fontWeight: 350}} className="text-gray-400" > (What would you like to call your agent?)</span>
         </label>
         <input
           type="text"
           id="agentName"
           className="p-2.5 mt-1 w-full text-xs font-medium bg-white rounded-lg border"
           placeholder="Agent Name"
           aria-label="Agent Name"
           {...register('name')}
         />
         {errors.name && <span className="text-red-600">{errors.name.message}</span>}
         
         <div className="flex flex-col md:flex-row justify-between gap-4 w-full mt-4">
           <div className="flex flex-col flex-1">
             <label htmlFor="agentLanguage" className="text-sm font-bold text-gray-400">
               <span style={{fontFamily: "Work Sans"}} className="text-slate-800">Language</span>
             </label>
            
             <div className="relative inline-block w-full md:w-164 text-left">
         <div>
           <button
             type="button"
             className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-indigo-500"
             id="options-menu"
             aria-expanded={isOpen}
             aria-haspopup="true"
             style={{fontFamily: "Work Sans"}}
             // onClick={() => setIsOpen(!isOpen)}
           >
             {/* {selectedOption} */}
             English
             <RiArrowDropDownLine className="w-5 h-5" />
           </button>
         </div>
   
         {/* {isOpen && (
           <div
             className="absolute z-10 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
             role="menu"
             aria-orientation="vertical"
             aria-labelledby="options-menu"
           >
             <div className="py-1" role="none">
               {options.map((option) => (
                 <button
                   key={option}
                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                   role="menuitem"
                   onClick={() => handleSelect(option)}
                   {...register("language")}
                 >
                   {option}
                 </button>
               ))}
             </div>
           </div>
         )} */}
       </div>
             {errors.language && <span className="text-red-600">{errors.language.message}</span>}
           </div>
           <div className="flex flex-col flex-1">
             <label htmlFor="agentVoice" className="text-sm font-bold text-gray-400">
               <span style={{fontFamily: "Work Sans"}} className="text-slate-800">Voice</span>
             </label>
             {/* <input
               type="text"
               id="agentVoice"
               className="p-2.5 mt-1 w-full text-xs font-medium bg-white rounded-lg border"
               placeholder="Agent Voice"
               aria-label="Agent Voice"
               {...register('voice')}
             /> */}
             <div className="relative inline-block w-full md:w-164 text-left">
         <div>
           <button
             type="button"
             className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-indigo-500"
             id="options-menu"
             aria-expanded={isOpen}
             aria-haspopup="true"
             style={{fontFamily: "Work Sans"}}
             //onClick={() => setIsOpen2(!isOpen)}
           >
             Female voice
             {/* {selectedOption2} */}
             <RiArrowDropDownLine className="w-5 h-5" />
           </button>
         </div>
   
         {/* {isOpen2 && (
           <div
             className="absolute z-10 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
             role="menu"
             aria-orientation="vertical"
             aria-labelledby="options-menu"
           >
             <div className="py-1" role="none">
               {options2.map((option) => (
                 <button
                   key={option}
                   className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                   role="menuitem"
                   onClick={() => handleSelect2(option)}
                 >
                   {option}
                 </button>
               ))}
             </div>
           </div>
         )} */}
       </div>
             {errors.voice && <span className="text-red-600">{errors.voice.message}</span>}
           </div>
         </div>
   
         <div className="flex flex-row md:flex-row justify-between items-center p-3 mt-4 w-full text-sm rounded-lg bg-slate-100">
           <div>
             <span style={{fontFamily: "Work Sans"}} className="font-bold text-slate-800">{phoneNumber}</span>
             <br />
             <span style={{fontFamily: "Work Sans", fontWeight: 350, fontSize: 12}} className="text-gray-400">
             {phoneNumber === "Generate Agent Number" && ("Assign a custom number to  your agent?")}
             </span>
           </div>
           <IconButton
     onClick={() => {handleClaimNumber()}}
     tooltip="Create source"
     
     icon={
       <Image
         loading="lazy"
         src="/assets/call-add.svg"
         alt="download"
         width={6}
         height={16}
         className="shrink-0 my-auto w-4 aspect-square"
       />
     }
     className="bg-violet-800 bg-opacity-10 text-white flex gap-1 justify-center p-2.5 font-medium rounded-lg mt-2 md:mt-0"
     color="#415BE61A"
   >
     <span
       className="text-indigo-600"
       style={{fontFamily: "Work Sans", fontWeight: 350, width: 100, whiteSpace: 'nowrap', fontSize: 13 }}
     >
       Generate Number
     </span>
   </IconButton>
         </div>
                   {/* <div 
                 
                 style={{
                   width: '100%',
                   
                   backgroundColor: 'white',
                   borderRadius: 12,
                   display: 'flex',
              
                   justifyContent: 'start',
                   flexDirection: 'column',
                   borderColor: "#D8D8E2", borderWidth: 1 ,
                 marginTop: 20
                 }}
             
               >
             <div
            
             style={{ borderRadius: 10, width: "100%", height: 55, display: "flex", justifyContent: "start", alignItems: "center", paddingRight: '10px' }} // Added paddingRight
             >
             <div className="checkbox flex-grow gap-2.5 p-2.5 flex items-center">
             <span style={{color: "#435060", fontSize: 13, fontFamily: "Work Sans",}}>Reservation Booking</span>
             <input
             type="checkbox"
             className="form-checkbox w-4 h-4 text-blue-600"
             style={{marginLeft: "auto", }}
             // onChange={handleChange}
             />
           
             </div>
             
             </div>
   
   
   
   
     </div>
     <div 
                 
                 style={{
                   width: '100%',
                   
                   backgroundColor: 'white',
                   borderRadius: 12,
                   display: 'flex',
              
                   justifyContent: 'start',
                   flexDirection: 'column',
                   borderColor: "#D8D8E2", borderWidth: 1 ,
                 marginTop: 20
                 }}
             
               >
             <div
            
             style={{ borderRadius: 10, width: "100%", height: 55, display: "flex", justifyContent: "start", alignItems: "center", paddingRight: '10px' }} // Added paddingRight
             >
             <div className="checkbox flex-grow gap-2.5 p-2.5 flex items-center">
             <span style={{fontFamily: "Work Sans",color: "#435060", fontSize: 13}}>Call routing</span>
             <input
             type="checkbox"
             className="form-checkbox w-4 h-4 text-blue-600"
             style={{fontFamily: "Work Sans",marginLeft: "auto", }}
             // onChange={handleChange}
             />
           
             </div>
             
             </div>
   
   
   
   
     </div> */}
   
     {/* <div 
                 
                 style={{
                   width: '100%',
                   
                   backgroundColor: 'white',
                   borderRadius: 12,
                   display: 'flex',
              
                   justifyContent: 'start',
                   flexDirection: 'column',
                   borderColor: "#D8D8E2", borderWidth: 1 ,
                 marginTop: 20
                 }}
             
               >
             <div
            
             style={{ borderRadius: 10, width: "100%", height: 55, display: "flex", justifyContent: "start", alignItems: "center", paddingRight: '10px' }} // Added paddingRight
             >
             <div className="checkbox flex-grow gap-2.5 p-2.5 flex items-center">
             <span style={{color: "#435060", fontSize: 13}}>Sending sms</span>
             <input
             type="checkbox"
             className="form-checkbox w-4 h-4 text-blue-600"
             style={{fontFamily: "Work Sans",marginLeft: "auto", }}
             // onChange={handleChange}
             />
           
             </div>
             
             </div>
   
   
   
   
     </div> */}
         <div className="flex flex-col md:flex-row gap-4 mt-7 w-full">
           <button
             type="submit"
             className="p-2.5 text-gray-600 bg-slate-100 rounded-lg w-full md:w-32"
             style={{fontFamily: "Work Sans"}} 
           >
             Save
           </button>
           <a
             className="p-2.5 text-gray-600 bg-slate-100 rounded-lg w-full md:w-32 text-center cursor-pointer"
             onClick={() => {
               router.push('/agents');
             }}
             style={{fontFamily: "Work Sans"}} 
           >
             Cancel
           </a>
         </div>
       </form>
     </div>
   </section>
   }
    

    </div>
  );
};

export default AgentCreate;
