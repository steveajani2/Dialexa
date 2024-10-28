
import ReactComponent1 from "../../public/assets/greentick2.svg";
import React, { useState, useEffect, useContext } from 'react';
import FullScreenLoader from '@/components/full-screen-loader';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { NearContext } from '../wallets/near';
import { utils } from "near-api-js";
import { HelloNearContract } from '../config';
interface SubscriptionProps {
  userId: string;
}

const Subscription: React.FC<SubscriptionProps> = ({ userId }) => {
  const [profileCompletion, setProfileCompletion] = useState<any | null>(null);
  const [isuser , setisuser] = useState<any>(false)
  const [iscase , setiscase] = useState<any>('')
  const [plan , setplan] = useState<any>('')
  const [cplan , setcplan] = useState<any>('')

  const [issubscrilbe , setissubscrilbe] = useState<any>(false)
  const supabase = createClientComponentClient();
  const { signedAccountId, wallet } = useContext(NearContext);
const [isLoading , setisLoading] = useState(true)
const CONTRACT = HelloNearContract;
  useEffect(() => {
 
    if (signedAccountId) {
      const handleResize = async () => {
        const { data: items } = await supabase
        .from('user_data')
        .select('id, first_name, last_name, created_at, email, user_id, wallet_id ')
        .eq('user_id', userId)
        .eq('wallet_id', signedAccountId)
        // const products = await wallet.callMethod({ contractId: CONTRACT, method: 'approveProductByHash', args: { productHash: docName.id } });
        console.log(items)
      if (items[0]?.first_name && items[0]?.last_name){
        //const products = await wallet.viewMethod({ contractId: CONTRACT, method: 'getUser',  args: { Username: `${items?.first_name}${items?.last_name}` }});
        const products = await wallet.viewMethod({ contractId: CONTRACT, method: 'getUser',  args: { Username: `${items[0]?.first_name}${items[0]?.last_name}` }});
  
console.log(products)
        if (!products){
          const products2 = await wallet.callMethod({ contractId: CONTRACT, method: 'createUser', args: { Firstname: items[0]?.first_name ,Lastname :items[0]?.last_name,Username : `${items[0]?.first_name}${items[0]?.last_name}`  } });
        }else{
          setissubscrilbe(products.subscribed)

         
        }

        if (products.subscribed){
          setplan(products.plan)
          if (products.plan === 10 || products.plan === 12){
            setcplan("Basic")
          }else if(products.plan === 67){
            setcplan("Pro")
          }else if(products.plan === 150){
            setcplan("Premium")
          }
        }
        setisuser(true)
       

       
      }else{
        setiscase('Update Profile To Subscribe ')
        setisuser(false)
        
      }
        

       setProfileCompletion(items[0])
       setisLoading(false)



      }
      handleResize()
      
    }else {
      const handleResize = async () => {
        const { data: items } = await supabase
        .from('user_data')
        .select('id, first_name, last_name, created_at, email, user_id, wallet_id ')
        .eq('user_id',userId)
        setiscase('Conect waller To Subscribe ')
        setisuser(false)
       setProfileCompletion(items[0])
       setisLoading(false)
       
      }
      handleResize()
      
    }
 
  }, [])



  const cancelSub = async () => {
    const products2 = await wallet.callMethod({ contractId: CONTRACT, method: 'cancelSubscription', args: { Username: `${profileCompletion?.first_name}${profileCompletion?.last_name}`  } });
   setisLoading(false)
   
  }

  const Sub = async ( plans: any) => {
    let deposit = utils.format.parseNearAmount(plans.toString());
    const products2 = await wallet.callMethod({ contractId: CONTRACT, method: 'subscribetest', args: { Username: `${profileCompletion?.first_name}${profileCompletion?.last_name}` , plan : plans },deposit });
   setisLoading(false)
   
  }
  
  return (
<main className="flex-1 p-4 sm:p-6">
  <>
  {isLoading && <FullScreenLoader />}
  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md max-w-4xl mx-auto">
    <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ fontFamily: "Work Sans" }}>Subscription</h2>
    
   {issubscrilbe ?  <div className="mb-8">
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h3 className="text-base sm:text-lg font-semibold" style={{ fontFamily: "Work Sans" }}>
          Current Plan: <span className="text-yellow-600">{cplan} Plan</span>
        </h3>
        <p className="text-gray-500 text-sm sm:text-base" style={{ fontFamily: "Work Sans" }}>Main License</p>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-0" style={{ fontFamily: "Work Sans" }}>
          ${plan} Near<span className="text-base sm:text-lg font-normal">/month</span>
        </div>
        <button onClick={() => {setisLoading(true); cancelSub()}} className="bg-purple-700 text-white py-2 px-4 rounded-md w-full sm:w-auto" style={{ fontFamily: "Work Sans" }}>Cancel Plan</button>
      </div>
      {/* <div className="text-gray-500 text-xs sm:text-sm mt-2" style={{ fontFamily: "Work Sans" }}>
        Next Payment on: <strong>28 August 2025</strong>
      </div> */}
    </div> :
    
    <div className="mb-8 opacity-50 grayscale">
    <div className="bg-gray-100 p-4 rounded-lg mb-4">
      <h3 className="text-base sm:text-lg font-semibold" style={{ fontFamily: "Work Sans" }}>
        Current Plan: <span className="text-yellow-600">No Plan</span>
      </h3>
      <p className="text-gray-500 text-sm sm:text-base" style={{ fontFamily: "Work Sans" }}>Main License</p>
    </div>
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
      <div className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-0" style={{ fontFamily: "Work Sans" }}>
        $0 Near<span className="text-base sm:text-lg font-normal">/month</span>
      </div>
      <button className="bg-purple-700 text-white py-2 px-4 rounded-md w-full sm:w-auto" style={{ fontFamily: "Work Sans" }}>Cancel Plan</button>
    </div>
    {/* <div className="text-gray-500 text-xs sm:text-sm mt-2" style={{ fontFamily: "Work Sans" }}>
      Next Payment on: <strong>28 August 2025</strong>
    </div> */}
  </div>
    
    }
   
    <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ fontFamily: "Work Sans" }}>Testnet Plans</h2>
    {isuser ?   <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 justify-center items-center w-full">
      {/* Basic Plan */}
      <div className="border rounded-lg shadow-lg p-6 sm:p-8 flex-1 max-w-xs lg:max-w-sm">
        <h2 className="text-lg sm:text-2xl font-semibold mb-4" style={{ fontFamily: "Work Sans" }}>Basic Plan</h2>
        <p className="text-3xl sm:text-4xl font-semibold mb-4 sm:mb-8" style={{ fontFamily: "Work Sans" }}>
          10 Near <span className="text-lg font-medium">per month</span>
        </p>
        <button onClick={() => { setisLoading(true); Sub(10)}} className="bg-purple-700 text-white py-2 px-4 rounded-lg w-full mb-4" style={{ fontFamily: "Work Sans" }}>
          Subscribe
        </button>
        <h3 className="text-base sm:text-lg font-semibold mb-4" style={{ fontFamily: "Work Sans" }}>Features</h3>
        <ul className="space-y-2 text-sm sm:text-base">
        <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> 1 AI Agents</li>
      <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> Multiple Knowledge base uploads</li>
      <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> 100,000 characters (Storage)</li>
      {/* <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> Website chat widget</li> */}
      <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> Support: emails</li>
      {/* <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> AI scheduling</li>
      <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> 14 days free trial</li> */}
        </ul>
      </div>

    
    </div>: 
    
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 justify-center items-center w-full opacity-50 grayscale">
    {/* Basic Plan */}
    <div className="border rounded-lg shadow-lg p-6 sm:p-8 flex-1 max-w-xs lg:max-w-sm">
      {/* <h2 className="text-lg sm:text-2xl font-semibold mb-4" style={{ fontFamily: "Work Sans" }}>Connect wallet to subscribe</h2> */}
      <h2 className="text-lg sm:text-2xl font-semibold mb-4" style={{ fontFamily: "Work Sans" }}>Basic Plan </h2>
      <p className="text-3xl sm:text-4xl font-semibold mb-4 sm:mb-8" style={{ fontFamily: "Work Sans" }}>
        10 Near <span className="text-lg font-medium">per month</span>
      </p>
      <button disabled={true} className="bg-purple-700 text-white py-2 px-4 rounded-lg w-full mb-4" style={{ fontFamily: "Work Sans" }}>
      {iscase}
      </button>
      <h3 className="text-base sm:text-lg font-semibold mb-4" style={{ fontFamily: "Work Sans" }}>Features</h3>
      <ul className="space-y-2 text-sm sm:text-base">
      <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> 1 AI Agents</li>
    <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> Multiple Knowledge base uploads</li>
    <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> 100,000 characters (Storage)</li>
    {/* <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> Website chat widget</li> */}
    <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> Support: emails</li>
    {/* <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> AI scheduling</li>
    <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> 14 days free trial</li> */}
      </ul>
    </div>

  
  </div>}



    <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ fontFamily: "Work Sans" }}>Mainnet Plans</h2>
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 justify-center items-center w-full  opacity-50 grayscale">
      {/* Basic Plan */}
      <div className="border rounded-lg shadow-lg p-6 sm:p-8 flex-1 max-w-xs lg:max-w-sm">
        <h2 className="text-lg sm:text-2xl font-semibold mb-4" style={{ fontFamily: "Work Sans" }}>Basic Plan</h2>
        <p className="text-3xl sm:text-4xl font-semibold mb-4 sm:mb-8" style={{ fontFamily: "Work Sans" }}>
          12 Near <span className="text-lg font-medium">per month</span>
        </p>
        <button disabled={true} onClick={() => {Sub(12)}} className="bg-purple-700 text-white py-2 px-4 rounded-lg w-full mb-4" style={{ fontFamily: "Work Sans" }}>
          Subscribe
        </button>
        <h3 className="text-base sm:text-lg font-semibold mb-4" style={{ fontFamily: "Work Sans" }}>Features</h3>
        <ul className="space-y-2 text-sm sm:text-base">
        <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> 3 AI Agents</li>
      <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> $10 complimentary credit (one-time)</li>
      <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> 100,000 characters (Storage)</li>
      <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> Website chat widget</li>
      <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> Support: emails</li>
      <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> AI scheduling</li>
      <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> 14 days free trial</li>
        </ul>
      </div>

      {/* Pro Plan */}
      <div className="border rounded-lg shadow-lg p-6 sm:p-8 flex-1 max-w-xs lg:max-w-sm">
        <h2 className="text-lg sm:text-2xl font-semibold mb-4" style={{ fontFamily: "Work Sans" }}>Pro Plan</h2>
        <p className="text-3xl sm:text-4xl font-semibold mb-4 sm:mb-8" style={{ fontFamily: "Work Sans" }}>
          67 Near <span className="text-lg font-medium">per month</span>
        </p>
        <button disabled={true} onClick={() => {Sub(67)}} className="bg-purple-700 text-white py-2 px-4 rounded-lg w-full mb-4" style={{ fontFamily: "Work Sans" }}>
          Subscribe
        </button>
        <h3 className="text-base sm:text-lg font-semibold mb-4" style={{ fontFamily: "Work Sans" }}>Features</h3>
        <ul className="space-y-2 text-sm sm:text-base">
        <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> 5 AI Agents</li>
      <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> $30 complimentary credit (one-time)</li>
      <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> 100,000,000 characters (Storage)</li>
      <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> Website chat widget & CRM</li>
      <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> Support: emails & in-dashboard support</li>
      <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> AI scheduling / leads</li>
      <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> 14 days free trial</li>
        </ul>
      </div>

      {/* Premium Plan */}
      <div className="border rounded-lg shadow-lg p-6 sm:p-8 flex-1 max-w-xs lg:max-w-sm">
        <h2 className="text-lg sm:text-2xl font-semibold mb-4" style={{ fontFamily: "Work Sans" }}>Premium Plan</h2>
        <p className="text-3xl sm:text-4xl font-semibold mb-4 sm:mb-8" style={{ fontFamily: "Work Sans" }}>
          150 Near <span className="text-lg font-medium">per month</span>
        </p>
        <button disabled={true} onClick={() => {Sub(150)}} className="bg-purple-700 text-white py-2 px-4 rounded-lg w-full mb-4" style={{ fontFamily: "Work Sans" }}>
          Subscribe
        </button>
        <h3 className="text-base sm:text-lg font-semibold mb-4" style={{ fontFamily: "Work Sans" }}>Features</h3>
        <ul className="space-y-2 text-sm sm:text-base">
        <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> 10 AI Agents</li>
      <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> $100 complimentary credit (one-time)</li>
      <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> 10,000,000 characters (Storage)</li>
      <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> Website chat widget & CRM</li>
      <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> Support: emails & 1-on-1 support</li>
      <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> AI scheduling / leads</li>
      <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> Webhook API</li>
      <li className="flex items-center" style={{ fontFamily: "Work Sans" }}><ReactComponent1 className="w-4 h-4 mr-2" /> 14 days free trial</li>
        </ul>
      </div>
    </div>
  </div>
  </>
</main>

  );
};

export default Subscription;
