'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import * as d3 from 'd3-shape';
import Image from 'next/image';
import { useState,useContext,useEffect } from 'react';
import * as React from 'react';
import { RiArrowDropDownLine } from "react-icons/ri";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps
} from 'recharts';
import { utils } from "near-api-js";
import { CALL_LOGS } from 'src/mockdata/call-logs';
import { NearContext } from '../../wallets/near'
import FullScreenLoader from '@/components/full-screen-loader';
import { HelloNearContract } from '../../config';
import Card from '../card';
import CallLogsClient from './call-logs-client';


import { useRouter } from 'next/navigation';
// import { curveCardinal } from 'd3-shape';
// import ProgressBar from 'react-bootstrap/ProgressBar';
interface DashboardClientProps {
  userId: string;
  email: string;
  customerId?: number;
}

const DashboardClient: React.FC<DashboardClientProps> = ({ userId, email, customerId }) => {
  const [isMobile, setIsMobile] = useState(true);
  const [isAwidth, setisAwidth] = useState(false);
  const { signedAccountId, wallet } = useContext(NearContext);
  const [action, setAction] = useState(() => { });
  const [label, setLabel] = useState('Loading...');
  const [isLoading , setisLoading] = useState(true)
  const CONTRACT = HelloNearContract;
  // useEffect(() => {
  //   if (!wallet) return;

  //   if (signedAccountId) {
  //     setAction(() => wallet.signOut);
  //     setLabel(`Disconnect ${signedAccountId}`);
  //   } else {
  //     setAction(() => wallet.signIn);
  //     // signIn2()
  //     setLabel('Connect wallet');
  //   }
  // }, [signedAccountId, wallet]);
let callLogItems = CALL_LOGS
  const LOGS_PER_PAGE = 15;
  const [activedCategory, setActivedCategory] = useState('All Calls');
  const [filteredLogs, setFilteredLogs] = useState<any[]>(callLogItems);
  const [currentPage, setCurrentPage] = useState(1);
  const [calls, setcalls] = useState<any[]>([]);
  const [calls2, setcalls2] = useState<any[]>([]);
  const [data, setdata] = useState<any[]>([]);
  const [callstats, setcallstats] = useState<any>({});
  const [pages, setPages] = useState(Math.ceil(callLogItems.length / LOGS_PER_PAGE));
  const router = useRouter();



  useEffect(() => {
    const handleGoNextPage = async () => {
      const supabase = createClientComponentClient();
      const { data: items } = await supabase
      .from('ai_agents')
      .select('id, name, phone_number, created_at, language, voice, status')
      .eq('user_id', userId)
      .eq('wallet_id', signedAccountId)
      // console.log(items)
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
        setdata(callVolumeByDay)
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
        setdata(callVolumeByDay)
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
        setdata(callVolumeByDay)
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
        setdata(callVolumeByDay)
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



  useEffect(() => {
 
    if (signedAccountId) {
      const handleResize = async () => {
        const supabase = createClientComponentClient();
        const { data: items } = await supabase
        .from('user_data')
        .select('id, first_name, last_name, created_at, email, user_id, wallet_id ')
        .eq('user_id', userId)
        .eq('wallet_id', signedAccountId)
        // const products = await wallet.callMethod({ contractId: CONTRACT, method: 'approveProductByHash', args: { productHash: docName.id } });

      if (items[0]?.first_name && items[0]?.last_name){
        //const products = await wallet.viewMethod({ contractId: CONTRACT, method: 'getUser',  args: { Username: `${items?.first_name}${items?.last_name}` }});
        const products = await wallet.viewMethod({ contractId: CONTRACT, method: 'getUser',  args: { Username: `${items[0]?.first_name}${items[0]?.last_name}` }});
  

        if (!products){
         
        }else{
        // setissubscrilbe(products.subscribed)
        // const products2 = await wallet.callMethod({ contractId: CONTRACT, method: 'createUser', args: { Firstname: items[0]?.first_name ,Lastname :items[0]?.last_name,Username : `${items[0]?.first_name}${items[0]?.last_name}`  } });
         if (products.subscriptionDate){
          const blockTimeNano = BigInt(products.subscriptionDate);


          const blockTimeMillis : any = Number(blockTimeNano / BigInt(1_000_000)); 


          const blockDate : any= new Date(blockTimeMillis);


          const currentDate : any = new Date();

          // Calculate the difference in milliseconds
          const diffInMillis : any = currentDate - blockDate;

          const thirtyDaysInMillis : any = 30 * 24 * 60 * 60 * 1000;
          if (diffInMillis >= thirtyDaysInMillis) {
            alert("30 day Subscription Renewal")
            let deposit = utils.format.parseNearAmount(products.plan.toString());
            const products2 = await wallet.callMethod({ contractId: CONTRACT, method: 'subscribetest', args: { Username: `${items[0]?.first_name}${items[0]?.last_name}` , plan : products.plan },deposit });
          } else {
            console.log("30 days have not yet passed.");
          }
         
         }else{

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
        // setiscase('Update Profile To Subscribe ')
        // setisuser(false)
        
      }
        

      //  setProfileCompletion(items[0])
      // setisLoading(false)



      }
      handleResize()
      
    }else {
      const handleResize = async () => {
        const supabase = createClientComponentClient();
        const { data: items } = await supabase
        .from('user_data')
        .select('id, first_name, last_name, created_at, email, user_id, wallet_id ')
        .eq('user_id',userId)
      //   setiscase('Conect waller To Subscribe ')
      //   setisuser(false)
      //  setProfileCompletion(items[0])
      //  setisLoading(false)
       
      }
      handleResize()
      
    }
 
  }, [])











  interface TruncatedTextProps {
    text: string;
    maxLength: number;
  }

  const TruncatedText: React.FC<TruncatedTextProps> = ({ text, maxLength }) => {
    const truncate = (str: string, max: number): string => {
      if (str.length > max) {
        return str.substring(0, max) + '...';
      }

      return str;
    };

    return (
      <div className="my-auto text-base font-xs leading-4" style={{ fontSize: 13, color: 'grey' }}>
        {truncate(text, maxLength)}
      </div>
    );
  };

  const TruncatedText2: React.FC<TruncatedTextProps> = ({ text, maxLength }) => {
    const truncate = (str: string, max: number): string => {
      if (str.length > max) {
        return str.substring(0, max) + '...';
      }

      return str;
    };

    return <div>{truncate(text, maxLength)}</div>;
  };

  interface ProgressBarProps {
    progress: number;
  }

  const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    const containerStyles: React.CSSProperties = {
      height: 10,
      width: '95%',
      backgroundColor: '#e0e0de',
      borderRadius: 5,
      overflow: 'hidden'
    };
    const fillerStyles: React.CSSProperties = {
      height: '100%',
      width: `${progress}%`,
      backgroundImage: `linear-gradient(to right, rgba(13, 161, 161, 1), rgba(20, 172, 108, 1))`,
      borderRadius: 'inherit',
      textAlign: 'right',
      transition: 'width 0.2s ease-in-out'
    };

    return (
      <div style={containerStyles}>
        <div style={fillerStyles}></div>
      </div>
    );
  };
  const progress1: number = 60;
  const progress2: number = 100;


  const items = [
    // {
    //   title: 'Ethereum',
    //   currency: 'ETH',
    //   price: '$2,605.95',
    //   positive: '+2.04%',
    //   image: '/images/content/currency/ethereum.svg',
    //   url: '/exchange'
    // },
    // {
    //   title: 'Bitcoin Cash',
    //   currency: 'BCH',
    //   price: '$939.20',
    //   negative: '-0.74%',
    //   image: '/images/content/currency/bitcoin-cash.svg',
    //   url: '/exchange'
    // },
    // {
    //   title: 'Ripple',
    //   currency: 'XRP',
    //   price: '$1.02',
    //   positive: '+1.20%',
    //   image: '/images/content/currency/ripple.svg',
    //   url: '/exchange'
    // },
    // {
    //   title: 'Chainlink',
    //   currency: 'LINK',
    //   price: '$30.56',
    //   negative: '-3.84%',
    //   image: '/images/content/currency/chainlink.svg',
    //   url: '/exchange'
    // }
  ];
  const cardinal = d3.curveCardinal;

  const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ payload, label, active }) => {
    if (active && payload && payload.length) {
      // let days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: 'rgba(37, 49, 62, 1)',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: 10,
            width: 180
          }}
        >
          <p
            className="label"
            style={{ color: 'white', fontSize: 13, fontWeight: 'bold' }}
          >{`${label}`}</p>
          <div>
            <div
              style={{
                width: 10,
                height: 10,
                backgroundColor: 'purple',
                borderRadius: '50%'
              }}
            ></div>
            <p
              className="intro"
              style={{ color: 'white', fontSize: 13, marginTop: -15, marginLeft: 15 }}
            >
              Incoming Calls{' '}
            </p>
            <p
              className="intro"
              style={{
                color: 'white',
                fontSize: 14,
                marginTop: -20,
                marginLeft: 125,
                fontWeight: 'bold'
              }}
            >{`${payload[0].value}`}</p>
          </div>

          {/* <p className="intro" style={{color: "white"}} >{`PV: ${payload[1].value}`}</p> */}
          <div>
            <div
              style={{
                width: 10,
                height: 10,
                backgroundColor: 'green',
                borderRadius: '50%'
              }}
            ></div>
            <p
              className="intro"
              style={{ color: 'white', fontSize: 13, marginTop: -15, marginLeft: 15 }}
            >
              Accepted Calls
            </p>
            <p
              className="intro"
              style={{
                color: 'white',
                fontSize: 14,
                marginTop: -20,
                marginLeft: 125,
                fontWeight: 'bold'
              }}
            >{`${payload[1].value}`}</p>
          </div>
        </div>
      );
    }

    return null;
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // You can adjust the threshold value
      setisAwidth(window.innerWidth <= 1330);
    };

    handleResize(); // Call initially to set the state based on the initial screen size

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    async function updateCustomerId() {
      const supabase = createClientComponentClient();
      const { data: items } = await supabase
        .from('user_data')
        .select('id, first_name, last_name, created_at, email, user_id, wallet_id ')
        .eq('user_id', userId)

      if (items?.length === 0 && !hasFetched) {
        hasFetched = true; // Set flag to prevent re-runs
       
  
        // Insert data into `user_data`
        const { error: error1, data: data1 } = await supabase
          .from('user_data')
          .insert([
            {
              email: email,
              user_id: userId,
              wallet_id: signedAccountId,
            },
          ])
          .select();
  
        if (error1) {
          console.error('Adding new Customer Failed:', error1);
          throw error1.message;
        }
  
        const newCustomerId = data1[0].id;
  
  
        // Insert into `customer_industry`
        await supabase
          .from('customer_industry')
          .insert([{ customer_id: newCustomerId, industry_id: 1 }]);
  
        // Update the user in authentication
        await supabase.auth.updateUser({
          data: { customer_id: newCustomerId },
        });
      }
    }

    async function updateCustomerId2() {
      const supabase = createClientComponentClient();
      const { data: items } = await supabase
        .from('user_data')
        .select('id, first_name, last_name, created_at, email, user_id, wallet_id ')
        .eq('user_id', userId)
        .eq('wallet_id', signedAccountId)

      if (items?.length === 0 && !hasFetched) {
        hasFetched = true; // Set flag to prevent re-runs
       
  
        // Insert data into `user_data`
        const { error: error1, data: data1 } = await supabase
          .from('user_data')
          .insert([
            {
              email: email,
              user_id: userId,
              wallet_id: signedAccountId,
            },
          ])
          .select();
  
        if (error1) {
          console.error('Adding new Customer Failed:', error1);
          throw error1.message;
        }
  
        const newCustomerId = data1[0].id;
      
  
        // Insert into `customer_industry`
        await supabase
          .from('customer_industry')
          .insert([{ customer_id: newCustomerId, industry_id: 1 }]);
  
        // Update the user in authentication
        await supabase.auth.updateUser({
          data: { customer_id: newCustomerId },
        });
      }
    }
    // Track if updateCustomerId has been called
    let hasFetched = false;
   if (signedAccountId){
    updateCustomerId2();
   }else {
    updateCustomerId()
   }

  

  }, []);
  
