'use client';

import Image from 'next/image';
import { useState,useContext,useEffect } from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";
import Card from '../card';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { NearContext } from '../../wallets/near'
import FullScreenLoader from '@/components/full-screen-loader';



interface CallLogItemProps {
  id?: number;
  clientName: string;
  phoneNumber: string;
  category: string;
  details: string;
  date: string;
  callType: string;
  duration: string;
}

const CallLogsClient: React.FC<{ callLogItems: CallLogItemProps[], userId : string }> = ({ callLogItems, userId }) => {
  const LOGS_PER_PAGE = 15;
  const [activedCategory, setActivedCategory] = useState('All Calls');
  const [filteredLogs, setFilteredLogs] = useState(callLogItems);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(Math.ceil(callLogItems.length / LOGS_PER_PAGE));
  const [isLoading , setisLoading] = useState(true)
  const { signedAccountId, wallet } = useContext(NearContext);
  const [calls, setcalls] = useState<any[]>([]);
  const [calls2, setcalls2] = useState<any[]>([]);
  const [callstats, setcallstats] = useState<any>({});



  useEffect(() => {
    const handleGoNextPage = async () => {
      const supabase = createClientComponentClient();
      const { data: items } = await supabase
      .from('ai_agents')
      .select('id, name, phone_number, created_at, language, voice, status')
      .eq('user_id', userId)
      .eq('wallet_id', signedAccountId)

      if(items){
        const options = {
          method: 'GET',
          headers: {Authorization: 'Bearer 8398609e-b62a-4a20-b508-a94a7b839c7f'}
        };
        
        fetch('https://api.vapi.ai/call?assistantId=c7919cb8-8577-457e-9d45-a523388befde', options)
          .then(
            response => response.json(),
            )
          .then((response : any[]) => {setcalls(response)
            setcalls2(response)
            const now = new Date();
            const thirtyDaysAgo = new Date(now);
            thirtyDaysAgo.setDate(now.getDate() - 30);
  
            const callStats = {
              connectedCalls: 0,
              totalMinutes: 0,
              missedCalls: 0,
              abandonedCalls: 0,
              totalcalls : 0
            };
  
            const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const callVolumeByDay = daysOfWeek.map(day => ({ name: day, uv: 0, pv: 0 }));
           
            
            response.forEach(call => {
              const startedAt : any = new Date(call.startedAt);
              const endedAt : any = new Date(call.endedAt);
              const duration = (endedAt - startedAt) / 60000; // Convert milliseconds to minutes
            //startedAt >= thirtyDaysAgo && startedAt <= now
            const callDate = new Date(call.startedAt);
            const dayIndex = callDate.getUTCDay(); // 0 (Sun) to 6 (Sat)
            const dayData = callVolumeByDay[dayIndex];
              if (true) {
                // Total Connected Calls
                if (call.status === "ended") {
                  callStats.connectedCalls++;
                  callStats.totalMinutes += duration;
                }
                
                // Missed and Abandoned Calls
                if (call.endedReason === "missed") {
                  callStats.missedCalls++;
                } else if (call.endedReason === "abandoned") {
                  callStats.abandonedCalls++;
                }
                if (call.type === "inboundPhoneCall") {
                  dayData.uv++;
                } else if (call.type === "outboundPhoneCall") {
                  dayData.pv++;
                }
          }
  
  
  
  
  
  
  
        });
      
        setcallstats(callStats)
        setisLoading(false)
          })
          .catch(err => console.error(err));
  
      }else{
        const callStats = {
          connectedCalls: 0,
          totalMinutes: 0,
          missedCalls: 0,
          abandonedCalls: 0,
          totalcalls : 0
        };

        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const callVolumeByDay = daysOfWeek.map(day => ({ name: day, uv: 0, pv: 0 }));
       
        setcalls([])
            setcalls2([])

        setcallstats(callStats)
        setisLoading(false)
      }
 

  
    }
    const handleGoNextPage2 = async () => {
      const supabase = createClientComponentClient();
      const { data: items } = await supabase
      .from('ai_agents')
      .select('id, name, phone_number, created_at, language, voice, status')
      .eq('user_id', userId)
      //.eq('wallet_id', signedAccountId)

      if(items){
        const options = {
          method: 'GET',
          headers: {Authorization: 'Bearer 8398609e-b62a-4a20-b508-a94a7b839c7f'}
        };
        
        fetch('https://api.vapi.ai/call?assistantId=c7919cb8-8577-457e-9d45-a523388befde', options)
          .then(
            response => response.json(),
            )
          .then((response : any[]) => {setcalls(response)
            setcalls2(response)
            const now = new Date();
            const thirtyDaysAgo = new Date(now);
            thirtyDaysAgo.setDate(now.getDate() - 30);
  
            const callStats = {
              connectedCalls: 0,
              totalMinutes: 0,
              missedCalls: 0,
              abandonedCalls: 0,
              totalcalls : 0
            };
  
            const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const callVolumeByDay = daysOfWeek.map(day => ({ name: day, uv: 0, pv: 0 }));
           
            
            response.forEach(call => {
              const startedAt : any = new Date(call.startedAt);
              const endedAt : any = new Date(call.endedAt);
              const duration = (endedAt - startedAt) / 60000; // Convert milliseconds to minutes
           
            const callDate = new Date(call.startedAt);
            const dayIndex = callDate.getUTCDay(); 
            const dayData = callVolumeByDay[dayIndex];
              if (true) {
                // Total Connected Calls
                if (call.status === "ended") {
                  callStats.connectedCalls++;
                  callStats.totalMinutes += duration;
                }
                
                // Missed and Abandoned Calls
                if (call.endedReason === "missed") {
                  callStats.missedCalls++;
                } else if (call.endedReason === "abandoned") {
                  callStats.abandonedCalls++;
                }
                if (call.type === "inboundPhoneCall") {
                  dayData.uv++;
                } else if (call.type === "outboundPhoneCall") {
                  dayData.pv++;
                }
          }
  
  
  
  
  
  
  
        });
       // setdata(callVolumeByDay)
        setcallstats(callStats)
        setisLoading(false)
          })
          .catch(err => console.error(err));
  
      }else{
        const callStats = {
          connectedCalls: 0,
          totalMinutes: 0,
          missedCalls: 0,
          abandonedCalls: 0,
          totalcalls : 0
        };

        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const callVolumeByDay = daysOfWeek.map(day => ({ name: day, uv: 0, pv: 0 }));
       
        setcalls([])
            setcalls2([])
       // setdata(callVolumeByDay)
        setcallstats(callStats)
        setisLoading(false)
      }
 

  
    }
    if (signedAccountId){
      handleGoNextPage()
    }else{
      handleGoNextPage2()
    }
    
;


    
    
  }, []); 

  useEffect(() => {
    const filtered =
      activedCategory === 'All Calls'
        ? calls
        : calls.filter((call) => call.type === activedCategory);

    setFilteredLogs(filtered);
    if ( activedCategory != 'All Calls'){
      setcalls2(filtered)
    }
    setCurrentPage(1);
    setPages(Math.ceil(filtered.length / LOGS_PER_PAGE));
  }, [callLogItems, activedCategory]);
  const router = useRouter();

  const handleGoPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleGoNextPage = () => {
    if (currentPage < pages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="space-y-1 border-spacing-3">
          {isLoading && <FullScreenLoader />}
           <section
            className="flex gap-5 px-2 mt-6 flex-wrap justify-start items-center mx-auto"
            style={{
              gap: '30px',
              marginTop: '0px'
            }}
          >
            <Card
               imgSrc="icon-call-received.svg"
              imgAlt="calls"
              bgColor="bg-emerald-600"
              title="Total Calls"
              subtitle="Last 30 days"
              value={`${calls.length}`}
            />
            <Card
              imgSrc="icon-timer.svg"
              imgAlt="timer"
              bgColor="bg-blue-600"
              title="Total Minutes"
              subtitle="Last 30 days"
              value={`${callstats.totalMinutes?.toFixed(2) ? callstats.totalMinutes?.toFixed(2) : 0 }`}
            />
            <Card
              imgSrc="ss.svg"
              imgAlt="heart-tick"
              bgColor="bg-rose-600"
              title="Completed Calls"
              subtitle="Last 30 days"
              value={`${callstats.connectedCalls ? callstats.connectedCalls : 0}`}
            />
           
          </section>
          <div style={{ marginTop: 20 }}>
          <div className="flex flex-col gap-4 px-4 py-4 bg-white rounded-lg w-full max-w-full" style={{marginTop: 20}}>

<div className="flex flex-col sm:flex-row justify-between items-center w-full gap-3 px-4 py-3 rounded-xl">
  <div className="flex gap-3 rounded-xl px-4 py-3 bg-[#f5f6fa] flex-wrap justify-center sm:justify-start">
  <CallLogsTab
      tab="All Calls"
      calls={calls2.length}
      actived={activedCategory === 'All Calls'}
      onClick={() => setActivedCategory('All Calls')}
    />
    <CallLogsTab
      tab="Incoming"
      calls={calls2.filter((call) => call.type === 'inboundPhoneCall').length}
      actived={activedCategory === 'inboundPhoneCall'}
      onClick={() => setActivedCategory('inboundPhoneCall')}
    />
    <CallLogsTab
      tab="Outgoing"
      calls={calls2.filter((call) => call.type === 'outboundPhoneCall').length}
      actived={activedCategory === 'outboundPhoneCall'}
      onClick={() => setActivedCategory('outboundPhoneCall')}
    />
    <CallLogsTab
      tab="Webcall"
      calls={calls2.filter((call) => call.type === 'webCall').length}
      actived={activedCategory === 'webCall'}
      onClick={() => setActivedCategory('webCall')}
    />
  </div>
  <div className="flex gap-3 text-xs text-gray-600 mt-3 sm:mt-0">
    <div className="flex items-center p-2.5 bg-white rounded-lg border border-solid border-zinc-200">
      <Image
        loading="lazy"
        src="/assets/search.svg"
        alt="search"
        width={20}
        height={20}
      />
      <input
        type="text"
        placeholder="Search by title"
        className="ml-2 border-none outline-none w-full"
      />
    </div>
    <button className="flex items-center p-2.5 bg-white rounded-lg border border-solid border-zinc-200">
      <span>Filter</span>
      <RiArrowDropDownLine width={20} className="w-4 h-4" />
    </button>
  </div>
</div>

<div className="w-full max-h-[680px] overflow-auto">
  <table className="min-w-full text-xs text-left">
    <thead>
      <tr className="h-9 bg-slate-100 font-medium text-gray-400">
        <td></td>
        <th>Ai Agent</th>
        <th>Phone Number</th>
        <th>Category</th>
        <th>Details</th>
        <th>Date</th>
        <th>Call Type</th>
        {/* <th>Duration</th> */}
        {/* <th>Action</th> */}
      </tr>
    </thead>
   
    <tbody className="px-6">
   
      { calls
        .slice(LOGS_PER_PAGE * (currentPage - 1), LOGS_PER_PAGE * currentPage)
        .map((call, idx) => (
         
          <tr 
          // onClick={() => { 
          //   router.push('/call-logs/transcript');
          // }} 
          key={idx} className="h-[50px] px-3 py-[7px] cursor-pointer hover:bg-gray-100">
            <td></td>
            <td className="text-gray-600 font-semibold">Hailey MacKenzie</td>
            <td className="text-indigo-600">{call?.customer?.number}</td>
            {/* <td className={`${call.category === 'Received' ? 'text-slate-800' : call.category === 'Missed' ? 'text-rose-600' : 'text-violet-800'}`}>
              {call.category}
            </td> */}
             <td className={`text-violet-800`}>
              {call.type}
            </td>
            
            <td className="text-gray-400">{call.transcript.substring(0, 70) + '...'}</td>
            <td className="text-gray-400">{call.startedAt}</td>
            <td>
              <div className="w-16 h-[22px] bg-slate-100 rounded justify-center items-center gap-0.5 inline-flex">
                <Image src="/assets/icon-microphone.svg" alt="" width={16} height={16} />
                <div className="text-gray-600 font-medium">Audio</div>
              </div>
            </td>
            {/* <td className="text-gray-400">{(call.endedAt - call.startedAt) / 60000}</td> */}
            <td></td>
          </tr>
        ))}

    </tbody>

  </table>
</div>
</div>

      <div className="flex justify-between mt-10">
        <div className="text-gray-600 text-xs">{`Showing ${LOGS_PER_PAGE * (currentPage - 1) + 1} to ${currentPage === pages ? filteredLogs.length : LOGS_PER_PAGE * currentPage} of ${filteredLogs.length} results`}</div>
        <div className="w-[66px] h-6 justify-start items-start gap-[18px] inline-flex">
          <button
            className="w-6 h-6 origin-top-left bg-white rounded justify-center items-center gap-2.5 flex hover:bg-gray-200 transition-all"
            //onClick={handleGoPrevPage}
          >
            <Image src="/assets/icon-arrow-left.svg" alt="" width={16} height={16} />
          </button>
          <button
            className="w-6 h-6 bg-white rounded justify-center items-center gap-2.5 flex hover:bg-gray-200 transition-all"
            //onClick={handleGoNextPage}
          >
            <Image src="/assets/icon-arrow-right.svg" alt="" width={16} height={16} />
          </button>
        </div>
      </div>
          </div>
    </div>
  );
};

export default CallLogsClient;

interface CallLogsTabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tab?: string;
  calls?: number;
  actived?: boolean;
}

const CallLogsTab: React.FC<CallLogsTabProps> = ({ tab, calls, actived = false, ...props }) => {
  return (
    <button
      className={`w-[120px] h-[28px] flex justify-center items-center gap-[5px] px-[5px] rounded-lg group ${actived ? 'bg-white shadow' : 'bg-transparent shadow-none'}`}
      {...props}
    >
      <div
        className={`text-sm font-medium leading-[16px] ${!actived ? 'text-gray-400' : 'text-gray-600'} group-hover:text-gray-600`}
      >
        {tab}
      </div>
      <div
        className={`w-[25px] h-4 flex justify-center items-center ${!actived ? 'bg-zinc-200' : 'bg-violet-800'} group-hover:bg-violet-800 rounded`}
      >
        <div className="text-[10px] leading-[12px] font-bold text-white">{calls}</div>
      </div>
    </button>
  );
};
