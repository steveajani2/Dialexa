import ReactComponent1 from "../../public/assets/greentick2.svg";

const Pricing = () => {
  return (
    <div className="container mx-auto py-16">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 mt-6" style={{ fontFamily: "Work Sans" }}>Testnet Plans</h2>
      <div className="border rounded-lg shadow-lg p-6 sm:p-8 flex-1 max-w-xs lg:max-w-sm">
        <h2 className="text-lg sm:text-2xl font-semibold mb-4" style={{ fontFamily: "Work Sans" }}>Basic Plan</h2>
        <p className="text-3xl sm:text-4xl font-semibold mb-4 sm:mb-8" style={{ fontFamily: "Work Sans" }}>
          10 Near <span className="text-lg font-medium">per month</span>
        </p>
        {/* <button onClick={() => { setisLoading(true); Sub(10)}} className="bg-purple-700 text-white py-2 px-4 rounded-lg w-full mb-4" style={{ fontFamily: "Work Sans" }}>
          Subscribe
        </button> */}
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
      
      <h2 className="text-xl sm:text-2xl font-bold mb-4 mt-6" style={{ fontFamily: "Work Sans" }}>Mainnet Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        

        <div className="border rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Basic Plan</h2>
          <p className="text-4xl font-semibold mb-8">12 Near <span className="text-lg font-medium">per month</span></p>
          {/* <button className="bg-green-600 text-white py-2 px-4 rounded-lg w-full mb-4">Subscribe</button> */}
          <h3 className="text-lg font-semibold mb-4">Features</h3>
          <ul className="space-y-2">
            <li className="flex items-center"><ReactComponent1 className="w-4 h-4 mr-2" /> 3 AI Agents</li>
            <li className="flex items-center "><ReactComponent1 className="w-4 h-4 mr-2" /> $10 complimentary credit (one-time)</li>
            <li className="flex items-center"><ReactComponent1 className="w-4 h-4 mr-2" /> 100,000 characters (Storage)</li>
            <li className="flex items-center"><ReactComponent1 className="w-4 h-4 mr-2" /> Website chat widget</li>
            <li className="flex items-center"><ReactComponent1 className="w-4 h-4 mr-2" /> Support: emails</li>
            <li className="flex items-center"><ReactComponent1 className="w-4 h-4 mr-2" /> AI scheduling</li>
            <li className="flex items-center"><ReactComponent1 className="w-4 h-4 mr-2" /> 14 days free trial</li>
          </ul>
        </div>

        {/* Pro Plan */}
        <div className="border rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Pro Plan</h2>
          <p className="text-4xl font-semibold mb-8">67 Near <span className="text-lg font-medium">per month</span></p>
          {/* <button className="bg-green-600 text-white py-2 px-4 rounded-lg w-full mb-4">Subscribe</button> */}
          <h3 className="text-lg font-semibold mb-4">Features</h3>
          <ul className="space-y-2">
            <li className="flex items-center"><ReactComponent1 className="w-4 h-4 mr-2" /> 5 AI Agents</li>
            <li className="flex items-center"><ReactComponent1 className="w-4 h-4 mr-2" /> $30 complimentary credit (one-time)</li>
            <li className="flex items-center"><ReactComponent1 className="w-4 h-4 mr-2" /> 100,000,000 characters (Storage)</li>
            <li className="flex items-center"><ReactComponent1 className="w-4 h-4 mr-2" /> Website chat widget & CRM</li>
            <li className="flex items-center"><ReactComponent1 className="w-4 h-4 mr-2" /> Support: emails & in-dashboard support</li>
            <li className="flex items-center"><ReactComponent1 className="w-4 h-4 mr-2" /> AI scheduling / leads</li>
            <li className="flex items-center"><ReactComponent1 className="w-4 h-4 mr-2" /> 14 days free trial</li>
          </ul>
        </div>

        {/* Premium Plan */}
        <div className="border rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Premium Plan</h2>
          <p className="text-4xl font-semibold mb-8">150 Near <span className="text-lg font-medium">per month</span></p>
          {/* <button className="bg-green-600 text-white py-2 px-4 rounded-lg w-full mb-4">Subscribe</button> */}
          <h3 className="text-lg font-semibold mb-4">Features</h3>
          <ul className="space-y-2">
            <li className="flex items-center"><ReactComponent1 className="w-4 h-4 mr-2" /> 10 AI Agents</li>
            <li className="flex items-center"><ReactComponent1 className="w-4 h-4 mr-2" /> $100 complimentary credit (one-time)</li>
            <li className="flex items-center"><ReactComponent1 className="w-4 h-4 mr-2" /> 10,000,000 characters (Storage)</li>
            <li className="flex items-center"><ReactComponent1 className="w-4 h-4 mr-2" /> Website chat widget & CRM</li>
            <li className="flex items-center"><ReactComponent1 className="w-4 h-4 mr-2" /> Support: emails & 1-on-1 support</li>
            <li className="flex items-center"><ReactComponent1 className="w-4 h-4 mr-2" /> AI scheduling / leads</li>
            <li className="flex items-center"><ReactComponent1 className="w-4 h-4 mr-2" /> Webhook API</li>
            <li className="flex items-center"><ReactComponent1 className="w-4 h-4 mr-2" /> 14 days free trial</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Pricing;