//"type": "inboundPhoneCall",
// "status": "ended",
// "endedReason": "customer-ended-call",


  return (
    <>
    
    {isLoading && <FullScreenLoader />}
      {isMobile ? (
        <>
          <section
            className="flex gap-5 px-0.5 mt--96 max-md:flex-wrap max-md:max-w-full"
            style={{ marginTop: -30 }}
          >
           
            <Card
              imgSrc="icon-calls.svg"
              imgAlt="calls"
              bgColor="bg-purple-800"
              title="Total Calls"
              subtitle="Last 30 days"
              value={`${calls.length}`}
            />
            <Card
              imgSrc="icon-call-received.svg"
              imgAlt=""
              bgColor="bg-emerald-600"
              title="Completed Calls"
              subtitle="Last 30 days"
              value={`${callstats.connectedCalls ? callstats.connectedCalls : 0}`}
            />
            <Card
              imgSrc="icon-heart-tick.svg"
              imgAlt="heart-tick"
              bgColor="bg-rose-600"
              title="Total Minutes"
              subtitle="Last 30 days"
              value={`${callstats.totalMinutes?.toFixed(2) ? callstats.totalMinutes?.toFixed(2) : 0 }`}
            />
          </section>

          <div
            style={{
             
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 20,
              margin: '0 auto',
              flexWrap: 'wrap',
              marginTop: 50
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: 500,
                height: 280,
                backgroundColor: 'white',
                padding: 20,
                boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                borderRadius: 8,
                position: 'relative'
              }}
            >
              <h2 className="my-auto text-base font-semibold leading-4">Calls Volume</h2>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  position: 'absolute',
                  top: 20,
                  right: 20
                }}
              >
                <p className="my-auto text-base font-xs leading-4" style={{ fontSize: 12 }}>
                  By Day
                </p>
                <Image
                  loading="lazy"
                  src="/assets/icon-arrow-down.svg"
                  alt="arrow-down"
                  width={16}
                  height={16}
                  className="shrink-0 my-auto w-4 aspect-square"
                  style={{ marginLeft: 10 }}
                />
              </div>

              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  width={500}
                  height={400}
                  data={data}
                  margin={{
                    top: 40, // Adjusted top margin to accommodate the text and arrow
                    right: 0,
                    left: 0,
                    bottom: 0
                  }}
                >
                  <CartesianGrid horizontal={false} vertical={false} strokeDasharray="2 2" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: '#8884d8' }}
                    tickSize={10}
                    padding={{ left: 40, right: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    mirror={true}
                    tickSize={12}
                    tick={{ fontSize: 12, fill: '#8884d8', dx: -10 }}
                    padding={{ top: 10, bottom: 10 }}
                    width={50}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                  />
                  <Area
                    type={cardinal}
                    dataKey="pv"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div
              style={{
                display: 'grid',
                gap: 20,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%'
              }}
            >
              {/* <div
                className="flex flex-col flex-1 items-start px-7 py-3 bg-white rounded-lg max-md:px-5"
                style={{
                  width: '100%',
                  minWidth: 350,

                  height: 400,
                  backgroundColor: 'white',
                  padding: 20,
                  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                  borderRadius: 8
                }}
              >
                <div style={{ height: 20 }}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'start',
                      padding: '8px'
                    }}
                  >
                    <h2 className="my-auto text-base font-semibold leading-4">Ai Agent</h2>
                    <Image
                      loading="lazy"
                      src="/assets/icon-arrow-down.svg"
                      alt="arrow-down"
                      width={16}
                      height={16}
                      className="shrink-0 my-auto w-4 aspect-square"
                      style={{ marginLeft: 10 }}
                    />
                    <h2
                      className="my-auto text-base font-xs leading-4"
                      style={{ fontSize: 13, marginLeft: '50%', color: 'blue' }}
                    >
                      View all
                    </h2>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      height: 120,
                      alignItems: 'center',
                      justifyContent: 'start',
                      backgroundColor: 'white',
                      padding: '8px',
                      borderRadius: 8,
                      borderColor: 'rgba(156, 163, 175, 0.5)',
                      borderWidth: 1,
                      marginTop: 15
                    }}
                  >
                     <Image
                        loading="lazy"
                        src="/assets/Agent.svg"
                        alt="agent"
                        width={76}
                        height={76}
                        style={{ marginLeft: 10,marginBottom:70}}
                      />
                    <div style={{ display: 'flex', width: '100%' }}>
                     
                      <div style={{ marginTop: 20, marginLeft: -75, flex: 1, width: '100%' }}>
                        <ProgressBar progress={progress1} />
                        {progress1 === 100 ? (
                          <Image
                            loading="lazy"
                            src="/assets/greentick.svg"
                            alt="green-tick"
                            width={27}
                            height={35}
                            style={{ marginLeft: 'auto', marginTop: -18 }}
                          />
                        ) : (
                          <Image
                            loading="lazy"
                            src="/assets/blanktick.svg"
                            alt="blank-tick"
                            width={27}
                            height={35}
                            style={{ marginLeft: 'auto', marginTop: -18 }}
                          />
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <h2 className="text-xs" style={{ color: 'black', marginRight: 15 }}>
                            Phone Number
                          </h2>
                          <h2 className="text-xs" style={{ color: 'black', marginRight: 25 }}>
                            Knowledge Base
                          </h2>
                          <h2 className="text-xs" style={{ color: 'black', marginRight: 25 }}>
                            Select Voice
                          </h2>
                          <h2 className="text-xs" style={{ color: 'black', marginRight: 25 }}>
                            Create Task
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      height: 120,
                      alignItems: 'center',
                      justifyContent: 'start',
                      backgroundColor: 'white',
                      padding: '8px',
                      borderRadius: 8,
                      borderColor: 'rgba(156, 163, 175, 0.5)',
                      borderWidth: 1,
                      marginTop: 15
                    }}
                  >
                     <Image
                        loading="lazy"
                        src="/assets/Agent2.svg"
                        alt="agent"
                        width={76}
                        height={76}
                        style={{ marginLeft: 10,marginBottom:70}}
                      />
                    <div style={{ display: 'flex', width: '100%' }}>
                     
                      <div style={{ marginTop: 20, marginLeft: -75, flex: 1, width: '100%' }}>
                        <ProgressBar progress={progress2} />
                        {progress2 === 100 ? (
                          <Image
                            loading="lazy"
                            src="/assets/greentick.svg"
                            alt="green-tick"
                            width={27}
                            height={35}
                            style={{ marginLeft: 'auto', marginTop: -18 }}
                          />
                        ) : (
                          <Image
                            loading="lazy"
                            src="/assets/blanktick.svg"
                            alt="blank-tick"
                            width={27}
                            height={35}
                            style={{ marginLeft: 'auto', marginTop: -18 }}
                          />
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <h2 className="text-xs" style={{ color: 'black', marginRight: 15 }}>
                            Phone Number
                          </h2>
                          <h2 className="text-xs" style={{ color: 'black', marginRight: 25 }}>
                            Knowledge Base
                          </h2>
                          <h2 className="text-xs" style={{ color: 'black', marginRight: 15 }}>
                            Select Voice
                          </h2>
                          <h2 className="text-xs" style={{ color: 'black' }}>
                            Create Task
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      height: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '8px',
                      borderRadius: 8,
                      marginTop: 15,
                      backgroundColor: 'rgba(37, 99, 235, 0.1)'
                    }}
                    className="justify-center self-stretch p-2.5 my-auto text-sm font-medium text-blue-600 rounded-lg bg-blue-600 bg-opacity-10"
                  >
                    <p className="my-auto text-base font-xs leading-4" style={{ fontSize: 12 }}>
                      + Add New Ai Agent
                    </p>
                  </div>
                </div>
              </div> */}

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
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'start',
                    padding: '8px',
                    marginTop: -15
                  }}
                >
                  <h2 className="my-auto text-base font-semibold leading-4">New Reservations</h2>
                  <Image
                    loading="lazy"
                    src="/assets/icon-arrow-down.svg"
                    alt="arrow-down"
                    width={16}
                    height={16}
                    className="shrink-0 my-auto w-4 aspect-square"
                    style={{ marginLeft: 10 }}
                  />
                </div>
                {items.map((x, index) => (
                  <div
                    style={{
                      width: '100%',
                      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                      backgroundColor: 'white',
                      borderRadius: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'start',
                      marginBottom: 18 // Add margin to create space between components
                    }}
                    key={index}
                  >
                    <div style={{ borderRadius: '50%', overflow: 'hidden', width: 55, height: 75 }}>
                      <Image
                        loading="lazy"
                        src="/assets/halima.svg"
                        alt="avatar"
                        width={45}
                        height={45}
                        style={{ borderRadius: '50%', marginTop: 15, marginLeft: 13 }}
                      />
                    </div>
                    <div style={{ marginTop: 5, marginLeft: 18, flex: 1 }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: 5
                        }}
                      >
                        <div
                          className="text-sm font-semibold leading-3 text-slate-800"
                          style={{
                            fontSize: 13,
                            maxWidth: '70%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          <TruncatedText2 text={'Mariam Abdulhamid'} maxLength={17} />
                        </div>
                        <div
                          className="my-auto text-base font-xs leading-4"
                          style={{ fontSize: 11, color: 'grey', marginRight: 10 }}
                        >
                          8:50 AM
                        </div>
                      </div>
                      <TruncatedText
                        text={
                          'To ensure the time is at the far right end and that the name is truncated, you can use the following '
                        }
                        maxLength={25}
                      />
                    </div>
                  </div>
                ))}
              </div> 
            </div>

            {/* <div style={{marginTop : 20, width: 20}}>
<CallLogsClient callLogItems={CALL_LOGS} />
</div> */}
          </div>
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
   
      { calls2 
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
        </>
      ) : (
        <>
          <section
            className="flex gap-5 px-2 mt-6 flex-wrap justify-start items-center mx-auto"
            style={{
              gap: '30px',
              marginTop: '0px'
            }}
          >
            <Card
              imgSrc="icon-calls.svg"
              imgAlt="calls"
              bgColor="bg-purple-800"
              title="Total Calls "
              subtitle="Last 30 days"
              value={`${calls.length}`}//"3,500"
            />
            <Card
              imgSrc="icon-call-received.svg"
              imgAlt=""
              bgColor="bg-emerald-600"
              title="Completed Calls"
              subtitle="Last 30 days"
              value={`${callstats.connectedCalls ? callstats.connectedCalls : 0}`}
              //value="1,900"
            />
            <Card
              imgSrc="icon-heart-tick.svg"
              imgAlt="heart-tick"
              bgColor="bg-rose-600"
              title="Total Minites"
              subtitle="Last 30 days"
              value={`${callstats.totalMinutes?.toFixed(2) ? callstats.totalMinutes?.toFixed(2) : 0 }`}
              
            />
            {/* <Card
              imgSrc="icon-timer.svg"
              imgAlt="timer"
              bgColor="bg-blue-600"
              title="Average Response Time"
              subtitle="Last 30 days"
              value="35 sec"
            /> */}
            {/* <Card
              imgSrc="icon-medal-star.svg"
              imgAlt="medal-star"
              bgColor="bg-amber-400"
              title="Customer Rating"
              subtitle="Last 30 days"
              value="4.0"
            /> */}
          </section>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 20,
              margin: '0 auto',
              flexWrap: 'wrap',
              marginTop: 50
              // maxWidth: "100%"
            }}
          >
            <div
              className="flex flex-col flex-1 items-start px-7 py-3 bg-white rounded-lg max-md:px-5"
              style={{
                minWidth: 400,
                // maxWidth: 500,
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
                  justifyContent: 'space-between',
                  width: '100%',
                  alignItems: 'center'
                }}
              >
                <h2 className="text-base font-semibold leading-4">Calls Volume</h2>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    padding: '8px',
                    borderRadius: 8,
                    border: '1px solid grey'
                  }}
                >
                  <p className="text-base font-xs leading-4" style={{ fontSize: 12 }}>
                    By Day
                  </p>
                  <Image
                    loading="lazy"
                    src="/assets/icon-arrow-down.svg"
                    alt="arrow-down"
                    width={16}
                    height={16}
                    className="shrink-0 w-4 aspect-square"
                    style={{ marginLeft: 10 }}
                  />
                </div>
              </div>

              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  width={500}
                  height={400}
                  data={data}
                  margin={{
                    top: 10,
                    right: 0,
                    left: 0,
                    bottom: 0
                  }}
                >
                  <CartesianGrid horizontal={false} vertical={false} strokeDasharray="2 2" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12, fill: '#8884d8' }}
                    tickSize={10}
                    padding={{ left: 40, right: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    mirror={true}
                    tickSize={12}
                    tick={{ fontSize: 12, fill: '#8884d8', dx: -10 }}
                    padding={{ top: 10, bottom: 10 }}
                    width={50}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                  />
                  <Area
                    type={cardinal}
                    dataKey="pv"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {isAwidth ? (
              <div
                style={{
                  display: 'flex',
                  gap: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  flexWrap: 'wrap'
                }}
              >
                {/* <div
                  className="flex flex-col flex-1 items-start px-7 py-3 bg-white rounded-lg max-md:px-5"
                  style={{
                    width: '100%',
                    maxWidth: 500,
                    minWidth: 450,
                    height: 400,
                    backgroundColor: 'white',
                    padding: 20,
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                    borderRadius: 8
                  }}
                >
                  <div style={{ height: 20 }}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'start',
                        padding: '8px'
                      }}
                    >
                      <h2 className="my-auto text-base font-semibold leading-4">Ai Agent</h2>
                      <Image
                        loading="lazy"
                        src="/assets/icon-arrow-down.svg"
                        alt="arrow-down"
                        width={16}
                        height={16}
                        className="shrink-0 my-auto w-4 aspect-square"
                        style={{ marginLeft: 10 }}
                      />
                      <h2
                        className="my-auto text-base font-xs leading-4"
                        style={{ fontSize: 13, marginLeft: '63%', color: 'blue' }}
                      >
                        View all
                      </h2>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        height: 120,
                        alignItems: 'center',
                        justifyContent: 'start',
                        backgroundColor: 'white',
                        padding: '8px',
                        borderRadius: 8,
                        borderColor: 'rgba(156, 163, 175, 0.5)',
                        borderWidth: 1,
                        marginTop: 15
                      }}
                    >
                      <div style={{ display: 'flex', width: '100%' }}>
                        <Image
                          loading="lazy"
                          src="/assets/Agent.svg"
                          alt="agent"
                          width={76}
                          height={76}
                          style={{ marginLeft: 10, marginTop: -75 }}
                        />
                        <div style={{ marginTop: 20, marginLeft: -75, flex: 1, width: '100%' }}>
                          <ProgressBar progress={progress1} />
                          {progress1 === 100 ? (
                            <Image
                              loading="lazy"
                              src="/assets/greentick.svg"
                              alt="green-tick"
                              width={27}
                              height={35}
                              style={{ marginLeft: 'auto', marginTop: -18 }}
                            />
                          ) : (
                            <Image
                              loading="lazy"
                              src="/assets/blanktick.svg"
                              alt="blank-tick"
                              width={27}
                              height={35}
                              style={{ marginLeft: 'auto', marginTop: -18 }}
                            />
                          )}
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h2 className="text-xs" style={{ color: 'black', marginRight: 15 }}>
                              Phone Number
                            </h2>
                            <h2 className="text-xs" style={{ color: 'black', marginRight: 25 }}>
                              Knowledge Base
                            </h2>
                            <h2 className="text-xs" style={{ color: 'black', marginRight: 25 }}>
                              Select Voice
                            </h2>
                            <h2 className="text-xs" style={{ color: 'black', marginRight: 25 }}>
                              Create Task
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        height: 120,
                        alignItems: 'center',
                        justifyContent: 'start',
                        backgroundColor: 'white',
                        padding: '8px',
                        borderRadius: 8,
                        borderColor: 'rgba(156, 163, 175, 0.5)',
                        borderWidth: 1,
                        marginTop: 15
                      }}
                    >
                      <div style={{ display: 'flex', width: '100%' }}>
                        <Image
                          loading="lazy"
                          src="/assets/Agent.svg"
                          alt="agent"
                          width={76}
                          height={76}
                          style={{ marginLeft: 10, marginTop: -75 }}
                        />
                        <div style={{ marginTop: 20, marginLeft: -75, flex: 1, width: '100%' }}>
                          <ProgressBar progress={progress2} />
                          {progress2 === 100 ? (
                            <Image
                              loading="lazy"
                              src="/assets/greentick.svg"
                              alt="green-tick"
                              width={27}
                              height={35}
                              style={{ marginLeft: 'auto', marginTop: -18 }}
                            />
                          ) : (
                            <Image
                              loading="lazy"
                              src="/assets/blanktick.svg"
                              alt="blank-tick"
                              width={27}
                              height={35}
                              style={{ marginLeft: 'auto', marginTop: -18 }}
                            />
                          )}
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h2 className="text-xs" style={{ color: 'black', marginRight: 15 }}>
                              Phone Number
                            </h2>
                            <h2 className="text-xs" style={{ color: 'black', marginRight: 25 }}>
                              Knowledge Base
                            </h2>
                            <h2 className="text-xs" style={{ color: 'black', marginRight: 15 }}>
                              Select Voice
                            </h2>
                            <h2 className="text-xs" style={{ color: 'black' }}>
                              Create Task
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '8px',
                        borderRadius: 8,
                        marginTop: 15,
                        backgroundColor: 'rgba(37, 99, 235, 0.1)'
                      }}
                      className="justify-center self-stretch p-2.5 my-auto text-sm font-medium text-blue-600 rounded-lg bg-blue-600 bg-opacity-10"
                    >
                      <p className="my-auto text-base font-xs leading-4" style={{ fontSize: 12 }}>
                        + Add New Ai Agent
                      </p>
                    </div>
                  </div>
                </div> */}

                <div
                  className="flex flex-col flex-1 items-start px-7 py-3 bg-white rounded-lg max-md:px-5"
                  style={{
                    width: '100%',
                    height: 400,
                    backgroundColor: 'white',
                    padding: 20,
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                    borderRadius: 8,
                    maxWidth: 500,
                    minWidth: 450
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'start',
                      padding: '8px',
                      marginTop: -15
                    }}
                  >
                    <h2 className="my-auto text-base font-semibold leading-4">New Reservations</h2>
                    <Image
                      loading="lazy"
                      src="/assets/icon-arrow-down.svg"
                      alt="arrow-down"
                      width={16}
                      height={16}
                      className="shrink-0 my-auto w-4 aspect-square"
                      style={{ marginLeft: 10 }}
                    />
                  </div>
                  {items.map((x, index) => (
                    <div
                      style={{
                        width: '100%',
                        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                        backgroundColor: 'white',
                        borderRadius: 12,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'start',
                        marginBottom: 18 // Add margin to create space between components
                      }}
                      key={index}
                    >
                      <div
                        style={{ borderRadius: '50%', overflow: 'hidden', width: 55, height: 75 }}
                      >
                        <Image
                          loading="lazy"
                          src="/assets/halima.svg"
                          alt="avatar"
                          width={45}
                          height={45}
                          style={{ borderRadius: '50%', marginTop: 15, marginLeft: 13 }}
                        />
                      </div>
                      <div style={{ marginTop: 5, marginLeft: 18, flex: 1 }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 5
                          }}
                        >
                          <div
                            className="text-sm font-semibold leading-3 text-slate-800"
                            style={{
                              fontSize: 13,
                              maxWidth: '70%',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            <TruncatedText2 text={'Mariam Abdulhamid'} maxLength={17} />
                          </div>
                          <div
                            className="my-auto text-base font-xs leading-4"
                            style={{ fontSize: 11, color: 'grey', marginRight: 10 }}
                          >
                            8:50 AM
                          </div>
                        </div>
                        <TruncatedText
                          text={
                            'To ensure the time is at the far right end and that the name is truncated, you can use the following '
                          }
                          maxLength={25}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div
                style={{ display: 'flex', gap: 20, justifyContent: 'start', alignItems: 'center' }}
              >
                {/* <div
                  className="flex flex-col flex-1 items-start px-7 py-3 bg-white rounded-lg max-md:px-5"
                  style={{
                    // width: '100%',
                    maxWidth: 320,
                    height: 400,
                    backgroundColor: 'white',
                    padding: 20,
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                    borderRadius: 8
                  }}
                >
                  <div style={{ height: 20 }}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'start',
                        padding: '8px'
                      }}
                    >
                      <h2 className="my-auto text-base font-semibold leading-4">Ai Agent</h2>
                      <Image
                        loading="lazy"
                        src="/assets/icon-arrow-down.svg"
                        alt="arrow-down"
                        width={16}
                        height={16}
                        className="shrink-0 my-auto w-4 aspect-square"
                        style={{ marginLeft: 10 }}
                      />
                      <h2
                        className="my-auto text-base font-xs leading-4"
                        style={{ fontSize: 13, marginLeft: 120, color: 'blue' }}
                      >
                        View all
                      </h2>
                    </div>
                    <div
                      style={{
                        flexDirection: 'row',
                        width: 280,
                        height: 120,
                        alignItems: 'center',
                        justifyContent: 'start',
                        backgroundColor: 'white',
                        padding: '8px',
                        borderRadius: 8,
                        borderColor: 'rgba(156, 163, 175, 0.5)',
                        borderWidth: 1,
                        marginTop: 15
                      }}
                    >
                      <div style={{ maxWidth: 500, height: 30 }}>
                        <Image
                          loading="lazy"
                          src="/assets/Agent.svg"
                          alt="arrow-down"
                          width={76}
                          height={76}
                          style={{ marginLeft: 10 }}
                        />
                        <div style={{ marginTop: 20, marginLeft: 10 }}>
                          <ProgressBar progress={progress1} />
                          {progress1 === 100 ? (
                            <Image
                              loading="lazy"
                              src="/assets/greentick.svg"
                              alt="arrow-down"
                              width={27}
                              height={35}
                              style={{ marginLeft: 233, marginTop: -18 }}
                            />
                          ) : (
                            <Image
                              loading="lazy"
                              src="/assets/blanktick.svg"
                              alt="arrow-down"
                              width={27}
                              height={35}
                              style={{ marginLeft: 233, marginTop: -18 }}
                            />
                          )}
                          <div style={{ display: 'flex' }}>
                            <h2
                              className="my-auto text-base font-xs leading-4"
                              style={{ fontSize: 11, color: 'black', width: 50, marginRight: 25 }}
                            >
                              Phone Number
                            </h2>
                            <h2
                              className="my-auto text-base font-xs leading-4"
                              style={{ fontSize: 11, color: 'black', width: 50, marginRight: 35 }}
                            >
                              Knowledge Base
                            </h2>
                            <h2
                              className="my-auto text-base font-xs leading-4"
                              style={{ fontSize: 11, color: 'black', width: 50, marginRight: 35 }}
                            >
                              Select Voice
                            </h2>
                            <h2
                              className="my-auto text-base font-xs leading-4"
                              style={{ fontSize: 11, color: 'black', width: 50 }}
                            >
                              Create Task
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        flexDirection: 'row',
                        width: 280,
                        height: 120,
                        alignItems: 'center',
                        justifyContent: 'start',
                        backgroundColor: 'white',
                        padding: '8px',
                        borderRadius: 8,
                        borderColor: 'rgba(156, 163, 175, 0.5)',
                        borderWidth: 1,
                        marginTop: 15
                      }}
                    >
                      <div style={{ maxWidth: 500, height: 30 }}>
                        <Image
                          loading="lazy"
                          src="/assets/Agent.svg"
                          alt="arrow-down"
                          width={76}
                          height={76}
                          style={{ marginLeft: 10 }}
                        />
                        <div style={{ marginTop: 20, marginLeft: 10 }}>
                          <ProgressBar progress={progress2} />
                          {progress2 === 100 ? (
                            <Image
                              loading="lazy"
                              src="/assets/greentick.svg"
                              alt="arrow-down"
                              width={27}
                              height={35}
                              style={{ marginLeft: 233, marginTop: -18 }}
                            />
                          ) : (
                            <Image
                              loading="lazy"
                              src="/assets/blanktick.svg"
                              alt="arrow-down"
                              width={27}
                              height={35}
                              style={{ marginLeft: 233, marginTop: -18 }}
                            />
                          )}
                          <div style={{ display: 'flex' }}>
                            <h2
                              className="my-auto text-base font-xs leading-4"
                              style={{ fontSize: 11, color: 'black', width: 50, marginRight: 25 }}
                            >
                              Phone Number
                            </h2>
                            <h2
                              className="my-auto text-base font-xs leading-4"
                              style={{ fontSize: 11, color: 'black', width: 50, marginRight: 35 }}
                            >
                              Knowledge Base
                            </h2>
                            <h2
                              className="my-auto text-base font-xs leading-4"
                              style={{ fontSize: 11, color: 'black', width: 50, marginRight: 35 }}
                            >
                              Select Voice
                            </h2>
                            <h2
                              className="my-auto text-base font-xs leading-4"
                              style={{ fontSize: 11, color: 'black', width: 50 }}
                            >
                              Create Task
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '8px',
                        borderRadius: 8,
                        marginTop: 15,
                        backgroundColor: 'rgba(37, 99, 235, 0.1)'
                      }}
                      className="justify-center self-stretch p-2.5 my-auto text-sm font-medium text-blue-600 rounded-lg bg-blue-600 bg-opacity-10"
                    >
                      <p className="my-auto text-base font-xs leading-4" style={{ fontSize: 12 }}>
                        + Add New Ai Agent
                      </p>
                    </div>
                  </div>
                </div> */}

       <div
                  className="flex flex-col flex-1 items-start px-7 py-3 bg-white rounded-lg max-md:px-5"
                  style={{
                    width: '100%',
                    maxWidth: 320,
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
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'start',
                      padding: '8px',
                      marginTop: -15
                    }}
                  >
                    <h2 className="my-auto text-base font-semibold leading-4">New Reservations</h2>
                    <Image
                      loading="lazy"
                      src="/assets/icon-arrow-down.svg"
                      alt="arrow-down"
                      width={16}
                      height={16}
                      className="shrink-0 my-auto w-4 aspect-square"
                      style={{ marginLeft: 10 }}
                    />
                  </div>
                  {items.map((x, index) => (
                    <div
                      style={{
                        width: 290,
                        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                        backgroundColor: 'white',
                        borderRadius: 12,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'start',
                        marginBottom: 18 // Add margin to create space between components
                      }}
                      key={index}
                    >
                      <div
                        style={{ borderRadius: '50%', overflow: 'hidden', width: 55, height: 75 }}
                      >
                        <Image
                          loading="lazy"
                          src="/assets/halima.svg"
                          alt="avatar"
                          width={45}
                          height={45}
                          style={{ borderRadius: '50%', marginTop: 15, marginLeft: 13 }}
                        />
                      </div>

                      <div style={{ marginTop: 5, marginLeft: 18 }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: 5
                          }}
                        >
                          <div
                            className="text-sm font-semibold leading-3 text-slate-800"
                            style={{
                              fontSize: 13,
                              maxWidth: '70%',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            <TruncatedText2 text={'Mariam Abdulhamid'} maxLength={17} />
                          </div>
                          <div
                            className="my-auto text-base font-xs leading-4"
                            style={{ fontSize: 11, color: 'grey', marginLeft: 40 }}
                          >
                            8:50 AM
                          </div>
                        </div>
                        <TruncatedText
                          text={
                            'To ensure the time is at the far right end and that the name is truncated, you can use the following '
                          }
                          maxLength={25}
                        />
                      </div>
                    </div>
                  ))}
                </div> 
              </div>
            )}
          </div>
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
   
      { calls2 
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
        </>
      )}
    </>
  );
};

export default DashboardClient;

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
